section('Задача 4. memoize(fn)');

function memoize(fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


let evals = 0;
const slowSquare = memoize((n) => { evals++; return n * n; });
tryRun(() => { slowSquare(4); slowSquare(4); slowSquare(5); });
check('вычислений два, а не три', evals, 2);
check('кэш отдаёт верное значение', tryRun(() => slowSquare(4)), 16);
