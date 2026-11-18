// Генератор теории: angular-base, angular-reactivity, angular-di-forms, angular-arch, practice
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));

function topic(block, slug, title, lines) {
  const dir = join(root, 'blocks', block, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'theory.md'), ['# ' + title, '', ...lines].join('\n') + '\n');
  writeFileSync(join(dir, 'index.json'), '[]\n');
  console.log(block + '/' + slug);
}

const TIP = '> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.';

/* ───────────────── angular-base ───────────────── */

topic('angular-base', 'component-vs-directive', 'Компонент против директивы; виды директив', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Компонент = директива + шаблон (@Component) — создаёт DOM.',
  '- Атрибутивная директива — меняет вид/поведение существующего элемента ([appHighlight]).',
  '- Структурная — добавляет/удаляет DOM (*ngIf/@if под капотом ng-template + TemplateRef + ViewContainerRef).',
  '- Своя структурная: `constructor(private tpl: TemplateRef, private vcr: ViewContainerRef)` + `@Input set appUnless(cond)`, `vcr.createEmbeddedView(tpl)` / `clear()`.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему у структурной директивы input с тем же именем (микросинтаксис `*appUnless="cond"`).',
  '- Во что разворачивается звёздочка? (ng-template + директива)',
  '',
  '## Красные флажки',
  '- Не знаешь, что `*` = TemplateRef + ViewContainerRef.',
]);

topic('angular-base', 'data-binding', 'Виды привязки данных: интерполяция, [], (), [()], model()', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `{{ expr }}` — текст; `[prop]="expr"` — property binding (включая атрибуты `[attr.x]`, классы `[class.x]`, стили `[style.x]`).',
  '- `(event)="handler()"` — события DOM/Output; `$event`.',
  '- Двусторонняя: классика `[(ngModel)]` = `[ngModel]` + `(ngModelChange)`; современная — `model()` сигнал: `[myVal]="parent"` / родитель слушает `myValChange`… точнее `model()` даёт WritableSignal + событие изменения.',
  '- Не забыть: привязка — к свойству элемента/компонента, а не атрибуту (attr — для редких исключений).',
  '',
  '## Что могут спросить дополнительно',
  '- Как реализован `[( )` — синтаксический сахар двух байндингов.',
  '- `[style.width.px]` — юниты в байндинге.',
  '',
  '## Красные флажки',
  '- Путаешь атрибут и свойство (value у input — свойство!).',
]);

topic('angular-base', 'ng-template-container-content', 'ng-template, ng-container, ng-content', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `ng-template` — шаблон «в коробке», не рендерится сам; рендерит кто-то (структурная директива, ngTemplateOutlet, *ngFor по нему).',
  '- `ng-container` — невидимая обёртка-группировка без DOM-узла (нельзя ngFor+ngIf на одном узле — вот решение).',
  '- `ng-content` — точка проекции контента родителя внутрь шаблона компонента; select="…" — слоты (`select="[footer]"`).',
  '- Жизненный цикл: контент проецируется ДО инициализации вьюхи (ngAfterContentInit раньше ngAfterViewInit).',
  '',
  '## Что могут спросить дополнительно',
  '- Что будет, если спроецировать контент в @if? (проекция статична, нюансы пересоздания)',
  '- ngTemplateOutlet + контекст (let-item).',
  '',
  '## Красные флажки',
  '- «ng-container рендерит div» — он не рендерит ничего.',
]);

topic('angular-base', 'lifecycle-hooks', 'Хуки жизненного цикла: порядок, constructor vs ngOnInit', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Порядок: ngOnChanges (много раз) → ngOnInit (1) → ngDoCheck → ngAfterContentInit → ngAfterViewInit → ngOnDestroy. (ngAfterContentChecked/ngAfterViewChecked — после каждой проверки.)',
  '- constructor — DI-инъекции, поле ещё не готово к работе с input; ngOnInit — после первого ngOnChanges: inputs гарантированно установлены.',
  '- ngOnChanges — только @Input по ссылке (shallow! мутация объекта не поймается → ngDoCheck или сравнение вручную).',
  '- ngOnDestroy — отписки/клинап; в современном коде DestroyRef/takeUntilDestroyed.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему мутация одного и того же объекта в input не вызывает ngOnChanges? (сравнение по ссылке)',
  '',
  '## Красные флажки',
  '- Работа с @Input в конструкторе.',
]);

topic('angular-base', 'viewchild-contentchild', 'ViewChild, ContentChild и их signal-версии', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `@ViewChild` — из ШАБЛОНА компонента; `@ContentChild` — из ПРОЕЦИРУЕМОГО контента.',
  '- Инициализация: ViewChild — после ngAfterViewInit; ContentChild — после ngAfterContentInit (до view!).',
  "- Современно: `viewChild('ref')`/`viewChild(Comp)` — signal-функции, `viewChildren()` — сигнал-массив (реагирует на изменения!).",
  '{ static: true } больше нет — сигнал-версии решают вопрос доступности.',
  '',
  '## Что могут спросить дополнительно',
  '- Чем viewChildren() лучше QueryList.changes. (реактивность на сигналах)',
  '',
  '## Красные флажки',
  '- Обращение к ViewChild в ngOnInit (undefined).',
]);

