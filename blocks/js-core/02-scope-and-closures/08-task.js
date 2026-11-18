section('Задача 7. Калькулятор с цепочкой вызовов');

function createCalculator(start = 0) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const calc = createCalculator(10) || {};
check('стартовое значение', tryRun(() => calc.value()), 10);
check('цепочка add → subtract', tryRun(() => createCalculator(10).add(5).subtract(3).value()), 12);
check('цепочка multiply → divide', tryRun(() => createCalculator(2).multiply(5).divide(4).value()), 2.5);
check('reset возвращает к нулю', tryRun(() => createCalculator(9).add(1).reset().value()), 0);
check('калькуляторы независимы', (() => {
  const a = createCalculator(1);
  createCalculator(100).add(50);
  return tryRun(() => a.value());
})(), 1);
