section('Задача 5. debounce(fn, ms)');

function debounce(fn, ms) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


let runs = 0;
const save = debounce(() => runs++, 40) || (() => {});
tryRun(() => { save(); save(); save(); });
check('сразу — ни одного реального вызова', runs, 0);
setTimeout(() => check('после паузы — ровно один вызов', runs, 1), 90);
