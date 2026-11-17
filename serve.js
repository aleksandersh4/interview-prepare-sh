// Опционально: запуск через `node serve.js` → http://127.0.0.1:8127
// Стенд работает и просто с диска (открой index.html), сервер нужен только
// если file:// чем-то не устроит.
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = 8127;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(root, urlPath);
  if (urlPath === '/' || urlPath.endsWith('/')) file = path.join(root, 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('http://127.0.0.1:' + port));
