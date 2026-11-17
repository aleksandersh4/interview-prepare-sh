section('Задача 2. Счётчик: две кнопки, один обработчик');
const sandbox = document.getElementById('sandbox');

function setupCounter(container) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
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
