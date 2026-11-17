section('Задача 7. Фолбэк зеркал API');

function getFirstSuccessful(urls, fetchImpl) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
  return Promise.resolve(); // заглушка: удали
}


// Реальный сценарий: несколько зеркал API, берём первое ответившее.
const impl = (url) => {
  if (url === '/mirror-a') return Promise.reject(new Error('зеркало A лежит'));
  if (url === '/mirror-b') return Promise.resolve(new Response(JSON.stringify({ from: 'B' }), { status: 200 }));
  return Promise.resolve(new Response(JSON.stringify({ from: 'C' }), { status: 200 }));
};

getFirstSuccessful(['/mirror-a', '/mirror-b'], impl).then(
  (data) => check('первое живое зеркало ответило', data, { from: 'B' }),
  () => check('фолбэк должен был сработать', 'reject', 'resolve'),
);
getFirstSuccessful(['/mirror-b', '/mirror-a'], impl).then(
  (data) => check('порядок не важен — главное первое успешное', data, { from: 'B' }),
  () => check('должен был resolve', 'reject', 'resolve'),
);
getFirstSuccessful(['/mirror-a'], (url) => Promise.reject(new Error(url + ' недоступен'))).then(
  () => check('все зеркала упали: не резолвиться', 'resolved', 'rejected'),
  () => check('все зеркала упали → reject', true, true),
);
