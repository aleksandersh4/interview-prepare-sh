section('Задача 5. Клик вне элемента');
const sandbox = document.getElementById('sandbox');

function onClickOutside(el, handler) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const box = document.createElement('div');
box.textContent = 'синяя зона — клики по ней и её детям НЕ считаются «снаружи»';
box.style.cssText = 'padding:10px;border:2px solid #2f5cff;border-radius:8px;margin:6px 0';
sandbox.appendChild(box);
const outside = document.createElement('p');
outside.textContent = 'а это «снаружи» — синяя зона стоит выше, тест кликнет по обоим';
sandbox.appendChild(outside);

let fired = 0;
tryRun(() => onClickOutside(box, () => fired++));

document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('клик по body — снаружи, handler сработал', fired, 1);
box.dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('клик по самой зоне — не снаружи', fired, 1);
outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('клик по соседнему элементу — снаружи', fired, 2);
