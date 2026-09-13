window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "GRANDTOUR" — heritage, carta da viaggio, verde inglese.
 *
 * Art direction: manifesto ferroviario italiano + livrea di una casa automobilistica
 * storica. Carta avorio, verde bottiglia, cuoio. Serif con personalità (Playfair
 * Display) + monospaziato (JetBrains Mono) per etichette, coordinate e didascalie.
 * Elementi firma: timbro circolare in SVG con testo curvato, tagliando con bordo
 * tratteggiato e mezzelune ritagliate, illustrazione a tratto di vettura d'epoca.
 *
 * Nessun fatto inventato: si usano solo i dati reali del lead e il copy di categoria.
 */

const { esc } = require('../lib/content.js');

/* Testo da stampare: escape HTML + apostrofi tipografici italiani. */
const T = s => esc(s).replace(/'/g, '’');

/* ------------------------------------------------------------------ helpers */

function initials(name) {
  const parts = String(name || '').replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  if (!parts.length) return 'GT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* Timbro circolare: doppio cerchio, città in testo curvato, motivo al centro. */
function stamp(city, kicker, id) {
  const top = String(city || '').toUpperCase();
  const bottom = String(kicker || '').toUpperCase();
  const topSize = top.length > 13 ? 17 : top.length > 9 ? 21 : 25;
  const topSpace = top.length > 13 ? 1.5 : top.length > 9 ? 2.5 : 4;
  const botSize = bottom.length > 24 ? 10 : 12;
  const tId = 'sArcT' + id, bId = 'sArcB' + id;
  return `
<svg class="stamp" viewBox="0 0 220 220" role="img" aria-label="Timbro: ${T(city)}" focusable="false">
  <defs>
    <path id="${tId}" d="M 110,110 m -80,0 a 80,80 0 1,1 160,0" fill="none"/>
    <path id="${bId}" d="M 110,110 m -76,0 a 76,76 0 0,0 152,0" fill="none"/>
  </defs>
  <g class="stamp-ring">
    <circle cx="110" cy="110" r="104" fill="none" stroke="currentColor" stroke-width="3"/>
    <circle cx="110" cy="110" r="96" fill="none" stroke="currentColor" stroke-width="1.1"/>
    <circle cx="110" cy="110" r="62" fill="none" stroke="currentColor" stroke-width="1.1"/>
  </g>
  <g class="stamp-type" fill="currentColor">
    <text font-size="${topSize}" letter-spacing="${topSpace}">
      <textPath href="#${tId}" startOffset="50%" text-anchor="middle">${T(top)}</textPath>
    </text>
    <text font-size="${botSize}" letter-spacing="1.6">
      <textPath href="#${bId}" startOffset="50%" text-anchor="middle">${T(bottom)}</textPath>
    </text>
  </g>
  <g class="stamp-core" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <circle cx="110" cy="110" r="26"/>
    <circle cx="110" cy="110" r="6.5" fill="currentColor" stroke="none"/>
    <path d="M110 84 L110 136 M84 110 L136 110 M91.6 91.6 L128.4 128.4 M128.4 91.6 L91.6 128.4"/>
    <path d="M 83,103 C 71,98 61,99 53,105 M 82,113 C 72,110 64,111 57,116" stroke-width="1.2"/>
    <path d="M 137,103 C 149,98 159,99 167,105 M 138,113 C 148,110 156,111 163,116" stroke-width="1.2"/>
    <path d="M 74,146 L 88,146 M 132,146 L 146,146" stroke-width="1.2"/>
  </g>
</svg>`;
}

/* Francobollo: cornice dentellata (maschera SVG), monogramma e città.
   Decorativo, sta sopra un angolo delle stampe. */
function postage(mono, city, id) {
  const holes = [];
  for (let x = 14; x <= 106; x += 11.5) {
    holes.push(`<circle cx="${x.toFixed(1)}" cy="5" r="3.6"/>`);
    holes.push(`<circle cx="${x.toFixed(1)}" cy="145" r="3.6"/>`);
  }
  for (let y = 16; y <= 134; y += 11.8) {
    holes.push(`<circle cx="5" cy="${y.toFixed(1)}" r="3.6"/>`);
    holes.push(`<circle cx="115" cy="${y.toFixed(1)}" r="3.6"/>`);
  }
  const mId = 'pgm' + id;
  const label = String(city || '').toUpperCase().slice(0, 16);
  /* la città più lunga deve restare dentro la cornice dentellata */
  const lSize = label.length > 10 ? 8.4 : label.length > 7 ? 10.4 : 13;
  const lSpace = label.length > 10 ? 1.2 : label.length > 7 ? 1.8 : 2.4;
  return `
<svg class="postage" viewBox="0 0 120 150" role="presentation" aria-hidden="true" focusable="false">
  <defs>
    <mask id="${mId}" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="150">
      <rect x="5" y="5" width="110" height="140" fill="#fff"/>
      <g fill="#000">${holes.join('')}</g>
    </mask>
  </defs>
  <g mask="url(#${mId})">
    <rect x="5" y="5" width="110" height="140" class="pg-paper"/>
    <rect x="13" y="13" width="94" height="124" class="pg-frame"/>
    <g class="pg-ink">
      <text x="60" y="42" text-anchor="middle" font-size="${lSize}" letter-spacing="${lSpace}">${T(label)}</text>
      <g class="pg-car" transform="translate(20,52)">
        <path d="M 2,34 L 2,22 C 2,18 5,16 10,15 L 26,12 L 34,3 C 37,1 41,0 45,0 L 60,0 C 65,0 68,2 70,5 L 75,13 L 72,15 L 76,17 C 78,18 79,20 79,23 L 79,34 L 70,34 A 8,8 0 0,0 54,34 L 28,34 A 8,8 0 0,0 12,34 Z"/>
        <circle cx="20" cy="34" r="7"/><circle cx="62" cy="34" r="7"/>
        <path d="M 36,12 L 41,4 L 52,4 L 52,12 Z"/>
      </g>
      <text x="60" y="112" text-anchor="middle" font-size="15" letter-spacing="2" class="pg-mono">${esc(mono)}</text>
      <text x="60" y="130" text-anchor="middle" font-size="8.4" letter-spacing="1.7">NORD ITALIA</text>
    </g>
  </g>
</svg>`;
}

/* Vettura d'epoca di profilo, resa a tratto tipo incisione. */
function motorcar(cls) {
  const spokes = (cx, cy, r) => {
    let out = '';
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 * i) / 12;
      const x1 = (cx + Math.cos(a) * 7).toFixed(1), y1 = (cy + Math.sin(a) * 7).toFixed(1);
      const x2 = (cx + Math.cos(a) * r).toFixed(1), y2 = (cy + Math.sin(a) * r).toFixed(1);
      out += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }
    return out;
  };
  const hatch = (x, y, n, dx, dy, len, step) => {
    let out = '';
    for (let i = 0; i < n; i++) {
      const ox = x + dx * i * step, oy = y + dy * i * step;
      out += `<line x1="${ox.toFixed(1)}" y1="${oy.toFixed(1)}" x2="${(ox + len * 0.55).toFixed(1)}" y2="${(oy - len).toFixed(1)}"/>`;
    }
    return out;
  };
  return `
<svg class="${cls || 'motorcar'}" viewBox="0 0 950 340" role="img" aria-label="Illustrazione a tratto di una vettura d’epoca di profilo" focusable="false">
  <g class="mc-shade" stroke="currentColor" stroke-width="1" opacity=".45" stroke-linecap="round">
    ${hatch(336, 290, 13, 1, 0, 13, 26)}
    ${hatch(474, 236, 8, 1, 0, 14, 23)}
  </g>
  <g class="mc-line" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path class="mc-body" d="M 86,258 L 86,206 C 86,192 96,184 114,181 L 190,176 L 424,170
      L 448,124 C 456,110 470,102 492,102 L 604,102 C 626,102 640,112 646,130
      L 672,176 L 792,184 C 818,188 832,198 832,216 L 832,246 C 832,254 826,258 816,258
      L 800,258 A 58,58 0 0,0 684,258 L 316,258 A 58,58 0 0,0 200,258 L 86,258 Z"/>
    <path class="mc-board" d="M 316,258 L 684,258 L 684,271 L 316,271 Z"/>
    <path class="mc-arch" d="M 310,258 A 52,52 0 0,0 206,258" stroke-width="1.3"/>
    <path class="mc-arch" d="M 794,258 A 52,52 0 0,0 690,258" stroke-width="1.3"/>
    <path class="mc-glass" d="M 456,166 L 476,128 L 540,126 L 540,166 Z"/>
    <path class="mc-glass" d="M 554,126 L 596,126 C 616,126 625,133 629,144 L 637,166 L 554,166 Z"/>
    <path class="mc-door" d="M 547,166 L 547,248 M 462,241 L 664,241"/>
    <path class="mc-detail" d="M 578,197 L 601,197"/>
    <path class="mc-detail" d="M 93,212 L 119,208 L 119,246 L 93,250 Z"/>
    <path class="mc-detail" d="M 99,220 L 113,218 M 99,228 L 113,226 M 99,236 L 113,234"/>
    <circle class="mc-lamp" cx="151" cy="164" r="17"/>
    <circle class="mc-lamp" cx="151" cy="164" r="7.5" stroke-width="1.2"/>
    <path class="mc-detail" d="M 151,181 L 151,195"/>
    <path class="mc-detail" d="M 344,185 L 336,212 M 366,184 L 358,211 M 388,183 L 380,210 M 410,182 L 402,209"/>
    <path class="mc-detail" d="M 690,196 L 806,203"/>
    <path class="mc-detail" d="M 424,170 L 448,124"/>
  </g>
  <g class="mc-wheels" fill="none" stroke="currentColor" stroke-width="2.6">
    <circle cx="258" cy="250" r="46"/><circle cx="258" cy="250" r="30" stroke-width="1.5"/>
    <circle cx="258" cy="250" r="7" fill="currentColor" stroke="none"/>
    <g stroke-width="1.1" opacity=".85">${spokes(258, 250, 28)}</g>
    <circle cx="742" cy="250" r="46"/><circle cx="742" cy="250" r="30" stroke-width="1.5"/>
    <circle cx="742" cy="250" r="7" fill="currentColor" stroke="none"/>
    <g stroke-width="1.1" opacity=".85">${spokes(742, 250, 28)}</g>
  </g>
  <g class="mc-ground" stroke="currentColor" stroke-linecap="round">
    <line x1="24" y1="296" x2="926" y2="296" stroke-width="1.6"/>
    <line x1="70" y1="310" x2="236" y2="310" stroke-width="1" opacity=".55"/>
    <line x1="300" y1="310" x2="418" y2="310" stroke-width="1" opacity=".4"/>
    <line x1="640" y1="310" x2="872" y2="310" stroke-width="1" opacity=".55"/>
  </g>
</svg>`;
}

