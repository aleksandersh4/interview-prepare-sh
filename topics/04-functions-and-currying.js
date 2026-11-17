// 04 · Функции и каррирование
// Теория и вопросы: topics/04-functions-and-currying.md

section('Задача 1. curry(fn)');
// curry((a, b, c) => ...) возвращает функцию, которую можно звать
// и по одному аргументу f(a)(b)(c), и группами f(a, b)(c).
// Ориентируйся на fn.length — количество объявленных параметров.
function curry(fn) {
  // TODO
}
const volume = (a, b, c) => a * b * c;
check('curry: по одному', tryRun(() => curry(volume)(2)(3)(4)), 24);
check('curry: группами', tryRun(() => curry(volume)(2, 3)(4)), 24);
check('curry: все сразу', tryRun(() => curry(volume)(2, 3, 4)), 24);

section('Задача 2. sum с переменной глубиной');
// sum(1)(2)(3)() → 6, sum(1, 2)(3)() → 6, sum(5)() → 5.
// Завершение — вызов без аргументов. Внутри: копи аргументы и возвращай функцию.
function sum(...args) {
  // TODO
}
check('sum(1)(2)(3)()', tryRun(() => sum(1)(2)(3)()), 6);
check('sum(1, 2)(3)()', tryRun(() => sum(1, 2)(3)()), 6);
check('sum(5)()', tryRun(() => sum(5)()), 5);
check('sum(1)(2)(3)(4)(10)()', tryRun(() => sum(1)(2)(3)(4)(10)()), 20);

section('Задача 3. pipe и compose');
// pipe(f, g)(x)    — применить слева направо: g(f(x))
// compose(f, g)(x) — справа налево: f(g(x))
// Оба умеют принимать начальное значение один раз. reduce здесь — твой друг.
function pipe(...fns) {
  // TODO
}
function compose(...fns) {
  // TODO
}
const inc = (x) => x + 1;
const double = (x) => x * 2;
check('pipe(inc, double)(3): +1, потом *2', tryRun(() => pipe(inc, double)(3)), 8);
check('compose(inc, double)(3): *2, потом +1', tryRun(() => compose(inc, double)(3)), 7);
check('pipe с одной функцией', tryRun(() => pipe(inc)(10)), 11);

section('Задача 4. average через arguments');
// average(2, 4, 6) → 4. Используй arguments (поэтому функция — НЕ стрелка),
// преврати его в массив и посчитай среднее. average() → 0.
function average() {
  // TODO
}
check('average(2, 4, 6)', average(2, 4, 6), 4);
check('average(10)', average(10), 10);
check('average()', average(), 0);

section('Мини-демо: fn.length и параметры по умолчанию');
log('volume.length =', volume.length, '(кол-во объявленных параметров до первого со значением по умолчанию)');
const withDefault = (a, b = 1) => a + b;
log('withDefault.length =', withDefault.length);
// Curry из задачи 1 как раз опирается на volume.length — вот почему это важно.
