window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "AURUM" — grafite e oro vero.
 *
 * Art direction: la lobby di un hotel a cinque stelle. Simmetria assoluta sull'asse
 * centrale, serif classica, maiuscoletto spaziato, ornamenti art déco disegnati a mano
 * in SVG inline. Oro usato con parsimonia: filetti, monogramma, numeri, bordi.
 * Il testo lungo resta avorio, mai oro.
 *
 * Fotografia: ogni foto vive dentro una cornice ornamentale già disegnata (filetto d'oro
 * di 1px, doppio filetto interno, fregi angolari). Trattamento unico per tutto il tema:
 * sepia(.2) contrast(1.1) brightness(.78) più un velo ambra scura in mix-blend-mode
 * multiply. L'hero è un ritaglio ad arco col monogramma dorato sopra la foto; la flotta
 * è una tripletta di riquadri identici con didascalia dorata centrata; una fascia a
 * tutta larghezza porta una foto scurissima sotto una frase in serif oro.
 * Se una foto non arriva, sotto resta un fondo di grafite e oro con la sua ornamentazione:
 * mai un rettangolo bianco.
 *
 * Nessun fatto inventato: si usano solo i campi di `lead` e il copy di `c`.
 */

'use strict';

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* Testo: escape + apostrofo tipografico italiano. */
const t = s => esc(s).replace(/'/g, '’');

const n2 = v => (Math.round(v * 100) / 100).toString();

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

const STOP = ['di', 'de', 'del', 'della', 'dei', 'delle', 'da', 'e', 'a', 'al', 'il', 'la',
  'lo', 'le', 'i', 'gli', 'con', 'per', 'srl', 'srls', 'snc', 'sas', 'sr', 'spa'];

/* Iniziali del cliente per il monogramma. */
function initials(name) {
  const raw = String(name || '').split(/[\s\-_.,/]+/).filter(Boolean);
  const words = raw.filter(w => STOP.indexOf(w.toLowerCase()) === -1);
  const list = words.length ? words : raw;
  if (list[0] && /^[A-ZÀ-Ý]{2,3}$/.test(list[0])) return list[0].toUpperCase();
  let out = list.slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('');
  if (out.length < 2 && list[0]) out = list[0].slice(0, 2).toUpperCase();
  return out || 'A';
}

/* ---------- ornamenti SVG generati ---------- */

/* Fregio circolare art déco attorno al monogramma. */
function crestSvg() {
  const cx = 110, cy = 110;
  let ticks = '';
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r2 = (i % 4 === 0) ? 86.5 : 91.5;
    ticks += 'M' + n2(cx + Math.cos(a) * 97) + ' ' + n2(cy + Math.sin(a) * 97) +
             'L' + n2(cx + Math.cos(a) * r2) + ' ' + n2(cy + Math.sin(a) * r2);
  }
  let diamonds = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(a) * 79, y = cy + Math.sin(a) * 79, r = 4.4;
    diamonds += '<path d="M' + n2(x) + ' ' + n2(y - r) + 'L' + n2(x + r) + ' ' + n2(y) +
                'L' + n2(x) + ' ' + n2(y + r) + 'L' + n2(x - r) + ' ' + n2(y) + 'Z"/>';
  }
  let rays = '';
  for (let k = 0; k < 4; k++) {
    const base = k * 90 - 90;
    for (let j = -1; j <= 1; j++) {
      const a = (base + j * 7) * Math.PI / 180;
      rays += 'M' + n2(cx + Math.cos(a) * 60) + ' ' + n2(cy + Math.sin(a) * 60) +
              'L' + n2(cx + Math.cos(a) * 71) + ' ' + n2(cy + Math.sin(a) * 71);
    }
  }
  return '<svg class="crest-ring" viewBox="0 0 220 220" aria-hidden="true" focusable="false">' +
    '<circle cx="110" cy="110" r="104.5" fill="none" stroke="url(#aurG)" stroke-width="0.8" opacity=".55"/>' +
    '<circle cx="110" cy="110" r="97" fill="none" stroke="url(#aurG)" stroke-width="1.1"/>' +
    '<path d="' + ticks + '" stroke="url(#aurG)" stroke-width="0.9" opacity=".75"/>' +
    '<g fill="url(#aurG)" opacity=".9">' + diamonds + '</g>' +
    '<circle cx="110" cy="110" r="70" fill="none" stroke="url(#aurG)" stroke-width="0.9" opacity=".8"/>' +
    '<circle cx="110" cy="110" r="66.5" fill="none" stroke="url(#aurG)" stroke-width="0.6" opacity=".45"/>' +
    '<path d="' + rays + '" stroke="url(#aurG)" stroke-width="0.9" opacity=".7"/>' +
    '</svg>';
}

/* Fregi angolari sottili (doppia linea + rombo). */
const CORNER = '<svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">' +
  '<path d="M1 43V13C1 6.4 6.4 1 13 1h30" fill="none" stroke="url(#aurG)" stroke-width="1.1"/>' +
  '<path d="M7 43V15c0-4.4 3.6-8 8-8h28" fill="none" stroke="url(#aurG)" stroke-width="0.7" opacity=".5"/>' +
  '<path d="M15.5 11.5l4 4-4 4-4-4z" fill="url(#aurG)" opacity=".9"/>' +
  '</svg>';

function corners() {
  return '<span class="cnr cnr-tl">' + CORNER + '</span>' +
    '<span class="cnr cnr-tr">' + CORNER + '</span>' +
    '<span class="cnr cnr-bl">' + CORNER + '</span>' +
    '<span class="cnr cnr-br">' + CORNER + '</span>';
}

/* Separatore a rombo con filetti laterali. */
const LOZENGE = '<div class="loz" aria-hidden="true">' +
  '<svg viewBox="0 0 240 20" focusable="false">' +
  '<path d="M4 10h88M148 10h88" stroke="url(#aurGH)" stroke-width="1"/>' +
  '<path d="M120 2l8 8-8 8-8-8z" fill="none" stroke="url(#aurG)" stroke-width="1"/>' +
  '<path d="M120 6.2l3.8 3.8-3.8 3.8-3.8-3.8z" fill="url(#aurG)"/>' +
  '<path d="M104 10h5M131 10h5" stroke="url(#aurG)" stroke-width="1"/>' +
  '</svg></div>';

/* Silhouette d'auto disegnate a mano (nessuna foto, nessuna clipart). */
const CAR_HERO = '<svg class="car" viewBox="0 0 720 250" aria-hidden="true" focusable="false">' +
  '<path d="M46 186v-24c0-14 10-23 27-26l124-23c37-33 74-48 138-51h124c55 2 96 16 130 45l88 23c19 5 27 14 27 27v29" fill="none" stroke="url(#aurG)" stroke-width="1.4" stroke-linecap="round"/>' +
  '<path d="M209 113c33-31 68-45 127-47h113c53 2 92 15 119 42" fill="none" stroke="url(#aurG)" stroke-width="1" opacity=".8"/>' +
  '<path d="M380 65v50M380 128v46" fill="none" stroke="url(#aurG)" stroke-width="0.8" opacity=".55"/>' +
  '<path d="M243 148h250" stroke="url(#aurG)" stroke-width="0.8" opacity=".4"/>' +
  '<path d="M62 160h34M628 158h32" stroke="url(#aurG)" stroke-width="1.4" stroke-linecap="round"/>' +
  '<circle cx="212" cy="186" r="36" fill="none" stroke="url(#aurG)" stroke-width="1.4"/>' +
  '<circle cx="212" cy="186" r="18" fill="none" stroke="url(#aurG)" stroke-width="0.8" opacity=".7"/>' +
  '<circle cx="548" cy="186" r="36" fill="none" stroke="url(#aurG)" stroke-width="1.4"/>' +
  '<circle cx="548" cy="186" r="18" fill="none" stroke="url(#aurG)" stroke-width="0.8" opacity=".7"/>' +
  '<path d="M8 222h704" stroke="url(#aurGH)" stroke-width="1" opacity=".55"/>' +
  '</svg>';

