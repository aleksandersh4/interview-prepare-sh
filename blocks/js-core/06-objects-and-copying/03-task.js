section('Задача 3. mergeDeep');

function mergeDeep(target, source) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('вложенные сливаются', mergeDeep({ a: { x: 1, y: 2 }, b: 1 }, { a: { y: 9 } }), { a: { x: 1, y: 9 }, b: 1 });
check('глубже двух уровней', mergeDeep({ a: { b: { c: 1, d: 2 } } }, { a: { b: { d: 3 } } }), { a: { b: { c: 1, d: 3 } } });
check('не мутирует входы', (() => {
  const t = { a: { x: 1 } };
  mergeDeep(t, { a: { y: 2 } });
  return t;
})(), { a: { x: 1 } });
