# Лайвкодинг Angular: CVA или структурная директива

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## CVA — скелет (попросят написать)
```ts
@Directive({selector: "app-stars", providers: [{
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StarsDirective), multi: true,
}]})
export class StarsDirective implements ControlValueAccessor {
  private onChange = (_: number) => {};
  private onTouched = () => {};
  writeValue(v: number) { /* от модели в вид */ }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { /* … */ }
}
```

## Структурная директива — скелет
```ts
@Directive({selector: "[appUnless]"})
export class UnlessDirective {
  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}
  @Input() set appUnless(cond: boolean) {
    this.vcr.clear();
    if (!cond) this.vcr.createEmbeddedView(this.tpl);
  }
}
```
