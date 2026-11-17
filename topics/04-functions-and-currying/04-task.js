section('Задача 4. average через arguments');
// average(2, 4, 6) → 4. Используй arguments (поэтому функция — НЕ стрелка),
// преврати его в массив и посчитай среднее. average() → 0.
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function average() {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
check('average(2, 4, 6)', average(2, 4, 6), 4);
check('average(10)', average(10), 10);
check('average()', average(), 0);
