window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * MERIDIAN — art direction svizzera, tecnica, chirurgica.
 * Griglia a 12 colonne dichiarata e visibile, hairline da 1px come unico separatore,
 * un solo accento saturo (arancio segnaletico #FF4A1C), due soli pesi tipografici,
 * cifre tabellari ovunque, movimento meccanico da 160ms.
 * Nessun fatto non verificabile: si usano solo i dati presenti in `lead`.
 */

const { esc } = require('../lib/content.js');

// escape + apostrofi tipografici italiani
const t = s => esc(s).replace(/'/g, '’');

/* etichette tecniche delle figure: una per famiglia fotografica */
const CATLAB = {
  berlina: 'Vettura executive',
  van: 'Van premium',
  supercar: 'Vettura sportiva',
  matrimonio: 'Allestimento cerimonia',
  aeroporto: 'Terminal, transfer',
  interni: 'Interni, dettaglio',
  autista: 'Autista, servizio',
  strada: 'Percorrenza, Nord Italia',
  notturno: 'Servizio notturno',
  citta: 'Milano, centro'
};

/**
 * Telaio fotografico: didascalia tecnica in alto, filetto da 1px,
 * poi la foto dentro un contenitore con proporzione fissa (nessun layout shift).
 */
function fig(n, label, ratioLabel, ratioCls, imgHtml, cls, delay) {
  return `
      <figure class="fig${cls ? ' ' + cls : ''}" data-rv${delay ? ` style="transition-delay:${delay}ms"` : ''}>
        <figcaption class="fig-hd"><span><b>Fig. ${n}</b> — ${label}</span><i>${ratioLabel}</i></figcaption>
        <div class="ph ${ratioCls}">${imgHtml}</div>
      </figure>`;
}

function monogram(name) {
  const w = String(name || '').replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
  const a = (w[0] || 'U')[0];
  const b = (w[1] || '')[0] || '';
  return (a + b).toUpperCase();
}

module.exports = function render(lead, c, intro) {
  const name = t(lead.name);
  const city = t(lead.city);
  const hasWa = !!lead.whatsapp;
  const hasRating = !!lead.rating;
  const hasReviews = Number(lead.reviews) > 0;
  const hasAddress = !!lead.address;
  const mono = t(monogram(lead.name));

  /* ---------- scheda tecnica dell'hero: solo dati reali ---------- */
  const specRows = [];
  specRows.push(['Zona operativa', city]);
  if (lead.category) specRows.push(['Categoria', t(lead.category)]);
  if (hasRating) specRows.push(['Valutazione Google', t(lead.rating) + ' <span class="u">/ 5</span>']);
  if (hasReviews) specRows.push(['Recensioni', String(lead.reviews)]);
  specRows.push(['Contatto', t(lead.phoneDisplay)]);
  if (hasAddress) specRows.push(['Indirizzo', t(lead.address)]);
  specRows.push(['Prenotazione', hasWa ? 'WhatsApp / telefono' : 'Telefono']);

  const specHtml = specRows.map((r, i) => `
        <div class="spec-row" data-rv style="transition-delay:${40 + i * 30}ms">
          <span class="spec-k">${t(r[0])}</span>
          <span class="spec-v num">${r[1]}</span>
        </div>`).join('');

  /* ---------- fotografia: ogni figura occupa un numero esatto di colonne ---------- */
  const pics = c.pics;

  // Fig. 01 — banda orizzontale larga esattamente le colonne di destra, sopra la scheda tecnica
  const heroFig = fig('01', t(CATLAB[pics.hero.cat] || 'Vettura'), '16 : 9', 'r-hero',
    pics.hero.tag({ w: 1800, q: 78, eager: true, sizes: '(max-width:820px) 100vw, 44vw' }));

  // Fig. 02 — inserto interni, colonne 6–12 della sezione servizi
  const insFig = fig('02', t(CATLAB.interni), '2 : 1', 'r-ins',
    pics.interni.tag({ w: 1200, q: 78, sizes: '(max-width:820px) 100vw, 58vw' }), 'ins', 60);

  // Fig. 03/04/05 — tre immagini identiche per proporzione, quattro colonne ciascuna
  const trioFigs = c.fleet.map((f, i) => fig(
    '0' + (i + 3),
    t(String(f[0])),
    '4 : 3',
    'r-trio',
    pics.fleet[i].tag({
      w: 900, q: 78,
      alt: String(f[0]) + ' — ' + pics.fleet[i].alt,
      sizes: '(max-width:700px) 100vw, 31vw'
    }),
    '',
    i * 60
  )).join('');

  // Fig. 07 — unica fascia a tutta larghezza, panoramica
  const bandImg = pics.strada.tag({ w: 2000, q: 76, sizes: '100vw' });

  /* ---------- procedura ---------- */
  const steps = hasWa
    ? [
        ['Si scrive', 'Data, orario, punto di partenza e destinazione su WhatsApp. Basta una riga.'],
        ['Si riceve il preventivo', 'Prezzo concordato prima della partenza. Nessun ricalcolo a fine corsa.'],
        ['Si viaggia', 'Vettura e autista confermati. All’orario stabilito, nel punto stabilito.']
      ]
    : [
        ['Si chiama', 'Si comunicano data, orario, punto di partenza e destinazione.'],
        ['Si riceve il preventivo', 'Prezzo concordato prima della partenza. Nessun ricalcolo a fine corsa.'],
        ['Si viaggia', 'Vettura e autista confermati. All’orario stabilito, nel punto stabilito.']
      ];

  const waBtn = (cls, label) => hasWa
    ? `<a class="${cls}" href="${esc(lead.whatsapp)}" target="_blank" rel="noopener">${label}</a>`
    : '';

  const services = c.services.map((s, i) => `
          <article class="srv col-3" data-rv style="transition-delay:${i * 50}ms">
            <span class="rule rule-top" aria-hidden="true"></span>
            <span class="srv-n num">0${i + 1}</span>
            <h3 class="srv-t">${t(s[0])}</h3>
            <p class="srv-x">${t(s[1])}</p>
          </article>`).join('');

  const fleetRows = c.fleet.map((f, i) => `
              <tr data-rv style="transition-delay:${i * 50}ms">
                <td class="num tc-n">0${i + 1}</td>
                <th scope="row" class="tc-name">${t(f[0])}</th>
                <td class="tc-size num">${t(f[1])}</td>
                <td class="tc-note">${t(f[2])}</td>
              </tr>`).join('');

  const faq = c.faq.map((q, i) => `
          <details class="faq" data-rv style="transition-delay:${i * 40}ms">
            <summary>
              <span class="faq-n num">0${i + 1}</span>
              <span class="faq-q">${t(q[0])}</span>
              <span class="faq-s" aria-hidden="true"></span>
            </summary>
            <div class="faq-a"><p>${t(q[1])}</p></div>
          </details>`).join('');

  const stats = c.stats.map((s, i) => `
            <div class="stat" data-rv style="transition-delay:${i * 60}ms">
              <span class="stat-v num" data-count="${esc(s[0])}">${esc(s[0])}</span>
              <span class="stat-k">${t(s[1])}</span>
            </div>`).join('');

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${t(c.metaTitle)}</title>
<meta name="description" content="${t(c.metaDesc)}">
<meta name="theme-color" content="#FAFAF8">
<meta property="og:title" content="${t(c.metaTitle)}">
<meta property="og:description" content="${t(c.metaDesc)}">
<meta property="og:locale" content="it_IT">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap">
<style>
:root{
  --paper:#FAFAF8;
  --ink:#111111;
  --g1:#5C5C58;
  --g2:#6E6E69;
  --hair:#D9D9D3;
  --grid:rgba(17,17,17,.055);
  --acc:#FF4A1C;
  --pad:clamp(18px,4.4vw,56px);
  --t:160ms;
  --line:1px;
  --inset:clamp(12px,1.3vw,20px);
  --plate:#EFEFE9;
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:var(--paper);color:var(--ink);
  font-family:'Inter','Helvetica Neue',Helvetica,Arial,system-ui,sans-serif;
  font-weight:400;font-size:15px;line-height:1.5;
  font-variant-numeric:tabular-nums;font-feature-settings:'tnum' 1,'cv05' 1;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
  padding-top:54px;
}
.num{font-variant-numeric:tabular-nums;font-feature-settings:'tnum' 1}
h1,h2,h3,h4,p,figure{margin:0}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
img,svg{display:block;max-width:100%}

/* ---------- griglia dichiarata ---------- */
.gridlines{
  position:fixed;inset:0;z-index:0;pointer-events:none;
  max-width:1440px;margin:0 auto;padding:0 var(--pad);
  display:grid;grid-template-columns:repeat(12,1fr);
}
.gridlines i{border-left:var(--line) solid var(--grid)}
.gridlines i:last-child{border-right:var(--line) solid var(--grid)}
@media(max-width:820px){
  .gridlines{grid-template-columns:repeat(4,1fr)}
  .gridlines i:nth-child(n+5){display:none}
}

.wrap{position:relative;z-index:1;max-width:1440px;margin:0 auto;padding:0 var(--pad)}
.g{display:grid;grid-template-columns:repeat(12,1fr);gap:0}
.col-3{grid-column:span 3}
.col-4{grid-column:span 4}
.col-5{grid-column:span 5}
.col-6{grid-column:span 6}
.col-7{grid-column:span 7}
.col-8{grid-column:span 8}
.pr{padding-right:28px}
.pl{padding-left:28px}

/* ---------- header ---------- */
.hdr{
  position:fixed;top:0;left:0;right:0;z-index:40;height:54px;
  background:rgba(250,250,248,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  border-bottom:var(--line) solid var(--hair);
}
.hdr-in{max-width:1440px;margin:0 auto;padding:0 var(--pad);height:100%;
  display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:12px;min-width:0}
.mono{
  width:28px;height:28px;flex:0 0 28px;border:var(--line) solid var(--ink);
  display:grid;place-items:center;font-size:11px;font-weight:600;letter-spacing:.04em
}
.brand-n{font-size:12.5px;font-weight:600;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdr-r{display:flex;align-items:center;gap:18px}
.clock{display:flex;align-items:center;gap:9px;white-space:nowrap}
.dot{width:6px;height:6px;background:var(--acc);flex:0 0 6px;animation:blink 2s steps(1,end) infinite}
@keyframes blink{0%,60%{opacity:1}61%,100%{opacity:.25}}
.clock-l{font-size:9.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--g1)}
.clock-t{font-size:12.5px;font-weight:600;letter-spacing:.06em}
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:34px;padding:0 16px;font-size:11.5px;font-weight:600;
  letter-spacing:.16em;text-transform:uppercase;border:var(--line) solid var(--ink);
  transition:background var(--t) linear,color var(--t) linear;
}
.btn-acc{background:var(--acc);border-color:var(--acc);color:#111}
.btn-acc:hover{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.btn-out:hover{background:var(--ink);color:var(--paper)}
.btn-lg{height:46px;padding:0 24px;font-size:12px}
@media(max-width:820px){.hdr .btn{display:none}}

/* ---------- hairline / reveal ---------- */
.rule{display:block;height:var(--line);background:var(--hair);transform:scaleX(0);transform-origin:left center;
  transition:transform 320ms linear}
.is-in .rule,.rule.is-in{transform:none}
[data-rv]{opacity:0;transform:translate3d(0,7px,0);transition:opacity var(--t) linear,transform var(--t) ease-out}
[data-rv].is-in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){
  [data-rv]{opacity:1;transform:none;transition:none}
  .rule{transform:none;transition:none}
  .dot{animation:none}
}

/* ---------- etichette di sezione ---------- */
/* solo il fondo: il padding orizzontale di .wrap tiene le sezioni sulla griglia */
.sec{padding-bottom:clamp(56px,7vw,104px)}
.sec-hd{padding:clamp(40px,5vw,72px) 0 26px;display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.sec-n{font-size:11px;font-weight:600;letter-spacing:.18em}
.sec-l{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--g1)}
.sec-d{margin-left:auto;font-size:11.5px;color:var(--g2);letter-spacing:.04em}
@media(max-width:820px){.sec-d{margin-left:0;width:100%}}

/* ---------- hero ---------- */
.hero{padding-top:clamp(30px,5vw,58px)}
.eyebrow{font-size:11px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--g1);
  display:flex;align-items:baseline;gap:12px}
.eyebrow b{color:var(--ink);font-weight:600}
h1.h1{
  font-size:clamp(2rem,5.9vw,4.5rem);font-weight:600;line-height:.99;letter-spacing:-.035em;
  margin:20px 0 0;text-wrap:balance;
}
.hero-sub{margin-top:18px;font-size:clamp(1.02rem,2.1vw,1.5rem);line-height:1.24;letter-spacing:-.012em;color:var(--g1)}
.hero-sub b{color:var(--ink);font-weight:400}
.lede{margin-top:22px;max-width:44ch;color:var(--g1);font-size:14.5px;line-height:1.62}
.cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
.hero-note{margin-top:16px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--g2)}
/* indice: ancora il piede della colonna sinistra al piede della scheda tecnica */
.hero-left{display:flex;flex-direction:column}
/* 3fr + 4fr su una cella da 7 colonne: i filetti cadono sulle linee 1, 4 e 7 */
.idx{margin-top:auto;margin-right:-28px;padding-top:clamp(34px,4.4vw,62px);
  display:grid;grid-template-columns:3fr 4fr;column-gap:0}
.idx a:nth-of-type(even){padding-left:20px}
.idx-l{grid-column:1/-1;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
  color:var(--g2);border-top:var(--line) solid var(--ink);padding:9px 0 3px}
.idx a{display:flex;gap:12px;align-items:baseline;padding:10px 0;
  border-top:var(--line) solid var(--hair);font-size:11px;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;transition:color var(--t) linear}
.idx a i{font-style:normal;color:var(--g2)}
.idx a:hover{color:var(--acc)}
@media(max-width:820px){.idx{display:none}}

.spec{border-top:var(--line) solid var(--ink);margin-top:0}
.spec-hd{display:flex;justify-content:space-between;align-items:baseline;padding:10px var(--inset) 12px 0}
.spec-hd span{font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.spec-hd i{font-style:normal;font-size:10.5px;letter-spacing:.16em;color:var(--g2)}
/* il filetto arriva alla linea di griglia, il valore si ferma un gutter prima */
.spec-row{display:flex;justify-content:space-between;align-items:baseline;gap:16px;
  padding:11px var(--inset) 11px 0;border-top:var(--line) solid var(--hair)}
.spec-k{font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--g1);flex:0 0 auto}
.spec-v{font-size:13.5px;text-align:right;letter-spacing:.01em;min-width:0;overflow-wrap:anywhere}
.spec-v .u{color:var(--g2)}

/* ---------- fotografia: telaio, didascalia, filetto ---------- */
.fig{border-top:var(--line) solid var(--ink)}
.fig-hd{display:flex;align-items:baseline;justify-content:space-between;gap:12px;
  padding:9px var(--inset) 11px 0;font-size:10px;font-weight:600;letter-spacing:.2em;
  text-transform:uppercase;color:var(--g1)}
.fig-hd b{color:var(--ink);font-weight:600}
.fig-hd i{font-style:normal;letter-spacing:.16em;color:var(--g2);white-space:nowrap}
.ph{position:relative;display:block;overflow:hidden;
  background:
    repeating-linear-gradient(135deg,rgba(17,17,17,.05) 0 1px,rgba(17,17,17,0) 1px 11px),
    linear-gradient(180deg,#F2F2ED 0%,var(--plate) 55%,#E3E3DB 100%);
  border:var(--line) solid var(--hair)}
/* crocino di centratura: se la foto non arriva resta una piastra tecnica, mai un buco bianco */
.ph::before{content:"";position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;
  background:
    linear-gradient(var(--g2),var(--g2)) center/100% 1px no-repeat,
    linear-gradient(var(--g2),var(--g2)) center/1px 100% no-repeat;
  opacity:.42}
/* crocini d'angolo: la piastra resta una figura tecnica anche senza foto */
.ph::after{content:"";position:absolute;inset:12px;pointer-events:none;opacity:.55;
  background:
    linear-gradient(var(--g2),var(--g2)) left top/14px 1px no-repeat,
    linear-gradient(var(--g2),var(--g2)) left top/1px 14px no-repeat,
    linear-gradient(var(--g2),var(--g2)) right top/14px 1px no-repeat,
    linear-gradient(var(--g2),var(--g2)) right top/1px 14px no-repeat,
    linear-gradient(var(--g2),var(--g2)) left bottom/14px 1px no-repeat,
    linear-gradient(var(--g2),var(--g2)) left bottom/1px 14px no-repeat,
    linear-gradient(var(--g2),var(--g2)) right bottom/14px 1px no-repeat,
    linear-gradient(var(--g2),var(--g2)) right bottom/1px 14px no-repeat}
.ph img{position:relative;z-index:1;width:100%;height:100%;object-fit:cover;
  filter:saturate(.86) contrast(1.03) brightness(1.03)}
.r-hero{aspect-ratio:16/9}
.r-trio{aspect-ratio:4/3}
.r-ins{aspect-ratio:2/1}
.r-band{aspect-ratio:21/9;border-left:0;border-right:0}

/* tre foto di flotta: gap zero, i bordi cadono sulle linee 4 e 8 della griglia */
.trio{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,1fr)}
.trio .fig+.fig .ph{border-left:0}

/* inserto interni nella sezione servizi */
.ins{grid-column:6/-1;margin-top:clamp(34px,4vw,58px)}
/* la nota parte dallo stesso filetto della didascalia: una sola linea attraversa le 12 colonne */
.ins-note{grid-column:1/5;align-self:start;margin-top:clamp(34px,4vw,58px);
  border-top:var(--line) solid var(--ink);padding:9px 28px 0 0;
  font-size:11px;line-height:1.7;color:var(--g2);letter-spacing:.06em}

/* fascia panoramica a tutta larghezza */
.fascia{margin-top:clamp(44px,6vw,88px);border-top:var(--line) solid var(--ink)}
.fascia-hd{display:flex;align-items:baseline;justify-content:space-between;gap:14px;
  padding-top:10px;padding-bottom:12px;
  font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--g1)}
.fascia-hd b{color:var(--ink);font-weight:600}
.fascia-hd i{font-style:normal;letter-spacing:.16em;color:var(--g2);white-space:nowrap}

/* ---------- blueprint ---------- */
.bp{margin-top:clamp(40px,5vw,70px);border-top:var(--line) solid var(--ink);padding-top:14px}
.bp-hd{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;
  font-size:10.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--g1)}
