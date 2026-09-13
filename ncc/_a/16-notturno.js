window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "Notturno" — blu mezzanotte, luci in movimento, vetro.
 *
 * Art direction: app premium di mobilità vista di notte / vetrata di un aeroporto
 * alle tre del mattino. Tecnologico e calmo.
 *
 * Regole rispettate: nessun fatto inventato (solo i campi di `lead`), nessuna
 * testimonianza, nessuna libreria JS, z-index < 9000, intro Umbra incollata
 * testuale prima di </body>.
 *
 * Fotografia (c.pics): trattamento unico per tutto il tema — virata blu-ciano
 * `brightness(.8) contrast(1.1) hue-rotate(-8deg) saturate(1.1)` su ogni scatto,
 * bagliore ciano che esce dai bordi dell'immagine, e i pannelli di vetro appoggiati
 * sopra le foto: è lì che il vetro smerigliato ha finalmente qualcosa da sfocare.
 * Ogni contenitore foto ha sotto un gradiente notturno del tema: se la rete cade,
 * resta una composizione, mai un rettangolo bianco. Le silhouette SVG disegnate a
 * mano restano sotto le foto della flotta e nella fascia notturna.
 */

const { esc } = require('../lib/content.js');

/* escape + apostrofi tipografici italiani */
const ty = s => esc(s).replace(/'/g, '’');
/* testo grezzo per gli attributi alt: li escapa già photos.js, qui solo l'apostrofo */
const apo = s => String(s == null ? '' : s).replace(/'/g, '’');

const monogram = name => {
  const w = String(name || '').replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  if (!w.length) return 'N';
  if (w.length === 1) return w[0].slice(0, 2).toUpperCase();
  return (w[0][0] + w[1][0]).toUpperCase();
};

const waLink = (lead, msg) =>
  lead.whatsapp ? lead.whatsapp + '?text=' + encodeURIComponent(msg) : null;

/* ---------------------------------------------------------------- SVG assets */

/* Silhouette d'auto vista da dietro, fari posteriori luminosi che pulsano piano */
const carRear = `
<svg class="car" viewBox="0 0 480 300" role="img" aria-label="Illustrazione: silhouette di un’auto vista da dietro, con i fari posteriori accesi" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="ntBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1B2842"/>
      <stop offset="1" stop-color="#0A1224"/>
    </linearGradient>
    <linearGradient id="ntWin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#25395C"/>
      <stop offset="1" stop-color="#101C33"/>
    </linearGradient>
    <linearGradient id="ntBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#FFC46B" stop-opacity="0"/>
      <stop offset=".5" stop-color="#FFC46B" stop-opacity=".55"/>
      <stop offset="1" stop-color="#FFC46B" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="ntFloor" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#5FD4FF" stop-opacity=".22"/>
      <stop offset="1" stop-color="#5FD4FF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ntHalo" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#FFC46B" stop-opacity=".55"/>
      <stop offset="1" stop-color="#FFC46B" stop-opacity="0"/>
    </radialGradient>
    <filter id="ntBlur" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="9"/>
    </filter>
  </defs>

  <ellipse cx="240" cy="252" rx="215" ry="34" fill="url(#ntFloor)"/>

  <!-- corpo -->
  <path d="M66 236 L66 158 C66 132 82 112 106 103 L134 56 C143 42 158 34 175 34 L305 34
           C322 34 337 42 346 56 L374 103 C398 112 414 132 414 158 L414 236 Z"
        fill="url(#ntBody)" stroke="#3D5C8C" stroke-opacity=".55" stroke-width="1.6"/>
  <!-- lunotto -->
  <path d="M138 100 L160 62 C166 52 176 47 188 47 L292 47 C304 47 314 52 320 62 L342 100 Z"
        fill="url(#ntWin)" stroke="#5FD4FF" stroke-opacity=".28" stroke-width="1.4"/>
  <path d="M150 96 L168 65 C171 60 176 57 182 57 L232 57 L206 96 Z" fill="#5FD4FF" opacity=".07"/>
  <!-- montanti e linea di cintura -->
  <path d="M66 158 L414 158" stroke="#5FD4FF" stroke-opacity=".14" stroke-width="1.2"/>
  <path d="M110 236 L110 200 M370 236 L370 200" stroke="#0A1224" stroke-width="10" stroke-linecap="round"/>

  <!-- barra luminosa fra i fari -->
  <rect x="150" y="176" width="180" height="4" rx="2" fill="url(#ntBar)" class="lampBar"/>

  <!-- fari posteriori: alone + sorgente -->
  <g class="lamp">
    <ellipse cx="118" cy="178" rx="74" ry="40" fill="url(#ntHalo)" filter="url(#ntBlur)"/>
    <ellipse cx="362" cy="178" rx="74" ry="40" fill="url(#ntHalo)" filter="url(#ntBlur)"/>
    <rect x="80" y="167" width="76" height="22" rx="11" fill="#FFC46B"/>
    <rect x="324" y="167" width="76" height="22" rx="11" fill="#FFC46B"/>
    <rect x="86" y="171" width="64" height="7" rx="3.5" fill="#FFF0D6" opacity=".85"/>
    <rect x="330" y="171" width="64" height="7" rx="3.5" fill="#FFF0D6" opacity=".85"/>
  </g>

  <!-- paraurti -->
  <path d="M66 214 L414 214" stroke="#5FD4FF" stroke-opacity=".10" stroke-width="1.2"/>
  <rect x="206" y="222" width="68" height="9" rx="4.5" fill="#0A1224" stroke="#3D5C8C" stroke-opacity=".4"/>
  <!-- riflesso a terra dei fari -->
  <rect x="86" y="240" width="66" height="5" rx="2.5" fill="#FFC46B" opacity=".16" class="lampFloor"/>
  <rect x="328" y="240" width="66" height="5" rx="2.5" fill="#FFC46B" opacity=".16" class="lampFloor"/>
</svg>`;

/* profili di flotta, disegnati a mano, uno diverso per ogni card */
function carProfile(kind, id) {
  const paths = {
    a: 'M16 82 L16 68 C16 60 22 54 32 51 L74 32 C85 27 97 24 110 24 L186 24 C201 24 213 28 223 36 L250 55 L272 60 C282 62 288 68 288 76 L288 82 Z',
    b: 'M16 82 L16 44 C16 34 24 27 36 25 L196 20 C221 19 241 27 255 42 L276 64 C284 72 288 76 288 82 Z',
    c: 'M14 82 L14 34 C14 26 21 20 31 19 L258 14 C272 13 284 22 286 36 L290 74 C291 79 288 82 284 82 Z'
  };
  const win = {
    a: 'M78 46 L104 34 C112 31 120 30 128 30 L182 30 C192 30 200 33 206 39 L222 52 Z',
    b: 'M40 40 L40 33 L120 31 L120 40 Z M136 40 L136 31 L200 30 C214 30 226 34 236 44 L232 46 Z',
    c: 'M30 42 L30 28 L96 26 L96 42 Z M112 42 L112 26 L178 24 L178 42 Z M194 42 L194 24 L258 23 L258 42 Z'
  };
  /* decorativa: sta sotto la fotografia della vettura e resta come rete di sicurezza */
  return `<svg class="prof" viewBox="0 0 300 100" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="pf${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#25375A"/><stop offset="1" stop-color="#0B1224"/>
    </linearGradient></defs>
    <path d="${paths[kind]}" fill="url(#pf${id})" stroke="#5FD4FF" stroke-opacity=".38" stroke-width="1.3"/>
    <path d="${win[kind]}" fill="#5FD4FF" opacity=".16"/>
    <circle cx="76" cy="82" r="15" fill="#060B18" stroke="#5FD4FF" stroke-opacity=".45" stroke-width="1.4"/>
    <circle cx="226" cy="82" r="15" fill="#060B18" stroke="#5FD4FF" stroke-opacity=".45" stroke-width="1.4"/>
    <circle cx="76" cy="82" r="5" fill="#5FD4FF" opacity=".35"/>
    <circle cx="226" cy="82" r="5" fill="#5FD4FF" opacity=".35"/>
    <rect x="286" y="60" width="6" height="8" rx="3" fill="#FFC46B" opacity=".8"/>
    <rect x="12" y="60" width="6" height="8" rx="3" fill="#FFC46B" opacity=".5"/>
  </svg>`;
}

const ico = {
  volo: '<path d="M3 13.5 21 7.5 18.6 12.9 21 18.3 3 12.3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  cartello: '<rect x="3.5" y="4.5" width="17" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 15.5V21M8.5 21h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  auto: '<path d="M3 15v-3l2-4.2A2 2 0 0 1 6.8 6.5h10.4A2 2 0 0 1 19 7.8L21 12v3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="7" cy="15.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="15.5" r="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  chat: '<path d="M4 5.5h16v11H9.5L5 20v-3.5H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  tel: '<path d="M6.5 3.5h3l1.4 3.6-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2 3.6 1.4v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  pin: '<path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  orologio: '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7.2V12l3.2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  stella: '<path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8z" fill="currentColor"/>'
};
const svgIco = (k, cls) => `<svg class="${cls || 'ic'}" viewBox="0 0 24 24" aria-hidden="true">${ico[k]}</svg>`;

/* ---------------------------------------------------------------- render */

module.exports = function render(lead, c, intro) {
  const name = ty(lead.name);
  const city = ty(lead.city);
  const mono = esc(monogram(lead.name));
  const tel = esc(lead.tel);
  const phone = ty(lead.phoneDisplay);
  const wa = lead.whatsapp ? esc(waLink(lead, 'Buongiorno, ho visto il vostro sito. Vorrei un preventivo.')) : null;
  const waFleet = lead.whatsapp ? esc(waLink(lead, 'Buongiorno, vorrei sapere la disponibilità di una vettura.')) : null;
  const waNight = lead.whatsapp ? esc(waLink(lead, 'Buongiorno, avrei bisogno di un transfer aeroportuale. Vi mando i dettagli del volo.')) : null;

  const rating = lead.rating ? ty(lead.rating) : null;
  const reviews = Number(lead.reviews) > 0 ? Number(lead.reviews) : 0;

  /* --- fotografia: sempre difensiva, un pic mancante non deve rompere la pagina --- */
  const pics = c.pics || {};
  const shot = (pic, opts) => (pic && typeof pic.tag === 'function') ? pic.tag(opts) : '';
  const heroPic = pics.hero || null;
  const fleetPics = Array.isArray(pics.fleet) ? pics.fleet : [];
  /* i lead non milanesi non hanno lo scorcio di Milano: si ripiega sulla strada */
  const zonaPic = pics.citta || pics.strada || pics.notturno || null;
  const nightPic = pics.notturno || pics.strada || null;
  const contactPic = pics.aeroporto || pics.notturno || null;
  const insetPic = pics.interni || pics.autista || null;

  const services = (c.services || []).map((s, i) => `
      <article class="glass card svc reveal" style="--d:${i * 70}ms">
        <span class="num">0${i + 1}</span>
        <h3>${ty(s[0])}</h3>
        <p>${ty(s[1])}</p>
      </article>`).join('');

  const fleetKinds = ['a', 'b', 'c'];
  const fleet = (c.fleet || []).map((f, i) => `
      <article class="glass card fleet reveal" style="--d:${i * 90}ms">
        <div class="slot">
          ${carProfile(fleetKinds[i % 3], i + 1)}
          ${shot(fleetPics[i], {
            w: 900, q: 74,
            alt: (fleetPics[i] ? fleetPics[i].alt : '') + ' — ' + apo(f[0]),
            sizes: '(max-width:759px) 92vw, (max-width:1180px) 32vw, 360px'
          })}
          <span class="beam b1" aria-hidden="true"></span><span class="beam b2" aria-hidden="true"></span>
        </div>
        <div class="fleetTxt">
          <span class="tag">${ty(f[1])}</span>
          <h3>${ty(f[0])}</h3>
          <p>${ty(f[2])}</p>
        </div>
      </article>`).join('');

  const faq = (c.faq || []).map((q, i) => `
      <div class="q reveal" style="--d:${i * 50}ms">
        <button type="button" class="qBtn" aria-expanded="false" aria-controls="a${i}" id="qb${i}">
          <span>${ty(q[0])}</span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5 12 15l6-5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="qA" id="a${i}" role="region" aria-labelledby="qb${i}"><p>${ty(q[1])}</p></div>
      </div>`).join('');

  const stats = (c.stats || []).map(s => `
        <div class="stat">
          <strong>${ty(s[0])}</strong>
          <span>${ty(s[1])}</span>
        </div>`).join('');

  const steps = [
    ['Ci scrivete', 'Data, orario, punto di partenza e destinazione. Su WhatsApp bastano trenta secondi, a qualunque ora vi venga in mente.'],
    ['Ricevete il preventivo', 'Un prezzo concordato prima, non un tassametro. Se va bene, confermate con un messaggio.'],
    ['Si viaggia', 'All’ora stabilita l’auto è al punto d’incontro. Voi dovete solo salire.']
  ].map((s, i) => `
        <li class="glass card step reveal" style="--d:${i * 90}ms">
          <span class="stepN">${i + 1}</span>
          <h3>${s[0]}</h3>
          <p>${s[1]}</p>
        </li>`).join('');

  const timeline = [
    ['volo', 'Il numero del volo', 'Ci mandate il codice del volo prima della partenza. Da lì in poi il monitoraggio è nostro.'],
    ['cartello', 'Accoglienza in arrivi', 'Vi aspettiamo in arrivi con il cartello. Se l’aereo ritarda, l’attesa la gestiamo noi.'],
    ['auto', 'Bagagli e partenza', 'Il tempo di caricare le valigie e si parte. Nessuna coda, nessuna trattativa sul prezzo.'],
    ['pin', 'Arrivo a destinazione', 'Vi lasciamo davanti all’indirizzo esatto, a qualunque ora sia.']
  ].map((t, i) => `
          <li class="node" data-i="${i}">
            <span class="dot">${svgIco(t[0], 'ic dotIc')}</span>
            <h3>${t[1]}</h3>
            <p>${t[2]}</p>
          </li>`).join('');

  const ctaWa = size => wa
    ? `<a class="btn primary ${size}" href="${wa}" target="_blank" rel="noopener" aria-label="Preventivo su WhatsApp: scrivi a ${name}">${svgIco('chat')}<span>Preventivo su WhatsApp</span></a>`
    : '';

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${ty(c.metaTitle)}</title>
<meta name="description" content="${ty(c.metaDesc)}">
<meta name="theme-color" content="#060B18">
<meta name="robots" content="noindex">
<meta property="og:title" content="${ty(c.metaTitle)}">
<meta property="og:description" content="${ty(c.metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
/* ===================== Notturno — base ===================== */
:root{
  --bg:#060B18;
  --bg2:#080F1F;
  --surf:#101A2E;
  --line:rgba(160,196,255,.14);
  --line2:rgba(160,196,255,.28);
  --txt:#E8EEF8;
  --mut:#9DB0CC;
  --mut2:#7C8FAC;
  --acc:#5FD4FF;
  --amb:#FFC46B;
  --ink:#04101F;
  --r:18px;
  --pad:clamp(20px,5vw,40px);
  --wrap:1180px;
  --ease:cubic-bezier(.2,.7,.25,1);
}
*,*::before,*::after{box-sizing:border-box}
/* niente scroll-behavior:smooth su html: renderebbe animato ogni scroll
   programmatico (e le rivelazioni non farebbero in tempo a scattare).
   Lo scorrimento morbido delle ancore lo gestisce il JS in fondo alla pagina. */
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:var(--bg);color:var(--txt);
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  font-size:16px;line-height:1.62;letter-spacing:.005em;
  overflow-x:hidden;
  padding-bottom:env(safe-area-inset-bottom);
  -webkit-font-smoothing:antialiased;
}
body::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(900px 520px at 12% -6%,rgba(95,212,255,.13),transparent 62%),
    radial-gradient(760px 460px at 92% 8%,rgba(255,196,107,.07),transparent 60%),
    radial-gradient(1100px 700px at 50% 108%,rgba(95,212,255,.08),transparent 64%);
}
img,svg{max-width:100%}
h1,h2,h3,.dsp{font-family:'Space Grotesk','Inter',system-ui,sans-serif;font-weight:500;letter-spacing:-.02em;line-height:1.1;margin:0}
p{margin:0}
a{color:inherit;text-decoration:none}
ul,ol{margin:0;padding:0;list-style:none}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px;border-radius:6px}
::selection{background:rgba(95,212,255,.28)}

