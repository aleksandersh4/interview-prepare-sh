/* Песочница: теория из .md + редактор + запуск без перезагрузки + запись в topics/*.js.
   Режимы:
     http(s) — полноценный режим (fetch локальных файлов). Запусти `node serve.js`.
     file:// — стенд работает в старом режиме (runner.js), этот скрипт выключается.

   Политика синхронизации: файл topics/NN.js — источник истины. Черновик в localStorage —
   только автосейв на случай падения; при расхождении показываем баннер выбора. */
(function () {
  const topic = new URLSearchParams(location.search).get('topic');
  if (!topic || location.protocol === 'file:') return;

  const $ = (id) => document.getElementById(id);
  const editor = $('editor');
  const output = $('output');
  const sandbox = $('sandbox');
  const banner = $('draft-banner');
  const statusDraft = $('status-draft');
  const statusFile = $('status-file');
  const draftKey = 'jip:draft:' + topic;

  const now = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const fetchText = (url) => fetch(url).then((r) => (r.ok ? r.text() : null)).catch(() => null);

  let fileText = null;
  let fileHandle = null;

  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  function refreshFileStatus() {
    if (!('showSaveFilePicker' in window)) {
      $('save-btn').disabled = true;
      statusFile.textContent = 'сохранение в файл: нужен Chrome/Edge';
      return;
    }
    if (fileText === null) { statusFile.textContent = 'файл: не загружен'; return; }
    statusFile.textContent = editor.value === fileText
      ? 'файл: синхронизирован ✓'
      : 'файл: есть несохранённые изменения';
  }

  function saveDraft() {
    try { localStorage.setItem(draftKey, editor.value); } catch {}
    statusDraft.textContent = 'черновик: сохранён локально ' + now();
  }
  const saveDraftDebounced = debounce(saveDraft, 400);

  function runCode() {
    output.innerHTML = '';
    sandbox.innerHTML = '';
    if (!editor.value.trim()) {
      output.insertAdjacentHTML('beforeend',
        '<div class="line warn">Редактор пуст — «⟲ Из файла» загрузит задачи темы, либо пиши с нуля.</div>');
      return;
    }
    try {
      new Function(editor.value)();
      output.insertAdjacentHTML('beforeend', '<div class="line muted">— выполнено ' + now() + ' —</div>');
    } catch (e) {
      output.insertAdjacentHTML('beforeend',
        '<div class="line fail">⛔ ' + (e && e.message ? e.name + ': ' + e.message : String(e)) + '</div>');
    }
  }

  async function saveToFile() {
    if (!('showSaveFilePicker' in window)) return;
    try {
      if (!fileHandle) {
        fileHandle = await window.showSaveFilePicker({
          suggestedName: topic + '.js',
          types: [{ description: 'JavaScript', accept: { 'text/javascript': ['.js'] } }],
        });
      }
      const writable = await fileHandle.createWritable();
      await writable.write(editor.value);
      await writable.close();
      fileText = editor.value;
      saveDraft();
      banner.hidden = true;
      refreshFileStatus();
      statusFile.textContent = 'файл: сохранён ' + now() + ' ✓';
    } catch (e) {
      if (e && e.name === 'AbortError') return; // отменил диалог выбора файла
      statusFile.textContent = 'файл: ошибка — ' + (e && e.message ? e.message : e);
    }
  }

  async function loadFromFile() {
    const fresh = await fetchText('topics/' + topic + '.js');
    if (fresh === null) { statusDraft.textContent = 'не удалось перечитать файл'; return; }
    editor.value = fresh;
    fileText = fresh;
    saveDraft();
    banner.hidden = true;
    refreshFileStatus();
    runCode();
  }

  async function loadTheory() {
    const md = await fetchText('topics/' + topic + '.md');
    if (md && window.marked) {
      $('theory-body').innerHTML = window.marked.parse(md);
      // относительные ссылки внутри .md указывают на соседний файл темы — ведём в topics/
      $('theory-body').querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (!/^(https?:|#|\/)/.test(href)) a.setAttribute('href', 'topics/' + href);
      });
    } else {
      $('theory-body').innerHTML =
        '<p>Теория не загрузилась — она в файле <code>topics/' + topic + '.md</code>.</p>';
    }
  }

  async function init() {
    loadTheory();

    fileText = await fetchText('topics/' + topic + '.js');
    let draft = null;
    try { draft = localStorage.getItem(draftKey); } catch {}

    if (fileText !== null) {
      editor.value = fileText;
      statusDraft.textContent = 'черновик: как в файле';
      if (draft !== null && draft !== fileText) banner.hidden = false;
      runCode(); // стартовый прогон текущего файла — тот же эффект, что F5 раньше
    } else if (draft !== null) {
      editor.value = draft;
      statusDraft.textContent = 'файл недоступен — работаем с черновиком';
    }
    refreshFileStatus();
  }

  $('run-btn').addEventListener('click', runCode);
  $('save-btn').addEventListener('click', saveToFile);
  $('reload-btn').addEventListener('click', loadFromFile);
  $('take-file-btn').addEventListener('click', () => {
    if (fileText !== null) editor.value = fileText;
    banner.hidden = true;
    saveDraft();
    refreshFileStatus();
    runCode();
  });
  $('take-draft-btn').addEventListener('click', () => {
    try { editor.value = localStorage.getItem(draftKey) || ''; } catch {}
    banner.hidden = true;
    refreshFileStatus();
    runCode();
  });

  editor.addEventListener('input', () => { saveDraftDebounced(); refreshFileStatus(); });
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      editor.setRangeText('  ', editor.selectionStart, editor.selectionEnd, 'end');
    }
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) { e.preventDefault(); saveToFile(); }
  });

  init();
})();
