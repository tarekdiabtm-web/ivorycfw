
// ===============================
// Open Source Config Loader
// كل النصوص والروابط الأساسية تأتي من assets/data/site-config.js
// ===============================
function applySiteConfig(){
  if (typeof SITE_CONFIG === 'undefined') return;
  const cfg = SITE_CONFIG;
  document.title = `${cfg.serverName} ${cfg.serverSubName} | Premium FiveM City`;
  document.querySelectorAll('img[src="assets/ivory-logo.png"]').forEach(img => img.src = cfg.logo);
  document.querySelectorAll('.brand b').forEach(el => el.textContent = cfg.serverName);
  document.querySelectorAll('.brand small').forEach(el => {
    if (!document.body.classList.contains('store-page') && !document.body.classList.contains('rules-page')) el.textContent = cfg.serverSubName;
  });
  document.querySelectorAll('.discord-link, a[href="https://discord.gg/ivory"]').forEach(a => a.href = cfg.discordUrl);
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle && cfg.hero){ heroTitle.textContent = cfg.hero.title; heroTitle.dataset.text = cfg.hero.title; }
  const heroSub = document.querySelector('.hero h2'); if (heroSub && cfg.hero) heroSub.textContent = cfg.hero.subtitle;
  const heroDesc = document.querySelector('.hero-content p'); if (heroDesc && cfg.hero) heroDesc.textContent = cfg.hero.description;
  const badge = document.querySelector('.hero .status-pill'); if (badge && cfg.hero) badge.innerHTML = `<span></span> ${cfg.hero.badge}`;
  const actionBtns = document.querySelectorAll('.hero .actions .btn');
  if (actionBtns[0] && cfg.hero) actionBtns[0].textContent = cfg.hero.primaryButton;
  if (actionBtns[1] && cfg.hero) actionBtns[1].textContent = cfg.hero.secondaryButton;
  document.querySelectorAll('[data-count]').forEach((el, i) => { if(cfg.stats?.[i]) el.dataset.count = cfg.stats[i].value; });
  document.querySelectorAll('.quick-stats small').forEach((el, i) => { if(cfg.stats?.[i]) el.textContent = cfg.stats[i].label; });
  const discordSection = document.querySelector('.discord-section');
  if (discordSection) {
    const h = discordSection.querySelector('h2'); if(h) h.textContent = `انضم إلى مجتمع ${cfg.serverName}`;
  }
  document.querySelectorAll('footer span:first-child').forEach(el => el.textContent = `© ${cfg.copyrightYear} ${cfg.serverName} ${cfg.serverSubName}`);
}
applySiteConfig();

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

window.addEventListener('load', () => {
  setTimeout(() => $('#preloader')?.classList.add('hide'), 650);
});

const dot = $('.cursor-dot');
const ring = $('.cursor-ring');
let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  document.documentElement.style.setProperty('--x', `${mx}px`);
  document.documentElement.style.setProperty('--y', `${my}px`);
  if (dot) { dot.style.left = `${mx}px`; dot.style.top = `${my}px`; }
});
function cursorLoop(){
  rx += (mx - rx) * .18; ry += (my - ry) * .18;
  if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; }
  requestAnimationFrame(cursorLoop);
} cursorLoop();
$$('a,button,.job,.tilt,input,select,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring?.classList.add('big'));
  el.addEventListener('mouseleave',()=>ring?.classList.remove('big'));
});

const nav = $('#navlinks');
$('#hamburger')?.addEventListener('click', () => nav.classList.toggle('open'));
$$('nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = `${(scrollY / max) * 100}%`;
  $('#navbar').classList.toggle('scrolled', scrollY > 40);
});

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: .14 });
$$('.reveal').forEach(el => reveal.observe(el));

const sections = $$('section[id]');
const links = $$('nav a');
addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(sec => { if(scrollY >= sec.offsetTop - 160) current = sec.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
});

const counted = new WeakSet();
const countObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting || counted.has(entry.target)) return;
    counted.add(entry.target);
    const target = +entry.target.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.round(target / 70));
    const timer = setInterval(() => {
      n += step;
      if(n >= target){ n = target; clearInterval(timer); }
      entry.target.textContent = n;
    }, 18);
  });
}, { threshold: .6 });
$$('[data-count]').forEach(el => countObs.observe(el));

