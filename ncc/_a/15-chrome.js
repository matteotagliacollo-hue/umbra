window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "CHROME" — brutalismo di lusso.
 * Carta sporca + nero inchiostro + UN accento, assegnato all'azienda.
 * Tipografia grottesca pesantissima che eccede il contenitore e viene tagliata
 * dal bordo dello schermo, marquee infinito che inverte direzione allo scroll,
 * inversione totale dei colori all'hover, etichette ruotate a 90°.
 *
 * L'accento è punteggiatura, non campitura: pulsanti, riga evidenziata del
 * titolo, targhette, ombre dure, pallini e marcatori, stati attivi. Le grandi
 * superfici sono nero o carta. Una sola fotografia per pagina porta il duotone
 * pieno; tutte le altre restano in bianco e nero contrastato.
 *
 * Nessun fatto inventato: si usano soltanto i campi reali di `lead` e i testi
 * del motore di copy.
 */

const { esc } = require('../lib/content.js');

/* ------------------------------------------------ accento per azienda ---
   Stessa meccanica deterministica di lib/photos.js: un hash FNV-1a di
   `lead.id + lead.name`, un passo di LCG, e la scelta pesata dal segmento.
   Conseguenze: la stessa azienda riceve sempre lo stesso accento a ogni
   build, due aziende diverse dello stesso tema ne ricevono di diversi, e
   l'ottone finisce sulle cerimonie mentre sui transfer non compare mai.

   Contrasto (verificato, non a occhio) di ogni tinta contro l'inchiostro
   #0A0A0A — vale in entrambi i versi, testo nero su accento e accento su
   nero, perché il rapporto WCAG è simmetrico:
     lime      #D6FF3F  17,19:1
     vermiglio #E8452A   5,01:1
     elettrico #46B4E8   8,44:1
     ottone    #D9973A   7,96:1
   Tutte oltre il 4,5:1 richiesto da AA per il testo normale. */

const ACCENTS = {
  lime:      { key: 'lime',      nome: 'lime elettrico', hex: '#D6FF3F' },
  vermiglio: { key: 'vermiglio', nome: 'vermiglio',      hex: '#E8452A' },
  elettrico: { key: 'elettrico', nome: 'blu elettrico',  hex: '#46B4E8' },
  ottone:    { key: 'ottone',    nome: 'ambra ottone',   hex: '#D9973A' }
};
const ACC_KEYS = ['lime', 'vermiglio', 'elettrico', 'ottone'];

// pesi per segmento, nell'ordine di ACC_KEYS. Peso 0 = tinta esclusa.
const ACC_WEIGHT = {
  ncc:       [3, 3, 3, 2],   // il ventaglio pieno: è il segmento più largo
  luxury:    [1, 3, 2, 5],   // ottone e vermiglio: metallo e motore
  cerimonie: [0, 1, 1, 8],   // quasi sempre ottone, mai lime
  transfer:  [3, 2, 4, 0]    // blu e lime da livrea; niente ottone
};

function accSeed(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

const rgbOf = hex => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16)
];
const hexOf = rgb => '#' + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
/** k = quantità di accento che resta; il resto è il colore di fondo */
const mixInk = (hex, k, base) => hexOf(rgbOf(hex).map((v, i) => v * k + (base || [10, 10, 10])[i] * (1 - k)));
const rgba = (hex, a) => 'rgba(' + rgbOf(hex).join(',') + ',' + a + ')';

function accentOf(lead) {
  const w = ACC_WEIGHT[lead.segment] || ACC_WEIGHT.ncc;
  let s = accSeed(String(lead.id) + String(lead.name));
  s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
  const tot = w.reduce((a, b) => a + b, 0);
  let r = s % tot, key = ACC_KEYS[0];
  for (let i = 0; i < w.length; i++) { if ((r -= w[i]) < 0) { key = ACC_KEYS[i]; break; } }
  const a = ACCENTS[key];
  return {
    key: a.key,
    nome: a.nome,
    hex: a.hex,
    deep: mixInk(a.hex, 0.13),          // accento affogato nel nero: fondi foto
    veil: mixInk(a.hex, 0.09, [0, 0, 0]), // velo scuro del duotone
    a18: rgba(a.hex, 0.18),
    a07: rgba(a.hex, 0.07)
  };
}

/* ------------------------------------------------------------------ utils */

const typo = s => String(s == null ? '' : s).replace(/'/g, '’');
const T = s => typo(esc(s));

function wrapLines(str, max) {
  const words = String(str).split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + ' ' + w).length <= max) cur += ' ' + w;
    else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  // niente righe orfane di 2–3 lettere: si fondono con la successiva
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].length <= 3 && (lines[i] + ' ' + lines[i + 1]).length <= max + 5) {
      lines[i] = lines[i] + ' ' + lines[i + 1];
      lines.splice(i + 1, 1);
      i--;
    }
  }
  return lines;
}

/**
 * Titolo "su misura".
 *
 * Il markup emesso qui è solo il ripiego per il caso senza JS: le righe sono
 * dimensionate con una stima prudente (fattore di larghezza 0,78 em per
 * carattere, che copre anche i font di sistema di ripiego) così da stare
 * sempre dentro il viewport. A pagina caricata `fitTitles()` rimisura tutto
 * con il font reale e ricostruisce le righe: nessuna parola tagliata a metà,
 * ultima riga sempre intera.
 */
const FIT = {
  mega: { maxChars: 15, minVw: 5, maxVw: 15 },
  head: { maxChars: 17, minVw: 4.5, maxVw: 11 }
};

function fallbackVw(len, kind) {
  const k = FIT[kind] || FIT.head;
  const s = 82 / (Math.max(len, 2) * 0.78);
  return Math.round(Math.max(k.minVw, Math.min(k.maxVw, s)) * 10) / 10;
}

function fitTitle(text, opt) {
  opt = opt || {};
  const kind = opt.kind || 'head';
  const tag = opt.tag || 'h2';
  const words = String(text).toUpperCase().split(/\s+/).filter(Boolean);
  const lines = wrapLines(words.join(' '), (FIT[kind] || FIT.head).maxChars);
  const acc = opt.acc ? lines.length - 1 : -1;
  const inner = lines.map((l, i) =>
    `<span class="ml${i === acc ? ' ml-acc' : ''}" style="--fs:${fallbackVw(l.length, kind)}">${T(l)}</span>`
  ).join('');
  const attrs = [
    `class="fit${opt.cls ? ' ' + opt.cls : ''}"`,
    `data-fit="${kind}"`,
    opt.acc ? 'data-acc="last"' : '',
    opt.id ? `id="${opt.id}"` : '',
    `data-words="${T(words.join('|'))}"`
  ].filter(Boolean).join(' ');
  return `<${tag} ${attrs}>${inner}</${tag}>`;
}

function initials(name) {
  const w = String(name).split(/\s+/).filter(Boolean);
  return ((w[0] || 'U')[0] + (w[1] ? w[1][0] : '')).toUpperCase();
}

/* ------------------------------------------------- silhouette SVG a mano */

const CARS = {
  sedan: {
    vb: '0 0 480 162',
    d: 'M4 122C4 110 10 102 22 99L52 91C82 84 118 78 146 72L200 62L232 34C238 29 246 26 254 26L316 26C326 26 334 29 340 34L378 68L444 79C464 83 474 92 476 108L477 122C477 128 474 130 468 130L436 130A28 28 0 0 0 380 130L124 130A28 28 0 0 0 68 130L14 130C8 130 4 127 4 122Z',
    w: [[408, 130, 25], [96, 130, 25]]
  },
  van: {
    vb: '0 0 480 162',
    d: 'M6 118C6 100 12 86 26 78L74 50C86 42 100 38 116 38L392 38C424 38 448 48 462 70L474 92C478 100 478 110 478 120C478 126 474 130 468 130L438 130A28 28 0 0 0 382 130L130 130A28 28 0 0 0 74 130L16 130C10 130 6 126 6 118Z',
    w: [[410, 130, 25], [102, 130, 25]]
  },
  long: {
    vb: '0 0 620 162',
    d: 'M4 122C4 110 10 102 22 99L52 92C86 84 130 78 168 73L206 40C212 33 222 30 232 30L470 30C480 30 488 33 494 40L520 70L580 80C602 84 612 94 614 110L615 122C615 128 612 130 606 130L574 130A28 28 0 0 0 518 130L124 130A28 28 0 0 0 68 130L14 130C8 130 4 127 4 122Z',
    w: [[546, 130, 25], [96, 130, 25]]
  },
  coupe: {
    vb: '0 0 480 164',
    d: 'M4 124C4 112 12 104 26 101L64 93C104 85 140 78 176 70L228 44C244 36 262 32 282 32L330 32C352 32 372 38 388 50L426 78L452 86C470 91 478 100 478 112L478 124C478 129 475 131 469 131L438 131A28 28 0 0 0 382 131L120 131A28 28 0 0 0 64 131L14 131C8 131 4 129 4 124Z',
    w: [[410, 131, 25], [92, 131, 25]]
  },
  cabrio: {
    vb: '0 0 480 164',
    d: 'M4 124C4 112 12 104 26 101L70 92C110 84 150 76 190 68L234 40L248 66C272 60 302 56 342 58L402 64L452 86C470 91 478 100 478 112L478 124C478 129 475 131 469 131L438 131A28 28 0 0 0 382 131L120 131A28 28 0 0 0 64 131L14 131C8 131 4 129 4 124Z',
    w: [[410, 131, 25], [92, 131, 25]]
  }
};