/* Silhouette scelta in base al nome della vettura — decorativa, mai una foto. */
function silhouette(label) {
  const s = String(label || '').toLowerCase();
  const kind = /van|minibus|navetta|suv/.test(s) ? 'van'
    : /limousine|lunga|ammiraglia/.test(s) ? 'long'
      : /cabrio|sportiv/.test(s) ? 'low' : 'sedan';
  const wheels = (a, b) => `<circle cx="${a}" cy="96" r="17"/><circle cx="${a}" cy="96" r="7" stroke-width="1.2"/>
    <circle cx="${b}" cy="96" r="17"/><circle cx="${b}" cy="96" r="7" stroke-width="1.2"/>`;
  const bodies = {
    sedan: `<path d="M 24,100 L 24,80 C 24,72 30,68 40,66 L 76,60 L 96,36 C 102,28 112,24 124,24 L 176,24 C 190,24 198,29 202,38 L 214,62 L 246,68 C 256,71 262,76 262,86 L 262,100 L 236,100 A 22,22 0 0,0 192,100 L 92,100 A 22,22 0 0,0 48,100 Z"/>
      <path d="M 100,60 L 116,38 L 148,38 L 148,60 Z" stroke-width="1.3"/>
      <path d="M 158,38 L 176,38 C 184,38 188,41 190,47 L 196,60 L 158,60 Z" stroke-width="1.3"/>`,
    van: `<path d="M 22,100 L 22,54 C 22,42 28,34 40,30 L 76,20 L 200,20 C 216,20 226,26 232,38 L 250,66 C 258,74 262,80 262,90 L 262,100 L 238,100 A 22,22 0 0,0 194,100 L 94,100 A 22,22 0 0,0 50,100 Z"/>
      <path d="M 46,36 L 46,60 L 96,60 L 96,32 Z" stroke-width="1.3"/>
      <path d="M 110,32 L 110,60 L 168,60 L 168,32 Z" stroke-width="1.3"/>
      <path d="M 182,32 L 210,32 L 226,60 L 182,60 Z" stroke-width="1.3"/>`,
    long: `<path d="M 16,100 L 16,82 C 16,74 22,70 32,68 L 66,62 L 84,38 C 90,30 100,26 112,26 L 214,26 C 228,26 236,31 240,40 L 250,64 L 262,68 C 270,71 274,76 274,86 L 274,100 L 246,100 A 22,22 0 0,0 202,100 L 96,100 A 22,22 0 0,0 52,100 Z"/>
      <path d="M 90,62 L 104,40 L 136,40 L 136,62 Z" stroke-width="1.3"/>
      <path d="M 146,40 L 178,40 L 178,62 L 146,62 Z" stroke-width="1.3"/>
      <path d="M 188,40 L 214,40 C 222,40 226,43 228,49 L 232,62 L 188,62 Z" stroke-width="1.3"/>`,
    low: `<path d="M 20,100 L 20,84 C 20,76 26,71 38,68 L 82,58 L 110,38 C 118,32 128,30 140,30 L 178,30 C 194,30 204,36 210,46 L 224,64 L 250,70 C 260,73 264,78 264,88 L 264,100 L 236,100 A 22,22 0 0,0 192,100 L 92,100 A 22,22 0 0,0 48,100 Z"/>
      <path d="M 116,58 L 132,42 L 172,42 L 186,58 Z" stroke-width="1.3"/>`
  };
  const wx = kind === 'long' ? wheels(74, 224) : kind === 'van' ? wheels(72, 216) : wheels(70, 214);
  return `<svg class="sil" viewBox="0 0 290 130" role="presentation" focusable="false" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">${bodies[kind]}${wx}</g>
    <line x1="6" y1="118" x2="284" y2="118" stroke="currentColor" stroke-width="1.2" opacity=".45"/>
  </svg>`;
}

/* Stelle disegnate sul voto reale: piene, mezze o vuote. Mai cinque per abitudine. */
function starRow(rating) {
  const v = parseFloat(String(rating).replace(',', '.'));
  if (!isFinite(v)) return '';
  const d = 'M10 1.4l2.4 5.4 5.9.6-4.4 3.9 1.3 5.8L10 14.1 4.8 17.1l1.3-5.8L1.7 7.4l5.9-.6z';
  let out = '', defs = '';
  for (let i = 0; i < 5; i++) {
    const p = Math.max(0, Math.min(1, v - i));
    let fill;
    if (p >= 0.97) fill = 'currentColor';
    else if (p <= 0.03) fill = 'none';
    else {
      const gid = 'stg' + i;
      defs += `<linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="${(p * 100).toFixed(0)}%" stop-color="currentColor"/>
        <stop offset="${(p * 100).toFixed(0)}%" stop-color="currentColor" stop-opacity="0"/></linearGradient>`;
      fill = `url(#${gid})`;
    }
    out += `<svg width="15" height="15" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="${d}" fill="${fill}" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>`;
  }
  const defBlock = defs ? `<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute"><defs>${defs}</defs></svg>` : '';
  return `<span class="stars" aria-hidden="true">${defBlock}${out}</span>`;
}

/* Rosa dei venti / bussola a tratto per la sezione territorio. */
const compass = `
<svg class="compass" viewBox="0 0 200 200" role="presentation" aria-hidden="true" focusable="false">
  <g fill="none" stroke="currentColor" stroke-linecap="round">
    <circle cx="100" cy="100" r="88" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="74" stroke-width="1" opacity=".6" stroke-dasharray="3 7"/>
    <circle cx="100" cy="100" r="30" stroke-width="1"/>
    <path d="M100 12 L112 88 L100 100 L88 88 Z" stroke-width="1.6"/>
    <path d="M100 188 L112 112 L100 100 L88 112 Z" stroke-width="1.6"/>
    <path d="M12 100 L88 112 L100 100 L88 88 Z" stroke-width="1.2" opacity=".75"/>
    <path d="M188 100 L112 112 L100 100 L112 88 Z" stroke-width="1.2" opacity=".75"/>
    <path d="M100 12 L112 88 L100 100 Z" fill="currentColor" opacity=".16" stroke="none"/>
  </g>
</svg>`;

/* Stampa incollata nel diario: cornice di carta, virata seppia-verde, grana,
   bordi sfumati nella carta e didascalia a macchina. Se la foto non arriva
   resta il fondo verde inciso: mai un rettangolo bianco. */
function photoCard(pic, o) {
  if (!pic) return '';
  const opt = o || {};
  const style = [];
  if (opt.d) style.push('--d:' + opt.d + 'ms');
  if (opt.ratio) style.push('aspect-ratio:' + opt.ratio);
  const corners = opt.corners
    ? '<span class="pc pc1"></span><span class="pc pc2"></span><span class="pc pc3"></span><span class="pc pc4"></span>'
    : '';
  return `
    <figure class="ph ${opt.cls || ''}"${opt.rise === false ? '' : ' data-rise'}${style.length ? ` style="${style.join(';')}"` : ''}>
      <div class="ph-win">
        ${opt.ghost ? `<div class="ph-ghost" aria-hidden="true">${opt.ghost}</div>` : ''}
        ${pic.tag({
          w: opt.w || 900,
          q: opt.q || 74,
          cls: 'ph-img',
          eager: !!opt.eager,
          alt: opt.alt || pic.alt,
          sizes: opt.sizes || '(max-width:900px) 92vw, ' + (opt.w || 900) + 'px'
        })}
        <span class="ph-veil" aria-hidden="true"></span>
        ${corners}
      </div>
      <figcaption class="ph-cap">${opt.cap || ''}</figcaption>
      ${opt.badge || ''}
    </figure>`;
}

/* ------------------------------------------------------------------- render */

