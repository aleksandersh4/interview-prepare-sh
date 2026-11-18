# ViewChild, ContentChild и их signal-версии

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- `@ViewChild` — из ШАБЛОНА компонента; `@ContentChild` — из ПРОЕЦИРУЕМОГО контента.
- Инициализация: ViewChild — после ngAfterViewInit; ContentChild — после ngAfterContentInit (до view!).
- Современно: `viewChild('ref')`/`viewChild(Comp)` — signal-функции, `viewChildren()` — сигнал-массив (реагирует на изменения!).
{ static: true } больше нет — сигнал-версии решают вопрос доступности.

## Что могут спросить дополнительно
- Чем viewChildren() лучше QueryList.changes. (реактивность на сигналах)

## Красные флажки
- Обращение к ViewChild в ngOnInit (undefined).
