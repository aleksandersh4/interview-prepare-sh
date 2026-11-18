section('Задача 3. То же через class / extends');

class AnimalC {
  constructor(name) { this.name = name; }
  introduce() { return 'Я ' + this.name; }
}


class DogC extends AnimalC {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  // constructor + bark()
}


const dog2 = new DogC('Шарик', 'мопс');
check('наследование introduce', tryRun(() => dog2.introduce()), 'Я Шарик');
check('метод bark', tryRun(() => dog2.bark()), 'Гав!');
check('dog2 instanceof AnimalC', dog2 instanceof AnimalC, true);