module.exports = function render(lead, c, intro) {
  const name = T(lead.name);
  const city = T(lead.city);
  const cityUp = T(String(lead.city || '').toUpperCase());
  const tel = esc(lead.tel);
  const phone = esc(lead.phoneDisplay);
  const wa = lead.whatsapp ? esc(lead.whatsapp) : null;
  const addr = lead.address ? T(lead.address) : null;
  const cat = T(lead.category || c.kicker);
  const mono = initials(lead.name);

  const waBtn = (cls, label) => wa
    ? `<a class="${cls}" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">${label}</a>`
    : '';

  /* --- servizi --- */
  const services = c.services.map((s, i) => `
    <li class="srv" data-rise style="--d:${i * 90}ms">
      <span class="srv-n">${String(i + 1).padStart(2, '0')}</span>
      <div class="srv-b">
        <h3>${T(s[0])}</h3>
        <p>${T(s[1])}</p>
      </div>
      <svg class="srv-rule" viewBox="0 0 400 2" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line x1="0" y1="1" x2="400" y2="1" stroke="currentColor" stroke-width="1.4" stroke-dasharray="6 6"/>
      </svg>
    </li>`).join('');

  /* --- flotta: stampe con gli angoli fotografici, la silhouette resta sotto --- */
  const fleet = c.fleet.map((f, i) => `
    <article class="car" data-rise style="--d:${i * 110}ms">
      <div class="car-art">
        ${photoCard(c.pics.fleet[i], {
          cls: 'ph-r' + (i % 3 + 1),
          rise: false,
          corners: true,
          w: 760,
          sizes: '(max-width:900px) 84vw, 340px',
          ghost: silhouette(f[0]),
          alt: f[0] + ' — ' + (c.pics.fleet[i] ? c.pics.fleet[i].alt : ''),
          cap: String(i + 1).padStart(2, '0') + ' · ' + T(f[0])
        })}
      </div>
      <div class="car-b">
        <span class="tag">${T(f[1])}</span>
        <h3>${T(f[0])}</h3>
        <p>${T(f[2])}</p>
      </div>
    </article>`).join('');

  /* --- come funziona --- */
  const STEPS = [
    [wa ? 'Ci scrivete' : 'Ci chiamate',
      wa ? 'Data, orario, punto di partenza e destinazione. Bastano due righe su WhatsApp, anche di sera.'
        : 'Data, orario, punto di partenza e destinazione. Una telefonata basta: il numero è sempre lo stesso.'],
    ['Vi rispondiamo', 'Ricevete il preventivo concordato prima della partenza, con la vettura adatta al numero di persone e ai bagagli.'],
    ['Si viaggia', 'All’ora stabilita l’auto è dove vi serve. Voi salite e basta: al resto pensiamo noi.']
  ];
  const steps = STEPS.map((s, i) => `
    <li class="step" data-rise style="--d:${i * 130}ms">
      <span class="step-n">${String(i + 1).padStart(2, '0')}</span>
      <h3>${T(s[0])}</h3>
      <p>${T(s[1])}</p>
    </li>`).join('');

  /* --- territorio --- */
  const DEST = [
    ['Aeroporti e scali', 'Arrivi e partenze, con il volo tenuto d’occhio.'],
    ['Stazioni e alta velocità', 'Coincidenze strette, bagagli veri, nessuna corsa.'],
    ['Hotel e strutture ricettive', 'Prese e riconsegne dove alloggiate.'],
    ['Location per eventi', 'Ville, ristoranti e sale della zona.'],
    ['Fiere e centri direzionali', 'Appuntamenti di lavoro, con l’auto che attende.'],
    ['Fuori porta e lunga percorrenza', 'Trasferimenti verso altre città, con il prezzo stabilito prima.']
  ];
  const dests = DEST.map((d, i) => `
    <li data-rise style="--d:${i * 70}ms"><b>${T(d[0])}</b><span>${T(d[1])}</span></li>`).join('');

  /* --- faq --- */
  const faq = c.faq.map((f, i) => `
    <div class="qa" data-rise style="--d:${i * 70}ms">
      <h3><button type="button" class="qa-q" aria-expanded="false" aria-controls="qa${i}" id="qb${i}">
        <span class="qa-mk">${String(i + 1).padStart(2, '0')}</span>
        <span class="qa-t">${T(f[0])}</span>
        <span class="qa-ic" aria-hidden="true"></span>
      </button></h3>
      <div class="qa-a" id="qa${i}" role="region" aria-labelledby="qb${i}"><div><p>${T(f[1])}</p></div></div>
    </div>`).join('');

  /* --- statistiche reali (solo correzione di concordanza, nessun dato aggiunto) --- */
  const stats = c.stats.map((s0, i) => {
    const s = String(s0[0]) === '1' ? [s0[0], String(s0[1]).replace('recensioni verificate', 'recensione verificata')] : s0;
    return `
    <div class="stat" data-rise style="--d:${i * 90}ms">
      <b>${T(s[0])}</b><span>${T(s[1])}</span>
    </div>`;
  }).join('');

  const ratingLine = lead.rating
    ? `<span class="rate"><b>${T(lead.rating)}</b> su Google${lead.reviews > 0 ? ` <i>— ${esc(lead.reviews)} ${lead.reviews === 1 ? 'recensione' : 'recensioni'}</i>` : ''}</span>`
    : `<span class="rate"><b>Su prenotazione</b> <i>— tutti i giorni</i></span>`;

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${T(c.metaTitle)}</title>
<meta name="description" content="${T(c.metaDesc)}">
<meta name="theme-color" content="#12352A">
<meta property="og:title" content="${T(c.metaTitle)}">
<meta property="og:description" content="${T(c.metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2312352A'/%3E%3Ccircle cx='16' cy='16' r='10' fill='none' stroke='%23EFE7D6' stroke-width='1.4'/%3E%3Ccircle cx='16' cy='16' r='3' fill='%23A9713D'/%3E%3C/svg%3E">
<style>
:root{
  --paper:#EFE7D6;
  --paper-2:#E7DDC8;
  --paper-3:#F6F1E5;
  --green:#12352A;
  --green-2:#0C271F;
  --green-3:#1D4A3B;
  --tan:#A9713D;
  --tan-ink:#8A5526;
  --tan-lt:#D8A45E;
  --ink:#1B1710;
  --ink-2:#4A4034;
  --line:rgba(18,53,42,.24);
  --line-2:rgba(18,53,42,.13);
  --serif:'Playfair Display',"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --mono:'JetBrains Mono',"SFMono-Regular",Menlo,Consolas,"Liberation Mono","Courier New",monospace;
  --pad:clamp(20px,5vw,64px);
  --maxw:1180px;
  --grain-a:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  --grain-b:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23m)' opacity='0.16'/%3E%3C/svg%3E");
}
*,*::before,*::after{box-sizing:border-box}
body{
  margin:0;background:var(--paper);color:var(--ink);
  font-family:var(--serif);font-size:17px;line-height:1.62;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
  overflow-x:hidden;
}
img,svg{max-width:100%}
h1,h2,h3,h4{margin:0;font-weight:500;line-height:1.08;letter-spacing:-.012em}
p{margin:0}
figure{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
a{color:inherit}
:focus-visible{outline:2.5px solid var(--tan-ink);outline-offset:3px;border-radius:2px}

/* ---------- carta: rumore + vignettatura ----------
   Il rumore sta SOPRA il contenuto (multiply), così la grana si vede anche
   sulle fasce verdi; le sezioni scure hanno in più una grana propria. */
.grain{
  position:fixed;inset:0;z-index:8000;pointer-events:none;
  background-image:var(--grain-a);
  opacity:.16;mix-blend-mode:multiply;
}
.vignette{
  position:fixed;inset:0;z-index:8001;pointer-events:none;
  background:
    radial-gradient(125% 105% at 50% 42%, rgba(0,0,0,0) 52%, rgba(60,42,20,.11) 82%, rgba(38,26,10,.22) 100%);
}
main,header,footer,.bar{position:relative;z-index:2}

/* ---------- utilità ---------- */
.wrap{max-width:var(--maxw);margin:0 auto;padding-left:var(--pad);padding-right:var(--pad)}
.mono{font-family:var(--mono)}
.cap{
  font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;
  color:var(--tan-ink);display:flex;align-items:center;gap:.6em;flex-wrap:wrap;
}
.cap::before{content:"\\2014\\2014";letter-spacing:-.08em;opacity:.7}
.cap::after{content:"\\2014\\2014";letter-spacing:-.08em;opacity:.7}
.eyebrow{
  display:inline-block;font-family:var(--mono);font-size:.72rem;font-weight:500;letter-spacing:.3em;
  text-transform:uppercase;color:var(--tan-ink);
}
.sec-head{display:flex;flex-direction:column;gap:14px;margin-bottom:clamp(28px,4vw,48px)}
.sec-head h2{font-size:clamp(2rem,5.4vw,3.4rem)}
.sec-head h2 em{font-style:italic;color:var(--tan-ink)}
.sec-head p{max-width:56ch;color:var(--ink-2);font-size:1.03rem}
section{padding:clamp(56px,8vw,110px) 0}
.rule{height:1px;background:repeating-linear-gradient(90deg,var(--line) 0 7px,transparent 7px 14px)}

/* ---------- animazioni ---------- */
[data-rise]{opacity:0;transform:translateY(18px);transition:opacity .8s cubic-bezier(.22,.7,.3,1) var(--d,0ms),transform .8s cubic-bezier(.22,.7,.3,1) var(--d,0ms)}
[data-rise].in{opacity:1;transform:none}
.srv-rule line{stroke-dasharray:6 6}
/* l'incisione si compone: prima il tratto, poi ruote, ombreggiatura e terreno */
.motorcar .mc-wheels,.motorcar .mc-ground{opacity:0;transition:opacity 1s ease .6s}
.motorcar .mc-shade{opacity:0;transition:opacity 1s ease 1.15s}
.in .motorcar .mc-wheels,.in .motorcar .mc-ground{opacity:1}
.in .motorcar .mc-shade{opacity:.45}

/* ---------- fotografia: stampe incollate nel diario ----------
   Ogni finestra fotografica ha sotto un fondo verde inciso: se la foto non
   arriva resta una stampa scura, mai un buco bianco. */
.ph{
  position:relative;margin:0;background:var(--paper-3);
  padding:12px 14px 11px 12px;border:1px solid rgba(18,53,42,.17);
  border-radius:1px 2px 1px 2px;
  box-shadow:0 1px 0 rgba(255,255,255,.55) inset,0 22px 40px -32px rgba(28,20,8,.9);
  transition:transform .55s cubic-bezier(.25,.8,.35,1),box-shadow .55s ease;
}
.ph::before{
  content:"";position:absolute;inset:0;pointer-events:none;
  background-image:var(--grain-b);opacity:.6;mix-blend-mode:multiply;
}
.ph-win,.post-win,.strip-ph{
  position:relative;overflow:hidden;
  background-color:var(--green-2);
  background-image:
    repeating-linear-gradient(46deg,rgba(239,231,214,.055) 0 2px,transparent 2px 11px),
    radial-gradient(120% 118% at 50% 4%,#1D4A3B 0%,#0C271F 58%,#06130D 100%);
}
.ph-win{aspect-ratio:4/3}
.ph-img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;
  filter:sepia(.3) saturate(.8) contrast(.96);
  /* se la foto non arriva non deve comparire il testo alternativo sopra la stampa */
  font-size:0;color:transparent;
}
.ph-ghost{position:absolute;left:6%;right:6%;top:50%;transform:translateY(-50%);
  color:var(--tan-lt);opacity:.5}
.ph-ghost svg{display:block;width:100%;height:auto}
/* virata seppia-verde + grana stampata sopra l'immagine */
.ph-veil{
  position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.55;
  background-image:var(--grain-a),
    linear-gradient(158deg,rgba(18,53,42,.36),rgba(169,113,61,.24) 58%,rgba(12,39,31,.44));
  background-size:220px 220px,cover;
}
/* i bordi sfumano dentro la carta */
.ph-win::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 0 18px 9px var(--paper-3),inset 0 0 52px rgba(28,20,8,.26);
}
.post-edge{position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 0 26px 13px var(--paper-3),inset 0 0 90px rgba(12,39,31,.4)}
/* didascalia battuta a macchina */
.ph-cap{
  margin:11px 2px 1px;font-family:var(--mono);font-size:.64rem;line-height:1.5;
  letter-spacing:.09em;text-transform:uppercase;color:var(--ink-2);
  display:flex;gap:.65em;align-items:baseline;text-shadow:0 0 .5px rgba(27,23,16,.45);
}
.ph-cap::before{content:"";width:6px;height:6px;flex:0 0 6px;background:var(--tan);align-self:center}
/* angoli fotografici da album */
.pc{position:absolute;z-index:2;width:clamp(20px,5.4vw,30px);height:clamp(20px,5.4vw,30px);pointer-events:none;
  background:linear-gradient(135deg,rgba(50,32,13,.94),rgba(120,79,36,.88));
  box-shadow:0 1px 3px rgba(0,0,0,.4)}
