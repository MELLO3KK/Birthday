const $ = (id) => document.getElementById(id);

/* ---------- Yangon countdown ---------- */
const units = { days: $('days'), hours: $('hours'), minutes: $('minutes'), seconds: $('seconds') };
function yangonParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Yangon', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, +p.value]));
}
function birthdayCountdown() {
  const now = new Date();
  const y = yangonParts(now);
  // Yangon is UTC+06:30, so this constructs the target at local midnight in Yangon.
  let target = Date.UTC(y.year, 7, 28, 17, 30, 0);
  const currentYangon = Date.UTC(y.year, y.month - 1, y.day, y.hour, y.minute, y.second);
  if (currentYangon > target + 86400000) target = Date.UTC(y.year + 1, 7, 28, 17, 30, 0);
  const remaining = Math.max(0, target - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);
  const values = { days: Math.floor(totalSeconds / 86400), hours: Math.floor(totalSeconds % 86400 / 3600), minutes: Math.floor(totalSeconds % 3600 / 60), seconds: totalSeconds % 60 };
  Object.entries(values).forEach(([key, value]) => {
    const el = units[key], text = String(value).padStart(2, '0');
    if (el.textContent !== text) { el.textContent = text; el.classList.add('tick'); setTimeout(() => el.classList.remove('tick'), 200); }
  });
  if (!remaining) $('countdown-note').textContent = 'Today is all about you. Happy Birthday!';
}
function updateYangonClock() {
  const time = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yangon', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  $('yangon-time').textContent = `Yangon · ${time}`;
}
birthdayCountdown(); updateYangonClock(); setInterval(() => { birthdayCountdown(); updateYangonClock(); }, 1000);

