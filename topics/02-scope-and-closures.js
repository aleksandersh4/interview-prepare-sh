// 02 · Область видимости и замыкания
// Теория и вопросы: topics/02-scope-and-closures.md
// Тесты с setTimeout дописывают результаты чуть позже остального вывода — это нормально.

section('Задача 1. Счётчик');
// makeCounter() возвращает функцию: каждый вызов увеличивает счётчик на 1 и возвращает новое значение.
// Каждый созданный счётчик независим (своё окружение).
function makeCounter() {
  // TODO
}
const c1 = makeCounter() || (() => undefined);
tryRun(() => { c1(); c1(); });
check('третий вызов возвращает 3', tryRun(() => c1()), 3);
const c2 = makeCounter() || (() => undefined);
check('второй счётчик — с нуля', tryRun(() => c2()), 1);

section('Задача 2. Приватный стек');
// Верни { push(item), pop(), size() } — данные скрыты в замыкании,
// снаружи добраться до массива нельзя (проверка: ключа items нет).
function createStack() {
  // TODO
}
const s = createStack() || {};
tryRun(() => { s.push('a'); s.push('b'); });
check('pop возвращает последний', tryRun(() => s.pop()), 'b');
check('size уменьшился', tryRun(() => s.size()), 1);
check('items снаружи недоступен', 'items' in s, false);

section('Задача 3. once(fn)');
// Возвращает функцию, которая вызывает fn только при первом вызове
// и дальше всегда возвращает (кэшированный) первый результат.
function once(fn) {
  // TODO
}
let calls = 0;
const init = once(() => ++calls);
tryRun(() => { init(); init(); init(); });
check('fn вызван один раз', calls, 1);
check('результат закэширован', tryRun(() => init()), 1);

section('Задача 4. memoize(fn)');
// Кэширует результат fn по аргументам (ключ — JSON.stringify массива аргументов).
function memoize(fn) {
  // TODO
}
let evals = 0;
const slowSquare = memoize((n) => { evals++; return n * n; });
tryRun(() => { slowSquare(4); slowSquare(4); slowSquare(5); });
check('вычислений два, а не три', evals, 2);
check('кэш отдаёт верное значение', tryRun(() => slowSquare(4)), 16);

section('Задача 5. debounce(fn, ms)');
// Возвращает обёртку: реальный вызов fn происходит через ms после ПОСЛЕДНЕГО
// обращения к обёртке; если до истечения срока вызвали снова — таймер перезапускается.
function debounce(fn, ms) {
  // TODO
}
let runs = 0;
const save = debounce(() => runs++, 40) || (() => {});
tryRun(() => { save(); save(); save(); });
check('сразу — ни одного реального вызова', runs, 0);
setTimeout(() => check('после паузы — ровно один вызов', runs, 1), 90);

section('Задача 6. throttle(fn, ms)');
// Возвращает обёртку: первый вызов срабатывает сразу, дальше — не чаще раза в ms.
function throttle(fn, ms) {
  // TODO
}
let ticks = 0;
const tick = throttle(() => ticks++, 40) || (() => {});
tryRun(() => { tick(); tick(); tick(); });
check('первый вызов срабатывает сразу', ticks, 1);
setTimeout(() => {
  tick();
  check('после окончания окна можно снова', ticks, 2);
}, 70);

section('Демо: var vs let в цикле (объясни вывод)');
for (var vi = 1; vi <= 3; vi++) setTimeout(() => log('var:', vi), 0);
for (let li = 1; li <= 3; li++) setTimeout(() => log('let:', li), 0);
// Почему var печатает 4,4,4, а let — 1,2,3?
// Ответь себе (или мне в чат) до того, как загуглить.