.pc1{top:0;left:0;clip-path:polygon(0 0,100% 0,0 100%)}
.pc2{top:0;right:0;clip-path:polygon(100% 0,100% 100%,0 0)}
.pc3{bottom:0;right:0;clip-path:polygon(100% 100%,0 100%,100% 0)}
.pc4{bottom:0;left:0;clip-path:polygon(0 100%,0 0,100% 100%)}
/* rotazioni minime, sempre dentro il padding del contenitore;
   la rotazione passa da una variabile per non litigare con la comparsa in scroll */
.ph{--rot:0deg;transform:rotate(var(--rot))}
.ph-r1{--rot:-1.2deg}
.ph-r2{--rot:1deg}
.ph-r3{--rot:-.7deg}
[data-rise].ph{transform:translateY(18px) rotate(var(--rot))}
[data-rise].ph.in{transform:rotate(var(--rot))}
.ph:hover,[data-rise].ph.in:hover{transform:rotate(0deg) translateY(-3px)}
.ph:hover{box-shadow:0 1px 0 rgba(255,255,255,.55) inset,0 28px 44px -30px rgba(28,20,8,.85)}
/* francobollo e timbro appoggiati su un angolo */
.postage{display:block;width:100%;height:auto;font-family:var(--mono);font-weight:500}
.pg-paper{fill:var(--paper-3)}
.pg-frame{fill:none;stroke:var(--green);stroke-width:1.2;opacity:.55}
.pg-ink{fill:var(--green)}
.pg-car{fill:none;stroke:var(--green);stroke-width:2.6;stroke-linejoin:round;stroke-linecap:round}
.pg-mono{font-weight:700}
/* foto assente: si rinforza l'incisione sotto, la grana si alleggerisce */
.no-ph .ph-ghost,.no-ph .post-ghost{opacity:.72}
.no-ph .ph-veil,.no-ph .strip-veil{opacity:.28}
.ph-badge{position:absolute;width:clamp(50px,11vw,74px);z-index:2;filter:drop-shadow(0 6px 10px rgba(28,20,8,.3))}
.ph-badge-tr{top:-14px;right:-10px;transform:rotate(6deg)}
.ph-badge-bl{left:-12px;bottom:14px;transform:rotate(-8deg)}
.ph-seal{position:absolute;right:-6px;bottom:8px;width:clamp(56px,12vw,86px);color:var(--tan);
  opacity:.92;z-index:2;transform:rotate(-9deg)}