function carSvg(shape, cls) {
  const c = CARS[shape] || CARS.sedan;
  const wheels = c.w.map(w => `<circle cx="${w[0]}" cy="${w[1]}" r="${w[2]}"/>`).join('');
  return `<svg class="${cls}" viewBox="${c.vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><g fill="currentColor"><path d="${c.d}"/>${wheels}</g></svg>`;
}

const HERO_SHAPE = { ncc: 'sedan', luxury: 'coupe', cerimonie: 'long', transfer: 'van' };
const FLEET_SHAPE = {
  ncc: ['sedan', 'van', 'long'],
  luxury: ['coupe', 'van', 'cabrio'],
  cerimonie: ['long', 'sedan', 'van'],
  transfer: ['sedan', 'van', 'van']
};

const STAR = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 1.6l3.1 6.6 7.1.9-5.2 4.9 1.3 7.1-6.3-3.5-6.3 3.5 1.3-7.1L1.8 9.1l7.1-.9z"/></svg>';

const WA_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.2-1.2l-.4-.2-2.5.6.7-2.4-.3-.4A8 8 0 0 1 12 4zm-3.3 4.2c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.7 2.7 4.2 3.7 2 .8 2.5.7 2.9.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.3-.5v-.5c-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4z"/></svg>';

const PHONE_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 3h3l1.6 4-2 1.4a12 12 0 0 0 5.4 5.4l1.4-2 4 1.6v3c0 .9-.7 1.6-1.6 1.6A15.4 15.4 0 0 1 3 5.6C3 4.7 3.7 4 4.6 4z"/></svg>';

/* ---------------------------------------------------------------- render */

