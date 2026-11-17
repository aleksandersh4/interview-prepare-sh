section('Задача 6. throttle(fn, ms)');

function throttle(fn, ms) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


let ticks = 0;
const tick = throttle(() => ticks++, 40) || (() => {});
tryRun(() => { tick(); tick(); tick(); });
check('первый вызов срабатывает сразу', ticks, 1);
setTimeout(() => {
  tick();
  check('после окончания окна можно снова', ticks, 2);
}, 70);