topic('angular-base', 'pipes-pure-impure', 'Пайпы: pure и impure', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- pure (по умолчанию): пересчёт только при смене ССЫЛКИ входа — быстрый, предсказуемый.',
  '- impure: пересчёт на каждый цикл CD — datePicker/async-подобные случаи; производительность — оценивать осознанно.',
  '- `async` pipe — impure-подобное поведение: подписка/отписка/`markForCheck` — главный инструмент RxJS в шаблонах.',
  '- Пайп — чистая функция без состояния (pure) → мемоизация сама.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему мутация массива не обновляет `| filter`? (ссылка та же → pure не пересчитает; immutability или impure)',
  '',
  '## Красные флажки',
  '- Impure «чтобы работало» без понимания цены.',
]);

topic('angular-base', 'view-encapsulation', 'ViewEncapsulation: Emulated, None, ShadowDom', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Emulated (дефолт): атрибуты _ngcontent/_host — стили компонента изолированы, в DevTools видно.',
  '- None: стили глобальные (осторожно — утечка стилей).',
  '- ShadowDom: настоящий Shadow DOM — полная изоляция, но_QuerySelector наружу не работает, стили извне не попадают.',
  '- Проброс стилей внутрь: `:host`, `::ng-deep` (deprecated, но живёт; лучше общие SCSS-переменные/миксины или CSS-переменные).',
  '',
  '## Что могут спросить дополнительно',
  '- Как стилизовать проецируемый контент? (::ng-deep или :host ::ng-deep — знать риски)',
  '',
  '## Красные флажки',
  '- ::ng-deep везде вместо дизайн-системы.',
]);

topic('angular-base', 'built-in-control-flow', 'Новый control flow: @if, @for, @switch, @defer', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `@if (cond) {…} @else if {…} @else {…}` и локальная переменная `as value` — треш-оператор `?.` не нужен.',
  '- `@for (item of items; track item.id)` — track ОБЯЗАТЕЛЕН: ключ идемпотентности DOM-узлов, без него — деградация и warning.',
  '- `@switch/@case`.',
  '- `@defer` — отложенная загрузка блока: триггеры `on viewport|interaction|idle|immediate`, `prefetch`, блоки `@placeholder`, `@loading`, `@error`.',
  '- Плюсы: нативная компиляция в JS (легче бандл), zoneless-friendly, без импорта CommonModule.',
  '',
  '## Что могут спросить дополнительно',
  '- Что даст track по индексу? (пересоздание/сдвиг DOM — потеря состояния полей)',
  '',
  '## Красные флажки',
  '- `track $index` для редактируемых списков.',
]);

topic('angular-base', 'standalone-components', 'Standalone-компоненты и конец NgModule', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `standalone: true` (с v19 дефолт): компонент сам объявляет зависимости — imports: [CommonModule, MatButton, …].',
  '- NgModule остались для легаси/редких библиотек; bootstrapping: `bootstrapApplication(App, {providers})` — main.ts без платформы модулей.',
  '- Выгоды: tree-shaking (не тащим модуль ради одной кнопки), ленивость на уровне компонента (`loadComponent`), меньше церемоний.',
  '- Организация: экспорты-«баррели» и shared-UI библиотеки компонентов.',
  '',
  '## Что могут спросить дополнительно',
  '- Как теперь шарятся провайдеры приложения? (provideRouter, provideHttpClient, provideZonelessChangeDetection в providers bootstrapApplication)',
  '',
  '## Красные флажки',
  '- «NgModule запрещён» — нет, но новый код standalone.',
]);

/* ───────────────── angular-reactivity ───────────────── */

topic('angular-reactivity', 'change-detection-zonejs', 'Классический Change Detection и Zone.js', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Zone.js патчит все асинхронные API (setTimeout, XHR, события) → после любого — Angular запускает проверку дерева компонентов.',
  '- CD идёт сверху вниз по дереву, проверяет все байндинги (Default), проверка ОДНОПРОТОЧНАЯ и жёстко связана с шаблоном.',
  '- Проблемы: слишком частые/глобальные прогоны (mousemove), страница «тормозит» из-за больших деревьев.',
  '- Решения: OnPush, runOutsideAngular, track, virtual scroll, → и главный вектор: signals/zoneless.',
  '',
  '## Что могут спросить дополнительно',
  '- Кто запускает CD при setTimeout? (зона: перехват завершения таска)',
  '- Почему ngDoCheck не означает «изменился»? (это шанс САМОМУ проверить)',
  '',
  '## Красные флажки',
  '- «CD сравнивает JSON компонента».',
]);

