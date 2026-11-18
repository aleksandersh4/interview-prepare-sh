# Производительность и размер бандла

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Рендер: OnPush + signals, track в @for, виртуальный скролл (CDK Virtual Scroll/Scrolling), @defer для тяжёлых ниже-фолда блоков, runOutsideAngular для частых событий.
- Бандл: lazy роуты (loadComponent/loadChildren), standalone-импорты точечно, analysis: `ng build --stats-json` + source-map-explorer / webpack-bundle-analyzer.
- Данные: кэш (shareReplay/rxResource), пагинация вместо 50k строк, debounced поиск.
- Метрики: Lighthouse (TTI/TBT), Core Web Vitals; профилировщик Angular DevTools.

## Что могут спросить дополнительно
- Порядок действий «страница тормозит» (профиль → узкое место: CD/данные/бандл).
- Как найти, что раздуло бандл (анализатор, moment/lodash-локали).

## Красные флажки
- Оптимизация вслепую без профилировщика.
