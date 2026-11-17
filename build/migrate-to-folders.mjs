// Одноразовая миграция: topics/NN-slug.{md,js} → topics/NN-slug/{theory.md, NN-task.js, MM-demo.js, index.json}
// Каждая секция section('...') исходного файла становится отдельным файлом-карточкой.
// Порядок секций кодируется ведущим номером файла; kind: task ('Задача…') | demo (Демо/Квиз/Бонус).
// Повторный запуск безопасен: если старых монолитных файлов нет — ничего не делает.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const topicsDir = join(fileURLToPath(new URL('../topics/', import.meta.url)));

for (const file of readdirSync(topicsDir).filter((f) => f.endsWith('.js')).sort()) {
  const slug = file.replace(/\.js$/, '');
  const src = readFileSync(join(topicsDir, file), 'utf8');
  const lines = src.split('\n');

  // чанки начинаются со строк section('…')
  const starts = [];
  lines.forEach((l, i) => { if (/^section\('/.test(l)) starts.push(i); });
  if (!starts.length) { console.log(`${file}: section() не найдены, пропуск`); continue; }

  const dir = join(topicsDir, slug);
  mkdirSync(dir, { recursive: true });

  const manifest = [];
  let seq = 0;
  starts.forEach((start, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1] : lines.length;
    const chunk = lines.slice(start, end).join('\n').replace(/\s+$/, '') + '\n';
    const title = (chunk.match(/^section\('([^']+)'\)/) || [])[1] || `Часть ${idx + 1}`;
    const kind = /^Задача/.test(title) ? 'task' : 'demo';
    seq++;
    const name = `${String(seq).padStart(2, '0')}-${kind}.js`;
    writeFileSync(join(dir, name), chunk);
    manifest.push({ file: name, title, kind });
  });

  writeFileSync(join(dir, 'index.json'), JSON.stringify(manifest, null, 2) + '\n');

  // теория: переехала в theory.md с поправленными ссылками
  const mdFile = join(topicsDir, slug + '.md');
  if (existsSync(mdFile)) {
    let md = readFileSync(mdFile, 'utf8');
    md = md.replace(/^> Задачи:.*$/m, '> Задачи — карточками на странице темы; файлы: `01-task.js`, `02-task.js`… в этой папке.');
    md = md.replace('## Задачи (в js-файле)', '## Задачи (карточки на странице)');
    md = md.replace('## Задачи в js-файле', '## Задачи (карточки на странице)');
    writeFileSync(join(dir, 'theory.md'), md);
    rmSync(mdFile);
  }
  rmSync(join(topicsDir, file));
  console.log(`${slug}/: ${manifest.length} карточек, theory.md, index.json`);
}
console.log('миграция завершена');
