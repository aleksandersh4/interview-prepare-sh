section('Задача 2. getType без сюрпризов');
// Верни строку: 'null' для null, 'array' для массивов, 'function' для функций,
// для остального — обычный typeof ('number', 'string', 'object', ...).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function getType(value) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
check('getType(null)', getType(null), 'null');
check('getType([1, 2])', getType([1, 2]), 'array');
check('getType(NaN)', getType(NaN), 'number');
check('getType(() => {})', getType(() => {}), 'function');
check('getType({})', getType({}), 'object');
check('getType("x")', getType('x'), 'string');
