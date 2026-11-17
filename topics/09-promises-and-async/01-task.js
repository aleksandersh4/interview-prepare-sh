section('Задача 1. sleep(ms)');
// Верни промис, который resolve-ится через ms миллисекунд.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function sleep(ms) {
  // TODO
  return Promise.resolve(); // заглушка: удали и напиши свою реализацию
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const t1 = performance.now();
sleep(30).then(() => check('sleep(30) действительно ждал ~30 мс', performance.now() - t1 >= 25, true));
