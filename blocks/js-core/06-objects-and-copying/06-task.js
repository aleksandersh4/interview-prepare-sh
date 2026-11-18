section('Задача 5. parseQuery — разбор адресной строки');

function parseQuery(search) {
  // ▼▼▼ ПИШИ СВОЙ КОД ЗДЕСЬ ▼▼▼
}


check('базовый разбор', parseQuery('?page=2&sort=name'), { page: '2', sort: 'name' });
check('работает и без вопросительного знака', parseQuery('a=1&b=2'), { a: '1', b: '2' });
check('пустая строка → пустой объект', parseQuery(''), {});
check('повтор ключа → массив значений', parseQuery('?tag=js&tag=interview'), { tag: ['js', 'interview'] });
check('русские символы декодируются', parseQuery('?q=%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0'), { q: 'собака' });
check('плюс — тоже пробел (как в формах)', parseQuery('?text=hello+world'), { text: 'hello world' });
