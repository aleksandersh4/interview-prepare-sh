section('Задача 1. Свой new');

function myNew(Ctor, ...args) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


function Person(name) { this.name = name; }


Person.prototype.greet = function () { return 'Я ' + this.name; };
const p = myNew(Person, 'Иван') || {};
check('свойство из конструктора', p.name, 'Иван');
check('метод с прототипа', tryRun(() => p.greet()), 'Я Иван');
check('instanceof Person', p instanceof Person, true);