const CAR_GLYPHS = [
  /* berlina */
  '<svg viewBox="0 0 200 62" aria-hidden="true" focusable="false"><path d="M12 46v-7c0-4 3-6 8-7l32-6c10-9 20-13 38-14h34c15 1 26 4 35 12l24 6c5 1 7 4 7 8v8" fill="none" stroke="url(#aurG)" stroke-width="1.2" stroke-linecap="round"/><path d="M57 26c9-8 19-11 35-12h31c14 1 24 4 31 11" fill="none" stroke="url(#aurG)" stroke-width=".8" opacity=".7"/><circle cx="60" cy="46" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/><circle cx="145" cy="46" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/></svg>',
  /* van */
  '<svg viewBox="0 0 200 62" aria-hidden="true" focusable="false"><path d="M14 46V22c0-5 4-9 10-9h96c9 0 15 2 21 8l22 20c3 3 5 5 5 9v-4" fill="none" stroke="url(#aurG)" stroke-width="1.2" stroke-linecap="round"/><path d="M168 50V38M14 46h6M158 50h10" stroke="url(#aurG)" stroke-width="1.2" stroke-linecap="round"/><path d="M30 20h96M78 13v20M126 21l16 15" fill="none" stroke="url(#aurG)" stroke-width=".8" opacity=".7"/><circle cx="58" cy="48" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/><circle cx="140" cy="48" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/></svg>',
  /* coupé/limousine bassa */
  '<svg viewBox="0 0 200 62" aria-hidden="true" focusable="false"><path d="M8 48v-5c0-4 3-6 7-7l38-7c13-11 26-16 45-16h30c17 1 30 6 41 16l24 6c5 1 7 4 7 8v5" fill="none" stroke="url(#aurG)" stroke-width="1.2" stroke-linecap="round"/><path d="M58 28c12-9 24-13 41-13h27c15 0 26 4 35 12" fill="none" stroke="url(#aurG)" stroke-width=".8" opacity=".7"/><path d="M46 40h110" stroke="url(#aurG)" stroke-width=".8" opacity=".4"/><circle cx="56" cy="48" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/><circle cx="148" cy="48" r="9" fill="none" stroke="url(#aurG)" stroke-width="1.2"/></svg>'
];

/* Icone di servizio: geometria art déco, tratto sottile. */
const SVC_ICONS = [
  '<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="24" fill="none" stroke="url(#aurG)" stroke-width=".9" opacity=".55"/><path d="M30 12l4 22 18 6-18 4-4 4-4-4-18-4 18-6z" fill="none" stroke="url(#aurG)" stroke-width="1.1" stroke-linejoin="round"/></svg>',
  '<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="24" fill="none" stroke="url(#aurG)" stroke-width=".9" opacity=".55"/><rect x="14" y="22" width="32" height="22" fill="none" stroke="url(#aurG)" stroke-width="1.1"/><path d="M24 22v-4h12v4M14 31h32M28 29h4v4h-4z" fill="none" stroke="url(#aurG)" stroke-width="1.1"/></svg>',
  '<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="24" fill="none" stroke="url(#aurG)" stroke-width=".9" opacity=".55"/><path d="M18 46L28 14M42 46L32 14M30 20v5M30 30v5M30 40v5" fill="none" stroke="url(#aurG)" stroke-width="1.1" stroke-linecap="round"/></svg>',
  '<svg viewBox="0 0 60 60" aria-hidden="true" focusable="false"><circle cx="30" cy="30" r="24" fill="none" stroke="url(#aurG)" stroke-width=".9" opacity=".55"/><path d="M30 10l5.5 14.5L50 30l-14.5 5.5L30 50l-5.5-14.5L10 30l14.5-5.5z" fill="none" stroke="url(#aurG)" stroke-width="1.1" stroke-linejoin="round"/></svg>'
];

/* Stella art déco: filigrana centrata dentro le cornici fotografiche. Sta sotto la
   foto, quindi si vede solo se la foto non arriva: la cornice non resta mai vuota. */
const ORNAMENT = '<span class="ph-mark" aria-hidden="true">' +
  '<svg viewBox="0 0 120 120" focusable="false">' +
  '<circle cx="60" cy="60" r="46" fill="none" stroke="url(#aurG)" stroke-width=".7" opacity=".45"/>' +
  '<circle cx="60" cy="60" r="40" fill="none" stroke="url(#aurG)" stroke-width=".5" opacity=".28"/>' +
  '<path d="M60 14l6.5 39.5L106 60l-39.5 6.5L60 106l-6.5-39.5L14 60l39.5-6.5z" fill="none" stroke="url(#aurG)" stroke-width="1" stroke-linejoin="round"/>' +
  '<path d="M60 54.5l5.5 5.5-5.5 5.5-5.5-5.5z" fill="url(#aurG)"/>' +
  '</svg></span>';

/* Rosa dei venti art déco per la zona operativa. */
const ROSE = (function () {
  let spokes = '';
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const r = (i % 4 === 0) ? 76 : (i % 2 === 0 ? 62 : 52);
    spokes += 'M90 90L' + n2(90 + Math.cos(a) * r) + ' ' + n2(90 + Math.sin(a) * r);
  }
  return '<svg class="rose" viewBox="0 0 180 180" aria-hidden="true" focusable="false">' +
    '<circle cx="90" cy="90" r="84" fill="none" stroke="url(#aurG)" stroke-width=".7" opacity=".4"/>' +
    '<circle cx="90" cy="90" r="78" fill="none" stroke="url(#aurG)" stroke-width="1"/>' +
    '<path d="' + spokes + '" stroke="url(#aurG)" stroke-width=".8" opacity=".55"/>' +
    '<path d="M90 14l10 66 66 10-66 10-10 66-10-66-66-10 66-10z" fill="none" stroke="url(#aurG)" stroke-width="1.1" stroke-linejoin="round"/>' +
    '<circle cx="90" cy="90" r="7" fill="none" stroke="url(#aurG)" stroke-width="1"/>' +
    '<circle cx="90" cy="90" r="2.6" fill="url(#aurG)"/>' +
    '</svg>';
})();

const ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.52 3.76 1.42 5.32L2 22l4.98-1.58a9.8 9.8 0 0 0 5.06 1.4h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2m0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1.98.99-3.02-.2-.31a8.1 8.1 0 0 1-1.25-4.35c0-4.5 3.68-8.17 8.2-8.17a8.14 8.14 0 0 1 8.17 8.18c0 4.5-3.67 8.01-8.34 8.01m4.5-6.11c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.19 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.47-.29"/></svg>';

const ICON_TEL = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 3h3l1.5 3.8-2 1.4a12 12 0 0 0 5.7 5.7l1.4-2L20 13.4v3a1.6 1.6 0 0 1-1.8 1.6A16.4 16.4 0 0 1 4 5.8 1.6 1.6 0 0 1 5.6 4z"/></svg>';

const ICON_PIN = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 21.5S4.8 15.3 4.8 10a7.2 7.2 0 0 1 14.4 0c0 5.3-7.2 11.5-7.2 11.5z"/><path d="M12 6.6l1.9 3.5 1.9-1.4-1.4 4.6H9.6L8.2 8.7l1.9 1.4z"/></svg>';

/* ------------------------------------------------------------------ */

