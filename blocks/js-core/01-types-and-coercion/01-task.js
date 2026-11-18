section('Задача 1. Свой Object.is');

function objectIs(a, b) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('objectIs(NaN, NaN) === true', objectIs(NaN, NaN), true);
check('objectIs(0, -0) === false', objectIs(0, -0), false);
check('objectIs(5, "5") === false', objectIs(5, '5'), false);
check('objectIs(null, null) === true', objectIs(null, null), true);
