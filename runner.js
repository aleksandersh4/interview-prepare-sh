/* Раннер учебного стенда.
   - makeHelpers(outputEl) — фабрика section/log/check/tryRun, привязанных к элементу вывода.
   - Двухуровневая навигация: табы блоков (цвет технологии) + чипы тем.
   - file://: карточки темы грузятся <script>-цепочкой по manifest-путям.
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

  /* ───────── Навигация: блоки → темы ───────── */
  const BLOCKS = window.BLOCKS || [];
  const findTopic = (slug) => {
    for (const b of BLOCKS) {
      const t = b.topics.find((x) => x.slug === slug);
      if (t) return { block: b, topic: t };
    }
    return null;
  };
  window.__findTopic = findTopic;

  const params = new URLSearchParams(location.search);
  let topicParam = params.get('topic');
  let blockParam = params.get('block');

  let current = topicParam ? findTopic(topicParam) : null;
  if (!current && blockParam) {
    const b = BLOCKS.find((x) => x.slug === blockParam);
    current = b ? { block: b, topic: b.topics[0] } : null;
  }
  const activeBlock = current ? current.block : null;
  window.CURRENT_BLOCK = activeBlock ? activeBlock.slug : null;

  const blocksNav = document.getElementById('blocks-nav');
  blocksNav.innerHTML = BLOCKS.map((b) => {
    const active = activeBlock && b.slug === activeBlock.slug ? ' active' : '';
    return '<a class="block-tab' + active + '" style="--c:' + b.color + '"'
      + ' href="?block=' + b.slug + '"><span class="dot"></span>' + esc(b.title) + '</a>';
  }).join('');

  const topicsNav = document.getElementById('topics-nav');
  topicsNav.hidden = !activeBlock;
  if (activeBlock) {
    topicsNav.style.setProperty('--c', activeBlock.color);
    topicsNav.innerHTML = activeBlock.topics.map((t) => {
      const active = current && t.slug === current.topic.slug ? ' active' : '';
      const badge = t.hasTasks ? '' : '<sup class="theory-only" title="только теория">📖</sup>';
      return '<a class="topic-chip' + active + '" href="?block=' + activeBlock.slug
        + '&amp;topic=' + t.slug + '">' + esc(t.title) + badge + '</a>';
    }).join('');
  }

  /* ───────── file://: цепочка карточек ───────── */
  const injectScript = (src) => new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  async function loadCardsLegacy(blockSlug, topicSlug) {
    outer: for (let n = 1; n <= 40; n++) {
      const base = String(n).padStart(2, '0');
      for (const name of [`${base}-task.js`, `${base}-demo.js`]) {
        if (await injectScript(`blocks/${blockSlug}/${topicSlug}/${name}`)) continue outer;
      }
      break;
    }
    globalOut.insertAdjacentHTML('beforeend', '<div class="line muted">— конец темы —</div>');
  }

  const titleEl = document.getElementById('topic-title');
  if (current) {
    document.title = current.topic.title + ' · JS/Angular собеседования';
    titleEl.style.setProperty('--c', current.block.color);
    titleEl.textContent = current.topic.title;
    if (location.protocol === 'file:') {
      document.body.classList.add('filemode');
      globalOut.hidden = false;
      g.log('warn', 'Песочница с карточками работает по http: запусти «node serve.js» и открой http://127.0.0.1:8127.');
      g.log('log', 'Сейчас старый режим: карточки темы выполняются по очереди, решения — в файлах темы через WebStorm.');
      loadCardsLegacy(current.block.slug, current.topic.slug);
    }
    // по http карточки строит editor.js
  } else {
    document.body.classList.add('home');
    titleEl.textContent = 'Как этим пользоваться';
    document.getElementById('home-hint').hidden = false;
    document.getElementById('home-hint').innerHTML =
      '<ol>' +
      '<li>Сверху — <b>блоки</b> (по цветам технологий: JS — жёлтый, TypeScript — синий, RxJS — розовый, Angular — красный…). Выбери блок.</li>' +
      '<li>Вторым рядом — <b>темы</b> блока: 📖 — только теория и вопросы, без 📖 — есть задачи с проверками.</li>' +
      '<li>В теме с задачами: условие — в синем блоке, код пиши в функции-заготовке (маркер «▼▼▼»), ' +
      '«▶ Запустить» (Ctrl+Enter) — проверки под кодом.</li>' +
      '<li>«📁 Папка темы» — один раз привяжи папку темы, дальше «💾 В файл» пишет без диалогов.</li>' +
      '<li>Решил — попроси ревью: «проверь 02-scope-and-closures» или «проверь меня: subjects».</li>' +
      '</ol>' +
      '<p>Полный режим — по http: <code>node serve.js</code> → <code>http://127.0.0.1:8127</code>. ' +
      'Карта всех вопросов — в чек-листе и CONTEXT.md.</p>';
  }
})();
