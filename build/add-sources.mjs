// Одноразовое (2026-11-17): регистрирует новые «реальные» карточки и проставляет
// поле source (+ sourceUrl, где ссылка проверена поиском) всем задачам/квизам.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../topics/', import.meta.url)));
const GF = 'https://www.greatfrontend.com/questions/javascript/debounce';
const FP = 'https://www.frontprep.com/javascript-coding/throttle';
const GH = 'https://github.com/sumitsingh4411/frontend-interview-questions/blob/main/03-javascript/promise-polyfills-and-throttle-debounce.md';

// новые карточки
const NEW = [
  ['09-promises-and-async', '08-task.js', 'Задача 6. fetchJson с таймаутом', 'task',
    "Напиши `fetchJson(url, { timeoutMs, fetchImpl = fetch })` — реальный API-клиент:\n\n- ответ `ok` → распарсить и вернуть JSON\n- статус не 2xx (например 404) → reject, статус — в тексте ошибки\n- сервер молчит дольше `timeoutMs` → reject (`AbortController` + `AbortError`/`TimeoutError`)\n\nПараметр `fetchImpl` — dependency injection: тесты подменяют им сеть, а твой код с настоящим `fetch` идёт в прод. Попробовать вживую — демо «живой запрос» ниже.",
    'fetch + AbortController-таймаут — спрашивают на мидл+ («как ограничить/отменить запрос»)'],
  ['09-promises-and-async', '09-task.js', 'Задача 7. Фолбэк зеркал API', 'task',
    "Напиши `getFirstSuccessful(urls, fetchImpl)` — живучий клиент: запрашивает **все** адреса одновременно и резолвится данными **первого успешного** (JSON). Ошибки остальных игнорируются; если упали все — reject.\n\nПо сути — свой `Promise.any` из реальной жизни (зеркала/фолбэк CDN). `fetchImpl(url)` возвращает промис с `Response`.",
    'Фолбэк зеркал API — «Promise.any из реальной жизни»; сам Promise.any — популярный вопрос'],
  ['09-promises-and-async', '10-demo.js', 'Демо: живой запрос к публичному API', 'demo',
    'Настоящий `fetch` в настоящий интернет: jsonplaceholder — учебное API, которое ведёт себя как продовое. Смотри статус, JSON и обработку ошибок.',
    'Живое публичное API: jsonplaceholder.typicode.com'],
  ['06-objects-and-copying', '06-task.js', 'Задача 5. parseQuery — разбор адресной строки', 'task',
    "Напиши `parseQuery(search)` — как `URLSearchParams`, но руками:\n\n- `'?page=2&sort=name'` → `{ page: '2', sort: 'name' }`\n- работает и без вопросительного знака\n- повтор ключа → массив: `'?tag=js&tag=interview'` → `{ tag: ['js', 'interview'] }`\n- `%D1%81...` декодируется (`decodeURIComponent`), `+` — пробел, как в формах\n\nЭто то, что реально делает роутинг и парсинг фильтров в приложениях.",
    'Парсинг query-строки — частая live-задача (роутинг, фильтры, аналитика)'],
];