.bp-hd b{color:var(--ink);font-weight:600}
.bp-box{margin-top:10px;padding:6px 0 0}
.bp svg{width:100%;height:auto}
.bp svg path,.bp svg circle,.zone-fig svg path,.zone-fig svg circle,.zone-fig svg rect{vector-effect:non-scaling-stroke}
.bp .dr{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 900ms linear}
.bp.is-in .dr{stroke-dashoffset:0}
@media(prefers-reduced-motion:reduce){.bp .dr{stroke-dashoffset:0;transition:none}}
.bp-cap{margin-top:8px;font-size:11px;color:var(--g2);letter-spacing:.06em;
  border-top:var(--line) solid var(--hair);padding-top:9px}
.bp-scroll{display:none;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--g2);margin-top:8px}
@media(max-width:1024px){
  .bp-box{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .bp-box svg{min-width:900px}
  .bp svg text{font-size:18px}
  .bp-scroll{display:block}
}

/* ---------- fascia rilevazioni ---------- */
.band{border-top:var(--line) solid var(--ink);border-bottom:var(--line) solid var(--ink);margin-top:clamp(44px,5vw,72px)}
.band-in{display:grid;grid-template-columns:repeat(12,1fr)}
.band-l{grid-column:span 6;padding:22px 28px 22px 0;border-right:var(--line) solid var(--hair)}
.band-r{grid-column:span 6;display:grid;grid-template-columns:repeat(3,1fr)}
.proof-t{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.proof-x{margin-top:7px;font-size:13.5px;color:var(--g1)}
.stat{padding:22px 20px;border-left:var(--line) solid var(--hair)}
.stat:first-child{border-left:0}
.stat-v{display:block;font-size:clamp(1.7rem,3.4vw,2.6rem);font-weight:600;letter-spacing:-.035em;line-height:1}
.stat-k{display:block;margin-top:8px;font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--g1)}

/* ---------- servizi ---------- */
.srv{padding:0 22px 0 0}
.srv .rule-top{margin-bottom:14px;background:var(--ink)}
.srv-n{font-size:10.5px;font-weight:600;letter-spacing:.18em;color:var(--ink)}
.srv-t{margin-top:9px;font-size:16px;font-weight:600;letter-spacing:-.012em}
.srv-x{margin-top:9px;font-size:13.5px;line-height:1.6;color:var(--g1)}

/* ---------- tabella flotta ---------- */
.tbl{overflow-x:auto;-webkit-overflow-scrolling:touch;border-top:var(--line) solid var(--ink)}
table{width:100%;min-width:640px;border-collapse:collapse;text-align:left}
th,td{padding:15px 18px 15px 0;vertical-align:top;font-weight:400}
.tbl thead th{font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--g1);
  padding-top:11px;padding-bottom:11px;border-bottom:var(--line) solid var(--hair)}
