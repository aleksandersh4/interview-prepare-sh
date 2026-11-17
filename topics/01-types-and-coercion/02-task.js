section('Задача 2. getType без сюрпризов');

function getType(value) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('getType(null)', getType(null), 'null');
check('getType([1, 2])', getType([1, 2]), 'array');
check('getType(NaN)', getType(NaN), 'number');
check('getType(() => {})', getType(() => {}), 'function');
check('getType({})', getType({}), 'object');
check('getType("x")', getType('x'), 'string');
