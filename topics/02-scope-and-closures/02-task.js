section('Задача 2. Приватный стек');
// Верни { push(item), pop(), size() } — данные скрыты в замыкании,
// снаружи добраться до массива нельзя (проверка: ключа items нет).
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function createStack() {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const s = createStack() || {};
tryRun(() => { s.push('a'); s.push('b'); });
check('pop возвращает последний', tryRun(() => s.pop()), 'b');
check('size уменьшился', tryRun(() => s.size()), 1);
check('items снаружи недоступен', 'items' in s, false);