tbody tr{border-bottom:var(--line) solid var(--hair)}
tbody tr:last-child{border-bottom:0}
.tc-n{width:52px;color:var(--g2);font-size:11.5px;padding-top:18px}
.tc-name{width:26%;font-size:15px;font-weight:600;letter-spacing:-.01em}
.tc-size{width:20%;font-size:13px;color:var(--g1);white-space:nowrap}
.tc-note{font-size:13.5px;color:var(--g1);line-height:1.55}
.tbl-note{margin-top:12px;font-size:11px;color:var(--g2);letter-spacing:.06em}

/* ---------- procedura ---------- */
.step{padding:0 26px 0 0}
.step .rule-top{margin-bottom:14px;background:var(--ink)}
.step-n{font-size:10.5px;font-weight:600;letter-spacing:.18em;color:var(--g2)}
.step-t{margin-top:9px;font-size:17px;font-weight:600;letter-spacing:-.015em}
.step-x{margin-top:9px;font-size:13.5px;line-height:1.6;color:var(--g1)}

/* ---------- zona ---------- */
.zone-t{font-size:clamp(1.5rem,3.4vw,2.5rem);font-weight:600;letter-spacing:-.03em;line-height:1.02}
.zone-x{margin-top:16px;max-width:40ch;font-size:13.5px;line-height:1.6;color:var(--g1)}
.zone-fig{border:var(--line) solid var(--hair);padding:14px}
.zone-fig svg{width:100%;height:auto}
@media(max-width:820px){.zone-fig svg text{font-size:20px}}
.zone-cap{margin-top:9px;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--g2)}

