// 03 · this, call / apply / bind
// Теория и вопросы: topics/03-this-and-bind.md

section('Задача 1. Свой bind');
// myBind(fn, context, ...boundArgs) возвращает функцию, которая:
//   - вызывает fn с this === context;
//   - передаёт boundArgs, а новые аргументы дописывает в конец;
//   - повторный .call/.bind на результат первый контекст НЕ переопределяет (как у настоящего bind).
function myBind(fn, context, ...boundArgs) {
  // TODO
}
const cat = {
  name: 'Мурка',
  greet(who, how) { return this.name + ' приветствует ' + who + ' (' + how + ')'; },
};
const bound = myBind(cat.greet, cat, 'мышь') || function () {};
check('частичное применение аргументов', tryRun(() => bound('радостно')), 'Мурка приветствует мышь (радостно)');
const bound2 = myBind(cat.greet, cat) || function () {};
check('аргументы при вызове', tryRun(() => bound2('хомяк', 'ласково')), 'Мурка приветствует хомяк (ласково)');
const alien = { name: 'Зог' };
check('контекст нельзя перебить повторно', tryRun(() => bound.call(alien, 'грустно')), 'Мурка приветствует мышь (грустно)');

section('Задача 2. Свой call');
// myCall(fn, context, ...args) — сразу вызывает fn с context и args, возвращает результат.
function myCall(fn, context, ...args) {
  // TODO
}
const dog = { name: 'Рекс', speak(sound) { return this.name + ': ' + sound; } };
check('myCall вызывает с контекстом', tryRun(() => myCall(dog.speak, dog, 'гав')), 'Рекс: гав');
const silent = { name: 'Тиша' };
check('myCall с другим контекстом', tryRun(() => myCall(dog.speak, silent, '...')), 'Тиша: ...');

section('Демо: потеря контекста');
function safeCall(f) { try { return f(); } catch (e) { return 'TypeError: ' + e.message; } }

const user = {
  name: 'Аня',
  sayHi() { return 'Привет, ' + this.name; },
};
log('user.sayHi()          →', user.sayHi());
log('const f = user.sayHi; →', safeCall(user.sayHi), '(this потерян: вызов без точки слева)');

const shapes = {
  radius: 10,
  regular() { return this.radius; },
  arrow: () => (this && this.radius),
};
log('shapes.regular()      →', shapes.regular());
log('shapes.arrow()        →', tryRun(() => shapes.arrow()), '(стрелка взяла this скоупа снаружи, а не shapes)');

setTimeout(function () {
  log('в setTimeout обычная:  this === window →', this === window);
}, 0);
setTimeout(() => {
  log('в setTimeout стрелка:  взяла this из места создания');
}, 0);
// Объясни каждую строку вывода. Где потеря, а где — намеренное использование правил?
