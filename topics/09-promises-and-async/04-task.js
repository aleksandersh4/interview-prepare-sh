section('Задача 4. mapWithLimit(items, fn, limit)');
// Как map, но fn возвращает промис и одновременно должно работать не больше limit штук.
// Порядок результата — как у map (по индексам, а не по времени завершения).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function mapWithLimit(items, fn, limit) {
  // TODO
  return Promise.resolve(); // заглушка
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
mapWithLimit([1, 2, 3, 4, 5], async (n) => n * 10, 2).then((res) =>
  check('результат как у map, порядок сохранён', res, [10, 20, 30, 40, 50]));
mapWithLimit([], async (n) => n, 2).then((res) => check('пустой массив', res, []));