/* ---------- header ---------- */
header{
  position:sticky;top:0;z-index:60;
  background:rgba(239,231,214,.9);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);
  border-bottom:1px solid var(--line-2);
}
.hd{display:flex;align-items:center;gap:14px;padding-top:12px;padding-bottom:12px}
.mark{
  width:42px;height:42px;flex:0 0 42px;border-radius:50%;background:var(--green);color:var(--paper);
  display:grid;place-items:center;font-family:var(--mono);font-size:.82rem;font-weight:700;letter-spacing:.04em;
  box-shadow:0 0 0 1px var(--green) inset,0 0 0 3px var(--paper),0 0 0 4px var(--line);
}
.hd-t{min-width:0;flex:1}
.hd-t b{display:block;font-family:var(--serif);font-weight:600;font-size:1.02rem;line-height:1.2;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hd-t span{font-family:var(--mono);font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--tan-ink)}
.hd-a{display:none;align-items:center;gap:10px}
@media(min-width:820px){.hd-a{display:flex}}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55em;
  font-family:var(--mono);font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;
  text-decoration:none;padding:13px 22px;border-radius:2px;border:1.4px solid var(--green);
  transition:transform .25s ease,background .25s ease,color .25s ease;
}
.btn:hover{transform:translateY(-2px)}
.btn-fill{background:var(--green);color:var(--paper)}
.btn-fill:hover{background:var(--green-3)}
.btn-out{color:var(--green);background:transparent}
.btn-out:hover{background:rgba(18,53,42,.07)}
.btn-tan{background:var(--tan-ink);border-color:var(--tan-ink);color:#FFF9EF}
.btn-tan:hover{background:#6E4319;border-color:#6E4319}
.btn-ivory{background:var(--paper);border-color:var(--paper);color:var(--green)}
.btn-ivory:hover{background:#fff}

/* ---------- hero ---------- */
.hero{padding-top:clamp(30px,5vw,54px);padding-bottom:0;overflow:hidden}
/* minmax(0,1fr): la colonna non deve mai allargarsi oltre il contenitore
   (la cartolina ha aspect-ratio e min-height, altrimenti spingerebbe la griglia) */
.hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(20px,3vw,34px)}
.hero-grid>*{min-width:0}
.hero-top{display:flex;justify-content:space-between;align-items:flex-start;gap:20px}
.hero-city{font-family:var(--mono);font-weight:500;font-size:clamp(.72rem,2.6vw,.9rem);
  letter-spacing:.44em;text-transform:uppercase;color:var(--green);padding-top:8px}
.hero-city i{display:block;font-style:normal;letter-spacing:.2em;font-size:.66em;color:var(--tan-ink);margin-top:8px}
.hero-file{display:none;flex:0 0 auto;font-family:var(--mono);font-size:.64rem;letter-spacing:.26em;
  text-transform:uppercase;color:var(--tan-ink);text-align:right;padding-top:9px}
.hero-file i{display:block;font-style:normal;letter-spacing:.14em;color:var(--ink-2);margin-top:8px}
@media(min-width:480px){.hero-file{display:block}}
.stamp-wrap{flex:0 0 auto;width:clamp(96px,21vw,166px);color:var(--tan);opacity:.94}
.stamp{display:block;width:100%;height:auto;font-family:var(--mono);font-weight:500;transition:transform .6s cubic-bezier(.3,1.2,.4,1)}
.stamp-wrap:hover .stamp{transform:rotate(3deg) scale(1.035)}
.stamp-anim{transform:rotate(-14deg) scale(.86);opacity:0}
.stamp-anim.in{animation:stampIn 1.05s cubic-bezier(.34,1.4,.5,1) .35s forwards}
@keyframes stampIn{
  0%{opacity:0;transform:rotate(-14deg) scale(.86)}
  55%{opacity:1;transform:rotate(-5deg) scale(1.045)}
  75%{transform:rotate(-8.5deg) scale(.988)}
  100%{opacity:1;transform:rotate(-7deg) scale(1)}
}
h1.hero-name{
  font-size:clamp(2rem,8.4vw,5.1rem);font-weight:600;line-height:1;letter-spacing:-.026em;
  overflow-wrap:break-word;hyphens:auto;color:var(--paper);
  text-shadow:0 2px 26px rgba(6,18,12,.7),0 1px 2px rgba(6,18,12,.5);
}
.hero-claim{
  font-family:var(--serif);font-size:clamp(1.35rem,4.6vw,2.5rem);line-height:1.16;font-weight:400;
  border-left:2px solid var(--tan);padding-left:clamp(14px,2.4vw,22px);
}
.hero-claim em{font-style:italic;color:var(--tan-ink)}
.hero-lede{max-width:54ch;color:var(--ink-2);font-size:clamp(1.02rem,2.5vw,1.16rem)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px}
/* cartolina: la foto d'apertura, con il titolo serif sopra e il timbro sull'angolo */
.post{
  position:relative;background:var(--paper-3);
  padding:clamp(10px,1.5vw,15px) clamp(12px,1.7vw,18px) clamp(11px,1.6vw,16px) clamp(10px,1.5vw,15px);
  border:1px solid rgba(18,53,42,.2);border-radius:1px 2px 1px 2px;
  box-shadow:0 2px 0 rgba(255,255,255,.5) inset,0 36px 62px -50px rgba(28,20,8,1);
  transform:rotate(-1.2deg);
}
@media(min-width:900px){.post{transform:rotate(-.7deg)}}
.post::before{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:var(--grain-b);opacity:.55;mix-blend-mode:multiply}
.post-win{aspect-ratio:1/1;display:block}
@media(min-width:560px){.post-win{aspect-ratio:4/3}}
@media(min-width:760px){.post-win{aspect-ratio:16/9}}
@media(min-width:1100px){.post-win{aspect-ratio:2.45/1}}
.post-ghost{position:absolute;left:5%;right:5%;top:52%;transform:translateY(-50%);
  color:var(--tan-lt);opacity:.55}
.post-ghost .engrave{display:block;width:100%;height:auto}
.post-scrim{position:absolute;inset:0;pointer-events:none;
  background:
    linear-gradient(to top,rgba(6,18,12,.94) 0%,rgba(6,18,12,.72) 26%,rgba(6,18,12,.2) 58%,rgba(6,18,12,.34) 100%)}
.post-t{position:absolute;left:0;right:0;bottom:0;padding:clamp(15px,3vw,32px);z-index:1}
.post-k{display:block;font-family:var(--mono);font-size:.62rem;letter-spacing:.3em;
  text-transform:uppercase;color:var(--tan-lt);margin-bottom:10px}
.post-stamp{position:absolute;top:-16px;right:6px;z-index:3;
  width:clamp(84px,18vw,142px);color:var(--tan);filter:drop-shadow(0 8px 14px rgba(28,20,8,.35))}
.post-cap{margin-top:12px;justify-content:flex-start}
.art-cap{margin-top:6px}

/* fascia incisione: il disegno a tratto resta, come tavola del diario */
.engr{padding-top:clamp(30px,4vw,54px);padding-bottom:clamp(30px,4vw,54px)}
.engr-w{position:relative;color:var(--green)}
.motorcar,.engrave{display:block;width:100%;height:auto;position:relative;z-index:1}
.engr-w::after{
  content:"";position:absolute;left:0;right:0;bottom:26px;height:52%;z-index:0;
  background:radial-gradient(58% 100% at 50% 100%,rgba(169,113,61,.18),transparent 72%);
  pointer-events:none;
}
/* fascia contatti verde */
.hero-band{background-color:var(--green);background-image:var(--grain-b);color:var(--paper);margin-top:clamp(18px,3vw,30px)}
.hero-band .wrap{display:flex;flex-wrap:wrap;gap:clamp(14px,3vw,30px);
  padding-top:22px;padding-bottom:22px;align-items:center}
.bandi{display:flex;flex-direction:column;gap:5px;min-width:0}
.bandi span{font-family:var(--mono);font-size:.62rem;letter-spacing:.24em;text-transform:uppercase;color:var(--tan-lt)}
.bandi b{font-family:var(--mono);font-weight:500;font-size:.98rem;letter-spacing:.01em;color:var(--paper);
  text-decoration:none;overflow-wrap:anywhere}
a.bandi:hover b{color:var(--tan-lt)}
.band-sep{width:1px;align-self:stretch;background:rgba(239,231,214,.22);display:none}
@media(min-width:760px){.band-sep{display:block}}
.hero-band .hb-cta{margin-left:auto}

/* ---------- fascia prova ---------- */
.proof{background:var(--paper-2);border-top:1px solid var(--line-2);border-bottom:1px solid var(--line-2);
  padding:clamp(34px,5vw,58px) 0}
.proof-grid{display:grid;gap:clamp(22px,3vw,36px);align-items:center}
@media(min-width:900px){.proof-grid{grid-template-columns:1.1fr 1fr}}
.rate{display:inline-flex;align-items:baseline;gap:.45em;font-family:var(--mono);font-size:.95rem;color:var(--ink-2)}
.rate b{font-family:var(--serif);font-size:2.1rem;font-weight:600;color:var(--green);letter-spacing:-.02em}
.rate i{font-style:normal;font-size:.82rem;letter-spacing:.06em;color:var(--tan-ink)}
.stars{display:inline-flex;gap:3px;margin-left:.35em;color:var(--tan)}
.proof-claim{font-size:clamp(1.3rem,3.6vw,1.85rem);margin-top:12px;max-width:26ch}
.proof-claim em{font-style:italic;color:var(--tan-ink)}
.proof-sub{color:var(--ink-2);margin-top:8px;font-size:1rem;max-width:44ch}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(10px,2vw,18px)}
.stat{border-left:1.4px solid var(--line);padding-left:clamp(10px,1.6vw,16px)}
.stat b{display:block;font-size:clamp(1.5rem,4.4vw,2.2rem);font-weight:600;color:var(--green);letter-spacing:-.02em}
.stat span{font-family:var(--mono);font-size:.63rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);
  display:block;margin-top:4px;line-height:1.4}

/* ---------- servizi ---------- */
.srv-list{display:grid;gap:0}
.srv{display:grid;grid-template-columns:auto 1fr;gap:clamp(14px,3vw,34px);
  padding:clamp(22px,3vw,32px) 0;position:relative;align-items:start}
.srv-n{font-family:var(--mono);font-size:.78rem;font-weight:700;letter-spacing:.06em;color:var(--tan-ink);
  padding-top:.55em}
.srv-b h3{font-size:clamp(1.28rem,3.6vw,1.85rem);margin-bottom:8px}
.srv-b p{color:var(--ink-2);max-width:58ch}
.srv-rule{position:absolute;left:0;right:0;bottom:0;height:2px;width:100%;color:var(--line);
  stroke-dasharray:6 6}
.srv:last-child .srv-rule{display:none}
@media(min-width:860px){
  .srv{grid-template-columns:64px minmax(0,.9fr) minmax(0,1.1fr);align-items:baseline}
  .srv-b{display:contents}
  .srv-b h3{margin-bottom:0}
}

/* inserto fotografico dentro i servizi: due stampe e una nota battuta a macchina */
.diario{display:grid;gap:clamp(20px,3vw,30px);margin-top:clamp(34px,5vw,58px);align-items:start}
@media(min-width:680px){.diario{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1000px){.diario{grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,.9fr);align-items:center}}
.diario .ph-win{aspect-ratio:4/3}
.diario-note{border-left:2px solid var(--tan);padding-left:clamp(14px,2vw,20px)}
.diario-note b{display:block;font-family:var(--serif);font-weight:500;font-size:1.24rem;margin-bottom:8px}
.diario-note p{font-family:var(--mono);font-size:.78rem;line-height:1.7;color:var(--ink-2)}

/* ---------- flotta ---------- */
.fleet{background-color:var(--green);background-image:var(--grain-b);color:var(--paper)}
.fleet .sec-head h2 em,.fleet .cap{color:var(--tan-lt)}
.fleet .eyebrow{color:var(--tan-lt)}
.fleet .sec-head p{color:rgba(239,231,214,.78)}
.rail{display:flex;gap:clamp(14px,2.4vw,22px);overflow-x:auto;scroll-snap-type:x mandatory;
  padding-bottom:14px;margin:0 calc(var(--pad)*-1);padding-left:var(--pad);padding-right:var(--pad);
  -webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(239,231,214,.35) transparent}
.rail::-webkit-scrollbar{height:6px}
.rail::-webkit-scrollbar-thumb{background:rgba(239,231,214,.3);border-radius:3px}
.car{flex:0 0 min(84vw,340px);scroll-snap-align:start;border:1px solid rgba(239,231,214,.24);
  background:rgba(239,231,214,.045);display:flex;flex-direction:column}
