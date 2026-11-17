section('Задача 2. Свой reduce');
// myReduce(arr, fn, initial): fn(acc, item, index, arr).
// Если initial не передан — стартуй с первого элемента.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myReduce(arr, fn, initial) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
check('сумма с initial', myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
check('сумма без initial', myReduce([1, 2, 3], (a, b) => a + b), 6);
check('максимум', myReduce([3, 7, 2, 9, 4], (a, b) => (a > b ? a : b)), 9);
check('объект-аккумулятор', myReduce(['a', 'bb', 'ccc'], (acc, s) => { acc[s[0]] = s.length; return acc; }, {}), { a: 1, b: 2, c: 3 });