/* ---------- faq ---------- */
.faq{border-top:var(--line) solid var(--hair)}
.faq:first-of-type{border-top:var(--line) solid var(--ink)}
.faq summary{list-style:none;cursor:pointer;display:flex;align-items:baseline;gap:16px;padding:16px 0}
.faq summary::-webkit-details-marker{display:none}
.faq summary:hover .faq-q{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
.faq summary:hover .faq-s{color:var(--acc)}
.faq-n{font-size:10.5px;font-weight:600;letter-spacing:.18em;color:var(--g2);flex:0 0 auto}
.faq-q{font-size:15px;font-weight:600;letter-spacing:-.01em;flex:1 1 auto}
.faq-s{flex:0 0 auto;width:11px;height:11px;position:relative;align-self:center}
.faq-s::before,.faq-s::after{content:"";position:absolute;background:currentColor;transition:transform var(--t) linear}
.faq-s::before{left:0;top:5px;width:11px;height:1px}
.faq-s::after{left:5px;top:0;width:1px;height:11px}
.faq[open] .faq-s::after{transform:scaleY(0)}
.faq-a{padding:0 0 18px 0}
.faq-a p{max-width:62ch;font-size:13.5px;line-height:1.62;color:var(--g1);padding-left:35px}
@media(max-width:640px){.faq-a p{padding-left:0}}

/* ---------- contatti ---------- */
.ct{border-top:var(--line) solid var(--ink);padding-top:26px}
.ct-h{font-size:clamp(1.5rem,3.6vw,2.6rem);font-weight:600;letter-spacing:-.032em;line-height:1.02;max-width:14ch}
.ct-row{display:flex;justify-content:space-between;align-items:baseline;gap:18px;
  padding:13px var(--inset) 13px 0;border-bottom:var(--line) solid var(--hair)}
.ct-k{font-size:10.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--g1)}
.ct-v{font-size:14px;text-align:right}
.ct-v a{border-bottom:var(--line) solid var(--hair);transition:border-color var(--t) linear}
.ct-v a:hover{border-color:var(--acc)}

