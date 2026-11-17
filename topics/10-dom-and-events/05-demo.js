section('Демо: фазы и e.target');
const sandbox = document.getElementById('sandbox');

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