.car-art{position:relative;padding:clamp(18px,3.4vw,26px) clamp(16px,2.8vw,22px) clamp(14px,2.6vw,20px);
  color:var(--tan-lt);
  background:
    linear-gradient(180deg,rgba(239,231,214,.07),rgba(239,231,214,0)),
    repeating-linear-gradient(45deg,rgba(239,231,214,.05) 0 2px,transparent 2px 9px);
  border-bottom:1px dashed rgba(239,231,214,.28)}
.car-art .ph-win{aspect-ratio:5/4}
.car-art .ph-ghost{color:var(--tan-lt);opacity:.42}
.car-art .sil{display:block;width:100%;height:auto}
.car-b{padding:clamp(16px,2.6vw,22px)}
.tag{font-family:var(--mono);font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--tan-lt)}
.car-b h3{font-size:1.42rem;margin:8px 0 8px}
.car-b p{color:rgba(239,231,214,.8);font-size:.99rem}
.rail-hint{margin-top:14px;color:rgba(239,231,214,.84)}
.rail-hint::before,.rail-hint::after{opacity:.45}

/* ---------- come funziona ---------- */
.how-line{width:100%;height:2px;color:var(--tan);margin:0 0 clamp(20px,3vw,30px)}
.how{display:grid;gap:clamp(24px,3vw,34px)}
@media(min-width:820px){.how{grid-template-columns:repeat(3,1fr);gap:clamp(20px,3vw,42px)}}
.step{position:relative;padding-top:26px}
.step::before{content:"";position:absolute;top:0;left:0;width:12px;height:12px;border-radius:50%;
  border:1.6px solid var(--tan);background:var(--paper)}
.step-n{font-family:var(--mono);font-size:.68rem;letter-spacing:.24em;color:var(--tan-ink);display:block;margin-bottom:10px}
.step h3{font-size:clamp(1.32rem,3.4vw,1.72rem);margin-bottom:8px}
.step p{color:var(--ink-2)}

/* ---------- fascia strada a tutta larghezza ---------- */
.strip{position:relative;padding:0;background:var(--green-2);overflow:hidden;
  border-top:1px solid rgba(239,231,214,.16);border-bottom:1px solid rgba(239,231,214,.16)}
.strip-ph{height:clamp(320px,52vw,540px)}
.strip-ghost{position:absolute;right:7%;top:50%;transform:translateY(-56%);
  width:clamp(120px,18vw,210px);color:var(--tan-lt);opacity:.3}
.strip-ghost .compass{width:100%;margin:0;opacity:1}
.strip-ph .ph-img{filter:sepia(.3) saturate(.8) contrast(.96) brightness(.9)}
.strip-veil{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:.62;
  background-image:var(--grain-a),
    linear-gradient(150deg,rgba(12,39,31,.5),rgba(169,113,61,.22) 55%,rgba(12,39,31,.6));
  background-size:220px 220px,cover}
.strip-scrim{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(75deg,rgba(6,18,12,.9) 0%,rgba(6,18,12,.66) 38%,rgba(6,18,12,.22) 72%,rgba(6,18,12,.42) 100%)}
.strip-ov{position:absolute;inset:0;display:flex;align-items:flex-end;padding-top:26px;padding-bottom:26px}
.strip-ov .wrap{width:100%}
.coord{border:1px dashed rgba(239,231,214,.5);padding:clamp(14px,2.6vw,22px) clamp(16px,3vw,26px);
  background:rgba(6,18,12,.42);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);max-width:min(100%,560px)}
.coord span{display:block;font-family:var(--mono);font-size:.62rem;letter-spacing:.3em;
  text-transform:uppercase;color:var(--tan-lt)}
.coord b{display:block;font-family:var(--mono);font-weight:700;color:var(--paper);
  font-size:clamp(1.02rem,3.4vw,1.5rem);letter-spacing:.12em;text-transform:uppercase;margin:10px 0 8px;
  overflow-wrap:anywhere}
.coord i{display:block;font-style:normal;font-family:var(--mono);font-size:.7rem;line-height:1.7;
  letter-spacing:.1em;text-transform:uppercase;color:rgba(239,231,214,.82)}
.coord-rule{height:1px;margin:12px 0;background:repeating-linear-gradient(90deg,rgba(239,231,214,.6) 0 6px,transparent 6px 12px)}

/* ---------- territorio ---------- */
.terr{background-color:var(--green-2);background-image:var(--grain-b);color:var(--paper);position:relative;overflow:hidden}
.terr .eyebrow{color:var(--tan-lt)}
.terr h2{font-size:clamp(2.1rem,6.4vw,3.7rem)}
.terr h2 em{font-style:italic;color:var(--tan-lt)}
.terr-grid{display:grid;gap:clamp(26px,4vw,54px)}
@media(min-width:900px){.terr-grid{grid-template-columns:.95fr 1.05fr;align-items:start}}
.terr-lede{color:rgba(239,231,214,.82);max-width:48ch;margin-top:16px;font-size:1.05rem}
.terr-city{font-family:var(--mono);font-size:.72rem;letter-spacing:.36em;text-transform:uppercase;
  color:var(--tan-lt);margin-top:22px}
.compass{width:clamp(110px,22vw,178px);height:auto;color:var(--tan-lt);opacity:.75;margin-top:24px}
.dest{display:grid;gap:0;border-top:1px dashed rgba(239,231,214,.3)}
.dest li{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;align-items:baseline;
  padding:16px 0;border-bottom:1px dashed rgba(239,231,214,.3)}
.dest b{font-family:var(--serif);font-weight:500;font-size:1.14rem;color:var(--paper)}
.dest span{grid-column:1/-1;font-family:var(--mono);font-size:.76rem;line-height:1.6;
  color:rgba(239,231,214,.68);letter-spacing:.02em}
@media(min-width:620px){
  .dest li{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}
  .dest span{grid-column:auto}
}
.terr-note{margin-top:22px;color:var(--tan-lt)}
.terr-ph{flex:1 1 220px;min-width:0;max-width:400px;margin-top:clamp(20px,3vw,28px)}
.terr-ph .ph-win{aspect-ratio:3/2}
.terr-side{display:flex;flex-wrap:wrap;align-items:flex-end;gap:clamp(16px,3vw,28px)}
.terr-side .compass{flex:0 0 auto}

/* ---------- faq ---------- */
.qa{border-bottom:1px dashed var(--line)}
.qa:first-of-type{border-top:1px dashed var(--line)}
.qa h3{font-size:inherit;font-weight:inherit;letter-spacing:0}
.qa-q{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;width:100%;
  background:none;border:0;padding:20px 2px;text-align:left;cursor:pointer;color:inherit;font:inherit}
.qa-mk{font-family:var(--mono);font-size:.7rem;font-weight:700;color:var(--tan-ink);letter-spacing:.06em}
.qa-t{font-family:var(--serif);font-size:clamp(1.08rem,3vw,1.35rem);line-height:1.3}
.qa-ic{position:relative;width:16px;height:16px;flex:0 0 16px}
.qa-ic::before,.qa-ic::after{content:"";position:absolute;background:var(--green);transition:transform .34s cubic-bezier(.3,.8,.3,1),opacity .34s ease}
.qa-ic::before{left:0;top:7px;width:16px;height:1.8px}
.qa-ic::after{left:7.1px;top:0;width:1.8px;height:16px}
.qa-q[aria-expanded="true"] .qa-ic::after{transform:rotate(90deg);opacity:0}
.qa-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .42s cubic-bezier(.3,.8,.3,1)}
.qa-a>div{overflow:hidden}
.qa-a p{color:var(--ink-2);padding:0 2px 22px 0;max-width:62ch}
@media(min-width:700px){.qa-a p{padding-left:40px}}
.qa.open .qa-a{grid-template-rows:1fr}

/* ---------- tagliando contatti ---------- */
.ticket-sec{padding-bottom:clamp(70px,10vw,120px)}
.ticket{
  position:relative;background:var(--paper-3);border:2px dashed var(--green);
  padding:clamp(26px,5vw,52px) clamp(20px,4.4vw,54px);
  box-shadow:0 1px 0 rgba(18,53,42,.06),0 22px 44px -34px rgba(18,53,42,.5);
}
.ticket::before,.ticket::after{
  content:"";position:absolute;top:50%;width:34px;height:34px;margin-top:-17px;border-radius:50%;
  background:var(--paper);border:1px solid var(--line-2);
}
.ticket::before{left:-18px}
.ticket::after{right:-18px}
.tk-head{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;flex-wrap:wrap}
.tk-serial{font-family:var(--mono);font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;color:var(--tan-ink);text-align:right}
.ticket h2{font-size:clamp(1.9rem,5.6vw,3rem);margin:14px 0 12px}
.ticket h2 em{font-style:italic;color:var(--tan-ink)}
.tk-lede{color:var(--ink-2);max-width:52ch}
.tk-perf{margin:clamp(22px,3.4vw,32px) 0;height:1px;
  background:repeating-linear-gradient(90deg,var(--green) 0 8px,transparent 8px 16px);opacity:.45}
.tk-rows{display:grid;gap:18px}
@media(min-width:720px){.tk-rows{grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 36px}}
.tk-row span{display:block;font-family:var(--mono);font-size:.62rem;letter-spacing:.22em;
  text-transform:uppercase;color:var(--tan-ink);margin-bottom:6px}
.tk-row b,.tk-row a{font-family:var(--mono);font-weight:500;font-size:1.02rem;color:var(--green);
  text-decoration:none;overflow-wrap:anywhere;line-height:1.5}
