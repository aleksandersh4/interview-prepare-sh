section('Задача 2. Наследование на прототипах (ES5)');

function Animal(name) { this.name = name; }


Animal.prototype.introduce = function () { return 'Я ' + this.name; };

function Dog(name, breed) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  // вызови конструктор Animal с нужным this
  this.breed = breed;
}


// TODO: свяжи прототипы (Dog.prototype.__proto__ === Animal.prototype)
// TODO: добавь Dog.prototype.bark = function () { ... }

const dog = new Dog('Рекс', 'такса');
check('наследует метод Animal', tryRun(() => dog.introduce()), 'Я Рекс');
check('свой метод bark', tryRun(() => dog.bark()), 'Гав!');
check('dog instanceof Dog', dog instanceof Dog, true);
check('dog instanceof Animal', dog instanceof Animal, true);
