section('Задача 2. Свой call');

function myCall(fn, context, ...args) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const dog = { name: 'Рекс', speak(sound) { return this.name + ': ' + sound; } };
check('myCall вызывает с контекстом', tryRun(() => myCall(dog.speak, dog, 'гав')), 'Рекс: гав');
const silent = { name: 'Тиша' };
check('myCall с другим контекстом', tryRun(() => myCall(dog.speak, silent, '...')), 'Тиша: ...');
