section('Задача 2. Свой call');
// myCall(fn, context, ...args) — сразу вызывает fn с context и args, возвращает результат.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myCall(fn, context, ...args) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const dog = { name: 'Рекс', speak(sound) { return this.name + ': ' + sound; } };
check('myCall вызывает с контекстом', tryRun(() => myCall(dog.speak, dog, 'гав')), 'Рекс: гав');
const silent = { name: 'Тиша' };
check('myCall с другим контекстом', tryRun(() => myCall(dog.speak, silent, '...')), 'Тиша: ...');
