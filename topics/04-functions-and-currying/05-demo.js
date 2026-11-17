section('Мини-демо: fn.length и параметры по умолчанию');

const volume = (a, b, c) => a * b * c; // пример из задачи 1
log('volume.length =', volume.length, '(кол-во объявленных параметров до первого со значением по умолчанию)');
const withDefault = (a, b = 1) => a + b;
log('withDefault.length =', withDefault.length);
// Curry из задачи 1 как раз опирается на volume.length — вот почему это важно.
