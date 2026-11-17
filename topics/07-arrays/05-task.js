section('Задача 5. groupBy');
// groupBy(arr, fn) → объект { [ключ]: [элементы] }, ключ возвращает fn(item).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function groupBy(arr, fn) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
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
