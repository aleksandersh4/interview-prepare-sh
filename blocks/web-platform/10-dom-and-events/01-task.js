section('Задача 1. Делегирование списка');
const sandbox = document.getElementById('sandbox');

function setupListDelegation(ul) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


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