.tk-row a:hover{color:var(--tan-ink);text-decoration:underline;text-underline-offset:3px}
.tk-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(24px,3.4vw,34px)}
.tk-stamp{width:clamp(84px,17vw,124px);color:var(--tan);opacity:.9;margin-top:6px}
.tk-ph{width:min(230px,52vw);margin-top:16px;margin-left:auto}
.tk-ph .ph-win{aspect-ratio:4/3}
.tk-ph .ph-cap{font-size:.58rem}

/* ---------- footer ---------- */
footer{background-color:var(--green);background-image:var(--grain-b);color:rgba(239,231,214,.78);padding:clamp(34px,5vw,54px) 0 calc(clamp(34px,5vw,54px) + var(--safebar))}
.ft{display:flex;flex-wrap:wrap;gap:18px;justify-content:space-between;align-items:flex-start}
.ft b{display:block;font-family:var(--serif);font-size:1.16rem;color:var(--paper);font-weight:500}
.ft .mono{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;margin-top:8px;
  color:var(--tan-lt);display:block}
.ft-links{display:flex;flex-direction:column;gap:6px;font-family:var(--mono);font-size:.84rem}
.ft-links a{color:rgba(239,231,214,.85);text-decoration:none}
.ft-links a:hover{color:var(--tan-lt)}
.ft-note{width:100%;margin-top:20px;padding-top:18px;border-top:1px dashed rgba(239,231,214,.24);
  font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(239,231,214,.74)}

/* ---------- barra CTA mobile ---------- */
:root{--safebar:0px}
@media(max-width:819px){:root{--safebar:calc(66px + env(safe-area-inset-bottom,0px))}}
.bar{
  position:fixed;left:0;right:0;bottom:0;z-index:70;display:grid;
  grid-template-columns:${wa ? '1fr 1fr' : '1fr'};gap:1px;
  background:var(--green);border-top:1px solid rgba(239,231,214,.2);
  padding-bottom:env(safe-area-inset-bottom,0px);
}
.bar a{
  display:flex;align-items:center;justify-content:center;gap:.5em;padding:17px 10px;text-decoration:none;
  font-family:var(--mono);font-size:.76rem;font-weight:500;letter-spacing:.12em;text-transform:uppercase;
}
.bar .b-wa{background:var(--tan-ink);color:#FFF9EF}
.bar .b-tel{background:var(--green);color:var(--paper)}
@media(min-width:820px){.bar{display:none}}

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;scroll-behavior:auto!important}
  [data-rise]{opacity:1;transform:none}
  [data-rise].ph,[data-rise].ph.in{transform:rotate(var(--rot))}
  .stamp-anim{opacity:1;transform:rotate(-7deg)}
  .motorcar .mc-wheels,.motorcar .mc-ground{opacity:1}
  .motorcar .mc-shade{opacity:.45}
}
</style>
</head>
<body>
<div class="grain" aria-hidden="true"></div>
<div class="vignette" aria-hidden="true"></div>

<header>
  <div class="wrap hd">
    <div class="mark" aria-hidden="true">${esc(mono)}</div>
    <div class="hd-t">
      <b>${name}</b>
      <span>${cityUp}</span>
    </div>
    <div class="hd-a">
      <a class="btn ${wa ? 'btn-out' : 'btn-fill'}" href="tel:${tel}">${phone}</a>
      ${waBtn('btn btn-fill', 'WhatsApp')}
    </div>
  </div>
</header>

