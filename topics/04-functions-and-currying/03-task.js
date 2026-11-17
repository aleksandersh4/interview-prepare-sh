section('Задача 3. pipe и compose');
// pipe(f, g)(x)    — применить слева направо: g(f(x))
// compose(f, g)(x) — справа налево: f(g(x))
// Оба умеют принимать начальное значение один раз. reduce здесь — твой друг.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function pipe(...fns) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function compose(...fns) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const inc = (x) => x + 1;
const double = (x) => x * 2;
check('pipe(inc, double)(3): +1, потом *2', tryRun(() => pipe(inc, double)(3)), 8);
check('compose(inc, double)(3): *2, потом +1', tryRun(() => compose(inc, double)(3)), 7);
check('pipe с одной функцией', tryRun(() => pipe(inc)(10)), 11);
