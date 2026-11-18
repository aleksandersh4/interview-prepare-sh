# Валидаторы и ControlValueAccessor

> Теоретическая тема. Попроси ассистента: «проверь меня: <тема>» — он устроит устный опрос по вопросам ниже.

## Как отвечать (скелет)
- Синхронные валидаторы возвращают ошибки (`{required: true}`) или null; асинхронные — Observable/Promise (классика — проверка «логин уже занят»); compose.
- Кастомный валидатор — чистая функция (ValidatorFn); асинхронный в паре с debounce в UI.
- CVA — мост «кастомный контрол ↔ forms API»: реализовать writeValue, registerOnChange, registerOnTouched, (setDisabledState); `provide NG_VALUE_ACCESSOR`.
- Сюда же: touched/dirty/pristine, ошибки показываем после touched или submit.

## Что могут спросить дополнительно
- Написать CVA-скелет наизусть — популярный лайвкодинг.
- Как пробросить валидацию внутрь CVA (прокси-контрол).

## Красные флажки
- Не знаешь про registerOnTouched (клик-вне = touched).
