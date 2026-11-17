section('Задача 2. Наследование на прототипах (ES5)');
// Дано: Animal с методом introduce. Допиши Dog так, чтобы:
//   - конструктор Animal вызывался с правильным this;
//   - прототипы были связаны (методы Animal доступны у Dog);
//   - у Dog был свой метод bark() → 'Гав!';
//   - dog instanceof и Dog, и Animal === true.
function Animal(name) { this.name = name; }
Animal.prototype.introduce = function () { return 'Я ' + this.name; };

// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function Dog(name, breed) {
  // TODO: вызови конструктор Animal с нужным this
  this.breed = breed;
}
// TODO: свяжи прототипы (Dog.prototype.__proto__ === Animal.prototype)
// TODO: добавь Dog.prototype.bark = function () { ... }
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲

const dog = new Dog('Рекс', 'такса');
check('наследует метод Animal', tryRun(() => dog.introduce()), 'Я Рекс');
check('свой метод bark', tryRun(() => dog.bark()), 'Гав!');
check('dog instanceof Dog', dog instanceof Dog, true);
check('dog instanceof Animal', dog instanceof Animal, true);
