section('Задача 4. flatten и flattenDeep');

function flatten(arr) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


function flattenDeep(arr) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('flatten: один уровень', flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);
check('flatten: плоский вход', flatten([1, 2]), [1, 2]);
check('flattenDeep: вся вложенность', flattenDeep([1, [2, [3, [4]]]]), [1, 2, 3, 4]);
