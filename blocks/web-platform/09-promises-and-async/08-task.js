section('Задача 6. fetchJson с таймаутом');

function fetchJson(url, { timeoutMs = 5000, fetchImpl = fetch } = {}) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  return Promise.resolve(); // заглушка: удали
}


// Тесты подменяют fetch через fetchImpl (dependency injection) — так пишут и в проде.
const mockOk = () => Promise.resolve(new Response(JSON.stringify({ status: 'ok', items: [1, 2] }), { status: 200 }));
const mock404 = () => Promise.resolve(new Response('not found', { status: 404 }));
const mockHang = () => new Promise(() => {}); // сервер молчит вечно

fetchJson('/api/data', { fetchImpl: mockOk }).then(
  (data) => check('успех: JSON распарсен', data, { status: 'ok', items: [1, 2] }),
  (e) => check('успех: не должен reject', e.message, 'не должен'),
);
fetchJson('/api/data', { fetchImpl: mock404 }).then(
  () => check('404 не должен резолвиться', 'resolved', 'rejected'),
  (e) => check('404 → reject, статус в ошибке', /404/.test(e.message), true),
);
fetchJson('/api/data', { timeoutMs: 40, fetchImpl: mockHang }).then(
  () => check('тишина сервера не должна резолвиться', 'resolved', 'rejected'),
  (e) => check('таймаут → reject (AbortError/TimeoutError)', e.name === 'AbortError' || e.name === 'TimeoutError', true),
);
