// Одноразовая миграция (2026-11-18): topics/<slug> → blocks/<block>/<slug>
// + индексы блоков (title, color, order). Слаги тем глобально уникальны и не меняются
// (черновики localStorage и ревью-цикл завязаны на них).
import { readdirSync, mkdirSync, renameSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

const BLOCKS = [
  ['web-basics', 'Базовый веб-стек', '#E34F26', 1, []],
  ['js-core', 'JavaScript: ядро', '#F7DF1E', 2, [
    '01-types-and-coercion', '02-scope-and-closures', '03-this-and-bind',
    '04-functions-and-currying', '05-prototypes-and-classes',
    '06-objects-and-copying', '07-arrays',
  ]],
  ['web-platform', 'Асинхронность, браузер и сеть', '#0891B2', 3, [
    '08-event-loop', '09-promises-and-async', '10-dom-and-events',
  ]],
  ['typescript', 'TypeScript', '#3178C6', 4, []],
  ['oop-solid', 'ООП и SOLID', '#8B5CF6', 5, []],
  ['rxjs', 'RxJS и реактивность', '#D30175', 6, []],
  ['angular-base', 'Angular: база и компоненты', '#DD0031', 7, []],
  ['angular-reactivity', 'Angular: реактивность и CD', '#B3002A', 8, []],
  ['angular-di-forms', 'Angular: DI, роутинг, формы', '#E23237', 9, []],
  ['angular-arch', 'Архитектура и production', '#64748B', 10, []],
  ['practice', 'Практика и лайвкодинг', '#16A34A', 11, []],
];

for (const [slug, title, color, order, topics] of BLOCKS) {
  const dir = join(root, 'blocks', slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.json'), JSON.stringify({ title, color, order }, null, 2) + '\n');
  for (const t of topics) {
    const from = join(root, 'topics', t);
    if (existsSync(from)) {
      renameSync(from, join(dir, t));
      console.log(`${t} → blocks/${slug}/`);
    } else {
      console.warn(`! нет ${from}`);
    }
  }
}
console.log('готово');