module.exports = function render(lead, c, intro) {
  const name = t(lead.name);
  const nameAttr = esc(lead.name);
  const city = t(lead.city);
  const mono = esc(initials(lead.name));
  const hasWa = !!lead.whatsapp;
  const waHref = hasWa ? esc(lead.whatsapp) : '';
  const telHref = esc(lead.tel || '');
  const telText = t(lead.phoneDisplay);
  const address = lead.address ? t(lead.address) : '';
  const category = lead.category ? t(lead.category) : '';

  /* Prove: solo dati reali di `lead`. */
  const pool = [];
  if (lead.rating) pool.push([t(lead.rating), 'Valutazione Google']);
  if (lead.reviews > 0) pool.push([String(lead.reviews), lead.reviews === 1 ? 'Recensione verificata' : 'Recensioni verificate']);
  pool.push([city, 'Zona operativa']);
  pool.push(['Diretto', 'Un solo referente']);
  pool.push(['Fisso', 'Prezzo concordato prima']);
  const marks = pool.slice(0, 3);

  const firstStep = hasWa
    ? ['Scriveteci', 'Un messaggio su WhatsApp con data, orario, luogo di partenza e destinazione. Nient’altro.']
    : ['Chiamateci', 'Una telefonata con data, orario, luogo di partenza e destinazione. Nient’altro.'];
  const steps = [
    firstStep,
    ['Ricevete il preventivo', 'Vi rispondiamo con la vettura disponibile e il prezzo, concordato prima della partenza.'],
    ['Viaggiate', 'L’autista vi attende all’ora stabilita. Da quel momento non dovete pensare a nulla.']
  ];

  /* --- fotografia -------------------------------------------------------
     Ogni foto è servita dentro la stessa cornice: filetto d'oro esterno,
     doppio filetto interno, quattro fregi angolari. Il fondo della cornice è
     una texture di grafite e oro, così un'immagine che non arriva lascia una
     superficie decorata e non un buco. */
  const pics = c.pics || {};

  const phBox = (pic, opts) => {
    const o = opts || {};
    return '<div class="pf-box' + (o.box ? ' ' + o.box : '') + '">' + corners() +
      '<div class="ph pf-ph"' + (o.ratio ? ' style="aspect-ratio:' + o.ratio + '"' : '') + '>' +
        (o.mark ? ORNAMENT : '') +
        pic.tag({
          w: o.w || 900, q: o.q || 78, cls: 'ph-img', eager: !!o.eager,
          alt: o.alt || pic.alt,
          sizes: o.sizes || '(max-width:900px) 92vw, ' + (o.w || 900) + 'px'
        }) +
        '<span class="ph-tint" aria-hidden="true"></span>' +
        (o.over || '') +
      '</div>' +
    '</div>';
  };

  /* Foto incorniciata con didascalia dorata, centrata sull'asse. */
  const framed = (pic, cap, opts) => pic
    ? '<figure class="pf rv">' + phBox(pic, Object.assign({ mark: true }, opts)) +
        '<figcaption class="pf-cap">' + cap + '</figcaption>' +
      '</figure>'
    : '';

  /* Inserto della zona operativa: Milano quando è la città del lead, altrimenti strada. */
  const zonaPic = pics.citta || pics.strada || null;
  const zonaCap = pics.citta ? 'Milano' : 'Le strade che percorriamo';

  const waBtn = (cls, label) => hasWa
    ? '<a class="' + cls + '" href="' + waHref + '" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ' + nameAttr + '">' +
      ICON_WA + '<span>' + label + '</span></a>'
    : '';

  const services = c.services.map((s, i) =>
    '<article class="svc rv">' +
      '<span class="svc-ico">' + SVC_ICONS[i % SVC_ICONS.length] + '</span>' +
      '<h3>' + t(s[0]) + '</h3>' +
      '<p>' + t(s[1]) + '</p>' +
    '</article>').join('');

  const fleet = c.fleet.map((f, i) => {
    const pic = pics.fleet && pics.fleet[i];
    const glyph = '<span class="fglyph" aria-hidden="true">' + CAR_GLYPHS[i % CAR_GLYPHS.length] + '</span>';
    return '<article class="fcard rv" data-photo-slot="fleet-' + (i + 1) + '">' +
      '<span class="fnum" aria-hidden="true">' + ROMAN[i] + '</span>' +
      (pic
        ? phBox(pic, { w: 760, q: 78, ratio: '4/3', box: 'pf-box-tight', over: glyph,
            alt: pic.alt + ' — ' + t(f[0]), sizes: '(max-width:900px) 76vw, 330px' })
        : '<div class="pf-box pf-box-tight">' + corners() + '<div class="ph pf-ph" style="aspect-ratio:4/3">' + glyph + '</div></div>') +
      '<p class="fsize">' + t(f[1]) + '</p>' +
      '<h3>' + t(f[0]) + '</h3>' +
      '<div class="hair" aria-hidden="true"></div>' +
      '<p class="ftext">' + t(f[2]) + '</p>' +
    '</article>';
  }).join('');

  const stepsHtml = steps.map((s, i) =>
    '<li class="step rv">' +
      '<span class="step-n" aria-hidden="true">' + ROMAN[i] + '</span>' +
      '<h3>' + t(s[0]) + '</h3>' +
      '<p>' + t(s[1]) + '</p>' +
    '</li>').join('');

  const faq = c.faq.map((f, i) =>
    '<div class="qa rv">' +
      '<h3 class="qa-h"><button type="button" class="qa-btn" aria-expanded="false" aria-controls="aq' + i + '" id="ab' + i + '">' +
        '<span class="qa-mark" aria-hidden="true"></span>' +
        '<span class="qa-t">' + t(f[0]) + '</span>' +
      '</button></h3>' +
      '<div class="qa-p" id="aq' + i + '" role="region" aria-labelledby="ab' + i + '"><div class="qa-in"><p>' + t(f[1]) + '</p></div></div>' +
    '</div>').join('');

  return '<!doctype html>\n' +
'<html lang="it">\n' +
'<head>\n' +
'<meta charset="utf-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' +
'<title>' + esc(c.metaTitle) + '</title>\n' +
'<meta name="description" content="' + esc(c.metaDesc) + '">\n' +
'<meta name="theme-color" content="#15161A">\n' +
'<meta property="og:title" content="' + esc(c.metaTitle) + '">\n' +
'<meta property="og:description" content="' + esc(c.metaDesc) + '">\n' +
'<meta property="og:type" content="website">\n' +
'<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap">\n' +
'<style>\n' +
CSS +
'</style>\n' +
'<noscript><style>.rv{opacity:1;transform:none}.rule span{transform:scaleX(1)}.qa-p{max-height:none}</style></noscript>\n' +
'</head>\n' +
'<body>\n' +

/* Definizioni oro condivise da tutti gli SVG della pagina. */
'<svg class="defs" width="0" height="0" aria-hidden="true" focusable="false">' +
  '<defs>' +
    '<linearGradient id="aurG" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#8A6B2F"/><stop offset=".38" stop-color="#E8C87A"/>' +
      '<stop offset=".56" stop-color="#FFF3D0"/><stop offset="1" stop-color="#C9A24A"/>' +
    '</linearGradient>' +
    '<linearGradient id="aurGH" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#8A6B2F" stop-opacity="0"/><stop offset=".18" stop-color="#8A6B2F"/>' +
      '<stop offset=".42" stop-color="#E8C87A"/><stop offset=".52" stop-color="#FFF3D0"/>' +
      '<stop offset=".76" stop-color="#C9A24A"/><stop offset="1" stop-color="#8A6B2F" stop-opacity="0"/>' +
    '</linearGradient>' +
  '</defs>' +
'</svg>\n' +

'<div class="amb" aria-hidden="true"><span class="amb-lamp"></span><span class="amb-vig"></span><span class="amb-noise"></span></div>\n' +

'<a class="skip" href="#main">Vai al contenuto</a>\n' +

/* ---------- header ---------- */
'<header class="hdr" id="hdr">\n' +
'  <div class="hdr-in">\n' +
'    <a class="hdr-side hdr-tel" href="tel:' + telHref + '" aria-label="Telefonare a ' + nameAttr + '">' + ICON_TEL + '<span>' + telText + '</span></a>\n' +
'    <a class="hdr-brand" href="#top">\n' +
'      <span class="hdr-mono" aria-hidden="true">' + mono + '</span>\n' +
'      <span class="hdr-name">' + name + '</span>\n' +
'    </a>\n' +
'    <div class="hdr-side hdr-cta">' + waBtn('btn btn-gold btn-sm', 'WhatsApp') + '</div>\n' +
'  </div>\n' +
'  <div class="hdr-line" aria-hidden="true"></div>\n' +
'</header>\n' +

'<main id="main">\n' +

/* ---------- hero ---------- */
'<section class="hero" id="top">\n' +
'  <div class="wrap hero-in">\n' +
'    <div class="crest rv" id="crest">\n' +
'      <div class="crest-box' + (mono.length > 2 ? ' m3' : '') + '">\n' +
        crestSvg() +
'        <span class="crest-mono">' + mono + '</span>\n' +
'        <span class="crest-sheen" aria-hidden="true"></span>\n' +
'      </div>\n' +
'    </div>\n' +
'    <p class="eyebrow rv">' + t(c.kicker) + '<span class="dot" aria-hidden="true"></span>' + city + '</p>\n' +
'    <div class="rule rule-wide"><span></span></div>\n' +
'    <h1 class="hero-name rv">' + name + '</h1>\n' +
'    <div class="rule rule-wide"><span></span></div>\n' +
'    <p class="hero-claim rv">' + t(c.heroA) + ' <em>' + t(c.heroB) + '</em></p>\n' +
'    <p class="lede rv">' + t(c.lede) + '</p>\n' +
'    <div class="cta rv">' +
       waBtn('btn btn-gold', 'Preventivo su WhatsApp') +
'      <a class="btn btn-ghost" href="tel:' + telHref + '"' + (hasWa ? '' : ' aria-label="Telefonare a ' + nameAttr + '"') + '>' + ICON_TEL + '<span>' + telText + '</span></a>' +
'    </div>\n' +
'    <div class="hero-stage rv" data-photo-slot="hero">\n' +
'      <div class="stage-frame">' + corners() +
'        <div class="arch">\n' +
'          <div class="ph arch-ph">\n' +
             (pics.hero ? pics.hero.tag({
               w: 1800, q: 80, cls: 'ph-img', eager: true,
               alt: pics.hero.alt + ' — ' + nameAttr,
               sizes: '(max-width:900px) 94vw, 860px'
             }) : '') +
'            <span class="ph-tint" aria-hidden="true"></span>\n' +
'            <span class="arch-veil" aria-hidden="true"></span>\n' +
'            <span class="arch-mono" aria-hidden="true">' + mono + '<i></i></span>\n' +
'            <span class="arch-car" aria-hidden="true">' + CAR_HERO + '</span>\n' +
'          </div>\n' +
'          <span class="arch-out" aria-hidden="true"></span>\n' +
'        </div>\n' +
'      </div>\n' +
'      <p class="stage-cap">' + (category ? category : 'Servizio con conducente') + '<span class="dot" aria-hidden="true"></span>' + city + '</p>\n' +
'    </div>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- fascia di prova ---------- */
'<section class="band">\n' +
'  <div class="wrap">\n' +
'    <div class="band-frame rv">' + corners() +
'      <ul class="marks">' +
         marks.map(m => '<li><span class="mk-v">' + m[0] + '</span><span class="mk-l">' + m[1] + '</span></li>').join('<li class="mk-sep" aria-hidden="true"><svg viewBox="0 0 12 12" focusable="false"><path d="M6 1l5 5-5 5-5-5z" fill="none" stroke="url(#aurG)" stroke-width="1"/></svg></li>') +
'      </ul>' +
'      <div class="rule"><span></span></div>' +
'      <p class="band-proof"><strong>' + t(c.proof[0]) + '</strong>' + t(c.proof[1]) + '</p>' +
'    </div>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- servizi ---------- */
'<section class="sec" id="servizi">\n' +
'  <div class="wrap">\n' +
'    <p class="eyebrow rv">Il servizio</p>\n' +
'    <h2 class="sec-h rv">Ciò di cui vi occupiamo noi</h2>\n' +
    LOZENGE +
'    <p class="sec-sub rv">Ogni richiesta viene letta e seguita da una sola persona, dal primo messaggio fino al rientro.</p>\n' +
'    <div class="svc-grid">' + services + '</div>\n' +
     (pics.interni && pics.autista
       ? '    <div class="duo">' +
           framed(pics.interni, 'A bordo', { w: 900, ratio: '4/3', sizes: '(max-width:620px) 92vw, 520px' }) +
           framed(pics.autista, 'Alla guida', { w: 900, ratio: '4/3', sizes: '(max-width:620px) 92vw, 520px' }) +
         '</div>\n'
       : '') +
'  </div>\n' +
'</section>\n' +

/* ---------- flotta ---------- */
'<section class="sec sec-alt" id="flotta">\n' +
'  <div class="wrap">\n' +
'    <p class="eyebrow rv">Le vetture</p>\n' +
'    <h2 class="sec-h rv">La flotta</h2>\n' +
    LOZENGE +
'    <p class="sec-sub rv">Ditecelo prima e la vettura giusta vi attende già pronta. La disponibilità viene confermata al momento della prenotazione.</p>\n' +
'  </div>\n' +
'  <div class="rail-outer">\n' +
'    <div class="rail">' + fleet + '</div>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- fascia fotografica a tutta larghezza ---------- */
'<section class="strip" aria-label="La notte">\n' +
'  <div class="ph strip-ph" aria-hidden="true">' +
     (pics.notturno ? pics.notturno.tag({ w: 1800, q: 74, cls: 'ph-img', alt: pics.notturno.alt, sizes: '100vw' }) : '') +
'    <span class="ph-tint"></span><span class="strip-scrim"></span>' +
'  </div>\n' +
'  <div class="strip-in">\n' +
     LOZENGE +
'    <p class="strip-q">Si viaggia meglio quando non resta nulla da decidere.</p>\n' +
'    <p class="strip-sub">' + city + '<span class="dot" aria-hidden="true"></span>giorno e notte</p>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- come funziona ---------- */
'<section class="sec" id="come">\n' +
'  <div class="wrap">\n' +
'    <p class="eyebrow rv">In tre passaggi</p>\n' +
'    <h2 class="sec-h rv">Come si prenota</h2>\n' +
    LOZENGE +
'    <ol class="steps">' + stepsHtml + '</ol>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- zona operativa ---------- */
'<section class="sec sec-alt" id="zona">\n' +
'  <div class="wrap">\n' +
'    <div class="zona rv">' + corners() +
'      <span class="zona-rose" aria-hidden="true">' + ROSE + '</span>' +
'      <p class="eyebrow">Dove operiamo</p>' +
'      <h2 class="sec-h">' + city + '</h2>' +
'      <div class="rule"><span></span></div>' +
'      <p class="zona-t">Partiamo da ' + city + ' e vi accompagniamo dove serve: aeroporti, stazioni, hotel, sedi aziendali e destinazioni fuori regione. Indicateci il punto di partenza e l’orario, al resto pensiamo noi.</p>' +
       (zonaPic ? '<div class="zona-pic">' + framed(zonaPic, zonaCap, { w: 1200, ratio: '16/9', sizes: '(max-width:900px) 92vw, 640px' }) + '</div>' : '') +
       (address ? '<p class="zona-a"><span class="zona-a-l">Recapito</span>' + address + (city ? '<span class="dot" aria-hidden="true"></span>' + city : '') + '</p>' : '') +
'    </div>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- faq ---------- */
'<section class="sec" id="faq">\n' +
'  <div class="wrap wrap-narrow">\n' +
'    <p class="eyebrow rv">Domande ricorrenti</p>\n' +
'    <h2 class="sec-h rv">Prima di scrivere</h2>\n' +
    LOZENGE +
'    <div class="faq">' + faq + '</div>\n' +
'  </div>\n' +
'</section>\n' +

/* ---------- contatti ---------- */
'<section class="sec closing" id="contatti">\n' +
'  <div class="wrap wrap-narrow">\n' +
'    <div class="close-frame rv">' + corners() +
'      <p class="eyebrow">Restiamo a vostra disposizione</p>' +
'      <h2 class="close-h">' + (hasWa ? 'Scriveteci: vi rispondiamo noi' : 'Chiamateci: vi rispondiamo noi') + '</h2>' +
'      <div class="rule"><span></span></div>' +
'      <p class="close-t">Data, orario, luogo di partenza e destinazione: bastano queste quattro righe per ricevere il preventivo.</p>' +
'      <div class="cta cta-center">' + waBtn('btn btn-gold', 'Scrivere su WhatsApp') +
'        <a class="btn btn-ghost" href="tel:' + telHref + '"' + (hasWa ? '' : ' aria-label="Telefonare a ' + nameAttr + '"') + '>' + ICON_TEL + '<span>' + telText + '</span></a>' +
'      </div>' +
'      <ul class="contacts">' +
'        <li><span class="ci">' + ICON_TEL + '</span><span class="cl">Telefono</span><a href="tel:' + telHref + '">' + telText + '</a></li>' +
         (hasWa ? '<li><span class="ci">' + ICON_WA + '</span><span class="cl">WhatsApp</span><a href="' + waHref + '" target="_blank" rel="noopener">Apri la conversazione</a></li>' : '') +
         (address ? '<li><span class="ci">' + ICON_PIN + '</span><span class="cl">Indirizzo</span><span class="cv">' + address + (city ? ', ' + city : '') + '</span></li>' : '') +
'      </ul>' +
'    </div>\n' +
'  </div>\n' +
'</section>\n' +

'</main>\n' +

/* ---------- footer ---------- */
'<footer class="ftr">\n' +
'  <div class="wrap">\n' +
'    <span class="ftr-mono" aria-hidden="true">' + mono + '</span>\n' +
'    <p class="ftr-name">' + name + '</p>\n' +
'    <p class="ftr-meta">' + t(c.kicker) + '<span class="dot" aria-hidden="true"></span>' + city + '</p>\n' +
'    <div class="rule"><span></span></div>\n' +
'    <p class="ftr-note">Anteprima realizzata da Umbra</p>\n' +
'  </div>\n' +
'</footer>\n' +

/* ---------- barra CTA mobile ---------- */
'<nav class="bar" aria-label="Contatti rapidi">\n' +
   (hasWa ? '<a class="bar-b bar-wa" href="' + waHref + '" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ' + nameAttr + '">' + ICON_WA + '<span>WhatsApp</span></a>' : '') +
'  <a class="bar-b bar-tel" href="tel:' + telHref + '" aria-label="Telefonare a ' + nameAttr + '">' + ICON_TEL + '<span>Chiamare</span></a>\n' +
'</nav>\n' +

'<script>\n' + JS + '\n</script>\n' +

intro + '\n' +
'</body>\n' +
'</html>\n';
};

