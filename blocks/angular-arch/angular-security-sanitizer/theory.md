# Безопасность Angular: DomSanitizer

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Angular по умолчанию экранирует интерполяции и property-binding (XSS-защита из коробки).
- `DomSanitizer.bypassSecurityTrustHtml/Url/…` — осознанный обход ТОЛЬКО для доверенного контента; для юзер-HTML — санитизация (DOMPurify) до bypass.
- `[innerHTML]` юзер-данных без санитизации = stored XSS.
- CSRF: Angular читает XSRF-TOKEN cookie и шлёт X-XSRF-TOKEN (с withCredentials); заголовки/интерсепторы.

## Что могут спросить дополнительно
- Свяжи с XSS/CSRF из блока «Безопасность».

## Красные флажки
- bypassSecurityTrustHtml на ввод пользователя.
