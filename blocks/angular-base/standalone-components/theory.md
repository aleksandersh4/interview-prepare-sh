# Standalone-компоненты и конец NgModule

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- `standalone: true` (с v19 дефолт): компонент сам объявляет зависимости — imports: [CommonModule, MatButton, …].
- NgModule остались для легаси/редких библиотек; bootstrapping: `bootstrapApplication(App, {providers})` — main.ts без платформы модулей.
- Выгоды: tree-shaking (не тащим модуль ради одной кнопки), ленивость на уровне компонента (`loadComponent`), меньше церемоний.
- Организация: экспорты-«баррели» и shared-UI библиотеки компонентов.

## Что могут спросить дополнительно
- Как теперь шарятся провайдеры приложения? (provideRouter, provideHttpClient, provideZonelessChangeDetection в providers bootstrapApplication)

## Красные флажки
- «NgModule запрещён» — нет, но новый код standalone.
