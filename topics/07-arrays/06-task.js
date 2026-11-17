section('Задача 6. chunk');

function chunk(arr, size) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('с остатком', chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
check('ровно', chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
check('size = 1', chunk(['a'], 1), [['a']]);