topic('angular-reactivity', 'onpush-strategy', 'OnPush: что триггерит проверку', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  'OnPush-компонент проверяется только когда:',
  '- изменилась ССЫЛКА любого @Input (не мутация!),',
  '- сам компонент (или его дитя) породил событие (клик через байндинг шаблона),',
  '- явный markForCheck()/detectChanges() (async pipe делает это сам),',
  '- изменился сигнал, от которого зависит шаблон.',
  '',
  '- Следствие: иммутабельные данные (new объект/массив вместо push/mutation) — иначе OnPush «не увидит».',
  '- async pipe + OnPush — стандартная пара: подписка, отписка, markForCheck — из коробки.',
  '',
  '## Что могут спросить дополнительно',
  '- Мутация массива в OnPush-компоненте — что произойдёт? (ничего, и как чинить — spread/toSorted)',
  '',
  '## Красные флажки',
  '- OnPush + мутации состояния «иногда не обновляется, ставим detectChanges в таймере».',
]);

topic('angular-reactivity', 'markforcheck-detectchanges', 'markForCheck() против detectChanges()', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `markForCheck()` — пометить компонент (и предков) для проверки в СЛЕДУЮЩЕМ цикле CD; работает с OnPush (async pipe зовёт именно это).',
  '- `detectChanges()` — запустить СИНХРОННУЮ проверку этого компонента и его детей ПРЯМО СЕЙЧАС (вне общего цикла).',
  '- detach()/reattach() — выключить/включить CD для компонента (ручное управление, редко).',
  '- В signals-эпоху оба нужны всё реже: изменение сигнала само планирует проверку.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему markForCheck поднимается к предкам? (байндинг может быть в родителе)',
  '',
  '## Красные флажки',
  '- detectChanges() в таймере «для надёжности».',
]);

topic('angular-reactivity', 'ngzone-run-outside', 'NgZone.runOutsideAngular и run()', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `runOutsideAngular(fn)` — выполнить код вне зоны: события/таймеры не триггерят CD. Для: mousemove/drag, websocket-шторм, canvas-игры, тяжёлые расчёты.',
  '- Вернуться в зону, когда надо обновить UI: `zone.run(() => …)`.',
  '- Правильная связка: снаружи считаем/агрегируем → порог достигнут → zone.run или signal.set (signal и так вне зоны спланирует рендер).',
  '- В zoneless эти пляски не нужны — ещё один аргумент за signals.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему scroll-листener «съедает» FPS (каждый скролл — полный прогон CD).',
  '',
  '## Красные флажки',
  '- runOutsideAngular вокруг HTTP-запроса «для скорости» (запросу зона не мешает).',
]);

topic('angular-reactivity', 'signals-internals', 'Signals: signal, computed, effect под капотом', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `signal(v)` — ячейка состояния; `.set/.update/.mutate`; чтение — функция `s()`.',
  '- `computed(() => …)` — ленивое производное: пересчитывается ТОЛЬКО если зависимости менялись и результат читается; кешируется.',
  '- Зависимости собираются ДИНАМИЧЕСКИ при вычислении (граф «кто кого читал»).',
  '- `effect(() => …)` — побочный эффект на изменения (по умолчанию async-батчинг, один раз после создания); нельзя писать сигналы внутри (по умолчанию allowSignalWrites=false).',
  '- CD: шаблон, прочитавший сигнал, перезапланирует проверку ТОЛЬКО себя — точечный рендер, предок не проверяется.',
  '',
  '## Что могут спросить дополнительно',
  '- Почему computed ленивый и когда это видно? (никто не читает — не считается)',
  '- untracked(() => …) — чтение без регистрации зависимости.',
  '',
  '## Красные флажки',
  '- Писать сигнал в effect «чтобы каскадно обновить» (для этого computed).',
]);

topic('angular-reactivity', 'signal-inputs-models', 'input(), output(), model(), linkedSignal(), resource()', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `input()` — сигнал-вход родителя (readonly; `input.required<T>()` — обязателен), `input(0)` — с дефолтом.',
  '- `output()` — типизированное событие вместо @Output/EventEmitter.',
  '- `model()` — двусторонний сигнал-вход: и значение, и событие изменения → `[(myModel)]="x"` работает.',
  '- `linkedSignal({source, computation})` — сигнал, пересчитываемый при изменении источника, но с ЛОКАЛЬНО перезаписываемым состоянием (редактируемая копия входа).',
  '- `resource()/rxResource()` — асинхронные данные: `value/status/error` сигналы, отмена устаревших запросов, reload — замена ручным «лоадер+try/catch+switchMap».',
  '',
  '## Что могут спросить дополнительно',
  '- linkedSignal vs computed+signal — когда нужна мутабельная копия.',
  '- rxResource vs toSignal(http$).',
  '',
  '## Красные флажки',
  '- Писать в input() (readonly!).',
]);

