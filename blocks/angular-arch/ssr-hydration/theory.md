# SSR, SSG и Hydration

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- SSR (@angular/ssr): HTML на сервере → быстрый FCP/SEO; SSG — генерация статики (Angular prerendering).
- Hydration: клиент «оживляет» серверный DOM вместо пересоздания (не мигает, меньше работы) — `provideClientHydration()`.
- Incremental Hydration (@defer hydration on viewport/interaction) и Event Replay — тонкая настройка прогрева.
- Браузерные API — только в afterNextRender/isPlatformBrowser; localStorage и т.п. на сервере отсутствуют.
- Данные на сервере: httpTransferCache (кеш ответов → не дублируем запросы на клиенте).

## Что могут спросить дополнительно
- Почему падает «window is not defined» и как чинить (платформенные проверки).
- Чем hydration отличается от «просто рендер и забыть» (state reconciliation, события).

## Красные флажки
- Не знаешь, что при разной серверной/клиентской разметке получится hydration mismatch.