module.exports = function render(lead, c, intro) {
  const name = String(lead.name || '').trim();
  const city = String(lead.city || '').trim();
  const wa = lead.whatsapp || null;
  const seg = lead.segment || 'ncc';
  const A = accentOf(lead);

  // il nome deve produrre almeno due righe: la seconda è la fascia accento
  const heroTitleText = (name.split(/\s+/).filter(Boolean).length === 1 && city &&
    city.toUpperCase() !== name.toUpperCase()) ? name + ' ' + city : name;

  const heroShape = HERO_SHAPE[seg] || 'sedan';
  const fleetShapes = FLEET_SHAPE[seg] || FLEET_SHAPE.ncc;

  /* ---------------------------------------------------------- fotografia
     Le foto arrivano da c.pics. Ogni scatto è avvolto in un blocco .ph che
     porta bordo pieno, ombra dura e — sotto l'immagine — un fondo scuro del
     tema: se la rete cade non resta mai un rettangolo vuoto. */
  const pics = c.pics || {};
  const has = p => !!(p && typeof p.tag === 'function');

  const PH_GRID = '<span class="ph-grid" aria-hidden="true"></span>';
  const PH_BARS = '<span class="ph-bars" aria-hidden="true"></span>';
  const plate = (txt, acc) => txt
    ? `<span class="ph-plate${acc ? ' ph-plate-acc' : ''}" aria-hidden="true">${T(txt)}</span>`
    : '';

  /** blocco fotografico. o: {tone,cls,w,q,eager,sizes,alt,over} */
  function shot(pic, o) {
    o = o || {};
    if (!has(pic)) return '';
    // Il duotone e' un colpo, non un filtro di sistema: si applica solo dove
    // viene chiesto esplicitamente. Tutto il resto e' bianco e nero secco.
    const cls = ['ph', o.tone || 'ph-bw'].concat(o.cls ? [o.cls] : []).join(' ');
    return `<div class="${cls}">`
      + pic.tag({ w: o.w || 1200, q: o.q || 76, cls: 'ph-i', eager: !!o.eager, sizes: o.sizes, alt: o.alt })
      + (o.over || '')
      + '</div>';
  }

  // ticker fotografico: tutte le foto assegnate al lead, in fila
  const tickerPics = [
    pics.hero, pics.fleet && pics.fleet[0], pics.interni, pics.notturno,
    pics.fleet && pics.fleet[1], pics.autista, pics.aeroporto,
    pics.fleet && pics.fleet[2], pics.strada, pics.heroAlt, pics.citta
  ].filter(has);

  const photoTicker = tickerPics.length ? `
<div class="mq mq-ph" data-speed="30" aria-hidden="true">
  <div class="mq-track">${new Array(3).fill(
    `<span class="mq-seg">${tickerPics.map(p =>
      shot(p, { tone: 'ph-bw', cls: 'pcell', w: 400, q: 70, sizes: '200px' })
    ).join('')}</span>`
  ).join('')}</div>
</div>` : '';

  // testo del ticker: nome + servizi reali, separati da un simbolo
  const tickerParts = [name].concat(c.services.map(s => s[0])).concat([c.kicker]);
  const tickerSeg = tickerParts
    .map(p => `<span class="mq-w">${T(p)}</span><span class="mq-s" aria-hidden="true">+</span>`)
    .join('');
  const marqueeSegs = new Array(6).fill(`<span class="mq-seg">${tickerSeg}</span>`).join('');

  function marquee(speed) {
    return `<div class="mq" data-speed="${speed}" aria-hidden="true">
      <div class="mq-track">${marqueeSegs}</div>
    </div>`;
  }

  const waBtn = (cls, txt) => wa
    ? `<a class="${cls}" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${T(name)}">${WA_ICON}<span>${txt}</span></a>`
    : '';

  const telBtn = (cls, txt) =>
    `<a class="${cls}" href="tel:${esc(lead.tel)}" aria-label="Telefona a ${T(name)}">${PHONE_ICON}<span>${txt}</span></a>`;

  // accordo singolare/plurale sul dato reale delle recensioni
  const one = Number(lead.reviews) === 1;
  const revWord = one ? 'recensione' : 'recensioni';
  const statBlocks = c.stats.map((s, i) => {
    const label = (i === 1 && one && /recensioni/.test(s[1])) ? 'recensione verificata' : s[1];
    return `
      <div class="stat blk${i === 1 ? ' blk-ink' : ''}">
        <b class="num${i === 1 ? ' acx' : ''}" data-val="${T(s[0])}">${T(s[0])}</b>
        <span class="stat-l">${T(label)}</span>
      </div>`;
  }).join('');

  const services = c.services.map((s, i) => `
      <article class="blk blk-h svc rise${i === 1 ? ' blk-ink' : ''}">
        <span class="svc-n${i === 1 ? ' acx' : ''}">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="svc-t">${T(s[0])}</h3>
        <p class="svc-x">${T(s[1])}</p>
      </article>`).join('');

  const fleet = c.fleet.map((f, i) => {
    const fp = pics.fleet && pics.fleet[i];
    const art = has(fp)
      ? shot(fp, {
          tone: 'ph-bw',
          cls: 'car-art' + (i === 1 ? ' car-art-acc' : ''),
          w: 760, q: 76, sizes: '(max-width:900px) 260px, 340px',
          alt: f[0] + ' — ' + fp.alt.toLowerCase(),
          over: '<span class="car-grid" aria-hidden="true"></span>'
            + carSvg(fleetShapes[i] || 'sedan', 'car-svg')
        })
      : `<div class="ph ph-bw ${i === 1 ? 'car-art car-art-acc' : 'car-art'}">
          <span class="car-grid" aria-hidden="true"></span>
          ${carSvg(fleetShapes[i] || 'sedan', 'car-svg')}
        </div>`;
    return `
      <article class="car blk blk-h rise">
        ${art}
        <div class="car-b">
          <span class="car-tag">${T(f[1])}</span>
          <h3 class="car-t">${T(f[0])}</h3>
          <p class="car-x">${T(f[2])}</p>
        </div>
      </article>`;
  }).join('');

  const steps = [
    ['Scrivete', 'Data, ora, partenza, destinazione. Su WhatsApp o al telefono. Bastano trenta secondi.'],
    ['Ricevete il preventivo', 'Prezzo concordato prima della partenza. Se va bene si conferma, altrimenti nessun impegno.'],
    ['Viaggiate', 'L’autista arriva all’orario stabilito. Da lì in poi non dovete pensare a nulla.']
  ].map((s, i) => `
      <article class="step rise">
        <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="step-t">${T(s[0])}</h3>
        <p class="step-x">${T(s[1])}</p>
      </article>`).join('');

  const faq = c.faq.map(f => `
      <details class="faq">
        <summary><span class="faq-q">${T(f[0])}</span><span class="faq-i" aria-hidden="true"></span></summary>
        <div class="faq-a"><p>${T(f[1])}</p></div>
      </details>`).join('');

  const ratingBar = lead.rating ? `
      <div class="blk rate">
        <div class="stars" aria-hidden="true">${STAR}${STAR}${STAR}${STAR}${STAR}</div>
        <p class="rate-x"><b class="num" data-val="${T(lead.rating)}">${T(lead.rating)}</b> su Google${lead.reviews > 0 ? ` &middot; <b class="num" data-val="${lead.reviews}">${lead.reviews}</b> ${revWord}` : ''}</p>
      </div>` : `
      <div class="blk rate">
        <p class="rate-x">Reperibilità su prenotazione. Si risponde di persona, non da un centralino.</p>
      </div>`;

  const addressLine = lead.address
    ? `${T(lead.address)}${city ? `<br>${T(city)}` : ''}`
    : (city ? T(city) : '');

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${T(c.metaTitle)}</title>
<meta name="description" content="${T(c.metaDesc)}">
<meta name="theme-color" content="#0A0A0A">
<meta name="robots" content="noindex">
<meta property="og:title" content="${T(c.metaTitle)}">
<meta property="og:description" content="${T(c.metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ===================== CHROME — brutalismo di lusso =====================
   Accento di questa azienda: ${A.nome} ${A.hex.toUpperCase()} — assegnato
   dall'hash del lead, contrasto verificato AA contro l'inchiostro. */
:root{
  --ink:#0A0A0A;
  --paper:#EFEFEA;
  --acc:${A.hex};
  --acc-deep:${A.deep};
  --acc-veil:${A.veil};
  --acc-18:${A.a18};
  --acc-07:${A.a07};
  --line:3px;
  --gut:34px;
  --bleed:2400px;
  --disp:"Archivo Black","Arial Black","Helvetica Neue",Impact,sans-serif;
  --sans:"Archivo","Helvetica Neue",Helvetica,Arial,sans-serif;
}
@media (min-width:900px){:root{--gut:56px}}

*,*::before,*::after{box-sizing:border-box}
body{
  margin:0;
  background:var(--paper);
  color:var(--ink);
  font-family:var(--sans);
  font-size:16px;
  line-height:1.5;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  overflow-x:clip;
  padding-top:56px;
  padding-bottom:calc(74px + env(safe-area-inset-bottom,0px));
}
@media (min-width:861px){body{padding-bottom:0}}
img,svg{max-width:100%}
p{margin:0}
h1,h2,h3{margin:0;font-weight:400}
a{color:inherit}

::selection{background:var(--acc);color:var(--ink)}

a:focus-visible,button:focus-visible,summary:focus-visible{
  outline:var(--line) solid var(--ink);
  outline-offset:2px;
  box-shadow:0 0 0 7px var(--acc);
}

/* --------------------------------------------------------------- header */
.hd{
  position:fixed;top:0;left:0;right:0;z-index:60;
  height:56px;display:flex;align-items:stretch;
  background:var(--ink);color:var(--paper);
}
.hd-mark{
  flex:0 0 auto;width:56px;display:grid;place-items:center;
  background:var(--acc);color:var(--ink);
  font-family:var(--disp);font-size:20px;letter-spacing:-.02em;
  border-right:var(--line) solid var(--ink);
}
.hd-name{
  flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:center;
  padding:0 12px;
}
.hd-name b{
  font-family:var(--disp);font-size:13px;line-height:1;text-transform:uppercase;
  letter-spacing:.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.hd-name span{
  font-size:9px;line-height:1.3;letter-spacing:.26em;text-transform:uppercase;
  opacity:.72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.hd-cta{
  display:none;align-items:center;gap:8px;padding:0 22px;
  background:var(--acc);color:var(--ink);text-decoration:none;
  font-family:var(--disp);font-size:13px;text-transform:uppercase;letter-spacing:.02em;
  border-left:var(--line) solid var(--ink);
}
.hd-cta svg{width:17px;height:17px;flex:0 0 auto}
.hd-cta:hover,.hd-cta:active{background:var(--paper);color:var(--ink)}
@media (min-width:700px){.hd-cta{display:flex}}

/* ---------------------------------------------------------- impaginato */
.sec{position:relative;padding-left:var(--gut);border-bottom:var(--line) solid var(--ink);overflow:hidden}
.vtag{
  position:absolute;left:0;top:0;bottom:0;width:var(--gut);
  display:flex;align-items:flex-start;justify-content:center;
  border-right:var(--line) solid var(--ink);
  background:var(--paper);z-index:2;
}
.vtag i{
  writing-mode:vertical-rl;transform:rotate(180deg);
  font-style:normal;font-family:var(--disp);font-size:10px;line-height:1;
  letter-spacing:.34em;text-transform:uppercase;white-space:nowrap;padding:16px 0;
}
.vtag.vtag-dark{background:var(--ink);color:var(--paper);border-right-color:var(--paper)}
/* la fascia verticale non si tinge tutta: prende un solo quadrato d'accento
   in testa, grande quanto la colonna. Il ritmo resta, la superficie no. */
.vtag.vtag-acc::before{
  content:"";position:absolute;left:0;right:0;top:0;height:var(--gut);
  background:var(--acc);border-bottom:var(--line) solid var(--ink);
}
.vtag.vtag-acc i{padding-top:calc(var(--gut) + 16px)}
.pad{padding:26px 14px 30px}
@media (min-width:900px){.pad{padding:44px 30px 52px}}

.eyebrow{
  font-family:var(--disp);font-size:10px;line-height:1;letter-spacing:.32em;
  text-transform:uppercase;display:block;margin-bottom:14px;
}
.eyebrow em{font-style:normal;background:var(--acc);color:var(--ink);padding:2px 6px;margin:0 2px}
/* --------------------------------------------- tipografia su misura */
/* Ogni riga è dimensionata per riempire la colonna fino al bordo dello
   schermo senza mai eccederlo: il taglio non cade mai dentro una parola. */
.fit{display:block;margin:0 -14px 0 0;--fs:10}
@media (min-width:900px){.fit{margin-right:-30px}}
.zone-b .fit{margin-right:0}
.ml{
  display:block;font-family:var(--disp);text-transform:uppercase;
  font-size:calc(var(--fs) * 1vw);line-height:.82;letter-spacing:-.035em;
  white-space:nowrap;
}
.ml-acc{
  background:var(--acc);color:var(--ink);
  margin-left:-14px;padding-left:14px;
  margin-right:calc(var(--bleed) * -1);padding-right:var(--bleed);
}
@media (min-width:900px){.ml-acc{margin-left:-30px;padding-left:30px}}

/* -------------------------------------------------------------- blocchi */
.blk{
  background:var(--paper);color:var(--ink);
  border-right:var(--line) solid var(--ink);
  border-bottom:var(--line) solid var(--ink);
  padding:20px 16px 22px;
  position:relative;
}
.blk-acc{background:var(--acc);color:var(--ink)}
.blk-ink{background:var(--ink);color:var(--paper)}
/* dentro il nero l'accento resta un dettaglio tipografico: una cifra, una
   riga, un valore. All'inversione dell'hover torna inchiostro, altrimenti
   sparirebbe sul proprio colore. */
.acx{color:var(--acc)}
.blk-h.blk-ink:hover .acx,.blk-h.blk-ink:active .acx{color:var(--ink)}
/* inversione totale, di scatto: nessuna transizione */
.blk-h:hover,.blk-h:active{background:var(--ink);color:var(--paper)}
.blk-h.blk-acc:hover,.blk-h.blk-acc:active{background:var(--ink);color:var(--acc)}
.blk-h.blk-ink:hover,.blk-h.blk-ink:active{background:var(--acc);color:var(--ink)}
@media (hover:none){.blk-h:hover{background:var(--paper);color:var(--ink)}
  .blk-h.blk-acc:hover{background:var(--acc);color:var(--ink)}
  .blk-h.blk-ink:hover{background:var(--ink);color:var(--paper)}
  .blk-h.blk-ink:hover .acx{color:var(--acc)}}

/* ------------------------------------------------------------ bottoni */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:16px 22px;text-decoration:none;
  font-family:var(--disp);font-size:15px;text-transform:uppercase;letter-spacing:.02em;
  border:var(--line) solid var(--ink);
  box-shadow:6px 6px 0 0 var(--ink);
}
.btn svg{width:19px;height:19px;flex:0 0 auto}
.btn-acc{background:var(--acc);color:var(--ink)}
.btn-ink{background:var(--ink);color:var(--paper);box-shadow:6px 6px 0 0 var(--acc)}
.btn-acc:hover,.btn-acc:active{background:var(--ink);color:var(--acc)}
.btn-ink:hover,.btn-ink:active{background:var(--acc);color:var(--ink);box-shadow:6px 6px 0 0 var(--ink)}
.btns{display:flex;flex-wrap:wrap;gap:11px;margin-top:18px}
@media (min-width:900px){.btns{gap:14px;margin-top:22px}}

/* ---------------------------------------------------------------- hero */
.hero{border-bottom:var(--line) solid var(--ink)}
.hero-top{position:relative;z-index:3;padding:18px 14px 4px}
@media (min-width:900px){.hero-top{padding:38px 30px 10px}}
.hero-kick{
  font-family:var(--disp);font-size:9px;line-height:1.35;letter-spacing:.2em;text-transform:uppercase;
  display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap;
}
@media (min-width:700px){.hero-kick{font-size:10px;letter-spacing:.28em}}
.hero-kick b{
  font-weight:400;background:var(--ink);color:var(--paper);padding:5px 9px;
}
.hero-grid{position:relative;z-index:2;background:var(--paper);display:grid;grid-template-columns:1fr;border-top:var(--line) solid var(--ink)}
@media (min-width:900px){.hero-grid{grid-template-columns:1.1fr .9fr}}
/* il fondo lascia sempre spazio alla barra CTA fissa: nessun bottone
   può finire nascosto sotto la barra */
.hero-say{padding:18px 14px calc(26px + 76px);border-bottom:var(--line) solid var(--ink)}
@media (min-width:861px){.hero-say{padding-bottom:34px}}
@media (min-width:900px){.hero-say{border-bottom:0;border-right:var(--line) solid var(--ink);padding:34px 30px 40px}}
.hero-a{
  font-family:var(--disp);text-transform:uppercase;line-height:.84;letter-spacing:-.03em;
  font-size:clamp(30px,8.6vw,60px);
}
.hero-a i{font-style:normal;display:table;background:var(--acc);color:var(--ink);padding:0 .14em;margin-top:.08em}
.hero-lede{margin-top:14px;font-size:16px;line-height:1.5;max-width:46ch}
@media (min-width:900px){.hero-lede{margin-top:18px;font-size:18px}}

/* slot foto hero: la fotografia in bianco e nero stampata sulla carta
   sporca, sotto la silhouette disegnata a mano. L'accento entra solo
   nell'ombra dura della silhouette e nella targhetta. */
.hero-art{
  position:relative;isolation:isolate;background:var(--paper);color:var(--ink);
  min-height:206px;overflow:hidden;display:flex;align-items:flex-end;
}
@media (min-width:900px){.hero-art{min-height:320px}}
.hero-art .ph-i{
  filter:grayscale(1) contrast(1.28) brightness(1.04);
  mix-blend-mode:multiply;
}
.hero-art .dots{
  position:absolute;inset:0;
  background-image:radial-gradient(var(--ink) 1.4px,transparent 1.5px);
  background-size:13px 13px;opacity:.34;
}
.hero-art .bars{
  position:absolute;left:0;right:0;top:0;height:34px;
  background:repeating-linear-gradient(90deg,var(--ink) 0 14px,transparent 14px 28px);
}
/* la silhouette sta sopra la fotografia, non sotto: l'ombra dura in
   accento la stacca anche da uno scatto molto scuro */
.hero-car{
  position:relative;z-index:2;flex:0 0 auto;width:150%;max-width:none;
  margin:0 -34% -6px 6%;display:block;
  filter:drop-shadow(6px 6px 0 var(--acc));
}
.hero-art .plate{
  position:absolute;left:0;bottom:0;z-index:3;background:var(--ink);color:var(--acc);
  font-family:var(--disp);font-size:10px;letter-spacing:.3em;text-transform:uppercase;
  padding:8px 12px;
}

/* -------------------------------------------------------------- ticker */
.mq{
  background:var(--ink);color:var(--paper);
  border-top:var(--line) solid var(--ink);border-bottom:var(--line) solid var(--ink);
  overflow:hidden;padding:10px 0;
}
.mq-track{display:flex;width:max-content;will-change:transform}
.mq-seg{display:flex;align-items:center;white-space:nowrap}
.mq-w{
  font-family:var(--disp);text-transform:uppercase;letter-spacing:-.01em;
  font-size:clamp(26px,6.4vw,54px);line-height:1;
}
.mq-s{
  color:var(--acc);font-family:var(--disp);
  font-size:clamp(22px,5vw,44px);line-height:1;padding:0 .34em;
}

/* --------------------------------------------------------------- prova */
.proof{display:grid;grid-template-columns:repeat(3,1fr)}
.stat{padding:18px 10px 20px;text-align:left}
.num{font-family:var(--disp);font-size:clamp(28px,8vw,52px);line-height:.9;display:block;font-weight:400;font-variant-numeric:tabular-nums}
.stat-l{
  display:block;margin-top:8px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  font-weight:600;line-height:1.3;
}
.rate{display:flex;flex-wrap:wrap;align-items:center;gap:12px;padding:16px}
.stars{display:flex;gap:3px;color:var(--ink)}
.star{width:17px;height:17px}
.rate-x{font-size:13px;letter-spacing:.02em;font-weight:600}
.rate-x .num{display:inline;font-size:19px}
.proof-claim{padding:22px 16px}
.proof-claim h2{font-family:var(--disp);font-size:clamp(22px,6vw,38px);line-height:.92;text-transform:uppercase;letter-spacing:-.02em}
.proof-claim p{margin-top:10px;font-size:14px;font-weight:600;letter-spacing:.02em}

/* ------------------------------------------------------------ servizi */
.grid2{display:grid;grid-template-columns:1fr;border-top:var(--line) solid var(--ink)}
@media (min-width:700px){.grid2{grid-template-columns:1fr 1fr}}
.svc{padding:24px 16px 28px}
.svc-n{
  font-family:var(--disp);font-size:12px;letter-spacing:.24em;display:block;margin-bottom:14px;
}
.svc-t{font-family:var(--disp);font-size:clamp(22px,6.2vw,34px);line-height:.9;text-transform:uppercase;letter-spacing:-.02em}
.svc-x{margin-top:12px;font-size:15px;line-height:1.45;max-width:38ch}

/* ------------------------------------------------------------- flotta */
/* le tre vetture non sono allineate: si sfalsano in verticale */
.rail{display:flex;gap:0;align-items:flex-start;border-top:var(--line) solid var(--ink);overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;padding-bottom:2px}
.rail::-webkit-scrollbar{height:8px}
.rail::-webkit-scrollbar-track{background:var(--paper);border-top:var(--line) solid var(--ink)}
.rail::-webkit-scrollbar-thumb{background:var(--ink)}
.car{flex:0 0 auto;width:272px;scroll-snap-align:start;padding:14px 14px 0}
@media (min-width:900px){.car{width:352px;padding:18px 18px 0}}
@media (min-width:1180px){.car{width:428px}}
.car:nth-child(1){margin-top:0}
.car:nth-child(2){margin-top:38px}
.car:nth-child(3){margin-top:14px}
@media (min-width:900px){.car:nth-child(2){margin-top:56px}.car:nth-child(3){margin-top:22px}}
.car-art{
  aspect-ratio:16/11;color:var(--paper);
  margin:0 9px 9px 0;box-shadow:9px 9px 0 0 var(--ink);
}
.car-art-acc{color:var(--ink);box-shadow:9px 9px 0 0 var(--acc)}
.car-grid{
  position:absolute;inset:0;z-index:3;opacity:.34;
  background-image:linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px);
  background-size:26px 26px;
}
/* la silhouette resta leggibile su qualunque fotografia: contorno duro
   nel colore opposto, senza sfocatura */
.car-svg{position:absolute;z-index:4;left:-9%;bottom:-2px;display:block;width:118%;
  filter:drop-shadow(4px 4px 0 var(--ink))}
.car-art-acc .car-svg{filter:drop-shadow(4px 4px 0 var(--acc))}
.car-b{padding:20px 2px 22px}
.car-tag{font-family:var(--disp);font-size:10px;letter-spacing:.26em;text-transform:uppercase;display:block}
.car-t{font-family:var(--disp);font-size:clamp(20px,5.6vw,28px);line-height:.92;text-transform:uppercase;margin-top:10px;letter-spacing:-.02em}
.car-x{margin-top:10px;font-size:14px;line-height:1.45}
.rail-hint{font-size:10px;letter-spacing:.24em;text-transform:uppercase;font-weight:700;padding:12px 14px 0;opacity:.6}

/* ------------------------------------------------------- come funziona */
.how{background:var(--ink);color:var(--paper)}
.steps{display:grid;grid-template-columns:1fr;margin-top:24px;border-top:var(--line) solid var(--paper)}
@media (min-width:800px){.steps{grid-template-columns:repeat(3,1fr)}}
.step{padding:22px 16px 26px;border-bottom:var(--line) solid var(--paper)}
@media (min-width:800px){.step{border-bottom:0;border-right:var(--line) solid var(--paper)}.step:last-child{border-right:0}}
.step-n{font-family:var(--disp);font-size:clamp(44px,13vw,84px);line-height:.8;color:var(--acc);display:block}
.step-t{font-family:var(--disp);font-size:clamp(19px,5.4vw,26px);text-transform:uppercase;margin-top:12px;line-height:.94;letter-spacing:-.01em}
.step-x{margin-top:10px;font-size:14px;line-height:1.5;opacity:.86;max-width:34ch}

/* --------------------------------------------------------------- zona */
.zone{display:grid;grid-template-columns:1fr}
@media (min-width:900px){.zone{grid-template-columns:1.2fr .8fr}}
.zone-b{padding:24px 14px 28px}
@media (min-width:900px){.zone-b{padding:40px 30px}}
/* la mappa non è più una campitura d'accento: reticolo e anelli esterni
   sono di carta su nero, l'accento resta il pallino e il primo anello —
   cioè il punto in cui si guarda */
.zone-map{position:relative;isolation:isolate;background:var(--ink);color:var(--paper);min-height:230px;overflow:hidden}
.zone-map .ph-i{position:absolute;inset:0;z-index:1;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.5) brightness(.42)}
.zone-map .net,.zone-map .pin,.zone-map .ring{z-index:3}
.zone-map .net{
  position:absolute;inset:-20%;
  background-image:linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px);
  background-size:34px 34px;opacity:.16;transform:rotate(-9deg);
}
.zone-map .pin{position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;background:var(--acc);border-radius:50%}
.zone-map .ring{position:absolute;left:50%;top:50%;border:2px solid currentColor;border-radius:50%;opacity:.34}
.zone-map .r1{width:96px;height:96px;margin:-48px 0 0 -48px;border-color:var(--acc);opacity:1}
.zone-map .r2{width:172px;height:172px;margin:-86px 0 0 -86px;opacity:.26}
.zone-map .r3{width:250px;height:250px;margin:-125px 0 0 -125px;opacity:.14}
.zone-note{margin-top:16px;font-size:15px;line-height:1.5;max-width:42ch}
.zone-addr{
  margin-top:20px;display:inline-block;background:var(--acc);color:var(--ink);
  border:var(--line) solid var(--ink);box-shadow:6px 6px 0 0 var(--ink);
  padding:12px 14px;font-size:13px;font-weight:600;line-height:1.4;letter-spacing:.02em;
}

