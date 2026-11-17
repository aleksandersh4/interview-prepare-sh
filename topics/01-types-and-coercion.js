// 01 · Типы данных и приведение типов
// Теория и вопросы: topics/01-types-and-coercion.md
// Красные проверки — нерешённые задачи: пиши код вместо TODO → Ctrl+S → F5.

section('Задача 1. Свой Object.is');
// Ведёт себя как ===, но:
//   objectIs(NaN, NaN) → true
//   objectIs(0, -0)    → false
// Подсказка: у 0 и -0 разный результат 1/x (Infinity vs -Infinity).
function objectIs(a, b) {
  // TODO
}
check('objectIs(NaN, NaN) === true', objectIs(NaN, NaN), true);
check('objectIs(0, -0) === false', objectIs(0, -0), false);
check('objectIs(5, "5") === false', objectIs(5, '5'), false);
check('objectIs(null, null) === true', objectIs(null, null), true);

section('Задача 2. getType без сюрпризов');
// Верни строку: 'null' для null, 'array' для массивов, 'function' для функций,
// для остального — обычный typeof ('number', 'string', 'object', ...).
function getType(value) {
  // TODO
}
check('getType(null)', getType(null), 'null');
check('getType([1, 2])', getType([1, 2]), 'array');
check('getType(NaN)', getType(NaN), 'number');
check('getType(() => {})', getType(() => {}), 'function');
check('getType({})', getType({}), 'object');
check('getType("x")', getType('x'), 'string');

section('Задача 3. Головоломки: объясни каждый результат');
// Сначала ответь устно, потом запусти и сверься. Спроси себя «почему», а не «что».
log('[] + []           =', [] + []);
log('[] + {}           =', [] + {});
log('"" - 1            =', '' - 1);
log("'5' + 3           =", '5' + 3);
log("'5' - 3           =", '5' - 3);
log('null == undefined =', null == undefined);
log('null == 0         =', null == 0);
log('null >= 0         =', null >= 0);
log('NaN == NaN        =', NaN == NaN);
log("Boolean('false')  =", Boolean('false'));
log("Boolean([])       =", Boolean([]));
log("'b' + 'a' + +'a' + 'a' =", 'b' + 'a' + +'a' + 'a');

section('Бонус: проверь себя ещё раз');
// Одна из этих строк «врёт» про тип. Найди какая и почему (ответ — в .md, вопрос 4).
log('typeof null =', typeof null);
log('typeof undefined =', typeof undefined);
log('typeof Array.isArray =', typeof Array.isArray);
log('typeof Symbol() =', typeof Symbol());
