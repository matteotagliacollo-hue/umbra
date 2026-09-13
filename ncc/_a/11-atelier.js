window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "Atelier" — editoriale di moda, carta e inchiostro.
 *
 * Art direction: rivista di lusso stampata bene. Avorio caldo, inchiostro,
 * un solo accento (verde bottiglia). Serif da display ad alto contrasto in
 * corpo enorme e peso leggero, etichette in maiuscoletto sans spaziato .28em.
 * Griglia asimmetrica, filetti da 1px, rivelazioni con maschera, cambio pagina.
 *
 * Nessun fatto inventato: si usano solo i campi reali del lead e il motore di copy.
 */

const { esc } = require('../lib/content.js');

/* escape + apostrofo tipografico italiano */
const T = s => esc(s).replace(/'/g, '’');

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

/* Didascalie delle tavole fotografiche: descrivono la fotografia e basta.
   Non attribuiscono la vettura al cliente — sono immagini di repertorio,
   e in fondo alla pagina lo diciamo. */
const CAP = {
  berlina: 'Berlina executive',
  van: 'Van premium',
  autista: 'L’autista, in attesa',
  interni: 'Interni, dettaglio',
  supercar: 'Vettura di prestigio',
  matrimonio: 'Allestimento per cerimonia',
  aeroporto: 'Terminal, partenze',
  strada: 'Strada, Nord Italia',
  citta: 'Milano, scorcio',
  notturno: 'Città, di notte'
};

/* Tavola: fotografia in formato verticale + didascalia tipografica.
   La foto può sbordare oltre la griglia da un lato solo (bleed);
   la didascalia resta allineata alla colonna di testo. */
function plate(pic, roman, o) {
  o = o || {};
  return `<figure class="ph-fig${o.cls ? ' ' + o.cls : ''}" data-r>
        <div class="ph ${o.ratio || 'ph-45'}${o.bleed ? ' ' + o.bleed : ''} fade">
          ${o.engr || ''}
          ${pic.tag({ w: o.w || 1200, q: o.q || 78, sizes: o.sizes, eager: !!o.eager })}
        </div>
        <figcaption class="ph-cap fade" style="--d:.1s"><b>Tav.&nbsp;${roman}</b> — ${CAP[pic.cat] || 'Fotografia'}</figcaption>
      </figure>`;
}

/* Larghezza stimata di una stringa in em, con le proporzioni di un garaldo
   ad alto contrasto. Serve a far sì che il titolone stia sempre su una riga:
   la misura della colonna diventa la misura del carattere. */
function emWidth(s) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += 0.22;
    else if ('iljtfrscz'.indexOf(ch) > -1) w += 0.30;
    else if (ch === 'I') w += 0.38;
    else if (ch === 'm' || ch === 'w') w += 0.72;
    else if (ch === 'M' || ch === 'W') w += 0.86;
    else if (ch >= 'A' && ch <= 'Z') w += 0.62;
    else if (ch >= '0' && ch <= '9') w += 0.50;
    else if ('.,;:!?\'’"«»-–—()'.indexOf(ch) > -1) w += 0.26;
    else w += 0.44;
  }
  return w;
}
const fit = n => Math.max(2, Math.round((n + 0.35) * 100) / 100);

function initials(name) {
  const stop = ['di', 'da', 'de', 'del', 'della', 'con', 'e', 'il', 'lo', 'la', 'i', 'gli', 'le', 'a', 'per'];
  const w = String(name).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/)
    .filter(x => x && stop.indexOf(x.toLowerCase()) === -1);
  if (!w.length) return 'A';
  const a = w[0][0];
  const b = w.length > 1 ? w[1][0] : (w[0][1] || '');
  return (a + b).toUpperCase();
}

/* ——— incisioni SVG disegnate a mano ——— */

/* vettura di tre quarti, linea continua, stile incisione */
const CAR_3Q = `<svg class="engr" data-draw viewBox="0 0 960 430" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M104 318 C96 292 98 262 120 248 L236 234 C266 186 322 154 404 148 L566 150 C614 156 652 186 682 220 L800 236 C838 244 858 264 862 292 C866 312 856 322 838 322 L774 322"/>
    <path d="M774 322 C770 276 738 250 706 250 C674 250 642 276 638 322"/>
    <path d="M638 322 L354 322"/>
    <path d="M354 322 C350 276 318 250 286 250 C254 250 222 276 218 322"/>
    <path d="M218 322 L104 318"/>
    <path d="M262 236 C296 190 344 166 404 162 L556 164 C598 170 630 194 656 224 Z" opacity=".85"/>
    <path d="M430 163 L436 226" opacity=".7"/>
    <path d="M540 164 L556 225" opacity=".7"/>
    <path d="M240 236 L664 226" opacity=".55"/>
    <path d="M806 240 C826 250 838 264 842 280" opacity=".6"/>
    <path d="M796 262 L850 268" opacity=".8"/>
    <path d="M120 272 L182 276" opacity=".8"/>
    <circle cx="286" cy="296" r="52"/><circle cx="286" cy="296" r="24" opacity=".8"/>
    <circle cx="706" cy="296" r="52"/><circle cx="706" cy="296" r="24" opacity=".8"/>
    <path d="M286 244 L286 268 M286 324 L286 348 M234 296 L258 296 M314 296 L338 296" opacity=".55"/>
    <path d="M706 244 L706 268 M706 324 L706 348 M654 296 L678 296 M734 296 L758 296" opacity=".55"/>
    <path d="M196 150 C246 118 312 100 392 98 L556 100" opacity=".4"/>
    <path d="M196 150 L172 214" opacity=".4"/>
    <path d="M556 100 C602 108 640 132 668 162" opacity=".4"/>
    <path d="M60 348 L900 348" opacity=".5"/>
    <path d="M150 366 L470 366 M520 366 L720 366 M760 366 L862 366" opacity=".3"/>
    <path d="M210 384 L400 384 M600 384 L800 384" opacity=".2"/>
  </g>
</svg>`;

/* frontale simmetrico */
const CAR_FRONT = `<svg class="engr" data-draw viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M74 190 C66 160 70 128 86 116 L120 62 C130 44 152 36 210 36 C268 36 290 44 300 62 L334 116 C350 128 354 160 346 190"/>
    <path d="M86 116 L334 116" opacity=".7"/>
    <path d="M124 68 C144 56 276 56 296 68" opacity=".6"/>
    <path d="M92 140 C110 132 140 130 158 134" opacity=".85"/>
    <path d="M328 140 C310 132 280 130 262 134" opacity=".85"/>
    <path d="M172 148 L248 148 M166 162 L254 162 M176 176 L244 176" opacity=".6"/>
    <path d="M74 190 L74 214 M346 190 L346 214" opacity=".8"/>
    <path d="M74 202 L346 202" opacity=".5"/>
    <path d="M40 236 L380 236" opacity=".45"/>
    <path d="M96 250 L200 250 M240 250 L330 250" opacity=".25"/>
  </g>
</svg>`;

