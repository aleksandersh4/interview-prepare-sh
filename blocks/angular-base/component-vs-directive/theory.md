# Компонент против директивы; виды директив

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Компонент = директива + шаблон (@Component) — создаёт DOM.
- Атрибутивная директива — меняет вид/поведение существующего элемента ([appHighlight]).
- Структурная — добавляет/удаляет DOM (*ngIf/@if под капотом ng-template + TemplateRef + ViewContainerRef).
- Своя структурная: `constructor(private tpl: TemplateRef, private vcr: ViewContainerRef)` + `@Input set appUnless(cond)`, `vcr.createEmbeddedView(tpl)` / `clear()`.

## Что могут спросить дополнительно
- Почему у структурной директивы input с тем же именем (микросинтаксис `*appUnless="cond"`).
- Во что разворачивается звёздочка? (ng-template + директива)

## Красные флажки
- Не знаешь, что `*` = TemplateRef + ViewContainerRef.