// источники: file → [текст, url?]
const SRC = {
  '01-types-and-coercion': {
    '01-task.js': ['Канон: вопрос «Object.is vs ===» — стандарт JS-секций, здесь в форме задачи'],
    '02-task.js': ['Канон: «typeof и его сюрпризы» — спрашивают почти всегда'],
    '03-task.js': ['Формат «что выведет этот код» — визитная карточка JS-интервью'],
    '05-task.js': ['Канон: «почему 0.1 + 0.2 !== 0.3 и как тогда сравнивать»'],
  },
  '02-scope-and-closures': {
    '01-task.js': ['Замыкания: счётчик — первая задача после «расскажи про замыкания»'],
    '02-task.js': ['Приватное состояние через замыкание — классика собеседований'],
    '03-task.js': ['once — есть в каталогах задач (GreatFrontend); спрашивают вместе с memoize'],
    '04-task.js': ['memoize — канон функциональных секций'],
    '05-task.js': ['Debounce — одна из самых задаваемых live-coding задач фронтенда', GF],
    '06-task.js': ['Throttle — пара к debounce; FrontPrep приводит как вопрос с собеседования Microsoft', FP],
    '08-task.js': ['Machine-coding интервью: калькулятор с цепочкой — частый формат'],
  },
  '03-this-and-bind': {
    '01-task.js': ['Полифилл bind — стандартная live-coding задача'],
    '02-task.js': ['Полифилл call/apply — спрашивают тройкой с bind'],
    '04-task.js': ['bindAll — реальная практика + вопрос «почему методы теряют this»'],
  },
  '04-functions-and-currying': {
    '01-task.js': ['Каррирование — канон; есть в каталогах задач (GreatFrontend)'],
    '02-task.js': ['sum(1)(2)(3) — одна из самых узнаваемых задач русскоязычных собеседований'],
    '03-task.js': ['pipe/compose — канон функциональных секций'],
    '04-task.js': ['arguments vs rest — теорвопрос + мини-задача в одном'],
    '06-task.js': ['Знаменитая бага map(parseInt) — спрашивают как «почему не работает»'],
  },
  '05-prototypes-and-classes': {
    '01-task.js': ['«Что делает new» + «напишите свой new» — обязательная связка про прототипы'],
    '02-task.js': ['Наследование ES5 без классов — классика, которую до сих пор просят'],
    '03-task.js': ['extends/super — базовый вопрос про классы'],
    '04-task.js': ['«Как работает instanceof» + ручная реализация — обычный follow-up'],
    '06-task.js': ['Реализация Object.create — частый сосед задачи про new'],
  },
  '06-objects-and-copying': {
    '01-task.js': ['Deep clone — top-задача всех банков вопросов'],
    '02-task.js': ['Сравнение объектов «по значению» — частый вопрос и задача'],
    '03-task.js': ['Слияние конфигураций — реальная прод-задача, любят на мидл+'],
    '05-task.js': ['«get» по строковому пути — есть в каталогах задач (GreatFrontend)'],
    '06-task.js': ['Парсинг query-строки — частая live-задача (роутинг, фильтры, аналитика)'],
  },
  '07-arrays': {
    '01-task.js': ['Полифилл map — must-have первых экранов'],
    '02-task.js': ['Полифилл reduce — спрашивают вместе с map'],
    '03-task.js': ['Дедупликация массива — базовая задача всех банков'],
    '04-task.js': ['flatten/flat — есть в банках задач (polyfill для flat)'],
    '05-task.js': ['groupBy — типовая задача на reduce'],
    '06-task.js': ['chunk — типовая задача всех сборников'],
    '08-task.js': ['Сортировка объектов — реальная CRUD-задача, спрашивают с компаратором'],
  },
  '08-event-loop': {
    '01-demo.js': ['«Что выведет» на event loop — вопрос №1 JS-интервью'],
    '02-demo.js': ['async/await против .then — порядок выполнения, топ-вопрос'],
  },
  '09-promises-and-async': {
    '01-task.js': ['sleep/delay — первый вопрос после теории промисов'],
    '02-task.js': ['Полифилл Promise.all — есть в банках вопросов (frontend-interview-questions)', GH],
    '03-task.js': ['Retry с паузой — реальная прод-задача, мидл+'],
    '04-task.js': ['Ограничение параллелизма — популярная задача мидл/сеньор'],
    '07-task.js': ['Промисификация — канон после колбэк-вопросов'],
    '08-task.js': ['fetch + AbortController-таймаут — спрашивают на мидл+ («как отменить запрос»)'],
    '09-task.js': ['Фолбэк зеркал API — Promise.any из реальной жизни'],
    '10-demo.js': ['Живое публичное API: jsonplaceholder.typicode.com'],
  },
  '10-dom-and-events': {
    '01-task.js': ['Делегирование — топ-вопрос DOM-части любого интервью'],
    '02-task.js': ['data-атрибуты + делегирование — реальный паттерн SPA'],
    '03-task.js': ['Поиск с debounce — самая частая DOM-задача (в связке с темой 02)', GF],
    '04-task.js': ['CustomEvent + detail — средне-частый вопрос про события'],
    '06-task.js': ['onClickOutside — есть в каталогах задач (GreatFrontend); закрытие попапов'],
  },
};

// 1) регистрация новых
for (const [topic, file, title, kind, description, source] of NEW) {
  const p = join(root, topic, 'index.json');
  const manifest = JSON.parse(readFileSync(p, 'utf8'));
  if (!manifest.some((e) => e.file === file)) {
    manifest.push({ file, title, kind, description, source });
    writeFileSync(p, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`+ ${topic}/${file}`);
  }
}

// 2) источники всем
let n = 0;
for (const [topic, files] of Object.entries(SRC)) {
  const p = join(root, topic, 'index.json');
  const manifest = JSON.parse(readFileSync(p, 'utf8'));
  for (const [file, [text, url]] of Object.entries(files)) {
    const e = manifest.find((m) => m.file === file);
    if (!e) { console.warn(`! нет ${topic}/${file}`); continue; }
    e.source = text;
    if (url) e.sourceUrl = url;
    n++;
  }
  writeFileSync(p, JSON.stringify(manifest, null, 2) + '\n');
}
console.log(`источников проставлено: ${n}`);
