/* layout: 'orbit' — карточки на орбите, 'path' — точки на извилистой дороге.
   Фото (настоящие, не ИИ) кладите в images/01.jpg … 10.jpg — они станут фоном слайда. */
const slides = [
  { addr:'A1',  fx:'=Excel()', title:'Что такое <em>Excel</em>', lead:'«Умная тетрадка в клеточку»: поменяли цифру — всё пересчиталось само.', hero:true, items:[
    'Таблицы — программа от Microsoft для работы с таблицами','Office — входит в пакет Microsoft Office','Данные — хранит, считает и показывает данные','С 1985 года — до сих пор самая популярная в своей области']},
  { addr:'B2',  fx:'=ГДЕ(использовать)', title:'Где используют <em>Excel</em>', lead:'От школьного журнала до отчётов для руководства.', items:[
    'Бухгалтерия — и финансы','Склад — учёт товаров','Бюджет — личный и семейный','Планы — расписания и списки','Аналитика — отчёты и выводы']},
  { addr:'B3',  fx:'=A1:A10', title:'Как устроена <em>таблица</em>', lead:'Адрес ячейки — как ряд и место в кинотеатре.', items:[
    'Ячейка — одна «клеточка» с адресом, например <code>B3</code>','Столбцы — буквы: A, B, C…','Строки — цифры: 1, 2, 3…','Книга — несколько листов в одном файле','Диапазон — группа ячеек, например <code>A1:A10</code>']},
  { addr:'C4',  fx:'Формат: Денежный', title:'Ввод данных и <em>оформление</em>', lead:'Формат ячейки решает, как Excel понимает ваши данные.', items:[
    'Данные — текст, числа, даты','Оформление — шрифт, заливка, границы','Формат — число, деньги, процент, дата','Ячейки — можно объединять и менять ширину столбцов']},
  { addr:'C5',  fx:'=A1+B1', title:'Формулы — главная <em>сила</em>', lead:'Формула ссылается на ячейки, поэтому результат всегда свежий.', items:[
    'Начало — формула всегда начинается со знака <code>=</code>','Пример — <code>=A1+B1</code>','Действия — + сложить, − вычесть, * умножить, / разделить','Ссылки — на ячейки, а не на числа','Пересчёт — изменил число, результат обновился сам']},
  { addr:'D6',  fx:'=СУММ(A1:A100)', title:'Функции: готовые <em>инструменты</em>', lead:'Сотни функций, но в жизни хватает пяти-шести.', layout:'path', items:[
    '<code>СУММ</code> — сумма','<code>СРЗНАЧ</code> — среднее','<code>МАКС</code> / <code>МИН</code> — рекорд и антирекорд','<code>СЧЁТ</code> — сколько чисел','<code>ЕСЛИ</code> — проверка условия','<code>ВПР</code> — поиск в таблице']},
  { addr:'D7',  fx:'Данные → Фильтр', title:'Сортировка, фильтры и <em>подсветка</em>', lead:'Когда данных много, порядок спасает.', items:[
    'Сортировка — от А до Я, от меньшего к большему','Фильтр — показать только нужное','Подсветка — цвет меняется по условию','Закрепление — заголовок всегда на виду']},
  { addr:'E8',  fx:'Вставка → Диаграмма', title:'Диаграммы и <em>графики</em>', lead:'Картинка понятна сразу, а диаграмма обновляется вместе с таблицей.', items:[
    'Столбчатая — сравнение между собой','Круговая — доли от целого','Линейная — изменения во времени','Быстро — создаётся в пару кликов']},
  { addr:'E9',  fx:'Вставка → Сводная таблица', title:'Сводные <em>таблицы</em>', lead:'5000 строк продаж превращаются в итоги за секунды.', items:[
    'Итоги — из большого объёма данных','Без ручного счёта — всё считает Excel','Группировка — по людям, датам, товарам','Мышкой — результат меняется перетаскиванием']},
  { addr:'F10', fx:'Ctrl + S', title:'Полезные приёмы и <em>итоги</em>', lead:'Excel экономит время и снижает количество ошибок.', layout:'path', items:[
    '<code>Ctrl+C</code> / <code>Ctrl+V</code> — копировать','<code>Ctrl+Z</code> — отменить','<code>Ctrl+S</code> — сохранить','Автозаполнение — потяните за уголок','Шаблоны — бюджеты и календари','Итог — меньше времени и ошибок']},
];

