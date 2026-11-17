// Расставляет маркеры вокруг функций-заглушек в topics/*.js:
//   // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼   — перед заглушкой (внутри неё есть // TODO)
//   // ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲   — после закрывающей скобки
// Идемпотентно: повторный запуск ничего не дублирует.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(fileURLToPath(new URL('../topics/', import.meta.url)));
const OPEN = '// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼';
const CLOSE = '// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲';
const DECL = /^(function \w+\([^)]*\)|class \w+(?: extends \w+)?)\s*\{/;
const stripStrings = (l) => l.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g, '""');

for (const file of readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) {
  const path = join(dir, file);
  const lines = readFileSync(path, 'utf8').split('\n');
  const out = [];
  let i = 0;
  let changed = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (DECL.test(line) && !(i > 0 && lines[i - 1].includes('▼▼▼'))) {
      // закрывающая скобка — балансом фигурных, строки вырезаем
      let depth = 0;
      let closeIdx = -1;
      for (let j = i; j < lines.length; j++) {
        for (const ch of stripStrings(lines[j])) {
          if (ch === '{') depth++;
          else if (ch === '}') depth--;
        }
        if (depth <= 0) { closeIdx = j; break; }
      }
      const body = lines.slice(i, closeIdx + 1).join('\n');
      if (closeIdx > -1 && body.includes('// TODO')) {
        out.push(OPEN);
        out.push(...lines.slice(i, closeIdx + 1));
        out.push(CLOSE);
        changed++;
        i = closeIdx + 1;
        continue;
      }
    }
    out.push(line);
    i++;
  }
  if (changed) {
    writeFileSync(path, out.join('\n'));
    console.log(`${file}: помечено задач — ${changed}`);
  }
}