<main>

  <!-- ============ HERO ============ -->
  <section class="hero" aria-labelledby="h1">
    <div class="wrap hero-grid">
      <div class="hero-top">
        <div class="hero-city">${cityUp}<i>${cat}</i></div>
        <div class="hero-file mono">Nord Italia<i>${T(c.kicker)}</i></div>
      </div>

      <figure class="post">
        <div class="post-win">
          <div class="post-ghost" aria-hidden="true">${motorcar('engrave')}</div>
          ${c.pics.hero.tag({
            w: 1900, q: 76, cls: 'ph-img', eager: true, sizes: '(max-width:1180px) 100vw, 1180px',
            alt: 'Vettura con conducente di ' + lead.name + ' — ' + lead.city
          })}
          <span class="ph-veil" aria-hidden="true"></span>
          <span class="post-edge" aria-hidden="true"></span>
          <span class="post-scrim" aria-hidden="true"></span>
          <div class="post-t">
            <span class="post-k">${cat} · ${cityUp}</span>
            <h1 class="hero-name" id="h1">${name}</h1>
          </div>
        </div>
        <figcaption class="ph-cap post-cap">Cartolina da ${city} · servizio su prenotazione</figcaption>
        <div class="stamp-wrap stamp-anim post-stamp" data-stamp>${stamp(lead.city, c.kicker, 'a')}</div>
      </figure>

      <p class="hero-claim" data-rise style="--d:110ms">${T(c.heroA)} <em>${T(c.heroB)}</em></p>
      <p class="hero-lede" data-rise style="--d:200ms">${T(c.lede)}</p>
      <div class="hero-cta" data-rise style="--d:280ms">
        ${waBtn('btn btn-tan', 'Preventivo su WhatsApp')}
        <a class="btn ${wa ? 'btn-out' : 'btn-tan'}" href="tel:${tel}">Telefona ora</a>
      </div>
      <p class="cap art-cap" data-rise style="--d:360ms">Fotografie di repertorio · al loro posto andranno le vostre</p>
    </div>
    <div class="hero-band">
      <div class="wrap">
        <a class="bandi" href="tel:${tel}"><span>Telefono</span><b>${phone}</b></a>
        <div class="band-sep" aria-hidden="true"></div>
        <div class="bandi"><span>Zona operativa</span><b>${city}</b></div>
        ${addr ? `<div class="band-sep" aria-hidden="true"></div>
        <div class="bandi"><span>Indirizzo</span><b>${addr}</b></div>` : ''}
        ${wa ? `<div class="hb-cta">${waBtn('btn btn-ivory', 'Scrivici')}</div>` : ''}
      </div>
    </div>
  </section>

  <!-- ============ PROVA ============ -->
  <section class="proof" aria-label="Riconoscimenti e riferimenti">
    <div class="wrap proof-grid">
      <div data-rise>
        ${ratingLine}
        ${starRow(lead.rating)}
        <p class="proof-claim">${T(c.proof[0])}, <em>sempre</em>.</p>
        <p class="proof-sub">${T(c.proof[1])}. Lo mettiamo nero su bianco prima di partire, così alla fine non resta niente da discutere.</p>
      </div>
      <div class="stats">${stats}</div>
    </div>
  </section>

  <!-- ============ SERVIZI ============ -->
  <section id="servizi" aria-labelledby="h-srv">
    <div class="wrap">
      <div class="sec-head" data-rise>
        <span class="eyebrow">Che cosa facciamo</span>
        <h2 id="h-srv">Il mestiere,<br><em>prima di tutto</em></h2>
        <p>Lavoriamo con poche regole e le rispettiamo sempre: si arriva prima dell’orario, si concorda il prezzo in anticipo, si risponde a chi ${wa ? 'scrive' : 'chiama'}. Tutto il resto è conseguenza.</p>
      </div>
      <ol class="srv-list">${services}</ol>

      <div class="diario">
        ${photoCard(c.pics.interni, {
          cls: 'ph-r2', w: 900, d: 60,
          sizes: '(max-width:680px) 92vw, (max-width:1000px) 46vw, 380px',
          cap: 'Interni · dettaglio in pelle',
          badge: `<div class="ph-badge ph-badge-tr">${postage(mono, lead.city, 'x')}</div>`
        })}
        ${photoCard(c.pics.autista, {
          cls: 'ph-r3', w: 900, d: 150,
          sizes: '(max-width:680px) 92vw, (max-width:1000px) 46vw, 380px',
          cap: 'L’autista, all’orario concordato'
        })}
        <div class="diario-note" data-rise style="--d:240ms">
          <b>Un mestiere fatto di dettagli</b>
          <p>La vettura pulita, la porta aperta al momento giusto, il bagaglio caricato senza doverlo chiedere: cose piccole, che però si notano solo quando mancano. Per noi fanno parte del servizio, non sono cortesie.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ INCISIONE ============ -->
  <section class="engr" aria-label="Tavola illustrata">
    <div class="wrap engr-w" data-rise>
      ${motorcar()}
      <p class="cap art-cap">Tavola a tratto · dal quaderno di bordo</p>
    </div>
  </section>

  <!-- ============ FLOTTA ============ -->
  <section class="fleet" id="flotta" aria-labelledby="h-flt">
    <div class="wrap">
      <div class="sec-head" data-rise>
        <span class="eyebrow">Le vetture</span>
        <h2 id="h-flt">Ogni viaggio<br><em>la sua auto</em></h2>
        <p>Scegliamo la vettura sul numero di persone e sui bagagli veri, non su quelli dichiarati. Se avete un’esigenza particolare, ditecela ${wa ? 'quando scrivete' : 'quando chiamate'}: ci organizziamo prima.</p>
      </div>
      <div class="rail" tabindex="0" role="group" aria-label="Vetture disponibili, scorrimento orizzontale">${fleet}</div>
      <p class="cap rail-hint">Scorrete di lato per vedere tutte le vetture</p>
    </div>
  </section>

  <!-- ============ COME FUNZIONA ============ -->
  <section aria-labelledby="h-how">
    <div class="wrap">
      <div class="sec-head" data-rise>
        <span class="eyebrow">Come si prenota</span>
        <h2 id="h-how">Tre passaggi,<br><em>nessuna attesa</em></h2>
      </div>
      <svg class="how-line" data-rise viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line x1="0" y1="1" x2="1000" y2="1" stroke="currentColor" stroke-width="1.6"/>
      </svg>
      <ol class="how">${steps}</ol>
    </div>
  </section>

  <!-- ============ FASCIA STRADA ============ -->
  <section class="strip" aria-label="Le strade della zona operativa">
    <div class="strip-ph">
      <div class="strip-ghost" aria-hidden="true">${compass}</div>
      ${c.pics.strada.tag({
        w: 1900, q: 74, cls: 'ph-img', sizes: '100vw',
        alt: 'Strada del Nord Italia nella zona di ' + lead.city
      })}
      <span class="strip-veil" aria-hidden="true"></span>
      <span class="strip-scrim" aria-hidden="true"></span>
    </div>
    <div class="strip-ov">
      <div class="wrap">
        <div class="coord" data-rise>
          <span>Coordinate di servizio</span>
          <b>${cityUp} · Nord Italia</b>
          <div class="coord-rule" aria-hidden="true"></div>
          <i>Zona operativa · ${city} e dintorni<br>Raggio concordato caso per caso<br>Trasferimenti su prenotazione, prezzo concordato prima</i>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ TERRITORIO ============ -->
  <section class="terr" id="territorio" aria-labelledby="h-terr">
    <div class="wrap terr-grid">
      <div>
        <span class="eyebrow" data-rise>Il territorio</span>
        <h2 id="h-terr" data-rise style="--d:80ms">Conosciamo<br><em>${city}</em></h2>
        <p class="terr-lede" data-rise style="--d:160ms">La zona in cui lavoriamo la conosciamo strada per strada: sappiamo dove si rallenta la mattina, quale ingresso conviene per non restare in coda e quanto tempo serve davvero. È una cosa che nessuna mappa vi dirà: si impara guidando.</p>
        <div class="terr-city" data-rise style="--d:220ms">Zona operativa · ${cityUp}</div>
        <div class="terr-side">
          ${compass}
          ${photoCard(c.pics.citta || c.pics.notturno, {
            cls: 'terr-ph ph-r1', w: 820, d: 120,
            sizes: '(max-width:900px) 84vw, 420px',
            cap: c.pics.citta ? 'Milano · centro' : 'Dopo il tramonto · si parte lo stesso'
          })}
        </div>
      </div>
      <div>
        <ul class="dest">${dests}</ul>
        <p class="cap terr-note">Raggio d’azione concordato caso per caso</p>
      </div>
    </div>
  </section>

  <!-- ============ FAQ ============ -->
  <section id="faq" aria-labelledby="h-faq">
    <div class="wrap">
      <div class="sec-head" data-rise>
        <span class="eyebrow">Domande frequenti</span>
        <h2 id="h-faq">Le cose<br><em>che ci chiedete</em></h2>
      </div>
      <div class="faq">${faq}</div>
    </div>
  </section>

  <!-- ============ CONTATTI ============ -->
  <section class="ticket-sec" id="contatti" aria-labelledby="h-cnt">
    <div class="wrap">
      <div class="ticket" data-rise>
        <div class="tk-head">
          <div>
            <span class="eyebrow">Tagliando di prenotazione</span>
            <h2 id="h-cnt">${wa ? 'Scriveteci' : 'Chiamateci'},<br><em>vi rispondiamo noi</em></h2>
            <p class="tk-lede">Niente moduli che finiscono chissà dove: ${wa ? 'scrivete al numero qui sotto' : 'una telefonata al numero qui sotto'}, indicate data, orario e tragitto, e vi torna indietro il preventivo. Poi non dovete più pensarci.</p>
          </div>
          <div class="tk-serial">
            ${cityUp}<br>${T(c.kicker)}
            ${photoCard(c.pics.aeroporto, {
              cls: 'tk-ph ph-r2', w: 640, d: 80,
              sizes: '(max-width:720px) 52vw, 230px',
              cap: 'Aeroporti e scali'
            })}
            <div class="tk-stamp">${stamp(lead.city, c.kicker, 'b')}</div>
          </div>
        </div>
        <div class="tk-perf" aria-hidden="true"></div>
        <div class="tk-rows">
          <div class="tk-row">
            <span>Telefono</span>
            <a href="tel:${tel}">${phone}</a>
          </div>
          ${wa ? `<div class="tk-row">
            <span>WhatsApp</span>
            <a href="${wa}" target="_blank" rel="noopener">Scrivete al numero ${phone}</a>
          </div>` : ''}
          ${addr ? `<div class="tk-row">
            <span>Indirizzo</span>
            <b>${addr}</b>
          </div>` : ''}
          <div class="tk-row">
            <span>Zona operativa</span>
            <b>${city} e dintorni</b>
          </div>
        </div>
        <div class="tk-cta">
          ${waBtn('btn btn-tan', 'Chiedi il preventivo')}
          <a class="btn ${wa ? 'btn-out' : 'btn-tan'}" href="tel:${tel}">Chiama ${phone}</a>
        </div>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="wrap ft">
    <div>
      <b>${name}</b>
      <span class="mono">${T(c.kicker)} · ${city}</span>
    </div>
    <div class="ft-links">
      <a href="tel:${tel}">${phone}</a>
      ${wa ? `<a href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
      ${addr ? `<span>${addr}</span>` : ''}
    </div>
    <div class="ft-note">Anteprima realizzata da Umbra</div>
  </div>
</footer>

<nav class="bar" aria-label="Contatti rapidi">
  ${wa ? `<a class="b-wa" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivici su WhatsApp">WhatsApp</a>` : ''}
  <a class="b-tel" href="tel:${tel}" aria-label="Telefona a ${name}">Telefona</a>
</nav>

<script>
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- linee tratteggiate che si disegnano ---
     Le lunghezze si misurano a runtime: se qualcosa fallisce il tratto resta
     semplicemente visibile, mai invisibile. */
  function prep(root, dur, stagger){
    if (reduce) return;
    var els = [].slice.call(root.querySelectorAll('path,line,circle'));
    els.forEach(function(el, i){
      var l = 0;
      try { l = el.getTotalLength ? el.getTotalLength() : 0; } catch(err){ l = 0; }
      if (!l || !isFinite(l)) return;
      el.style.strokeDasharray = l + ' ' + l;
      el.style.strokeDashoffset = l;
      el.style.transition = 'stroke-dashoffset ' + dur + 'ms cubic-bezier(.3,.75,.2,1) ' + (i * stagger) + 'ms';
    });
    root.__strokes = els;
  }
  function release(root){
    var els = root.__strokes;
    if (!els) return;
    els.forEach(function(el){ el.style.strokeDashoffset = '0'; });
  }
  var howLine = document.querySelector('.how-line');
  var carLine = document.querySelector('.motorcar .mc-line');
  if (howLine) prep(howLine, 1500, 0);
  if (carLine) prep(carLine, 1400, 55);

  /* --- comparse in scroll --- */
  var rise = [].slice.call(document.querySelectorAll('[data-rise]'));
  var stampEls = [].slice.call(document.querySelectorAll('[data-stamp]'));
  var targets = rise.concat(stampEls);

  function reveal(el){
    el.classList.add('in');
    if (howLine && (el === howLine || el.contains(howLine))) release(howLine);
    if (carLine && el.contains(carLine)) release(carLine);
  }

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function(el){ reveal(el); });
    if (howLine) release(howLine);
    if (carLine) release(carLine);
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function(el){ io.observe(el); });

    /* Lo scroll parte bloccato dall'intro: dopo lo sblocco ricontrolliamo
       che tutto ciò che è già a schermo sia comparso. */
    var recheck = function(){
      targets.forEach(function(el){
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.92 && r.bottom > 0) { reveal(el); io.unobserve(el); }
      });
    };
    [400, 1200, 2600, 4200, 6400, 8000].forEach(function(t){ setTimeout(recheck, t); });
    addEventListener('scroll', recheck, { passive: true });
    /* rete di sicurezza: dopo 12s nulla resta nascosto */
    setTimeout(function(){ targets.forEach(reveal); if (howLine) release(howLine); if (carLine) release(carLine); }, 12000);
  }

  /* --- accordion FAQ --- */
  [].slice.call(document.querySelectorAll('.qa-q')).forEach(function(btn){
    btn.addEventListener('click', function(){
      var wrapEl = btn.closest('.qa');
      var open = btn.getAttribute('aria-expanded') === 'true';
      [].slice.call(document.querySelectorAll('.qa')).forEach(function(other){
        if (other !== wrapEl) {
          other.classList.remove('open');
          var b = other.querySelector('.qa-q');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      wrapEl.classList.toggle('open', !open);
    });
  });

  /* --- rete di sicurezza fotografie: se una foto non arriva resta il fondo
         inciso della stampa, mai un rettangolo vuoto --- */
  function photoFailed(im){
    im.style.display = 'none';
    var w = im.parentNode;
    if (w && w.classList) w.classList.add('no-ph');
  }
  [].slice.call(document.querySelectorAll('img[data-photo-slot]')).forEach(function(im){
    im.addEventListener('error', function(){ photoFailed(im); });
    /* alcune possono aver già fallito prima che lo script partisse */
    if (im.complete && im.naturalWidth === 0) photoFailed(im);
  });
})();
</script>
${intro}
</body>
</html>`;
};

window.U.m["grandtour"]=module.exports;})();
