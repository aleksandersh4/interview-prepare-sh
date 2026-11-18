section('Задача 3. unique');

function unique(arr) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('числа', unique([1, 2, 1, 3, 2]), [1, 2, 3]);
check('строки', unique(['a', 'b', 'a', 'a']), ['a', 'b']);
check('без дубликатов не меняет', unique([1, 2, 3]), [1, 2, 3]);
