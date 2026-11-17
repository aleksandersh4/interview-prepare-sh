/* Раннер учебного стенда: хелперы для файлов тем + меню + автозапуск.
   Хелперы доступны в topics/*.js как глобальные функции:
     section(заголовок)          — заголовок блока задач
     log(...значения)            — строка вывода (как console.log)
     check(название, факт, ожид) — зелёная/красная проверка (deep equal)
     tryRun(() => выражение)     — безопасно вычислить (падение = предупреждение, не крэш) */
(function () {
  const output = document.getElementById('output');

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

  const line = (cls, html) =>
    output.insertAdjacentHTML('beforeend', '<div class="line ' + cls + '">' + html + '</div>');

  window.section = (title) =>
    output.insertAdjacentHTML('beforeend', '<h2 class="section">' + esc(title) + '</h2>');

  window.log = (...args) => line('log', args.map((a) => esc(fmt(a))).join(' '));

  function deepEqual(a, b) {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    if (a === b) return true;
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }

  window.check = (label, actual, expected) => {
    const ok = deepEqual(actual, expected);
    const hint = !ok && actual === undefined
      ? '<span class="hint"> — получено undefined: функция ещё не написана?</span>'
      : '';
    line(ok ? 'ok' : 'fail',
      (ok ? '✔ ' : '✘ ') + esc(label) + hint + (ok ? '' :
        '<br>   получено:   ' + esc(fmt(actual)) +
        '<br>   ожидалось: ' + esc(fmt(expected))));
  };

  window.tryRun = (fn, fallback) => {
    try { return fn(); } catch (e) { line('warn', '⚠ ' + esc(fmt(e))); return fallback; }
  };

  // Перехват console.*, чтобы «предскажи вывод» можно было делать привычным console.log
  ['log', 'info', 'warn', 'error'].forEach((level) => {
    const orig = console[level].bind(console);
    console[level] = (...args) => {
      line(level === 'log' ? 'log' : level, args.map((a) => esc(fmt(a))).join(' '));
      orig(...args);
    };
  });

  window.addEventListener('error', (e) => line('fail', '⛔ ' + esc(e.message)));
  window.addEventListener('unhandledrejection', (e) =>
    line('fail', '⛔ Необработанный reject: ' + esc(fmt(e.reason))));

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

  const titleEl = document.getElementById('topic-title');
  if (current && TOPICS.some(([id]) => id === current)) {
    titleEl.textContent = TOPICS.find(([id]) => id === current)[1];
    const script = document.createElement('script');
    script.src = 'topics/' + current + '.js';
    script.onerror = () => line('fail', 'Не нашёлся файл topics/' + esc(current) + '.js');
    script.onload = () => line('muted', '— файл выполнен: правь код → Ctrl+S → F5 —');
    document.body.appendChild(script);
  } else {
    titleEl.textContent = 'Как этим пользоваться';
    line('log', '1. Теория и вопросы с собеседований — в файлах topics/*.md (в WebStorm открой как Markdown).');
    line('log', '2. Задачи — в соседних topics/*.js: пиши реализацию вместо // TODO.');
    line('log', '3. Открой тему в меню выше → сохрани .js (Ctrl+S) → обнови страницу (F5). Красные проверки позеленеют.');
    line('log', '4. Решил — попроси у меня ревью, например: «проверь 02-scope-and-closures».');
  }
})();
