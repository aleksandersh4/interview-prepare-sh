section('Задача 1. Свой new');
// myNew(Ctor, ...args) повторяет new:
//   1) новый объект, 2) прототип = Ctor.prototype, 3) конструктор с нужным this,
//   4) вернуть созданный объект (если конструктор не вернул объект сам).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myNew(Ctor, ...args) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
function Person(name) { this.name = name; }
Person.prototype.greet = function () { return 'Я ' + this.name; };
const p = myNew(Person, 'Иван') || {};
check('свойство из конструктора', p.name, 'Иван');
check('метод с прототипа', tryRun(() => p.greet()), 'Я Иван');
check('instanceof Person', p instanceof Person, true);
