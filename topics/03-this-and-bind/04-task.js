section('Задача 3. bindAll');

function bindAll(obj) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const widget = {
  name: 'панель',
  show() { return 'открыта ' + this.name; },
  hide() { return 'закрыта ' + this.name; },
  size: 10,
};
const bound = bindAll(widget) || {};
const show = bound.show;
const hide = bound.hide;
check('метод работает оторванным от объекта', tryRun(() => show()), 'открыта панель');
check('второй метод тоже привязан', tryRun(() => hide()), 'закрыта панель');
check('обычные свойства копируются', bound.size, 10);
check('исходный объект не тронут', widget.show !== bound.show, true);
