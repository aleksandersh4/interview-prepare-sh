// Одноразовое добавление новых задач (2026-11-17): файлы созданы руками,
// этот скрипт вписывает их в index.json (перед первой демо-карточкой)
// и обновляет описание переформатированной задачи 01/03.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../topics/', import.meta.url)));

const NEW = [
  ['01-types-and-coercion', '05-task.js', 'Задача 4. Точные сравнения чисел',
    '`0.1 + 0.2 !== 0.3` — числа с дробной частью хранятся в двоичном виде с погрешностью.  \nНапиши `numbersEqual(a, b, epsilon = Number.EPSILON)`: возвращает `true`, если `|a − b| < epsilon`.'],
  ['02-scope-and-closures', '08-task.js', 'Задача 7. Калькулятор с цепочкой вызовов',
    '`createCalculator(start = 0)` возвращает объект с методами `add(n)`, `subtract(n)`, `multiply(n)`, `divide(n)`, `reset()`, `value()`.  \nВсе методы, кроме `value` и `reset`, возвращают сам калькулятор — вызовы цепочкой: `createCalculator(10).add(5).subtract(3).value()` → `12`. Каждый калькулятор независим (замыкание).'],
  ['03-this-and-bind', '04-task.js', 'Задача 3. bindAll',
    '`bindAll(obj)` возвращает **новый** объект: все методы исходного привязаны к нему (как через `bind`), остальные свойства скопированы как есть.  \nЗачем: методы можно отрывать от объекта и передавать колбэками — классическое лекарство от потери `this`.'],
  ['04-functions-and-currying', '06-task.js', 'Задача 5. unary — почини map(parseInt)',
    "`['1','2','3'].map(parseInt)` даёт `[1, NaN, NaN]`: `map` передаёт три аргумента, а `parseInt` трактует второй как систему счисления.  \nНапиши `unary(fn)`: возвращает функцию, которая передаёт `fn` только **первый** аргумент."],
  ['05-prototypes-and-classes', '06-task.js', 'Задача 5. Свой Object.create',
    'Напиши `objectCreate(proto)`: возвращает **пустой** объект, у которого `proto` стоит в цепочке прототипов (`Object.getPrototypeOf(obj) === proto`).  \nВариант `{ __proto__: proto }` — читерство: сделай через функцию-конструктор с `prototype`.'],
  ['06-objects-and-copying', '05-task.js', 'Задача 4. getPath — безопасное чтение',
    "`getPath(obj, 'a.b.c', fallback)` — чтение вложенного свойства по пути из ключей через точку. Если по пути `null`/`undefined` или ключа нет — вернуть `fallback` (по умолчанию `undefined`). Это ручная версия `?.`."],
  ['07-arrays', '08-task.js', 'Задача 7. sortBy без мутации',
    '`sortBy(items, key)` возвращает **новый** массив объектов, отсортированный по полю `key` по возрастанию. Исходный массив не мутировать (вспомни `[...arr].sort()` и стабильность сортировки).'],
  ['09-promises-and-async', '07-task.js', 'Задача 5. promisify',
    '`promisify(fn)` превращает функцию с колбэком `(err, result)` в функцию, возвращающую промис.  \nКолбэк — всегда последний аргумент исходной `fn`. Пришли в колбэк ошибку → `reject(err)`, иначе `resolve(result)`.'],
  ['10-dom-and-events', '06-task.js', 'Задача 5. Клик вне элемента',
    '`onClickOutside(el, handler)`: подписывается на клики по `document` и вызывает `handler`, только если клик прошёл **вне** `el`, включая его детей (спроси `el.contains(e.target)`). Классика для закрытия попапов.'],
];

for (const [topic, file, title, description] of NEW) {
  const p = join(root, topic, 'index.json');
  const manifest = JSON.parse(readFileSync(p, 'utf8'));
  if (!manifest.some((e) => e.file === file)) {
    const at = manifest.findIndex((e) => e.kind === 'demo');
    const entry = { file, title, kind: 'task', description };
    if (at === -1) manifest.push(entry); else manifest.splice(at, 0, entry);
    writeFileSync(p, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`${topic}: + ${file} (${title})`);
  }
}

// Новое описание для переформатированной головоломки 01/03
const p01 = join(root, '01-types-and-coercion', 'index.json');
const m01 = JSON.parse(readFileSync(p01, 'utf8'));
const quiz = m01.find((e) => e.file === '03-task.js');
if (quiz && !(quiz.description || '').includes('прогнозы')) {
  quiz.description = 'Сначала впиши свои **прогнозы** в массив `answers` — по одному значению на выражение, в том же порядке. Потом запусти карточку: зелёное — угадал, а в строке «ожидалось» увидишь правильный ответ там, где промахнулся. Подсказки — в теории выше.';
  writeFileSync(p01, JSON.stringify(m01, null, 2) + '\n');
  console.log('01: описание головоломки обновлено');
}
console.log('готово');
