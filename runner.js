/* Раннер учебного стенда.
   - makeHelpers(outputEl) — фабрика section/log/check/tryRun, привязанных к конкретному
     элементу вывода (у каждой карточки задачи свой). Экспортируется в window для editor.js.
   - Глобальные window.section/log/check/tryRun пишут в #output — нужны file://-режиму
     (карточки грузятся <script>-цепочкой) и перехвату console.
   - Меню тем TOPICS, загрузка темы, домашняя страница.
   Контракты — см. CONTEXT.md. */
(function () {
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

  const fmt = (v) => {
    if (typeof v === 'string') return JSON.stringify(v);
    if (typeof v === 'function') return '[fn ' + (v.name || 'anonymous') + ']';
    if (typeof v === 'undefined') return 'undefined';
    if (v === null) return 'null';
    if (Number.isNaN(v)) return 'NaN';
    if (v instanceof Error) return v.name + ': ' + v.message;
    if (v instanceof Element) return '<' + v.tagName.toLowerCase() + '>';
    try { return JSON.stringify(v) ?? String(v); } catch { return String(v); }
  };

  function deepEqual(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }

  function makeHelpers(outputEl) {
    const line = (cls, html) =>
      outputEl.insertAdjacentHTML('beforeend', '<div class="line ' + cls + '">' + html + '</div>');
    return {
      section: (title) =>
        outputEl.insertAdjacentHTML('beforeend', '<div class="section">' + esc(title) + '</div>'),
      log: (...args) => line('log', args.map((a) => esc(fmt(a))).join(' ')),
      check: (label, actual, expected) => {
        const ok = deepEqual(actual, expected);
        const hint = !ok && actual === undefined
          ? '<span class="hint"> — получено undefined: функция ещё не написана?</span>'
          : '';
        line(ok ? 'ok' : 'fail',
          (ok ? '✔ ' : '✘ ') + esc(label) + hint + (ok ? '' :
            '<br>   получено:   ' + esc(fmt(actual)) +
            '<br>   ожидалось: ' + esc(fmt(expected))));
      },
      tryRun: (fn, fallback) => {
        try { return fn(); } catch (e) { line('warn', '⚠ ' + esc(fmt(e))); return fallback; }
      },
    };
  }
  window.makeHelpers = makeHelpers;

  // Глобальные хелперы → #output (file://-режим и перехват console)
  const globalOut = document.getElementById('output');
  const g = makeHelpers(globalOut);
  window.section = g.section;
  window.log = g.log;
  window.check = g.check;
  window.tryRun = g.tryRun;

  ['log', 'info', 'warn', 'error'].forEach((level) => {
    const orig = console[level].bind(console);
    console[level] = (...args) => {
      const line = document.createElement('div');
      line.className = 'line ' + (level === 'log' ? 'log' : level);
      line.textContent = args.map(fmt).join(' ');
      globalOut.appendChild(line);
      orig(...args);
    };
  });
  window.addEventListener('error', (e) => {
    globalOut.insertAdjacentHTML('beforeend', '<div class="line fail">⛔ ' + esc(e.message) + '</div>');
  });
  window.addEventListener('unhandledrejection', (e) => {
    globalOut.insertAdjacentHTML('beforeend',
      '<div class="line fail">⛔ Необработанный reject: ' + esc(fmt(e.reason)) + '</div>');
  });

  const TOPICS = [
    ['01-types-and-coercion',     '01 · Типы и приведение'],
    ['02-scope-and-closures',     '02 · Скоуп и замыкания'],
    ['03-this-and-bind',          '03 · this, call/apply/bind'],
    ['04-functions-and-currying', '04 · Функции и каррирование'],
    ['05-prototypes-and-classes', '05 · Прототипы и классы'],
    ['06-objects-and-copying',    '06 · Объекты и копирование'],
    ['07-arrays',                 '07 · Массивы'],
    ['08-event-loop',             '08 · Событийный цикл'],
    ['09-promises-and-async',     '09 · Promise и async/await'],
    ['10-dom-and-events',         '10 · DOM и события'],
  ];

  const current = new URLSearchParams(location.search).get('topic');
  document.getElementById('nav').innerHTML = TOPICS
    .map(([id, title]) =>
      '<a class="topic-link' + (id === current ? ' active' : '') + '" href="?topic=' + id + '">' + esc(title) + '</a>')
    .join('');

  // file://: fetch недоступен — карточки грузим по одной <script>-цепочкой по номерам
  const injectScript = (src) => new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  async function loadCardsLegacy(id) {
    outer: for (let n = 1; n <= 40; n++) {
      const base = String(n).padStart(2, '0');
      for (const name of [`${base}-task.js`, `${base}-demo.js`]) {
        if (await injectScript(`topics/${id}/${name}`)) continue outer;
      }
      break;
    }
    globalOut.insertAdjacentHTML('beforeend', '<div class="line muted">— конец темы —</div>');
  }

  const titleEl = document.getElementById('topic-title');
  if (current && TOPICS.some(([id]) => id === current)) {
    titleEl.textContent = TOPICS.find(([id]) => id === current)[1];
    if (location.protocol === 'file:') {
      document.body.classList.add('filemode');
      globalOut.hidden = false;
      g.log('warn', 'Песочница с карточками работает по http: запусти «node serve.js» и открой http://127.0.0.1:8127.');
      g.log('log', 'Сейчас старый режим: карточки темы выполняются по очереди, решения — в topics/' + current + '/ через WebStorm.');
      loadCardsLegacy(current);
    }
    // по http карточки строит editor.js
  } else {
    document.body.classList.add('home');
    titleEl.textContent = 'Как этим пользоваться';
    document.getElementById('home-hint').hidden = false;
    document.getElementById('home-hint').innerHTML =
      '<ol>' +
      '<li>Выбери тему в меню сверху.</li>' +
      '<li>Разверни «📖 Теория и вопросы» — конспект и вопросы с собеседований.</li>' +
      '<li>Каждая задача — отдельная карточка: слева код (пиши между маркерами ' +
      '<b>«▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ»</b>), справа её проверки. «▶ Запустить» — зелёное значит решено.</li>' +
      '<li>«📁 Папка темы» — один раз укажи папку темы, дальше «💾 В файл» на карточке ' +
      'пишет прямо в <code>topics/NN-*/…-task.js</code> без диалогов.</li>' +
      '<li>Решил — попроси у меня ревью: «проверь 02-scope-and-closures».</li>' +
      '</ol>' +
      '<p>Песочница работает по http — если открыл файл с диска, запусти ' +
      '<code>node serve.js</code> и открой <code>http://127.0.0.1:8127</code>.</p>';
  }
})();