/* ---------- footer ---------- */
.ftr{border-top:var(--line) solid var(--ink);padding-top:26px;padding-bottom:118px}
.ftr-in{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;
  font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--g2)}
.ftr-in b{color:var(--ink);font-weight:600}
@media(min-width:821px){.ftr{padding-bottom:34px}}

/* ---------- barra mobile ---------- */
.bar{position:fixed;left:0;right:0;bottom:0;z-index:50;display:none;
  border-top:var(--line) solid var(--ink);background:var(--paper);
  padding-bottom:env(safe-area-inset-bottom)}
.bar-in{display:grid;grid-template-columns:1fr 1fr}
.bar-in.one{grid-template-columns:1fr}
.bar a{height:56px;display:flex;align-items:center;justify-content:center;gap:8px;
  font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
.bar .wa{background:var(--acc);color:#111}
.bar .tl{border-left:var(--line) solid var(--ink)}
.bar-in.one .tl{border-left:0}
@media(max-width:820px){.bar{display:block}}

/* ---------- responsive ---------- */
@media(max-width:1080px){
  .srv{grid-column:span 6}
  .ins{grid-column:4/-1}
  .ins-note{grid-column:1/4}
}
@media(max-width:820px){
  .ins,.ins-note{grid-column:1/-1}
  .ins-note{padding-right:0;margin-top:clamp(28px,4vw,46px)}
  .ins{margin-top:20px}
  .r-ins{aspect-ratio:16/9}
}
@media(max-width:700px){
  .trio{grid-template-columns:1fr}
  .trio .fig+.fig{margin-top:24px}
  .trio .fig+.fig .ph{border-left:var(--line) solid var(--hair)}
  .r-trio{aspect-ratio:16/9}
}
@media(max-width:820px){
  body{font-size:15px}
  .g > *{grid-column:1/-1}
  .pr,.pl,.srv,.step{padding-right:0;padding-left:0}
  .hero-right{margin-top:38px}
  .band-in{display:block}
  .band-l{padding:20px 0;border-right:0;border-bottom:var(--line) solid var(--hair)}
  .band-r{display:grid;grid-template-columns:repeat(3,1fr)}
  .stat{padding:18px 10px 18px 12px}
  .stat:first-child{padding-left:0}
  .srv{margin-top:26px}
  .step{margin-top:26px}
  .zone-fig{margin-top:28px}
}
@media(max-width:560px){
  .clock-l{font-size:8.5px;letter-spacing:.12em}
  .clock-t{font-size:11.5px}
  .brand-n{font-size:11.5px}
}
@media(max-width:420px){
  .band-r{grid-template-columns:1fr 1fr}
  .stat:nth-child(3){grid-column:1/-1;border-left:0;padding-left:0;border-top:var(--line) solid var(--hair)}
}
</style>
</head>
<body>

<div class="gridlines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>

<header class="hdr">
  <div class="hdr-in">
    <div class="brand">
      <span class="mono" aria-hidden="true">${mono}</span>
      <span class="brand-n">${name}</span>
    </div>
    <div class="hdr-r">
      <div class="clock">
        <span class="dot" aria-hidden="true"></span>
        <span class="clock-l">Operativo ora</span>
        <span class="clock-t num" id="mClock">--:--:--</span>
      </div>
      ${waBtn('btn btn-acc', 'WhatsApp')}
    </div>
  </div>
</header>

<main>

  <!-- ============ HERO ============ -->
  <section class="wrap hero">
    <div class="g">
      <div class="col-7 pr hero-left">
        <p class="eyebrow" data-rv><span class="num">00</span> — <b>${t(c.kicker)}</b></p>
        <h1 class="h1" data-rv style="transition-delay:60ms">${name}</h1>
        <p class="hero-sub" data-rv style="transition-delay:110ms">${t(c.heroA)} <b>${t(c.heroB)}</b>.</p>
        <p class="lede" data-rv style="transition-delay:150ms">${t(c.lede)}</p>
        <div class="cta" data-rv style="transition-delay:190ms">
          ${waBtn('btn btn-acc btn-lg', 'Preventivo su WhatsApp')}
          <a class="btn btn-out btn-lg" href="tel:${esc(lead.tel)}">Telefono ${t(lead.phoneDisplay)}</a>
        </div>
        <p class="hero-note" data-rv style="transition-delay:230ms">Prezzo concordato prima della partenza</p>
        <nav class="idx" aria-label="Indice della pagina" data-rv style="transition-delay:270ms">
          <span class="idx-l">Indice</span>
          <a href="#servizi"><i class="num">01</i> Servizi</a>
          <a href="#flotta"><i class="num">02</i> Flotta</a>
          <a href="#procedura"><i class="num">03</i> Procedura</a>
          <a href="#zona"><i class="num">04</i> Zona operativa</a>
          <a href="#domande"><i class="num">05</i> Domande</a>
          <a href="#contatto"><i class="num">06</i> Contatto</a>
        </nav>
      </div>

      <div class="col-5 hero-right">
        ${heroFig}
        <div class="spec" style="margin-top:clamp(26px,3vw,40px)">
          <div class="spec-hd">
            <span>Scheda tecnica</span><i class="num">REV. 01</i>
          </div>
          ${specHtml}
        </div>
      </div>
    </div>


    <!-- fascia rilevazioni -->
    <div class="band" data-rv>
      <div class="band-in">
        <div class="band-l">
          <p class="proof-t">${t(c.proof[0])}</p>
          <p class="proof-x">${t(c.proof[1])}</p>
        </div>
        <div class="band-r">
${stats}
        </div>
      </div>
    </div>
  </section>

  <!-- ============ 01 SERVIZI ============ -->
  <section class="wrap sec" id="servizi">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">01</span><span class="sec-l">Servizi</span>
      <span class="sec-d">Quattro voci, su preventivo</span>
    </div>
    <div class="g">
${services}
      <p class="ins-note" data-rv>Dotazioni e allestimenti si confermano insieme al preventivo, prima della partenza.</p>
${insFig}
    </div>
  </section>

  <!-- ============ 02 FLOTTA ============ -->
  <section class="wrap sec" id="flotta">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">02</span><span class="sec-l">Flotta</span>
      <span class="sec-d">Disponibilità confermata in fase di preventivo</span>
    </div>
    <div class="g">
      <div class="trio">
${trioFigs}
      </div>
    </div>
    <div class="tbl" style="margin-top:clamp(30px,3.4vw,50px)">
      <table>
        <thead>
          <tr>
            <th scope="col" class="tc-n">N.</th>
            <th scope="col" class="tc-name">Vettura</th>
            <th scope="col" class="tc-size">Capienza</th>
            <th scope="col" class="tc-note">Note</th>
          </tr>
        </thead>
        <tbody>
${fleetRows}
        </tbody>
      </table>
    </div>
    <p class="tbl-note">Modelli e allestimenti indicati come riferimento di categoria.</p>

    <!-- disegno tecnico: dopo le fotografie, cosi foto e schema si parlano -->
    <figure class="bp" data-rv>
      <figcaption class="bp-hd">
        <span><b>Fig. 06</b> — Vettura, vista laterale</span>
        <span>Tratto 1 px · quote indicative</span>
      </figcaption>
      <div class="bp-box">
        <svg viewBox="0 0 1240 512" role="img" aria-label="Disegno tecnico schematico di una vettura in vista laterale, con linee di quota indicative">
          <g fill="none" stroke="#111" stroke-width="1.1" stroke-linecap="square" stroke-linejoin="round">
            <!-- crocini di allineamento -->
            <g stroke="#6E6E69" stroke-width="1">
              <path d="M30 34h18M39 25v18"/><path d="M1210 34h-18M1201 25v18"/>
              <path d="M30 478h18M39 469v18"/><path d="M1210 478h-18M1201 469v18"/>
            </g>
            <!-- linea di terra -->
            <path class="dr" pathLength="1" d="M60 380H1200" stroke="#D9D9D3"/>
            <!-- carrozzeria -->
            <path class="dr" pathLength="1" d="M132 320V286c0-24 8-34 36-40l68-8 64-6 86-6 150-100 254-6 110 106 110 6 62 12c20 6 24 18 24 40v34H970a70 70 0 0 0-140 0H370a70 70 0 0 0-140 0H132Z"/>
            <!-- vetratura -->
            <path class="dr" pathLength="1" stroke="#6E6E69" d="M404 218 542 138 782 132 880 212Z"/>
            <!-- ruote -->
            <circle class="dr" pathLength="1" cx="300" cy="318" r="62"/>
            <circle class="dr" pathLength="1" cx="300" cy="318" r="26" stroke="#6E6E69"/>
            <circle class="dr" pathLength="1" cx="900" cy="318" r="62"/>
            <circle class="dr" pathLength="1" cx="900" cy="318" r="26" stroke="#6E6E69"/>
            <!-- dettagli: montante, porte, maniglie, fari -->
            <g class="dr" pathLength="1" stroke="#6E6E69">
              <path d="M628 134V222M386 226H900"/>
              <path d="M486 226V318M628 226V318M804 226V314"/>
              <path d="M528 262h48M684 262h48"/>
              <path d="M138 290h46M1038 286h44"/>
            </g>
            <!-- quota: passo -->
            <g stroke="#111" stroke-width="1">
              <path class="dr" pathLength="1" d="M300 388v42M900 388v42"/>
              <path class="dr" pathLength="1" d="M300 424h600M300 424l14-6M300 424l14 6M900 424l-14-6M900 424l-14 6"/>
            </g>
            <!-- quota: lunghezza -->
            <g stroke="#111" stroke-width="1">
              <path class="dr" pathLength="1" d="M132 388v86M1086 388v86"/>
              <path class="dr" pathLength="1" d="M132 468h954M132 468l14-6M132 468l14 6M1086 468l-14-6M1086 468l-14 6"/>
            </g>
            <!-- quota: altezza -->
            <g stroke="#111" stroke-width="1">
              <path class="dr" pathLength="1" d="M1098 120h60M1098 380h60"/>
              <path class="dr" pathLength="1" d="M1150 120v260M1150 120l-6 14M1150 120l6 14M1150 380l-6-14M1150 380l6-14"/>
            </g>
          </g>
          <g fill="#5C5C58" font-family="Inter,Helvetica,Arial,sans-serif" font-size="15" letter-spacing="1.6">
            <text x="600" y="414" text-anchor="middle">PASSO — INDICATIVO</text>
            <text x="609" y="458" text-anchor="middle">LUNGHEZZA — INDICATIVO</text>
            <text x="1168" y="240" transform="rotate(-90 1168 240)" text-anchor="middle">ALTEZZA — INDICATIVO</text>
            <text x="60" y="76" font-size="14">SCHEMA / NON IN SCALA</text>
          </g>
        </svg>
      </div>
      <p class="bp-scroll">Scorrere il disegno →</p>
      <p class="bp-cap">Disegno schematico, tracciato a 1 px sulla stessa griglia delle fotografie. Le proporzioni sono indicative e non descrivono un veicolo specifico.</p>
    </figure>
  </section>

  <!-- ============ 03 PROCEDURA ============ -->
  <section class="wrap sec" id="procedura">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">03</span><span class="sec-l">Procedura</span>
      <span class="sec-d">Tre passaggi</span>
    </div>
    <div class="g">
${steps.map((s, i) => `
      <article class="step col-4" data-rv style="transition-delay:${i * 60}ms">
        <span class="rule rule-top" aria-hidden="true"></span>
        <span class="step-n num">FASE 0${i + 1}</span>
        <h3 class="step-t">${t(s[0])}</h3>
        <p class="step-x">${t(s[1])}</p>
      </article>`).join('')}
    </div>
  </section>

  <!-- ============ FASCIA PANORAMICA — unica a tutta larghezza ============ -->
  <section class="fascia" aria-label="Percorrenza">
    <div class="wrap fascia-hd" data-rv>
      <span><b>Fig. 07</b> — ${t(CATLAB.strada)}</span>
      <i>21 : 9</i>
    </div>
    <div class="ph r-band">${bandImg}</div>
  </section>

  <!-- ============ 04 ZONA OPERATIVA ============ -->
  <section class="wrap sec" id="zona">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">04</span><span class="sec-l">Zona operativa</span>
      <span class="sec-d">Base e raggio di servizio</span>
    </div>
    <div class="g">
      <div class="col-6 pr" data-rv>
        <h2 class="zone-t">${city}</h2>
        <p class="zone-x">Partenze da ${city} e dalle località vicine. Le destinazioni, anche fuori regione o all’estero, si concordano insieme al preventivo.</p>
        <div class="spec" style="margin-top:26px">
          <div class="spec-row"><span class="spec-k">Base</span><span class="spec-v num">${city}</span></div>
          ${hasAddress ? `<div class="spec-row"><span class="spec-k">Indirizzo</span><span class="spec-v num">${t(lead.address)}</span></div>` : ''}
          <div class="spec-row"><span class="spec-k">Riferimento</span><span class="spec-v num">${t(lead.phoneDisplay)}</span></div>
        </div>
      </div>
      <div class="col-6 pl" data-rv style="transition-delay:80ms">
        <div class="zone-fig">
          <svg viewBox="0 0 520 340" role="img" aria-label="Schema di orientamento: reticolo tecnico con al centro la base operativa di ${city}">
            <g fill="none" stroke="#D9D9D3" stroke-width="1">
              <path d="M0 60h520M0 120h520M0 180h520M0 240h520M0 300h520"/>
              <path d="M60 0v340M120 0v340M180 0v340M240 0v340M300 0v340M360 0v340M420 0v340M480 0v340"/>
            </g>
            <g fill="none" stroke="#8E8E89" stroke-width="1" stroke-dasharray="3 5">
              <circle cx="260" cy="170" r="52"/><circle cx="260" cy="170" r="104"/><circle cx="260" cy="170" r="156"/>
            </g>
            <g fill="none" stroke="#111" stroke-width="1.1">
              <path d="M260 118v104M208 170h104"/>
              <rect x="252" y="162" width="16" height="16"/>
            </g>
            <g fill="#5C5C58" font-family="Inter,Helvetica,Arial,sans-serif" font-size="12" letter-spacing="1.4">
              <text x="284" y="152">${city.toUpperCase()}</text>
              <text x="16" y="26">SCHEMA DI ORIENTAMENTO</text>
              <text x="504" y="326" text-anchor="end">NON IN SCALA</text>
            </g>
          </svg>
        </div>
        <p class="zone-cap">Fig. 08 — Schema, non una mappa. Nessuna distanza rappresentata.</p>
      </div>
    </div>
  </section>

  <!-- ============ 05 DOMANDE ============ -->
  <section class="wrap sec" id="domande">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">05</span><span class="sec-l">Domande frequenti</span>
      <span class="sec-d">Quattro risposte</span>
    </div>
    <div class="g">
      <div class="col-8">
${faq}
      </div>
    </div>
  </section>

  <!-- ============ 06 CONTATTO ============ -->
  <section class="wrap sec" id="contatto">
    <div class="sec-hd" data-rv>
      <span class="sec-n num">06</span><span class="sec-l">Contatto</span>
      <span class="sec-d">Risposta diretta</span>
    </div>
    <div class="g">
      <div class="col-6 pr" data-rv>
        <h2 class="ct-h">${hasWa ? 'Si scrive, si parte.' : 'Si chiama, si parte.'}</h2>
        <div class="cta">
          ${waBtn('btn btn-acc btn-lg', 'Scrivere su WhatsApp')}
          <a class="btn btn-out btn-lg" href="tel:${esc(lead.tel)}">Chiamare</a>
        </div>
      </div>
      <div class="col-6 pl" data-rv style="transition-delay:80ms">
        <div class="ct">
          ${hasWa ? `<div class="ct-row"><span class="ct-k">WhatsApp</span><span class="ct-v"><a href="${esc(lead.whatsapp)}" target="_blank" rel="noopener">${t(lead.phoneDisplay)}</a></span></div>` : ''}
          <div class="ct-row"><span class="ct-k">Telefono</span><span class="ct-v num"><a href="tel:${esc(lead.tel)}">${t(lead.phoneDisplay)}</a></span></div>
          ${hasAddress ? `<div class="ct-row"><span class="ct-k">Indirizzo</span><span class="ct-v">${t(lead.address)}, ${city}</span></div>` : `<div class="ct-row"><span class="ct-k">Zona</span><span class="ct-v">${city}</span></div>`}
          ${hasRating ? `<div class="ct-row"><span class="ct-k">Google</span><span class="ct-v num">${t(lead.rating)} / 5${hasReviews ? ' · ' + lead.reviews + ' recensioni' : ''}</span></div>` : ''}
        </div>
      </div>
    </div>
  </section>

</main>

<footer class="wrap ftr">
  <div class="ftr-in">
    <span><b>${name}</b> — ${city}</span>
    <span>${hasRating ? 'Valutazione e recensioni: fonte Google' : 'Contatti verificati'}</span>
    <span>Anteprima realizzata da <b>Umbra</b></span>
  </div>
</footer>

<nav class="bar" aria-label="Contatti rapidi">
  <div class="bar-in${hasWa ? '' : ' one'}">
    ${hasWa ? `<a class="wa" href="${esc(lead.whatsapp)}" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ${name}">WhatsApp</a>` : ''}
    <a class="tl" href="tel:${esc(lead.tel)}" aria-label="Chiamare ${name} al ${t(lead.phoneDisplay)}">Telefono</a>
  </div>
</nav>

<script>
(function(){
  var d = document;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- orologio: ora corrente, fuso italiano --- */
  var clock = d.getElementById('mClock');
  function pad(v){ return v < 10 ? '0' + v : '' + v; }
  function tick(){
    if (!clock || d.hidden) return;
    var s;
    try {
      s = new Intl.DateTimeFormat('it-IT', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Europe/Rome'
      }).format(new Date());
    } catch (e) {
      var n = new Date();
      s = pad(n.getHours()) + ':' + pad(n.getMinutes()) + ':' + pad(n.getSeconds());
    }
    clock.textContent = s.replace(/\\u2236/g, ':');
  }
  tick();
  setInterval(tick, 1000);
  d.addEventListener('visibilitychange', tick);

  /* --- comparse: traslazione secca --- */
  var nodes = [].slice.call(d.querySelectorAll('[data-rv]'));
  if (reduced || !('IntersectionObserver' in window)) {
    nodes.forEach(function(n){ n.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function(n){ io.observe(n); });
  }

  /* --- blueprint: tratto che si disegna --- */
  var bp = d.querySelector('.bp');
  if (bp) {
    if (reduced || !('IntersectionObserver' in window)) {
      bp.classList.add('is-in');
    } else {
      var bo = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting) { e.target.classList.add('is-in'); bo.unobserve(e.target); }
        });
      }, { threshold: 0.2 });
      bo.observe(bp);
    }
  }

  /* --- contatori che scattano --- */
  function fmt(v, dec){ var s = v.toFixed(dec); return dec ? s.replace('.', ',') : s; }
  function run(node){
    var raw = node.getAttribute('data-count');
    var m = /^(\\d+)(?:,(\\d+))?$/.exec(raw);
    if (!m) { node.textContent = raw; return; }
    var dec = m[2] ? m[2].length : 0;
    var target = parseFloat(raw.replace(',', '.'));
    var t0 = 0, dur = 820;
    function frame(ts){
      if (!t0) t0 = ts;
      var k = (ts - t0) / dur;
      if (k >= 1) { node.textContent = raw; return; }
      node.textContent = fmt(target * k, dec);
      requestAnimationFrame(frame);
    }
    node.textContent = fmt(0, dec);
    requestAnimationFrame(frame);
  }
  var counters = [].slice.call(d.querySelectorAll('[data-count]'));
  if (reduced || !('IntersectionObserver' in window)) {
    counters.forEach(function(n){ n.textContent = n.getAttribute('data-count'); });
  } else {
    var co = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function(n){ co.observe(n); });
  }

  /* --- rete di sicurezza fotografica: se una foto non arriva resta la piastra tecnica --- */
  [].slice.call(d.querySelectorAll('img[data-photo-slot]')).forEach(function(im){
    im.addEventListener('error', function(){ im.style.display = 'none'; });
    if (im.complete && im.naturalWidth === 0) im.style.display = 'none';
  });

  /* --- accordion: una sola voce aperta --- */
  var faqs = [].slice.call(d.querySelectorAll('details.faq'));
  faqs.forEach(function(f){
    f.addEventListener('toggle', function(){
      if (!f.open) return;
      faqs.forEach(function(o){ if (o !== f) o.open = false; });
    });
  });
})();
</script>

${intro}
</body>
</html>`;
};

window.U.m["meridian"]=module.exports;})();
