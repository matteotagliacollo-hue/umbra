window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Tema "Velluto" — bordeaux, seta, cerimonia.
 * Riferimento: un invito di nozze inciso a caldo e un teatro d'opera.
 * Pensato per matrimoni, limousine e cerimonie: deve emozionare, non vendere.
 *
 * Nessun fatto inventato: si usano solo i campi reali di `lead` e il copy di `c`.
 */

const { esc } = require('../lib/content.js');

/* ---------- ornamento floreale a tratto (simmetrico, disegnato a mano) ---------- */

function ramo() {
  return `<path pathLength="1" d="M226 30C248 30 262 23 284 20C306 17 328 20 350 27"/>` +
    `<path pathLength="1" d="M262 22C266 13 275 10 283 12C280 21 271 25 262 22"/>` +
    `<path pathLength="1" d="M302 18C308 26 305 35 297 37C294 29 296 21 302 18"/>` +
    `<path pathLength="1" d="M330 22C338 16 347 16 352 20C346 26 337 27 330 22"/>` +
    `<path pathLength="1" d="M350 27C358 30 362 34 364 39"/>` +
    `<circle pathLength="1" cx="366" cy="42" r="2.4"/>` +
    `<path pathLength="1" d="M244 30C240 35 236 38 230 39"/>`;
}

function fiore() {
  return `<path pathLength="1" d="M200 30C195 22 195 14 200 8C205 14 205 22 200 30"/>` +
    `<path pathLength="1" d="M200 30C195 38 195 46 200 52C205 46 205 38 200 30"/>` +
    `<path pathLength="1" d="M200 30C193 26 187 26 181 30C187 34 193 34 200 30"/>` +
    `<path pathLength="1" d="M200 30C207 26 213 26 219 30C213 34 207 34 200 30"/>` +
    `<circle pathLength="1" cx="200" cy="30" r="1.7"/>`;
}

function orn(cls) {
  const classi = String(cls || '');
  /* il ribaltamento avviene dentro l'SVG: cosi' non entra in conflitto
     con le transform CSS delle comparse */
  const giu = /\bgiu\b/.test(classi);
  return `<svg class="orn ${classi}" viewBox="0 0 400 60" aria-hidden="true" focusable="false">` +
    `<g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"` +
    (giu ? ` transform="translate(0,60) scale(1,-1)"` : '') + `>` +
    ramo() +
    `<g transform="translate(400,0) scale(-1,1)">${ramo()}</g>` +
    fiore() +
    `</g></svg>`;
}

/* ---------- silhouette d'auto a tratto ---------- */

function vettura(kind) {
  const open = `<svg class="silhouette" viewBox="0 0 320 132" aria-hidden="true" focusable="false">` +
    `<g fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">`;
  const close = `</g></svg>`;
  const suolo = `<path class="suolo" d="M6 112H314" stroke-width="1"/>`;
  const ruote = (a, b, r) =>
    `<circle cx="${a}" cy="98" r="${r}"/><circle cx="${a}" cy="98" r="${r - 9}"/>` +
    `<circle cx="${b}" cy="98" r="${r}"/><circle cx="${b}" cy="98" r="${r - 9}"/>`;

  if (kind === 'limo') {
    return open + suolo +
      `<path d="M10 98C10 88 15 83 26 81L64 74C80 59 98 54 120 54H246C266 54 282 59 294 70L306 74C315 77 318 83 318 98Z"/>` +
      `<path d="M80 74C91 62 103 58 118 58V74Z"/>` +
      `<path d="M130 58H160V74H130Z"/>` +
      `<path d="M172 58H202V74H172Z"/>` +
      `<path d="M214 58H244C255 59 265 63 272 70L214 74Z"/>` +
      `<path d="M124 74V98M166 74V98M208 74V98"/>` +
      ruote(64, 274, 15) + close;
  }
  if (kind === 'van') {
    return open + suolo +
      `<path d="M18 98V60C18 52 24 47 34 45L120 38C160 35 210 38 244 46L286 60C298 64 303 72 303 98Z"/>` +
      `<path d="M34 60L110 54V74H34Z"/>` +
      `<path d="M124 53H188V73H124Z"/>` +
      `<path d="M200 54C224 57 246 62 264 69L200 73Z"/>` +
      `<path d="M117 45V98M194 46V98"/>` +
      ruote(78, 246, 16) + close;
  }
  /* berlina di rappresentanza — con nastro sul cofano, a tratto */
  return open + suolo +
    `<path d="M16 98C16 87 21 82 32 80L80 72C98 55 118 49 143 49H183C209 49 231 55 249 69L288 77C300 80 305 85 305 98Z"/>` +
    `<path d="M96 72C110 58 124 53 140 53V72Z"/>` +
    `<path d="M152 53H182C198 53 212 58 224 68L152 72Z"/>` +
    `<path d="M146 72V98"/>` +
    `<path d="M198 40C204 32 214 30 219 34C222 38 216 43 206 43M214 43C222 41 231 43 232 49C233 54 224 55 217 48"/>` +
    `<path d="M206 43H214L210 55"/>` +
    ruote(82, 244, 16) + close;
}

/* ---------- utilità ---------- */