/* ---------------------------------------------------------------- faq */
.faq{border-bottom:var(--line) solid var(--ink)}
.faq:first-of-type{border-top:var(--line) solid var(--ink)}
.faq summary{
  list-style:none;cursor:pointer;display:flex;align-items:center;gap:14px;
  padding:18px 14px;font-family:var(--disp);text-transform:uppercase;
  font-size:clamp(15px,4.2vw,21px);line-height:1.04;letter-spacing:-.01em;
}
.faq summary::-webkit-details-marker{display:none}
.faq summary:hover,.faq summary:active{background:var(--ink);color:var(--paper)}
.faq-q{flex:1 1 auto}
.faq-i{
  flex:0 0 auto;width:26px;height:26px;position:relative;
  border:var(--line) solid currentColor;
}
.faq-i::before,.faq-i::after{content:"";position:absolute;background:currentColor}
.faq-i::before{left:4px;right:4px;top:9px;height:3px}
.faq-i::after{top:4px;bottom:4px;left:9px;width:3px}
.faq[open] .faq-i::after{display:none}
/* la riga aperta si inverte in nero: l'accento resta il quadratino del
   segno, non tutta la fascia */
.faq[open] summary{background:var(--ink);color:var(--paper)}
.faq[open] .faq-i{background:var(--acc);border-color:var(--acc)}
.faq[open] .faq-i::before{background:var(--ink)}
.faq[open] summary:hover,.faq[open] summary:active{color:var(--acc)}
.faq-a{padding:0 14px 20px;max-width:60ch}
.faq-a p{font-size:15px;line-height:1.55}