topic('angular-reactivity', 'zoneless-angular', 'Zoneless Angular', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Без Zone.js: никто не патчит async API → CD запускают сами механизмы изменения: signals, events, markForCheck, async pipe.',
  '- `provideZonelessChangeDetection()` (v20+; экспериментально раньше).',
  '- Требования к коду: состояние в сигналах (или явный markForCheck), OnPush-дисциплина, async pipe/toSignal; сторонние либы, обновляющие DOM руками без зоны, — риск.',
  '- Выгоды: меньше бандл, нет патчинга → быстрее старт, нет ложных прогонов CD, простой дебаг (нет «зоны» в стектрейсах).',
  '- В 2026 это мейнстрим-направление (v20/21/22) — вопрос почти обязателен.',
  '',
  '## Что могут спросить дополнительно',
  '- Что сломается при переезде? (код, рассчитанный на «зона всё перерисует»)',
  '',
  '## Красные флажки',
  '- «Zoneless = просто убрать Zone.js из полифиллов».',
]);

/* ───────────────── angular-di-forms ───────────────── */

topic('angular-di-forms', 'injector-hierarchy', 'Иерархия инжекторов: Element и Environment', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Два дерева: ElementInjector (компоненты/DOM-уровень) и EnvironmentInjector (приложение/роуты).',
  '- Поиск зависимости: от компонента вверх по ElementInjector до корня, затем EnvironmentInjector (роут-уровни → root).',
  '- Компонентные провайдеры перекрывают глобальные — иерархия = способ скоупить сервисы (диалог со своим состоянием).',
  '- `@Self/@SkipSelf/@Optional/@Host` и viewProviders против providers (видны ли сервисы проецируемым детям).',
  '',
  '## Что могут спросить дополнительно',
  '- Почему у каждого элемента списка свой сервис — как сделать? (providers на компоненте элемента)',
  '',
  '## Красные флажки',
  '- Считаешь, что DI — один глобальный контейнер.',
]);

topic('angular-di-forms', 'di-resolution-modifiers', 'Модификаторы DI: Optional, Self, SkipSelf, Host и в inject()', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `@Optional()` → inject(X, {optional: true}): нет провайдера — null вместо ошибки.',
  '- `@Self()` → {self: true}: только собственный инжектор.',
  '- `@SkipSelf()` → {skipSelf: true}: искать начиная с родителя (частый трюк: обёртка над родительской реализации).',
  '- `@Host()` → {host: true}: не выше хост-компонента (граница проекции).',
  '- `inject()` — функция нового стиля: работает в поле/конструкторе, короче, лучше типизируется; влага — только в injection context (конструкция поля/метода фабрики).',
  '',
  '## Что могут спросить дополнительно',
  '- Почему inject() нельзя в setTimeout-колбеке и что делать (принять инжектор аргументом/Injector.inject).',
  '',
  '## Красные флажки',
  '- Микс @Input-декораторов и inject в непонимании контекста.',
]);

topic('angular-di-forms', 'providers-and-tokens', 'useClass, useExisting, useValue, useFactory, InjectionToken, multi', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `useClass` — реализация (и сам класс — токен); `useValue` — готовое значение (конфиг, мок).',
  '- `useExisting` — алиас: токен указывает на другой провайдер (не второй инстанс!).',
  '- `useFactory` — создание с зависимостями (deps: […]).',
  '- `InjectionToken<T>` — токен без класса: интерфейсы, константы (`APP_CONFIG`).',
  '- `multi: true` — несколько провайдеров на один токен → массив (регистрация интерсепторов/валидаторов).',
  '',
  '## Что могут спросить дополнительно',
  '- useClass vs useExisting — классика на собеседование (два инстанса или один?).',
  '',
  '## Красные флажки',
  '- useExisting на несуществующий провайдер; токен без типа.',
]);

topic('angular-di-forms', 'providedin-lifetimes', 'providedIn: root/any, providers vs viewProviders', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `providedIn: "root"` — синглтон приложения + tree-shakable (не используется — вырезается).',
  '- `providedIn: "any"` — новый инстанс на каждый ленивый модуль/роут-ветку (ньанс: «почти синглтон» в пределах чанка).',
  '- `providedIn: "platform"/"environment"` — экзотика (шаринг между приложениями платформы).',
  '- providers на компоненте — инстанс на компонент; `viewProviders` — то же, но НЕ виден проецируемым детям (ng-content), виден собственному шаблону.',
  '',
  '## Что могут спросить дополнительно',
  '- Когда сервис в providers компонента лучше root? (состояние на экземпляр: кар	pool, шаги визарда)',
  '',
  '## Красные флажки',
  '- «Сервис всегда root». Зависит от желаемого времени жизни.',
]);

