section('Задача 3. Debounce на input');
const sandbox = document.getElementById('sandbox');

let searches = 0;

function onSearch() { searches++; }


function setupSearch(input) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


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
