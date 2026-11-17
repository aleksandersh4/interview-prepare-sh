section('Задача 2. Счётчик: две кнопки, один обработчик');
const sandbox = document.getElementById('sandbox');

// Один обработчик на контейнер panel:
//   клик по кнопке с data-action="inc" увеличивает число в span;
//   data-action="dec" — уменьшает. Определяй действие через e.target.closest('[data-action]').
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function setupCounter(container) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const panel = document.createElement('div');
panel.innerHTML = '<button data-action="inc">+1</button> <span>0</span> <button data-action="dec">−1</button>';
sandbox.appendChild(panel);
setupCounter(panel);

const readValue = () => Number(panel.querySelector('span').textContent);
panel.querySelector('[data-action="inc"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
panel.querySelector('[data-action="inc"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
panel.querySelector('[data-action="dec"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('значение после +1 +1 −1', readValue(), 1);
