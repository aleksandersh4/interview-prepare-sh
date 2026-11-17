section('Задача 1. Делегирование списка');
const sandbox = document.getElementById('sandbox');

// Один обработчик на ul: клик по li добавляет ему класс 'done'.
// Помни: клик может попасть во вложенный элемент — используй e.target.closest('li').
// ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
function setupListDelegation(ul) {
  // TODO
}
// ▲▲▲ КОНЕЦ КОДА · ниже проверки, не меняй ▲▲▲
const list = document.createElement('ul');
['Купить молоко', 'Позвонить маме', 'Написать резюме'].forEach((text) => {
  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
});
sandbox.appendChild(list);
setupListDelegation(list);

const secondLi = list.children[1];
secondLi.dispatchEvent(new MouseEvent('click', { bubbles: true }));
check('клик по li отмечает его', secondLi.classList.contains('done'), true);
check('соседние li не тронуты', list.children[0].classList.contains('done'), false);
