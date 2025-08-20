/* ========== Utility ========== */
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

/* ========== Year in footer ========== */
(() => { const y = new Date().getFullYear(); const el = $('#year'); if (el) el.textContent = y; })();

/* ========== Mobile nav toggle ========== */
(() => {
  const btn = $('#navToggle');
  const menu = $('#primary-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });
})();

/* ========== Hero slider (simple, no deps) ========== */
(() => {
  const slides = $$('.hero-slide');
  const prev = $('.hero-nav.prev');
  const next = $('.hero-nav.next');
  if(slides.length < 2) return;
  let i = 0, timer;

  function show(idx){
    slides[i].classList.remove('current');
    i = (idx + slides.length) % slides.length;
    slides[i].classList.add('current');
  }
  function start(){ timer = setInterval(() => show(i+1), 6000); }
  function stop(){ clearInterval(timer); }

  prev.addEventListener('click', () => { stop(); show(i-1); start(); });
  next.addEventListener('click', () => { stop(); show(i+1); start(); });

  start();
})();

/* ========== Reviews carousel (dots) ========== */
(() => {
  const quotes = $$('.rev');
  const dots = $$('.dot');
  if(!quotes.length || !dots.length) return;
  let idx = 0, timer;

  function show(n){
    quotes[idx].classList.remove('current');
    dots[idx].classList.remove('active');
    idx = (n + quotes.length) % quotes.length;
    quotes[idx].classList.add('current');
    dots[idx].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(timer); show(i); auto(); }));

  function auto(){ timer = setInterval(()=>show(idx+1), 7000); }
  auto();
})();

/* ========== Open/Closed badge (America/Detroit) ========== */
(() => {
  const badge = $('#openBadge');
  if(!badge) return;

  // Hours define local open windows in 24h.
  const hours = {
    1: {open:11, close:22}, // Mon
    2: {open:11, close:22}, // Tue
    3: {open:11, close:22}, // Wed
    4: {open:11, close:22}, // Thu
    5: {open:11, close:23}, // Fri
    6: {open:11, close:23}, // Sat
    0: {open:11, close:21}  // Sun
  };

  const now = new Date(); // user local
  const day = now.getDay();
  const h = now.getHours() + now.getMinutes()/60;

  const todays = hours[day];
  if(!todays){ badge.textContent = 'Hours unavailable'; return; }

  const isOpen = h >= todays.open && h < todays.close;
  badge.textContent = isOpen ? 'Open now' : 'Closed';
  badge.className = 'badge ' + (isOpen ? 'open' : 'closed');
})();

/* ========== “Today’s Special” (weekday-based demo) ========== */
(() => {
  const t = $('#dailySpecialTitle');
  const d = $('#dailySpecialDesc');
  const flag = $('#todayFlag');
  if(!t || !d || !flag) return;

  const specials = [
    {title:'Truffle Honey Margherita', desc:'Fresh mozzarella, basil, truffle honey drizzle, sea salt.'},
    {title:'Hot Honey Pepperoni', desc:'Cup‑and‑char pepperoni, ricotta, chili honey.'},
    {title:'Fig & Prosciutto', desc:'Black mission figs, arugula, balsamic glaze.'},
    {title:'Wild Mushroom', desc:'Cremini, oyster, fontina, thyme.'},
    {title:'Sausage & Peppers', desc:'Fennel sausage, roasted peppers, onions.'},
    {title:'Four Cheese', desc:'Mozzarella, fontina, pecorino, gorgonzola.'},
    {title:'Marinara (Vegan)', desc:'Garlic, oregano, olive oil, crushed tomato.'}
  ];
  const today = new Date().getDay(); // 0-6
  const pick = specials[today] || specials[0];
  t.textContent = pick.title;
  d.textContent = pick.desc;
  flag.textContent = 'Today’s Special';
})();