.wrap{width:min(100% - var(--pad)*2,var(--wrap));margin-inline:auto;position:relative;z-index:1}
section{position:relative;z-index:1}
.eyebrow{
  font-size:.72rem;font-weight:600;letter-spacing:.26em;text-transform:uppercase;color:var(--acc);
  display:flex;align-items:center;gap:10px;margin:0 0 18px
}
.eyebrow::before{content:"";width:26px;height:1px;background:linear-gradient(90deg,var(--acc),transparent);flex:none}
h2.sec{font-size:clamp(1.75rem,4.6vw,2.9rem);margin-bottom:14px}
.lead{color:var(--mut);font-size:clamp(1rem,2.4vw,1.09rem);max-width:62ch}

/* ===================== vetro ===================== */
.glass{
  position:relative;background:linear-gradient(160deg,rgba(30,48,80,.52),rgba(16,26,46,.42));
  border:1px solid var(--line);border-radius:var(--r);
  -webkit-backdrop-filter:blur(14px) saturate(1.25);backdrop-filter:blur(14px) saturate(1.25);
  overflow:hidden;
}
.glass::before{
  content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;
  background:linear-gradient(180deg,rgba(255,255,255,.07),transparent 38%);
}
/* vetro appoggiato sopra una fotografia: più denso, così il testo tiene sempre */
.onPhoto{
  background:linear-gradient(160deg,rgba(20,34,62,.74),rgba(8,15,30,.70));
  -webkit-backdrop-filter:blur(22px) saturate(1.35);backdrop-filter:blur(22px) saturate(1.35);
  border-color:var(--line2);
  box-shadow:0 34px 80px -46px rgba(0,0,0,.95),0 0 70px -38px rgba(95,212,255,.55);
}
.card{padding:clamp(20px,3.2vw,30px);transition:transform .55s var(--ease),border-color .55s var(--ease)}
.card::after{
  content:"";position:absolute;top:-60%;bottom:-60%;left:-40%;width:38%;pointer-events:none;
  background:linear-gradient(100deg,transparent,rgba(214,238,255,.16),transparent);
  transform:translateX(-160%) rotate(6deg);transition:transform 1.05s var(--ease);
}
.card:hover,.card:focus-within{transform:translateY(-4px);border-color:var(--line2)}
.card:hover::after,.card:focus-within::after{transform:translateX(420%) rotate(6deg)}

