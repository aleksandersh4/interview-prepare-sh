section('Задача 1. Счётчик');

function makeCounter() {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const c1 = makeCounter() || (() => undefined);
tryRun(() => { c1(); c1(); });
check('третий вызов возвращает 3', tryRun(() => c1()), 3);
const c2 = makeCounter() || (() => undefined);
check('второй счётчик — с нуля', tryRun(() => c2()), 1);
