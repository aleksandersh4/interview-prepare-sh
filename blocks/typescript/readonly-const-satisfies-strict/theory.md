# readonly, as const, satisfies и strict-режим

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- `readonly` поля/массивы — защита на этапе типов (не в рантайме!).
- `as const` — литеральный тип и deep-readonly: конфиги, ROUTES.
- `satisfies T` — проверка «укладывается в тип», НО сохраняет конкретные литералы (в отличие от аннотации, которая расширяет).
- strict-флаги: `strict` включает `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`…; `strictNullChecks` — главный: null/undefined отдельные типы.
- `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess` — для зрелых команд.

## Что могут спросить дополнительно
- satisfies vs аннотация vs as — три разных сценария.
- Что ломается при выключенном strictNullChecks?

## Красные флажки
- «readonly гарантирует неизменяемость в рантайме» — нет.
