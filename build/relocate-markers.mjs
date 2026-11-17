// Смена формата маркеров (2026-11-17): маркер «пиши здесь» — ВНУТРИ заготовки,
// отдельные строки-маркеры над/под функцией убираются. Отступы: перед объявлением
// заготовки 1 пустая строка (2 enter), после закрывающей скобки 2 пустые (3 enter).
// Идемпотентно. Одноразовый, оставлен для истории.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('../topics/', import.meta.url)));
const DECL = /^(function \w+\([^)]*\)|class \w+(?: extends \w+)?)\s*\{/;
const MARKER = '// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼';
const stripStrings = (l) => l.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g, '""');

const findClose = (lines, from) => {
  let depth = 0;
  for (let j = from; j < lines.length; j++) {
    for (const ch of stripStrings(lines[j])) {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    if (depth <= 0) return j;
  }
  return -1;
};

for (const topic of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
  const dir = join(root, topic);
  for (const file of readdirSync(dir).filter((f) => /^[0-9].*\.js$/.test(f)).sort()) {
    const p = join(dir, file);
    let lines = readFileSync(p, 'utf8').split('\n');

    // 1) убрать внешние строки-маркеры
    lines = lines.filter((l) => !/^\s*\/\/ [▼▲]{3}/.test(l));

    // 2) внутри каждой заготовки первый «// TODO …» превращается в маркер
    for (let i = 0; i < lines.length; i++) {
      if (!DECL.test(lines[i])) continue;
      const close = findClose(lines, i);
      for (let j = i + 1; j < close; j++) {
        const m = lines[j].match(/^(\s*)\/\/ TODO\b\s*:?\s*(.*)$/);
        if (m) {
          const repl = [m[1] + MARKER];
          if (m[2].trim()) repl.push(m[1] + '// ' + m[2].trim());
          lines.splice(j, 1, ...repl);
          break;
        }
      }
      i = close;
    }

    // 3) схлопнуть любые прогоны пустых строк до одной
    lines = lines.filter((l, idx) => l.trim() !== '' || lines[idx - 1]?.trim() !== '');

    // 4) перед объявлением заготовки — ровно одна пустая строка
    for (let i = 0; i < lines.length; i++) {
      if (DECL.test(lines[i]) && i > 0 && lines[i - 1].trim() !== '') {
        lines.splice(i, 0, '');
        i++;
      }
    }

    // 5) после закрывающей скобки заготовки — ровно две пустые строки
    for (let i = 0; i < lines.length; i++) {
      if (!DECL.test(lines[i])) continue;
      const close = findClose(lines, i);
      if (close === -1) break;
      let n = close + 1;
      while (n < lines.length && lines[n].trim() === '') n++;
      if (n < lines.length) {
        const need = 2;
        const have = n - close - 1;
        if (have < need) lines.splice(close + 1, 0, ...Array(need - have).fill(''));
        else if (have > need) lines.splice(close + 1, have - need, ...Array(have - need - 1).fill(''));
      }
      i = close;
    }

    writeFileSync(p, lines.join('\n'));
  }
}
console.log('маркеры перенесены внутрь заготовок, отступы нормированы');