/* ================================ CSS ================================ */

const CSS = [
":root{",
"  --ink:#15161A; --ink-2:#101115; --surf:#1D1F25; --surf-2:#22252C;",
"  --paper:#EDE9E1; --paper-2:#C9C3B6; --mute:#A79E8C;",
"  --g-deep:#8A6B2F; --g-warm:#C9A24A; --g-lit:#E8C87A; --g-pale:#FFF3D0;",
"  --line:rgba(201,162,74,.20); --line-2:rgba(201,162,74,.34);",
"  --serif:'Cormorant','EB Garamond',Garamond,Georgia,'Times New Roman',serif;",
"  --sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
"  --gold-text:linear-gradient(102deg,#C9A24A 0%,#E8C87A 26%,#FFF3D0 50%,#E8C87A 74%,#C9A24A 100%);",
"  --gold-line:linear-gradient(90deg,rgba(138,107,47,0) 0%,#8A6B2F 14%,#C9A24A 34%,#E8C87A 46%,#FFF3D0 52%,#E8C87A 58%,#C9A24A 70%,#8A6B2F 88%,rgba(138,107,47,0) 100%);",
"  --gold-frame:linear-gradient(135deg,#8A6B2F,#E8C87A 34%,#FFF3D0 52%,#C9A24A 100%);",
"  --bar-h:70px;",
"}",
"*,*::before,*::after{box-sizing:border-box}",
"body{margin:0;background:var(--ink);color:var(--paper);font-family:var(--sans);",
"  font-size:16px;line-height:1.72;font-weight:300;overflow-x:hidden;-webkit-font-smoothing:antialiased;",
"  text-rendering:optimizeLegibility;padding-bottom:calc(var(--bar-h) + env(safe-area-inset-bottom,0px))}",
"img,svg{max-width:100%}",
"h1,h2,h3{font-family:var(--serif);font-weight:400;margin:0;line-height:1.1}",
"p{margin:0}",
"a{color:inherit}",
"ul,ol{margin:0;padding:0;list-style:none}",
"button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}",
":focus-visible{outline:2px solid var(--g-lit);outline-offset:3px;border-radius:2px}",
".defs{position:absolute;width:0;height:0;overflow:hidden}",
".skip{position:absolute;left:-9999px;top:0;z-index:8500;background:var(--surf);color:var(--paper);",
"  padding:12px 20px;border:1px solid var(--line-2)}",
".skip:focus{left:50%;transform:translateX(-50%);top:10px}",

/* ambiente: lampadario, vignettatura, rumore */
".amb{position:fixed;inset:0;z-index:0;pointer-events:none}",
".amb span{position:absolute;inset:0;display:block}",
".amb-lamp{background:radial-gradient(120% 62% at 50% -12%,rgba(232,200,122,.16) 0%,rgba(201,162,74,.075) 34%,rgba(138,107,47,.028) 56%,transparent 74%);",
"  animation:lamp 14s ease-in-out infinite}",
"@keyframes lamp{0%,100%{opacity:.86}50%{opacity:1}}",
".amb-vig{background:radial-gradient(128% 96% at 50% 34%,transparent 38%,rgba(6,6,8,.42) 76%,rgba(4,4,6,.82) 100%)}",
".amb-noise{opacity:.05;mix-blend-mode:overlay;",
"  background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\");",
"  background-size:180px 180px}",

/* impianto */
".wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 22px;position:relative;z-index:1}",
".wrap-narrow{max-width:820px}",
"main{position:relative;z-index:1}",
".sec{padding:88px 0;text-align:center;position:relative}",
"section[id],main{scroll-margin-top:84px}",
".sec-alt{background:linear-gradient(180deg,rgba(29,31,37,0) 0%,rgba(29,31,37,.66) 14%,rgba(29,31,37,.66) 86%,rgba(29,31,37,0) 100%)}",

/* etichette e filetti */
".eyebrow{font-family:var(--sans);font-size:.66rem;font-weight:500;letter-spacing:.34em;",
"  text-transform:uppercase;color:#D9B978;display:flex;align-items:center;justify-content:center;",
"  gap:12px;flex-wrap:wrap;margin:0 0 20px}",
".dot{display:inline-block;width:5px;height:5px;transform:rotate(45deg);background:var(--g-warm);opacity:.9;flex:none}",
".rule{height:1px;width:min(620px,90%);margin:22px auto;overflow:hidden}",
".rule-wide{width:min(760px,96%);margin:26px auto}",
".rule span{display:block;height:100%;background:var(--gold-line);transform:scaleX(.04);transform-origin:50% 50%;",
"  transition:transform 1.6s cubic-bezier(.16,.86,.28,1)}",
".in .rule span,.rule.in span{transform:scaleX(1)}",
".loz{margin:18px auto 26px;width:min(300px,74%)}",
".loz svg{display:block;width:100%;height:auto}",
".sec-h{font-size:clamp(2.1rem,6.4vw,3.5rem);letter-spacing:.005em;color:var(--paper)}",
".sec-sub{max-width:60ch;margin:20px auto 0;color:var(--paper-2);font-size:1.02rem}",

/* fregi angolari */
".cnr{position:absolute;width:34px;height:34px;opacity:.72;pointer-events:none}",
".cnr svg{display:block;width:100%;height:100%}",
".cnr-tl{top:-1px;left:-1px}",
".cnr-tr{top:-1px;right:-1px;transform:scaleX(-1)}",
".cnr-bl{bottom:-1px;left:-1px;transform:scaleY(-1)}",
".cnr-br{bottom:-1px;right:-1px;transform:scale(-1)}",

/* ---------------- fotografia ----------------
   Un solo trattamento per tutte le foto del tema: ambra scura, contrasto alto,
   luminosita abbassata, piu un velo ambra in multiply. Il fondo della cornice e
   una texture di grafite e oro: se la foto non arriva resta una superficie
   decorata, mai un rettangolo vuoto. */
".ph{position:relative;overflow:hidden;isolation:isolate;",
"  background:",
"    repeating-linear-gradient(135deg,rgba(201,162,74,.055) 0 1px,transparent 1px 11px),",
"    radial-gradient(120% 86% at 50% 4%,rgba(232,200,122,.17),transparent 64%),",
"    linear-gradient(180deg,#23262D 0%,#181A20 54%,#101115 100%)}",
".ph .ph-img{position:absolute;inset:0;z-index:1;width:100%;height:100%;object-fit:cover;display:block;",
"  filter:sepia(.2) contrast(1.1) brightness(.78) saturate(.92)}",
".ph-mark{position:absolute;left:50%;top:50%;z-index:0;width:min(36%,150px);transform:translate(-50%,-50%);",
"  opacity:.5;pointer-events:none}",
".ph-mark svg{display:block;width:100%;height:auto}",
".ph-tint{position:absolute;inset:0;z-index:2;pointer-events:none;mix-blend-mode:multiply;",
"  background:linear-gradient(180deg,rgba(206,158,72,.58) 0%,rgba(132,96,40,.7) 44%,rgba(44,32,14,.86) 100%)}",
".ph.no-ph .ph-tint{display:none}",

/* cornice ornamentale: filetto d'oro 1px, doppio filetto interno, fregi angolari */
".pf-box{position:relative;padding:9px;border:1px solid var(--line-2);background:rgba(21,22,26,.55)}",
".pf-box::before{content:'';position:absolute;inset:4px;border:1px solid rgba(201,162,74,.14);pointer-events:none;z-index:5}",
".pf-box-tight{padding:6px}",
".pf-ph{aspect-ratio:16/10}",
".pf{margin:0}",
/* larghezza al contenuto: cosi il gradiente oro corre tutto dentro le lettere */
".pf-cap{margin:14px auto 0;width:max-content;max-width:100%;font-size:.62rem;letter-spacing:.3em;",
"  text-transform:uppercase;text-align:center;padding-left:.3em;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".duo{display:grid;grid-template-columns:1fr;gap:22px;margin-top:44px}",

/* fascia fotografica a tutta larghezza */
".strip{position:relative;overflow:hidden;display:grid;place-items:center;text-align:center;",
"  min-height:clamp(330px,56vh,520px);border-top:1px solid var(--line);border-bottom:1px solid var(--line);",
"  background:linear-gradient(180deg,#101115,#1A1C22 50%,#101115)}",
".strip-ph{position:absolute;inset:0;z-index:0}",
".strip .ph-img{filter:sepia(.26) contrast(1.14) brightness(.44) saturate(.82)}",
".strip-scrim{position:absolute;inset:0;z-index:3;pointer-events:none;",
"  background:radial-gradient(94% 76% at 50% 50%,rgba(10,9,8,.46) 0%,rgba(8,7,6,.8) 62%,rgba(6,5,4,.93) 100%)}",
".strip-in{position:relative;z-index:1;padding:66px 22px;max-width:760px;margin:0 auto}",
".strip-in .loz{margin:0 auto 22px;width:min(240px,62%)}",
".strip-q{font-family:var(--serif);font-size:clamp(1.5rem,4.8vw,2.6rem);line-height:1.26;letter-spacing:.02em;",
"  font-style:italic;background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".strip-sub{margin-top:20px;font-size:.62rem;letter-spacing:.3em;text-transform:uppercase;color:var(--paper-2);",
"  display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}",

/* bottoni */
".btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 26px;",
"  font-family:var(--sans);font-size:.74rem;font-weight:500;letter-spacing:.2em;text-transform:uppercase;",
"  text-decoration:none;border:1px solid var(--line-2);position:relative;transition:color .5s ease,border-color .5s ease,background-color .5s ease;min-height:48px}",
".btn svg{width:18px;height:18px;flex:none}",
".btn-gold{color:#1A1509;background-image:var(--gold-text);border-color:transparent;font-weight:500}",
".btn-gold:hover{filter:brightness(1.08)}",
".btn-ghost{color:var(--paper);background:rgba(237,233,225,.03)}",
".btn-ghost:hover{border-color:var(--g-lit);color:#FFF3D0}",
".btn-sm{padding:10px 18px;font-size:.66rem;min-height:40px}",
".cta{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:32px 0 0}",

/* header */
".hdr{position:sticky;top:0;z-index:7000;background:rgba(21,22,26,.82);backdrop-filter:blur(14px);",
"  -webkit-backdrop-filter:blur(14px);transition:background-color .5s ease}",
".hdr-in{max-width:1120px;margin:0 auto;padding:12px 20px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:14px}",
".hdr-side{display:flex;align-items:center;gap:8px;font-size:.78rem;letter-spacing:.04em;text-decoration:none;color:var(--paper-2)}",
".hdr-tel svg{width:16px;height:16px;color:var(--g-lit)}",
".hdr-tel:hover{color:var(--paper)}",
".hdr-cta{justify-content:flex-end}",
".hdr-brand{display:flex;flex-direction:column;align-items:center;gap:3px;text-decoration:none;min-width:0}",
".hdr-mono{font-family:var(--serif);font-size:1.06rem;letter-spacing:.16em;line-height:1;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".hdr-name{font-family:var(--serif);font-size:.86rem;letter-spacing:.1em;color:var(--paper);",
"  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:44vw}",
".hdr-line{height:1px;background:var(--gold-line);opacity:.5}",

/* hero */
".hero{padding:64px 0 76px;text-align:center;position:relative}",
".hero-in{display:flex;flex-direction:column;align-items:center}",
".crest{margin:0 auto 26px}",
".crest-box{position:relative;width:clamp(148px,40vw,196px);aspect-ratio:1;display:grid;place-items:center;",
"  border-radius:50%;overflow:hidden}",
".crest-ring{position:absolute;inset:0;width:100%;height:100%}",
".crest-mono{font-family:var(--serif);font-weight:400;font-size:clamp(2.7rem,10vw,3.6rem);letter-spacing:.06em;",
"  line-height:1;padding-left:.06em;background-image:var(--gold-text);-webkit-background-clip:text;",
"  background-clip:text;color:transparent}",
".crest-box.m3 .crest-mono{font-size:clamp(1.95rem,7.2vw,2.6rem);letter-spacing:.04em;padding-left:.04em}",
".crest-sheen{position:absolute;inset:-20%;pointer-events:none;",
"  background:linear-gradient(104deg,transparent 42%,rgba(255,243,208,.42) 50%,transparent 58%);",
"  transform:translateX(-150%)}",
".crest.live .crest-sheen{animation:sheen 11s cubic-bezier(.4,0,.2,1) 2.4s infinite}",
"@keyframes sheen{0%{transform:translateX(-150%)}16%{transform:translateX(150%)}100%{transform:translateX(150%)}}",
".hero-name{font-size:clamp(2.5rem,10.4vw,5.6rem);font-weight:300;letter-spacing:.012em;",
"  line-height:1.02;color:var(--paper);max-width:16ch;margin:0 auto;text-wrap:balance;",
"  overflow-wrap:break-word;hyphens:auto}",
".hero-claim{font-family:var(--serif);font-size:clamp(1.32rem,4.4vw,2.05rem);color:var(--paper-2);",
"  letter-spacing:.03em;margin:0}",
".hero-claim em{font-style:italic;background-image:var(--gold-text);-webkit-background-clip:text;",
"  background-clip:text;color:transparent}",
".lede{max-width:56ch;margin:26px auto 0;color:var(--paper-2);font-size:1.04rem}",
".hero-stage{margin:52px auto 0;width:100%;max-width:900px}",
".stage-frame{position:relative;border:1px solid var(--line);padding:30px 22px;",
"  background:radial-gradient(80% 120% at 50% 118%,rgba(232,200,122,.10),transparent 62%),rgba(29,31,37,.5)}",
".stage-frame::before{content:'';position:absolute;inset:6px;border:1px solid rgba(201,162,74,.12);pointer-events:none;z-index:4}",
".stage-frame .cnr{z-index:5}",
".car{display:block;width:100%;height:auto;position:relative}",

/* hero: ritaglio ad arco, monogramma dorato sopra la foto, silhouette in oro alla base */
".arch{position:relative;width:min(100%,600px);margin:0 auto;padding:0}",
".arch-ph{aspect-ratio:4/5;border:1px solid rgba(232,200,122,.42);",
"  border-radius:50% 50% 3px 3px/34% 34% 3px 3px}",
".arch-out{position:absolute;inset:-11px;border:1px solid rgba(201,162,74,.18);pointer-events:none;",
"  border-radius:50% 50% 3px 3px/33% 33% 3px 3px}",
".arch-veil{position:absolute;inset:0;pointer-events:none;z-index:3;",
"  background:linear-gradient(180deg,rgba(8,7,6,.64) 0%,rgba(8,7,6,.14) 34%,rgba(8,7,6,0) 52%,rgba(8,7,6,.42) 82%,rgba(8,7,6,.74) 100%)}",
".arch-mono{position:absolute;left:0;right:0;top:8%;z-index:4;width:max-content;margin:0 auto;",
"  display:flex;flex-direction:column;align-items:center;gap:11px;",
"  font-family:var(--serif);font-size:clamp(1.8rem,6.2vw,2.6rem);letter-spacing:.16em;line-height:1;padding-left:.16em;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".arch-mono i{display:block;width:58px;height:1px;background:var(--gold-line);opacity:.85}",
".arch-car{position:absolute;left:50%;bottom:5%;width:86%;transform:translateX(-50%);z-index:4;opacity:.94;",
"  filter:drop-shadow(0 2px 10px rgba(0,0,0,.55))}",
".stage-cap{margin:16px 0 0;font-size:.66rem;letter-spacing:.3em;text-transform:uppercase;color:var(--mute);",
"  display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}",

/* fascia di prova */
".band{padding:10px 0 24px}",
".band-frame{position:relative;border:1px solid var(--line);padding:38px 22px 34px;background:rgba(29,31,37,.55)}",
".band-frame::before{content:'';position:absolute;inset:6px;border:1px solid rgba(201,162,74,.1);pointer-events:none}",
".marks{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px 22px}",
".marks li{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:104px}",
".mk-v{font-family:var(--serif);font-size:clamp(2rem,7vw,2.9rem);line-height:1;font-weight:400;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".mk-l{font-size:.6rem;letter-spacing:.26em;text-transform:uppercase;color:var(--mute)}",
".mk-sep{min-width:0}",
".mk-sep svg{width:11px;height:11px;display:block;opacity:.8}",
".band-proof{color:var(--paper-2);font-size:.98rem;max-width:52ch;margin:0 auto}",
".band-proof strong{display:block;font-family:var(--serif);font-weight:400;font-size:1.32rem;color:var(--paper);",
"  letter-spacing:.04em;margin-bottom:4px}",

/* servizi */
".svc-grid{display:grid;gap:18px;margin-top:40px;grid-template-columns:1fr}",
".svc{position:relative;padding:34px 24px 32px;border:1px solid var(--line);background:rgba(29,31,37,.42);text-align:center}",
".svc::before{content:'';position:absolute;inset:5px;border:1px solid rgba(201,162,74,.09);pointer-events:none}",
".svc-ico{display:block;width:52px;height:52px;margin:0 auto 16px}",
".svc-ico svg{display:block;width:100%;height:100%}",
".svc h3{font-size:1.5rem;letter-spacing:.02em;margin-bottom:10px;color:var(--paper)}",
".svc p{color:var(--paper-2);font-size:.97rem;max-width:38ch;margin:0 auto}",

/* flotta */
".rail-outer{margin-top:40px;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:thin}",
".rail{display:flex;gap:18px;padding:6px 22px 22px;width:max-content;min-width:100%;justify-content:flex-start}",
".fcard{position:relative;flex:0 0 auto;width:min(80vw,320px);padding:34px 26px 32px;overflow:hidden;",
"  border:1px solid var(--line);background:linear-gradient(180deg,rgba(34,37,44,.85),rgba(21,22,26,.85));text-align:center}",
".fcard::after{content:'';position:absolute;inset:0;border:1px solid transparent;background:var(--gold-frame) border-box;",
"  -webkit-mask:linear-gradient(#000 0 0) padding-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;",
"  mask:linear-gradient(#000 0 0) padding-box,linear-gradient(#000 0 0);mask-composite:exclude;",
"  opacity:0;transition:opacity .6s ease;pointer-events:none}",
".fcard:hover::after,.fcard:focus-within::after{opacity:1}",
".fnum{position:absolute;right:6px;bottom:-24px;font-family:var(--serif);font-size:8.4rem;line-height:1;",
"  font-weight:400;color:transparent;-webkit-text-stroke:1px rgba(201,162,74,.17);pointer-events:none;user-select:none}",
".fcard .pf-box{position:relative;z-index:1}",
".fcard .cnr,.pf-box .cnr{z-index:6}",
".fglyph{position:absolute;left:50%;bottom:9px;z-index:4;width:64%;max-width:148px;transform:translateX(-50%);",
"  filter:drop-shadow(0 2px 7px rgba(0,0,0,.66))}",
".fglyph svg{display:block;width:100%;height:auto}",
".fcard h3{font-size:1.5rem;letter-spacing:.02em;position:relative;margin-top:7px}",
".fsize{font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:#D9B978;margin-top:20px;position:relative}",
".hair{height:1px;width:56px;margin:16px auto;background:var(--gold-line);opacity:.75;position:relative}",
".ftext{color:var(--paper-2);font-size:.95rem;position:relative}",

/* come funziona */
".steps{display:grid;gap:14px;margin-top:38px;grid-template-columns:1fr}",
".step{position:relative;padding:34px 22px;border:1px solid var(--line);background:rgba(29,31,37,.4)}",
".step-n{display:block;font-family:var(--serif);font-size:1.7rem;letter-spacing:.14em;line-height:1;margin-bottom:14px;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".step h3{font-size:1.44rem;margin-bottom:10px;color:var(--paper)}",
".step p{color:var(--paper-2);font-size:.97rem;max-width:36ch;margin:0 auto}",

/* zona operativa */
".zona{position:relative;border:1px solid var(--line);padding:56px 24px 48px;background:rgba(21,22,26,.5);overflow:hidden}",
".zona::before{content:'';position:absolute;inset:6px;border:1px solid rgba(201,162,74,.1);pointer-events:none}",
".zona-rose{position:absolute;top:50%;left:50%;width:min(78vw,420px);transform:translate(-50%,-50%);opacity:.09;pointer-events:none}",
".zona-rose svg{display:block;width:100%;height:auto}",
".zona>*:not(.zona-rose){position:relative}",
/* i fregi angolari restano assoluti: la regola qui sopra li rimetterebbe nel flusso */
".zona>.cnr{position:absolute}",
".zona-t{max-width:56ch;margin:0 auto;color:var(--paper-2);font-size:1.02rem}",
".zona-pic{margin:36px auto 0;max-width:640px}",
".zona-a{margin:26px auto 0;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--paper);",
"  font-family:var(--serif);font-size:1.24rem;letter-spacing:.03em}",
".zona-a .dot{margin:0 4px}",
".zona-a-l{font-family:var(--sans);font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--mute)}",

/* faq */
".faq{margin-top:36px;text-align:left;border-top:1px solid var(--line)}",
".qa{border-bottom:1px solid var(--line)}",
".qa-h{margin:0;font-family:var(--sans)}",
".qa-btn{display:flex;align-items:flex-start;gap:14px;width:100%;padding:20px 4px;text-align:left}",
".qa-mark{position:relative;flex:none;width:11px;height:11px;margin-top:8px;border:1px solid var(--g-warm);",
"  transform:rotate(45deg);transition:background-color .4s ease,transform .5s ease}",
".qa-btn[aria-expanded=\"true\"] .qa-mark{background:var(--g-lit);transform:rotate(135deg)}",
".qa-t{font-family:var(--serif);font-size:1.26rem;line-height:1.34;color:var(--paper);letter-spacing:.015em}",
".qa-btn:hover .qa-t{color:#FFF3D0}",
".qa-p{max-height:0;overflow:hidden;transition:max-height .55s cubic-bezier(.3,.8,.3,1)}",
".qa-in{padding:0 4px 22px 25px}",
".qa-in p{color:var(--paper-2);font-size:.98rem;max-width:62ch}",

/* chiusura */
".closing{padding-bottom:96px}",
".close-frame{position:relative;border:1px solid var(--line);padding:56px 22px 48px;",
"  background:radial-gradient(100% 80% at 50% 0%,rgba(232,200,122,.09),transparent 62%),rgba(29,31,37,.55)}",
".close-frame::before{content:'';position:absolute;inset:6px;border:1px solid rgba(201,162,74,.1);pointer-events:none}",
".close-h{font-size:clamp(1.9rem,5.6vw,2.9rem);color:var(--paper);max-width:18ch;margin:0 auto}",
".close-t{max-width:48ch;margin:0 auto;color:var(--paper-2)}",
".cta-center{margin-top:30px}",
".contacts{margin:40px auto 0;display:grid;gap:16px;max-width:520px}",
".contacts li{display:flex;flex-direction:column;align-items:center;gap:5px;padding:18px 12px;border:1px solid var(--line);",
"  background:rgba(21,22,26,.45)}",
".ci{color:var(--g-lit);display:block}",
".ci svg{width:20px;height:20px;display:block}",
".cl{font-size:.58rem;letter-spacing:.28em;text-transform:uppercase;color:var(--mute)}",
".contacts a,.cv{font-family:var(--serif);font-size:1.2rem;letter-spacing:.03em;color:var(--paper);text-decoration:none}",
".contacts a:hover{color:#FFF3D0}",

/* footer */
".ftr{padding:52px 0 44px;text-align:center;border-top:1px solid var(--line);position:relative;z-index:1;",
"  background:rgba(16,17,21,.72)}",
".ftr-mono{display:block;font-family:var(--serif);font-size:1.5rem;letter-spacing:.16em;padding-left:.16em;",
"  background-image:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent}",
".ftr-name{font-family:var(--serif);font-size:1.34rem;letter-spacing:.05em;margin-top:10px;color:var(--paper)}",
".ftr-meta{font-size:.62rem;letter-spacing:.28em;text-transform:uppercase;color:var(--mute);margin-top:10px;",
"  display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}",
".ftr-note{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:#8A8375}",

/* barra CTA mobile */
".bar{position:fixed;left:0;right:0;bottom:0;z-index:8000;display:grid;grid-auto-flow:column;",
"  grid-auto-columns:1fr;gap:1px;background:var(--line-2);border-top:1px solid var(--line-2);",
"  padding-bottom:env(safe-area-inset-bottom,0px);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}",
".bar-b{display:flex;align-items:center;justify-content:center;gap:9px;min-height:var(--bar-h);",
"  text-decoration:none;font-size:.68rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;",
"  background:rgba(21,22,26,.94);color:var(--paper)}",
".bar-b svg{width:19px;height:19px;flex:none}",
".bar-wa{color:#1A1509;background-image:var(--gold-text)}",
".bar-tel svg{color:var(--g-lit)}",

/* rivelazioni */
".rv{opacity:0;transform:translateY(22px)}",
".rv.in{opacity:1;transform:none;transition:opacity 1.15s ease,transform 1.15s cubic-bezier(.2,.8,.24,1)}",
".svc-grid .rv.in:nth-child(2),.steps .rv.in:nth-child(2),.rail .rv.in:nth-child(2),.faq .rv.in:nth-child(2){transition-delay:.1s}",
".svc-grid .rv.in:nth-child(3),.steps .rv.in:nth-child(3),.rail .rv.in:nth-child(3),.faq .rv.in:nth-child(3){transition-delay:.2s}",
".svc-grid .rv.in:nth-child(4),.faq .rv.in:nth-child(4){transition-delay:.3s}",

/* breakpoint */
"@media (min-width:620px){",
"  .svc-grid{grid-template-columns:1fr 1fr;gap:20px}",
"  .steps{grid-template-columns:repeat(3,1fr);gap:18px}",
"  .marks{gap:12px 34px}",
"  .contacts{grid-template-columns:1fr 1fr}",
"  .contacts li:only-child,.contacts li:nth-child(3):last-child{grid-column:1/-1}",
"  .zona-a{flex-direction:row;justify-content:center;gap:14px}",
"  .duo{grid-template-columns:1fr 1fr;gap:24px}",
"  .arch-ph{aspect-ratio:1/1;border-radius:50% 50% 3px 3px/40% 40% 3px 3px}",
"  .arch-out{border-radius:50% 50% 3px 3px/39% 39% 3px 3px}",
"}",
"@media (min-width:900px){",
"  body{padding-bottom:0}",
"  .bar{display:none}",
"  .sec{padding:112px 0}",
"  .hero{padding:80px 0 96px}",
"  .rail-outer{overflow:visible}",
"  .rail{width:auto;padding:6px 22px 10px;justify-content:center}",
"  .fcard{width:auto;flex:1 1 0;max-width:340px}",
"  .svc{padding:42px 28px 40px}",
"  .hdr-in{padding:14px 22px}",
"  .hdr-name{font-size:.94rem;max-width:none}",
"  .contacts{max-width:none;grid-template-columns:repeat(3,1fr)}",
"  .contacts li:nth-child(3):last-child{grid-column:auto}",
"  .arch{width:min(100%,660px)}",
"  .arch-ph{aspect-ratio:5/4;border-radius:50% 50% 3px 3px/44% 44% 3px 3px}",
"  .arch-out{border-radius:50% 50% 3px 3px/43% 43% 3px 3px}",
"  .strip-in{padding:88px 22px}",
"}",
"@media (max-width:619px){",
"  .hdr-tel span{display:none}",
"  .hdr-tel{padding:6px}",
"  .marks li{min-width:88px}",
"  .cta .btn{width:100%}",
"}",
"@media (max-width:519px){",
"  .marks{flex-direction:column;gap:16px}",
"  .marks li{min-width:0}",
"  .mk-sep svg{width:9px;height:9px}",
"  .fnum{font-size:7rem}",
"}",
/* ripiego se background-clip:text non e supportato: oro pieno, mai testo invisibile */
"@supports not ((-webkit-background-clip:text) or (background-clip:text)){",
"  .hdr-mono,.crest-mono,.hero-claim em,.mk-v,.step-n,.ftr-mono,",
"  .arch-mono,.pf-cap,.strip-q{background-image:none;color:#E8C87A}",
"  .arch-mono i{background:#C9A24A}",
"}",
"@media (prefers-reduced-motion:reduce){",
"  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;",
"    transition-duration:.001ms!important;scroll-behavior:auto!important}",
"  .rv{opacity:1;transform:none}",
"  .rule span{transform:scaleX(1)}",
"  .crest-sheen{display:none}",
"  .amb-lamp{animation:none}",
"}"
].join('\n');

/* ================================ JS ================================ */
const JS = [
"(function(){",
"  'use strict';",
"  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;",
"",
"  /* L'intro Umbra blocca lo scroll con html{overflow:hidden}. Le entrate partono",
"     solo quando la pagina viene liberata, altrimenti si consumano dietro il velo. */",
"  function whenReady(cb){",
"    var html = document.documentElement;",
"    if (html.style.overflow !== 'hidden') { cb(); return; }",
"    var fired = false;",
"    function go(){ if (fired) return; fired = true; if (mo) mo.disconnect(); clearInterval(iv); cb(); }",
"    var mo = null;",
"    if ('MutationObserver' in window) {",
"      mo = new MutationObserver(function(){ if (html.style.overflow !== 'hidden') go(); });",
"      mo.observe(html, { attributes: true, attributeFilter: ['style'] });",
"    }",
"    var iv = setInterval(function(){ if (html.style.overflow !== 'hidden') go(); }, 200);",
"    setTimeout(go, 12000);",
"  }",
"",
"  var nodes = [].slice.call(document.querySelectorAll('.rv, .rule'));",
"",
"  function startReveals(){",
"    if (!('IntersectionObserver' in window) || reduce) {",
"      nodes.forEach(function(n){ n.classList.add('in'); });",
"      return;",
"    }",
"    var io = new IntersectionObserver(function(entries){",
"      entries.forEach(function(e){",
"        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }",
"      });",
"    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });",
"    nodes.forEach(function(n){ io.observe(n); });",
"  }",
"",
"  /* Luccichio del monogramma: acceso solo mentre il fregio e nel viewport. */",
"  function startSheen(){",
"    var crest = document.getElementById('crest');",
"    if (!crest || reduce) return;",
"    if (!('IntersectionObserver' in window)) { crest.classList.add('live'); return; }",
"    var ioc = new IntersectionObserver(function(entries){",
"      entries.forEach(function(e){ crest.classList.toggle('live', e.isIntersecting); });",
"    }, { threshold: 0.25 });",
"    ioc.observe(crest);",
"  }",
"",
"  whenReady(function(){",
"    startReveals();",
"    startSheen();",
"  });",
"",
"  /* Accordion FAQ. */",
"  var btns = [].slice.call(document.querySelectorAll('.qa-btn'));",
"  function shut(btn){",
"    var p = document.getElementById(btn.getAttribute('aria-controls'));",
"    if (!p) return;",
"    p.style.maxHeight = p.scrollHeight + 'px';",
"    void p.offsetHeight;",
"    p.style.maxHeight = '0px';",
"    btn.setAttribute('aria-expanded', 'false');",
"  }",
"  function show(btn){",
"    var p = document.getElementById(btn.getAttribute('aria-controls'));",
"    if (!p) return;",
"    p.style.maxHeight = p.scrollHeight + 'px';",
"    btn.setAttribute('aria-expanded', 'true');",
"  }",
"  btns.forEach(function(btn){",
"    btn.addEventListener('click', function(){",
"      var isOpen = btn.getAttribute('aria-expanded') === 'true';",
"      btns.forEach(function(o){ if (o !== btn && o.getAttribute('aria-expanded') === 'true') shut(o); });",
"      if (isOpen) { shut(btn); } else { show(btn); }",
"    });",
"  });",
"  var rt;",
"  window.addEventListener('resize', function(){",
"    clearTimeout(rt);",
"    rt = setTimeout(function(){",
"      btns.forEach(function(btn){",
"        if (btn.getAttribute('aria-expanded') === 'true') {",
"          var p = document.getElementById(btn.getAttribute('aria-controls'));",
"          if (p) { p.style.maxHeight = 'none'; var h = p.scrollHeight; p.style.maxHeight = h + 'px'; }",
"        }",
"      });",
"    }, 140);",
"  });",
"",
"  /* Header: fondo piu denso appena la pagina scorre. */",
"  var hdr = document.getElementById('hdr');",
"  var sentinel = document.getElementById('top');",
"  if (hdr && sentinel && 'IntersectionObserver' in window) {",
"    var ioh = new IntersectionObserver(function(entries){",
"      entries.forEach(function(e){",
"        hdr.style.backgroundColor = e.isIntersecting ? 'rgba(21,22,26,.62)' : 'rgba(21,22,26,.93)';",
"      });",
"    }, { rootMargin: '-72px 0px 0px 0px', threshold: 0 });",
"    ioh.observe(sentinel);",
"  }",
"",
"  /* Rete di sicurezza fotografica: se un'immagine non arriva sparisce e con lei il",
"     velo ambra, cosi resta la texture di grafite e oro della cornice. */",
"  [].slice.call(document.querySelectorAll('img[data-photo-slot]')).forEach(function(im){",
"    function fail(){",
"      im.style.display = 'none';",
"      var box = im.parentNode;",
"      while (box && box.classList && !box.classList.contains('ph')) box = box.parentNode;",
"      if (box && box.classList) box.classList.add('no-ph');",
"    }",
"    im.addEventListener('error', fail);",
"    if (im.complete && im.naturalWidth === 0) fail();",
"  });",
"})();"
].join('\n');

window.U.m["aurum"]=module.exports;})();
