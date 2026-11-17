section('Задача 3. retry(fn, attempts, delayMs)');
// Вызывай fn (возвращает промис), пока не успех или не исчерпаны попытки.
// Между попытками пауза delayMs. Исчерпаны — reject с ПОСЛЕДНЕЙ ошибкой.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function retry(fn, attempts, delayMs) {
  // TODO
  return Promise.resolve(); // заглушка
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
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