const ROMANI = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/* testo: escape + apostrofo tipografico italiano */
function t(s) {
  return esc(s).replace(/'/g, '’');
}

function corsivoUltima(frase) {
  const parti = String(frase).trim().split(' ');
  if (parti.length === 1) return `<em>${t(parti[0])}</em>`;
  const ultima = parti.pop();
  return t(parti.join(' ')) + ' <em>' + t(ultima) + '</em>';
}

/* Se il lead non ha WhatsApp, la FAQ non puo' rimandare a WhatsApp. */
function faqSenzaWhatsapp(risposta) {
  return String(risposta)
    .replace('Il modo più veloce è WhatsApp: scriveteci', 'Il modo più veloce è il telefono: diteci')
    .replace(' Se preferite, potete anche chiamare.', '')
    .replace('conviene scrivere direttamente su WhatsApp', 'conviene chiamare direttamente')
    .replace(/ su WhatsApp/g, ' al telefono')
    .replace(/WhatsApp/g, 'telefono');
}

/* ================================ RENDER ================================ */

module.exports = function render(lead, c, intro) {
  const nome = esc(lead.name);
  const citta = esc(lead.city);
  const tel = esc(lead.tel);
  const telTxt = esc(lead.phoneDisplay);
  const wa = lead.whatsapp ? esc(lead.whatsapp) : null;
  const indirizzo = lead.address ? esc(lead.address) : null;

  const iniziali = esc(
    String(lead.name).replace(/[^A-Za-zÀ-ÿ ]/g, ' ').trim().split(/\s+/)
      .slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('')
  ) || 'V';

  /* ---- fotografia ----
     `veli` sono i due strati che stanno sopra ogni foto: la velatura bordeaux in
     soft-light che la lega al fondo e la vignettatura che ne spegne i bordi.
     Sotto la foto resta sempre il fondo bordeaux del contenitore e la silhouette
     a tratto: se l'immagine non arriva, la pagina non si buca. */
  const pics = c.pics;
  const veli = '<span class="velo-vino" aria-hidden="true"></span>' +
    '<span class="velo-bordi" aria-hidden="true"></span>';
  /* per i lead non milanesi `citta` e' null: si ripiega sulla strada */
  const paesaggio = pics.citta || pics.strada;

  /* dati verificabili, con singolare/plurale corretto */
  const numeri = [];
  if (lead.rating) numeri.push([esc(lead.rating), 'su Google']);
  else numeri.push(['24/7', 'reperibilità']);
  if (lead.reviews > 0) numeri.push([String(lead.reviews), lead.reviews === 1 ? 'recensione verificata' : 'recensioni verificate']);
  else numeri.push(['H24', 'su prenotazione']);
  numeri.push(['1', 'referente diretto']);

  /* la descrizione non puo' promettere WhatsApp se il lead non ce l'ha */
  const metaDesc = wa ? c.metaDesc : String(c.metaDesc).replace('Preventivo su WhatsApp', 'Preventivo al telefono');

  const ctaPrimaria = wa
    ? `<a class="btn btn-oro" href="${wa}" target="_blank" rel="noopener" aria-label="Scriveteci su WhatsApp">Scriveteci su WhatsApp</a>`
    : `<a class="btn btn-oro" href="tel:${tel}" aria-label="Chiamate ${telTxt}">Chiamate ${telTxt}</a>`;
  const ctaSecondaria = wa
    ? `<a class="btn btn-filo" href="tel:${tel}" aria-label="Chiamate ${telTxt}">Oppure chiamate</a>`
    : `<a class="btn btn-filo" href="#contatti">Come raggiungerci</a>`;

  const services = c.services.map(([tit, des], i) => `
        <article class="srv rv" style="--d:${i * 110}ms">
          <span class="srv-num">${ROMANI[i] || i + 1}</span>
          <h3>${t(tit)}</h3>
          <p>${t(des)}</p>
          <span class="filo" aria-hidden="true"></span>
        </article>`).join('');

  const kinds = ['limo', 'berlina', 'van'];
  const fleet = c.fleet.map(([nomeAuto, taglia, testo], i) => `
          <article class="auto rv" style="--d:${i * 140}ms">
            <div class="auto-cornice">
              <div class="auto-ovale">
                <div class="auto-slot vetro">
                  ${vettura(kinds[i] || 'berlina')}
                  ${pics.fleet[i] ? pics.fleet[i].tag({
    w: 900, q: 78, cls: 'foto',
    sizes: '(max-width:940px) 76vw, 340px',
    style: '--fd:' + (i * 120) + 'ms',
    alt: nomeAuto + ' — ' + pics.fleet[i].alt
  }) : ''}
                  ${veli}
                </div>
                ${orn('')}
                <span class="nastro">${t(taglia)}</span>
              </div>
              <div class="auto-testo">
                <h3>${t(nomeAuto)}</h3>
                <p>${t(testo)}</p>
              </div>
            </div>
          </article>`).join('');

  const passi = [
    ['Il sopralluogo', 'Percorriamo con voi il tragitto del giorno: la cerimonia, la location, l’hotel degli invitati. Verifichiamo accessi, soste e tempi reali, non quelli del navigatore.'],
    ['Gli orari', 'Fissiamo insieme ogni orario: quando l’auto arriva, quanto si attende, a che ora si riparte. Li scriviamo, ve li confermiamo, li rispettiamo.'],
    ['Il coordinamento con la location', 'Ci accordiamo con chi organizza la vostra giornata — struttura, ristorante, fotografo — perché l’auto sia dove serve, quando serve. Voi non dovete pensarci.']
  ].map(([tit, des], i) => `
          <li class="passo rv" style="--d:${i * 130}ms">
            <span class="passo-punto" aria-hidden="true"></span>
            <h3>${t(tit)}</h3>
            <p>${t(des)}</p>
          </li>`).join('');

  const primoPasso = wa
    ? 'Data, orari, luoghi. Anche solo un’idea di massima: un messaggio su WhatsApp basta a cominciare.'
    : 'Data, orari, luoghi. Anche solo un’idea di massima: una telefonata basta a cominciare.';

  const comeFunziona = [
    ['Ci scrivete', primoPasso],
    ['Ricevete il preventivo', 'Vi rispondiamo con la proposta e il prezzo, concordato prima del servizio. Quello resta: niente sorprese a fine giornata.'],
    ['Vi accompagniamo', 'Il giorno arriva e l’auto è lì, all’ora stabilita, pulita e pronta. A voi resta solo da salire.']
  ].map(([tit, des], i) => `
          <article class="tappa rv" style="--d:${i * 120}ms">
            <span class="tappa-num">${i + 1}</span>
            <h3>${t(tit)}</h3>
            <p>${t(des)}</p>
          </article>`).join('');

  const faq = c.faq.map(([q, a0], i) => `
          <div class="faq-voce rv" style="--d:${i * 90}ms">
            <h3>
              <button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-p-${i}" id="faq-b-${i}">
                <span>${t(q)}</span>
                <span class="faq-segno" aria-hidden="true"></span>
              </button>
            </h3>
            <div class="faq-p" id="faq-p-${i}" role="region" aria-labelledby="faq-b-${i}">
              <p>${t(wa ? a0 : faqSenzaWhatsapp(a0))}</p>
            </div>
          </div>`).join('');

  const barraMobile = `
    <div class="barra" role="group" aria-label="Contatti rapidi">
      ${wa ? `<a class="barra-b barra-wa" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivete su WhatsApp a ${nome}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.26-8.24m-3.6 4.2c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.16 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.15-1.19-.06-.1-.23-.16-.48-.29-.25-.12-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.12-.17.25-.65.81-.79.98-.15.16-.29.19-.54.06-.25-.12-1.06-.39-2.01-1.24-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.5.11-.12.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.44-.06-.12-.55-1.36-.76-1.86-.2-.48-.4-.42-.55-.42z"/></svg>
        WhatsApp</a>` : ''}
      <a class="barra-b barra-tel" href="tel:${tel}" aria-label="Chiamate ${telTxt}">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.2 1z"/></svg>
        Telefono</a>
    </div>`;

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${t(c.metaTitle)}</title>
<meta name="description" content="${t(metaDesc)}">
<meta name="theme-color" content="#3B0D18">
<meta property="og:title" content="${t(c.metaTitle)}">
<meta property="og:description" content="${t(metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap" rel="stylesheet">
<style>
:root{
  --oxblood:#3B0D18;
  --vinaccia:#5A1626;
  --vinaccia-chiaro:#6E1D30;
  --crema:#F7EFE4;
  --crema-scuro:#EFE3D2;
  --cipria:#E9CFCB;
  --cipria-tenue:#D9B4B1;
  --ottone:#C8A06A;
  --ottone-tenue:rgba(200,160,106,.42);
  --inchiostro:#3B0D18;
  --inchiostro-tenue:#7A4A50;
  --serif:'Cormorant Garamond','Iowan Old Style',Garamond,Georgia,'Times New Roman',serif;
  --gutter:clamp(20px,6vw,64px);
  --max:1180px;
  --curva:cubic-bezier(.19,1,.22,1);
}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
section[id]{scroll-margin-top:80px}
body{
  margin:0;
  background:var(--oxblood);
  color:var(--crema);
  font-family:var(--serif);
  font-size:clamp(1.06rem,.98rem + .5vw,1.28rem);
  font-weight:300;
  line-height:1.62;
  letter-spacing:.006em;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3{font-weight:300;margin:0;letter-spacing:-.005em;line-height:1.06}
p{margin:0}
a{color:inherit}
img,svg{max-width:100%}
em{font-style:italic}

/* ---- rumore di velluto, sopra ogni fondo ---- */
.grana{
  position:fixed;inset:0;pointer-events:none;z-index:5;opacity:.055;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:160px 160px;
}

/* ---- fasce ---- */
section{position:relative}
.fascia{padding:clamp(72px,13vw,142px) var(--gutter);position:relative;overflow:hidden}
.dentro{max-width:var(--max);margin:0 auto;position:relative;z-index:2}
.stretto{max-width:820px;margin:0 auto}

.buia{
  color:var(--crema);
  background:
    radial-gradient(120% 78% at 12% 0%,rgba(110,29,48,.92) 0%,rgba(110,29,48,0) 62%),
    radial-gradient(88% 62% at 88% 18%,rgba(90,22,38,.85) 0%,rgba(90,22,38,0) 68%),
    radial-gradient(150% 110% at 50% 120%,rgba(24,5,11,.9) 0%,rgba(24,5,11,0) 60%),
    var(--oxblood);
}
.buia::after{
  content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(120% 90% at 50% 45%,rgba(0,0,0,0) 42%,rgba(16,3,8,.55) 100%);
  z-index:1;
}
.chiara{
  color:var(--inchiostro);
  background:
    radial-gradient(90% 70% at 20% 0%,#FFFAF2 0%,rgba(255,250,242,0) 60%),
    radial-gradient(80% 60% at 90% 100%,#F1E2CE 0%,rgba(241,226,206,0) 62%),
    var(--crema);
}
.chiara .etichetta{color:#8A4A34}
.chiara p{color:var(--inchiostro-tenue)}

/* ---- tipografia di servizio ---- */
.etichetta{
  display:block;font-size:.68rem;font-weight:500;text-transform:uppercase;
  letter-spacing:.42em;text-indent:.42em;color:var(--ottone);
}
.titolo-sez{
  font-size:clamp(2.3rem,7.2vw,4.1rem);line-height:1.02;margin:.42em 0 0;
}
.titolo-sez em{color:var(--cipria-tenue)}
.chiara .titolo-sez em{color:#9A5F3E}
.occhiello{max-width:56ch;margin:1.15em auto 0;font-size:1.02em}
.occhiello.a-sinistra{margin-left:0;text-align:left}
.centro{text-align:center}

/* ---- ornamento floreale ---- */
.orn{display:block;width:min(92%,400px);height:auto;margin:0 auto;color:var(--ottone);overflow:visible}
.orn path,.orn circle{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.2s var(--curva) var(--d,0ms)}
.orn.in path,.orn.in circle{stroke-dashoffset:0}
.orn.mini{width:min(70%,230px);opacity:.85}
.orn.stacco{margin-top:clamp(40px,7vw,64px)}

/* ---- filetti in ottone ---- */
.filo{
  display:block;height:1px;background:linear-gradient(90deg,rgba(200,160,106,0),var(--ottone) 18%,var(--ottone) 82%,rgba(200,160,106,0));
  transform:scaleX(0);transform-origin:center;transition:transform 1.5s var(--curva) var(--d,0ms);
}
.filo.in{transform:scaleX(1)}

/* ---- comparse ---- */
.rv{opacity:0;transform:translateY(20px);transition:opacity 1.35s ease var(--d,0ms),transform 1.35s var(--curva) var(--d,0ms)}
.rv.in{opacity:1;transform:none}

/* ---- header ---- */
.testata{
  position:fixed;top:0;left:0;right:0;z-index:900;
  display:flex;align-items:center;gap:16px;
  padding:14px var(--gutter);
  transition:background .6s ease,box-shadow .6s ease,padding .6s ease;
}
.testata.posata{
  background:rgba(43,8,17,.9);
  -webkit-backdrop-filter:saturate(140%) blur(12px);backdrop-filter:saturate(140%) blur(12px);
  box-shadow:0 1px 0 rgba(200,160,106,.26);
}
.marchio{display:flex;align-items:center;gap:12px;text-decoration:none;min-width:0}
.monogramma{
  flex:0 0 auto;width:40px;height:40px;display:grid;place-items:center;
  border:1px solid var(--ottone-tenue);border-radius:50%;
  color:var(--ottone);font-size:.9rem;letter-spacing:.08em;
}
.marchio-nome{
  font-size:.74rem;text-transform:uppercase;letter-spacing:.3em;color:var(--crema);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.testata .btn{margin-left:auto;display:none}
@media(min-width:900px){.testata .btn{display:inline-flex}}

/* ---- bottoni ---- */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  padding:.82em 1.7em;border-radius:999px;text-decoration:none;
  font-size:.72rem;text-transform:uppercase;letter-spacing:.24em;text-indent:.24em;
  transition:transform .5s var(--curva),background .5s ease,color .5s ease,border-color .5s ease;
}
.btn-oro{background:var(--ottone);color:#2E0812;border:1px solid var(--ottone);font-weight:500}
.btn-oro:hover{background:#DCB77F;border-color:#DCB77F;transform:translateY(-2px)}
.btn-filo{border:1px solid var(--ottone-tenue);color:var(--crema)}
.btn-filo:hover{border-color:var(--ottone);transform:translateY(-2px)}
.chiara .btn-filo{color:var(--vinaccia);border-color:rgba(90,22,38,.3)}
.chiara .btn-filo:hover{border-color:var(--vinaccia)}
a:focus-visible,button:focus-visible{outline:2px solid var(--ottone);outline-offset:4px;border-radius:4px}

/* ---- hero ---- */
.hero{
  position:relative;min-height:100vh;min-height:100svh;display:flex;align-items:center;
  padding:clamp(104px,18vw,150px) var(--gutter) clamp(64px,10vw,96px);
  text-align:center;overflow:hidden;
}
#petali{position:absolute;inset:0;z-index:1;pointer-events:none}
.hero .dentro{max-width:940px}
.hero-nome{
  font-size:clamp(.62rem,2.4vw,.76rem);text-transform:uppercase;letter-spacing:.46em;text-indent:.46em;
  color:var(--cipria-tenue);margin-bottom:clamp(26px,5vw,42px);
}
.hero h1{
  font-size:clamp(3rem,12.5vw,6.4rem);line-height:.96;letter-spacing:-.015em;
  margin:clamp(18px,3.4vw,30px) 0;color:var(--crema);
}
.hero h1 span{display:block}
.hero h1 em{color:var(--cipria)}
.targa{
  display:flex;align-items:center;justify-content:center;gap:clamp(12px,3vw,20px);
  margin:clamp(22px,4vw,34px) auto 0;max-width:440px;
}
.targa .filo{flex:1}
.targa span.testo{
  font-size:.68rem;text-transform:uppercase;letter-spacing:.4em;text-indent:.4em;
  color:var(--ottone);white-space:nowrap;
}
.hero-lede{
  max-width:44ch;margin:clamp(22px,4vw,32px) auto 0;color:var(--cipria);
  font-size:clamp(1.08rem,1rem + .6vw,1.34rem);
}
.hero-meta{
  margin-top:18px;font-size:.68rem;text-transform:uppercase;letter-spacing:.3em;text-indent:.3em;
  color:rgba(233,207,203,.72);
}
.azioni{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:clamp(30px,5vw,42px)}

/* ================= fotografia =================
   Trattamento comune: velatura bordeaux in soft-light, vignettatura ai bordi,
   dissolvenza lenta con scala appena percettibile. Sotto ogni foto resta
   sempre un fondo bordeaux disegnato: se la rete cade, non si apre un buco. */
.vetro{position:relative;overflow:hidden;isolation:isolate;
  background:
    radial-gradient(120% 90% at 50% 0%,rgba(200,160,106,.16) 0%,rgba(200,160,106,0) 58%),
    radial-gradient(100% 120% at 50% 110%,rgba(24,5,11,.74) 0%,rgba(24,5,11,0) 60%),
    linear-gradient(180deg,#5A1626 0%,#330B15 100%);
}
.foto{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1;
  filter:saturate(.92) contrast(1.02);
  opacity:0;transform:scale(1.045);
  transition:opacity 1.9s ease var(--fd,0ms),transform 2.7s var(--curva) var(--fd,0ms);
}
.foto.viva{opacity:1;transform:scale(1)}
/* velatura bordeaux: lega la foto al fondo del tema */
.velo-vino{
  position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.5;
  mix-blend-mode:soft-light;
  background:linear-gradient(170deg,#8E2438 0%,#5A1626 52%,#3B0D18 100%);
}
/* vignettatura */
.velo-bordi{
  position:absolute;inset:0;z-index:3;pointer-events:none;
  background:radial-gradient(112% 88% at 50% 42%,rgba(0,0,0,0) 38%,rgba(26,5,12,.32) 72%,rgba(18,3,9,.68) 100%);
}
.vetro .silhouette{
  position:absolute;left:50%;bottom:13%;transform:translateX(-50%);
  width:min(78%,400px);height:auto;color:rgba(247,239,228,.62);z-index:0;
}
.vetro .suolo{stroke:rgba(200,160,106,.46)}
/* l'arco: la firma del tema */
.arco-vetro{
  width:100%;height:clamp(212px,48vw,420px);
  border:1px solid var(--ottone-tenue);
  border-radius:50% 50% 8px 8px/40% 40% 8px 8px;
}
.arco{position:relative;width:min(100%,620px);margin:clamp(2px,.6vw,8px) auto 0}
.arco .orn{
  position:absolute;left:50%;transform:translateX(-50%);
  width:min(76%,330px);z-index:4;color:var(--ottone);
}
.arco .orn.alto{top:calc(-1 * clamp(6px,1.4vw,14px))}
.arco .orn.basso{bottom:calc(-1 * clamp(10px,2.2vw,20px))}

.scendi{
  margin-top:clamp(26px,5vw,40px);display:inline-flex;flex-direction:column;align-items:center;gap:10px;
  font-size:.62rem;text-transform:uppercase;letter-spacing:.34em;text-indent:.34em;color:rgba(233,207,203,.6);
  text-decoration:none;
}
.scendi i{display:block;width:1px;height:38px;background:linear-gradient(180deg,var(--ottone),rgba(200,160,106,0))}

/* ---- fascia dei numeri ---- */
.numeri{display:grid;gap:clamp(24px,4vw,34px);grid-template-columns:1fr;max-width:760px;margin:clamp(38px,6vw,52px) auto 0}
@media(min-width:640px){.numeri{grid-template-columns:repeat(3,1fr)}}
.numero{text-align:center;padding:0 10px}
.numero b{display:block;font-weight:400;font-size:clamp(2.6rem,8vw,3.6rem);line-height:1;color:var(--vinaccia)}
.numero span{
  display:block;margin-top:12px;font-size:.64rem;text-transform:uppercase;letter-spacing:.3em;text-indent:.3em;
  color:#8A4A34;
}
.promessa{
  margin:clamp(40px,6vw,58px) auto 0;max-width:640px;text-align:center;
  padding:clamp(26px,4vw,36px) clamp(20px,4vw,40px);
  border:1px solid rgba(90,22,38,.16);background:rgba(255,252,246,.5);
}
.promessa h3{font-size:clamp(1.5rem,4.4vw,2rem);color:var(--vinaccia)}
.promessa p{margin-top:.5em}

/* ---- servizi ---- */
.servizi{display:grid;gap:clamp(30px,5vw,46px);grid-template-columns:1fr;margin-top:clamp(44px,7vw,66px)}
@media(min-width:760px){.servizi{grid-template-columns:1fr 1fr;gap:clamp(38px,5vw,62px)}}
.srv h3{font-size:clamp(1.7rem,5vw,2.3rem);margin:.28em 0 .42em;color:var(--crema)}
.srv p{color:var(--cipria);max-width:46ch}
.srv-num{font-size:.72rem;letter-spacing:.3em;color:var(--ottone)}
.srv .filo{margin-top:clamp(22px,3vw,30px)}

/* ---- flotta ---- */
.rail{margin-top:clamp(44px,7vw,66px);overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;padding-bottom:14px}
.rail::-webkit-scrollbar{height:2px}
.rail::-webkit-scrollbar-thumb{background:rgba(90,22,38,.28)}
.vetture{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(268px,300px);gap:clamp(18px,3vw,28px);min-width:min-content}
@media(min-width:940px){
  .rail{overflow:visible}
  .vetture{grid-auto-flow:row;grid-template-columns:repeat(3,1fr);grid-auto-columns:auto}
}
.auto-cornice{
  height:100%;display:flex;flex-direction:column;
  border:1px solid rgba(90,22,38,.2);padding:10px;background:rgba(255,252,246,.42);
}
.auto-cornice>*{position:relative}
/* l'ovale della flotta, con l'ornamento sul bordo alto e il nastro sul basso */
.auto-ovale{position:relative;padding-bottom:17px}
.auto-slot{
  aspect-ratio:4/5;
  border:1px solid var(--ottone-tenue);border-radius:50%;
}
.auto-slot .silhouette{bottom:22%;width:min(84%,300px)}
.auto-ovale .orn{
  position:absolute;left:50%;top:calc(-1 * clamp(10px,2.4vw,16px));transform:translateX(-50%);
  width:min(90%,250px);z-index:4;color:var(--ottone);
}
.nastro{
  position:absolute;left:50%;bottom:0;transform:translateX(-50%);z-index:4;max-width:92%;
  display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;
  padding:.68em 2.1em;
  background:linear-gradient(180deg,#7A2136 0%,#4A1120 100%);
  color:#F0D8A6;font-size:.6rem;text-transform:uppercase;letter-spacing:.26em;text-indent:.26em;
  clip-path:polygon(0 0,100% 0,calc(100% - 13px) 50%,100% 100%,0 100%,13px 50%);
}
.auto-testo{padding:clamp(24px,3vw,32px) clamp(14px,2vw,20px) clamp(16px,2vw,22px);text-align:center}
.auto-testo h3{font-size:clamp(1.5rem,4.4vw,1.95rem);margin:.4em 0 .45em;color:var(--vinaccia)}
.auto-testo p{font-size:.98em}
.nota-rail{margin-top:18px;font-size:.64rem;text-transform:uppercase;letter-spacing:.28em;text-indent:.28em;color:#8A4A34;text-align:center}
@media(min-width:940px){.nota-rail{display:none}}

/* ---- fascia romantica a tutta larghezza ---- */
.romantica{
  position:relative;min-height:clamp(320px,58vw,540px);display:flex;align-items:center;
  padding:clamp(64px,11vw,110px) var(--gutter);overflow:hidden;
  border-top:1px solid rgba(200,160,106,.22);border-bottom:1px solid rgba(200,160,106,.22);
}
.romantica .vetro{position:absolute;inset:0}
.romantica .velo-notte{
  position:absolute;inset:0;z-index:3;pointer-events:none;
  background:
    radial-gradient(90% 74% at 50% 50%,rgba(28,6,13,.58) 0%,rgba(20,4,9,.86) 100%),
    linear-gradient(180deg,rgba(24,5,11,.72),rgba(24,5,11,.78));
}
.romantica .dentro{max-width:760px;text-align:center;z-index:4}
.romantica .orn{color:var(--ottone);opacity:.9}
.rom-frase{
  margin:clamp(22px,4vw,32px) auto 0;color:var(--crema);
  font-size:clamp(1.5rem,4.6vw,2.5rem);line-height:1.24;font-style:italic;max-width:22ch;
  text-shadow:0 2px 18px rgba(16,3,8,.7);
}
.rom-firma{
  margin-top:clamp(20px,3.4vw,28px);font-size:.64rem;font-style:normal;
  text-transform:uppercase;letter-spacing:.34em;text-indent:.34em;color:rgba(200,160,106,.92);
}

/* ---- inserto fotografico in colonna ---- */
.ritratto{margin:0 auto}
.ritratto .arco-vetro{height:clamp(300px,64vw,460px)}
.insieme-griglia{display:grid;gap:clamp(38px,6vw,62px);grid-template-columns:1fr;align-items:center}
@media(min-width:900px){.insieme-griglia{grid-template-columns:1.15fr .85fr}.insieme-griglia .tempo{margin-top:0}}
.zona-media{position:relative;margin-bottom:clamp(26px,4vw,34px)}
.zona-media .vetro{
  aspect-ratio:5/4;border:1px solid var(--ottone-tenue);border-radius:50%;
}
.zona-media .orn{
  position:absolute;left:50%;bottom:calc(-1 * clamp(8px,2vw,14px));transform:translateX(-50%);
  width:min(84%,260px);z-index:4;color:var(--ottone);
}
.tondo{position:relative;width:min(100%,300px);margin:0 auto clamp(24px,4vw,32px)}
.tondo .vetro{aspect-ratio:1/1;border-radius:50%;border:1px solid var(--ottone-tenue)}
.tondo .silhouette{bottom:26%;width:86%}

/* ---- come lavoriamo con voi ---- */
.tempo{list-style:none;margin:clamp(44px,7vw,66px) 0 0;padding:0;position:relative;max-width:760px}
.tempo::before{
  content:"";position:absolute;left:5px;top:6px;bottom:6px;width:1px;
  background:linear-gradient(180deg,rgba(200,160,106,0),var(--ottone) 14%,var(--ottone) 86%,rgba(200,160,106,0));
}
.passo{position:relative;padding:0 0 clamp(34px,5vw,48px) clamp(30px,5vw,46px)}
.passo:last-child{padding-bottom:0}
.passo-punto{
  position:absolute;left:0;top:.55em;width:11px;height:11px;transform:rotate(45deg);
  border:1px solid var(--ottone);background:var(--oxblood);
}
.passo h3{font-size:clamp(1.55rem,4.6vw,2.1rem);color:var(--crema);margin-bottom:.4em}
.passo p{color:var(--cipria);max-width:52ch}

/* ---- come funziona ---- */
.tappe{display:grid;gap:clamp(28px,4vw,40px);grid-template-columns:1fr;margin-top:clamp(44px,7vw,66px)}
@media(min-width:800px){.tappe{grid-template-columns:repeat(3,1fr)}}
.tappa{text-align:center;padding:0 clamp(4px,2vw,14px)}
.tappa-num{
  display:inline-grid;place-items:center;width:52px;height:52px;border-radius:50%;
  border:1px solid rgba(90,22,38,.3);color:var(--vinaccia);font-size:1.2rem;
}
.tappa h3{font-size:clamp(1.45rem,4.2vw,1.85rem);margin:.6em 0 .4em;color:var(--vinaccia)}
.tappa p{max-width:34ch;margin:0 auto}

/* ---- zona ---- */
.zona-griglia{display:grid;gap:clamp(26px,4vw,40px);grid-template-columns:1fr;margin-top:clamp(40px,6vw,56px)}
@media(min-width:760px){.zona-griglia{grid-template-columns:1.1fr .9fr;align-items:center}}
.zona-scheda{border:1px solid var(--ottone-tenue);padding:clamp(24px,4vw,34px)}
.zona-scheda dl{margin:0;display:grid;gap:20px}
.zona-scheda dt{font-size:.64rem;text-transform:uppercase;letter-spacing:.3em;text-indent:.3em;color:var(--ottone)}
.zona-scheda dd{margin:.4em 0 0;font-size:1.15em;color:var(--crema)}

/* ---- faq ---- */
.faq{margin-top:clamp(40px,6vw,58px);max-width:820px;margin-left:auto;margin-right:auto}
.faq-voce{border-top:1px solid rgba(90,22,38,.18)}
.faq-voce:last-child{border-bottom:1px solid rgba(90,22,38,.18)}
.faq-voce h3{margin:0;font-size:1em}
.faq-q{
  width:100%;background:none;border:0;padding:clamp(20px,3vw,26px) 34px clamp(20px,3vw,26px) 0;
  display:flex;align-items:flex-start;justify-content:space-between;gap:20px;
  font-family:inherit;font-size:clamp(1.2rem,3.6vw,1.55rem);font-weight:300;line-height:1.28;
  color:var(--vinaccia);text-align:left;cursor:pointer;position:relative;
}
.faq-segno{position:absolute;right:2px;top:calc(50% - 7px);width:14px;height:14px;flex:0 0 auto}
.faq-segno::before,.faq-segno::after{
  content:"";position:absolute;left:0;top:6px;width:14px;height:1px;background:var(--ottone);
  transition:transform .55s var(--curva);
}
.faq-segno::after{transform:rotate(90deg)}
.faq-q[aria-expanded="true"] .faq-segno::after{transform:rotate(0)}
.faq-p{max-height:0;overflow:hidden;transition:max-height .6s var(--curva)}
.faq-p p{padding:0 clamp(16px,4vw,40px) clamp(22px,3vw,28px) 0;max-width:62ch}

/* ---- contatti ---- */
.contatti-griglia{display:grid;gap:clamp(30px,5vw,44px);grid-template-columns:1fr;margin-top:clamp(40px,6vw,58px)}
@media(min-width:800px){.contatti-griglia{grid-template-columns:1fr 1fr;align-items:start}}
.recapito{display:block;text-decoration:none;padding:clamp(20px,3vw,26px) 0;border-top:1px solid var(--ottone-tenue)}
.recapiti{border-bottom:1px solid var(--ottone-tenue)}
.recapito span{
  display:block;font-size:.64rem;text-transform:uppercase;letter-spacing:.3em;text-indent:.3em;color:var(--ottone);
}
.recapito b{display:block;margin-top:.45em;font-weight:400;font-size:clamp(1.3rem,4vw,1.7rem);color:var(--crema)}
.recapito p{margin-top:.35em;color:var(--cipria)}
.chiusura{text-align:center}
.chiusura .btn{margin-top:clamp(24px,4vw,34px)}

/* ---- piede ---- */
.piede{
  padding:clamp(44px,7vw,64px) var(--gutter) calc(clamp(44px,7vw,64px) + env(safe-area-inset-bottom));
  text-align:center;background:#2C0812;color:rgba(233,207,203,.66);
  border-top:1px solid rgba(200,160,106,.2);
}
.piede .monogramma{margin:0 auto 18px}
.piede-nome{color:var(--crema);font-size:1.2rem;letter-spacing:.02em}
.piede-riga{margin-top:10px;font-size:.86rem}
.piede-umbra{margin-top:22px;font-size:.62rem;text-transform:uppercase;letter-spacing:.3em;text-indent:.3em;color:rgba(233,207,203,.42)}

/* ---- barra mobile ---- */
.barra{
  position:fixed;left:0;right:0;bottom:0;z-index:860;display:flex;gap:1px;
  background:rgba(200,160,106,.28);
  padding-bottom:env(safe-area-inset-bottom);
  box-shadow:0 -14px 34px rgba(20,4,9,.45);
}
.barra-b{
  flex:1;display:flex;align-items:center;justify-content:center;gap:9px;
  padding:16px 8px;text-decoration:none;
  font-size:.66rem;text-transform:uppercase;letter-spacing:.24em;text-indent:.24em;
}
.barra-b svg{width:17px;height:17px;flex:0 0 auto}
.barra-wa{background:var(--ottone);color:#2E0812;font-weight:500}
.barra-tel{background:#2C0812;color:var(--crema)}
@media(min-width:900px){.barra{display:none}}
body{padding-bottom:0}
@media(max-width:899px){body{padding-bottom:64px}}

@media (prefers-reduced-motion: reduce){
  .rv{opacity:1;transform:none;transition:none}
  .filo{transform:scaleX(1);transition:none}
  .orn path,.orn circle{stroke-dashoffset:0;transition:none}
  .foto{opacity:1;transform:none;transition:none}
  .btn{transition:none}
  *{scroll-behavior:auto!important}
}
</style>
</head>
<body>
<div class="grana" aria-hidden="true"></div>

<header class="testata" id="testata">
  <a class="marchio" href="#hero">
    <span class="monogramma" aria-hidden="true">${iniziali}</span>
    <span class="marchio-nome">${nome}</span>
  </a>
  ${wa
      ? `<a class="btn btn-oro" href="${wa}" target="_blank" rel="noopener">Scriveteci su WhatsApp</a>`
      : `<a class="btn btn-oro" href="tel:${tel}">Chiamate ${telTxt}</a>`}
</header>

<main>

  <section class="hero buia" id="hero">
    <canvas id="petali" aria-hidden="true"></canvas>
    <div class="dentro">
      <p class="hero-nome rv">${nome}</p>
      ${orn('rv')}
      <h1>
        <span class="rv" style="--d:120ms">${t(c.heroA)}</span>
        <span class="rv" style="--d:260ms">${corsivoUltima(c.heroB)}</span>
      </h1>
      <div class="arco rv" style="--d:300ms">
        <div class="arco-vetro vetro" data-photo-slot="hero">
          ${vettura('limo')}
          ${pics.hero.tag({
      w: 1800, q: 80, cls: 'foto', eager: true,
      sizes: '(max-width:760px) 100vw, 620px',
      style: '--fd:220ms'
    })}
          ${veli}
        </div>
        ${orn('alto')}
        ${orn('giu basso')}
      </div>
      <div class="targa rv" style="--d:340ms">
        <span class="filo" aria-hidden="true"></span>
        <span class="testo">il vostro giorno</span>
        <span class="filo" aria-hidden="true"></span>
      </div>
      <p class="hero-lede rv" style="--d:420ms">${t(c.lede)}</p>
      <p class="hero-meta rv" style="--d:480ms">${t(c.kicker)} &middot; ${citta}</p>
      <div class="azioni rv" style="--d:540ms">
        ${ctaPrimaria}
        ${ctaSecondaria}
      </div>
      <a class="scendi rv" style="--d:620ms" href="#servizi"><span>Sfogliate</span><i aria-hidden="true"></i></a>
    </div>
  </section>

  <section class="fascia chiara" aria-labelledby="t-prova">
    <div class="dentro centro">
      <p class="etichetta rv">Quello che si pu&ograve; verificare</p>
      <h2 class="titolo-sez rv" id="t-prova" style="--d:80ms">Non vi chiediamo di <em>crederci</em></h2>
      <div class="numeri">
        ${numeri.map(([v, l], i) => `
        <div class="numero rv" style="--d:${i * 120}ms">
          <b>${v}</b><span>${l}</span>
        </div>`).join('')}
      </div>
      <div class="promessa rv" style="--d:200ms">
        <h3>${t(c.proof[0])}</h3>
        <p>${t(c.proof[1])}.</p>
      </div>
      ${orn('mini stacco rv')}
    </div>
  </section>

  <section class="fascia buia" id="servizi" aria-labelledby="t-servizi">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">${t(c.kicker)}</p>
        <h2 class="titolo-sez rv" id="t-servizi" style="--d:80ms">Quello che vi <em>accompagna</em></h2>
        <p class="occhiello rv" style="--d:160ms">Ogni servizio nasce da una conversazione con voi: ci dite come immaginate la giornata, noi la traduciamo in orari, percorsi e vetture.</p>
      </div>
      <div class="servizi">${services}</div>
    </div>
  </section>

  <section class="fascia chiara" id="vetture" aria-labelledby="t-vetture">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">La flotta</p>
        <h2 class="titolo-sez rv" id="t-vetture" style="--d:80ms">Le vetture per il vostro <em>giorno</em></h2>
        <p class="occhiello rv" style="--d:160ms">Scegliete l&rsquo;auto con cui volete essere ricordati. Vi mostriamo la disponibilit&agrave; per la vostra data e concordiamo insieme l&rsquo;allestimento.</p>
      </div>
      <div class="rail">
        <div class="vetture">${fleet}</div>
      </div>
      <p class="nota-rail">Scorrete per vedere le altre</p>
    </div>
  </section>

  <section class="romantica" aria-label="Il giorno della cerimonia">
    <div class="vetro" data-photo-slot="atmosfera">
      ${pics.heroAlt.tag({
      w: 1900, q: 76, cls: 'foto',
      sizes: '100vw',
      alt: pics.heroAlt.alt + ' — atmosfera del giorno della cerimonia'
    })}
      ${veli}
      <span class="velo-notte" aria-hidden="true"></span>
    </div>
    <div class="dentro">
      ${orn('mini rv')}
      <p class="rom-frase rv" style="--d:140ms">Di quel giorno resta tutto: anche il silenzio dell&rsquo;auto, un attimo prima.</p>
      <p class="rom-firma rv" style="--d:260ms">${nome}</p>
    </div>
  </section>

  <section class="fascia buia" id="insieme" aria-labelledby="t-insieme">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">Come lavoriamo con voi</p>
        <h2 class="titolo-sez rv" id="t-insieme" style="--d:80ms">Il giorno si prepara <em>prima</em></h2>
        <p class="occhiello rv" style="--d:160ms">Il servizio comincia molto prima che l&rsquo;auto arrivi. Sono tre passaggi semplici, e li facciamo noi.</p>
      </div>
      <div class="insieme-griglia">
        <ol class="tempo">${passi}</ol>
        <figure class="ritratto arco rv" style="--d:240ms">
          <div class="arco-vetro vetro" data-photo-slot="autista">
            ${vettura('berlina')}
            ${pics.autista.tag({
      w: 1000, q: 78, cls: 'foto',
      sizes: '(max-width:900px) 90vw, 420px',
      alt: pics.autista.alt
    })}
            ${veli}
          </div>
          ${orn('alto')}
          ${orn('giu basso')}
        </figure>
      </div>
      ${orn('mini stacco rv')}
    </div>
  </section>

  <section class="fascia chiara" id="come" aria-labelledby="t-come">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">Come funziona</p>
        <h2 class="titolo-sez rv" id="t-come" style="--d:80ms">Tre passaggi, <em>nessuna</em> attesa</h2>
      </div>
      <div class="tappe">${comeFunziona}</div>
    </div>
  </section>

  <section class="fascia buia" id="zona" aria-labelledby="t-zona">
    <div class="dentro">
      <div class="zona-griglia">
        <div>
          <p class="etichetta rv">Zona operativa</p>
          <h2 class="titolo-sez rv" id="t-zona" style="--d:80ms">${citta} e ovunque vi porti la <em>giornata</em></h2>
          <p class="occhiello a-sinistra rv" style="--d:160ms">La vostra giornata pu&ograve; cominciare in un luogo e finire in un altro: la cerimonia, il ricevimento, l&rsquo;hotel degli invitati. Diteci i luoghi e li verifichiamo con voi, uno per uno, prima della data.</p>
        </div>
        <div>
          <div class="zona-media rv" style="--d:180ms">
            <div class="vetro" data-photo-slot="${paesaggio.slot}">
              ${paesaggio.tag({
      w: 1100, q: 76, cls: 'foto',
      sizes: '(max-width:760px) 92vw, 480px',
      alt: paesaggio.alt
    })}
              ${veli}
            </div>
            ${orn('giu')}
          </div>
        <div class="zona-scheda rv" style="--d:260ms">
          <dl>
            <div>
              <dt>Base</dt>
              <dd>${citta}</dd>
            </div>
            ${indirizzo ? `<div>
              <dt>Indirizzo</dt>
              <dd>${indirizzo}</dd>
            </div>` : ''}
            <div>
              <dt>Categoria</dt>
              <dd>${t(lead.category)}</dd>
            </div>
          </dl>
        </div>
        </div>
      </div>
    </div>
  </section>

  <section class="fascia chiara" id="domande" aria-labelledby="t-faq">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">Domande</p>
        <h2 class="titolo-sez rv" id="t-faq" style="--d:80ms">Quello che ci chiedete <em>sempre</em></h2>
      </div>
      <div class="faq">${faq}</div>
    </div>
  </section>

  <section class="fascia buia" id="contatti" aria-labelledby="t-contatti">
    <div class="dentro">
      <div class="centro stretto">
        <p class="etichetta rv">Parliamone</p>
        <h2 class="titolo-sez rv" id="t-contatti" style="--d:80ms">Raccontateci il vostro <em>giorno</em></h2>
        <p class="occhiello rv" style="--d:160ms">Data, orari, luoghi: anche solo quello che avete in mente adesso. Vi rispondiamo noi, con calma.</p>
      </div>
      <div class="contatti-griglia">
        <div class="recapiti rv" style="--d:120ms">
          ${wa ? `<a class="recapito" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivete su WhatsApp a ${nome}">
            <span>WhatsApp</span><b>${telTxt}</b><p>Il modo pi&ugrave; rapido: scrivete e vi rispondiamo.</p>
          </a>` : ''}
          <a class="recapito" href="tel:${tel}" aria-label="Chiamate ${telTxt}">
            <span>Telefono</span><b>${telTxt}</b><p>Se preferite la voce, siamo dall&rsquo;altra parte.</p>
          </a>
          ${indirizzo ? `<div class="recapito">
            <span>Dove siamo</span><b>${indirizzo}</b><p>${citta}</p>
          </div>` : `<div class="recapito">
            <span>Dove siamo</span><b>${citta}</b><p>Su appuntamento.</p>
          </div>`}
        </div>
        <div class="chiusura rv" style="--d:240ms">
          <div class="tondo">
            <div class="vetro" data-photo-slot="interni">
              ${pics.interni.tag({
      w: 800, q: 78, cls: 'foto',
      sizes: '(max-width:800px) 80vw, 300px',
      alt: pics.interni.alt
    })}
              ${veli}
            </div>
          </div>
          ${orn('mini')}
          <p class="occhiello">Non c&rsquo;&egrave; nulla da decidere subito. Si comincia con un messaggio, e da l&igrave; costruiamo insieme la giornata.</p>
          ${wa
      ? `<a class="btn btn-oro" href="${wa}" target="_blank" rel="noopener">Scriveteci su WhatsApp</a>`
      : `<a class="btn btn-oro" href="tel:${tel}">Chiamate ${telTxt}</a>`}
        </div>
      </div>
    </div>
  </section>

</main>

<footer class="piede">
  <span class="monogramma" aria-hidden="true">${iniziali}</span>
  <p class="piede-nome">${nome}</p>
  <p class="piede-riga">${t(c.kicker)} &middot; ${citta}${indirizzo ? ' &middot; ' + indirizzo : ''}</p>
  <p class="piede-riga">${telTxt}</p>
  <p class="piede-umbra">Anteprima realizzata da Umbra</p>
</footer>

${barraMobile}

<script>
(function(){
  var ridotto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- comparse, filetti e ornamenti --- */
  var animabili = document.querySelectorAll('.rv,.filo,.orn');
  if (ridotto || !('IntersectionObserver' in window)) {
    for (var i = 0; i < animabili.length; i++) animabili[i].classList.add('in');
  } else {
    var attesi = Array.prototype.slice.call(animabili);
    var io = new IntersectionObserver(function(voci){
      voci.forEach(function(v){
        if (v.isIntersecting) { v.target.classList.add('in'); io.unobserve(v.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    for (var j = 0; j < animabili.length; j++) io.observe(animabili[j]);

    /* Rete di sicurezza: su pagine lunghe e con scroll fluido la consegna
       dell'observer puo' restare indietro. Qui, a ogni scroll (una sola volta
       per frame), si rivela comunque tutto cio' che ha gia' attraversato la
       finestra. La lista si svuota da sola e l'ascoltatore si stacca. */
    var inCoda = false;
    function recupera(){
      inCoda = false;
      var alt = window.innerHeight, resta = [];
      for (var k = 0; k < attesi.length; k++) {
        var e = attesi[k], r = e.getBoundingClientRect();
        if (r.top < alt * 0.96 && r.bottom > 0) { e.classList.add('in'); io.unobserve(e); }
        else if (!e.classList.contains('in')) resta.push(e);
      }
      attesi = resta;
      if (!attesi.length) removeEventListener('scroll', segna);
    }
    function segna(){ if (!inCoda) { inCoda = true; requestAnimationFrame(recupera); } }
    addEventListener('scroll', segna, { passive: true });
  }

  /* --- fotografie: dissolvenza lenta all'arrivo, e rete di sicurezza --- */
  var scatti = document.querySelectorAll('img.foto');
  Array.prototype.forEach.call(scatti, function(im){
    function viva(){ im.classList.add('viva'); }
    if (im.complete && im.naturalWidth > 0) viva();
    else im.addEventListener('load', viva);
  });
  document.querySelectorAll('img[data-photo-slot]').forEach(function(im){
    im.addEventListener('error', function(){ im.style.display = 'none'; });
  });

  /* --- testata --- */
  var testata = document.getElementById('testata');
  function posa(){ testata.classList.toggle('posata', window.scrollY > 40); }
  posa();
  addEventListener('scroll', posa, { passive: true });

  /* --- accordion FAQ --- */
  var domande = document.querySelectorAll('.faq-q');
  Array.prototype.forEach.call(domande, function(b){
    var p = document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click', function(){
      var aperto = b.getAttribute('aria-expanded') === 'true';
      Array.prototype.forEach.call(domande, function(altro){
        if (altro === b) return;
        altro.setAttribute('aria-expanded','false');
        var ap = document.getElementById(altro.getAttribute('aria-controls'));
        if (ap) ap.style.maxHeight = '';
      });
      b.setAttribute('aria-expanded', aperto ? 'false' : 'true');
      p.style.maxHeight = aperto ? '' : p.scrollHeight + 'px';
    });
  });
  addEventListener('resize', function(){
    Array.prototype.forEach.call(domande, function(b){
      if (b.getAttribute('aria-expanded') === 'true') {
        var p = document.getElementById(b.getAttribute('aria-controls'));
        if (p) p.style.maxHeight = p.scrollHeight + 'px';
      }
    });
  });

  /* --- petali sull'hero --- */
  var hero = document.getElementById('hero');
  var cv = document.getElementById('petali');
  if (cv && hero && !ridotto && cv.getContext) {
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, P = [], acceso = false, raf = 0;

    function misura(){
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function petalo(alto){
      return {
        x: Math.random() * W,
        y: alto === undefined ? Math.random() * H : alto,
        r: 3 + Math.random() * 5,
        v: 0.10 + Math.random() * 0.26,
        a: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.010,
        on: 0.3 + Math.random() * 0.8,
        f: Math.random() * Math.PI * 2,
        o: 0.08 + Math.random() * 0.2,
        oro: Math.random() < 0.34
      };
    }
    function popola(){
      misura();
      var n = W < 520 ? 14 : (W < 900 ? 20 : 26);
      P = [];
      for (var k = 0; k < n; k++) P.push(petalo());
    }
    function quadro(){
      if (!acceso) return;
      ctx.clearRect(0, 0, W, H);
      for (var k = 0; k < P.length; k++) {
        var p = P[k];
        p.y += p.v; p.a += p.va; p.f += 0.008;
        p.x += Math.sin(p.f) * p.on * 0.22;
        if (p.y - 14 > H) { P[k] = petalo(-14); continue; }
        if (p.x < -20) p.x = W + 18; else if (p.x > W + 20) p.x = -18;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.oro ? 'rgba(200,160,106,' + p.o + ')' : 'rgba(240,214,209,' + p.o + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * (0.42 + Math.abs(Math.cos(p.a)) * 0.24), 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(quadro);
    }
    function accendi(){ if (acceso) return; acceso = true; raf = requestAnimationFrame(quadro); }
    function spegni(){ acceso = false; if (raf) cancelAnimationFrame(raf); raf = 0; }

    popola();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function(voci){
        voci[0].isIntersecting ? accendi() : spegni();
      }, { threshold: 0.02 }).observe(hero);
    } else {
      accendi();
    }
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) spegni(); else if (hero.getBoundingClientRect().bottom > 0) accendi();
    });
    var attesa;
    addEventListener('resize', function(){
      clearTimeout(attesa);
      attesa = setTimeout(function(){ var era = acceso; spegni(); popola(); if (era) accendi(); }, 220);
    }, { passive: true });
  }
})();
<\/script>

${intro}
</body>
</html>`;
};

window.U.m["velluto"]=module.exports;})();
