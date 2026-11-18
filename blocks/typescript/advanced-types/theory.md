# Conditional Types, infer, Mapped и Template Literal Types

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Conditional: `T extends U ? X : Y` — тип-тернарник; на этом построены утилиты.
- `infer R` — «выведи и назови» внутри pattern: `T extends Promise<infer R> ? R : T` (так устроен Awaited).
- Mapped: `{ [K in keyof T]: boolean }` — трансформация полей (так устроены Partial).
- Модификаторы в mapped: `-?` (убрать опциональность), `readonly`.
- Template literal: `` type Route = `/${string}` ``; комбинации union строк.

## Что могут спросить дополнительно
- Напиши UnwrapPromise сам.
- Key remapping `as` в mapped types.

## Красные флажки
- Не можешь прочитать чужой conditional type вслух.
