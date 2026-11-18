section('Задача 5. unary — почини map(parseInt)');

function unary(fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('знаменитая бага: map(parseInt)', ['1', '2', '3'].map(parseInt), [1, NaN, NaN]);
check('unary чинит', tryRun(() => ['1', '2', '3'].map(unary(parseInt))), [1, 2, 3]);
check('fn получает только первый аргумент', tryRun(() => unary((a, b) => [a, b])('x', 'y')), ['x', undefined]);
check('с Math.max берётся первый', tryRun(() => unary(Math.max)(1, 5, 9)), 1);
