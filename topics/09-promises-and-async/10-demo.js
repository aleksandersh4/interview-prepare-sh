section('Демо: живой запрос к публичному API');
const API = 'https://jsonplaceholder.typicode.com/users/1';

if (typeof globalThis.__CARD_CHECKER__ !== 'undefined') {
  log('пропускаю сетевой запрос в офлайн-проверке карточек');
} else {
  // Таймаут честный: если сети нет — через 3 секунды увидишь ошибку, а не вечное ожидание
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 3000);
  log('GET', API);
  fetch(API, { signal: controller.signal })
    .then((r) => { log('HTTP статус:', r.status, r.ok ? '(ok)' : '(не ok)'); return r.json(); })
    .then((user) => log('ответ: имя =', user && user.name, '· email =', user && user.email))
    .catch((e) => log('не получилось (нет сети/блокировка):', e.name, '—', e.message));
}
// Что попробовать ещё: подставь /users/2, /todos/1 или https://api.github.com/repos/torvalds/linux
