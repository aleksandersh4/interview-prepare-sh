section('Задача 4. mapWithLimit(items, fn, limit)');

function mapWithLimit(items, fn, limit) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  return Promise.resolve(); // заглушка
}


mapWithLimit([1, 2, 3, 4, 5], async (n) => n * 10, 2).then((res) =>
  check('результат как у map, порядок сохранён', res, [10, 20, 30, 40, 50]));
mapWithLimit([], async (n) => n, 2).then((res) => check('пустой массив', res, []));