topic('angular-di-forms', 'routing-lazy-guards', 'Роутинг: lazy, функциональные гарды, Resolve', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `loadComponent/loadChildren` — ленивая загрузка чанка роута; `provideRouter(routes, withComponentInputBinding())` — параметры прямо в input() компонента.',
  '- Функциональные гарды: `canActivate`, `canMatch` (решает ЗАГРУЖАТЬ ли конфиг), `canDeactivate` (незакрытая форма), `canActivateChild`.',
  '- Гарды возвращают boolean/UrlTree/Observable|Promise — UrlTree = «редирект» (чистый способ).',
  '- `resolve` — предзагрузка данных: data попадает в ActivatedRoute.data / input binding; аккуратно с производительностью (лучше в компоненте через resource).',
  '',
  '## Что могут спросить дополнительно',
  '- canActivate vs canMatch (уровень решения: запуск против загрузку конфига).',
  '- Почему «resolves для всего» — антипаттерн (каскад ожиданий до рендера).',
  '',
  '## Красные флажки',
  '- Гарды-классы легаси-стиля без знания функциональных.',
]);

topic('angular-di-forms', 'httpclient-interceptors', 'HttpClient и функциональные интерсепторы', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- `provideHttpClient(withInterceptors([authInterceptor]))` — функциональный стиль (fn: (req, next) => Observable<HttpEvent>).',
  '- Цепочка: порядок регистрации = порядок применения; `next(req)` — передача дальше; можно менять req (клонировать!), response-ветку — через pipe.',
  '- Типовые: токен-заголовок, refresh-очередь на 401, логирование, ошибки → удобный формат, кэш, base URL.',
  '- `HttpContext` — передача per-request метаданных мимо заголовков (`context: new HttpContext().set(SHOW_SPINNER, true)`).',
  '',
  '## Что могут спросить дополнительно',
  '- Почему req.clone? (иммутабельность запроса)',
  '- Свяжи с кейсом JWT-refresh (блок «Практика»).',
  '',
  '## Красные флажки',
  '- Интерсептор-класс HttpInterceptor легаси без знания functional.',
]);

topic('angular-di-forms', 'reactive-vs-template-forms', 'Reactive Forms против Template-driven', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Reactive: модель формы в коде (FormGroup/FormControl/FormArray/FormRecord), подписки valueChanges, программная валидация, динамические поля — стандарт для сложных форм.',
  '- Template-driven: ngModel + директивы в шаблоне, проще для простых форм, «магия» scope.',
  '- Типизированные формы: `NonNullableFormBuilder`, strict types с v14+.',
  '- FormRecord — динамический набор контролов с одинаковым типом (фильтры).',
  '- Вектор 2026: Signal Forms (эксперим.) — формы на сигналах; знать о них плюс.',
  '',
  '## Что могут спросить дополнительно',
  '- Как добавить/удалить контрол динамически (FormArray.push/removeAt).',
  '- patchValue vs setValue.',
  '',
  '## Красные флажки',
  '- Одна большая FormGroup «на всё» без структуры групп.',
]);

topic('angular-di-forms', 'validators-and-cva', 'Валидаторы и ControlValueAccessor', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Синхронные валидаторы возвращают ошибки (`{required: true}`) или null; асинхронные — Observable/Promise (занят-логин); compose.',
  '- Кастомный валидатор — чистая функция (ValidatorFn); асинхронный в паре с debounce в UI.',
  '- CVA — мост «кастомный контрол ↔ forms API»: реализовать writeValue, registerOnChange, registerOnTouched, (setDisabledState); `provide NG_VALUE_ACCESSOR`.',
  '- Сюда же: touched/dirty/pristine, ошибки показываем после touched или submit.',
  '',
  '## Что могут спросить дополнительно',
  '- Написать CVA-скелет наизусть — популярный лайвкодинг.',
  '- Как пробросить валидацию внутрь CVA (прокси-контрол).',
  '',
  '## Красные флажки',
  '- Не знаешь про registerOnTouched (клик-вне = touched).',
]);

/* ───────────────── angular-arch ───────────────── */

topic('angular-arch', 'smart-dumb-fsd', 'Smart/Dumb компоненты, FSD, монорепо Nx', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Smart (container): знает о данных/сервисах/роутинге; Dumb (presentational): input→output, максимум переиспользуемости, легко тестировать и сторителлить.',
  '- FSD (Feature-Sliced Design): слои app→pages→widgets→features→entities→shared; импорты только вниз, публичный API слоя через index.',
  '- Nx: монорепо, граница библиотек (tags/enforce-module-boundaries), кеш задач, генераторы; приложение + ui/feature/data библиотеки.',
  '- Плюс: единый язык структуры, параллельная работа команд, контроль зависимостей.',
  '',
  '## Что могут спросить дополнительно',
  '- Как определить границу feature vs widget? (фича = самостоятельный сценарий, виджет = композиционный блок страницы)',
  '',
  '## Красные флажки',
  '- Всё в app/components; «FSD = папки так назвать».',
]);

