section('Задача 2. shallowEqual');

function shallowEqual(a, b) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('одинаковые ключи/значения (порядок не важен)', shallowEqual({ x: 1, y: 'a' }, { y: 'a', x: 1 }), true);
check('разные значения', shallowEqual({ x: 1 }, { x: 2 }), false);
check('лишний ключ', shallowEqual({ x: 1 }, { x: 1, y: 2 }), false);
check('вложенные — по ссылке, а не структурно', shallowEqual({ a: { b: 1 } }, { a: { b: 1 } }), false);