/* ===================== fotografia =====================
   Un solo trattamento per tutto il tema: virata blu-ciano, luci trattenute.
   Sotto ogni foto c'è sempre un fondo notturno: se l'immagine non arriva,
   il riquadro resta una composizione del tema, non un buco. */
.ph{
  position:relative;overflow:hidden;isolation:isolate;
  background:
    radial-gradient(120% 90% at 50% 116%,rgba(95,212,255,.20),transparent 62%),
    linear-gradient(168deg,#132038 0%,#0A1224 58%,#060B18 100%);
}
.ph>img{
  position:absolute;inset:0;z-index:0;width:100%;height:100%;object-fit:cover;
  filter:brightness(.8) contrast(1.1) hue-rotate(-8deg) saturate(1.1);
}
/* velo di protezione: il testo bianco sopra le foto resta sempre leggibile */
.ph::after{
  content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg,rgba(6,11,24,.28),rgba(6,11,24,.86));
}
/* le luci della foto "escono" dal riquadro */
.glow{box-shadow:0 30px 84px -46px rgba(95,212,255,.75),0 10px 40px -30px rgba(255,196,107,.35)}
.bloom{
  position:absolute;z-index:2;left:50%;top:44%;width:min(88%,620px);aspect-ratio:1;
  transform:translate(-50%,-50%);pointer-events:none;border-radius:50%;
  background:radial-gradient(circle,rgba(95,212,255,.30),rgba(95,212,255,.07) 46%,transparent 70%);
  filter:blur(26px);mix-blend-mode:screen;
}
.grain{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.5;
  background:repeating-linear-gradient(90deg,rgba(95,212,255,.10) 0 2px,transparent 2px 5px);
  -webkit-mask-image:linear-gradient(180deg,transparent,#000);mask-image:linear-gradient(180deg,transparent,#000);
}

/* ===================== bottoni ===================== */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:9px;
  padding:13px 22px;border-radius:999px;font-weight:600;font-size:.95rem;
  border:1px solid var(--line2);color:var(--txt);
  transition:transform .3s var(--ease),background .3s var(--ease),border-color .3s var(--ease),box-shadow .3s var(--ease);
  white-space:nowrap;
}
.btn .ic{width:19px;height:19px;flex:none}
.btn:hover{transform:translateY(-2px)}
.btn.primary{
  background:linear-gradient(120deg,#5FD4FF,#9BE6FF);color:#04101F;border-color:transparent;
  box-shadow:0 10px 34px -14px rgba(95,212,255,.85);
}
.btn.primary:hover{box-shadow:0 16px 40px -14px rgba(95,212,255,.95)}
.btn.ghost{background:rgba(16,26,46,.5);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.btn.ghost:hover{border-color:var(--acc);color:#fff}
.btn.lg{padding:15px 26px;font-size:1rem}

/* ===================== header ===================== */
header{
  position:sticky;top:0;z-index:60;
  background:rgba(6,11,24,.62);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);
  border-bottom:1px solid transparent;transition:border-color .4s var(--ease),background .4s var(--ease);
}
header.on{border-bottom-color:var(--line);background:rgba(6,11,24,.86)}
.hd{display:flex;align-items:center;gap:16px;padding:13px 0;min-height:66px}
.brand{display:flex;align-items:center;gap:12px;min-width:0}
.mono{
  width:42px;height:42px;flex:none;border-radius:13px;display:grid;place-items:center;
  font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;letter-spacing:.02em;color:var(--acc);
  background:linear-gradient(150deg,rgba(95,212,255,.2),rgba(16,26,46,.7));
  border:1px solid var(--line2);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12);
}
.brandTxt{min-width:0}
.brandTxt b{display:block;font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:1rem;line-height:1.25;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:46vw}
.brandTxt span{display:block;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mut2)}
.hdR{margin-left:auto;display:flex;align-items:center;gap:10px}
.hdChip{display:none;align-items:center;gap:7px;font-size:.83rem;color:var(--mut);
  padding:8px 13px;border-radius:999px;border:1px solid var(--line);background:rgba(16,26,46,.45)}
.hdChip .ic{width:14px;height:14px;color:var(--amb)}
.hdChip b{color:var(--txt);font-weight:600}
.hdTel{display:none}
@media(min-width:760px){.hdChip{display:inline-flex}.hdTel{display:inline-flex}}
@media(max-width:519px){
  .hdR .btn span{display:none}
  .hdR .btn{padding:12px 14px}
  .brandTxt b{max-width:44vw;font-size:.94rem}
}

