// 07 · Массивы и их методы
// Теория и вопросы: topics/07-arrays.md

section('Задача 1. Свой map');
// myMap(arr, fn) → новый массив, где каждый элемент = fn(item, index, arr).
// Вход не мутируется, пустой массив → пустой массив.
function myMap(arr, fn) {
  // TODO
}
check('удвоение', myMap([1, 2, 3], (x) => x * 2), [2, 4, 6]);
check('индекс доступен', myMap(['a', 'b'], (s, i) => s + i), ['a0', 'b1']);
check('пустой массив', myMap([], (x) => x), []);
check('не мутирует вход', (() => { const src = [1, 2]; myMap(src, (x) => x * 10); return src; })(), [1, 2]);

section('Задача 2. Свой reduce');
// myReduce(arr, fn, initial): fn(acc, item, index, arr).
// Если initial не передан — стартуй с первого элемента.
function myReduce(arr, fn, initial) {
  // TODO
}
check('сумма с initial', myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
check('сумма без initial', myReduce([1, 2, 3], (a, b) => a + b), 6);
check('максимум', myReduce([3, 7, 2, 9, 4], (a, b) => (a > b ? a : b)), 9);
check('объект-аккумулятор', myReduce(['a', 'bb', 'ccc'], (acc, s) => { acc[s[0]] = s.length; return acc; }, {}), { a: 1, b: 2, c: 3 });

section('Задача 3. unique');
// Убери дубликаты, сохранив порядок первых вхождений.
// Подсказка про способ: Set — самый частый ответ; на ревью расскажу ещё два.
function unique(arr) {
  // TODO
}
check('числа', unique([1, 2, 1, 3, 2]), [1, 2, 3]);
check('строки', unique(['a', 'b', 'a', 'a']), ['a', 'b']);
check('без дубликатов не меняет', unique([1, 2, 3]), [1, 2, 3]);

section('Задача 4. flatten и flattenDeep');
// flatten([1, [2, 3], [4, [5]]])       → [1, 2, 3, 4, [5]]   — один уровень
// flattenDeep([1, [2, [3, [4]]]])      → [1, 2, 3, 4]        — вся вложенность
function flatten(arr) {
  // TODO
}
function flattenDeep(arr) {
  // TODO
}
check('flatten: один уровень', flatten([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);
check('flatten: плоский вход', flatten([1, 2]), [1, 2]);
check('flattenDeep: вся вложенность', flattenDeep([1, [2, [3, [4]]]]), [1, 2, 3, 4]);

section('Задача 5. groupBy');
// groupBy(arr, fn) → объект { [ключ]: [элементы] }, ключ возвращает fn(item).
function groupBy(arr, fn) {
  // TODO
}
const people = [
  { name: 'Аня', dept: 'front' },
  { name: 'Борис', dept: 'back' },
  { name: 'Вера', dept: 'front' },
];
check('группировка по dept', groupBy(people, (u) => u.dept), {
  front: [people[0], people[2]],
  back: [people[1]],
});
check('группировка чисел по чётности', groupBy([1, 2, 3, 4], (n) => (n % 2 ? 'odd' : 'even')), {
  odd: [1, 3],
  even: [2, 4],
});

section('Задача 6. chunk');
// chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]] — последний кусок может быть короче.
function chunk(arr, size) {
  // TODO
}
check('с остатком', chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
check('ровно', chunk([1, 2, 3, 4], 2), [[1, 2], [3, 4]]);
check('size = 1', chunk(['a'], 1), [['a']]);

section('Демо: sort мутирует и сравнивает строки');
const nums = [10, 9, 1];
const sorted = nums.sort();
log('nums после sort():', nums, '(исходник изменился)');
log('sort() без компаратора дал:', sorted, '(сравнение как строк: "1" < "10" < "9")');
log('правильно для чисел:', [...nums].sort((a, b) => a - b), 'или nums.toSorted((a, b) => a - b)');
