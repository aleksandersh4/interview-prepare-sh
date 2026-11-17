// 05 · Прототипы и классы
// Теория и вопросы: topics/05-prototypes-and-classes.md

section('Задача 1. Свой new');
// myNew(Ctor, ...args) повторяет new:
//   1) новый объект, 2) прототип = Ctor.prototype, 3) конструктор с нужным this,
//   4) вернуть созданный объект (если конструктор не вернул объект сам).
function myNew(Ctor, ...args) {
  // TODO
}
function Person(name) { this.name = name; }
Person.prototype.greet = function () { return 'Я ' + this.name; };
const p = myNew(Person, 'Иван') || {};
check('свойство из конструктора', p.name, 'Иван');
check('метод с прототипа', tryRun(() => p.greet()), 'Я Иван');
check('instanceof Person', p instanceof Person, true);

section('Задача 2. Наследование на прототипах (ES5)');
// Дано: Animal с методом introduce. Допиши Dog так, чтобы:
//   - конструктор Animal вызывался с правильным this;
//   - прототипы были связаны (методы Animal доступны у Dog);
//   - у Dog был свой метод bark() → 'Гав!';
//   - dog instanceof и Dog, и Animal === true.
function Animal(name) { this.name = name; }
Animal.prototype.introduce = function () { return 'Я ' + this.name; };

function Dog(name, breed) {
  // TODO: вызови конструктор Animal с нужным this
  this.breed = breed;
}
// TODO: свяжи прототипы (Dog.prototype.__proto__ === Animal.prototype)
// TODO: добавь Dog.prototype.bark = function () { ... }

const dog = new Dog('Рекс', 'такса');
check('наследует метод Animal', tryRun(() => dog.introduce()), 'Я Рекс');
check('свой метод bark', tryRun(() => dog.bark()), 'Гав!');
check('dog instanceof Dog', dog instanceof Dog, true);
check('dog instanceof Animal', dog instanceof Animal, true);

section('Задача 3. То же через class / extends');
class AnimalC {
  constructor(name) { this.name = name; }
  introduce() { return 'Я ' + this.name; }
}
// Допиши класс: конструктор принимает (name, breed), вызывает super(name),
// и метод bark() → 'Гав!'.
class DogC extends AnimalC {
  // TODO: constructor + bark()
}
const dog2 = new DogC('Шарик', 'мопс');
check('наследование introduce', tryRun(() => dog2.introduce()), 'Я Шарик');
check('метод bark', tryRun(() => dog2.bark()), 'Гав!');
check('dog2 instanceof AnimalC', dog2 instanceof AnimalC, true);

section('Задача 4. Свой instanceof');
// Иди по цепочке прототипов obj (Object.getPrototypeOf) и сравнивай
// с Ctor.prototype. Конец цепочки — null.
function myInstanceof(obj, Ctor) {
  // TODO
}
check('myInstanceof(dog, Dog)', myInstanceof(dog, Dog), true);
check('myInstanceof(dog, Animal)', myInstanceof(dog, Animal), true);
check('myInstanceof(dog, Object)', myInstanceof(dog, Object), true);
check('myInstanceof({}, Array)', myInstanceof({}, Array), false);
check('myInstanceof("s", String)', myInstanceof('s', String), false);

section('Демо: где живут методы');
log('dog.bark принадлежит прототипу, не объекту:', dog.hasOwnProperty('bark') === false);
log('Object.getPrototypeOf(dog).constructor.name =', Object.getPrototypeOf(dog).constructor?.name);
log('Object.getPrototypeOf(dog2) === DogC.prototype:', Object.getPrototypeOf(dog2) === DogC.prototype);
// Объясни, почему dog.hasOwnProperty("bark") === false, но dog.bark() работает.