/* profilo alto, van */
const VAN_SIDE = `<svg class="engr" data-draw viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M44 194 C38 150 42 96 56 76 C70 56 108 42 168 40 L286 42 C314 44 336 62 356 96 L374 128 C384 146 384 174 378 194"/>
    <path d="M378 194 C374 164 356 148 334 148 C312 148 294 164 290 194"/>
    <path d="M290 194 L166 194"/>
    <path d="M166 194 C162 164 144 148 122 148 C100 148 82 164 78 194"/>
    <path d="M78 194 L44 194"/>
    <path d="M66 78 L294 74 C314 82 330 100 344 122 L66 126 Z" opacity=".8"/>
    <path d="M150 76 L150 126 M232 75 L232 125" opacity=".6"/>
    <path d="M60 140 L360 136" opacity=".45"/>
    <circle cx="122" cy="170" r="30"/><circle cx="122" cy="170" r="13" opacity=".8"/>
    <circle cx="334" cy="170" r="30"/><circle cx="334" cy="170" r="13" opacity=".8"/>
    <path d="M24 216 L400 216" opacity=".45"/>
    <path d="M70 232 L230 232 M270 232 L360 232" opacity=".25"/>
  </g>
</svg>`;

/* rosone: cerchio, raggi, incisione */
const WHEEL = `<svg class="engr" data-draw viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <circle cx="210" cy="126" r="94"/><circle cx="210" cy="126" r="78" opacity=".8"/>
    <circle cx="210" cy="126" r="34" opacity=".9"/><circle cx="210" cy="126" r="13" opacity=".7"/>
    <path d="M210 48 L210 92 M210 160 L210 204 M132 126 L176 126 M244 126 L288 126" opacity=".75"/>
    <path d="M155 71 L186 102 M234 150 L265 181 M265 71 L234 102 M186 150 L155 181" opacity=".55"/>
    <path d="M118 126 A92 92 0 0 1 210 34" opacity=".35"/>
    <path d="M302 126 A92 92 0 0 1 210 218" opacity=".35"/>
    <path d="M40 240 L380 240" opacity=".4"/>
    <path d="M96 252 L200 252 M240 252 L332 252" opacity=".22"/>
  </g>
</svg>`;

/* minibus, profilo lungo */
const MINIBUS = `<svg class="engr" data-draw viewBox="0 0 420 260" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M28 196 C22 148 24 86 34 66 C44 46 78 38 140 36 L312 38 C342 40 362 58 376 84 L390 116 C398 136 398 172 392 196"/>
    <path d="M392 196 C388 168 372 152 350 152 C328 152 312 168 308 196"/>
    <path d="M308 196 L140 196"/>
    <path d="M140 196 C136 168 120 152 98 152 C76 152 60 168 56 196"/>
    <path d="M56 196 L28 196"/>
    <path d="M44 70 L318 66 C340 76 356 94 370 116 L44 120 Z" opacity=".8"/>
    <path d="M110 68 L110 120 M176 67 L176 119 M242 66 L242 118 M308 66 L308 117" opacity=".55"/>
    <path d="M38 138 L380 134" opacity=".45"/>
    <circle cx="98" cy="174" r="26"/><circle cx="98" cy="174" r="11" opacity=".8"/>
    <circle cx="350" cy="174" r="26"/><circle cx="350" cy="174" r="11" opacity=".8"/>
    <path d="M14 218 L406 218" opacity=".45"/>
    <path d="M60 234 L226 234 M266 234 L368 234" opacity=".25"/>
  </g>
</svg>`;

/* strada in prospettiva: fondo inciso della doppia pagina */
const ROAD = `<svg class="engr" data-draw viewBox="0 0 960 420" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M60 238 L900 238" opacity=".5"/>
    <path d="M40 412 L468 242"/>
    <path d="M920 412 L492 242"/>
    <path d="M480 412 L480 374 M480 356 L480 328 M480 314 L480 294 M480 284 L480 270 M480 264 L480 254" opacity=".7"/>
    <path d="M150 372 L214 348 M746 372 L682 348 M262 316 L306 300 M634 316 L590 300" opacity=".4"/>
    <circle cx="748" cy="150" r="42" opacity=".45"/>
    <circle cx="748" cy="150" r="27" opacity=".2"/>
    <path d="M120 194 L840 194" opacity=".2"/>
    <path d="M196 166 L780 166" opacity=".15"/>
    <path d="M262 138 L620 138" opacity=".12"/>
    <path d="M60 262 L900 262" opacity=".18"/>
  </g>
</svg>`;

/* profilo di città: fondo inciso della zona operativa */
const SKYLINE = `<svg class="engr" data-draw viewBox="0 0 420 300" fill="none" aria-hidden="true" focusable="false">
  <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <path d="M18 268 L402 268" opacity=".5"/>
    <path d="M40 268 L40 192 L96 192 L96 268"/>
    <path d="M96 268 L96 148 L152 148 L152 268"/>
    <path d="M152 268 L152 214 L196 214 L196 268" opacity=".85"/>
    <path d="M210 268 L210 122 L214 92 L218 122 L218 268"/>
    <path d="M232 268 L232 178 L288 178 L288 268" opacity=".9"/>
    <path d="M288 268 L288 208 L338 208 L338 268" opacity=".85"/>
    <path d="M338 268 L338 162 L384 162 L384 268"/>
    <path d="M54 210 L82 210 M54 230 L82 230 M110 168 L138 168 M110 190 L138 190 M110 212 L138 212" opacity=".45"/>
    <path d="M246 198 L274 198 M246 220 L274 220 M352 182 L372 182 M352 204 L372 204" opacity=".45"/>
    <path d="M60 62 L360 62" opacity=".16"/>
    <path d="M108 86 L312 86" opacity=".12"/>
    <path d="M18 284 L402 284" opacity=".22"/>
  </g>
</svg>`;

/* la vettura disegnata non deve mai smentire il nome della categoria:
   i mezzi alti prendono un profilo alto, gli altri ruotano fra tre incisioni. */
function fleetArt(list) {
  const tall = /van|minibus|navett|monovolume|bus|pulmino/i;
  const rest = [CAR_FRONT, WHEEL, CAR_3Q];
  let tallSeen = 0, restSeen = 0;
  return list.map(([n]) => {
    if (tall.test(String(n))) return (tallSeen++ === 0) ? VAN_SIDE : MINIBUS;
    return rest[restSeen++ % rest.length];
  });
}

