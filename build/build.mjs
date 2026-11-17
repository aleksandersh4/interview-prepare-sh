// Собирает CodeMirror 6 в один самодостаточный IIFE-файл ../vendor/codemirror.bundle.js,
// который подключается обычным <script> и определяет window.CMEditor.
// Запуск: cd build && npm install && npm run build
import { build } from 'esbuild';

await build({
  entryPoints: ['entry.mjs'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  outfile: '../vendor/codemirror.bundle.js',
  legalComments: 'inline',
  banner: {
    js: '/* CodeMirror 6 и зависимости — MIT. Собрано для js-interview-prep: build/npm run build */',
  },
});
console.log('built ../vendor/codemirror.bundle.js');
