section('Задача 5. promisify');

function promisify(fn) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const waitMs = promisify((ms, cb) => setTimeout(() => cb(null, 'готово'), ms)) || (() => Promise.resolve());
const failMs = promisify((ms, cb) => setTimeout(() => cb(new Error('сломалось')), ms)) || (() => Promise.resolve());

waitMs(10).then((r) => check('успех промисифицирован', r, 'готово'));
failMs(10).then(
  () => check('ошибка не должна резолвиться', 'resolved', 'rejected'),
  (e) => check('ошибка из колбэка → reject', e.message, 'сломалось'),
);
