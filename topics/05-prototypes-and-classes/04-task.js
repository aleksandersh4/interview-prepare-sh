section('Задача 4. Свой instanceof');
// Иди по цепочке прототипов obj (Object.getPrototypeOf) и сравнивай
// с Ctor.prototype. Конец цепочки — null.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myInstanceof(obj, Ctor) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲

// Проверочная иерархия для тестов (не зависит от задачи 2):
function Alpha() {}
function Beta() {}
Beta.prototype = Object.create(Alpha.prototype);

check('myInstanceof(new Beta(), Beta)', myInstanceof(new Beta(), Beta), true);
check('myInstanceof(new Beta(), Alpha)', myInstanceof(new Beta(), Alpha), true);
check('myInstanceof(new Beta(), Object)', myInstanceof(new Beta(), Object), true);
check('myInstanceof({}, Array)', myInstanceof({}, Array), false);
check('myInstanceof("s", String)', myInstanceof('s', String), false);