module.exports = function render(lead, c, intro) {
  const name = T(lead.name);
  const city = T(lead.city);
  const tel = esc(lead.tel);
  const phone = T(lead.phoneDisplay);
  const wa = lead.whatsapp ? esc(lead.whatsapp) : null;
  const rating = lead.rating ? T(lead.rating) : null;
  const reviews = Number(lead.reviews) > 0 ? Number(lead.reviews) : 0;
  const address = lead.address ? T(lead.address) : null;
  const mono = T(initials(lead.name));
  const kicker = T(c.kicker);

  const revW = n => (n === 1 ? 'recensione' : 'recensioni');

  /* lo scorcio di Milano esiste solo per i lead milanesi: altrove
     la tavola della zona operativa diventa una strada di città, di notte */
  const zonePic = c.pics.citta || c.pics.notturno;

  /* misura del titolone: la riga più larga detta il corpo, così le tre righe
     restano tre righe su qualunque schermo */
  const hn = fit(Math.max(
    emWidth(c.heroA),
    emWidth(c.heroB) + 0.30,
    emWidth(lead.city) + 1.20
  ));
  const zn = fit(emWidth(lead.city));

  /* riga dati dell'hero: solo dati reali */
  const heroData = [city];
  if (rating) heroData.push(rating + ' su Google' + (reviews ? ' · ' + reviews + ' ' + revW(reviews) : ''));
  else if (reviews) heroData.push(reviews + ' ' + revW(reviews) + ' Google');
  heroData.push(phone);

  const waBtn = (cls, label) => wa
    ? `<a class="${cls}" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ${name}">${label}</a>`
    : '';

  const services = c.services.map(([t, d], i) => `
      <article class="svc" data-r style="--d:${(i % 2) * 0.08}s">
        <div class="svc-n"><span class="lbl">${String(i + 1).padStart(2, '0')}</span></div>
        <h3 class="svc-t"><span class="mask"><span>${T(t)}</span></span></h3>
        <p class="svc-d fade">${T(d)}</p>
      </article>`).join('');

  const art = fleetArt(c.fleet);
  const fleet = c.fleet.map(([n, size, d], i) => `
      <article class="car" data-r style="--d:${i * 0.09}s">
        <div class="car-art ph ph-45 fade">
          ${art[i]}
          ${(c.pics.fleet[i] || c.pics.hero).tag({ w: 900, q: 78, sizes: '(max-width:899px) 80vw, 30vw' })}
          <span class="car-num">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <div class="car-meta">
          <h3 class="car-t"><span class="mask"><span>${T(n)}</span></span></h3>
          <p class="lbl car-s">${T(size)}</p>
          <p class="car-d fade">${T(d)}</p>
        </div>
      </article>`).join('');

  const steps = [
    ['Si scrive', 'Un messaggio su WhatsApp con data, orario, luogo di partenza e destinazione: sono le uniche quattro cose che ci servono per cominciare.'],
    ['Si riceve il preventivo', 'Rispondiamo con la vettura adatta e una cifra concordata, che resta quella fino alla fine del servizio.'],
    ['Si viaggia', 'All’ora stabilita l’auto è già lì. Da quel momento in poi non dovete più occuparvi di nulla.']
  ].map(([t, d], i) => `
      <li class="step" data-r style="--d:${i * 0.1}s">
        <span class="step-n">${ROMAN[i]}</span>
        <h3 class="step-t"><span class="mask"><span>${t}</span></span></h3>
        <p class="step-d fade">${d}</p>
      </li>`).join('');

  const faq = c.faq.map(([q, a], i) => `
      <div class="qa" data-r>
        <h3>
          <button class="qa-q" type="button" aria-expanded="false" aria-controls="qa-p-${i}" id="qa-b-${i}">
            <span class="qa-n">${String(i + 1).padStart(2, '0')}</span>
            <span class="qa-txt">${T(q)}</span>
            <span class="qa-ico" aria-hidden="true"><i></i><i></i></span>
          </button>
        </h3>
        <div class="qa-p" id="qa-p-${i}" role="region" aria-labelledby="qa-b-${i}"><div><p>${T(a)}</p></div></div>
      </div>`).join('');

  /* i dati della fascia restano quelli veri del motore di copy: correggiamo
     solo il singolare e togliamo il doppione quando non c'è alcun voto Google */
  const statList = c.stats
    .filter((s, i) => !(i === 1 && !rating && !reviews))
    .map(([v, l]) => [v, (String(v) === '1' && /recensioni/.test(l)) ? l.replace('recensioni verificate', 'recensione verificata') : l]);

  const stats = statList.map(([v, l], i) => `
        <div class="stat" data-r style="--d:${i * 0.08}s">
          <span class="stat-v"><span class="mask"><span>${T(v)}</span></span></span>
          <span class="lbl stat-l">${T(l)}</span>
        </div>`).join('');

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${T(c.metaTitle)}</title>
<meta name="description" content="${T(c.metaDesc)}">
<meta name="theme-color" content="#F6F2EA">
<meta property="og:title" content="${T(c.metaTitle)}">
<meta property="og:description" content="${T(c.metaDesc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#F6F2EA;
  --paper-2:#F1EBE0;
  --ink:#141210;
  --sepia:#6E655A;
  --sepia-2:#8C8375;
  --rule:#D8D0C2;
  --rule-soft:#E4DCCF;
  --accent:#1C3A2E;
  --accent-ink:#2A5643;
  --serif:"Cormorant Garamond","Cormorant",Garamond,"Times New Roman",Georgia,serif;
  --sans:"Helvetica Neue",Helvetica,Arial,"Segoe UI",system-ui,sans-serif;
  --pad:clamp(22px,6vw,88px);
  --max:1280px;
}
*,*::before,*::after{box-sizing:border-box}
body{
  margin:0;background:var(--paper);color:var(--ink);
  font-family:var(--serif);font-weight:400;font-size:clamp(17px,1.05vw + 14px,20px);
  line-height:1.62;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
  overflow-x:hidden;padding-bottom:calc(68px + env(safe-area-inset-bottom));
}
img,svg{max-width:100%;display:block}
a{color:inherit}
::selection{background:var(--accent);color:var(--paper)}
:focus-visible{outline:1.5px solid var(--accent);outline-offset:4px}
h1,h2,h3,p,ul,ol,figure,blockquote{margin:0}
ul,ol{padding:0;list-style:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}

/* grana di carta, generata inline */
.grain{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:160px 160px}

.wrap{width:100%;max-width:var(--max);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
.lbl{font-family:var(--sans);font-size:10px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;
  color:var(--sepia);line-height:1.9;display:inline-block}
.lbl-ink{color:var(--ink)}
.lbl-acc{color:var(--accent)}
.rule{height:1px;background:var(--rule);border:0;margin:0}
.serif-xl{font-weight:300;line-height:.94;letter-spacing:-.014em}

/* ————— fotografia: tavole di rivista —————
   stampa calda su carta avorio: viraggio seppia leggero, neri mai profondi,
   un solo filetto attorno all'immagine, nessuna ombra, nessun raggio.
   Sotto la foto resta sempre l'incisione su fondo avorio: se la rete cade,
   la pagina non mostra un buco bianco ma una tavola disegnata. */
.ph{position:relative;overflow:hidden;border:1px solid var(--rule);
  display:flex;align-items:center;justify-content:center;
  background-color:var(--paper-2);
  background-image:linear-gradient(152deg,#F3ECDF 0%,#EAE1CF 54%,#E1D6C1 100%)}
.ph>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;
  filter:sepia(.12) saturate(.9) contrast(1.04);transition:filter .8s ease}
.ph .engr{position:relative;z-index:1;width:82%;height:auto;color:var(--accent)}
/* velo d'avorio: alza il nero massimo e tiene la foto sulla stessa carta */
.ph::before{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
  background:linear-gradient(180deg,rgba(246,242,234,.20),rgba(246,242,234,.11) 44%,rgba(246,242,234,.26))}
.ph-45{aspect-ratio:4/5}
.ph-23{aspect-ratio:2/3}
.bleed-r{margin-right:calc(var(--pad) * -1)}
.bleed-l{margin-left:calc(var(--pad) * -1)}
/* didascalia: filetto sottile sopra, maiuscoletto spaziato — firma del tema */
.ph-cap{display:block;margin-top:14px;padding-top:11px;border-top:1px solid var(--rule);
  font-family:var(--sans);font-size:10px;font-weight:400;letter-spacing:.26em;
  text-transform:uppercase;line-height:1.8;color:var(--sepia)}
.ph-cap b{font-weight:500;color:var(--accent)}

/* ————— intestazione ————— */
.hdr{position:fixed;top:0;left:0;right:0;z-index:7000;background:rgba(246,242,234,.86);
  backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);transition:box-shadow .5s ease}
.hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--rule);
  transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.19,1,.22,1)}
