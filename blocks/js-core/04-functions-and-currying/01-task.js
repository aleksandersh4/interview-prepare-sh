section('Задача 1. curry(fn)');

function curry(fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const volume = (a, b, c) => a * b * c;
check('curry: по одному', tryRun(() => curry(volume)(2)(3)(4)), 24);
check('curry: группами', tryRun(() => curry(volume)(2, 3)(4)), 24);
check('curry: все сразу', tryRun(() => curry(volume)(2, 3, 4)), 24);
