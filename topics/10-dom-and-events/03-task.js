section('Задача 3. Debounce на input');
const sandbox = document.getElementById('sandbox');

// Слушай событие 'input' на поле, но вызывай onSearch не чаще раза:
// реальный вызов — через 50 мс после последнего ввода (debounce из темы 02 придётся повторить).
let searches = 0;
function onSearch() { searches++; }
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function setupSearch(input) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const field = document.createElement('input');
field.placeholder = 'набери что-нибудь (или посмотри синтетические вводы ниже)';
sandbox.appendChild(field);
setupSearch(field);

field.value = 'a';
field.dispatchEvent(new Event('input', { bubbles: true }));
field.value = 'ab';
field.dispatchEvent(new Event('input', { bubbles: true }));
field.value = 'abc';
field.dispatchEvent(new Event('input', { bubbles: true }));
setTimeout(() => check('поиск сработал один раз после паузы ввода', searches, 1), 90);