.hdr.on::after{transform:scaleX(1)}
.hdr-in{display:flex;align-items:center;justify-content:space-between;gap:16px;height:58px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;min-width:0}
.mono{width:30px;height:30px;flex:0 0 30px;border:1px solid var(--rule);border-radius:50%;
  display:grid;place-items:center;font-family:var(--serif);font-size:13px;letter-spacing:.04em;color:var(--accent)}
.brand-n{font-family:var(--sans);font-size:10px;letter-spacing:.24em;text-transform:uppercase;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:44vw}
.hdr-nav{display:none;gap:26px}
.hdr-nav a{font-family:var(--sans);font-size:10px;letter-spacing:.24em;text-transform:uppercase;
  text-decoration:none;color:var(--sepia);transition:color .4s ease}
.hdr-nav a:hover{color:var(--accent)}
.hdr-cta{display:none;font-family:var(--sans);font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  text-decoration:none;color:var(--paper);background:var(--accent);padding:11px 20px;transition:background .45s ease}
.hdr-cta:hover{background:var(--accent-ink)}
.prog{position:absolute;left:0;bottom:0;height:1px;background:var(--accent);width:0;z-index:2}

/* ————— hero ————— */
.hero{position:relative;z-index:2;padding-top:clamp(112px,17vh,186px);padding-bottom:clamp(30px,5vh,54px)}
.hero-top{display:flex;align-items:baseline;gap:16px;margin-bottom:clamp(26px,5vh,52px)}
.hero-top .line{flex:1;height:1px;background:var(--rule)}
.hero-grid{display:grid;grid-template-columns:1fr;gap:clamp(28px,4vw,52px)}
.measure{--m:calc(min(100vw,var(--max)) - 2 * var(--pad))}
.hero-h{font-size:clamp(2.2rem,calc(var(--m) / var(--hn,8)),9.4rem);margin:0 0 clamp(6px,2vh,26px) -.03em}
.hero-h .l2{padding-left:.3em}
.hero-h .l3{padding-left:.08em;font-style:italic;font-weight:300;color:var(--accent);display:flex;align-items:center;gap:.4em}
.hero-h .l3::before{content:"";width:clamp(30px,7vw,110px);height:1px;background:var(--accent);opacity:.5;flex:0 0 auto;
  transform:scaleX(0);transform-origin:left;transition:transform 1.3s cubic-bezier(.19,1,.22,1) .28s}
[data-r].in .hero-h .l3::before{transform:none}
.hero-side{max-width:22em}
.hero-lede{color:var(--sepia);font-size:clamp(1.02rem,.5vw + .92rem,1.16rem);line-height:1.72}
.hero-side .rule{margin:22px 0}
.cta-row{display:flex;flex-wrap:wrap;align-items:center;gap:18px 24px}
.btn{display:inline-flex;align-items:center;gap:12px;font-family:var(--sans);font-size:10px;
  letter-spacing:.24em;text-transform:uppercase;text-decoration:none;padding:15px 24px;
  background:var(--accent);color:var(--paper);transition:background .45s ease,transform .45s ease}
.btn:hover{background:var(--accent-ink)}
.btn-ghost{padding:0;background:none;color:var(--ink);position:relative}
.btn-ghost::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:1px;background:var(--ink);
  transform-origin:right;transition:transform .6s cubic-bezier(.19,1,.22,1)}
.btn-ghost:hover::after{transform:scaleX(0)}
.hero-data{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;margin-top:clamp(34px,7vh,68px);
  padding-top:18px;border-top:1px solid var(--rule)}
.hero-data span{font-family:var(--sans);font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--sepia)}
.hero-data i{width:1px;height:12px;background:var(--rule);display:inline-block}
.hero-data span:last-of-type{color:var(--ink)}
.hero-fig{margin-top:clamp(6px,2vh,18px)}

/* ————— composizione tipografica ————— */
.plate{position:relative;z-index:2;padding-top:clamp(48px,9vh,110px);padding-bottom:clamp(40px,7vh,86px);overflow:hidden}
.plate-grid{display:grid;grid-template-columns:1fr;gap:clamp(24px,4vw,46px);align-items:end}
.plate-q{font-size:clamp(1.45rem,4.4vw,3.4rem);font-weight:300;line-height:1.1;letter-spacing:-.014em}
.plate-q em{font-style:italic;color:var(--accent)}
.plate-note{color:var(--sepia);font-size:1rem;line-height:1.74;max-width:23em}
.plate-fig{margin-top:clamp(30px,6vh,66px)}
.art-hero{position:relative;margin-top:clamp(26px,5vh,54px);padding:clamp(18px,4vw,44px) 0;
  border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);color:var(--accent)}
.art-hero .engr{width:100%;height:auto;opacity:.92}
.art-cap{position:absolute;right:0;bottom:10px;color:var(--sepia-2)}

/* ————— fascia di prova ————— */
.proof{position:relative;z-index:2;background:var(--paper-2);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.proof-in{padding-top:clamp(38px,7vh,76px);padding-bottom:clamp(38px,7vh,76px)}
.proof-head{display:grid;grid-template-columns:1fr;gap:14px;margin-bottom:clamp(28px,5vh,52px)}
.proof-t{font-size:clamp(1.5rem,4.6vw,2.5rem);font-weight:300;line-height:1.12;letter-spacing:-.01em}
.proof-d{color:var(--sepia);max-width:22em;font-size:1rem;line-height:1.74}
.stats{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--rule)}
.stat{padding:22px 12px 0 0;border-right:1px solid var(--rule)}
.stat:last-child{border-right:0}
.stat-v{display:block;font-size:clamp(1.9rem,7vw,3.2rem);font-weight:300;line-height:1;letter-spacing:-.02em;color:var(--accent)}
.stat-l{margin-top:10px;display:block;max-width:14ch}

/* ————— sezioni ————— */
.sec{position:relative;z-index:2;padding-top:clamp(56px,10vh,132px);padding-bottom:clamp(56px,10vh,132px)}
.sec-head{display:grid;grid-template-columns:1fr;gap:16px;align-items:baseline;margin-bottom:clamp(30px,6vh,66px)}
.sec-h{font-size:clamp(2rem,7.6vw,4.4rem);font-weight:300;line-height:1.02;letter-spacing:-.018em}
.sec-h em{font-style:italic;color:var(--accent)}
.sec-lead{color:var(--sepia);font-size:1rem;line-height:1.74;max-width:22em}
.num{display:flex;align-items:center;gap:12px}
.num::after{content:"";width:clamp(24px,5vw,60px);height:1px;background:var(--rule)}

/* servizi */
.svcs{border-top:1px solid var(--rule)}
.svc{display:grid;grid-template-columns:1fr;gap:8px;padding:clamp(24px,4vh,40px) 0;border-bottom:1px solid var(--rule);
  transition:background .6s ease}
.svc:hover{background:var(--paper-2)}
.svc-t{font-size:clamp(1.45rem,5.2vw,2.35rem);font-weight:300;line-height:1.08;letter-spacing:-.012em}
.svc-d{color:var(--sepia);font-size:1rem;line-height:1.72;max-width:26em}
.svc-n .lbl{color:var(--accent)}
.svc-layout{display:grid;grid-template-columns:1fr;gap:clamp(34px,6vh,60px)}
.svc-fig{margin-top:0}

