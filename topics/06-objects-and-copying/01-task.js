section('Задача 1. deepClone');

function deepClone(value) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
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
