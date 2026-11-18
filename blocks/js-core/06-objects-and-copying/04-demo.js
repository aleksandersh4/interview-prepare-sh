section('Демо: ссылки и spread');
const shared = { n: 1 };
const alias = shared;
alias.n = 2;
log('после изменения alias: shared.n =', shared.n, '(2 — это один объект)');

const copy = { ...shared };
copy.n = 3;
log('после изменения поверхностной копии: shared.n =', shared.n, '(2 — верхний уровень новый)');

const nested = { inner: { k: 1 } };
const shallowNested = { ...nested };
shallowNested.inner.k = 42;
log('после изменения вложенного в копии: nested.inner.k =', nested.inner.k, '(42 — вложенный объект всё ещё общий!)');

log('0 || "дефолт" =', 0 || 'дефолт');
log('0 ?? "дефолт" =', 0 ?? 'дефолт');
log('"" || "дефолт" =', '' || 'дефолт');
log('user?.address?.street при отсутствии =', ({ user: {} }).user?.address?.street);
