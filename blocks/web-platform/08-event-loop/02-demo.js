section('Квиз 2. async/await vs .then vs setTimeout');
const expected2 = ['?'];

const actual2 = [];
async function flow() {
  actual2.push('1: старт flow');
  await null;
  actual2.push('2: после await');
}
flow();
Promise.resolve().then(() => actual2.push('3: then'));
setTimeout(() => actual2.push('4: timeout'));
actual2.push('5: конец sync');
setTimeout(() => check('квиз 2: порядок совпал с твоим прогнозом', actual2, expected2), 0);
