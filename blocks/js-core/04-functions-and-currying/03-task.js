section('Задача 3. pipe и compose');

function pipe(...fns) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


function compose(...fns) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const inc = (x) => x + 1;
const double = (x) => x * 2;
check('pipe(inc, double)(3): +1, потом *2', tryRun(() => pipe(inc, double)(3)), 8);
check('compose(inc, double)(3): *2, потом +1', tryRun(() => compose(inc, double)(3)), 7);
check('pipe с одной функцией', tryRun(() => pipe(inc)(10)), 11);
