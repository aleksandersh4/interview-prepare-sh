// Генерирует blocks-manifest.js: window.BLOCKS = [{slug,title,color,order,
// topics:[{slug,title,hasTasks}]}]. Запускать после любых изменений структуры блоков/тем.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const blocksDir = join(root, 'blocks');

const blocks = readdirSync(blocksDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .map((slug) => {
    const meta = JSON.parse(readFileSync(join(blocksDir, slug, 'index.json'), 'utf8'));
    const topics = readdirSync(join(blocksDir, slug), { withFileTypes: true })
      .filter((t) => t.isDirectory())
      .map((t) => t.name)
      .sort()
      .map((topicSlug) => {
        const dir = join(blocksDir, slug, topicSlug);
        const theory = readFileSync(join(dir, 'theory.md'), 'utf8');
        const title = (theory.match(/^# (.+)$/m) || [, topicSlug])[1];
        let hasTasks = false;
        try { hasTasks = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')).length > 0; } catch {}
        return { slug: topicSlug, title, hasTasks };
      });
    return { slug, title: meta.title, color: meta.color, order: meta.order, topics };
  })
  .sort((a, b) => a.order - b.order);

const js = '// Сгенерировано build/gen-manifest.mjs — не редактировать руками.\n'
  + 'window.BLOCKS = ' + JSON.stringify(blocks, null, 2) + ';\n';
writeFileSync(join(root, 'blocks-manifest.js'), js);
console.log('blocks-manifest.js: ' + blocks.length + ' блоков, '
  + blocks.reduce((s, b) => s + b.topics.length, 0) + ' тем');
