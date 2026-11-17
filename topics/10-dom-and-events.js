// 10 · DOM и события
// Теория и вопросы: topics/10-dom-and-events.md
// Элементы появляются в серой зоне DOM sandbox на странице. Тесты «кликают» синтетически.
const sandbox = document.getElementById('sandbox');

section('Задача 1. Делегирование списка');
// Один обработчик на ul: клик по li добавляет ему класс 'done'.
// Помни: клик может попасть во вложенный элемент — используй e.target.closest('li').
function setupListDelegation(ul) {
  // TODO
}
const list = document.createElement('ul');
['Купить молоко', 'Позвонить маме', 'Написать резюме'].forEach((text) => {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
});
sandbox.appendChild(list);
setupListDelegation(list);

const secondLi = list.children[1];
secondLi.dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('клик по li отмечает его', secondLi.classList.contains('done'), true);
check('соседние li не тронуты', list.children[0].classList.contains('done'), false);

section('Задача 2. Счётчик: две кнопки, один обработчик');
// Один обработчик на контейнер panel:
//   клик по кнопке с data-action="inc" увеличивает число в span;
//   data-action="dec" — уменьшает. Определяй действие через e.target.closest('[data-action]').
function setupCounter(container) {
  // TODO
}
const panel = document.createElement('div');
panel.innerHTML = '<button data-action="inc">+1</button> <span>0</span> <button data-action="dec">−1</button>';
sandbox.appendChild(panel);
setupCounter(panel);

const readValue = () => Number(panel.querySelector('span').textContent);
panel.querySelector('[data-action="inc"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
panel.querySelector('[data-action="inc"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
panel.querySelector('[data-action="dec"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('значение после +1 +1 −1', readValue(), 1);

section('Задача 3. Debounce на input');
// Слушай событие 'input' на поле, но вызывай onSearch не чаще раза:
// реальный вызов — через 50 мс после последнего ввода (debounce из темы 02 придётся повторить).
let searches = 0;
function onSearch() { searches++; }
function setupSearch(input) {
  // TODO
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

section('Задача 4. CustomEvent с данными');
// emitReady(target) диспатчит на target событие 'app:ready' с detail: { ok: true }.
function emitReady(target) {
  // TODO
}
const box = document.createElement('div');
box.style.cssText = 'padding:8px;border:1px solid #ccc;border-radius:6px';
box.textContent = 'приёмник события app:ready';
sandbox.appendChild(box);
let payload = null;
box.addEventListener('app:ready', (e) => { payload = e.detail; });
emitReady(box);
check('detail дошёл до обработчика', payload, { ok: true });

section('Демо: фазы и e.target');
const phaseLog = [];
const demo = document.createElement('div');
demo.innerHTML = '<p style="margin:4px 0">кликни <b>по жирному слову</b> — и посмотри лог фаз</p>';
sandbox.appendChild(demo);
demo.addEventListener('click', (e) => phaseLog.push('bubble на div'), false);
demo.addEventListener('click', (e) => phaseLog.push('capture на div'), true);
demo.querySelector('b').addEventListener('click', (e) => {
  phaseLog.push('target = ' + e.target.tagName + ', currentTarget = ' + e.currentTarget.tagName);
  log('фазы:', phaseLog.join(' → '));
});
// Объясни: почему capture на div сработал раньше, а порядок в массиве такой?
