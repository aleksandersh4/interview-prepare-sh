section('Задача 3. once(fn)');

function once(fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


let calls = 0;
const init = once(() => ++calls);
tryRun(() => { init(); init(); init(); });
check('fn вызван один раз', calls, 1);
check('результат закэширован', tryRun(() => init()), 1);
