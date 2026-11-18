section('Задача 3. retry(fn, attempts, delayMs)');

function retry(fn, attempts, delayMs) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
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
