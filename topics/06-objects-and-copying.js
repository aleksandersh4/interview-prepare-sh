// 06 · Объекты и копирование
// Теория и вопросы: topics/06-objects-and-copying.md

section('Задача 1. deepClone');
// Рекурсивно клонируй: объекты, массивы, Date (new Date(time)).
// Примитивы возвращай как есть. Циклы ссылок можно не учитывать.
function deepClone(value) {
  // TODO
}
const original = { a: 1, b: { c: [1, 2, { d: 3 }] }, when: new Date(0) };
const cloned = deepClone(original);
if (cloned && typeof cloned === 'object') {
  cloned.b.c[2].d = 999;
  check('оригинал не изменился', original.b.c[2].d, 3);
  check('клон изменился независимо', cloned.b.c[2].d, 999);
  check('Date склонировался как Date', cloned.when instanceof Date, true);
  check('значение Date сохранилось', cloned.when.getTime(), 0);
  check('это разные объекты', cloned.b !== original.b, true);
} else {
  log('deepClone ещё не написан — реализации тесты ниже загорятся после');
}

section('Задача 2. shallowEqual');
// true, если одинаковый набор ключей и равные значения (по ===).
// Вложенные объекты сравниваются ссылкой — это осознанно «поверхностно».
function shallowEqual(a, b) {
  // TODO
}
check('одинаковые ключи/значения (порядок не важен)', shallowEqual({ x: 1, y: 'a' }, { y: 'a', x: 1 }), true);
check('разные значения', shallowEqual({ x: 1 }, { x: 2 }), false);
check('лишний ключ', shallowEqual({ x: 1 }, { x: 1, y: 2 }), false);
check('вложенные — по ссылке, а не структурно', shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }), false);

section('Задача 3. mergeDeep');
// Рекурсивно слей source в target и верни НОВЫЙ объект (входы не мутировать).
// Правило: если по ключу в обоих объекты — сливаем рекурсивно, иначе берём из source.
function mergeDeep(target, source) {
  // TODO
}
check('вложенные сливаются', mergeDeep({ a: { x: 1, y: 2 }, b: 1 }, { a: { y: 9 } }), { a: { x: 1, y: 9 }, b: 1 });
check('глубже двух уровней', mergeDeep({ a: { b: { c: 1, d: 2 } } }, { a: { b: { d: 3 } } }), { a: { b: { c: 1, d: 3 } } });
check('не мутирует входы', (() => {
  const t = { a: { x: 1 } };
  mergeDeep(t, { a: { y: 2 } });
  return t;
})(), { a: { x: 1 } });

section('Демо: ссылки и spread');
const shared = { n: 1 };
const alias = shared;
alias.n = 2;
log('после изменения alias: shared.n =', shared.n, '(2 — это один объект)');

const copy = { ...shared };
copy.n = 3;
log('после изменения поверхностной копии: shared.n =', shared.n, '(2 — верхний уровень новый)');

const nested = { inner: { k: 1 } };
const shallowNested = { ...nested };
shallowNested.inner.k = 42;
log('после изменения вложенного в копии: nested.inner.k =', nested.inner.k, '(42 — вложенный объект всё ещё общий!)');

log('0 || "дефолт" =', 0 || 'дефолт');
log('0 ?? "дефолт" =', 0 ?? 'дефолт');
log('"" || "дефолт" =', '' || 'дефолт');
log('user?.address?.street при отсутствии =', ({ user: {} }).user?.address?.street);