$$('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const px = (x / r.width - .5) * 10;
    const py = (y / r.height - .5) * -10;
    card.style.transform = `perspective(900px) rotateY(${px}deg) rotateX(${py}deg) translateY(-6px)`;
    card.style.setProperty('--mx', `${x}px`); card.style.setProperty('--my', `${y}px`);
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

$$('.feature-card,.product,.rules-wrap').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX-r.left}px`);
    el.style.setProperty('--my', `${e.clientY-r.top}px`);
  });
});

$$('.magnet').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.14}px, ${(e.clientY-r.top-r.height/2)*.14}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});

$('#applyForm')?.addEventListener('submit', e => {
  e.preventDefault();
  $('#formMsg').textContent = 'تم تجهيز التقديم بنجاح — اربط الفورم بـ Discord Webhook للإرسال الحقيقي.';
  e.currentTarget.reset();
});

const canvas = $('#fx'), ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; particles = Array.from({length: Math.min(95, Math.floor(innerWidth/16))}, () => ({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45,r:Math.random()*1.8+.5})); }
resize(); addEventListener('resize', resize);
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'rgba(202,255,55,.8)';
  particles.forEach((p,i)=>{
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>canvas.width) p.vx*=-1;
    if(p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.globalAlpha = .35; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.hypot(dx,dy);
      if(d<115){ctx.globalAlpha=(1-d/115)*.13;ctx.strokeStyle='rgba(202,255,55,1)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
    }
  });
  requestAnimationFrame(draw);
} draw();


// Rules panel tabs
$$('.rule-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    $$('.rule-tab').forEach(t => t.classList.remove('active'));
    $$('.rule-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    $('#' + id)?.classList.add('active');
  });
});

// Smooth panel navigation with Ivory logo loading
$$('a.panel-link, a[href="rules.html"], a[href="store.html"], a[href^="store.html#"], a[href^="index.html"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if(!href || href.startsWith('#') || link.target === '_blank') return;
    const overlay = $('#pageTransition');
    if(!overlay) return;
    e.preventDefault();
    overlay.classList.add('show');
    setTimeout(() => { window.location.href = href; }, 720);
  });
});

// Store rendering from products.js
function renderStore(){
  if (typeof STORE_PRODUCTS === 'undefined') return;
  $$('.premium-products').forEach(grid => {
    const cat = grid.dataset.category;
    grid.innerHTML = STORE_PRODUCTS.filter(p => p.category === cat).map(p => `
      <article class="premium-card tilt" data-product-category="${p.category}">
        <div class="premium-img"><img src="${p.image}" alt="${p.name}"></div>
        <div class="premium-body">
          <span class="premium-badge">${cat === 'cars' ? 'عربية' : cat === 'workshops' ? 'ورشة' : 'مطعم'}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="premium-price"><b>${p.price}</b><a href="${(typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.discordUrl : 'https://discord.gg/ivory')}" target="_blank" rel="noopener">اطلب الآن</a></div>
        </div>
      </article>`).join('');
  });
  $$('.premium-card').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX-r.left}px`);
      el.style.setProperty('--my', `${e.clientY-r.top}px`);
    });
    el.addEventListener('mouseenter',()=>ring?.classList.add('big'));
    el.addEventListener('mouseleave',()=>ring?.classList.remove('big'));
  });
}
renderStore();

$$('.store-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    $$('.store-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    $$('.store-category').forEach(sec => {
      const category = sec.querySelector('.premium-products')?.dataset.category;
      sec.classList.toggle('hidden-product', filter !== 'all' && category !== filter);
    });
  });
});

