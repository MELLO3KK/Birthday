const $ = (id) => document.getElementById(id);
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
  Object.entries(values).forEach(([key, value]) => units[key].textContent = String(value).padStart(2, '0'));
  if (!remaining) $('countdown-note').textContent = 'Today is all about you. Happy Birthday!';
}
function updateYangonClock() {
  const time = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yangon', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());
  $('yangon-time').textContent = `Yangon · ${time}`;
}
birthdayCountdown(); updateYangonClock(); setInterval(() => { birthdayCountdown(); updateYangonClock(); }, 1000);

$('wish-button').addEventListener('click', () => { $('wish').classList.add('show'); $('wish-button').textContent = 'Wish sent ✦'; });

const canvas = $('sky'), ctx = canvas.getContext('2d'); let stars = [];
function resizeSky() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); const count = Math.min(95, Math.floor(innerWidth / 12)); stars = Array.from({ length: count }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.3 + .25, a: Math.random() * .65 + .15, phase: Math.random() * Math.PI * 2 })); }
function drawSky(t) { ctx.clearRect(0,0,innerWidth,innerHeight); for (const s of stars) { ctx.beginPath(); ctx.fillStyle = `rgba(255,234,249,${s.a * (.65 + .35 * Math.sin(t/1000 + s.phase))})`; ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(drawSky); }
resizeSky(); addEventListener('resize', resizeSky); requestAnimationFrame(drawSky);