/* ---------- media: photos + videos ---------- */
const photos = [
  { f: 'e5da14458d95b7c88cd12911ecfd96b23cd999562b22cb678960436f88d76fc1_dcd59730bb08913.jpg', t: 'Once upon a <em>time…</em>', s: 'the world quietly received its most precious gift — you.' },
  { f: '8eee4b9f4dba2a1014d07055b75a72df1b1ea32d988acd86aa3bb5e3c83cda60_b048a70f19ab0762.jpg', t: 'That <em>smile.</em>', s: 'still my favorite view in the entire world.' },
  { f: '80e500b0e427516fe542e401a040cf007181f4ac304becbf1bc155c13fcd96a1_a92946e9c8d856f1.jpg', t: 'One of a <em>kind.</em>', s: 'there is no one else even a little bit like you.' },
  { f: '945410e210e57efc7a454302bf51384d897f7cb08a856b071e942039d488ae87_320018758acbc87e.webp', t: 'My little <em>muse.</em>', s: 'every picture of you is my favorite picture.' },
  { f: '1299b4984ff3730db947a8d109e2cdc7132ee9ed1870ac55da55b8523bfa3d55_b3c9f38342c3cc77.jpg', t: 'My <em>calm.</em>', s: 'every chaos in my day goes quiet around you.' },
  { f: '3920b928ab2beeb7f801f4e01e2af97de3d0454894bb062e246fac1904ac042e_6fae59f9b48a058f.jpg', t: 'My <em>sunshine.</em>', s: 'you make ordinary days feel like celebrations.' },
  { f: '65b4fe489714102ff53766ab7556c97bdf91146db92af951cbe9ad1adda9181e_55985eedc02ed2ed.jpg', t: 'My <em>laughter.</em>', s: 'the best part of my day is hearing you laugh.' },
  { f: '66ccc8771019a8149bc83ffba4e5e12c34cabd203c0b16520e15bb3e15bcea75_9985deacd73478f0.jpg', t: 'My <em>heart.</em>', s: 'it has been yours since the very beginning.' },
  { f: '9d26ee4910525534f5c1e4d082898a65da458e6db741d33081ee01913366cc46_3836fc2b90e5f69b.jpg', t: 'My <em>home.</em>', s: 'wherever you are is where I want to be.' },
  { f: 'dfd0cadeb9bf98063f3a7ab15f4a7ea322aaf4ead4b347d99c1a87dce0118b40_73e0bf609f44ae76.jpg', t: 'Pure <em>magic.</em>', s: "you don't even try — and still, always." },
  { f: 'b349341dad7e127e34718e2f62ef79b10f3ce6aa7cf6241cb2f58753bd688041_47c60c32f7577a9d.jpg', t: 'My safe <em>place.</em>', s: 'with you, everything somehow feels okay.' },
  { f: 'b3edb2f34a6cca649c78d11f4de0c52d95a3e3637bfe8a7ab8af177d5792e63e_d0389fed9b02bcc0.jpg', t: 'My favorite <em>hello.</em>', s: 'and my hardest goodbye, every single time.' },
  { f: 'baed953f676d89aeb841164bc980ac9c5bc177dd8e310595b04a40ca8abaca33_d605967a611ea085.jpg', t: 'My <em>always.</em>', s: 'every year with you is my favorite year.' },
  { f: 'd2986bd30efa8a2e53064a666ef80cc5567d23adb14acf7652733a168e1ee282_81b5375913b9fb05.jpg', t: 'My little <em>star.</em>', s: 'you glow even on the darkest days.' },
  { f: 'db28ab79f7b0729868e9cc6e4f03c5a8aac0fdd422bb3676e356f4805ab582cb_cc65d5e83498cc39.jpg', t: 'My whole <em>sky.</em>', s: 'and every single one of the stars in it.' },
  { f: 'eb10de6d876c32dca7cd9b6e242a4e4cd7908baff9830b78545e2e93c3355722_615d37047c0b59b1.jpg', t: 'My <em>forever.</em>', s: 'growing older with you sounds like a dream.' },
  { f: 'f0bdd70f9d6f5efe6f2ed19dd94b4d9a4842f1aa8f8669c78b48d05a9b90b015_7feec6e6ab9e9ebe.jpg', t: 'And <em>today…</em>', s: 'we celebrate you. one more scroll, my love ♡' }
];
const videos = [
  { f: '7995397acc37cf3f218be2da4530dfbedc268b127a05a0e80ed5ae206c5e2298_161d3e205a323f7e.mp4', t: 'That <em>laugh.</em>', s: 'the soundtrack of my whole life.' },
  { f: 'a4b8dca6ac2e36fab93cd94e57a33d89f38e32f383a240f26acc50805743aa96_9d1fc08de4233b7a.mp4', t: 'Caught being <em>cute.</em>', s: 'as usual. as always.' },
  { f: 'c7a9942938a5445200aa2c944c0f0a315e41a9d65db103d36b539973abf524a2_6acdba89ba17b51a.mp4', t: 'My favorite <em>view.</em>', s: 'moving, glowing, unforgettable.' },
  { f: 'ca2f87514b65dfa61f387b9b81315650bd768306b4b934a78b46a209d8547528_c0871c935aee7d99.mp4', t: 'Life with <em>you.</em>', s: 'every second is a scene I would rewatch.' },
  { f: 'd0cdd6488495670be813c700e51bcd22af7cc20911d5b12dadeebf1714452571_63e5852920c80d80.mp4', t: 'Pure <em>joy.</em>', s: 'this is what happiness looks like.' },
  { f: 'e0772fc93284431083250c216a0c6ff07af1755c8deaefd3f0092a1f002f500a_ecca6a8ace2f1d07.mp4', t: 'My <em>star.</em>', s: 'shining in every single frame.' },
  { f: 'fae1427aef653acd8909f5a4656aaad02fb65fe467ed5b37dc422231b407c2c3_7ddce4e9b40f4759.mp4', t: 'Forever <em>us.</em>', s: 'press play on our forever.' }
];

