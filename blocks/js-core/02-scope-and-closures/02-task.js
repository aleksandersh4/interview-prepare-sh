section('Задача 2. Приватный стек');

function createStack() {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const s = createStack() || {};
tryRun(() => { s.push('a'); s.push('b'); });
check('pop возвращает последний', tryRun(() => s.pop()), 'b');
check('size уменьшился', tryRun(() => s.size()), 1);
check('items снаружи недоступен', 'items' in s, false);
