section('Демо: ошибка проваливается до catch, после catch цепочка здорова');
Promise.resolve(1)
  .then((v) => { throw new Error('сломалось на ' + v); })
  .then((v) => { log('сюда не попадём'); return v; })
  .catch((e) => { log('поймали:', e.message, '— возвращаем запасное значение'); return 99; })
  .then((v) => check('после catch цепочка продолжилась значением', v, 99))
  .finally(() => log('finally выполнился последним, значение не тронул'));