/* ----------------------------------------------------------- contatti */
.ct{display:grid;grid-template-columns:1fr;border-top:var(--line) solid var(--ink)}
@media (min-width:800px){.ct{grid-template-columns:repeat(3,1fr)}}
.ct-b{padding:24px 16px 26px;text-decoration:none;display:block}
.ct-l{font-family:var(--disp);font-size:10px;letter-spacing:.28em;text-transform:uppercase;display:block}
.ct-v{font-family:var(--disp);font-size:clamp(19px,5.2vw,26px);line-height:1.02;margin-top:12px;display:block;letter-spacing:-.01em;word-break:break-word}
.ct-x{margin-top:10px;font-size:13px;line-height:1.45;font-weight:600}

/* ------------------------------------------------------------- footer */
.ft{background:var(--ink);color:var(--paper);padding:30px 14px calc(30px + env(safe-area-inset-bottom,0px))}
@media (min-width:900px){.ft{padding:44px 30px}}
.ft-n{font-family:var(--disp);font-size:clamp(24px,7vw,44px);text-transform:uppercase;line-height:.9;letter-spacing:-.02em}
.ft-r{margin-top:18px;display:flex;flex-wrap:wrap;gap:12px 26px;align-items:baseline;font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;opacity:.72}
.ft-u{margin-top:22px;font-size:10px;letter-spacing:.26em;text-transform:uppercase;opacity:.5}
.ft-cta{margin-top:26px}

/* ------------------------------------------------------- barra mobile */
.bar{
  position:fixed;left:0;right:0;bottom:0;z-index:70;
  display:flex;border-top:var(--line) solid var(--ink);
  padding-bottom:env(safe-area-inset-bottom,0px);
  background:var(--paper);
}
@media (min-width:861px){.bar{display:none}}
.bar a{
  flex:1 1 0;display:flex;align-items:center;justify-content:center;gap:9px;
  padding:19px 8px;text-decoration:none;
  font-family:var(--disp);font-size:14px;text-transform:uppercase;letter-spacing:.02em;
}
.bar a svg{width:18px;height:18px}
.bar .b-wa{background:var(--acc);color:var(--ink);border-right:var(--line) solid var(--ink)}
.bar .b-tel{background:var(--ink);color:var(--paper)}
.bar .b-wa:active{background:var(--ink);color:var(--acc)}
.bar .b-tel:active{background:var(--acc);color:var(--ink)}

/* ====================================================== FOTOGRAFIA =====
   Trattamento CHROME: bianco e nero secco, contrastato, bordo nero pieno
   da 3px, ombra dura senza sfocatura, zero raggi d'angolo. Il duotone
   pieno resta a UNA sola fotografia per pagina (il dettaglio d'interni):
   è il colpo, e un colpo si dà una volta sola. Sotto ogni foto resta un
   fondo scuro del tema: se la rete cade non si apre mai un buco bianco. */
.ph{
  position:relative;isolation:isolate;overflow:hidden;
  border:var(--line) solid var(--ink);
  background-color:var(--ink);
  background-image:
    radial-gradient(circle at 24% 24%,var(--acc-18),transparent 58%),
    repeating-linear-gradient(90deg,var(--acc-07) 0 2px,transparent 2px 11px),
    linear-gradient(146deg,#0A0A0A 0%,var(--acc-deep) 52%,#0A0A0A 100%);
}
.ph-sh{box-shadow:10px 10px 0 0 var(--ink)}
.ph-sh-acc{box-shadow:10px 10px 0 0 var(--acc)}
.ph-i{
  position:absolute;inset:0;z-index:1;
  width:100%;height:100%;object-fit:cover;display:block;border:0;
}
/* duotone: le luci prendono l'accento, le ombre restano nere.
   Una sola foto per pagina lo porta. */
.ph-duo .ph-i{filter:grayscale(1) contrast(1.34) brightness(1.04)}
.ph-duo::before,.ph-duo::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none}
/* Il velo non copre a tinta piena: sfuma, cosi' anche una foto chiara resta una
   fotografia e non diventa un rettangolo di colore. */
.ph-duo::before{background:linear-gradient(158deg,var(--acc) 0%,var(--acc) 34%,transparent 88%);
  mix-blend-mode:multiply;opacity:.72}