const $ = id => document.getElementById(id);
const pad = n => String(n + 1).padStart(2, '0');
let cur = 0;

const wrapWords = html => { let k = 0;
  return html.replace(/(<em>.*?<\/em>)|([^\s<]+)/g, m => `<span class="w"><i style="--k:${k++}">${m}</i></span> `); };

function orbit(items) {
  const cards = items.map((t, i) => {
    const [a, ...b] = t.split(' — '); const n = items.length;
    const y = i % 2 ? 40 : -10, r = ((i - (n - 1) / 2) * 2.2).toFixed(1);
    return `<div class="card ${b.length ? '' : 'solo'}" style="--i:${i};--y:${y}px;--r:${r}deg"><h3>${a}</h3>${b.length ? `<p>${b.join(' — ')}</p>` : ''}</div>`;
  }).join('');
  const ring = 'M20 200a480 170 0 1 0 960 0a480 170 0 1 0 -960 0';
  return `<div class="orbit"><svg viewBox="0 0 1000 400" preserveAspectRatio="none">
    <path class="ring" pathLength="1" d="${ring}"/>
    <circle class="node" r="7"><animateMotion dur="14s" repeatCount="indefinite" path="${ring}" transform="translate(0 0)"/></circle>
    <circle class="node" r="5"><animateMotion dur="14s" begin="-7s" repeatCount="indefinite" path="${ring}"/></circle></svg>
    <div class="cards">${cards}</div></div>`;
}

function road(items) {
  const d = 'M40 230C160 20 300 20 380 150S560 290 650 170S850 30 960 120';
  const n = items.length;
  return `<div class="path"><svg viewBox="0 0 1000 300" preserveAspectRatio="none">
    <path class="road" d="${d}"/><path class="dash" d="${d}"/></svg>
    <span id="pts" data-d="${d}" data-n="${n}"></span>
    ${items.map((t, i) => `<i class="stop" style="--i:${i}"></i><span class="lab" style="--i:${i};--dy:${i % 2 ? '45px' : '-150%'}">${t}</span>`).join('')}</div>`;
}

function placeStops() {                       // расставляем точки по длине пути
  const m = $('pts'); if (!m) return;
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', m.dataset.d);
  const n = +m.dataset.n, L = p.getTotalLength();
  document.querySelectorAll('.stop').forEach((s, i) => {
    const pt = p.getPointAtLength(L * i / (n - 1));
    const x = pt.x / 10 + '%', y = pt.y / 3 + '%';
    s.style.left = x; s.style.top = y;
    const l = s.nextElementSibling; l.style.left = x; l.style.top = y;
  });
}

function render() {
  const s = slides[cur];
  $('count').textContent = `${cur + 1} / ${slides.length}`;
  $('panel').querySelector('.pbg')?.remove();
  const img = new Image(); img.className = 'pbg'; img.alt = '';
  img.onload = () => $('panel').prepend(img); img.src = `images/${pad(cur)}.jpg`;

  $('slide').innerHTML = `${s.hero ? '<div class="glassx">X</div>' : ''}
    <div class="head"><div><div class="tagline">${s.addr} · ${s.fx}</div><h1>${wrapWords(s.title)}</h1></div>
    <p class="lead">${s.lead}</p></div>
    ${s.layout === 'path' ? road(s.items) : orbit(s.items)}`;
  placeStops();
  history.replaceState(null, '', '#' + (cur + 1));
}

const go = n => { cur = (n + slides.length) % slides.length; render(); };
$('next').onclick = () => go(cur + 1);
$('prev').onclick = () => go(cur - 1);
addEventListener('keydown', e => {
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) go(cur - 1);
  if (e.key === 'f') document.documentElement.requestFullscreen?.();
});
let x0; addEventListener('touchstart', e => x0 = e.touches[0].clientX);
addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 50) go(cur + (d < 0 ? 1 : -1)); });

cur = Math.min(slides.length - 1, Math.max(0, (parseInt(location.hash.slice(1)) || 1) - 1));
render();