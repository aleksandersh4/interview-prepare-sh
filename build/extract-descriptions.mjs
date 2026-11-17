// Вынос условий задач из кода карточек в index.json (поле description).
// Правило: у task-карточек описанием считаются комментарии колонки-0 в зоне
// между section() и маркером «▼▼▼» (строки кода-хелперы не трогаем, их вырезаем только из описания).
// Эти строки удаляются из .js — редактор остаётся чистым: маркеры + заготовка + проверки.
// Демо-карточки не трогаем (их комментарии — часть разбора). Идемпотентно.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../topics/', import.meta.url)));

const toMarkdown = (blocks) =>
  blocks.map((lines) => lines.join('  \n')).join('\n\n').trim();

for (const topic of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const dir = join(root, topic);
  const manifest = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8'));
  let changed = false;

  for (const entry of manifest) {
    if (entry.kind !== 'task' || entry.description) continue;
    const p = join(dir, entry.file);
    const lines = readFileSync(p, 'utf8').split('\n');

    const markerIdx = lines.findIndex((l) => l.includes('▼▼▼'));
    if (markerIdx === -1) continue;

    // зона условия: после section() до маркера
    const blocks = [[]];
    const kept = [];
    let sawSection = false;
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (/^section\(/.test(l)) { sawSection = true; kept.push(l); continue; }
      if (!sawSection || i >= markerIdx) { kept.push(l); continue; }
      if (l.trim() === '') { if (blocks.at(-1).length) blocks.push([]); kept.push(l); continue; }
      if (/^\/\/ /.test(l) || /^\/\/$/.test(l)) {
        const text = l.replace(/^\/\/ ?/, '');
        if (!/[▼▲]/.test(text)) blocks.at(-1).push(text); // маркеры не описываются и не удаляются
        continue; // комментарий уходит из кода
      }
      kept.push(l); // код-хелпер (sleep/sandbox/…) остаётся в файле
    }

    const description = toMarkdown(blocks);
    if (description) {
      entry.description = description;
      // подчистить тройные пустые строки после удаления комментариев
      writeFileSync(p, kept.join('\n').replace(/\n{3,}/g, '\n\n'));
      changed = true;
      console.log(`${topic}/${entry.file}: ${description.length} симв. условия вынесено`);
    }
  }
  if (changed) writeFileSync(join(dir, 'index.json'), JSON.stringify(manifest, null, 2) + '\n');
}
console.log('готово');
