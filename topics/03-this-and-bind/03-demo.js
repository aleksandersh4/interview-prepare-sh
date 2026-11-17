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