/* ---------- build the story: photo chapters with video reels woven in ---------- */
const story = [];
let vi = 0, chapter = 0;
photos.forEach((p, i) => {
  chapter++;
  story.push({ type: 'photo', f: p.f, t: p.t, s: p.s, n: chapter });
  if ((i + 1) % 3 === 0 && vi < videos.length) { vi++; story.push({ type: 'video', f: videos[vi - 1].f, t: videos[vi - 1].t, s: videos[vi - 1].s, n: vi }); }
});
while (vi < videos.length) { vi++; story.push({ type: 'video', f: videos[vi - 1].f, t: videos[vi - 1].t, s: videos[vi - 1].s, n: vi }); }

const storyAnchor = $('story-anchor');
story.forEach((m, i) => {
  const sec = document.createElement('section');
  sec.className = 'panel ' + (m.type === 'video' ? 'panel-video' : 'panel-photo') + (i % 2 ? ' alt' : '');
  sec.dataset.label = m.type === 'video' ? `Reel ${String(m.n).padStart(2, '0')}` : `Chapter ${String(m.n).padStart(2, '0')}`;
  const chip = m.type === 'video' ? `reel ${String(m.n).padStart(2, '0')} · us in motion` : `chapter ${String(m.n).padStart(2, '0')} · our story`;
  const media = m.type === 'video'
    ? `<img class="video-poster" src="Images/0-02-06-${photos[Math.min(m.n * 2, photos.length - 1)].f}" alt=""><video class="video-bg" src="Images/0-02-06-${m.f}" poster="Images/0-02-06-${photos[Math.min(m.n * 2, photos.length - 1)].f}" muted loop playsinline autoplay preload="auto"></video><div class="v-badge">▶</div><button class="v-sound" type="button" aria-label="Toggle sound">🔇</button>`
    : `<img class="photo-bg" src="Images/0-02-06-${m.f}" alt="A beautiful photo of the birthday girl" loading="eager" decoding="async">`;
  sec.innerHTML = `
    ${media}
    <div class="media-fallback" role="status">This memory could not load.</div>
    <div class="photo-shade"></div>
    <div class="photo-num">${String(i + 1).padStart(2, '0')}</div>
    <div class="photo-card">
      <span class="photo-chip a a-up">${chip}</span>
      <h3 class="a ${i % 2 ? 'a-right' : 'a-left'}" style="--d:.25s">${m.t}</h3>
      <p class="a a-up" style="--d:.55s">${m.s}</p>
    </div>`;
  storyAnchor.before(sec);
});

/* A missing asset should never leave an empty slide. */
document.querySelectorAll('.photo-bg, .video-bg').forEach((media) => {
  media.addEventListener('error', () => media.closest('.panel').classList.add('media-failed'), { once: true });
});

/* video interactions: tap the video/backdrop to pause/play, button for sound */
document.addEventListener('click', (e) => {
  if (!e.target.matches('.video-bg, .photo-shade') || !e.target.closest('.panel-video')) return;
  const vid = e.target.closest('.panel-video').querySelector('.video-bg');
  const panel = vid.closest('.panel-video');
  if (vid.paused) { vid.play().catch(() => {}); panel.classList.remove('is-paused'); }
  else { vid.pause(); panel.classList.add('is-paused'); }
});
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.v-sound');
  if (!btn) return;
  const vid = btn.closest('.panel-video').querySelector('.video-bg');
  vid.muted = !vid.muted;
  btn.textContent = vid.muted ? '🔇' : '🔊';
  if (!vid.muted) vid.play().catch(() => {});
});

