section('Задача 3. То же через class / extends');
class AnimalC {
  constructor(name) { this.name = name; }
  introduce() { return 'Я ' + this.name; }
}
// Допиши класс: конструктор принимает (name, breed), вызывает super(name),
// и метод bark() → 'Гав!'.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
class DogC extends AnimalC {
  // TODO: constructor + bark()
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const dog2 = new DogC('Шарик', 'мопс');
check('наследование introduce', tryRun(() => dog2.introduce()), 'Я Шарик');
check('метод bark', tryRun(() => dog2.bark()), 'Гав!');
check('dog2 instanceof AnimalC', dog2 instanceof AnimalC, true);
