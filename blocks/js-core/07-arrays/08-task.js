section('Задача 7. sortBy без мутации');

function sortBy(items, key) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const users = [
  { name: 'Борис', age: 30 },
  { name: 'Аня', age: 25 },
  { name: 'Вера', age: 28 },
];
check('по age', tryRun(() => sortBy(users, 'age').map((u) => u.name)), ['Аня', 'Вера', 'Борис']);
check('по name', tryRun(() => sortBy(users, 'name').map((u) => u.age)), [25, 28, 30]);
check('исходный массив не мутирован', users[0].name, 'Борис');
check('равные ключи — порядок сохранён', tryRun(() => sortBy([{ a: 1, i: 1 }, { a: 1, i: 2 }], 'a').map((u) => u.i)), [1, 2]);
