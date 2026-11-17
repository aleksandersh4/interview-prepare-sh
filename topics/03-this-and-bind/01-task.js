section('Задача 1. Свой bind');
// myBind(fn, context, ...boundArgs) возвращает функцию, которая:
//   - вызывает fn с this === context;
//   - передаёт boundArgs, а новые аргументы дописывает в конец;
//   - повторный .call/.bind на результат первый контекст НЕ переопределяет (как у настоящего bind).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myBind(fn, context, ...boundArgs) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
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
