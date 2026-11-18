# Хуки жизненного цикла: порядок, constructor vs ngOnInit

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Порядок: ngOnChanges (много раз) → ngOnInit (1) → ngDoCheck → ngAfterContentInit → ngAfterViewInit → ngOnDestroy. (ngAfterContentChecked/ngAfterViewChecked — после каждой проверки.)
- constructor — DI-инъекции, поле ещё не готово к работе с input; ngOnInit — после первого ngOnChanges: inputs гарантированно установлены.
- ngOnChanges — только @Input по ссылке (shallow! мутация объекта не поймается → ngDoCheck или сравнение вручную).
- ngOnDestroy — отписки/клинап; в современном коде DestroyRef/takeUntilDestroyed.

## Что могут спросить дополнительно
- Почему мутация одного и того же объекта в input не вызывает ngOnChanges? (сравнение по ссылке)

## Красные флажки
- Работа с @Input в конструкторе.
