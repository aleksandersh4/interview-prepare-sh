// 09 · Promise и async/await
// Теория и вопросы: topics/09-promises-and-async.md
// Тесты асинхронные — результаты допишутся в вывод с задержкой.

section('Задача 1. sleep(ms)');
// Верни промис, который resolve-ится через ms миллисекунд.
function sleep(ms) {
  // TODO
  return Promise.resolve(); // заглушка: удали и напиши свою реализацию
}
const t1 = performance.now();
sleep(30).then(() => check('sleep(30) действительно ждал ~30 мс', performance.now() - t1 >= 25, true));

section('Задача 2. Свой Promise.all');
// promiseAll(массивПромисовИлиЗначений) → промис:
//   resolve с массивом результатов В ИСХОДНОМ ПОРЯДКЕ, когда всё fulfilled;
//   reject сразу при первом reject (с этой ошибкой).
function promiseAll(promises) {
  // TODO
  return Promise.resolve(); // заглушка
}
promiseAll([sleep(20).then(() => 1), Promise.resolve(2), 3]).then((res) =>
  check('результаты в исходном порядке', res, [1, 2, 3]));
const rejected = Promise.reject(new Error('ой'));
rejected.catch(() => {}); // пометить как обработанный, пока promiseAll не реализован
promiseAll([sleep(20).then(() => 1), rejected, Promise.resolve(3)])
  .catch((e) => check('reject при первом отказе, ошибка пробрасывается', e.message, 'ой'));

section('Задача 3. retry(fn, attempts, delayMs)');
// Вызывай fn (возвращает промис), пока не успех или не исчерпаны попытки.
// Между попытками пауза delayMs. Исчерпаны — reject с ПОСЛЕДНЕЙ ошибкой.
function retry(fn, attempts, delayMs) {
  // TODO
  return Promise.resolve(); // заглушка
}
let tries = 0;
const flaky = () => { tries++; return tries < 3 ? Promise.reject(new Error('fail ' + tries)) : Promise.resolve('ок'); };
retry(flaky, 5, 10).then((r) => {
  check('успех с 3-й попытки', r, 'ок');
  check('всего попыток было 3', tries, 3);
});
let tries2 = 0;
const alwaysFails = () => { tries2++; return Promise.reject(new Error('всегда плохо')); };
retry(alwaysFails, 3, 10).catch((e) => {
  check('вышел после 3 неудачных попыток', tries2, 3);
  check('reject с последней ошибкой', e.message, 'всегда плохо');
});

section('Задача 4. mapWithLimit(items, fn, limit)');
// Как map, но fn возвращает промис и одновременно должно работать не больше limit штук.
// Порядок результата — как у map (по индексам, а не по времени завершения).
function mapWithLimit(items, fn, limit) {
  // TODO
  return Promise.resolve(); // заглушка
}
mapWithLimit([1, 2, 3, 4, 5], async (n) => n * 10, 2).then((res) =>
  check('результат как у map, порядок сохранён', res, [10, 20, 30, 40, 50]));
mapWithLimit([], async (n) => n, 2).then((res) => check('пустой массив', res, []));

section('Демо: последовательно vs параллельно');
const seqStart = performance.now();
(async () => {
  for (let i = 0; i < 3; i++) await sleep(30);
  const seqTime = performance.now() - seqStart;

  const parStart = performance.now();
  await Promise.all([1, 2, 3].map(() => sleep(30)));
  const parTime = performance.now() - parStart;

  log('последовательно (await в цикле):  ~' + Math.round(seqTime) + ' мс (3 × 30)');
  log('параллельно (Promise.all + map):   ~' + Math.round(parTime) + ' мс (одна волна по 30)');
})();

section('Демо: ошибка проваливается до catch, после catch цепочка здорова');
Promise.resolve(1)
  .then((v) => { throw new Error('сломалось на ' + v); })
  .then((v) => { log('сюда не попадём'); return v; })
  .catch((e) => { log('поймали:', e.message, '— возвращаем запасное значение'); return 99; })
  .then((v) => check('после catch цепочка продолжилась значением', v, 99))
  .finally(() => log('finally выполнился последним, значение не тронул'));
