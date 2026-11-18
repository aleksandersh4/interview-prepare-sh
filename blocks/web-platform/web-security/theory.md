# Безопасность фронта: XSS, CSRF, CSP, JWT

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- XSS: внедрение скрипта в страницу. Виды: stored, reflected, DOM-based. Защита: экранирование/санитизация (Angular делает по умолчанию!), CSP, не `bypassSecurityTrust*` без необходимости.
- CSRF: сайт злоумышленника шлёт запрос от имени залогиненного юзера (cookie прикладывается). Защита: `SameSite` cookies, CSRF-токены, проверка Origin.
- CSP: белый список источников скриптов/стилов (`script-src 'self'`), `nonce`, отключение inline — резко режет XSS.
- JWT: короткоживущий access в памяти + refresh в httpOnly cookie; в localStorage — только если осознаёшь XSS-риск.
- Прочее: `rel="noopener noreferrer"` на внешних ссылках с target=_blank, Subresource Integrity.

## Что могут спросить дополнительно
- Почему Angular «безопасен по умолчанию»? (санитизация интерполяций и байндингов)
- Как защитить SPA от clickjacking? (X-Frame-Options / frame-ancestors)

## Красные флажки
- `DomSanitizer.bypassSecurityTrustHtml` на пользовательский ввод.
