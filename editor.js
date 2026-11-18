/* Движок карточек песочницы (только http-режим, на file:// работает runner.js).
   Каждая карточка = один файл задачи: свой редактор (CodeMirror/textarea), свой вывод,
   свои статусы и черновик. Запуск — new Function с хелперами, привязанными к выводу
   карточки: async-проверки дописывают результат в свою карточку. */
(function () {
  const topic = new URLSearchParams(location.search).get('topic');
  const block = window.CURRENT_BLOCK;
  if (!topic || !block || location.protocol === 'file:') return;
  const base = 'blocks/' + block + '/' + topic;

  const $ = (id) => document.getElementById(id);
  const tasksEl = $('tasks');
  const topicStatus = $('topic-status');
  const sandbox = $('sandbox');

  const now = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  const fetchText = (url) => fetch(url).then((r) => (r.ok ? r.text() : null)).catch(() => null);
  const FS_OK = 'showSaveFilePicker' in window && 'showDirectoryPicker' in window;

  let dirHandle = null;
  let cards = [];
  let activeCard = null;

  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  /* ───────────────────────── карточка ───────────────────────── */
  function makeCard(meta) {
    const article = document.createElement('article');
    article.className = 'task-card' + (meta.kind === 'demo' ? ' demo' : '');
    article.innerHTML =
      '<h3></h3>' +
      '<div class="task-desc md"></div>' +
      '<div class="task-editor"></div>' +
      '<div class="toolbar">' +
      '  <button class="primary run-btn" type="button">▶ Запустить <kbd>Ctrl+Enter</kbd></button>' +
      '  <button class="save-btn" type="button"' + (FS_OK ? '' : ' disabled') + '>💾 В файл</button>' +
      '  <button class="reload-btn" type="button" title="Перечитать файл и выполнить">⟲ Из файла</button>' +
      '</div>' +
      '<div class="status"><span class="s-draft">черновик: —</span><span class="s-file">файл: —</span></div>' +
      '<div class="task-output"></div>' +
      '<div class="draft-note" hidden>Черновик отличается от файла. <button class="take-draft" type="button">Открыть черновик</button></div>';
    article.querySelector('h3').textContent = (meta.kind === 'demo' ? '👀 ' : '📝 ') + meta.title;
    const descEl = article.querySelector('.task-desc');
    if (window.marked) {
      const desc = meta.description || (meta.kind === 'demo'
        ? 'Запусти и разбери вывод: объясни себе (или ассистенту в чате) каждый шаг. Код менять не нужно.'
        : '');
      descEl.innerHTML = window.marked.parse(desc);
      if (meta.source) {
        const src = document.createElement('div');
        src.className = 'task-source';
        src.innerHTML = '🔍 Источник: ' + (meta.sourceUrl
          ? '<a href="' + meta.sourceUrl + '" target="_blank" rel="noreferrer"></a>'
          : '<span></span>');
        (src.querySelector('a') || src.querySelector('span')).textContent = meta.source;
        descEl.appendChild(src);
      }
    }
    tasksEl.appendChild(article);

    const outputEl = article.querySelector('.task-output');
    const sDraft = article.querySelector('.s-draft');
    const sFile = article.querySelector('.s-file');
    const draftNote = article.querySelector('.draft-note');
    const helpers = window.makeHelpers(outputEl);
    const footer = (cls, text) => outputEl.insertAdjacentHTML('beforeend', '<div class="line ' + cls + '">' + text + '</div>');

    /* редактор: CodeMirror либо textarea */
    const editorBox = article.querySelector('.task-editor');
    const ta = document.createElement('textarea');
    ta.spellcheck = false;
    ta.wrap = 'off';
    let cm = null;
    let applying = false;
    const draftKey = 'jip:draft:' + topic + '/' + meta.file;
    let fileText = null;
    let fileHandle = null;

    const saveDraft = () => {
      try { localStorage.setItem(draftKey, getValue()); } catch {}
      sDraft.textContent = 'черновик: сохранён ' + now();
    };
    const saveDraftDebounced = debounce(saveDraft, 400);

    if (window.CMEditor) {
      const host = document.createElement('div');
      host.className = 'cm-host';
      editorBox.appendChild(host);
      cm = new window.CMEditor.EditorView({
        doc: '',
        parent: host,
        extensions: [
          ...window.CMEditor.extensions,
          window.CMEditor.EditorView.updateListener.of((u) => {
            if (u.docChanged && !applying) { saveDraftDebounced(); refreshFile(); }
          }),
        ],
      });
    } else {
      editorBox.appendChild(ta);
      ta.addEventListener('input', () => { saveDraftDebounced(); refreshFile(); });
      ta.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          ta.setRangeText('  ', ta.selectionStart, ta.selectionEnd, 'end');
        }
      });
    }
    const getValue = () => (cm ? cm.state.doc.toString() : ta.value);
    const setValue = (v) => {
      applying = true;
      try {
        if (cm) cm.dispatch({ changes: { from: 0, to: cm.state.doc.length, insert: v } });
        else ta.value = v;
      } finally {
        applying = false;
      }
    };

    function refreshFile() {
      if (!FS_OK) { sFile.textContent = 'сохранение: нужен Chrome/Edge'; return; }
      if (fileText === null) { sFile.textContent = 'файл: не загружен'; return; }
      sFile.textContent = getValue() === fileText
        ? 'файл: синхронизирован ✓'
        : 'файл: есть несохранённые изменения';
    }

    const card = {
      meta,
      article,
      getValue,
      setValue,
      run() {
        outputEl.innerHTML = '';
        sandbox.innerHTML = '';
        const code = getValue();
        if (!code.trim()) {
          footer('warn', 'Редактор пуст — «⟲ Из файла» загрузит задачу.');
          return;
        }
        try {
          new Function('section', 'log', 'check', 'tryRun', code)(
            helpers.section, helpers.log, helpers.check, helpers.tryRun);
          footer('muted', '— выполнено ' + now() + ' —');
        } catch (e) {
          footer('fail', '⛔ ' + (e && e.message ? e.name + ': ' + e.message : String(e)));
        }
        setTimeout(updateAgg, 50);
      },
      async save() {
        if (!FS_OK) return;
        try {
          let handle = null;
          if (dirHandle) {
            handle = await dirHandle.getFileHandle(meta.file, { create: true });
          } else if (fileHandle) {
            handle = fileHandle;
          } else {
            fileHandle = await window.showSaveFilePicker({
              suggestedName: meta.file,
              types: [{ description: 'JavaScript', accept: { 'text/javascript': ['.js'] } }],
            });
            handle = fileHandle;
          }
          const writable = await handle.createWritable();
          await writable.write(getValue());
          await writable.close();
          fileText = getValue();
          saveDraft();
          draftNote.hidden = true;
          refreshFile();
          sFile.textContent = 'файл: сохранён ' + now() + ' ✓';
        } catch (e) {
          if (e && e.name === 'AbortError') return;
          sFile.textContent = 'файл: ошибка — ' + (e && e.message ? e.message : e);
        }
      },
      async loadFromFile() {
        const fresh = await fetchText(base + '/' + meta.file);
        if (fresh === null) { sDraft.textContent = 'не удалось перечитать файл'; return; }
        setValue(fresh);
        fileText = fresh;
        saveDraft();
        draftNote.hidden = true;
        refreshFile();
        card.run();
      },
    };

    article.querySelector('.run-btn').addEventListener('click', card.run);
    article.querySelector('.save-btn').addEventListener('click', card.save);
    article.querySelector('.reload-btn').addEventListener('click', card.loadFromFile);
    article.querySelector('.take-draft').addEventListener('click', () => {
      try { setValue(localStorage.getItem(draftKey) || ''); } catch {}
      draftNote.hidden = true;
      refreshFile();
      card.run();
    });
    article.addEventListener('focusin', () => { activeCard = card; });
    article.addEventListener('mousedown', () => { activeCard = card; });

    (async () => {
      fileText = await fetchText(base + '/' + meta.file);
      let draft = null;
      try { draft = localStorage.getItem(draftKey); } catch {}
      if (fileText !== null) {
        setValue(fileText);
        sDraft.textContent = 'черновик: как в файле';
        if (draft !== null && draft !== fileText) draftNote.hidden = false;
        card.run(); // стартовый прогон — при открытии сразу видно состояние
      } else if (draft !== null) {
        setValue(draft);
        sDraft.textContent = 'файл недоступен — работаем с черновиком';
      }
      refreshFile();
    })();

    return card;
  }

  /* ───────────────────────── тема ───────────────────────── */
  function calcAgg() {
    const list = [...tasksEl.querySelectorAll('.task-card:not(.demo)')];
    let green = 0;
    list.forEach((c) => {
      const out = c.querySelector('.task-output');
      if (out.querySelector('.line.ok') && !out.querySelector('.line.fail')) green++;
    });
    topicStatus.textContent = 'зелёные задачи: ' + green + ' из ' + list.length;
  }
  const updateAgg = debounce(calcAgg, 300);
  setInterval(updateAgg, 1500); // async-проверки дописываются с задержкой

  async function loadTheory() {
    const md = await fetchText(base + '/theory.md');
    if (md && window.marked) {
      $('theory-body').innerHTML = window.marked.parse(md);
      $('theory-body').querySelectorAll('a[href]').forEach((a) => {
        const href = a.getAttribute('href');
        if (!/^(https?:|#|\/)/.test(href)) a.setAttribute('href', 'topics/' + topic + '/' + href);
      });
    } else {
      $('theory-body').innerHTML =
        '<p>Теория не загрузилась — она в файле <code>topics/' + topic + '/theory.md</code>.</p>';
    }
  }

  async function init() {
    loadTheory();
    let manifest = null;
    try {
      const r = await fetch(base + '/index.json');
      if (r.ok) manifest = await r.json();
    } catch {}
    if (!Array.isArray(manifest)) {
      tasksEl.innerHTML = '<p class="line warn">Не нашёлся ' + base + '/index.json.</p>';
      return;
    }
    if (!manifest.length) {
      // теоретическая тема: карточек нет — только конспект и вопросы
      document.querySelector('.topic-toolbar').style.display = 'none';
      document.querySelector('.editor-hint').style.display = 'none';
      tasksEl.innerHTML =
        '<div class="theory-note">📖 В этой теме пока только теория и вопросы — открой «Теория и вопросы» выше. '
        + 'Задачи с проверками добавим по мере подготовки: попроси ассистента «добавь задачи: ' + topic + '».</div>';
      return;
    }
    cards = manifest.map(makeCard);
  }

  $('run-all-btn').addEventListener('click', () => cards.forEach((c) => c.run()));
  $('bind-dir-btn').addEventListener('click', async () => {
    if (!('showDirectoryPicker' in window)) return;
    try {
      dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      topicStatus.textContent = '📁 папка привязана — «💾 В файл» пишет без диалогов';
    } catch (e) { /* отмена диалога */ }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); if (activeCard) activeCard.run(); }
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) { e.preventDefault(); if (activeCard) activeCard.save(); }
  });

  init();
})();
