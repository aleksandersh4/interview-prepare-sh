section('Демо: var vs let в цикле (объясни вывод)');
for (var vi = 1; vi <= 3; vi++) setTimeout(() => log('var:', vi), 0);
for (let li = 1; li <= 3; li++) setTimeout(() => log('let:', li), 0);
// Почему var печатает 4,4,4, а let — 1,2,3?
// Ответь себе (или мне в чат) до того, как загуглить.