topic('angular-arch', 'state-management', 'Управление состоянием: сервисы, NgRx, SignalStore', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Спектр: локально в компоненте → сервис со signals → SignalStore → NgRx Store (Redux) для сложных доменов.',
  '- Redux-паттерн: store→state, селекторы (мемоизация), actions→reducers чистые, effects для сайд-эффектов; DevTools time-travel.',
  '- NgRx SignalStore: сигнальный стор без бойлерплейта (withState/withComputed/withMethods), легковеснее классики.',
  '- Правило выбора: 80% приложений хватает сервиса+signals; NgRx — когда много источников меняют одно состояние, нужна история/отладка.',
  '',
  '## Что могут спросить дополнительно',
  '- Зачем селекторы, если можно state.orders? (мемоизация + композиция)',
  '- Где хранить состояние формы/серверного кеша (react-query/rtk-подходы, rxResource).',
  '',
  '## Красные флажки',
  '- «NgRx всегда» или «NgRx никогда» без критериев.',
]);

topic('angular-arch', 'performance-bundle', 'Производительность и размер бандла', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Рендер: OnPush + signals, track в @for, виртуальный скролл (CDK Virtual Scroll/Scrolling), @defer для тяжёлых ниже-фолда блоков, runOutsideAngular для частых событий.',
  '- Бандл: lazy роуты (loadComponent/loadChildren), standalone-импорты точечно, analysis: `ng build --stats-json` + source-map-explorer / webpack-bundle-analyzer.',
  '- Данные: кэш (shareReplay/rxResource), пагинация вместо 50k строк, debounced поиск.',
  '- Метрики: Lighthouse (TTI/TBT), Core Web Vitals; профилировщик Angular DevTools.',
  '',
  '## Что могут спросить дополнительно',
  '- Порядок действий «страница тормозит» (профиль → узкое место: CD/данные/бандл).',
  '- Как найти, что раздуло бандл (анализатор, moment/lodash-локали).',
  '',
  '## Красные флажки',
  '- Оптимизация вслепую без профилировщика.',
]);

topic('angular-arch', 'microfrontends', 'Микрофронтенды: Module/Native Federation', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Идея: независимые команды/деплои кусков приложения; сборка в рантайме из разделяемых модулей.',
  '- Module Federation (webpack) / Native Federation (esbuild/vite, актуально для Angular 17+).',
  '- Shared-зависимости: `shared: { "@angular/core": {singleton: true} }` — один инстанс фреймворка.',
  '- Изоляция стилей (инкапсуляция/префиксы/ShadowDOM), коммуникация: custom events/шина, shared-сервисы через injections.',
  '- Цена: сложность инфраструктуры, версионирование контрактов — нужен веский повод.',
  '',
  '## Что могут спросить дополнительно',
  '- Зачем singleton у @angular/core (два инстанса = сломанный DI/CD).',
  '',
  '## Красные флажки',
  '- «МФ решают всё» без понимания цены.',
]);

topic('angular-arch', 'ssr-hydration', 'SSR, SSG и Hydration', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- SSR (@angular/ssr): HTML на сервере → быстрый FCP/SEO; SSG — генерация статики (Angular prerendering).',
  '- Hydration: клиент «оживляет» серверный DOM вместо пересоздания (не мигает, меньше работы) — `provideClientHydration()`.',
  '- Incremental Hydration (@defer hydration on viewport/interaction) и Event Replay — тонкая настройка прогрева.',
  '- Браузерные API — только в afterNextRender/isPlatformBrowser; localStorage и т.п. на сервере отсутствуют.',
  '- Данные на сервере: httpTransferCache (кеш ответов → не дублируем запросы на клиенте).',
  '',
  '## Что могут спросить дополнительно',
  '- Почему падает «window is not defined» и как чинить (платформенные проверки).',
  '- Чем hydration отличается от «просто рендер и забыть» (state reconciliation, события).',
  '',
  '## Красные флажки',
  '- Не знаешь про IsHydration/差异 DOM-структур → hydration mismatch.',
]);

topic('angular-arch', 'angular-security-sanitizer', 'Безопасность Angular: DomSanitizer', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Angular по умолчанию экранирует интерполяции и property-binding (XSS-защита из коробки).',
  '- `DomSanitizer.bypassSecurityTrustHtml/Url/…` — осознанный обход ТОЛЬКО для доверенного контента; для юзер-HTML — санитизация (DOMPurify) до bypass.',
  '- `[innerHTML]` юзер-данных без санитизации = stored XSS.',
  '- CSRF: Angular читает XSRF-TOKEN cookie и шлёт X-XSRF-TOKEN (с withCredentials); заголовки/интерсепторы.',
  '',
  '## Что могут спросить дополнительно',
  '- Свяжи с XSS/CSRF из блока «Безопасность».',
  '',
  '## Красные флажки',
  '- bypassSecurityTrustHtml на ввод пользователя.',
]);

