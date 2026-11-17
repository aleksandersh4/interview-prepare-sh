section('Задача 3. Головоломки: предскажи результат');

const answers = [
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼ — вместо каждого undefined впиши свой прогноз
  undefined, // [] + []
  undefined, // [] + {}
  undefined, // '' - 1
  undefined, // '5' + 3
  undefined, // '5' - 3
  undefined, // null == undefined
  undefined, // null == 0
  undefined, // null >= 0
  undefined, // NaN == NaN
  undefined, // Boolean('false')
  undefined, // Boolean([])
  undefined, // 'b' + 'a' + +'a' + 'a'
];
const puzzles = [
  ['[] + []', () => [] + []],
  ['[] + {}', () => [] + {}],
  ["'' - 1", () => '' - 1],
  ["'5' + 3", () => '5' + 3],
  ["'5' - 3", () => '5' - 3],
  ['null == undefined', () => null == undefined],
  ['null == 0', () => null == 0],
  ['null >= 0', () => null >= 0],
  ['NaN == NaN', () => NaN == NaN],
  ["Boolean('false')", () => Boolean('false')],
  ['Boolean([])', () => Boolean([])],
  ["'b' + 'a' + +'a' + 'a'", () => 'b' + 'a' + +'a' + 'a'],
];
puzzles.forEach(([label, run], i) => check(label + ' → ?', answers[i], run()));
