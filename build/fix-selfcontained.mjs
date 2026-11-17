// Одноразовая доводка после migrate-to-folders.mjs: карточки должны быть самодостаточными.
// 1) тема 10: const sandbox в каждую карточку (был в общем заголовке монолита)
// 2) тема 09: готовый sleep в карточки, где он нужен в тестах, но не является задачей
// 3) тема 05/04-task: своя проверочная иерархия вместо dog из другой карточки
// 4) тема 04/05-demo: локальный volume
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../topics/', import.meta.url)));
const after = (text, insert) =>
  text.replace(/^section[^\n]*\n/, (m) => m + insert);

// 1) тема 10
for (const f of readdirSync(join(root, '10-dom-and-events')).filter((x) => x.endsWith('.js'))) {
  const p = join(root, '10-dom-and-events', f);
  let t = readFileSync(p, 'utf8');
  if (!t.includes("getElementById('sandbox')")) {
    t = after(t, "const sandbox = document.getElementById('sandbox');\n\n");
    writeFileSync(p, t);
    console.log('10:', f, '+ sandbox');
  }
}

// 2) тема 09
const sleepLine = '\nconst sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // готовый хелпер (сам пишешь его в задаче 01)\n';
for (const f of ['02-task.js', '05-demo.js']) {
  const p = join(root, '09-promises-and-async', f);
  let t = readFileSync(p, 'utf8');
  if (/sleep\(/.test(t) && !/^function sleep|^const sleep/m.test(t)) {
    t = after(t, sleepLine);
    writeFileSync(p, t);
    console.log('09:', f, '+ sleep');
  }
}

// 3) тема 05, задача myInstanceof: не зависит от dog/Dog из другой карточки
writeFileSync(join(root, '05-prototypes-and-classes', '04-task.js'), `section('Задача 4. Свой instanceof');
// Иди по цепочке прототипов obj (Object.getPrototypeOf) и сравнивай
// с Ctor.prototype. Конец цепочки — null.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function myInstanceof(obj, Ctor) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲

// Проверочная иерархия для тестов (не зависит от задачи 2):
function Alpha() {}
function Beta() {}
Beta.prototype = Object.create(Alpha.prototype);

check('myInstanceof(new Beta(), Beta)', myInstanceof(new Beta(), Beta), true);
check('myInstanceof(new Beta(), Alpha)', myInstanceof(new Beta(), Alpha), true);
check('myInstanceof(new Beta(), Object)', myInstanceof(new Beta(), Object), true);
check('myInstanceof({}, Array)', myInstanceof({}, Array), false);
check('myInstanceof("s", String)', myInstanceof('s', String), false);
`);
console.log('05: 04-task.js перезаписан (самодостаточная иерархия)');

// 4) тема 04, демо fn.length
{
  const p = join(root, '04-functions-and-currying', '05-demo.js');
  let t = readFileSync(p, 'utf8');
  if (!/^const volume/m.test(t)) {
    t = after(t, '\nconst volume = (a, b, c) => a * b * c; // пример из задачи 1\n');
    writeFileSync(p, t);
    console.log('04: 05-demo.js + volume');
  }
}
