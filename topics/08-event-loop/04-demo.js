section('Демо: микрозадачи опережают макрозадачи');
log('sync: ставлю setTimeout и промис');
setTimeout(() => log('макрозадача: setTimeout'));
Promise.resolve().then(function micro1() {
  log('микрозадача 1: then');
  queueMicrotask(() => log('микрозадача 2: поставленная из микрозадачи'));
});
log('sync: конец кода');
// Все микрозадачи выполнятся ДО setTimeout — даже поставленные по ходу draining'а.
