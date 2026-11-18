section('Демо: последовательно vs параллельно');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // готовый хелпер (сам пишешь его в задаче 01)
const seqStart = performance.now();
(async () => {
  for (let i = 0; i < 3; i++) await sleep(30);
  const seqTime = performance.now() - seqStart;

  const parStart = performance.now();
  await Promise.all([1, 2, 3].map(() => sleep(30)));
  const parTime = performance.now() - parStart;

  log('последовательно (await в цикле):  ~' + Math.round(seqTime) + ' мс (3 × 30)');
  log('параллельно (Promise.all + map):   ~' + Math.round(parTime) + ' мс (одна волна по 30)');
})();