/* ---------- gallery + lightbox ---------- */
const grid = $('gallery-grid');
photos.forEach((p, i) => {
  const tile = document.createElement('button');
  tile.type = 'button'; tile.className = 'gallery-tile a a-up'; tile.style.setProperty('--d', (0.25 + i * 0.06) + 's');
  tile.setAttribute('aria-label', 'Open memory ' + (i + 1));
  tile.innerHTML = `<img src="Images/0-02-06-${p.f}" alt="Memory ${i + 1}" loading="lazy">`;
  tile.addEventListener('click', () => openLightbox(i));
  grid.appendChild(tile);
});
const lb = $('lightbox'), lbImg = $('lb-img'), lbCap = $('lb-cap');
let lbIndex = 0;
function stripTags(html) { const d = document.createElement('div'); d.innerHTML = html; return d.textContent; }
function openLightbox(i) {
  lbIndex = (i + photos.length) % photos.length;
  lbImg.src = 'Images/0-02-06-' + photos[lbIndex].f;
  lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
  lbCap.textContent = stripTags(photos[lbIndex].t);
  lb.hidden = false;
}
function closeLightbox() { lb.hidden = true; }
$('lb-close').addEventListener('click', closeLightbox);
$('lb-prev').addEventListener('click', () => openLightbox(lbIndex - 1));
$('lb-next').addEventListener('click', () => openLightbox(lbIndex + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });

/* ---------- flip cards (touch support; hover handled in CSS) ---------- */
document.querySelectorAll('.flip-card').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));

/* ---------- split headline into animated letters ---------- */
document.querySelectorAll('.split').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  let i = 0;
  words.forEach((w, wi) => {
    const word = document.createElement('span');
    word.className = 'word';
    [...w].forEach(ch => {
      const s = document.createElement('span');
      s.className = 'char'; s.textContent = ch;
      s.style.setProperty('--d', (0.15 + i * 0.07) + 's');
      word.appendChild(s); i++;
    });
    el.appendChild(word);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
});

