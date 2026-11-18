# Кэширование HTTP: Cache-Control, ETag

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- `Cache-Control: max-age=N` — свежесть без запроса; `no-cache` = каждый раз сверяться (не «не кэшировать»!); `no-store` = не хранить вовсе; `private/public`; `s-maxage` для CDN; `immutable` для хэшированных ассетов.
- Валидация: `ETag`/`If-None-Match` и `Last-Modified`/`If-Modified-Since` → 304 без тела.
- Стратегия для SPA: `index.html` — `no-cache`; бандлы с хэшем в имени — `max-age=31536000, immutable`.
- `Vary` — ключ кэша по заголовку (например `Accept-Encoding`).

## Что могут спросить дополнительно
- Почему после деплоя у части юзеров старая версия? (закэширован index.html / чанки с прежними именами)
- Memory/disk cache и `stale-while-revalidate`.

## Красные флажки
- «no-cache = отключить кэш» (это no-store).