/* ————— doppia pagina fotografica ————— */
.spread{position:relative;z-index:2;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.spread-fig{position:relative;display:flex;align-items:flex-end;
  min-height:clamp(430px,72vh,700px)}
.ph-spread{position:absolute;inset:0;border-left:0;border-right:0;border-top:0;border-bottom:0}
/* qui il velo diventa lavaggio: la foto scolora verso la carta e il titolo
   in inchiostro resta leggibile anche se la fotografia non arriva */
.ph-spread::before{background:linear-gradient(180deg,rgba(246,242,234,.30) 0%,rgba(246,242,234,.74) 48%,rgba(246,242,234,.96) 100%)}
.ph-spread{align-items:flex-start}
.ph-spread .engr{width:76%;margin-top:7%}
.spread-in{position:relative;z-index:5;width:100%;
  padding-top:clamp(56px,11vh,120px);padding-bottom:clamp(28px,5vh,58px)}
.spread-h{font-size:clamp(2rem,7.4vw,4.3rem);margin:16px 0 20px}
.spread-h em{font-style:italic;color:var(--accent)}
.spread-p{color:var(--sepia);font-size:1rem;line-height:1.74;max-width:27em}
.spread-cap{margin-top:clamp(26px,5vh,48px);max-width:30em}
.zone-fig{margin-top:clamp(28px,5vh,44px)}

/* flotta */
.rail{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(268px,80%);gap:clamp(18px,3vw,34px);
  overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  padding-bottom:20px;margin-right:calc(var(--pad) * -1);padding-right:var(--pad);
  scrollbar-width:thin;scrollbar-color:var(--rule) transparent}
.rail::-webkit-scrollbar{height:1px}
.rail::-webkit-scrollbar-thumb{background:var(--rule)}
.car{scroll-snap-align:start}
.car-art{color:var(--accent)}
.car-art .engr{width:86%}
.car:hover .car-art>img{filter:sepia(.06) saturate(.98) contrast(1.06)}
.car-num{position:absolute;top:0;left:0;z-index:5;background:var(--paper);
  padding:9px 12px 8px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);
  font-family:var(--sans);font-size:10px;letter-spacing:.28em;color:var(--sepia)}
.car-meta{margin-top:16px;padding-top:14px;border-top:1px solid var(--rule)}
.car-t{font-size:clamp(1.3rem,4.4vw,1.72rem);font-weight:400;line-height:1.14}
.car-s{margin-top:8px;color:var(--accent)}
.car-d{margin-top:12px;color:var(--sepia);font-size:.98rem;line-height:1.7}

/* metodo */
.steps{display:grid;grid-template-columns:1fr;gap:0;border-top:1px solid var(--rule)}
.step{padding:clamp(26px,4vh,44px) 0;border-bottom:1px solid var(--rule);display:grid;
  grid-template-columns:auto 1fr;column-gap:clamp(18px,4vw,52px);row-gap:10px;align-items:baseline}
.step-n{font-size:clamp(1.5rem,5vw,2.4rem);font-weight:300;color:var(--accent);line-height:1;font-style:italic;
  min-width:1.6em}
.step-t{font-size:clamp(1.35rem,4.8vw,2.1rem);font-weight:300;line-height:1.1;letter-spacing:-.01em}
.step-d{grid-column:2;color:var(--sepia);font-size:1rem;line-height:1.72;max-width:27em}

/* zona */
.zone{position:relative;background:var(--paper-2);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  overflow:hidden}
.zone-ghost{font-size:clamp(3.2rem,calc(var(--m) / var(--zn,4)),15rem);font-weight:300;line-height:.86;
  letter-spacing:-.03em;color:var(--rule);white-space:nowrap;pointer-events:none;user-select:none;margin-left:-.05em}
@supports (-webkit-text-stroke:1px black){
  .zone-ghost{-webkit-text-stroke:1px var(--rule);color:transparent}
}
.zone-body{display:grid;grid-template-columns:1fr;gap:clamp(20px,4vw,46px);margin-top:clamp(20px,4vh,40px)}
.zone-p{color:var(--sepia);font-size:1.02rem;line-height:1.76;max-width:24em}
.addr{font-size:clamp(1.15rem,4vw,1.5rem);font-weight:400;line-height:1.4}
.addr span{display:block}
.addr .lbl{display:block;margin-bottom:10px}

/* faq */
.qa{border-bottom:1px solid var(--rule)}
.qa:first-child{border-top:1px solid var(--rule)}
.qa-q{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:clamp(14px,3vw,30px);
  width:100%;text-align:left;padding:clamp(20px,3vh,30px) 0}
.qa-n{font-family:var(--sans);font-size:10px;letter-spacing:.28em;color:var(--accent)}
.qa-txt{font-size:clamp(1.12rem,3.9vw,1.55rem);font-weight:400;line-height:1.24}
.qa-ico{position:relative;width:15px;height:15px;flex:0 0 15px}
.qa-ico i{position:absolute;inset:50% 0 auto 0;height:1px;background:var(--ink);transition:transform .6s cubic-bezier(.19,1,.22,1),background .4s ease}
.qa-ico i:last-child{transform:rotate(90deg)}
.qa-q[aria-expanded="true"] .qa-ico i{background:var(--accent)}
.qa-q[aria-expanded="true"] .qa-ico i:last-child{transform:rotate(0)}
.qa-p{display:grid;grid-template-rows:0fr;transition:grid-template-rows .68s cubic-bezier(.19,1,.22,1)}
.qa-p>div{overflow:hidden}
.qa-p p{color:var(--sepia);font-size:1rem;line-height:1.74;max-width:30em;padding:0 0 26px}
.qa.open .qa-p{grid-template-rows:1fr}

/* contatti */
.contact{background:var(--accent);color:var(--paper);position:relative;z-index:2}
.contact .lbl{color:rgba(246,242,234,.62)}
.contact-in{padding-top:clamp(54px,10vh,124px);padding-bottom:clamp(54px,10vh,124px)}
.contact-h{font-size:clamp(2.1rem,8vw,4.6rem);font-weight:300;line-height:1.02;letter-spacing:-.02em;
  margin:clamp(18px,3vh,30px) 0 clamp(24px,4vh,42px)}
.contact-h em{font-style:italic}
.contact-grid{display:grid;grid-template-columns:1fr;gap:clamp(24px,4vw,50px);
  border-top:1px solid rgba(246,242,234,.22);padding-top:clamp(24px,4vh,42px)}
.ct{display:block;text-decoration:none}
.ct .lbl{display:block;margin-bottom:9px}
.ct-v{font-size:clamp(1.15rem,4vw,1.5rem);line-height:1.34;position:relative;display:inline-block}
a.ct .ct-v::after{content:"";position:absolute;left:0;right:0;bottom:-5px;height:1px;background:rgba(246,242,234,.5);
  transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(.19,1,.22,1)}
