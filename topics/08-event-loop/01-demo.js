section('Квиз 1. Предскажи порядок');
// Сначала впиши сюда ожидаемый порядок меток (строк), например: ['C: sync', ...]
const expected1 = ['?'];

const actual1 = [];
setTimeout(() => actual1.push('A: setTimeout'));
Promise.resolve().then(() => actual1.push('B: promise'));
actual1.push('C: sync');
queueMicrotask(() => actual1.push('D: queueMicrotask'));
setTimeout(() => {
  actual1.push('E: setTimeout-inside');
  check('квиз 1: порядок совпал с твоим прогнозом', actual1, expected1);
});
