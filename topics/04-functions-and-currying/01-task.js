section('Задача 1. curry(fn)');
// curry((a, b, c) => ...) возвращает функцию, которую можно звать
// и по одному аргументу f(a)(b)(c), и группами f(a, b)(c).
// Ориентируйся на fn.length — количество объявленных параметров.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function curry(fn) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const volume = (a, b, c) => a * b * c;
check('curry: по одному', tryRun(() => curry(volume)(2)(3)(4)), 24);
check('curry: группами', tryRun(() => curry(volume)(2, 3)(4)), 24);
check('curry: все сразу', tryRun(() => curry(volume)(2, 3, 4)), 24);
