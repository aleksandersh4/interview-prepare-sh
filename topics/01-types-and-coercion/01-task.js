section('Задача 1. Свой Object.is');
// Ведёт себя как ===, но:
//   objectIs(NaN, NaN) → true
//   objectIs(0, -0)    → false
// Подсказка: у 0 и -0 разный результат 1/x (Infinity vs -Infinity).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function objectIs(a, b) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
check('objectIs(NaN, NaN) === true', objectIs(NaN, NaN), true);
check('objectIs(0, -0) === false', objectIs(0, -0), false);
check('objectIs(5, "5") === false', objectIs(5, '5'), false);
check('objectIs(null, null) === true', objectIs(null, null), true);
