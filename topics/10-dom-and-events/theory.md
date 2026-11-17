# 10 · DOM и события

> Задачи — карточками на странице темы; файлы: `01-task.js`, `02-task.js`… в этой папке.
> Тема работает с серой зоной «DOM sandbox» на странице раннера.

## Теория (кратко)

- Поиск: `document.querySelector(css)` / `querySelectorAll` (статичный NodeList-подобный список),
  `getElementById`. Вверх от элемента: `el.closest('.row')` — ближайший предок (или сам), подходящий под селектор.
- Создание: `createElement` + `textContent` (+ `appendChild`), `insertAdjacentHTML('beforeend', html)`, `remove()`.
  `innerHTML` быстрый, но **небезопасен** с пользовательскими данными (XSS) и затирает существующие узлы.
- Событие проходит три фазы: **capture** (от document вниз к цели) → **target** → **bubble** (вверх).
  По умолчанию обработчики вешаются на bubble; третий аргумент `{ capture: true }` — на погружение.
- Объект события: `e.target` — элемент, где событие произошло; `e.currentTarget` — элемент,
  на котором висит текущий обработчик (то, на что реагируешь).
- `addEventListener` позволяет много обработчиков одного типа; `removeEventListener` снимает только
  ту же самую ссылку на функцию (анонимную снять нельзя).
- Тормоза:
  - `stopPropagation()` — не пускать событие дальше по цепочке узлов;
  - `stopImmediatePropagation()` — то же + остальные обработчики на текущем узле;
  - `preventDefault()` — отменить действие браузера (сабмит, переход), **не** всплытие.
- **Делегирование**: один обработчик на контейнере, внутри ищем `e.target.closest('li')` (обязательно
  `closest`, т.к. клик может попасть во вложенный span). Выгоды: меньше обработчиков, работает
  для динамически добавленных детей, меньше памяти.
- Свои события: `new CustomEvent('app:ready', { detail: {...} })` + `el.dispatchEvent(evt)`.
  Обработчик читает данные из `e.detail`.
- Загрузка страницы: `DOMContentLoaded` — DOM готов (скрипты defer тоже до него);
  `window.load` — включая картинки и стили. Скрипты: обычный блокирует парсинг, `defer` — после DOM,
  с сохранением порядка, `async` — как скачается, порядок не гарантирован.
- `this` в обычном обработчике = элемент, на котором висит слушатель (`currentTarget`).

## Примеры

```js
// Делегирование списка
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li || !list.contains(li)) return;
  li.classList.toggle('done');
});

// Своё событие с данными
const evt = new CustomEvent('app:ready', { detail: { ok: true } });
document.dispatchEvent(evt);
document.addEventListener('app:ready', (e) => console.log(e.detail.ok));

// Снять обработчик можно только сохранив ссылку
const onClick = () => {};
btn.addEventListener('click', onClick);
btn.removeEventListener('click', onClick);
```

## Вопросы с собеседований

1. Нарисуй/расскажи три фазы события. Как повесить обработчик на фазу погружения?
2. Разница `e.target` и `e.currentTarget`? Что такое `this` в обработчике?
3. `stopPropagation` vs `stopImmediatePropagation` vs `preventDefault` — по примеру на каждый.
4. Что такое делегирование и зачем? Как найти `li` по клику, если внутри `li` есть вложенные теги?
5. Почему `removeEventListener` не снимает анонимную функцию?
6. Как создать и отправить своё событие с данными? Что такое `detail`?
7. Чем опасен `innerHTML` с пользовательским вводом? Альтернативы.
8. `DOMContentLoaded` vs `load`? Что раньше?
9. Отличия `defer` и `async` у тега `<script>`?
10. Как отследить клик вне элемента (закрытие попапа)? (клик на document + `contains`)
11. Чем `getElementsByClassName` отличается от `querySelectorAll` (живая vs статичная коллекция)?

## Задачи (карточки на странице)

Элементы создаются в DOM sandbox на странице; тесты «кликают» синтетическими событиями.

1. **Делегирование списка** — один обработчик на `ul` отмечает `li` по клику.
2. **Счётчик с двумя кнопками** — один обработчик на контейнер, действие из `data-action`.
3. **Debounce на input** — поиск срабатывает один раз после паузы ввода.
4. **CustomEvent** — событие `'app:ready'` с `detail: { ok: true }`.
