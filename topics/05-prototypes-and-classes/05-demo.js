section('Демо: где живут методы');
// Своя мини-иерархия для демо (не зависит от карточек-задач):

function DemoAnimal(name) { this.name = name; }


class DemoDog extends DemoAnimal {
  bark() { return 'Гав!'; }
}


const dog = new DemoDog('Рекс');

log('dog.bark принадлежит прототипу, не объекту:', dog.hasOwnProperty('bark') === false);
log('Object.getPrototypeOf(dog).constructor.name =', Object.getPrototypeOf(dog).constructor?.name);
log('dog сам по себе не имеет bark, но dog.bark() =', dog.bark());
// Объясни, почему dog.hasOwnProperty("bark") === false, но dog.bark() работает.
