section('Задача 2. sum с переменной глубиной');

function sum(...args) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('sum(1)(2)(3)()', tryRun(() => sum(1)(2)(3)()), 6);
check('sum(1, 2)(3)()', tryRun(() => sum(1, 2)(3)()), 6);
check('sum(5)()', tryRun(() => sum(5)()), 5);
check('sum(1)(2)(3)(4)(10)()', tryRun(() => sum(1)(2)(3)(4)(10)()), 20);
