section('Задача 5. Свой Object.create');

function objectCreate(proto) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const base = { greet() { return 'привет'; }, shared: 1 };
const child = objectCreate(base) || {};
check('наследует методы прототипа', tryRun(() => child.greet()), 'привет');
check('свойство с прототипа', child.shared, 1);
check('Object.getPrototypeOf(child) === base', Object.getPrototypeOf(child) === base, true);
check('своих свойств нет', Object.keys(child).length, 0);
check('запись создаёт поле у child, не у base', (() => { child.own = 2; return base.own; })(), undefined);
