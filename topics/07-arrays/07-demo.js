section('Демо: sort мутирует и сравнивает строки');
const nums = [10, 9, 1];
const sorted = nums.sort();
log('nums после sort():', nums, '(исходник изменился)');
log('sort() без компаратора дал:', sorted, '(сравнение как строк: "1" < "10" < "9")');
log('правильно для чисел:', [...nums].sort((a, b) => a - b), 'или nums.toSorted((a, b) => a - b)');
