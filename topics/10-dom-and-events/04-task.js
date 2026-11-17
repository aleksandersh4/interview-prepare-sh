section('Задача 4. CustomEvent с данными');
const sandbox = document.getElementById('sandbox');

function emitReady(target) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const box = document.createElement('div');
box.style.cssText = 'padding:8px;border:1px solid #ccc;border-radius:6px';
box.textContent = 'приёмник события app:ready';
sandbox.appendChild(box);
let payload = null;
box.addEventListener('app:ready', (e) => { payload = e.detail; });
emitReady(box);
check('detail дошёл до обработчика', payload, { ok: true });