topic('angular-arch', 'web-workers', 'Web Workers: тяжёлые вычисления вне главного потока', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Worker — отдельный поток: длинные расчёты/парсинг не блокируют UI (главный поток держит 16 мс/кадр).',
  '- Общение postMessage (structured clone) / Transferable; Angular: `new Worker(new URL(./w.worker, import.meta.url), {type: "module"})` — бандлер соберёт отдельный чанк.',
  '- Когда: CSV/Excel, шифрование, тяжёлая математика, image-обработка. Когда НЕ надо: «чтобы быстрее» без замера — сериализация может съесть выигрыш.',
  '- Альтернатива — разбивка на чанки через setTimeout/requestIdleCallback для средне-тяжёлых задач.',
  '',
  '## Что могут спросить дополнительно',
  '- Ограничения worker (нет DOM, стоимость передачи данных).',
  '',
  '## Красные флажки',
  '- Воркер для fetch (сеть и так асинхронна).',
]);

topic('angular-arch', 'testing-angular', 'Тестирование Angular-приложений', [
  TIP,
  '',
  '## Как отвечать (скелет)',
  '- Пирамида: unit (сервисы/утилиты/компоненты изолированно) → интеграционные (TestBed + реальные зависимости) → e2e (Playwright/Cypress по用户-сценариям).',
  '- TestBed: configureTestingModule (providers/imports), DI-моки через provide-токены, `fixture.detectChanges()`, autoDetectChanges.',
  '- Сигналы в тестах: `runInInjectionContext`, проверка computed/effect напрямую (effect синхронный с flushEffects).',
  '- HttpTestingController / мок-интерсепторы для HTTP.',
  '- Документация поведения: ждёшь stable, ждё текст (Playwright `getByText`).',
  '',
  '## Что могут спросить дополнительно',
  '- Что тестируете в первую очередь в компоненте? (логику и контракты input/output, не вёрстку)',
  '',
  '## Красные флажки',
  '- Снапшоты всего подряд; тесты, проверяющие implementation-детали.',
]);

/* ───────────────── practice ───────────────── */

topic('practice', 'case-jwt-refresh-queue', 'Кейс: обновление JWT с очередью 401-запросов', [
  TIP,
  '',
  '## Суть кейса',
  '- Интерсептор ловит 401 → ставит запрос в буфер → один refresh → повтор всех буферизованных.',
  '',
  '## План ответа (скелет)',
  '- Функциональный интерсептор: catchError по 401 (кроме самого refresh).',
  '- Общий «refresh-поток»: BehaviorSubject<токен> или share-выполняемый запрос: первый 401 запускает refresh, остальные подписываются на результат (очередь!).',
  '- По свежему токену — retry буфера (concatMap по очереди или параллельно).',
  '- Refresh тоже упал → logout + редирект на логин.',
  '- Гонки: блокировать новые запросы во время refresh (самолет-режим Semaphore-на-промисе).',
  '',
  '## Что спросят дополнительно',
  '- Почему нельзя просто рефрешить на каждый 401 (параллельные запросы → инвалидация refresh-токена).',
  '- Где хранить токены (см. Безопасность).',
]);

topic('practice', 'case-table-50k', 'Кейс: таблица 50 000 строк без фризов', [
  TIP,
  '',
  '## План ответа (скелет)',
  '- Рендер: виртуализация (CDK Virtual Scroll / таблицы на виртуальных списках) — в DOM только видимое окно строк.',
  '- Данные: серверная пагинация/фильтрация/сортировка (не тащить 50k), при офлайн-данных — сортировка в воркере.',
  '- Изменения: track по стабильному id, иммутабельные обновления (OnPush/сигналы), редактирование ячейки — точечное обновление записи, не пересортировка всего.',
  '- Поиск/фильтр: debounce; тяжёлый подсчёт агрегатов — memo-селекторы/computed.',
  '- Замеры: профилировщик до/после — «было/стало» всегда уточнят.',
  '',
  '## Что спросят дополнительно',
  '- Как сделать редактируемую ячейку в виртуальной таблице (состояние по id, а не по индексу).',
]);

topic('practice', 'case-dynamic-form-schema', 'Кейс: динамическая форма из JSON-схемы с бэкенда', [
  TIP,
  '',
  '## План ответа (скелет)',
  '- Схема: типы полей, валидаторы (имена/параметры), зависимости видимости (visibleIf), дефолты.',
  '- Рендер: реестр компонентов-полей (тип → компонент CVA); FormBuilder/FormRecord или reactive-строитель из схемы; сигнал-версия — signals + custom form API.',
  '- Валидация: маппинг имён (required/min/pattern/async-занятость) в ValidatorFn; формулы зависимостей — computed.',
  '- Изменение схемы на лету: пересборка формы c сохранением значений (patchValue старых).',
  '- Генерация типов на фронте: JSON Schema → TS (заготовка типов через codegen).',
  '',
  '## Что спросят дополнительно',
  '- Как валидировать неизвестные схемы (whitelist типов полей, sandbox).',
]);

