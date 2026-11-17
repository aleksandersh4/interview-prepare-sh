section('Задача 6. throttle(fn, ms)');
// Возвращает обёртку: первый вызов срабатывает сразу, дальше — не чаще раза в ms.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function throttle(fn, ms) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
let ticks = 0;
const tick = throttle(() => ticks++, 40) || (() => {});
tryRun(() => { tick(); tick(); tick(); });
check('первый вызов срабатывает сразу', ticks, 1);
setTimeout(() => {
  tick();
  check('после окончания окна можно снова', ticks, 2);
}, 70);
