# Тестирование Angular-приложений

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Пирамида: unit (сервисы/утилиты/компоненты изолированно) → интеграционные (TestBed + реальные зависимости) → e2e (Playwright/Cypress по пользовательским сценариям).
- TestBed: configureTestingModule (providers/imports), DI-моки через provide-токены, `fixture.detectChanges()`, autoDetectChanges.
- Сигналы в тестах: `runInInjectionContext`, проверка computed/effect напрямую (effect синхронный с flushEffects).
- HttpTestingController / мок-интерсепторы для HTTP.
- Документация поведения: ждёшь stable, ждё текст (Playwright `getByText`).

## Что могут спросить дополнительно
- Что тестируете в первую очередь в компоненте? (логику и контракты input/output, не вёрстку)

## Красные флажки
- Снапшоты всего подряд; тесты, проверяющие implementation-детали.