.ph-duo::after{background:var(--acc-veil);mix-blend-mode:screen;opacity:.55}
/* bianco e nero secco */
.ph-bw .ph-i{filter:grayscale(1) contrast(1.44) brightness(.93)}
/* se la foto non arriva, via i velari: resta il fondo scuro disegnato */
.ph-off::before,.ph-off::after{display:none}

.ph-grid{
  position:absolute;inset:0;z-index:3;pointer-events:none;opacity:.42;
  background-image:linear-gradient(rgba(10,10,10,.85) 1px,transparent 1px),
    linear-gradient(90deg,rgba(10,10,10,.85) 1px,transparent 1px);
  background-size:28px 28px;
}
.ph-bars{
  position:absolute;left:0;right:0;top:0;height:22px;z-index:4;
  background:repeating-linear-gradient(90deg,var(--ink) 0 12px,transparent 12px 24px);
}
.ph-plate{
  position:absolute;left:0;bottom:0;z-index:5;
  background:var(--ink);color:var(--acc);
  font-family:var(--disp);font-size:10px;letter-spacing:.3em;text-transform:uppercase;
  padding:8px 12px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.ph-plate-acc{background:var(--acc);color:var(--ink)}

/* fascia fotografica dell'hero: la riga accento del titolo le passa
   davanti e la taglia di netto */
.hero-band{
  position:relative;z-index:1;display:block;
  height:clamp(184px,33vw,340px);margin-top:-26px;border-left:0;border-right:0;
}

/* fotografia dentro l'intestazione di una sezione */
.sec-head{display:grid;grid-template-columns:1fr;gap:20px}
@media (min-width:900px){.sec-head{grid-template-columns:1.12fr .88fr;gap:34px;align-items:end}}
.sec-head-t .fit{margin-right:0}
.sec-head-ph{aspect-ratio:16/10}
@media (min-width:900px){.sec-head-ph{aspect-ratio:16/9;max-height:262px;margin:0 10px 10px 0}}

/* prova: ritratto dell'autista accanto al blocco lime */
.proof-2{display:grid;grid-template-columns:1fr}
@media (min-width:800px){.proof-2{grid-template-columns:1.02fr .98fr}}
.proof-ph{min-height:222px;border-top:0}
@media (min-width:800px){.proof-ph{border-top:var(--line) solid var(--ink);border-left:0}}

/* ticker fotografico: piccole foto che scorrono, sfalsate a coppie */
.mq-ph{padding:14px 0}
.pcell{
  flex:0 0 auto;width:150px;height:102px;margin-right:14px;
}
.pcell:nth-child(even){transform:translateY(14px)}
@media (min-width:900px){.pcell{width:198px;height:132px;margin-right:18px}
  .pcell:nth-child(even){transform:translateY(20px)}}

/* foto gigante in bianco e nero, nome in carta sopra un velo d'inchiostro:
   qui il colore non serve, serve il buio */
.mono{
  position:relative;isolation:isolate;overflow:hidden;
  border-bottom:var(--line) solid var(--ink);
  min-height:clamp(300px,54vw,520px);
  display:flex;align-items:flex-end;
  background:linear-gradient(146deg,#0A0A0A 0%,var(--acc-deep) 52%,#0A0A0A 100%);
}
.mono-ph{position:absolute;inset:0;z-index:0;border:0}
.mono-ph .ph-i{filter:grayscale(1) contrast(1.5) brightness(.5)}
/* velo: garantisce il contrasto AA del testo su qualunque fotografia,
   anche chiarissima */
.mono::after{
  content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(180deg,rgba(10,10,10,.42) 0%,rgba(10,10,10,.88) 78%);
}
.mono-in{position:relative;z-index:4;width:100%;padding:26px 14px 30px}
@media (min-width:900px){.mono-in{padding:46px 30px 44px}}
.mono-eye{color:var(--paper)}
.mono-t{margin-right:0}
.mono-t .ml{color:var(--paper)}
.mono-x{
  position:relative;z-index:4;margin-top:14px;max-width:40ch;
  font-size:14px;line-height:1.5;font-weight:600;color:var(--paper);
  background:rgba(10,10,10,.72);display:inline-block;padding:10px 12px;
  border-left:var(--line) solid var(--acc);
}
@media (prefers-reduced-motion:reduce){.pcell:nth-child(even){transform:none}}

/* ------------------------------------------------------------ entrate */
.rise{opacity:0;transform:translate3d(0,26px,0)}
.rise.in{
  opacity:1;transform:none;
  transition:transform .34s steps(5,end),opacity .22s steps(3,end);
}
/* Nel rail la traslazione verrebbe tagliata: si entra con una spazzata
   secca. La tendina è un velo sopra la card, non un ritaglio della card:
   un clip-path a superficie nulla renderebbe l'elemento invisibile
   all'IntersectionObserver e la card non si rivelerebbe mai. */
.rail .rise{opacity:1;transform:none}
.rail .rise::before{
  content:"";position:absolute;inset:0;z-index:6;pointer-events:none;
  background:var(--paper);transform-origin:100% 50%;
}
.rail .rise.in::before{transform:scaleX(0);transition:transform .42s steps(6,end)}
@media (scripting:none){
  .rise{opacity:1;transform:none}
  .rail .rise::before{display:none}
}
@media (prefers-reduced-motion:reduce){
  .rise{opacity:1;transform:none;transition:none}
  .rail .rise::before{display:none}
  .mq-track{transform:none!important}
}
</style>
</head>
<body>

<header class="hd">
  <span class="hd-mark" aria-hidden="true">${T(initials(name))}</span>
  <div class="hd-name">
    <b>${T(name)}</b>
    <span>${T(c.kicker)}${city ? ' &middot; ' + T(city) : ''}</span>
  </div>
  ${wa
    ? `<a class="hd-cta" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${T(name)}">${WA_ICON}<span>Preventivo</span></a>`
    : `<a class="hd-cta" href="tel:${esc(lead.tel)}" aria-label="Telefona a ${T(name)}">${PHONE_ICON}<span>${T(lead.phoneDisplay)}</span></a>`}
</header>

<main>

<!-- ============================== HERO ============================== -->
<section class="sec hero" aria-labelledby="h1">
  <span class="vtag vtag-acc" aria-hidden="true"><i>${T(c.kicker)} &mdash; ${T(city)}</i></span>
  <div class="hero-top">
    <p class="hero-kick"><b>${T(lead.category)}</b></p>
    ${fitTitle(heroTitleText, { kind: 'mega', tag: 'h1', id: 'h1', acc: true })}
  </div>
  ${shot(pics.hero, {
    tone: 'ph-duo', cls: 'hero-band', w: 1900, q: 74, eager: true, sizes: '100vw',
    alt: pics.hero ? pics.hero.alt + ' — ' + name : '',
    over: PH_GRID + PH_BARS + plate(city)
  }) || '<div class="ph ph-duo hero-band"><span class="ph-grid" aria-hidden="true"></span></div>'}
  <div class="hero-grid">
    <div class="hero-say">
      <h2 class="hero-a">${T(c.heroA)}<i>${T(c.heroB)}</i></h2>
      <p class="hero-lede">${T(c.lede)}</p>
      <div class="btns">
        ${wa ? `<a class="btn btn-acc" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${T(name)}">${WA_ICON}<span>Preventivo su WhatsApp</span></a>` : ''}
        <a class="btn btn-ink" href="tel:${esc(lead.tel)}" aria-label="Telefona a ${T(name)}">${PHONE_ICON}<span>${T(lead.phoneDisplay)}</span></a>
      </div>
    </div>
    <div class="hero-art">
      ${has(pics.heroAlt) ? pics.heroAlt.tag({ w: 1100, q: 76, cls: 'ph-i', sizes: '(max-width:900px) 100vw, 620px' }) : ''}
      <span class="dots" aria-hidden="true"></span>
      <span class="bars" aria-hidden="true"></span>
      ${carSvg(heroShape, 'hero-car')}
      <span class="plate">${T(city)}</span>
    </div>
  </div>
</section>

${marquee(64)}

<!-- ============================= PROVA ============================== -->
<section class="sec" aria-label="Perché sceglierci">
  <span class="vtag" aria-hidden="true"><i>Numeri veri</i></span>
  <div class="proof">${statBlocks}</div>
  ${ratingBar}
  <div class="proof-2">
    <div class="blk blk-acc blk-h proof-claim">
      <h2>${T(c.proof[0])}</h2>
      <p>${T(c.proof[1])}</p>
    </div>
    ${shot(pics.autista, {
      tone: 'ph-bw', cls: 'proof-ph', w: 900, q: 76,
      sizes: '(max-width:800px) 100vw, 50vw',
      over: PH_GRID + plate('Chi guida', true)
    })}
  </div>
</section>

<!-- ============================ SERVIZI ============================= -->
<section class="sec" aria-labelledby="h-srv">
  <span class="vtag" aria-hidden="true"><i>Cosa facciamo</i></span>
  <div class="pad sec-head">
    <div class="sec-head-t">
      <span class="eyebrow">Servizi <em>&mdash;</em> ${T(city)}</span>
      ${fitTitle('Si fa così', { kind: 'head', cls: 'sec-h', id: 'h-srv' })}
    </div>
    ${shot(pics.interni, {
      tone: 'ph-bw', cls: 'sec-head-ph ph-sh', w: 900, q: 76,
      sizes: '(max-width:900px) 100vw, 44vw',
      over: PH_GRID + plate('A bordo')
    })}
  </div>
  <div class="grid2">${services}</div>
</section>

<!-- ============================= FLOTTA ============================= -->
<section class="sec" aria-labelledby="h-flt">
  <span class="vtag vtag-acc" aria-hidden="true"><i>Vetture</i></span>
  <div class="pad">
    <span class="eyebrow">Flotta <em>&mdash;</em> su richiesta</span>
    ${fitTitle('Scegliete', { kind: 'head', cls: 'sec-h', id: 'h-flt' })}
    <p class="rail-hint">Trascinate &rarr;</p>
  </div>
  <div class="rail">${fleet}</div>
</section>

<!-- ===================== TICKER FOTOGRAFICO ======================== -->
${photoTicker}

<!-- ================ FOTO GIGANTE + SCRITTA IN DIFFERENCE =========== -->
<section class="mono" aria-labelledby="h-mono">
  ${shot(pics.strada, {
    tone: 'ph-bw', cls: 'mono-ph', w: 2000, q: 74, sizes: '100vw',
    over: PH_GRID + PH_BARS
  }) || '<div class="ph ph-bw mono-ph"><span class="ph-grid" aria-hidden="true"></span></div>'}
  <div class="mono-in">
    <span class="eyebrow mono-eye">${T(city)} <em>&mdash;</em> ${T(c.kicker)}</span>
    ${fitTitle(name, { kind: 'head', tag: 'h2', cls: 'mono-t', id: 'h-mono' })}
    <p class="mono-x">Si parte quando dite voi. Preventivo prima, nessuna sorpresa dopo.</p>
  </div>
</section>

<!-- ========================== COME FUNZIONA ========================= -->
<section class="sec how" aria-labelledby="h-how">
  <span class="vtag vtag-dark" aria-hidden="true"><i>Tre passaggi</i></span>
  <div class="pad">
    <span class="eyebrow">Come funziona <em>&mdash;</em> senza attese</span>
    ${fitTitle('Scrivi. Ricevi. Viaggi.', { kind: 'head', cls: 'sec-h', id: 'h-how' })}
    <div class="steps">${steps}</div>
  </div>
</section>

<!-- =========================== ZONA OPERATIVA ====================== -->
<section class="sec" aria-labelledby="h-zone">
  <span class="vtag" aria-hidden="true"><i>Dove operiamo</i></span>
  <div class="zone">
    <div class="zone-b">
      <span class="eyebrow">Zona operativa</span>
      ${fitTitle(city, { kind: 'mega', id: 'h-zone' })}
      <p class="zone-note">Si parte da ${T(city)} e si arriva dove serve: percorso, orari e prezzo si concordano prima, mai dopo. Per le corse fuori zona basta chiedere.</p>
      ${addressLine ? `<p class="zone-addr">${addressLine}</p>` : ''}
    </div>
    <div class="zone-map">
      ${has(pics.citta || pics.aeroporto)
        ? (pics.citta || pics.aeroporto).tag({ w: 1000, q: 74, cls: 'ph-i', sizes: '(max-width:900px) 100vw, 40vw' })
        : ''}
      <span class="net" aria-hidden="true"></span>
      <span class="ring r3" aria-hidden="true"></span><span class="ring r2" aria-hidden="true"></span><span class="ring r1" aria-hidden="true"></span>
      <span class="pin" aria-hidden="true"></span>
    </div>
  </div>
</section>

<!-- ============================== FAQ ============================== -->
<section class="sec" aria-labelledby="h-faq">
  <span class="vtag vtag-acc" aria-hidden="true"><i>Domande</i></span>
  <div class="pad">
    <span class="eyebrow">Domande <em>&mdash;</em> risposte secche</span>
    ${fitTitle('Chiedete', { kind: 'head', cls: 'sec-h', id: 'h-faq' })}
  </div>
  <div class="faqs">${faq}</div>
</section>

${marquee(48)}

<!-- ============================ CONTATTI =========================== -->
<section class="sec" aria-labelledby="h-ct">
  <span class="vtag vtag-dark" aria-hidden="true"><i>Contatti</i></span>
  <div class="pad">
    <span class="eyebrow">Contatti <em>&mdash;</em> risponde una persona</span>
    ${fitTitle('Parliamone', { kind: 'head', cls: 'sec-h', id: 'h-ct' })}
  </div>
  <div class="ct">
    ${wa ? `<a class="blk blk-acc blk-h ct-b" href="${esc(wa)}" target="_blank" rel="noopener">
      <span class="ct-l">WhatsApp</span>
      <span class="ct-v">Scrivete ora</span>
      <span class="ct-x">Data, ora, partenza e destinazione. Rispondiamo con il preventivo.</span>
    </a>` : ''}
    <a class="blk blk-ink blk-h ct-b" href="tel:${esc(lead.tel)}">
      <span class="ct-l">Telefono</span>
      <span class="ct-v">${T(lead.phoneDisplay)}</span>
      <span class="ct-x">Chiamata diretta. Nessun centralino, nessuna coda.</span>
    </a>
    ${addressLine ? `<div class="blk blk-h ct-b">
      <span class="ct-l">Indirizzo</span>
      <span class="ct-v">${addressLine}</span>
      <span class="ct-x">Riferimento operativo. I servizi si concordano su appuntamento.</span>
    </div>` : ''}
  </div>
</section>

</main>

<footer class="ft">
  <p class="ft-n">${T(name)}</p>
  <div class="ft-r">
    <span>${T(c.kicker)}</span>
    <span>${T(lead.category)}</span>
    ${city ? `<span>${T(city)}</span>` : ''}
    <span>${T(lead.phoneDisplay)}</span>
  </div>
  <div class="ft-cta">
    ${wa
      ? `<a class="btn btn-acc" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${T(name)}">${WA_ICON}<span>Preventivo su WhatsApp</span></a>`
      : `<a class="btn btn-acc" href="tel:${esc(lead.tel)}" aria-label="Telefona a ${T(name)}">${PHONE_ICON}<span>Chiama ora</span></a>`}
  </div>
  <p class="ft-u">Anteprima realizzata da Umbra</p>
</footer>

<nav class="bar" aria-label="Contatti rapidi">
  ${wa ? `<a class="b-wa" href="${esc(wa)}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${T(name)}">${WA_ICON}<span>WhatsApp</span></a>` : ''}
  <a class="b-tel" href="tel:${esc(lead.tel)}" aria-label="Telefona a ${T(name)}">${PHONE_ICON}<span>Chiama</span></a>
</nav>

<script>
(function(){
  'use strict';
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = typeof IntersectionObserver === 'function';

  /* ---- titoli su misura ------------------------------------------------
     Ogni riga viene misurata con il font effettivamente in uso (anche di
     ripiego) e rimpicciolita finché sta dentro la colonna. Conseguenze:
     nessuna parola viene mai tranciata a metà e l'ultima riga è sempre
     intera. Il numero di righe cresce con la lunghezza del nome. */
  var fits = [].slice.call(document.querySelectorAll('.fit'));

  function fitOne(el){
    var words = (el.getAttribute('data-words') || '').split('|').filter(Boolean);
    if (!words.length) return;
    var avail = el.clientWidth;
    if (!avail || avail < 60) return;
    /* Riserva anti-taglio. La misura di una riga non comprende lo sbordo
       d'inchiostro dell'ultima lettera (il tracking è negativo): senza
       riserva l'ultimo glifo finisce mezzo fuori dallo schermo. Si toglie
       una fetta prudente e si aggiunge lo sbordo al modello. */
    var SAFE = Math.max(5, avail * 0.014);
    var W = avail - SAFE;
    var BEAR = 5;                               // sbordo su 100px di corpo
    var narrow = window.innerWidth < 700;
    var mega = el.getAttribute('data-fit') === 'mega';
    var maxFs = Math.min(W * (mega ? 0.44 : 0.32), mega ? (narrow ? 84 : 190) : (narrow ? 52 : 104));
    var maxLines = mega ? (narrow ? 4 : 3) : (narrow ? 3 : 2);
    var minFs = mega ? (narrow ? 22 : 38) : (narrow ? 18 : 30);

    var probe = document.createElement('span');
    probe.className = 'ml';
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;' +
      'white-space:pre;display:inline-block;font-size:100px;background:none;' +
      'padding:0;margin:0;width:auto;max-width:none';
    el.appendChild(probe);
    function size(t){
      probe.textContent = t;
      var w = probe.getBoundingClientRect().width || 1;
      return W / (w + BEAR) * 100;
    }
    function layout(floor){
      var out = [], i = 0, guard = 0;
      while (i < words.length && guard++ < 80){
        var cur = words[i], fs = size(cur), j = i + 1;
        while (j < words.length){
          var cand = cur + ' ' + words[j], cfs = size(cand);
          if (cfs < floor) break;
          cur = cand; fs = cfs; j++;
        }
        out.push({ t: cur, fs: Math.min(fs, maxFs) });   // mai forzato in su: sta sempre dentro
        i = j;
      }
      return out;
    }
    var floor = maxFs * 0.64;
    var lines = layout(floor), guard = 0;
    while (lines.length > maxLines && floor > minFs && guard++ < 12){
      floor = Math.max(minFs, floor * 0.85);
      lines = layout(floor);
    }
    el.removeChild(probe);

    var acc = el.getAttribute('data-acc') === 'last' ? lines.length - 1 : -1;
    while (el.firstChild) el.removeChild(el.firstChild);
    for (var n = 0; n < lines.length; n++){
      var s = document.createElement('span');
      s.className = 'ml' + (n === acc ? ' ml-acc' : '');
      s.style.fontSize = lines[n].fs.toFixed(1) + 'px';
      s.textContent = lines[n].t;
      el.appendChild(s);
    }

    /* Verifica sul rendering vero: nessuna riga può sporgere oltre il
       bordo della colonna. Si misura l'inchiostro con un Range (la riga
       accento ha un padding di sfondamento che falserebbe il rettangolo
       dell'elemento) e si stringe finché rientra. Conseguenza: il taglio
       non cade mai dentro una parola e l'ultima riga è sempre intera. */
    if (document.createRange){
      var rg = document.createRange();
      var lim = el.getBoundingClientRect().left + avail - 2;
      for (var m = 0; m < el.children.length; m++){
        var sp = el.children[m];
        var fs = parseFloat(sp.style.fontSize) || 0;
        var g = 0;
        rg.selectNodeContents(sp);
        while (fs > 8 && rg.getBoundingClientRect().right > lim && g++ < 16){
          fs *= 0.962;
          sp.style.fontSize = fs.toFixed(1) + 'px';
          rg.selectNodeContents(sp);
        }
      }
    }
  }

  /* La riga accento del titolo deve passare DAVANTI alla fascia
     fotografica dell'hero e tagliarla: la fascia risale sotto il titolo
     di poco meno di mezza riga, misurata sul corpo reale. */
  function bandOverlap(){
    var h1 = document.getElementById('h1');
    var band = document.querySelector('.hero-band');
    if (!h1 || !band) return;
    var acc = h1.querySelector('.ml-acc') || h1.lastElementChild;
    if (!acc) return;
    var h = acc.getBoundingClientRect().height || 0;
    var bh = band.getBoundingClientRect().height || 200;
    var ov = Math.max(18, Math.min(h * 0.42, bh * 0.36, 108));
    band.style.marginTop = '-' + Math.round(ov) + 'px';
  }

  /* Rete di sicurezza sul telefono: il nome del cliente e la fotografia
     devono stare insieme nella prima schermata. Se il titolo cresce troppo
     e spinge la fascia sotto la piega, il titolo si stringe: mai il
     contrario. Il nome resta comunque su più righe intere. */
  function heroGuard(){
    var h1 = document.getElementById('h1');
    var band = document.querySelector('.hero-band');
    var bar = document.querySelector('.bar');
    if (!h1 || !band || !bar) return;
    if (getComputedStyle(bar).display === 'none') return;
    var limit = window.innerHeight * 0.80;
    var base = [], i;
    for (i = 0; i < h1.children.length; i++) base.push(parseFloat(h1.children[i].style.fontSize) || 0);
    var k = 1, guard = 0;
    while (band.getBoundingClientRect().top > limit && k > 0.7 && guard++ < 8){
      k -= 0.05;
      for (i = 0; i < h1.children.length; i++) h1.children[i].style.fontSize = (base[i] * k).toFixed(1) + 'px';
      bandOverlap();
    }
  }

  function fitAll(){
    for (var i = 0; i < fits.length; i++) fitOne(fits[i]);
    bandOverlap();
    heroGuard();
  }
  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll).catch(function(){});
  setTimeout(fitAll, 400);
  var fitT;
  addEventListener('resize', function(){
    clearTimeout(fitT);
    fitT = setTimeout(fitAll, 140);
  }, { passive: true });

  /* ---- entrate a scatto ---- */
  var rises = [].slice.call(document.querySelectorAll('.rise'));
  if (RM || !hasIO) {
    rises.forEach(function(el){ el.classList.add('in'); });
  } else {
    var ioR = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); ioR.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    rises.forEach(function(el){ ioR.observe(el); });
    // rete di sicurezza: se lo scroll resta bloccato, mostra comunque il primo schermo
    setTimeout(function(){
      rises.forEach(function(el){
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight) el.classList.add('in');
      });
    }, 1200);
  }

  /* ---- contatori che sgranano ---- */
  var nums = [].slice.call(document.querySelectorAll('.num'));
  var DIG = '0123456789';
  function grind(el){
    var fin = el.getAttribute('data-val') || el.textContent;
    if (RM){ el.textContent = fin; return; }
    var t0 = 0, n = fin.length, dur = 620;
    function step(ts){
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur), out = '';
      for (var i = 0; i < n; i++){
        var ch = fin.charAt(i);
        if (ch >= '0' && ch <= '9'){
          out += (p * n * 1.5 - i >= 1) ? ch : DIG.charAt((Math.random() * 10) | 0);
        } else { out += ch; }
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step); else el.textContent = fin;
    }
    requestAnimationFrame(step);
  }
  if (!hasIO || RM){
    nums.forEach(function(el){ el.textContent = el.getAttribute('data-val') || el.textContent; });
  } else {
    var ioN = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ ioN.unobserve(e.target); grind(e.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function(el){ ioN.observe(el); });
  }

  /* ---- ticker infinito, inverte direzione allo scroll ---- */
  var dir = 1, lastY = window.pageYOffset || 0;
  addEventListener('scroll', function(){
    var y = window.pageYOffset || 0, d = y - lastY;
    if (d > 1){ dir = 1; lastY = y; }
    else if (d < -1){ dir = -1; lastY = y; }
  }, { passive: true });

  [].slice.call(document.querySelectorAll('.mq')).forEach(function(mq){
    var track = mq.querySelector('.mq-track');
    var seg = mq.querySelector('.mq-seg');
    if (!track || !seg) return;
    var base = parseFloat(mq.getAttribute('data-speed')) || 60;
    var x = 0, w = 1, visible = false, running = false, last = 0;

    function measure(){ w = seg.getBoundingClientRect().width || 1; }
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure).catch(function(){});
    addEventListener('resize', measure, { passive: true });

    if (RM) return;

    function frame(ts){
      if (!visible){ running = false; return; }
      var dt = last ? Math.min(64, ts - last) : 16;
      last = ts;
      x -= base * dir * dt / 1000;
      if (x <= -w) x += w; else if (x >= 0) x -= w;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      requestAnimationFrame(frame);
    }
    function start(){ if (!running){ running = true; last = 0; requestAnimationFrame(frame); } }

    if (!hasIO){ visible = true; start(); return; }
    new IntersectionObserver(function(entries){
      visible = entries[0].isIntersecting;
      if (visible) start();
    }, { threshold: 0 }).observe(mq);
  });

  /* ---- fotografie: se una non arriva, resta il fondo disegnato ----
     Si toglie l'immagine e si spengono i velari del duotone, altrimenti
     tingerebbero il fondo di sicurezza. Nessun rettangolo bianco. */
  function photoFail(im){
    im.style.display = 'none';
    var box = im.parentNode;
    if (box && box.classList) box.classList.add('ph-off');
  }
  [].slice.call(document.querySelectorAll('img[data-photo-slot]')).forEach(function(im){
    im.addEventListener('error', function(){ photoFail(im); });
    if (im.complete && im.naturalWidth === 0) photoFail(im);
  });

  /* ---- FAQ: una alla volta, cambio di stato istantaneo ---- */
  var faqs = [].slice.call(document.querySelectorAll('.faq'));
  faqs.forEach(function(d){
    d.addEventListener('toggle', function(){
      if (!d.open) return;
      faqs.forEach(function(o){ if (o !== d) o.open = false; });
    });
  });
})();
</script>

${intro}
</body>
</html>`;
};

window.U.m["chrome"]=module.exports;})();
