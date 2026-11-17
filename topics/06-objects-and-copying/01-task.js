section('Задача 1. deepClone');
// Рекурсивно клонируй: объекты, массивы, Date (new Date(time)).
// Примитивы возвращай как есть. Циклы ссылок можно не учитывать.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function deepClone(value) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
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
