// 08 · Событийный цикл
// Теория и вопросы: topics/08-event-loop.md
// Формат: сначала впиши свой прогноз в expected (порядок меток), потом запусти.
// Проверка зелёная = прогноз верный. Подглядывать в код ниже expected — честно только после ответа.

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

section('Демо: занятый стек тормозит таймеры');
const t0 = performance.now();
setTimeout(() => log('setTimeout(0) сработал через', Math.round(performance.now() - t0), 'мс после постановки'));
const until = performance.now() + 200;
while (performance.now() < until) { /* 200 мс блокируем поток чистым синхронным кодом */ }
log('синхронный код завершён (поток был занят ~200 мс), таймер ещё не сработал');
log('вывод: таймер не «прерывает» поток — он ждёт освобождения стека и своей очереди');

section('Демо: микрозадачи опережают макрозадачи');
log('sync: ставлю setTimeout и промис');
setTimeout(() => log('макрозадача: setTimeout'));
Promise.resolve().then(function micro1() {
  log('микрозадача 1: then');
  queueMicrotask(() => log('микрозадача 2: поставленная из микрозадачи'));
});
log('sync: конец кода');
// Все микрозадачи выполнятся ДО setTimeout — даже поставленные по ходу draining'а.