/* ===================== hero ===================== */
.hero{position:relative;padding:clamp(46px,9vw,96px) 0 clamp(50px,8vw,86px);overflow:hidden}
/* foto notturna a tutta pagina: sotto le scie, sotto il vetro */
.heroPh{position:absolute;inset:0;z-index:0;background-color:#060B18}
/* il velo è calibrato sul testo: leggero dove la foto respira,
   pesante dove passano titolo, occhiello e lede */
.heroPh::after{
  background:
    linear-gradient(180deg,rgba(6,11,24,.34) 0%,rgba(6,11,24,.62) 22%,rgba(6,11,24,.84) 58%,rgba(6,11,24,.95) 88%,#060B18 100%),
    radial-gradient(125% 82% at 14% 40%,rgba(6,11,24,.62),rgba(6,11,24,0) 74%);
}
.heroPh .bloom{top:34%;left:70%;width:min(80%,660px)}
@media(min-width:960px){
  .heroPh::after{
    background:
      linear-gradient(100deg,rgba(6,11,24,.95) 0%,rgba(6,11,24,.88) 32%,rgba(6,11,24,.55) 60%,rgba(6,11,24,.22) 100%),
      linear-gradient(180deg,rgba(6,11,24,.25),rgba(6,11,24,.08) 42%,rgba(6,11,24,.80) 90%,#060B18 100%);
  }
}
#trails{
  position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(180deg,transparent,#000 22%,#000 72%,transparent);
  mask-image:linear-gradient(90deg,transparent,#000 14%,#000 86%,transparent),linear-gradient(180deg,transparent,#000 22%,#000 72%,transparent);
  -webkit-mask-composite:source-in;mask-composite:intersect;
  opacity:0;transition:opacity 1.6s ease;
}
#trails.on{opacity:1}
.heroGrid{position:relative;z-index:2;display:grid;gap:clamp(30px,5vw,52px);align-items:center}
@media(min-width:960px){.heroGrid{grid-template-columns:1.15fr .85fr}}
.kick{display:inline-flex;align-items:center;gap:9px;font-size:.72rem;font-weight:600;letter-spacing:.24em;
  text-transform:uppercase;color:var(--acc);padding:7px 14px;border-radius:999px;
  border:1px solid rgba(95,212,255,.3);background:rgba(95,212,255,.07)}
.hName{
  font-family:'Space Grotesk',sans-serif;font-weight:600;
  font-size:clamp(2.15rem,7.4vw,4.35rem);line-height:1.02;letter-spacing:-.035em;
  margin:20px 0 14px;
  background:linear-gradient(104deg,#FFFFFF 8%,#DCEBFF 42%,#7FD9FF 78%,#FFC46B 118%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  overflow-wrap:break-word;
}
.hClaim{font-size:clamp(1.15rem,3.4vw,1.7rem);font-weight:400;color:var(--txt);margin-bottom:16px;letter-spacing:-.015em}
.hClaim em{font-style:normal;color:var(--acc)}
.hLede{color:var(--mut);max-width:54ch;font-size:clamp(1rem,2.3vw,1.08rem)}
.hCta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.hNote{margin-top:20px;font-size:.86rem;color:var(--mut2);display:flex;align-items:center;gap:9px}
.hNote .ic{width:16px;height:16px;color:var(--amb);flex:none}

/* pannello di stato */
.panel{padding:clamp(20px,3vw,26px)}
.pTop{display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding-bottom:16px;border-bottom:1px solid var(--line)}
.clock{display:flex;align-items:baseline;gap:9px}
.clock b{font-family:'Space Grotesk',sans-serif;font-size:1.75rem;font-weight:500;letter-spacing:.01em;
  font-variant-numeric:tabular-nums;color:#fff}
.clock span{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mut2)}
.pTop .ic{width:22px;height:22px;color:var(--acc);opacity:.7}
.pRow{display:flex;align-items:flex-start;gap:12px;padding:15px 0;border-bottom:1px solid var(--line)}
.pRow .ic{width:18px;height:18px;color:var(--acc);flex:none;margin-top:3px}
.pRow .k{font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--mut2);display:block;margin-bottom:2px}
.pRow .v{font-family:'Space Grotesk',sans-serif;font-size:1.02rem;color:var(--txt)}
.pRow .v small{font-family:'Inter',sans-serif;font-size:.84rem;color:var(--mut);margin-left:6px}
.live{display:flex;align-items:center;gap:11px;padding-top:16px;font-size:.9rem;color:var(--txt)}
.pulse{position:relative;width:9px;height:9px;border-radius:50%;background:var(--acc);flex:none;
  box-shadow:0 0 0 0 rgba(95,212,255,.6);animation:pulse 2.6s var(--ease) infinite}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(95,212,255,.55)}70%{box-shadow:0 0 0 13px rgba(95,212,255,0)}100%{box-shadow:0 0 0 0 rgba(95,212,255,0)}}

/* ===================== fascia prova ===================== */
.proof{padding:clamp(28px,5vw,44px) 0}
.proofIn{display:grid;gap:22px;padding:clamp(22px,3.4vw,30px);align-items:center}
@media(min-width:860px){.proofIn{grid-template-columns:1fr auto;gap:36px}}
.stats{display:flex;flex-wrap:wrap;gap:clamp(22px,4vw,48px)}
.stat strong{display:block;font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,4vw,2.15rem);
  font-weight:500;color:#fff;line-height:1.05}
.stat span{font-size:.78rem;letter-spacing:.13em;text-transform:uppercase;color:var(--mut2)}
.proofTxt{max-width:38ch}
.proofTxt b{display:block;font-family:'Space Grotesk',sans-serif;font-weight:500;font-size:1.05rem;color:var(--amb);margin-bottom:3px}
.proofTxt p{color:var(--mut);font-size:.94rem}

/* ===================== griglie ===================== */
.block{padding:clamp(52px,9vw,104px) 0}
.head{max-width:66ch;margin-bottom:clamp(28px,4.6vw,46px)}
.grid{display:grid;gap:16px}
@media(min-width:640px){.grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1040px){.grid.four{grid-template-columns:repeat(4,1fr)}}
.svc .num{font-family:'Space Grotesk',sans-serif;font-size:.78rem;letter-spacing:.2em;color:var(--acc);opacity:.75}
.svc h3{font-size:1.18rem;margin:12px 0 9px}
.svc p{color:var(--mut);font-size:.95rem}

/* ===================== timeline aeroporto ===================== */
.night{padding:clamp(56px,9vw,110px) 0;position:relative;overflow:hidden}
/* fascia atmosferica a tutta larghezza: strada cittadina di notte */
.nightPh{position:absolute;inset:0;z-index:0;background-color:#070D1C}
.nightPh::after{
  background:
    linear-gradient(180deg,#060B18 0%,rgba(6,11,24,.88) 16%,rgba(6,11,24,.80) 50%,rgba(6,11,24,.90) 86%,#060B18 100%),
    radial-gradient(90% 62% at 50% 46%,transparent,rgba(6,11,24,.72));
}
.night::before{
  content:"";position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg,transparent,rgba(9,17,34,.42) 22%,rgba(9,17,34,.42) 78%,transparent);
}
.tl{position:relative;margin-top:clamp(30px,5vw,50px)}
.rail{position:absolute;left:16px;top:0;bottom:0;width:2px;background:var(--line);border-radius:2px;overflow:hidden}
.rail i{position:absolute;left:0;top:0;width:100%;height:var(--p,0%);display:block;
  background:linear-gradient(180deg,var(--acc),rgba(255,196,107,.9));
  box-shadow:0 0 16px rgba(95,212,255,.55);transition:height .35s linear}
.nodes{display:grid;gap:26px;padding-left:34px}
.node{position:relative;opacity:.58;transform:translateY(10px);
  transition:opacity .7s var(--ease),transform .7s var(--ease)}
.node.on{opacity:1;transform:none}
.dot{position:absolute;left:-34px;top:0;width:34px;height:34px;border-radius:50%;
  display:grid;place-items:center;background:#0A1224;border:1px solid var(--line2);
  transition:box-shadow .7s var(--ease),border-color .7s var(--ease),background .7s var(--ease)}
.dotIc{width:17px;height:17px;color:var(--mut2);transition:color .7s var(--ease)}
.node.on .dot{background:rgba(95,212,255,.14);border-color:var(--acc);box-shadow:0 0 0 5px rgba(95,212,255,.09),0 0 26px rgba(95,212,255,.45)}
.node.on .dotIc{color:var(--acc)}
.node h3{font-size:1.08rem;margin-bottom:6px}
.node p{color:var(--mut);font-size:.93rem;max-width:44ch}
@media(min-width:900px){
  .tl{padding-top:52px}
  .rail{left:0;right:0;top:16px;bottom:auto;width:auto;height:2px}
  .rail i{width:var(--p,0%);height:100%;background:linear-gradient(90deg,var(--acc),rgba(255,196,107,.9));transition:width .35s linear}
  .nodes{grid-template-columns:repeat(4,1fr);gap:24px;padding-left:0}
  .node{padding-top:8px}
  .dot{left:0;top:-52px}
}
.night .wrap{z-index:2}
.carWrap{
  margin-top:clamp(34px,6vw,60px);position:relative;border-radius:calc(var(--r) + 6px);
  padding:clamp(18px,4vw,34px) clamp(10px,3vw,34px) 0;
  background:linear-gradient(180deg,rgba(16,26,46,.62),rgba(6,11,24,.18));
  -webkit-backdrop-filter:blur(16px) saturate(1.2);backdrop-filter:blur(16px) saturate(1.2);
  border:1px solid var(--line);border-bottom:none;overflow:hidden;
}
.carWrap::after{
  content:"";position:absolute;left:8%;right:8%;bottom:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(95,212,255,.5),transparent)
}
.car{display:block;width:min(100%,560px);margin:0 auto}
.lamp{animation:breathe 4.8s ease-in-out infinite}
.lampBar{animation:breathe 4.8s ease-in-out infinite .35s}
.lampFloor{animation:breathe 4.8s ease-in-out infinite .2s}
@keyframes breathe{0%,100%{opacity:.62}50%{opacity:1}}
.carCap{text-align:center;color:var(--mut2);font-size:.84rem;padding:14px 10px 0}

/* ===================== flotta ===================== */
.rail2{display:grid;gap:16px}
@media(min-width:760px){.rail2{grid-template-columns:repeat(3,1fr)}}
.fleet{padding:0;display:flex;flex-direction:column}
.slot{position:relative;aspect-ratio:16/9;display:grid;place-items:center;overflow:hidden;
  background:
    radial-gradient(120% 80% at 50% 120%,rgba(95,212,255,.18),transparent 62%),
    linear-gradient(180deg,#0C1730,#070D1C);
  border-bottom:1px solid var(--line)}
.slot::before{
  content:"";position:absolute;inset:auto 0 0 0;height:42%;
  background:repeating-linear-gradient(90deg,rgba(95,212,255,.16) 0 22px,transparent 22px 54px);
  -webkit-mask-image:linear-gradient(180deg,transparent,#000);mask-image:linear-gradient(180deg,transparent,#000);
  opacity:.5}
.beam{position:absolute;height:1px;left:-30%;width:60%;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(95,212,255,.75),transparent);animation:sweep 7s linear infinite}
.beam.b2{top:34%;background:linear-gradient(90deg,transparent,rgba(255,196,107,.6),transparent);animation-duration:9.5s;animation-delay:-3s}
.beam.b1{top:22%}
@keyframes sweep{0%{transform:translateX(0)}100%{transform:translateX(280%)}}
.prof{position:relative;z-index:1;width:78%;filter:drop-shadow(0 10px 26px rgba(0,0,0,.5))}
/* la foto della vettura copre la silhouette disegnata: se non arriva, resta il disegno */
.slot>img{
  position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover;
  filter:brightness(.8) contrast(1.1) hue-rotate(-8deg) saturate(1.1);
}
.slot::after{
  content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
  background:
    radial-gradient(120% 78% at 50% 122%,rgba(95,212,255,.34),transparent 62%),
    linear-gradient(180deg,rgba(6,11,24,.10) 42%,rgba(6,11,24,.74));
}
.beam{z-index:4}
.fleetTxt{padding:clamp(18px,2.6vw,24px)}
.tag{display:inline-block;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--amb);
  border:1px solid rgba(255,196,107,.3);border-radius:999px;padding:4px 11px;margin-bottom:11px}
.fleet h3{font-size:1.16rem;margin-bottom:8px}
.fleet p{color:var(--mut);font-size:.94rem}

/* ===================== come funziona ===================== */
.steps{display:grid;gap:16px;counter-reset:s}
@media(min-width:820px){.steps{grid-template-columns:repeat(3,1fr)}}
.step{display:flex;flex-direction:column;gap:10px}
.stepN{font-family:'Space Grotesk',sans-serif;font-size:2.6rem;font-weight:500;line-height:1;
  color:transparent;-webkit-text-stroke:1px rgba(95,212,255,.55)}
.step h3{font-size:1.1rem}
.step p{color:var(--mut);font-size:.94rem}
/* inserto fotografico: dettaglio di interni, incorniciato come una lastra di vetro */
.inset{
  margin:clamp(22px,4vw,34px) 0 0;border-radius:calc(var(--r) + 4px);border:1px solid var(--line);
  aspect-ratio:4/3;
}
@media(min-width:700px){.inset{aspect-ratio:21/9}}
.inset::after{background:linear-gradient(180deg,rgba(6,11,24,.20) 30%,rgba(6,11,24,.90))}
/* niente backdrop-filter qui dentro: annidato in un contenitore .ph (isolation
   + immagine filtrata) Chromium lo compone male nelle catture a pagina intera.
   Stesso aspetto, ottenuto con un fondo denso invece che con la sfocatura. */
.insetCap{
  position:absolute;z-index:3;left:clamp(14px,3vw,26px);right:clamp(14px,3vw,26px);
  bottom:clamp(14px,3vw,26px);padding:14px 18px;border-radius:14px;margin:0;
  display:flex;align-items:center;gap:12px;max-width:44ch;
  background:linear-gradient(160deg,rgba(20,34,62,.93),rgba(8,15,30,.90));
  border:1px solid var(--line2);
  box-shadow:0 24px 60px -34px rgba(0,0,0,.95),0 0 60px -34px rgba(95,212,255,.5);
}
.insetCap .ic{width:18px;height:18px;color:var(--acc);flex:none}
.insetCap span{font-size:.9rem;color:var(--txt)}

/* ===================== zona operativa ===================== */
.zone{display:grid;gap:clamp(24px,4vw,44px);align-items:center}
@media(min-width:900px){.zone{grid-template-columns:1fr 1fr}}
.radar{position:relative;aspect-ratio:1;max-width:420px;width:100%;margin-inline:auto;
  display:grid;place-items:center}
.radarPh{position:absolute;z-index:0;inset:13%;border-radius:50%;
  box-shadow:0 0 70px -18px rgba(95,212,255,.55)}
.radarPh::after{background:radial-gradient(circle at 50% 42%,rgba(6,11,24,.78),rgba(6,11,24,.95) 76%)}
.radar span{position:absolute;z-index:1;border:1px solid rgba(95,212,255,.16);border-radius:50%;inset:0;
  animation:ring 6.5s var(--ease) infinite}
.radar span:nth-child(2){animation-delay:-2.2s}
.radar span:nth-child(3){animation-delay:-4.4s}
@keyframes ring{0%{transform:scale(.18);opacity:0}18%{opacity:.9}100%{transform:scale(1);opacity:0}}
.radar .core{position:relative;z-index:2;text-align:center;padding:22px}
.radar .core b{display:block;font-family:'Space Grotesk',sans-serif;font-size:clamp(1.4rem,4vw,2rem);color:#fff}
.radar .core span{position:static;border:none;display:block;font-size:.74rem;letter-spacing:.2em;
  text-transform:uppercase;color:var(--acc);animation:none;margin-bottom:6px;inset:auto}
.zoneList{display:grid;gap:12px;margin-top:22px}
.zoneList li{display:flex;gap:12px;align-items:flex-start;color:var(--mut);font-size:.95rem}
.zoneList .ic{width:17px;height:17px;color:var(--acc);flex:none;margin-top:4px}

/* ===================== faq ===================== */
.faq{display:grid;gap:10px;max-width:860px}
.q{border:1px solid var(--line);border-radius:14px;background:rgba(16,26,46,.4);
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);overflow:hidden;transition:border-color .4s var(--ease)}
.q.open{border-color:var(--line2)}
.qBtn{width:100%;display:flex;align-items:center;gap:16px;justify-content:space-between;
  padding:17px 20px;background:none;border:0;color:var(--txt);cursor:pointer;text-align:left;
  font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:500;letter-spacing:-.01em}
.chev{width:20px;height:20px;flex:none;color:var(--acc);transition:transform .45s var(--ease)}
.q.open .chev{transform:rotate(180deg)}
.qA{max-height:0;overflow:hidden;transition:max-height .5s var(--ease),opacity .4s var(--ease);opacity:0}
.q.open .qA{max-height:420px;opacity:1}
.qA p{padding:0 20px 19px;color:var(--mut);font-size:.95rem;max-width:64ch}

/* ===================== contatti ===================== */
/* fascia contatti: foto d'aeroporto a tutta larghezza, vetro davanti */
.contact{padding:clamp(64px,10vw,120px) 0 clamp(48px,8vw,90px);position:relative;overflow:hidden}
.ctPh{position:absolute;inset:0;z-index:0;background-color:#070D1C}
.ctPh::after{
  background:
    linear-gradient(180deg,#060B18 0%,rgba(6,11,24,.80) 14%,rgba(6,11,24,.70) 46%,rgba(6,11,24,.90) 84%,rgba(6,11,24,.97) 100%),
    radial-gradient(95% 70% at 50% 40%,transparent,rgba(6,11,24,.70));
}
.contact .wrap{z-index:2}
.ctLine{position:absolute;z-index:1;left:0;right:0;top:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(95,212,255,.55),transparent)}
.cGrid{display:grid;gap:16px}
@media(min-width:900px){.cGrid{grid-template-columns:1.1fr .9fr}}
.cMain{padding:clamp(26px,4vw,42px)}
.cMain h2{font-size:clamp(1.7rem,4.4vw,2.6rem);margin-bottom:14px}
.cMain p{color:var(--mut);max-width:48ch}
.cBtns{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.cInfo{display:grid;gap:0;padding:clamp(20px,3vw,28px);align-content:start}
.cItem{display:flex;gap:14px;align-items:flex-start;padding:16px 0;border-bottom:1px solid var(--line)}
.cItem:last-child{border-bottom:none}
.cItem .ic{width:19px;height:19px;color:var(--acc);flex:none;margin-top:3px}
.cItem .k{display:block;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--mut2);margin-bottom:3px}
.cItem .v{font-family:'Space Grotesk',sans-serif;font-size:1.02rem;color:var(--txt);word-break:break-word}
a.cItem:hover .v{color:var(--acc)}

/* ===================== footer ===================== */
footer{border-top:1px solid var(--line);padding:34px 0 calc(30px + env(safe-area-inset-bottom));background:rgba(4,8,18,.6)}
.ft{display:flex;flex-wrap:wrap;gap:14px 24px;align-items:center;justify-content:space-between}
.ft p{font-size:.84rem;color:var(--mut2)}
.ft .umb{display:inline-flex;align-items:center;gap:8px;font-size:.78rem;letter-spacing:.16em;
  text-transform:uppercase;color:var(--mut2)}
.ft .umb i{width:6px;height:6px;border-radius:50%;background:var(--acc);opacity:.7;display:block}

/* ===================== barra CTA mobile ===================== */
.bar{
  position:fixed;left:0;right:0;bottom:0;z-index:70;display:flex;gap:10px;
  padding:10px 12px calc(10px + env(safe-area-inset-bottom));
  background:rgba(6,11,24,.86);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
  border-top:1px solid var(--line);
  transform:translateY(120%);transition:transform .5s var(--ease);
}
.bar.on{transform:none}
.bar .btn{flex:1;padding:13px 12px;font-size:.92rem}
@media(min-width:760px){.bar{display:none}}
@media(max-width:759px){body{padding-bottom:calc(78px + env(safe-area-inset-bottom))}}

/* ===================== reveal ===================== */
.reveal{opacity:0;transform:translateY(22px);
  transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.reveal.in{opacity:1;transform:none}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important}
  .reveal{opacity:1;transform:none}
  .node{opacity:1;transform:none}
  .bar{transform:none}
  #trails{opacity:1}
}
</style>
</head>
<body>

<header id="hd">
  <div class="wrap hd">
    <a class="brand" href="#top" aria-label="${name}, torna in cima">
      <span class="mono" aria-hidden="true">${mono}</span>
      <span class="brandTxt">
        <b>${name}</b>
        <span>${ty(c.kicker)}</span>
      </span>
    </a>
    <div class="hdR">
      ${rating ? `<span class="hdChip">${svgIco('stella')}<b>${rating}</b> su Google${reviews ? ` · ${reviews} recensioni` : ''}</span>` : ''}
      <a class="btn ghost hdTel" href="tel:${tel}" aria-label="Chiama ${name} al numero ${phone}">${svgIco('tel')}<span>${phone}</span></a>
      ${wa ? `<a class="btn primary" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${name}">${svgIco('chat')}<span>WhatsApp</span></a>` : ''}
    </div>
  </div>
</header>

<main id="top">

  <!-- ============ HERO ============ -->
  <section class="hero">
    <div class="ph heroPh">
      ${shot(heroPic, {
        w: 1920, q: 72, eager: true,
        alt: (heroPic ? heroPic.alt : '') + ' in una notte di città',
        sizes: '100vw'
      })}
      <span class="bloom" aria-hidden="true"></span>
    </div>
    <canvas id="trails" aria-hidden="true"></canvas>
    <div class="wrap heroGrid">
      <div>
        <span class="kick">${ty(c.kicker)} · ${city}</span>
        <h1 class="hName">${name}</h1>
        <p class="hClaim">${ty(c.heroA)} <em>${ty(c.heroB)}</em>.</p>
        <p class="hLede">${ty(c.lede)}</p>
        <div class="hCta">
          ${ctaWa('lg')}
          <a class="btn ghost lg" href="tel:${tel}" aria-label="Chiama ${name} al numero ${phone}">${svgIco('tel')}<span>${phone}</span></a>
        </div>
        <p class="hNote">${svgIco('orologio')}<span>Le partenze all’alba si concordano la sera prima: l’orario lo scegliete voi.</span></p>
      </div>

      <aside class="glass onPhoto card panel reveal" style="--d:120ms" aria-label="Stato del servizio">
        <div class="pTop">
          <span class="clock"><b id="clock">--:--</b><span>ora locale</span></span>
          ${svgIco('orologio')}
        </div>
        <div class="pRow">
          ${svgIco('pin')}
          <span><span class="k">Zona operativa</span><span class="v">${city}</span></span>
        </div>
        ${rating ? `<div class="pRow">
          ${svgIco('stella')}
          <span><span class="k">Valutazione Google</span><span class="v">${rating}${reviews ? `<small>${reviews} recensioni</small>` : ''}</span></span>
        </div>` : ''}
        <div class="pRow">
          ${svgIco('auto')}
          <span><span class="k">Categoria</span><span class="v">${ty(lead.category)}</span></span>
        </div>
        <p class="live"><span class="pulse" aria-hidden="true"></span>Disponibile su prenotazione</p>
      </aside>
    </div>
  </section>

  <!-- ============ FASCIA DI PROVA ============ -->
  <section class="proof">
    <div class="wrap">
      <div class="glass proofIn reveal">
        <div class="stats">${stats}
        </div>
        <div class="proofTxt">
          <b>${ty(c.proof[0])}</b>
          <p>${ty(c.proof[1])}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ SERVIZI ============ -->
  <section class="block" id="servizi">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Servizi</p>
        <h2 class="sec">Quello che facciamo,<br>detto senza giri di parole</h2>
        <p class="lead">Ogni servizio parte da un messaggio e da un preventivo concordato prima. Il resto è guidare bene e arrivare in orario.</p>
      </div>
      <div class="grid four">${services}
      </div>
    </div>
  </section>

  <!-- ============ NOTTE / AEROPORTO ============ -->
  <section class="night" id="aeroporto">
    <div class="ph nightPh">
      ${shot(nightPic, {
        w: 1800, q: 70,
        alt: nightPic ? nightPic.alt : '',
        sizes: '100vw'
      })}
      <span class="grain" aria-hidden="true"></span>
    </div>
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Transfer aeroportuale</p>
        <h2 class="sec">Dal gate alla portiera,<br>senza un momento di vuoto</h2>
        <p class="lead">Il volo delle sei del mattino è quello che spaventa tutti. Qui è semplicemente un orario: si concorda, si monitora, si parte.</p>
      </div>

      <div class="tl" id="tl">
        <div class="rail" aria-hidden="true"><i id="railFill"></i></div>
        <ol class="nodes">${timeline}
        </ol>
      </div>
      ${waNight ? `<div class="hCta"><a class="btn ghost" href="${waNight}" target="_blank" rel="noopener" aria-label="Mandate i dati del volo su WhatsApp">${svgIco('volo')}<span>Mandateci i dati del volo</span></a></div>` : ''}

      <div class="carWrap">
        ${carRear}
        <p class="carCap">Alle cinque del mattino il parcheggio è vuoto e l’auto è già lì, con i fari accesi.</p>
      </div>
    </div>
  </section>

  <!-- ============ FLOTTA ============ -->
  <section class="block" id="flotta">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Vetture</p>
        <h2 class="sec">Si sceglie in base<br>a quante valigie avete</h2>
        <p class="lead">Ditecelo prima: quante persone, quanti bagagli, quanta strada. La vettura giusta ve la indichiamo noi, insieme al preventivo.</p>
      </div>
      <div class="rail2">${fleet}
      </div>
      ${waFleet ? `<div class="hCta"><a class="btn ghost" href="${waFleet}" target="_blank" rel="noopener" aria-label="Chiedete la disponibilità su WhatsApp">${svgIco('chat')}<span>Chiedete la disponibilità</span></a></div>` : ''}
    </div>
  </section>

  <!-- ============ COME FUNZIONA ============ -->
  <section class="block" id="come">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Come funziona</p>
        <h2 class="sec">Tre passaggi, nessuna app<br>da scaricare</h2>
      </div>
      <ol class="steps">${steps}
      </ol>
      ${insetPic ? `<figure class="ph inset glow reveal" style="--d:120ms">
        ${shot(insetPic, {
          w: 1600, q: 74,
          alt: insetPic.alt,
          sizes: '(max-width:1180px) 92vw, 1100px'
        })}
        <figcaption class="insetCap">
          ${svgIco('orologio')}
          <span>Dentro l’auto la conversazione la decidete voi: si può parlare o si può stare in silenzio fino a destinazione.</span>
        </figcaption>
      </figure>` : ''}
    </div>
  </section>

  <!-- ============ ZONA OPERATIVA ============ -->
  <section class="block" id="zona">
    <div class="wrap zone">
      <div class="radar">
        <div class="ph radarPh">
          ${shot(zonaPic, {
            w: 900, q: 74,
            alt: zonaPic ? zonaPic.alt : '',
            sizes: '(max-width:899px) 78vw, 380px'
          })}
        </div>
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        <span class="core" aria-hidden="true"><span>Zona operativa</span><b>${city}</b></span>
      </div>
      <div>
        <p class="eyebrow">Dove lavoriamo</p>
        <h2 class="sec">Partenza da ${city},<br>destinazione la vostra</h2>
        <p class="lead">Lavoriamo su ${city} e da qui si parte per aeroporti, stazioni, porti e trasferimenti fuori città: la destinazione la decidete voi, il percorso e i tempi li concordiamo insieme prima di confermare.</p>
        <ul class="zoneList">
          <li>${svgIco('volo')}<span>Transfer da e per gli aeroporti, con l’orario calcolato sul volo e non sull’ora di sveglia.</span></li>
          <li>${svgIco('auto')}<span>Trasferimenti a lunga percorrenza con preventivo fisso concordato prima della partenza.</span></li>
          <li>${svgIco('orologio')}<span>Servizio a disposizione oraria quando la giornata ha più tappe di quante ne stiano in un preventivo.</span></li>
        </ul>
      </div>
    </div>
  </section>

  <!-- ============ FAQ ============ -->
  <section class="block" id="faq">
    <div class="wrap">
      <div class="head">
        <p class="eyebrow">Domande</p>
        <h2 class="sec">Le risposte, prima<br>che ce le chiediate</h2>
      </div>
      <div class="faq">${faq}
      </div>
    </div>
  </section>

  <!-- ============ CONTATTI ============ -->
  <section class="contact" id="contatti">
    <div class="ph ctPh">
      ${shot(contactPic, {
        w: 1800, q: 70,
        alt: contactPic ? contactPic.alt : '',
        sizes: '100vw'
      })}
      <span class="bloom" aria-hidden="true"></span>
    </div>
    <span class="ctLine" aria-hidden="true"></span>
    <div class="wrap cGrid">
      <div class="glass onPhoto card cMain reveal">
        <p class="eyebrow">Contatti</p>
        <h2>Scriveteci l’orario.<br>Al resto pensiamo noi.</h2>
        <p>Un messaggio con data, ora e destinazione è tutto quello che serve per avere un preventivo. Anche se l’orario che avete in mente è uno di quelli scomodi, che non piacciono a nessuno.</p>
        <div class="cBtns">
          ${ctaWa('lg')}
          <a class="btn ghost lg" href="tel:${tel}" aria-label="Chiama ${name} al numero ${phone}">${svgIco('tel')}<span>${phone}</span></a>
        </div>
      </div>
      <div class="glass onPhoto cInfo reveal" style="--d:120ms">
        ${wa ? `<a class="cItem" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${name}">
          ${svgIco('chat')}
          <span><span class="k">WhatsApp</span><span class="v">Preventivo in chat</span></span>
        </a>` : ''}
        <a class="cItem" href="tel:${tel}" aria-label="Chiama ${name} al numero ${phone}">
          ${svgIco('tel')}
          <span><span class="k">Telefono</span><span class="v">${phone}</span></span>
        </a>
        ${lead.address ? `<div class="cItem">
          ${svgIco('pin')}
          <span><span class="k">Indirizzo</span><span class="v">${ty(lead.address)}</span></span>
        </div>` : ''}
        <div class="cItem">
          ${svgIco('pin')}
          <span><span class="k">Zona operativa</span><span class="v">${city}</span></span>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap ft">
    <p>© <span id="yr">2026</span> ${name} · ${city}</p>
    <span class="umb"><i aria-hidden="true"></i>Anteprima realizzata da Umbra</span>
  </div>
</footer>

<nav class="bar" id="bar" aria-label="Contatti rapidi">
  ${wa ? `<a class="btn primary" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${name}">${svgIco('chat')}<span>WhatsApp</span></a>` : ''}
  <a class="btn ghost" href="tel:${tel}" aria-label="Chiama ${name} al numero ${phone}">${svgIco('tel')}<span>Chiama</span></a>
</nav>

<script>
(function(){
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- orario reale ---------- */
  var clock = document.getElementById('clock');
  function tick(){
    if(!clock) return;
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    clock.textContent = (h<10?'0':'')+h+':'+(m<10?'0':'')+m;
  }
  tick(); setInterval(tick, 15000);
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  /* ---------- header + barra mobile ---------- */
  var hd = document.getElementById('hd'), bar = document.getElementById('bar'), last = -1;
  function onScroll(){
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var s = y > 24 ? 1 : 0;
    if(s !== last){ last = s; if(hd) hd.classList.toggle('on', !!s); }
    if(bar) bar.classList.toggle('on', y > 80);
  }
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ---------- reveal ---------- */
  var revs = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var ro = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -8% 0px', threshold:.12});
    for(var i=0;i<revs.length;i++) ro.observe(revs[i]);
  } else {
    for(var j=0;j<revs.length;j++) revs[j].classList.add('in');
  }

  /* ---------- ancore con scorrimento morbido (solo sui click) ---------- */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for(var a=0;a<anchors.length;a++){
    anchors[a].addEventListener('click', function(ev){
      var id = (this.getAttribute('href') || '').slice(1);
      if(!id) return;
      var t = document.getElementById(id);
      if(!t) return;
      ev.preventDefault();
      try { t.scrollIntoView({behavior: RM ? 'auto' : 'smooth', block:'start'}); }
      catch(e){ t.scrollIntoView(); }
    });
  }

  /* ---------- FAQ ---------- */
  var qs = document.querySelectorAll('.qBtn');
  for(var k=0;k<qs.length;k++){
    qs[k].addEventListener('click', function(){
      var box = this.parentNode, open = box.classList.contains('open');
      var all = document.querySelectorAll('.q.open');
      for(var n=0;n<all.length;n++){
        all[n].classList.remove('open');
        all[n].querySelector('.qBtn').setAttribute('aria-expanded','false');
      }
      if(!open){ box.classList.add('open'); this.setAttribute('aria-expanded','true'); }
    });
  }

  /* ---------- timeline: la linea si accende scorrendo ---------- */
  var tl = document.getElementById('tl'), fill = document.getElementById('railFill');
  if(tl && fill){
    var nodes = tl.querySelectorAll('.node'), tlOn = false, ticking = false;
    function tlUpdate(){
      ticking = false;
      var r = tl.getBoundingClientRect(), vh = innerHeight || 1;
      var p = (vh * 0.82 - r.top) / Math.max(1, r.height * 0.82);
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      fill.style.setProperty('--p', (p*100).toFixed(1)+'%');
      for(var n=0;n<nodes.length;n++){
        nodes[n].classList.toggle('on', p >= (n + 0.35) / nodes.length);
      }
    }
    function tlScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(tlUpdate); } }
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(es){
        es.forEach(function(e){
          if(e.isIntersecting && !tlOn){ tlOn = true; addEventListener('scroll', tlScroll, {passive:true}); tlUpdate(); }
          else if(!e.isIntersecting && tlOn){ tlOn = false; removeEventListener('scroll', tlScroll); }
        });
      }, {rootMargin:'120px 0px 120px 0px'}).observe(tl);
    } else {
      fill.style.setProperty('--p','100%');
      for(var q=0;q<nodes.length;q++) nodes[q].classList.add('on');
    }
    if(RM){
      fill.style.setProperty('--p','100%');
      for(var w=0;w<nodes.length;w++) nodes[w].classList.add('on');
    }
  }

  /* ---------- canvas: scie luminose in lunga esposizione ---------- */
  var cv = document.getElementById('trails');
  var ctx = cv && cv.getContext ? cv.getContext('2d') : null;
  if(ctx){
    var W = 0, H = 0, dpr = 1, trails = [], raf = 0, running = false, prev = 0;

    function rnd(a,b){ return a + Math.random()*(b-a); }

    function make(i, n, spread){
      var narrow = innerWidth < 700;
      var dir = Math.random() < 0.58 ? 1 : -1;
      var amber = (i % 4 === 1);
      var len = W * rnd(0.22, 0.6);
      return {
        y: H * ((i + rnd(0.15,0.85)) / n),
        dir: dir,
        len: len,
        w: rnd(1, narrow ? 2.2 : 3),
        sp: rnd(0.55, 2.1) * (narrow ? 0.75 : 1),
        a: rnd(0.28, 0.72),
        amber: amber,
        x: spread ? rnd(-len, W + len) : (dir > 0 ? -len : W + len)
      };
    }

    function build(spread){
      var n = innerWidth < 700 ? 4 : 9;
      trails = [];
      for(var i=0;i<n;i++) trails.push(make(i, n, spread));
    }

    function size(){
      var r = cv.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, innerWidth < 700 ? 1.5 : 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function stroke(t){
      var x0 = t.dir > 0 ? t.x - t.len : t.x;
      var x1 = x0 + t.len;
      if(x1 < -8 || x0 > W + 8) return;
      var g = ctx.createLinearGradient(x0, 0, x1, 0);
      var col = t.amber ? '255,196,107' : '150,226,255';
      if(t.dir > 0){
        g.addColorStop(0, 'rgba('+col+',0)');
        g.addColorStop(0.62, 'rgba('+col+','+(t.a*0.32).toFixed(3)+')');
        g.addColorStop(0.94, 'rgba('+col+','+t.a.toFixed(3)+')');
        g.addColorStop(1, 'rgba('+col+',0)');
      } else {
        g.addColorStop(0, 'rgba('+col+',0)');
        g.addColorStop(0.06, 'rgba('+col+','+t.a.toFixed(3)+')');
        g.addColorStop(0.38, 'rgba('+col+','+(t.a*0.32).toFixed(3)+')');
        g.addColorStop(1, 'rgba('+col+',0)');
      }
      ctx.strokeStyle = g;
      ctx.lineCap = 'round';
      /* alone morbido = sfocatura simulata */
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = t.w * 7;
      ctx.beginPath(); ctx.moveTo(x0, t.y); ctx.lineTo(x1, t.y); ctx.stroke();
      ctx.globalAlpha = 0.34;
      ctx.lineWidth = t.w * 3;
      ctx.beginPath(); ctx.moveTo(x0, t.y); ctx.lineTo(x1, t.y); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.lineWidth = t.w;
      ctx.beginPath(); ctx.moveTo(x0, t.y); ctx.lineTo(x1, t.y); ctx.stroke();
    }

    function paint(){
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for(var i=0;i<trails.length;i++) stroke(trails[i]);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

    function frame(now){
      if(!running){ raf = 0; return; }
      var dt = prev ? Math.min(48, now - prev) : 16.7;
      prev = now;
      var n = trails.length;
      for(var i=0;i<n;i++){
        var t = trails[i];
        t.x += t.dir * t.sp * (dt / 16.7);
        if(t.dir > 0 && t.x - t.len > W + 10) trails[i] = make(i, n, false);
        else if(t.dir < 0 && t.x + t.len < -10) trails[i] = make(i, n, false);
      }
      paint();
      raf = requestAnimationFrame(frame);
    }

    function start(){
      if(running || RM) return;
      running = true; prev = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop(){
      running = false;
      if(raf){ cancelAnimationFrame(raf); raf = 0; }
    }

    size(); build(true); paint();
    requestAnimationFrame(function(){ cv.classList.add('on'); });

    if(!RM){
      if('IntersectionObserver' in window){
        new IntersectionObserver(function(es){
          es.forEach(function(e){ if(e.isIntersecting) start(); else stop(); });
        }, {threshold:0}).observe(cv);
      } else { start(); }
      document.addEventListener('visibilitychange', function(){
        if(document.hidden) stop();
        else if(cv.getBoundingClientRect().bottom > 0) start();
      });
    }

    var rt = 0, lastW = 0, lastH = 0;
    function refit(){
      clearTimeout(rt);
      rt = setTimeout(function(){
        var r = cv.getBoundingClientRect();
        if(Math.abs(r.width - lastW) < 2 && Math.abs(r.height - lastH) < 2) return;
        lastW = r.width; lastH = r.height;
        var wasRunning = running;
        stop(); size(); build(true); paint();
        if(wasRunning) start();
      }, 180);
    }
    addEventListener('resize', refit, {passive:true});
    addEventListener('load', refit);
    /* il caricamento dei font può cambiare l'altezza dell'hero */
    if(window.ResizeObserver) new ResizeObserver(refit).observe(cv);
  }

  /* ---------- rete di sicurezza fotografica ----------
     se una foto non arriva, sparisce e sotto resta il fondo notturno del tema */
  document.querySelectorAll('img[data-photo-slot]').forEach(function(im){
    im.addEventListener('error', function(){ im.style.display = 'none'; });
  });
})();
</script>
${intro}
</body>
</html>`;
};

window.U.m["notturno"]=module.exports;})();