/* ---------- slide navigation, dots, progress ---------- */
const panels = Array.from(document.querySelectorAll('.panel'));
const dotsWrap = $('dots');
panels.forEach((p, i) => {
  const d = document.createElement('button');
  d.type = 'button'; d.dataset.tip = p.dataset.label || `Slide ${i + 1}`;
  d.setAttribute('aria-label', d.dataset.tip);
  d.addEventListener('click', () => panels[i].scrollIntoView({ behavior: 'smooth' }));
  dotsWrap.appendChild(d);
});
const dots = Array.from(dotsWrap.children);
let current = 0, typedDone = false;
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const i = panels.indexOf(e.target);
    current = i;
    panels.forEach((p, j) => {
      const on = j === i;
      p.classList.toggle('active', on);
      p.querySelectorAll('video').forEach(v => { if (on) v.play().catch(() => {}); else v.pause(); });
    });
    dots.forEach((d, j) => d.classList.toggle('on', j === i));
    $('counter').textContent = `${String(i + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
    $('progress-bar').style.width = ((i + 1) / panels.length * 100) + '%';
    $('cue').classList.toggle('hide', i !== 0);
    if (e.target.id === 'letter-panel' && !typedDone) { typedDone = true; typeLetter(); }
    if (e.target.id === 'finale-panel') heartBurst(innerWidth / 2, innerHeight * .4, 26);
  });
}, { threshold: .5 });
panels.forEach(p => io.observe(p));

addEventListener('keydown', (e) => {
  if (!lb.hidden) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox(lbIndex + 1);
    if (e.key === 'ArrowLeft') openLightbox(lbIndex - 1);
    return;
  }
  if (e.key === 'ArrowRight' || e.key === 'PageDown') panels[Math.min(current + 1, panels.length - 1)].scrollIntoView({ behavior: 'smooth' });
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') panels[Math.max(current - 1, 0)].scrollIntoView({ behavior: 'smooth' });
});

/* ---------- typewriter love letter ---------- */
const LETTER = 'Every day I wonder how I got so lucky. You walk into a room and my whole world gets softer. On your birthday I just want you to know — you are loved more than words, more than stars, more than yesterday, and even more than tomorrow.';
function typeLetter() {
  const out = $('typed'); let i = 0;
  (function tick() {
    if (i <= LETTER.length) { out.textContent = LETTER.slice(0, i++); setTimeout(tick, 34); }
    else $('caret').style.display = 'none';
  })();
}

/* ---------- heart confetti bursts ---------- */
const BURST_COLORS = ['#8ecdf0', '#a5d8f5', '#d9f2ff', '#bfe4fa', '#ffffff'];
const BURST_GLYPHS = ['♡', '♥', '❤', '✦', '✧'];
function heartBurst(x, y, n = 34) {
  for (let i = 0; i < n; i++) {
    const el = document.createElement(i % 3 ? 'span' : 'i');
    const ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 260;
    el.className = 'burst' + (i % 3 ? '' : ' petalbit');
    el.style.setProperty('--x', x + 'px'); el.style.setProperty('--y', y + 'px');
    el.style.setProperty('--tx', Math.cos(ang) * dist + 'px');
    el.style.setProperty('--ty', (Math.sin(ang) * dist - 120) + 'px');
    el.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
    el.style.setProperty('--s', (12 + Math.random() * 18) + 'px');
    el.style.setProperty('--c', BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)]);
    if (i % 3) el.textContent = BURST_GLYPHS[Math.floor(Math.random() * BURST_GLYPHS.length)];
    el.addEventListener('animationend', () => el.remove());
    document.body.appendChild(el);
  }
}
$('wish-button').addEventListener('click', (e) => {
  $('wish').classList.add('show');
  $('wish-button').textContent = 'wish sent ✦';
  heartBurst(e.clientX, e.clientY, 44);
});

/* ---------- tap anywhere = hearts + ripple ---------- */
document.addEventListener('click', (e) => {
  if (e.target.closest('button, a, video, .flip-card, .lightbox, .v-sound')) return;
  heartBurst(e.clientX, e.clientY, 9);
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.setProperty('--x', e.clientX + 'px'); r.style.setProperty('--y', e.clientY + 'px');
  r.addEventListener('animationend', () => r.remove());
  document.body.appendChild(r);
});

/* ---------- sparkle cursor trail ---------- */
if (matchMedia('(pointer:fine)').matches) {
  let last = 0;
  addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - last < 55) return;
    last = now;
    const t = document.createElement('span');
    t.className = 'trail';
    t.textContent = Math.random() < .3 ? '♡' : (Math.random() < .5 ? '✦' : '✧');
    t.style.setProperty('--x', e.clientX + 'px'); t.style.setProperty('--y', e.clientY + 'px');
    t.style.setProperty('--s', (8 + Math.random() * 10) + 'px');
    t.addEventListener('animationend', () => t.remove());
    document.body.appendChild(t);
  }, { passive: true });
}

/* ---------- ambient sky, hearts & petals ---------- */
const canvas = $('sky'), ctx = canvas.getContext('2d'); let stars = [];
function resizeSky() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); const count = Math.min(95, Math.floor(innerWidth / 12)); stars = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.3 + .25, a: Math.random() * .65 + .15, phase: Math.random() * Math.PI * 2 })); }
function drawSky(t) { ctx.clearRect(0, 0, innerWidth, innerHeight); for (const s of stars) { ctx.beginPath(); ctx.fillStyle = `rgba(198,233,255,${s.a * (.65 + .35 * Math.sin(t / 1000 + s.phase))})`; ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); } requestAnimationFrame(drawSky); }
resizeSky(); addEventListener('resize', resizeSky); requestAnimationFrame(drawSky);

const romance = $('romance');
const HEARTS = ['♡', '♥', '❤'];
function spawnRomance() {
  const isHeart = Math.random() < .45;
  const el = document.createElement(isHeart ? 'span' : 'i');
  if (isHeart) { el.className = 'heart-float'; el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)]; el.style.fontSize = (12 + Math.random() * 16) + 'px'; }
  else { el.className = 'petal'; el.style.transform += `scale(${.6 + Math.random() * .9})`; }
  el.style.left = Math.random() * 100 + 'vw';
  el.style.setProperty('--drift', (Math.random() * 90 - 45) + 'px');
  el.style.animationDuration = (9 + Math.random() * 11) + 's';
  el.addEventListener('animationend', () => el.remove());
  romance.appendChild(el);
}
setInterval(spawnRomance, 750);
for (let i = 0; i < 12; i++) setTimeout(spawnRomance, i * 350);
