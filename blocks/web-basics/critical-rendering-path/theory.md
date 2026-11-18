# Critical Rendering Path: как браузер рисует страницу

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Цепочка: HTML → DOM; CSS → CSSOM; DOM + CSSOM → Render Tree; Layout (геометрия) → Paint (пиксели) → Composite (слои GPU).
- CSS — блокирующий рендер; JS — блокирующий парсинг (может ждать CSS).
- Layout/Reflow — пересчёт геометрии (дорогой, «thrashing» при чтении-записи стилей в цикле); Paint — перерисовка; Composite — самый дешёвый (transform/opacity).
- Оптимизации: минификация+критический CSS, `defer/async`, `media` у стилей, `content-visibility`, анимации только transform/opacity.

## Что могут спросить дополнительно
- Что вызывает reflow? (изменение геометрии, чтение offsetWidth — форс-синхронный layout)
- Почему анимировать `top/left` хуже, чем `transform`? (layout+paint vs composite)
- Что такое FPS и budget кадра (16.6 мс на 60 fps).

## Красные флажки
- Не знаешь порядок DOM→CSSOM→Render Tree.
