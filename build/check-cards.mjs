// Проверка самодостаточности карточек: каждый topics/*/[0-9]*.js исполняется
// в изоляции с заглушками окружения. ReferenceError = карточка ссылается на
// другую карточку (нарушение требования из CONTEXT.md). Запуск: node build/check-cards.mjs
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../blocks/', import.meta.url)));

function makeEl() {
  const el = {
    children: [],
    style: { cssText: '' },
    classList: { add() {}, contains: () => false, toggle() {} },
    addEventListener() {},
    removeEventListener() {},
    appendChild(c) { return c; },
    querySelector: () => makeEl(),
    querySelectorAll: () => [],
    dispatchEvent: () => true,
    setAttribute() {},
    insertAdjacentHTML() {},
    textContent: '',
    innerHTML: '',
    value: '',
  };
  return el;
}

globalThis.document = {
  getElementById: () => makeEl(),
  createElement: () => makeEl(),
  querySelector: () => makeEl(),
  addEventListener() {},
  body: makeEl(),
};
globalThis.window = { addEventListener() {} };
globalThis.CustomEvent = class { constructor() {} };
globalThis.MouseEvent = class { constructor() {} };
globalThis.Event = class { constructor() {} };
globalThis.performance = { now: () => Date.now() };
globalThis.setTimeout = () => 0;
globalThis.clearTimeout = () => {};
globalThis.setInterval = () => 0;
globalThis.queueMicrotask = () => {};
globalThis.__CARD_CHECKER__ = true; // карточки могут проверять и не ходить в сеть при офлайн-прогоне

const noop = () => {};
const helpers = { section: noop, log: noop, check: noop, tryRun: (fn) => fn() };

let checked = 0;
let failures = 0;
for (const block of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  for (const topic of readdirSync(join(root, block), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    for (const file of readdirSync(join(root, block, topic)).filter((f) => /^[0-9].*\.js$/.test(f)).sort()) {
      const code = readFileSync(join(root, block, topic, file), 'utf8');
      checked++;
      try {
        new Function('section', 'log', 'check', 'tryRun', code)(
          helpers.section, helpers.log, helpers.check, helpers.tryRun);
      } catch (e) {
        if (e instanceof ReferenceError) {
          failures++;
          console.log(`✘ ${block}/${topic}/${file}: ${e.message}`);
        }
      }
    }
  }
}
console.log(failures ? `ПРОВАЛ: ${failures} из ${checked}` : `OK: ${checked} карточек самодостаточны`);
process.exitCode = failures ? 1 : 0;