topic('practice', 'case-legacy-migration', 'Кейс: миграция легаси на современный стек', [
  TIP,
  '',
  '## План ответа (скелет)',
  '- Инвентаризация: версии, тесты/их отсутствие, самые рискованные модули.',
  '- Стратегия «страйд»: обновлять по минорным версиям с фиксами; automated migration (ng update) + ручные правки.',
  '- NgModule → standalone поэтапно (компонент за компонентом, гибрид работает).',
  '- Zone → zoneless: provideZonelessChangeDetection флагом, перевод состояния на signals, устранение «магии зоны» (runOutsideAngular-костыли).',
  '- Паранойя: e2e-покрытие критичных сценариев ДО миграции, фичефлаги/канарейки, метрики после.',
  '',
  '## Что спросят дополнительно',
  '- Как убедить бизнес выделить время (метрики инцидентов/скорости).',
]);

topic('practice', 'live-js-tasks-map', 'Лайвкодинг JS: где решать в стенде', [
  TIP,
  '',
  '## Соответствие классических лайвкодинг-задач и тем стенда',
  '- `debounce` / `throttle` с this и аргументами → блок JS, тема 02 (задачи 5–6).',
  '- Полифиллы `Promise.all` / `allSettled` → тема 09 (задача 2; allSettled — попробуй как вариацию).',
  '- Глубокое клонирование (Date, циклы) → тема 06 (задача 1; циклические ссылки — доработай через WeakMap).',
  '- «Что выведет» Event Loop → тема 08 (квизы 1–2).',
  '- Алгоритмы на массивах/хэш-таблицах (группировка анаграмм, пересечения, дерево) → тема 07 + отдельные разговоры на мок-интервью с ассистентом.',
  '',
  '## Что спросят дополнительно',
  '- Попроси ассистента: «устрои мок-лайвкодинг по теме 02» — он даст задачи и разберёт решение.',
]);

topic('practice', 'live-rxjs-search', 'Лайвкодинг RxJS: живой поиск с автокомплитом', [
  TIP,
  '',
  '## Классическая цепочка',
  '```text',
  'input events →',
  '  debounceTime(300)        // ждём конца печати',
  '  distinctUntilChanged()   // не гоняем тот же запрос',
  '  filter(len => len > 2)   // мусор не ищем',
  '  switchMap(term => http(term).pipe(',
  '    map(r => r.items),',
  '    catchError(() => of([]))   // ВНУТРИ — поток поиска не умирает',
  '  )) →',
  '  подписка через async pipe / toSignal',
  '```',
  '',
  '## Добивания',
  '- Индикатор загрузки: tap при старте/finally; лучше — отдельный сигнал-флаг.',
  '- Порядок ответов: почему не mergeMap (гонки, старый ответ придёт позже нового).',
  '- Отмена при уходе: async pipe/takeUntilDestroyed; пустой результат — «ничего не найдено».',
]);

topic('practice', 'live-code-review', 'Лайвкодинг: code review Angular-компонента', [
  TIP,
  '',
  '## Чек-лист поиска проблем (в порядке частоты)',
  '- Подписки без отписки; subscribe внутри subscribe (нужен switchMap/combineLatest).',
  '- Мутации входных данных (@Input мутируется, массив пушится — OnPush не увидит).',
  '- Тяжёлое в шаблоне (вызовы функций в байндингах при Default CD), нет track в @for.',
  '- Логика в компоненте вместо сервиса (SRP); компонент знает про HTTP-детали.',
  '- Забытые состояния загрузки/ошибки; перезагрузка при каждом таймере без shareReplay.',
  '- Типы: any, непроверенные данные с API (нет guard/schema).',
  '- Тесты: нет; снапшоты вместо поведения.',
  '',
  '## Формат ответа',
  '- «Критично / важно / желательно» + почему + как чинить. Не «всё плохо», а приоритизированно.',
]);

topic('practice', 'live-angular-cva-directive', 'Лайвкодинг Angular: CVA или структурная директива', [
  TIP,
  '',
  '## CVA — скелет (попросят написать)',
  '```ts',
  '@Directive({selector: "app-stars", providers: [{',
  '  provide: NG_VALUE_ACCESSOR,',
  '  useExisting: forwardRef(() => StarsDirective), multi: true,',
  '}]})',
  'export class StarsDirective implements ControlValueAccessor {',
  '  private onChange = (_: number) => {};',
  '  private onTouched = () => {};',
  '  writeValue(v: number) { /* от модели в вид */ }',
  '  registerOnChange(fn: any) { this.onChange = fn; }',
  '  registerOnTouched(fn: any) { this.onTouched = fn; }',
  '  setDisabledState(isDisabled: boolean) { /* … */ }',
  '}',
  '```',
  '',
  '## Структурная директива — скелет',
  '```ts',
  '@Directive({selector: "[appUnless]"})',
  'export class UnlessDirective {',
  '  constructor(private tpl: TemplateRef<any>, private vcr: ViewContainerRef) {}',
  '  @Input() set appUnless(cond: boolean) {',
  '    this.vcr.clear();',
  '    if (!cond) this.vcr.createEmbeddedView(this.tpl);',
  '  }',
  '}',
  '```',
]);

console.log('angular-блоки сгенерированы');
