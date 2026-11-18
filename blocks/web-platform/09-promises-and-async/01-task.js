section('Задача 1. sleep(ms)');

function sleep(ms) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  return Promise.resolve(); // заглушка: удали и напиши свою реализацию
}


const t1 = performance.now();
sleep(30).then(() => check('sleep(30) действительно ждал ~30 мс', performance.now() - t1 >= 25, true));