a.ct:hover .ct-v::after{transform:scaleX(1)}
.btn-pale{background:var(--paper);color:var(--accent);margin-top:clamp(26px,4vh,44px)}
.btn-pale:hover{background:#fff}
.contact :focus-visible{outline-color:var(--paper)}

/* footer */
.foot{padding-top:clamp(30px,5vh,54px);padding-bottom:clamp(30px,5vh,54px);position:relative;z-index:2}
.foot-in{display:grid;gap:16px;border-top:1px solid var(--rule);padding-top:22px}
.foot .lbl{display:block}
.foot-n{font-size:1.05rem}
.foot-u{color:var(--sepia-2)}

/* barra fissa mobile */
.bar{position:fixed;left:0;right:0;bottom:0;z-index:8000;display:grid;background:rgba(246,242,234,.95);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid var(--rule);
  padding-bottom:env(safe-area-inset-bottom)}
.bar a{display:flex;align-items:center;justify-content:center;gap:9px;height:68px;text-decoration:none;
  font-family:var(--sans);font-size:10px;letter-spacing:.22em;text-transform:uppercase}
.bar .b-wa{background:var(--accent);color:var(--paper)}
.bar .b-tel{color:var(--ink)}
.bar svg{width:14px;height:14px;flex:0 0 14px}

/* rivelazioni */
.mask{display:block;overflow:hidden;padding-bottom:.13em;margin-bottom:-.09em}
.mask>*{display:block;transform:translateY(112%);opacity:0;
  transition:transform 1.15s cubic-bezier(.19,1,.22,1) var(--d,0s),opacity 1.1s ease var(--d,0s)}
[data-r].in .mask>*{transform:none;opacity:1}
.fade{opacity:0;transform:translateY(14px);
  transition:opacity 1.25s ease calc(var(--d,0s) + .16s),transform 1.25s cubic-bezier(.19,1,.22,1) calc(var(--d,0s) + .16s)}
/* la dissolvenza vale sia per i figli sia per l'elemento osservato:
   senza il secondo selettore i paragrafi con data-r e fade insieme
   (zona, recapito, occhielli di sezione) restavano invisibili */
[data-r].in .fade,[data-r].in.fade{opacity:1;transform:none}
[data-r] .engr{opacity:0;transition:opacity 1s ease var(--d,0s)}
[data-r].in .engr{opacity:.9}
.engr path,.engr circle,.engr line{stroke-dashoffset:var(--len,0)}
[data-r].in .engr path,[data-r].in .engr circle,[data-r].in .engr line{stroke-dashoffset:0;
  transition:stroke-dashoffset 2.6s cubic-bezier(.33,.7,.3,1)}
.art-hero .engr{opacity:0}
[data-r].in .art-hero .engr{opacity:.92}

/* cambio pagina */
.leaf{position:fixed;inset:0;z-index:8500;background:var(--paper);transform:scaleX(0);transform-origin:left;
  pointer-events:none;box-shadow:1px 0 0 var(--rule)}
.leaf::after{content:"";position:absolute;right:0;top:0;bottom:0;width:1px;background:var(--accent);opacity:.25}

@media (min-width:640px){
  .stat{padding-right:24px}
  .foot-in{grid-template-columns:1fr auto;align-items:end}
  .bar{grid-template-columns:1fr 1fr}
  .bar.solo{grid-template-columns:1fr}
}
@media (min-width:900px){
  body{padding-bottom:0}
  .hdr-nav{display:flex}
  .hdr-cta{display:inline-block}
  .brand-n{font-size:11px;max-width:none}
  .bar{display:none}
  /* spread editoriale: titolone a sinistra, tavola verticale a destra che
     sborda oltre la griglia dal solo lato esterno. La misura del titolo si
     accorcia sulla colonna, così le tre righe restano tre righe. */
  .hero-grid{grid-template-columns:minmax(0,6.2fr) minmax(300px,3.8fr);
    column-gap:clamp(36px,5vw,80px);row-gap:0;
    grid-template-areas:"title photo" "side photo" "data photo";align-items:start}
  .hero-h{--m:calc((min(100vw,var(--max)) - 2 * var(--pad)) * .55);grid-area:title;
    margin-bottom:clamp(28px,5.5vh,62px)}
  .hero-side{grid-area:side;max-width:24em}
  .hero-data{grid-area:data;margin-top:clamp(34px,7vh,68px);align-self:end}
  .hero-fig{grid-area:photo;margin-top:clamp(6px,1.5vh,16px)}
  .plate-grid{grid-template-columns:minmax(0,6.6fr) minmax(0,4fr);gap:clamp(36px,6vw,90px);align-items:start}
  .plate-side{margin-top:clamp(10px,3vh,34px)}
  .plate-fig .bleed-l{margin-left:0}
  .svc-layout{grid-template-columns:minmax(0,7.1fr) minmax(0,2.9fr);
    column-gap:clamp(36px,5vw,76px);align-items:start}
  .svc-fig{margin-top:clamp(40px,9vh,120px)}
  .spread-fig{align-items:center}
  .ph-spread{align-items:center}
  .ph-spread .engr{width:42%;margin-left:auto;margin-right:7%}
  .spread-h,.spread-p{max-width:15em}
  .spread-cap{max-width:26em}
  .ph-spread::before{background:linear-gradient(90deg,rgba(246,242,234,.96) 0%,rgba(246,242,234,.86) 34%,rgba(246,242,234,.42) 74%,rgba(246,242,234,.24) 100%)}
  .zone-fig{margin-top:0}
  .sec-head{grid-template-columns:minmax(0,6.6fr) minmax(0,4fr);gap:clamp(36px,6vw,90px)}
  .svc{grid-template-columns:minmax(96px,1.1fr) minmax(0,5.2fr) minmax(0,4.4fr);
    column-gap:clamp(24px,4vw,64px);align-items:baseline}
  .rail{grid-auto-columns:1fr;grid-auto-flow:column;overflow:visible;margin-right:0;padding-right:0;padding-bottom:0}
  .step{grid-template-columns:minmax(96px,1.1fr) minmax(0,5.2fr) minmax(0,4.4fr);align-items:baseline}
  .step-d{grid-column:3;padding-left:0}
  .zone-body{grid-template-columns:minmax(0,4.2fr) minmax(0,2.6fr) minmax(0,3.2fr);align-items:start}
  .contact-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .proof-head{grid-template-columns:minmax(0,6fr) minmax(0,4.6fr);gap:clamp(36px,6vw,90px)}
  .art-cap{bottom:22px}
}
@media (prefers-reduced-motion:reduce){
  .mask>*,.fade,.engr,[data-r] .engr{transform:none!important;opacity:1!important;transition:none!important}
  .engr path,.engr circle,.engr line{stroke-dashoffset:0!important;transition:none!important}
  .hero-h .l3::before{transform:none!important;transition:none!important}
  .art-hero .engr{opacity:.92}
  .leaf{display:none}
  .qa-p{transition:none}
  html{scroll-behavior:auto}
}
</style>
</head>
<body class="measure">
<div class="grain" aria-hidden="true"></div>
<div class="leaf" id="leaf" aria-hidden="true"></div>

<header class="hdr" id="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="#top" aria-label="${name} — torna in cima">
      <span class="mono" aria-hidden="true">${mono}</span>
      <span class="brand-n">${name}</span>
    </a>
    <nav class="hdr-nav" aria-label="Sezioni">
      <a href="#servizi">Servizi</a>
      <a href="#flotta">Vetture</a>
      <a href="#metodo">Metodo</a>
      <a href="#contatti">Contatti</a>
    </nav>
    ${wa
      ? `<a class="hdr-cta" href="${wa}" target="_blank" rel="noopener">Scrivere su WhatsApp</a>`
      : `<a class="hdr-cta" href="tel:${tel}">Telefonare</a>`}
  </div>
  <div class="prog" id="prog" aria-hidden="true"></div>
</header>

<main id="top">

  <section class="hero wrap">
    <div class="hero-top">
      <span class="lbl lbl-acc">${ROMAN[0]}</span>
      <span class="line" aria-hidden="true"></span>
      <span class="lbl">${kicker}</span>
    </div>
    <div class="hero-grid">
      <h1 class="hero-h serif-xl" data-r style="--hn:${hn}">
        <span class="mask"><span>${T(c.heroA)}</span></span>
        <span class="mask l2"><span style="--d:.09s">${T(c.heroB)}</span></span>
        <span class="mask l3"><span style="--d:.18s">${city}</span></span>
      </h1>
      <aside class="hero-side" data-r>
        <p class="hero-lede fade">${T(c.lede)}</p>
        <hr class="rule">
        <div class="cta-row fade" style="--d:.1s">
          ${waBtn('btn', 'Scrivere su WhatsApp')}
          <a class="btn-ghost" href="tel:${tel}" aria-label="Telefonare al ${phone}">Telefonare</a>
        </div>
      </aside>
      ${plate(c.pics.hero, ROMAN[0], {
        cls: 'hero-fig', ratio: 'ph-45', bleed: 'bleed-r', engr: CAR_3Q,
        w: 1800, q: 78, eager: true, sizes: '(max-width:899px) 100vw, 46vw'
      })}
      <div class="hero-data" data-r>
        ${heroData.map((d, i) => (i ? '<i aria-hidden="true"></i>' : '') + '<span>' + d + '</span>').join('')}
      </div>
    </div>
  </section>

  <section class="plate wrap" aria-labelledby="plate-h">
    <div class="hero-top">
      <span class="lbl lbl-acc">${ROMAN[1]}</span>
      <span class="line" aria-hidden="true"></span>
      <span class="lbl">La misura</span>
    </div>
    <div class="plate-grid" data-r>
      <p class="plate-q serif-xl" id="plate-h"><span class="mask"><span>Non è la vettura</span></span><span class="mask"><span style="--d:.08s">a fare la differenza,</span></span><span class="mask"><span style="--d:.16s">ma la <em>precisione</em>.</span></span></p>
      <div class="plate-side">
        <p class="plate-note fade" style="--d:.2s">L’orario rispettato al minuto, la strada scelta bene, il silenzio quando serve e la parola quando la si desidera: è su questi dettagli, e non su altro, che si misura chi guida. Una giornata sta in piedi per come è stata pensata prima, non per come appare all’arrivo.</p>
        ${plate(c.pics.interni, ROMAN[1], {
          cls: 'plate-fig', ratio: 'ph-23', bleed: 'bleed-l', engr: WHEEL,
          w: 1100, sizes: '(max-width:899px) 100vw, 34vw'
        })}
      </div>
    </div>
    <figure class="art-hero" data-r>
      ${CAR_3Q}
      <figcaption class="lbl art-cap">Studio — tre quarti</figcaption>
    </figure>
  </section>

  <section class="proof" aria-labelledby="proof-h">
    <div class="wrap proof-in">
      <div class="proof-head">
        <div data-r>
          <span class="lbl lbl-acc">Ciò che possiamo garantire</span>
          <h2 class="proof-t" id="proof-h" style="margin-top:14px"><span class="mask"><span>${T(c.proof[0])}</span></span></h2>
        </div>
        <p class="proof-d fade" data-r>${T(c.proof[1])}. È la sola promessa che ci sentiamo di fare per iscritto, e vale ogni volta.</p>
      </div>
      <div class="stats" style="grid-template-columns:repeat(${statList.length},1fr)">${stats}</div>
    </div>
  </section>

  <section class="sec wrap" id="servizi" aria-labelledby="servizi-h">
    <div class="sec-head">
      <div data-r>
        <span class="lbl lbl-acc num">${ROMAN[2]}</span>
        <h2 class="sec-h" id="servizi-h" style="margin-top:16px">
          <span class="mask"><span>Quello che</span></span>
          <span class="mask"><span style="--d:.08s"><em>facciamo</em></span></span>
        </h2>
      </div>
      <p class="sec-lead fade" data-r>Quattro modi di lavorare che nascono dalla stessa idea: chi sale in macchina non deve pensare a nulla, se non a dove sta andando.</p>
    </div>
    <div class="svc-layout">
      <div class="svcs">${services}</div>
      ${plate(c.pics.autista, ROMAN[2], {
        cls: 'svc-fig', ratio: 'ph-23', bleed: 'bleed-r', engr: CAR_FRONT,
        w: 1000, sizes: '(max-width:899px) 100vw, 30vw'
      })}
    </div>
  </section>

  <section class="sec wrap" id="flotta" aria-labelledby="flotta-h">
    <div class="sec-head">
      <div data-r>
        <span class="lbl lbl-acc num">${ROMAN[3]}</span>
        <h2 class="sec-h" id="flotta-h" style="margin-top:16px">
          <span class="mask"><span>Le <em>vetture</em></span></span>
        </h2>
      </div>
      <p class="sec-lead fade" data-r>Categorie, non promesse: ci dite quante persone siete e quanti bagagli avete, e vi indichiamo la classe di vettura giusta con la disponibilità effettiva per la vostra data.</p>
    </div>
    <div class="rail">${fleet}</div>
  </section>

  <section class="sec wrap" id="metodo" aria-labelledby="metodo-h">
    <div class="sec-head">
      <div data-r>
        <span class="lbl lbl-acc num">${ROMAN[4]}</span>
        <h2 class="sec-h" id="metodo-h" style="margin-top:16px">
          <span class="mask"><span>Come si</span></span>
          <span class="mask"><span style="--d:.08s"><em>prenota</em></span></span>
        </h2>
      </div>
      <p class="sec-lead fade" data-r>Tre passaggi, nessun modulo da compilare, nessun centralino da attraversare. Chi vi risponde è chi guida.</p>
    </div>
    <ol class="steps">${steps}</ol>
  </section>

  <section class="spread" aria-labelledby="spread-h">
    <figure class="spread-fig" data-r>
      <div class="ph ph-spread">
        ${ROAD}
        ${c.pics.strada.tag({ w: 2000, q: 74, sizes: '100vw' })}
      </div>
      <div class="wrap spread-in" data-r>
        <span class="lbl lbl-acc">Tavola fuori testo</span>
        <h2 class="spread-h serif-xl" id="spread-h">
          <span class="mask"><span>Il Nord si attraversa</span></span>
          <span class="mask"><span style="--d:.08s"><em>senza rumore</em></span></span>
        </h2>
        <p class="spread-p fade" style="--d:.16s">Autostrade, valichi, centri storici chiusi al traffico, strade di lago che si stringono d’estate: il percorso si sceglie prima di partire, insieme all’orario di uscita. È la parte del lavoro che non si vede e che decide come andrà la giornata.</p>
        <figcaption class="ph-cap spread-cap fade" style="--d:.24s"><b>Tav.&nbsp;${ROMAN[3]}</b> — ${CAP.strada}</figcaption>
      </div>
    </figure>
  </section>

  <section class="zone" id="zona" aria-labelledby="zona-h">
    <div class="wrap" style="padding-top:clamp(48px,8vh,104px);padding-bottom:clamp(48px,8vh,104px)">
      <div class="hero-top">
        <span class="lbl lbl-acc">${ROMAN[5]}</span>
        <span class="line" aria-hidden="true"></span>
        <span class="lbl">Zona operativa</span>
      </div>
      <div data-r>
        <h2 class="zone-ghost" id="zona-h" style="--zn:${zn}"><span class="mask"><span>${city}</span></span></h2>
      </div>
      <div class="zone-body">
        <p class="zone-p fade" data-r>Lavoriamo a ${city} e da ${city} partiamo: transfer in città, collegamenti con aeroporti e stazioni, trasferimenti verso altre città concordati di volta in volta. Per le destinazioni fuori zona basta chiedere: vi diciamo subito se possiamo coprirle e a quali condizioni.</p>
        ${address ? `<address class="addr fade" data-r style="--d:.1s;font-style:normal">
          <span class="lbl">Recapito</span>
          <span>${address}</span>
          <span>${city}</span>
        </address>` : `<div class="addr fade" data-r style="--d:.1s">
          <span class="lbl">Recapito</span>
          <span>${city}</span>
        </div>`}
        ${plate(zonePic, ROMAN[4], {
          cls: 'zone-fig', ratio: 'ph-45', engr: SKYLINE, w: 1000, sizes: '(max-width:899px) 100vw, 32vw'
        })}
      </div>
    </div>
  </section>

  <section class="sec wrap" id="domande" aria-labelledby="domande-h">
    <div class="sec-head">
      <div data-r>
        <span class="lbl lbl-acc num">${ROMAN[6]}</span>
        <h2 class="sec-h" id="domande-h" style="margin-top:16px">
          <span class="mask"><span>Domande</span></span>
          <span class="mask"><span style="--d:.08s"><em>ricorrenti</em></span></span>
        </h2>
      </div>
      <p class="sec-lead fade" data-r>Le cose che ci vengono chieste più spesso, con la risposta che daremmo al telefono.</p>
    </div>
    <div class="faq" id="faq">${faq}</div>
  </section>

  <section class="contact" id="contatti" aria-labelledby="contatti-h">
    <div class="wrap contact-in">
      <div data-r>
        <span class="lbl">${ROMAN[7]} — Contatti</span>
        <h2 class="contact-h serif-xl" id="contatti-h">
          <span class="mask"><span>Scriveteci</span></span>
          <span class="mask"><span style="--d:.08s"><em>quando volete</em></span></span>
        </h2>
      </div>
      <div class="contact-grid" data-r>
        ${wa ? `<a class="ct fade" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ${name}">
          <span class="lbl">WhatsApp</span>
          <span class="ct-v">Preventivo in chat</span>
        </a>` : ''}
        <a class="ct fade" style="--d:.08s" href="tel:${tel}" aria-label="Telefonare al ${phone}">
          <span class="lbl">Telefono</span>
          <span class="ct-v">${phone}</span>
        </a>
        <div class="ct fade" style="--d:.16s">
          <span class="lbl">Dove siamo</span>
          <span class="ct-v">${address ? address + '<br>' : ''}${city}</span>
        </div>
      </div>
      ${waBtn('btn btn-pale', 'Scrivere su WhatsApp')}
    </div>
  </section>

  <footer class="foot wrap">
    <div class="foot-in">
      <div>
        <span class="lbl">${kicker}</span>
        <p class="foot-n">${name}${rating ? ' — ' + rating + ' su Google' + (reviews ? ' · ' + reviews + ' ' + revW(reviews) : '') : ''}</p>
      </div>
      <p class="lbl foot-u">Anteprima realizzata da Umbra<br>Fotografie di repertorio</p>
    </div>
  </footer>

</main>

<nav class="bar${wa ? '' : ' solo'}" aria-label="Contatti rapidi">
  ${wa ? `<a class="b-wa" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ${name}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.5a8.4 8.4 0 1 1 15.5-4.4z"/><path d="M8.8 9.2c0 3.2 3 6.2 6.2 6.2"/></svg>
    <span>WhatsApp</span>
  </a>` : ''}
  <a class="b-tel" href="tel:${tel}" aria-label="Telefonare al ${phone}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4h3.2l1.6 4-2 1.4a12 12 0 0 0 5.3 5.3l1.4-2 4 1.6v3.2A1.5 1.5 0 0 1 16.4 19 14.4 14.4 0 0 1 4 6.6 1.5 1.5 0 0 1 4.5 4z"/></svg>
    <span>Telefonare</span>
  </a>
</nav>

<script>
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— rivelazioni con maschera ——— */
  var items = [].slice.call(document.querySelectorAll('[data-r]'));
  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach(function(el){ io.observe(el); });
  }

  /* ——— incisioni: tratto che si disegna ——— */
  if (!reduced) {
    [].slice.call(document.querySelectorAll('svg[data-draw]')).forEach(function(svg){
      [].slice.call(svg.querySelectorAll('path,circle,line')).forEach(function(p, i){
        var len = 0;
        try { len = p.getTotalLength(); } catch (err) { len = 0; }
        if (!len || len > 6000) return;
        p.style.strokeDasharray = len;
        p.style.setProperty('--len', len);
        p.style.transitionDelay = (i * 0.045) + 's';
      });
    });
  }

  /* ——— rete di sicurezza sulle fotografie ———
     se una foto non arriva resta la tavola incisa sul fondo avorio */
  var shots = [].slice.call(document.querySelectorAll('img[data-photo-slot]'));
  function drop(im){ im.style.display = 'none'; }
  function check(im){ if (im.complete && im.naturalWidth === 0) drop(im); }
  shots.forEach(function(im){
    im.addEventListener('error', function(){ drop(im); });
    check(im);
  });
  window.addEventListener('load', function(){ shots.forEach(check); });

  /* ——— accordion ——— */
  var faq = document.getElementById('faq');
  if (faq) {
    faq.addEventListener('click', function(ev){
      var btn = ev.target.closest ? ev.target.closest('.qa-q') : null;
      if (!btn) return;
      var qa = btn.parentNode.parentNode;
      var open = btn.getAttribute('aria-expanded') === 'true';
      [].slice.call(faq.querySelectorAll('.qa')).forEach(function(o){
        o.classList.remove('open');
        var b = o.querySelector('.qa-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!open) { qa.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  }

  /* ——— intestazione e filetto di avanzamento ——— */
  var hdr = document.getElementById('hdr'), prog = document.getElementById('prog'), tick = false;
  function onScroll(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      hdr.classList.toggle('on', y > 36);
      prog.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
      tick = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ——— cambio pagina sui link interni ——— */
  var leaf = document.getElementById('leaf');
  function goTo(el){
    var top = el.getBoundingClientRect().top + (window.pageYOffset || 0) - 44;
    window.scrollTo(0, Math.max(0, top));
  }
  [].slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function(a){
    a.addEventListener('click', function(ev){
      var id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      ev.preventDefault();
      if (reduced) { goTo(target); return; }
      leaf.style.transition = 'none';
      leaf.style.transformOrigin = 'left';
      leaf.style.transform = 'scaleX(0)';
      void leaf.offsetWidth;
      leaf.style.transition = 'transform .5s cubic-bezier(.76,0,.24,1)';
      leaf.style.transform = 'scaleX(1)';
      window.setTimeout(function(){
        goTo(target);
        leaf.style.transition = 'none';
        leaf.style.transformOrigin = 'right';
        void leaf.offsetWidth;
        leaf.style.transition = 'transform .62s cubic-bezier(.76,0,.24,1)';
        leaf.style.transform = 'scaleX(0)';
      }, 520);
    });
  });
})();
</script>
${intro}
</body>
</html>`;
};

window.U.m["atelier"]=module.exports;})();
