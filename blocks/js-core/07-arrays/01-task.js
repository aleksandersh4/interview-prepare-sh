section('Задача 1. Свой map');

function myMap(arr, fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('удвоение', myMap([1, 2, 3], (x) => x * 2), [2, 4, 6]);
check('индекс доступен', myMap(['a', 'b'], (s, i) => s + i), ['a0', 'b1']);
check('пустой массив', myMap([], (x) => x), []);
check('не мутирует вход', (() => { const src = [1, 2]; myMap(src, (x) => x * 10); return src; })(), [1, 2]);
