section('Задача 4. Точные сравнения чисел');

function numbersEqual(a, b, epsilon = Number.EPSILON) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('0.1 + 0.2 vs 0.3 — равны с эпсилон', numbersEqual(0.1 + 0.2, 0.3), true);
check('разница больше эпсилон — не равны', numbersEqual(0.1 + 0.2, 0.4), false);
check('обычные равные числа', numbersEqual(5, 5), true);
check('своё большое epsilon', numbersEqual(0.1 + 0.2, 0.4, 0.5), true);
check('отрицательные числа', numbersEqual(-0.1 + -0.2, -0.3), true);