// ===============================
// V5 Ultimate Open Source Renderers
// ===============================
function discordIdFrom(member){
  const raw = String(member.discordId || member.discordUrl || member.discord || '').trim();
  const match = raw.match(/(\d{17,22})/);
  return match ? match[1] : '';
}
function discordAvatarUrl(user){
  if(!user || !user.id || !user.avatar) return '';
  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
}
async function fetchDiscordProfile(member){
  const id = discordIdFrom(member);
  if(!id || /^0+$/.test(id)) return null;
  try{
    const res = await fetch(`https://api.lanyard.rest/v1/users/${id}`, {cache:'no-store'});
    if(!res.ok) return null;
    const json = await res.json();
    if(!json.success || !json.data || !json.data.discord_user) return null;
    const u = json.data.discord_user;
    return {
      name: u.global_name || u.display_name || u.username || member.fallbackName || member.name || 'Discord User',
      username: u.username ? `@${u.username}` : '',
      image: discordAvatarUrl(u) || member.fallbackImage || member.image || 'assets/staff/owner.svg'
    };
  }catch(e){ return null; }
}
function staffCardTemplate(m, profile){
  const name = profile?.name || m.fallbackName || m.name || 'Staff Member';
  const user = profile?.username || m.discordTag || m.discord || 'Discord profile';
  const image = profile?.image || m.fallbackImage || m.image || 'assets/staff/owner.svg';
  const href = m.discordUrl || (discordIdFrom(m) ? `https://discord.com/users/${discordIdFrom(m)}` : '#');
  return `
    <article class="staff-card staff-row reveal tilt">
      <a class="staff-img" href="${href}" target="_blank" rel="noopener"><img src="${image}" alt="${name}" loading="lazy"></a>
      <div class="staff-body">
        <span class="staff-role">${m.role}</span>
        <h3>${name}</h3>
        <p>${user}</p>
      </div>
      <a class="staff-discord magnet" href="${href}" target="_blank" rel="noopener">Discord</a>
    </article>`;
}
async function renderStaff(){
  const grid = document.getElementById('staffGrid');
  if(!grid || typeof STAFF_DATA === 'undefined') return;
  grid.classList.add('staff-list');
  grid.innerHTML = STAFF_DATA.map(m => staffCardTemplate(m, null)).join('');
  const profiles = await Promise.all(STAFF_DATA.map(fetchDiscordProfile));
  grid.innerHTML = STAFF_DATA.map((m,i) => staffCardTemplate(m, profiles[i])).join('');
  if (typeof reveal !== 'undefined') grid.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  initHoverFx(grid.querySelectorAll('.staff-card'));
}
function renderCreators(){
  const grid = document.getElementById('creatorsGrid');
  if(!grid || typeof CREATORS_DATA === 'undefined') return;
  grid.innerHTML = CREATORS_DATA.map(c => `
    <article class="creator-card reveal tilt">
      <div class="creator-img"><img src="${c.image}" alt="${c.name}"></div>
      <div class="creator-body">
        <span class="creator-type">${c.type}</span>
        <h3>${c.name}</h3>
        <p>${c.followers} متابع</p>
        <a class="mini-btn magnet" href="${c.url}" target="_blank" rel="noopener">زيارة القناة</a>
      </div>
    </article>`).join('');
}
function initHoverFx(nodes){
  nodes.forEach(el => {
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX-r.left}px`); el.style.setProperty('--my', `${e.clientY-r.top}px`); });
    el.addEventListener('mouseenter',()=>ring?.classList.add('big')); el.addEventListener('mouseleave',()=>ring?.classList.remove('big'));
  });
}
renderStaff(); renderCreators();
// فعّل الأنيميشن والكروت الجديدة بعد الرندر
if (typeof reveal !== 'undefined') document.querySelectorAll('.creators-grid .reveal').forEach(el => reveal.observe(el));
initHoverFx(document.querySelectorAll('.creator-card'));

// Apply through Discord only
const applyBtn = document.querySelector('.hero .actions .btn-primary');
if(applyBtn && typeof SITE_CONFIG !== 'undefined'){
  applyBtn.setAttribute('href', SITE_CONFIG.discordUrl);
  applyBtn.setAttribute('target','_blank');
  applyBtn.setAttribute('rel','noopener');
}
document.querySelectorAll('.discord-link').forEach(a=>{ if(typeof SITE_CONFIG !== 'undefined') a.href = SITE_CONFIG.discordUrl; });

// Optional FiveM status placeholder. Add your API in SITE_CONFIG.cfxServerCode later.
async function loadServerStatus(){
  if(typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.cfxServerCode || SITE_CONFIG.cfxServerCode === 'replace-with-cfx-code') return;
  // ضع هنا API السيرفر الرسمي أو proxy الخاص بك عند النشر.
}
loadServerStatus();


// V16: Premium 3D movement for the organized hero only
(function(){
  const frame = document.querySelector('.tilt-hero');
  if(!frame) return;
  frame.addEventListener('mousemove', (e)=>{
    const r = frame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    frame.style.transform = `perspective(1400px) rotateY(${x*5}deg) rotateX(${-y*4}deg)`;
  });
  frame.addEventListener('mouseleave', ()=>{ frame.style.transform = 'perspective(1400px) rotateY(0deg) rotateX(0deg)'; });
})();
