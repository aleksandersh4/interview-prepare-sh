section('Задача 2. Свой Promise.all');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // готовый хелпер (сам пишешь его в задаче 01)
// promiseAll(массивПромисовИлиЗначений) → промис:
//   resolve с массивом результатов В ИСХОДНОМ ПОРЯДКЕ, когда всё fulfilled;
//   reject сразу при первом reject (с этой ошибкой).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function promiseAll(promises) {
  // TODO
  return Promise.resolve(); // заглушка
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
promiseAll([sleep(20).then(() => 1), Promise.resolve(2), 3]).then((res) =>
  check('результаты в исходном порядке', res, [1, 2, 3]));
const rejected = Promise.reject(new Error('ой'));
rejected.catch(() => {}); // пометить как обработанный, пока promiseAll не реализован
promiseAll([sleep(20).then(() => 1), rejected, Promise.resolve(3)])
  .catch((e) => check('reject при первом отказе, ошибка пробрасывается', e.message, 'ой'));
