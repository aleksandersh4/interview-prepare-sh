section('Задача 4. getPath — безопасное чтение');

function getPath(obj, path, fallback) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


const user = { a: { b: { c: 42 } }, x: null };
check('вложенное значение по пути', getPath(user, 'a.b.c'), 42);
check('нет ключа по пути — fallback', getPath(user, 'a.b.z', 'нет'), 'нет');
check('null по пути — fallback', getPath(user, 'x.y', 'пусто'), 'пусто');
check('fallback по умолчанию undefined', getPath(user, 'nope.deep'), undefined);
check('пустой путь — сам объект', getPath(user, ''), user);
