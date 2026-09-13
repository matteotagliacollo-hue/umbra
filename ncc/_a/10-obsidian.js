window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * OBSIDIAN — nero liquido e cromo.
 * Art direction: sito di un costruttore di hypercar. Aggressivo, cinematografico,
 * techno-lusso. Nero assoluto, cromo animato, un solo accento bianco-azzurro.
 *
 * Nessun fatto inventato: si usano solo i campi di `lead` e il copy di `c`.
 * Nessun asset esterno oltre a Google Fonts. Nessuna libreria JS.
 */

const { esc } = require('../lib/content.js');

/* testo: escape + apostrofo tipografico italiano */
const t = s => esc(s).replace(/'/g, '’');

const monogram = name => {
  const w = String(name).replace(/[^A-Za-zÀ-ÿ0-9\s]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return 'NC';
  if (w.length === 1) return w[0].slice(0, 2).toUpperCase();
  return (w[0][0] + w[w.length - 1][0]).toUpperCase();
};

const pad2 = n => String(n).padStart(2, '0');

module.exports = function render(lead, c, intro) {
  const name = lead.name;
  const city = lead.city;
  const hasWa = !!lead.whatsapp;

  /* ---- fotografia: sempre difensiva, un tema non deve rompersi se manca ---- */
  const pics = c.pics || {};
  const fleetPics = Array.isArray(pics.fleet) ? pics.fleet : [];
  /** <img> solo se la foto esiste davvero */
  const shot = (p, opts) => (p && typeof p.tag === 'function') ? p.tag(opts) : '';
  /** background-image solo se la foto esiste davvero */
  const shotCss = (p, w, q) => (p && typeof p.css === 'function') ? p.css(w, q) : 'none';
  const heroPic = pics.hero || null;
  const nightPic = pics.notturno || pics.strada || null;
  const insetPic = pics.interni || pics.autista || null;
  const roadPic = pics.strada || pics.aeroporto || null;
  const closePic = pics.citta || pics.aeroporto || pics.heroAlt || null;
  const hasRating = !!lead.rating;
  const waHref = hasWa ? esc(lead.whatsapp) : '';
  const telHref = 'tel:' + esc(lead.tel);

  /* ---- righe del titolo hero: le particelle corte si uniscono alla parola dopo ---- */
  const raw = String(name).trim().split(/\s+/).filter(Boolean);
  const lines = [];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].length <= 2 && i + 1 < raw.length) { lines.push(raw[i] + ' ' + raw[++i]); }
    else if (raw[i].length <= 2 && lines.length) { lines[lines.length - 1] += ' ' + raw[i]; }
    else lines.push(raw[i]);
  }
  if (!lines.length) lines.push(String(name));

  /* dimensionamento: enorme, ma non sfonda mai in larghezza né in altezza */
  const N = lines.length;
  const L = Math.max(4, ...lines.map(w => w.length));
  const vw = Math.min(13, 152 / L, 60 / N).toFixed(2);
  const minRem = Math.min(3.2, 36.8 / L).toFixed(2);
  const maxRem = Math.min(11, 133.6 / L, N >= 3 ? 28 / N : 11).toFixed(2);

  const heroWords = lines.map((w, i) =>
    `<span class="wl"><span class="w chrome" style="--d:${120 + i * 110}ms;--cd:${(i * -1.1).toFixed(1)}s">${t(w)}</span></span>`
  ).join('');

  /* icona WhatsApp, tracciato unico riutilizzato ovunque */
  const WA_PATH = 'M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.52 3.76 1.44 5.33L2 22l4.95-1.6a9.8 9.8 0 0 0 5.09 1.42h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2m0 17.98h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.1 1 1.03-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.51 3.68-8.18 8.2-8.18 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.4 5.79c0 4.51-3.68 8.19-8.2 8.19m4.5-6.13c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.04-.39-1.99-1.23-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29';
  const waIcon = s => `<svg viewBox="0 0 24 24" aria-hidden="true" width="${s}" height="${s}"><path fill="currentColor" d="${WA_PATH}"/></svg>`;
  const telIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/></svg>';

  /* ---- SVG: berlina bassa di profilo, tratto sottile luminoso, non riempita ---- */
  const carSvg = `
<svg class="car-svg" viewBox="0 0 960 300" role="img" aria-label="Silhouette di una berlina di profilo, disegno al tratto">
  <defs>
    <linearGradient id="obsLine" x1="0" y1="0" x2="960" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6f7480"/>
      <stop offset=".38" stop-color="#e9ecf3"/>
      <stop offset=".58" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#7e8390"/>
    </linearGradient>
    <linearGradient id="obsGlass" x1="200" y1="40" x2="780" y2="140" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#cfe4ff" stop-opacity=".85"/>
      <stop offset="1" stop-color="#cfe4ff" stop-opacity=".18"/>
    </linearGradient>
  </defs>
  <g class="car-g" fill="none" stroke="url(#obsLine)" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <path class="d1" pathLength="1" d="M44 206 L36 176 C38 152 56 142 92 136 L236 118 C286 74 356 50 440 48 L536 48 C622 52 686 76 736 112 L878 140 C918 148 936 160 936 182 L930 206 L794 206 A64 64 0 0 0 666 206 L314 206 A64 64 0 0 0 186 206 Z"/>
    <path class="d2" pathLength="1" stroke="url(#obsGlass)" stroke-width="1.5" d="M250 122 C296 82 360 60 438 58 L534 58 C610 62 668 82 714 114 Z"/>
    <path class="d2" pathLength="1" stroke-width="1.2" d="M462 58 L462 119"/>
    <path class="d3" pathLength="1" stroke-width="1.2" d="M150 130 L640 124 L900 152"/>
    <path class="d3" pathLength="1" stroke-width="1.1" d="M322 188 L658 188"/>
    <circle class="d4" pathLength="1" cx="250" cy="200" r="58"/>
    <circle class="d4" pathLength="1" cx="730" cy="200" r="58"/>
    <circle class="d5" pathLength="1" cx="250" cy="200" r="42" stroke-width="1"/>
    <circle class="d5" pathLength="1" cx="730" cy="200" r="42" stroke-width="1"/>
    <circle class="d5" pathLength="1" cx="250" cy="200" r="20" stroke-width="1.2"/>
    <circle class="d5" pathLength="1" cx="730" cy="200" r="20" stroke-width="1.2"/>
    <path class="d5" pathLength="1" stroke="#cfe4ff" stroke-width="2.8" d="M900 156 L928 163"/>
    <path class="d5" pathLength="1" stroke-width="1.6" d="M42 184 L64 186"/>
    <path class="d6" pathLength="1" stroke-width="1" opacity=".5" d="M0 262 L960 262"/>
  </g>
</svg>`;

  /* ---- servizi ---- */
  const services = c.services.map((s, i) => `
      <article class="svc" data-rise>
        <span class="svc-n">${pad2(i + 1)}</span>
        <h3 class="svc-t">${t(s[0])}</h3>
        <p class="svc-p">${t(s[1])}</p>
        <span class="rule" data-rule></span>
      </article>`).join('');

  /* ---- flotta: la foto sotto, la numerazione in outline sopra ---- */
  const fleet = c.fleet.map((f, i) => `
      <article class="fcard" data-rise tabindex="0">
        <div class="fcard-media">
          <svg class="fcard-glyph" viewBox="0 0 240 80" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M12 56 L8 46 C10 38 18 35 30 33 L74 27 C92 14 118 9 148 9 L182 9 C206 11 222 20 232 32 L234 46 L230 56 L200 56 A18 18 0 0 0 164 56 L86 56 A18 18 0 0 0 50 56 Z"/>
              <circle cx="68" cy="57" r="17"/><circle cx="182" cy="57" r="17"/>
            </g>
          </svg>
          ${shot(fleetPics[i], {
            w: 760, q: 74, cls: 'fcard-img',
            alt: String(f[0]).replace(/'/g, '’') + ' — ' + ((fleetPics[i] && fleetPics[i].alt) || '').toLowerCase(),
            sizes: '(max-width:900px) 78vw, 340px'
          })}
          <span class="fcard-num" aria-hidden="true">${pad2(i + 1)}</span>
          <span class="fcard-sweep" aria-hidden="true"></span>
        </div>
        <div class="fcard-body">
          <span class="fcard-size">${t(f[1])}</span>
          <h3 class="fcard-t">${t(f[0])}</h3>
          <p class="fcard-p">${t(f[2])}</p>
        </div>
      </article>`).join('');

  /* ---- metodo ---- */
  const steps = [
    ['Scrivete.', 'Data, ora, punto di partenza, destinazione. Bastano poche righe.'],
    ['Ricevete il preventivo.', 'Prezzo concordato prima di partire. Nessun costo aggiunto dopo.'],
    ['Salite.', 'L’auto arriva dove avete detto. All’orario che avete detto.']
  ];
  const stepsHtml = steps.map((s, i) => `
      <li class="step" data-rise>
        <span class="step-n">${pad2(i + 1)}</span>
        <div>
          <h3 class="step-t">${t(s[0])}</h3>
          <p class="step-p">${t(s[1])}</p>
        </div>
      </li>`).join('');

  /* ---- faq ---- */
  const faq = c.faq.map((q, i) => `
      <div class="faq-item" data-rise>
        <h3 class="faq-h">
          <button class="faq-q" type="button" id="fq${i}" aria-expanded="false" aria-controls="fa${i}">
            <span>${t(q[0])}</span>
            <span class="faq-i" aria-hidden="true"><i></i><i></i></span>
          </button>
        </h3>
        <div class="faq-a" id="fa${i}" role="region" aria-labelledby="fq${i}">
          <div class="faq-a-in"><p>${t(q[1])}</p></div>
        </div>
      </div>`).join('');

  /* ---- stats (se il voto è già in evidenza non lo si ripete) ---- */
  const stats = (hasRating ? c.stats.slice(1) : c.stats).map(s => `
        <div class="stat">
          <span class="stat-v">${t(s[0])}</span>
          <span class="stat-l">${t(s[1])}</span>
        </div>`).join('');

  const waBtn = (cls, label) => hasWa
    ? `<a class="${cls}" href="${waHref}" target="_blank" rel="noopener" data-magnet>${waIcon(17)}<span>${label}</span></a>`
    : '';

  const html = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${t(c.metaTitle)}</title>
<meta name="description" content="${esc(c.metaDesc)}">
<meta name="theme-color" content="#050505">
<meta name="color-scheme" content="dark">
<meta property="og:title" content="${esc(c.metaTitle)}">
<meta property="og:description" content="${esc(c.metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
/* ============ OBSIDIAN ============ */
:root{
  --ink:#050505;
  --surf:#0d0d10;
  --line:rgba(242,242,244,.13);
  --line-soft:rgba(242,242,244,.07);
  --fg:#f2f2f4;
  --mid:#a6a9b2;
  --dim:#75787f;
  --acc:#cfe4ff;
  --chrome:linear-gradient(100deg,#8a8e98 0%,#d7dae1 16%,#ffffff 30%,#9ba0aa 44%,#eef0f4 58%,#868b95 74%,#e2e5ea 90%,#8a8e98 100%);
  --display:'Oswald','Archivo Narrow','Arial Narrow',system-ui,sans-serif;
  --body:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
  --pad:clamp(18px,5vw,72px);
  --bar:calc(64px + env(safe-area-inset-bottom,0px));
}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
body{
  margin:0;background:var(--ink);color:var(--fg);
  font-family:var(--body);font-size:16px;line-height:1.6;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;overflow-x:clip;
  padding-bottom:var(--bar);
}
@media(min-width:900px){body{padding-bottom:0}}
img,svg{max-width:100%}
h1,h2,h3{margin:0;font-weight:500;line-height:1.1}
p{margin:0}
a{color:inherit;text-decoration:none}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px;border-radius:2px}
::selection{background:var(--acc);color:#050505}

/* ---- fondali ---- */
#mesh{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(58vw 46vw at 78% -8%,rgba(120,132,152,.20),transparent 62%),
    radial-gradient(50vw 42vw at 4% 18%,rgba(70,78,92,.18),transparent 66%),
    radial-gradient(70vw 60vw at 50% 108%,rgba(96,106,124,.16),transparent 64%),
    #050505;}
#beam{position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0;transition:opacity 1.2s ease;
  background:radial-gradient(420px 420px at var(--mx,50%) var(--my,26%),rgba(207,228,255,.13),rgba(207,228,255,.04) 42%,transparent 70%);}
body.ready #beam{opacity:1}
#grain{position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.32;mix-blend-mode:overlay;
  background-repeat:repeat;animation:grainShift 7s steps(5) infinite}
@keyframes grainShift{
  0%{background-position:0 0}20%{background-position:-14px 8px}40%{background-position:9px -12px}
  60%{background-position:-8px -6px}80%{background-position:12px 10px}100%{background-position:0 0}}

/* ---- cursore ---- */
body.cur, body.cur a, body.cur button{cursor:none}
#cur,#curDot{position:fixed;top:0;left:0;z-index:70;pointer-events:none;border-radius:50%;opacity:0;transition:opacity .3s ease}
#cur{width:34px;height:34px;margin:-17px 0 0 -17px;border:1px solid rgba(242,242,244,.55);
  transition:width .25s cubic-bezier(.2,.7,.2,1),height .25s cubic-bezier(.2,.7,.2,1),
             margin .25s cubic-bezier(.2,.7,.2,1),border-color .25s ease,opacity .3s ease,background-color .25s ease}
#curDot{width:4px;height:4px;margin:-2px 0 0 -2px;background:var(--acc)}
body.cur #cur,body.cur #curDot{opacity:1}
body.cur.cur-on #cur{width:66px;height:66px;margin:-33px 0 0 -33px;border-color:var(--acc);background:rgba(207,228,255,.07)}

/* ---- cromo ---- */
.chrome{background:var(--chrome);background-size:300% 100%;
  -webkit-background-clip:text;background-clip:text;
  color:transparent;-webkit-text-fill-color:transparent;
  animation:chromeRun 9s linear infinite;animation-delay:var(--cd,0s)}
@supports not ((-webkit-background-clip:text) or (background-clip:text)){
  .chrome{color:var(--fg);-webkit-text-fill-color:currentColor;background:none;animation:none}
}
@keyframes chromeRun{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.paused .chrome{animation-play-state:paused}

/* ---- fotografia ----
   Trattamento Obsidian: quasi monocromo, contrasto alto, luce fredda, immerso nel nero.
   Ogni contenitore ha sotto un fondo scuro del tema: se la foto non arriva,
   resta comunque una superficie disegnata, mai un buco bianco. */
.ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;
  filter:grayscale(.62) contrast(1.2) brightness(.66) saturate(.72);
  transform:translateZ(0)}
.phw{position:relative;overflow:hidden;
  background:
    radial-gradient(120% 90% at 76% 4%,rgba(207,228,255,.11),transparent 58%),
    linear-gradient(158deg,#17171e 0%,#0a0a0d 46%,#121218 100%)}
.phw::after{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
  background:repeating-linear-gradient(112deg,rgba(242,242,244,.05) 0 1px,transparent 1px 9px);opacity:.5}
/* dissolvenza verso il fondo pagina: mai un bordo netto in basso */
.fade-b{position:absolute;left:0;right:0;bottom:0;top:0;z-index:2;pointer-events:none;
  background:linear-gradient(180deg,rgba(5,5,5,.40) 0%,rgba(5,5,5,.24) 40%,rgba(5,5,5,.80) 82%,#050505 100%)}

/* ---- shell ---- */
.wrap{width:100%;max-width:1320px;margin:0 auto;padding-left:var(--pad);padding-right:var(--pad);position:relative;z-index:2}
section{position:relative;z-index:2}
.sec{padding:clamp(64px,11vw,140px) 0}
.eyebrow{font-family:var(--display);font-size:.72rem;font-weight:500;letter-spacing:.34em;
  text-transform:uppercase;color:var(--dim);display:flex;align-items:center;gap:12px}
.eyebrow::before{content:"";width:26px;height:1px;background:var(--acc);opacity:.7;flex:none}
.sec-h{font-family:var(--display);text-transform:uppercase;letter-spacing:-.035em;line-height:.92;
  font-size:clamp(2.3rem,7.5vw,5.4rem);font-weight:600;margin:18px 0 0}
.sec-lede{color:var(--mid);max-width:46ch;margin-top:16px;font-size:1rem}
.rule{display:block;height:1px;background:linear-gradient(90deg,rgba(242,242,244,.42),rgba(242,242,244,.04));
  transform:scaleX(0);transform-origin:left;transition:transform 1.1s cubic-bezier(.16,.84,.32,1)}
.rule.in{transform:scaleX(1)}

/* rivelazione */
[data-rise]{opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .9s cubic-bezier(.16,.84,.32,1)}
[data-rise].in{opacity:1;transform:none}
.wd{display:inline-block;white-space:nowrap}
.ch{display:inline-block;opacity:0;transform:translateY(.42em);
  transition:opacity .5s ease,transform .7s cubic-bezier(.16,.84,.32,1)}
.split.in .ch{opacity:1;transform:none}

/* ---- header ---- */
header{position:sticky;top:0;z-index:50;background:rgba(5,5,5,.72);
  -webkit-backdrop-filter:blur(14px) saturate(140%);backdrop-filter:blur(14px) saturate(140%);
  border-bottom:1px solid var(--line-soft)}
.hd{display:flex;align-items:center;gap:14px;height:60px}
.mono{width:34px;height:34px;flex:none;display:grid;place-items:center;border:1px solid var(--line);
  font-family:var(--display);font-size:.82rem;letter-spacing:.06em;font-weight:600}
.hd-name{font-family:var(--display);text-transform:uppercase;letter-spacing:.1em;font-size:.82rem;
  font-weight:500;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1}
.hd-name b{display:block;font-weight:400;letter-spacing:.24em;font-size:.6rem;color:var(--dim)}
.hd-cta{display:none}
@media(min-width:900px){
  .hd{height:76px;gap:20px}
  .mono{width:42px;height:42px;font-size:.95rem}
  .hd-name{font-size:1rem;flex:none;max-width:46vw}
  .hd-cta{display:flex;align-items:center;gap:10px;margin-left:auto}
}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-family:var(--display);
  text-transform:uppercase;letter-spacing:.14em;font-size:.76rem;font-weight:500;
  padding:13px 22px;border:1px solid var(--line);color:var(--fg);background:transparent;
  transition:transform .22s cubic-bezier(.2,.7,.2,1),border-color .3s ease,background-color .3s ease,color .3s ease;
  will-change:transform}
.btn:hover{border-color:var(--acc);color:var(--acc)}
.btn-solid{background:var(--acc);color:#050505;border-color:var(--acc);font-weight:600}
.btn-solid:hover{background:#fff;border-color:#fff;color:#050505}
.btn svg{flex:none}

/* ---- hero ---- */
.hero{position:relative;min-height:clamp(600px,92svh,1000px);display:flex;flex-direction:column;
  justify-content:center;padding-top:clamp(28px,5vw,56px);padding-bottom:clamp(40px,8vw,90px);overflow:hidden}
/* foto full-bleed dietro il titolo cromato */
.hero-photo{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;
  background:
    radial-gradient(58vw 46vw at 80% -6%,rgba(126,138,158,.24),transparent 62%),
    radial-gradient(64vw 56vw at 8% 96%,rgba(76,84,100,.20),transparent 66%),
    linear-gradient(168deg,#101016 0%,#050505 52%,#0c0c12 100%)}
.hero-photo .ph{filter:grayscale(.7) contrast(1.24) brightness(.6) saturate(.62);
  transform:scale(1.05);opacity:0;transition:opacity 1.9s ease .25s,transform 2.4s cubic-bezier(.16,.84,.32,1) .25s}
body.ready .hero-photo .ph{opacity:1;transform:scale(1)}
/* il faro del cursore: la stessa foto, meno spenta, rivelata da una maschera radiale */
.hero-lamp{display:none}
.hero-veil{position:absolute;inset:0;z-index:2;pointer-events:none;
  background:
    linear-gradient(102deg,#050505 0%,rgba(5,5,5,.88) 26%,rgba(5,5,5,.48) 54%,rgba(5,5,5,.22) 76%,rgba(5,5,5,.50) 100%),
    linear-gradient(180deg,rgba(5,5,5,.74) 0%,rgba(5,5,5,.30) 26%,rgba(5,5,5,.30) 60%,rgba(5,5,5,.88) 90%,#050505 100%)}
@media(max-width:999px){
  /* mobile: buio sotto il testo, finestra chiara sotto la silhouette */
  .hero-veil{background:
    linear-gradient(180deg,rgba(5,5,5,.86) 0%,rgba(5,5,5,.74) 20%,rgba(5,5,5,.72) 58%,rgba(5,5,5,.24) 80%,rgba(5,5,5,.70) 94%,#050505 100%),
    linear-gradient(96deg,rgba(5,5,5,.52),rgba(5,5,5,.18) 68%,rgba(5,5,5,.40))}
}
@media(min-width:1000px) and (hover:hover) and (pointer:fine){
  @supports ((-webkit-mask-image:radial-gradient(#000,transparent)) or (mask-image:radial-gradient(#000,transparent))){
    .hero-lamp{display:block;position:absolute;inset:0;z-index:1;pointer-events:none;opacity:0;
      transition:opacity 1.4s ease;
      background-image:var(--lamp,none);background-size:cover;background-position:center;
      filter:grayscale(.34) contrast(1.06) brightness(1.28) saturate(.95);
      -webkit-mask-image:radial-gradient(circle 380px at var(--hx,50%) var(--hy,42%),#000 0%,rgba(0,0,0,.66) 38%,transparent 76%);
      mask-image:radial-gradient(circle 380px at var(--hx,50%) var(--hy,42%),#000 0%,rgba(0,0,0,.66) 38%,transparent 76%)}
    body.ready.cur .hero-lamp{opacity:1}
  }
}
.hero-kick{margin-bottom:clamp(20px,4vw,34px)}
.hero-name{font-family:var(--display);font-weight:600;text-transform:uppercase;
  letter-spacing:-.045em;line-height:.86;margin:0;
  font-size:clamp(${minRem}rem,${vw}vw,${maxRem}rem)}
.wl{display:block;overflow:hidden;padding-bottom:.05em;margin-bottom:-.02em}
.wl .w{display:block;white-space:nowrap;transform:translateY(106%);
  transition:transform 1.15s cubic-bezier(.16,.84,.32,1);transition-delay:var(--d,0ms)}
body.ready .wl .w{transform:translateY(0)}
.hero-sub{font-family:var(--display);text-transform:uppercase;letter-spacing:.02em;
  font-size:clamp(1.05rem,3.6vw,1.9rem);font-weight:300;color:var(--fg);
  margin-top:clamp(16px,3vw,22px);line-height:1.12;max-width:20ch;
  text-shadow:0 1px 22px rgba(5,5,5,.92)}
.hero-sub b{font-weight:500;color:var(--acc)}
.hero-lede{color:var(--mid);margin-top:18px;max-width:42ch;font-size:1rem;
  text-shadow:0 1px 20px rgba(5,5,5,.94)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(22px,4vw,30px)}
.hero-copy{max-width:46ch}
.hero-copy>*{opacity:0;transform:translateY(18px);
  transition:opacity .8s ease,transform .9s cubic-bezier(.16,.84,.32,1);transition-delay:var(--hd,0ms)}
.hero-sub{--hd:520ms}.hero-lede{--hd:660ms}.hero-cta{--hd:800ms}
body.ready .hero-copy>*{opacity:1;transform:none}
@media(min-width:1000px){.hero-copy{max-width:min(500px,48%)}}
.hero-stage{position:relative;margin-top:clamp(22px,5vw,34px);pointer-events:none}
@media(min-width:1000px){
  .hero-stage{position:absolute;right:0;bottom:clamp(48px,10vh,120px);
    width:min(58vw,780px);max-width:none;margin:0;padding:0;z-index:2}
  .hero{padding-bottom:clamp(90px,16vh,190px)}
}
.car{transform:translate3d(calc(16% + var(--px,0px)),var(--py,0px),0);opacity:0;
  transition:transform 1.7s cubic-bezier(.16,.84,.32,1),opacity 1.2s ease}
body.ready .car{transform:translate3d(var(--px,0px),var(--py,0px),0);opacity:1}
.car-svg{width:100%;height:auto;display:block;
  filter:drop-shadow(0 0 18px rgba(207,228,255,.16)) drop-shadow(0 0 3px rgba(255,255,255,.14))}
.car-g path,.car-g circle{stroke-dasharray:1;stroke-dashoffset:1}
.car.drawn .car-g path,.car.drawn .car-g circle{animation:draw 1.9s cubic-bezier(.5,0,.2,1) forwards}
.car.drawn .d2{animation-delay:.5s}.car.drawn .d3{animation-delay:.75s}
.car.drawn .d4{animation-delay:.35s}.car.drawn .d5{animation-delay:1s}.car.drawn .d6{animation-delay:.15s}
@keyframes draw{to{stroke-dashoffset:0}}
.scroll-hint{display:none}
@media(min-width:900px){
  .scroll-hint{display:flex;align-items:center;gap:10px;position:absolute;left:var(--pad);bottom:26px;
    font-family:var(--display);font-size:.66rem;letter-spacing:.32em;text-transform:uppercase;color:var(--dim)}
  .scroll-hint span{display:block;width:52px;height:1px;background:var(--dim);overflow:hidden;position:relative}
  .scroll-hint span::after{content:"";position:absolute;inset:0;background:var(--acc);
    transform:translateX(-100%);animation:hintRun 2.6s ease-in-out infinite}
}
@keyframes hintRun{0%{transform:translateX(-100%)}55%,100%{transform:translateX(100%)}}

/* ---- fascia prova ---- */
.proof{border-top:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);
  background:linear-gradient(180deg,rgba(13,13,16,.9),rgba(5,5,5,.9))}
.proof-in{display:grid;gap:26px;padding:clamp(28px,6vw,48px) 0}
@media(min-width:820px){.proof-in{grid-template-columns:1.1fr 1fr;align-items:center;gap:48px}}
.gscore{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.gscore-v{font-family:var(--display);font-size:clamp(2.6rem,9vw,3.8rem);line-height:.9;font-weight:600;letter-spacing:-.03em}
.gstars{display:flex;gap:3px;color:var(--acc)}
.gscore-l{font-size:.86rem;color:var(--mid)}
.gscore-l b{color:var(--fg);font-weight:500}
.stats{display:flex;flex-wrap:wrap;gap:22px 34px}
.stat{min-width:88px}
.stat-v{display:block;font-family:var(--display);font-size:1.55rem;font-weight:500;letter-spacing:-.02em;line-height:1}
.stat-l{display:block;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-top:7px}
.pclaim{border-left:1px solid var(--line);padding-left:20px}
.pclaim h3{font-family:var(--display);text-transform:uppercase;letter-spacing:.04em;font-size:1.35rem;font-weight:500}
.pclaim p{color:var(--mid);font-size:.94rem;margin-top:6px}

/* ---- servizi ---- */
.svc-grid{display:grid;gap:0;margin-top:clamp(34px,6vw,58px);border-top:1px solid var(--line-soft)}
@media(min-width:760px){.svc-grid{grid-template-columns:1fr 1fr;column-gap:clamp(28px,5vw,72px)}}
.svc{padding:clamp(24px,4vw,38px) 0;position:relative}
.svc-n{font-family:var(--display);font-size:.7rem;letter-spacing:.26em;color:var(--acc);opacity:.8}
.svc-t{font-family:var(--display);text-transform:uppercase;letter-spacing:-.01em;
  font-size:clamp(1.35rem,4.4vw,1.95rem);font-weight:500;margin-top:10px;transition:color .3s ease}
.svc:hover .svc-t{color:var(--acc)}
.svc-p{color:var(--mid);margin-top:10px;font-size:.95rem;max-width:40ch}
.svc .rule{margin-top:clamp(22px,4vw,34px)}
/* inserto fotografico dentro i servizi */
.inset{position:relative;margin:clamp(30px,5vw,54px) 0 0;padding:0}
.inset-media{position:relative;aspect-ratio:21/9;min-height:210px;border:1px solid var(--line-soft)}
@media(max-width:640px){.inset-media{aspect-ratio:4/3}}
.inset-glyph{position:absolute;right:2%;top:9%;width:min(54%,520px);height:auto;
  color:rgba(242,242,244,.44);z-index:0}
.inset-media .ph{filter:grayscale(.72) contrast(1.26) brightness(.5) saturate(.6);
  transform:scale(1.06);transition:transform 1.6s cubic-bezier(.16,.84,.32,1)}
.inset.in .inset-media .ph{transform:scale(1)}
.inset-cap{position:absolute;left:0;right:0;bottom:0;z-index:4;
  padding:clamp(16px,3vw,28px);display:flex;flex-direction:column;gap:8px}
.inset-k{font-family:var(--display);font-size:.64rem;letter-spacing:.3em;text-transform:uppercase;color:var(--acc)}
.inset-cap p{font-family:var(--display);text-transform:uppercase;letter-spacing:-.01em;line-height:1.06;
  font-size:clamp(1.2rem,3.6vw,2.1rem);font-weight:500;max-width:22ch;
  text-shadow:0 2px 24px rgba(5,5,5,.9)}

/* ---- flotta ---- */
.fleet-head{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
.rail-nav{display:none}
@media(min-width:900px){.rail-nav{display:flex;gap:8px}}
.rail-btn{width:46px;height:46px;border:1px solid var(--line);background:transparent;color:var(--fg);
  display:grid;place-items:center;transition:border-color .3s ease,color .3s ease,background-color .3s ease}
.rail-btn:hover{border-color:var(--acc);color:var(--acc)}
.rail{display:flex;gap:clamp(12px,2.4vw,22px);margin:clamp(30px,5vw,52px) calc(var(--pad) * -1) 0;
  padding:0 var(--pad) 18px;scroll-padding-left:var(--pad);
  overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
  scrollbar-width:thin;scrollbar-color:rgba(242,242,244,.22) transparent}
.rail::-webkit-scrollbar{height:3px}
.rail::-webkit-scrollbar-thumb{background:rgba(242,242,244,.24)}
.fcard{flex:0 0 auto;width:min(78vw,340px);scroll-snap-align:start;background:var(--surf);
  border:1px solid var(--line-soft);display:flex;flex-direction:column;min-height:clamp(420px,64vh,540px);
  transition:opacity .8s ease,transform .9s cubic-bezier(.16,.84,.32,1),border-color .35s ease}
.fcard:hover,.fcard:focus-visible{border-color:rgba(207,228,255,.4)}
.fcard-media{position:relative;flex:none;height:clamp(210px,32vh,300px);overflow:hidden;
  background:
    radial-gradient(120% 90% at 78% 6%,rgba(207,228,255,.14),transparent 60%),
    linear-gradient(160deg,#191920 0%,#0b0b0e 52%,#141419 100%)}
.fcard-media::after{content:"";position:absolute;inset:0;z-index:4;
  background:repeating-linear-gradient(112deg,rgba(242,242,244,.05) 0 1px,transparent 1px 9px);opacity:.55}
/* la foto della vettura, sotto la numerazione */
.fcard-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;
  filter:grayscale(.66) contrast(1.22) brightness(.62) saturate(.7);
  transition:transform 1.1s cubic-bezier(.16,.84,.32,1),filter .5s ease}
.fcard:hover .fcard-img,.fcard:focus-visible .fcard-img{transform:scale(1.05);
  filter:grayscale(.4) contrast(1.16) brightness(.8) saturate(.85)}
/* dissolvenza verso il corpo della card: la foto non ha bordo netto in basso */
.fcard-media::before{content:"";position:absolute;inset:0;z-index:3;
  background:
    linear-gradient(180deg,rgba(5,5,5,.10) 0%,rgba(5,5,5,.06) 38%,rgba(5,5,5,.66) 78%,rgba(13,13,16,.98) 100%),
    radial-gradient(110% 80% at 82% 2%,rgba(207,228,255,.13),transparent 62%)}
.fcard-num{position:absolute;left:-.06em;bottom:-.3em;font-family:var(--display);font-weight:700;
  font-size:clamp(6.5rem,20vw,9.5rem);line-height:.8;letter-spacing:-.06em;color:transparent;
  -webkit-text-stroke:1px rgba(242,242,244,.42);z-index:5;
  text-shadow:0 0 26px rgba(5,5,5,.75)}
.fcard-glyph{position:absolute;right:6%;top:50%;transform:translateY(-46%);width:76%;color:rgba(242,242,244,.5);z-index:1;
  transition:transform .6s cubic-bezier(.16,.84,.32,1)}
.fcard:hover .fcard-glyph{transform:translateY(-46%) translateX(-4%)}
.fcard-sweep{position:absolute;top:-30%;bottom:-30%;width:34%;left:-40%;z-index:6;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.13),transparent);transform:skewX(-16deg)}
.fcard:hover .fcard-sweep{animation:sweep 1s ease forwards}
@keyframes sweep{to{left:120%}}
.fcard-body{flex:1;padding:clamp(18px,3vw,26px);border-top:1px solid var(--line-soft)}
.fcard-size{font-family:var(--display);font-size:.66rem;letter-spacing:.26em;text-transform:uppercase;color:var(--acc)}
.fcard-t{font-family:var(--display);text-transform:uppercase;font-size:clamp(1.3rem,4vw,1.7rem);
  font-weight:500;letter-spacing:-.01em;margin-top:9px}
.fcard-p{color:var(--mid);font-size:.92rem;margin-top:9px}
.rail-note{font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;color:var(--dim);margin-top:6px}

/* ---- fascia atmosferica notturna, a tutta larghezza ---- */
.band{position:relative;z-index:2;min-height:clamp(340px,58vh,620px);display:flex;align-items:flex-end;
  padding:clamp(48px,10vw,110px) 0 clamp(38px,7vw,78px);overflow:hidden;
  background:linear-gradient(180deg,#050505,#0a0a0f 40%,#050505)}
.band-media{position:absolute;inset:0;z-index:0;overflow:hidden;
  background:
    radial-gradient(70vw 50vw at 24% 12%,rgba(120,132,152,.20),transparent 62%),
    radial-gradient(60vw 60vw at 84% 88%,rgba(207,228,255,.09),transparent 64%),
    linear-gradient(170deg,#0d0d13,#050505 58%,#0b0b11)}
.band-media .ph{filter:grayscale(.68) contrast(1.32) brightness(.52) saturate(.66)}
/* si fonde nel nero sopra e sotto: nessun bordo netto */
.band-media::after{content:"";position:absolute;inset:0;
  background:
    linear-gradient(180deg,#050505 0%,rgba(5,5,5,.62) 16%,rgba(5,5,5,.30) 46%,rgba(5,5,5,.78) 84%,#050505 100%),
    linear-gradient(90deg,rgba(5,5,5,.86) 0%,rgba(5,5,5,.18) 40%,rgba(5,5,5,.22) 68%,rgba(5,5,5,.80) 100%)}
.band-line{position:absolute;left:0;right:0;top:0;height:1px;z-index:1;
  background:linear-gradient(90deg,transparent,rgba(207,228,255,.42),transparent)}
.band-in{position:relative;z-index:2;width:100%}
.band-t{font-family:var(--display);text-transform:uppercase;font-weight:600;letter-spacing:-.035em;
  line-height:.94;font-size:clamp(2rem,6.4vw,4.6rem);margin:16px 0 0;max-width:16ch}
.band-p{color:var(--mid);margin-top:16px;max-width:40ch;font-size:.98rem;
  text-shadow:0 1px 18px rgba(5,5,5,.9)}
.band-meta{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:clamp(20px,4vw,32px);
  font-family:var(--display);font-size:.68rem;letter-spacing:.28em;text-transform:uppercase;color:var(--mid)}
.band-meta span{display:flex;align-items:center;gap:9px}
.band-meta span::before{content:"";width:5px;height:5px;background:var(--acc);flex:none}

/* ---- metodo ---- */
.method{background:linear-gradient(180deg,#050505,#0b0b0e 45%,#050505)}
.steps{list-style:none;padding:0;margin:clamp(32px,5vw,56px) 0 0;display:grid;gap:0}
.step{display:flex;gap:clamp(16px,3vw,32px);padding:clamp(22px,3.6vw,34px) 0;border-top:1px solid var(--line-soft);align-items:flex-start}
.step:last-child{border-bottom:1px solid var(--line-soft)}
@media(min-width:840px){
  .steps{grid-template-columns:repeat(3,1fr);column-gap:clamp(24px,4vw,64px)}
  .step{flex-direction:column;gap:14px;padding:clamp(24px,3vw,34px) 0 0;border-bottom:0}
  .step-t{min-height:2.2em}
  .step:last-child{border-bottom:0}
}
.step-n{font-family:var(--display);font-size:clamp(2rem,6vw,3.2rem);line-height:.9;font-weight:600;
  color:transparent;-webkit-text-stroke:1px rgba(207,228,255,.5);flex:none;letter-spacing:-.04em}
.step-t{font-family:var(--display);text-transform:uppercase;font-size:clamp(1.3rem,4vw,1.9rem);font-weight:500;letter-spacing:-.01em}
.step-p{color:var(--mid);margin-top:8px;font-size:.95rem;max-width:44ch}

/* ---- zona ---- */
.zone-grid{display:grid;gap:clamp(28px,5vw,60px);margin-top:clamp(28px,5vw,48px);align-items:center}
@media(min-width:860px){.zone-grid{grid-template-columns:1fr 1fr}}
.zone-card{border:1px solid var(--line-soft);background:var(--surf);padding:clamp(20px,4vw,34px)}
.zone-row{display:flex;gap:14px;padding:15px 0;border-bottom:1px solid var(--line-soft);align-items:baseline}
.zone-row:last-child{border-bottom:0;padding-bottom:0}
.zone-k{font-family:var(--display);font-size:.66rem;letter-spacing:.26em;text-transform:uppercase;color:var(--dim);flex:none;width:98px}
.zone-v{font-size:.98rem}
.radar{position:relative;aspect-ratio:1;max-width:460px;margin:0 auto;width:100%}
.radar svg{width:100%;height:100%;display:block;position:relative;z-index:1}
/* dentro il radar: la strada, sprofondata nel nero e ritagliata in cerchio */
.radar-photo{position:absolute;inset:7%;z-index:0;border-radius:50%;overflow:hidden;
  background:radial-gradient(circle at 38% 28%,#191921,#08080b 72%)}
.radar-photo .ph{filter:grayscale(.82) contrast(1.3) brightness(.46) saturate(.5)}
.radar-photo::after{content:"";position:absolute;inset:0;
  background:radial-gradient(circle,rgba(5,5,5,.10) 30%,rgba(5,5,5,.60) 66%,#050505 100%)}
.radar-label{position:absolute;inset:0;display:grid;place-items:center;text-align:center;pointer-events:none}
.radar-label span{font-family:var(--display);text-transform:uppercase;letter-spacing:.02em;
  font-size:clamp(1.5rem,5vw,2.6rem);font-weight:600;letter-spacing:-.02em}
.radar-label b{display:block;font-family:var(--body);font-size:.62rem;letter-spacing:.3em;color:var(--dim);font-weight:400;margin-top:8px}
.pulse{transform-origin:center;animation:pulse 4.6s ease-out infinite}
.pulse2{animation-delay:1.5s}.pulse3{animation-delay:3s}
@keyframes pulse{0%{transform:scale(.28);opacity:0}18%{opacity:.65}100%{transform:scale(1);opacity:0}}
.paused .pulse{animation-play-state:paused}

/* ---- faq ---- */
.faq-list{margin-top:clamp(28px,5vw,48px);border-top:1px solid var(--line-soft)}
.faq-item{border-bottom:1px solid var(--line-soft)}
.faq-h{margin:0}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:18px;
  background:transparent;border:0;color:var(--fg);text-align:left;padding:clamp(18px,3vw,26px) 0;
  font-family:var(--display);text-transform:uppercase;letter-spacing:.01em;
  font-size:clamp(1.02rem,3.2vw,1.32rem);font-weight:500;transition:color .3s ease}
.faq-q:hover{color:var(--acc)}
.faq-i{position:relative;width:16px;height:16px;flex:none}
.faq-i i{position:absolute;background:var(--acc);transition:transform .35s cubic-bezier(.16,.84,.32,1),opacity .3s ease}
.faq-i i:first-child{left:0;right:0;top:7.5px;height:1px}
.faq-i i:last-child{top:0;bottom:0;left:7.5px;width:1px}
.faq-q[aria-expanded="true"] .faq-i i:last-child{transform:scaleY(0);opacity:0}
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s cubic-bezier(.16,.84,.32,1)}
.faq-a.open{grid-template-rows:1fr}
.faq-a-in{overflow:hidden;visibility:hidden;transition:visibility 0s linear .4s}
.faq-a.open .faq-a-in{visibility:visible;transition-delay:0s}
.faq-a p{color:var(--mid);font-size:.95rem;max-width:62ch;padding-bottom:clamp(18px,3vw,26px)}

/* ---- contatti ---- */
.contact{border-top:1px solid var(--line-soft);overflow:hidden;
  background:radial-gradient(80vw 50vw at 50% 0%,rgba(207,228,255,.09),transparent 66%),#050505}
.contact-photo{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;
  background:radial-gradient(80vw 50vw at 50% 0%,rgba(207,228,255,.10),transparent 66%),#050505}
.contact-photo .ph{filter:grayscale(.78) contrast(1.28) brightness(.34) saturate(.55)}
.contact-photo::after{content:"";position:absolute;inset:0;
  background:
    linear-gradient(180deg,#050505 0%,rgba(5,5,5,.74) 22%,rgba(5,5,5,.82) 60%,#050505 100%),
    radial-gradient(70vw 44vw at 50% 4%,rgba(207,228,255,.11),transparent 64%)}
.contact-h{font-family:var(--display);text-transform:uppercase;font-weight:600;letter-spacing:-.045em;
  line-height:.88;font-size:clamp(2.8rem,13vw,8rem);margin:16px 0 0}
.contact-lede{color:var(--mid);margin-top:20px;max-width:38ch}
.contact-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.contact-grid{display:grid;gap:0;margin-top:clamp(40px,7vw,72px);border-top:1px solid var(--line-soft)}
@media(min-width:760px){.contact-grid{grid-template-columns:repeat(3,1fr);column-gap:clamp(24px,4vw,56px)}}
.cinfo{padding:22px 0;border-bottom:1px solid var(--line-soft)}
@media(min-width:760px){.cinfo{border-bottom:0}}
.cinfo-k{font-family:var(--display);font-size:.64rem;letter-spacing:.28em;text-transform:uppercase;color:var(--dim)}
.cinfo-v{display:block;margin-top:9px;font-family:var(--display);font-size:clamp(1.05rem,3.2vw,1.3rem);
  letter-spacing:.01em;transition:color .3s ease}
a.cinfo-v:hover{color:var(--acc)}

/* ---- footer ---- */
footer{border-top:1px solid var(--line-soft);padding:34px 0 40px;background:#040404}
.ft{display:flex;flex-wrap:wrap;gap:16px 24px;align-items:center;justify-content:space-between}
.ft-b{font-family:var(--display);text-transform:uppercase;letter-spacing:.14em;font-size:.8rem}
.ft-b b{display:block;font-weight:400;letter-spacing:.24em;font-size:.6rem;color:var(--dim);margin-top:4px}
.ft-u{font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dim)}
.ft-u b{color:var(--mid);font-weight:500}

/* ---- barra mobile ---- */
.mbar{position:fixed;left:0;right:0;bottom:0;z-index:80;display:flex;gap:1px;
  background:var(--line);border-top:1px solid var(--line);
  padding-bottom:env(safe-area-inset-bottom,0px);
  -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
@media(min-width:900px){.mbar{display:none}}
.mbar a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;height:64px;
  background:#0a0a0d;font-family:var(--display);text-transform:uppercase;letter-spacing:.16em;
  font-size:.74rem;font-weight:500}
.mbar a.pri{background:var(--acc);color:#050505;font-weight:600}

@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
    transition-duration:.001ms!important;scroll-behavior:auto!important}
  #grain{animation:none}
  .car{opacity:1;transform:none}
  .wl .w{transform:none}
  .hero-photo .ph{opacity:1;transform:none}
  .inset-media .ph{transform:none}
  .hero-lamp{display:none!important}
  [data-rise],.hero-copy>*{opacity:1;transform:none}
  .ch{opacity:1;transform:none}
  .rule{transform:scaleX(1)}
  .car-g path,.car-g circle{stroke-dashoffset:0}
}
</style>
</head>
<body>
<div id="mesh" aria-hidden="true"></div>
<div id="beam" aria-hidden="true"></div>
<div id="grain" aria-hidden="true"></div>

<header>
  <div class="wrap hd">
    <span class="mono" aria-hidden="true">${t(monogram(name))}</span>
    <div class="hd-name">${t(name)}<b>${t(city)}</b></div>
    <div class="hd-cta">
      <a class="btn" href="${telHref}" data-magnet>${t(lead.phoneDisplay)}</a>
      ${hasWa ? `<a class="btn btn-solid" href="${waHref}" target="_blank" rel="noopener" data-magnet>Scrivi ora</a>` : ''}
    </div>
  </div>
</header>

<main>
  <section class="hero" id="top"${heroPic ? ` style="--lamp:${esc(shotCss(heroPic, 1900, 72))}"` : ''}>
    <div class="hero-photo">
      ${shot(heroPic, {
        w: 1900, q: 72, cls: 'ph', eager: true, sizes: '100vw',
        alt: (heroPic && heroPic.alt ? heroPic.alt : 'Vettura di rappresentanza') + ' — ' + String(name).replace(/'/g, '’')
      })}
    </div>
    <div class="hero-lamp" aria-hidden="true"></div>
    <div class="hero-veil" aria-hidden="true"></div>
    <div class="wrap">
      <div class="hero-inner">
        <p class="eyebrow hero-kick">${t(c.kicker)} &middot; ${t(city)}</p>
        <h1 class="hero-name">${heroWords}</h1>
        <div class="hero-copy">
          <p class="hero-sub">${t(c.heroA)} <b>${t(c.heroB)}</b></p>
          <p class="hero-lede">${t(c.lede)}</p>
          <div class="hero-cta">
            ${waBtn('btn btn-solid', 'Preventivo WhatsApp')}
            <a class="btn${hasWa ? '' : ' btn-solid'}" href="${telHref}" data-magnet>${telIcon}<span>Chiama ora</span></a>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap hero-stage">
      <div class="car" id="car">${carSvg}</div>
    </div>
    <div class="scroll-hint" aria-hidden="true">Scorri <span></span></div>
  </section>

  <section class="proof" aria-label="Riscontri verificabili">
    <div class="wrap proof-in">
      <div data-rise>
        ${hasRating ? `<div class="gscore">
          <span class="gscore-v chrome">${t(lead.rating)}</span>
          <div>
            <div class="gstars" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
              <svg width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="m12 2 2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z"/></svg>
            </div>
            <p class="gscore-l">Valutazione <b>Google</b></p>
          </div>
        </div>` : `<div class="gscore"><span class="gscore-v chrome">${t(city)}</span><p class="gscore-l">Zona operativa</p></div>`}
        <div class="stats" style="margin-top:26px">${stats}</div>
      </div>
      <div class="pclaim" data-rise>
        <h3>${t(c.proof[0])}</h3>
        <p>${t(c.proof[1])}</p>
        <p style="margin-top:14px;color:var(--dim);font-size:.8rem;letter-spacing:.16em;text-transform:uppercase">${t(lead.category)}</p>
      </div>
    </div>
  </section>

  <section class="sec" id="servizi">
    <div class="wrap">
      <p class="eyebrow">01 &mdash; Servizi</p>
      <h2 class="sec-h split">Cosa si può chiedere</h2>
      <p class="sec-lede">Dite l&rsquo;occasione. Il resto lo organizziamo noi.</p>
      <div class="svc-grid">${services}</div>
      ${insetPic ? `<figure class="inset" data-rise>
        <div class="inset-media phw">
          <svg class="inset-glyph" viewBox="0 0 600 260" aria-hidden="true">
            <g fill="none" stroke="currentColor" stroke-linecap="round">
              <path stroke-width="1.1" d="M0 168 L600 138"/>
              <path stroke-width="1" opacity=".6" d="M0 182 L600 152"/>
              <circle cx="432" cy="140" r="92" stroke-width="1.3"/>
              <circle cx="432" cy="140" r="34" stroke-width="1.1"/>
              <path stroke-width="1.1" d="M398 140 L340 140 M466 140 L524 140 M432 174 L432 232"/>
              <path stroke-width="1" opacity=".55" d="M56 92 L232 84 M56 110 L188 103 M56 128 L206 120"/>
              <path stroke-width="1" opacity=".4" d="M262 40 L562 22"/>
            </g>
          </svg>
          ${shot(insetPic, { w: 1500, q: 74, cls: 'ph', sizes: '(max-width:900px) 100vw, 1200px' })}
          <span class="fade-b" aria-hidden="true"></span>
        </div>
        <figcaption class="inset-cap">
          <span class="inset-k">A bordo</span>
          <p>Musica, silenzio o due chiamate di lavoro. Decidete voi.</p>
        </figcaption>
      </figure>` : ''}
    </div>
  </section>

  <section class="sec" id="flotta" style="padding-top:0">
    <div class="wrap">
      <div class="fleet-head">
        <div>
          <p class="eyebrow">02 &mdash; Flotta</p>
          <h2 class="sec-h split">Scegliete l&rsquo;auto</h2>
        </div>
        <div class="rail-nav">
          <button class="rail-btn" type="button" id="railPrev" aria-label="Vettura precedente" aria-controls="rail">
            <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="m14.5 5-7 7 7 7"/></svg>
          </button>
          <button class="rail-btn" type="button" id="railNext" aria-label="Vettura successiva" aria-controls="rail">
            <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="m9.5 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
      <div class="rail" id="rail" tabindex="0" role="group" aria-label="Vetture disponibili, scorrimento orizzontale">${fleet}</div>
      <p class="rail-note">Trascinate per vedere tutte le vetture</p>
    </div>
  </section>

  <section class="band" aria-label="La notte">
    <div class="band-media">
      ${shot(nightPic, { w: 2000, q: 70, cls: 'ph', sizes: '100vw' })}
    </div>
    <span class="band-line" aria-hidden="true"></span>
    <div class="wrap band-in">
      <p class="eyebrow">Fuori orario</p>
      <p class="band-t chrome">Nero su nero.<br>Il resto è strada.</p>
      <p class="band-p">Data e orario li scegliete voi. Il prezzo lo sapete prima di salire.</p>
      <div class="band-meta" aria-hidden="true">
        <span>${t(city)}</span><span>${t(c.kicker)}</span><span>Su prenotazione</span>
      </div>
    </div>
  </section>

  <section class="sec method" id="metodo">
    <div class="wrap">
      <p class="eyebrow">03 &mdash; Metodo</p>
      <h2 class="sec-h split">Tre passaggi</h2>
      <ol class="steps">${stepsHtml}</ol>
    </div>
  </section>

  <section class="sec" id="zona">
    <div class="wrap">
      <p class="eyebrow">04 &mdash; Zona operativa</p>
      <h2 class="sec-h split">Si parte da ${t(city)}</h2>
      <div class="zone-grid">
        <div class="radar" data-rise>
          <div class="radar-photo">
            ${shot(roadPic, { w: 900, q: 74, cls: 'ph', sizes: '(max-width:860px) 90vw, 460px' })}
          </div>
          <svg viewBox="0 0 400 400" aria-hidden="true">
            <g fill="none" stroke="rgba(242,242,244,.14)" stroke-width="1">
              <circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="110"/>
              <circle cx="200" cy="200" r="160"/><circle cx="200" cy="200" r="196"/>
              <path d="M200 4 L200 396 M4 200 L396 200"/>
              <path d="M61 61 L339 339 M339 61 L61 339" stroke="rgba(242,242,244,.07)"/>
            </g>
            <g fill="none" stroke="#cfe4ff" stroke-width="1.2">
              <circle class="pulse" cx="200" cy="200" r="190"/>
              <circle class="pulse pulse2" cx="200" cy="200" r="190"/>
              <circle class="pulse pulse3" cx="200" cy="200" r="190"/>
            </g>
            <g fill="#cfe4ff">
              <circle cx="200" cy="200" r="4"/>
              <circle cx="286" cy="126" r="2.2" opacity=".65"/><circle cx="122" cy="252" r="2.2" opacity=".65"/>
              <circle cx="262" cy="292" r="2.2" opacity=".5"/><circle cx="128" cy="132" r="2.2" opacity=".5"/>
            </g>
          </svg>
          <div class="radar-label" aria-hidden="true"><div><span class="chrome">${t(city)}</span><b>Base operativa</b></div></div>
        </div>
        <div class="zone-card" data-rise>
          <div class="zone-row"><span class="zone-k">Città</span><span class="zone-v">${t(city)}</span></div>
          ${lead.address ? `<div class="zone-row"><span class="zone-k">Indirizzo</span><span class="zone-v">${t(lead.address)}</span></div>` : ''}
          <div class="zone-row"><span class="zone-k">Servizio</span><span class="zone-v">${t(c.kicker)}</span></div>
          <div class="zone-row"><span class="zone-k">Categoria</span><span class="zone-v">${t(lead.category)}</span></div>
          <div class="zone-row"><span class="zone-k">Contatto</span><span class="zone-v"><a href="${telHref}">${t(lead.phoneDisplay)}</a></span></div>
          <p style="color:var(--mid);font-size:.94rem;margin-top:20px">Partenze da ${t(city)} e dintorni. La destinazione la decidete voi: ditecela e ricevete il preventivo.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec" id="domande">
    <div class="wrap">
      <p class="eyebrow">05 &mdash; Domande</p>
      <h2 class="sec-h split">Risposte secche</h2>
      <div class="faq-list">${faq}</div>
    </div>
  </section>

  <section class="sec contact" id="contatti">
    <div class="contact-photo">
      ${shot(closePic, { w: 1800, q: 70, cls: 'ph', sizes: '100vw' })}
    </div>
    <div class="wrap">
      <p class="eyebrow">06 &mdash; Contatto</p>
      <h2 class="contact-h chrome">${hasWa ? 'Scriveteci' : 'Chiamateci'}</h2>
      <p class="contact-lede">Data, ora, partenza, destinazione. ${hasWa ? 'Un messaggio basta.' : 'Una telefonata basta.'}</p>
      <div class="contact-cta">
        ${waBtn('btn btn-solid', 'Apri WhatsApp')}
        <a class="btn${hasWa ? '' : ' btn-solid'}" href="${telHref}" data-magnet>${telIcon}<span>${t(lead.phoneDisplay)}</span></a>
      </div>
      <div class="contact-grid">
        <div class="cinfo">
          <span class="cinfo-k">Telefono</span>
          <a class="cinfo-v" href="${telHref}">${t(lead.phoneDisplay)}</a>
        </div>
        ${hasWa ? `<div class="cinfo">
          <span class="cinfo-k">WhatsApp</span>
          <a class="cinfo-v" href="${waHref}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp a ${esc(name)}">Scrivi ora</a>
        </div>` : ''}
        <div class="cinfo">
          <span class="cinfo-k">Dove siamo</span>
          <span class="cinfo-v">${lead.address ? t(lead.address) + ' &middot; ' : ''}${t(city)}</span>
        </div>
      </div>
    </div>
  </section>
</main>

<footer>
  <div class="wrap ft">
    <div class="ft-b">${t(name)}<b>${t(c.kicker)} &middot; ${t(city)}</b></div>
    <p class="ft-u">Anteprima realizzata da <b>Umbra</b></p>
  </div>
</footer>

<nav class="mbar" aria-label="Contatti rapidi">
  ${hasWa ? `<a class="pri" href="${waHref}" target="_blank" rel="noopener" aria-label="Scrivi su WhatsApp">${waIcon(17)}WhatsApp</a>` : ''}
  <a href="${telHref}" ${hasWa ? '' : 'class="pri" '}aria-label="Chiama ${esc(lead.phoneDisplay)}">${telIcon}Chiama</a>
</nav>

<div id="cur" aria-hidden="true"></div>
<div id="curDot" aria-hidden="true"></div>

<script>
(function(){
  var doc = document, body = doc.body;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  function init(){

    /* ---------- grana su canvas ---------- */
    try{
      var g = doc.getElementById('grain'), n = doc.createElement('canvas');
      n.width = n.height = 140;
      var nx = n.getContext('2d'), im = nx.createImageData(140,140), d = im.data;
      for (var i=0;i<d.length;i+=4){ var v = (Math.random()*255)|0; d[i]=d[i+1]=d[i+2]=v; d[i+3]=30; }
      nx.putImageData(im,0,0);
      g.style.backgroundImage = 'url(' + n.toDataURL('image/png') + ')';
    }catch(e){}

    /* ---------- titoli lettera per lettera (le parole non si spezzano) ---------- */
    var splits = doc.querySelectorAll('.split');
    for (var s=0;s<splits.length;s++){
      var el = splits[s];
      var wordsTxt = el.textContent.trim().split(/\\s+/);
      var frag = doc.createDocumentFragment(), k = 0;
      for (var wi=0; wi<wordsTxt.length; wi++){
        var word = doc.createElement('span');
        word.className = 'wd';
        for (var ci=0; ci<wordsTxt[wi].length; ci++){
          var sp = doc.createElement('span');
          sp.className = 'ch'; sp.textContent = wordsTxt[wi][ci];
          sp.style.transitionDelay = (k*26) + 'ms'; k++;
          word.appendChild(sp);
        }
        frag.appendChild(word);
        if (wi < wordsTxt.length - 1) frag.appendChild(doc.createTextNode(' '));
      }
      el.textContent = ''; el.appendChild(frag);
    }

    /* ---------- rivelazioni ---------- */
    var io = null;
    if ('IntersectionObserver' in window){
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
      doc.querySelectorAll('[data-rise], [data-rule], .split').forEach(function(el){ io.observe(el); });

      /* rete di sicurezza: con uno scroll molto rapido l'observer può saltare un
         elemento e lasciarlo invisibile. Una passata su scroll non lo permette. */
      var pend = [].slice.call(doc.querySelectorAll('[data-rise], [data-rule], .split'));
      var sweeping = false;
      function sweep(){
        sweeping = false;
        for (var i = pend.length - 1; i >= 0; i--){
          var el = pend[i];
          if (el.classList.contains('in') || el.getBoundingClientRect().top < innerHeight - 40){
            el.classList.add('in'); pend.splice(i, 1);
          }
        }
        if (!pend.length) removeEventListener('scroll', onScroll);
      }
      function onScroll(){ if (!sweeping){ sweeping = true; requestAnimationFrame(sweep); } }
      addEventListener('scroll', onScroll, { passive: true });
      setTimeout(sweep, 1200);
    } else {
      doc.querySelectorAll('[data-rise], [data-rule], .split').forEach(function(el){ el.classList.add('in'); });
    }

    /* ---------- disegno dell'auto ---------- */
    var car = doc.getElementById('car');
    if (car && !reduced && 'IntersectionObserver' in window){
      var cio = new IntersectionObserver(function(en){
        if (en[0].isIntersecting){ car.classList.add('drawn'); cio.disconnect(); }
      }, { threshold: .2 });
      cio.observe(car);
    } else if (car){ car.classList.add('drawn'); }

    /* ---------- pausa delle animazioni fuori schermo ---------- */
    if ('IntersectionObserver' in window){
      doc.querySelectorAll('.hero, #zona, .contact').forEach(function(sec){
        var pio = new IntersectionObserver(function(en){
          sec.classList.toggle('paused', !en[0].isIntersecting);
        }, { threshold: 0 });
        pio.observe(sec);
      });
    }

    /* ---------- faro + parallasse (rAF, solo puntatore fine) ---------- */
    if (fine && !reduced){
      var tx = innerWidth/2, ty = innerHeight*.3, cx = tx, cy = ty, running = false;
      var carEl = doc.getElementById('car');
      var heroEl = doc.querySelector('.hero');
      var ring = doc.getElementById('cur'), dot = doc.getElementById('curDot');
      var rx = tx, ry = ty;

      function loop(){
        cx += (tx-cx)*.10; cy += (ty-cy)*.10;
        rx += (tx-rx)*.20; ry += (ty-ry)*.20;
        doc.documentElement.style.setProperty('--mx', cx.toFixed(1)+'px');
        doc.documentElement.style.setProperty('--my', cy.toFixed(1)+'px');
        if (carEl){
          carEl.style.setProperty('--px', ((cx/innerWidth - .5) * 34).toFixed(1)+'px');
          carEl.style.setProperty('--py', ((cy/innerHeight - .5) * 16).toFixed(1)+'px');
        }
        /* faro sulla foto dell'hero: coordinate relative alla sezione, non alla finestra */
        if (heroEl){
          var hr = heroEl.getBoundingClientRect();
          if (hr.bottom > 0 && hr.top < innerHeight){
            heroEl.style.setProperty('--hx', (cx - hr.left).toFixed(1)+'px');
            heroEl.style.setProperty('--hy', (cy - hr.top).toFixed(1)+'px');
          }
        }
        if (ring){ ring.style.transform = 'translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)'; }
        if (dot){ dot.style.transform = 'translate3d('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px,0)'; }
        if (Math.abs(tx-cx) < .4 && Math.abs(ty-cy) < .4 && Math.abs(tx-rx) < .4){ running = false; return; }
        requestAnimationFrame(loop);
      }
      function kick(){ if (!running){ running = true; requestAnimationFrame(loop); } }
      addEventListener('pointermove', function(e){
        if (e.pointerType === 'touch') return;
        tx = e.clientX; ty = e.clientY; kick();
      }, { passive: true });

      /* cursore ad anello */
      body.classList.add('cur');
      var hoverables = 'a, button, .fcard, [data-magnet]';
      addEventListener('pointerover', function(e){
        if (e.target.closest && e.target.closest(hoverables)) body.classList.add('cur-on');
      }, { passive: true });
      addEventListener('pointerout', function(e){
        if (e.target.closest && e.target.closest(hoverables)) body.classList.remove('cur-on');
      }, { passive: true });
      addEventListener('blur', function(){ body.classList.remove('cur-on'); });
      kick();

      /* bottoni magnetici */
      doc.querySelectorAll('[data-magnet]').forEach(function(b){
        b.addEventListener('pointermove', function(e){
          var r = b.getBoundingClientRect();
          var mx = (e.clientX - r.left - r.width/2) / Math.max(r.width,1);
          var my = (e.clientY - r.top - r.height/2) / Math.max(r.height,1);
          b.style.transform = 'translate('+(mx*9).toFixed(1)+'px,'+(my*6).toFixed(1)+'px)';
        });
        b.addEventListener('pointerleave', function(){ b.style.transform = ''; });
        b.addEventListener('blur', function(){ b.style.transform = ''; });
      });
    }

    /* ---------- il nome hero riempie la riga, qualunque font arrivi ---------- */
    var heroName = doc.querySelector('.hero-name');
    function fitHero(){
      if (!heroName) return;
      heroName.style.fontSize = '';
      var base = parseFloat(getComputedStyle(heroName).fontSize) || 16;
      var ratio = 1;
      heroName.querySelectorAll('.w').forEach(function(w){
        var avail = w.clientWidth || heroName.clientWidth;
        if (avail > 0 && w.scrollWidth > avail) ratio = Math.min(ratio, avail / w.scrollWidth);
      });
      if (ratio < 1) heroName.style.fontSize = (base * ratio * 0.99).toFixed(2) + 'px';
    }
    fitHero();
    if (doc.fonts && doc.fonts.ready && doc.fonts.ready.then) doc.fonts.ready.then(fitHero, function(){});
    setTimeout(fitHero, 1200);
    var fitT;
    addEventListener('resize', function(){ clearTimeout(fitT); fitT = setTimeout(fitHero, 150); }, { passive: true });

    /* ---------- rail flotta ---------- */
    var rail = doc.getElementById('rail');
    if (rail){
      var step = function(){
        var card = rail.querySelector('.fcard');
        return card ? card.getBoundingClientRect().width + 18 : 320;
      };
      var p = doc.getElementById('railPrev'), nx2 = doc.getElementById('railNext');
      if (p) p.addEventListener('click', function(){ rail.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
      if (nx2) nx2.addEventListener('click', function(){ rail.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }); });
      /* niente frecce né invito allo scorrimento se il rail entra tutto */
      var railNav = doc.querySelector('.rail-nav'), railNote = doc.querySelector('.rail-note');
      var syncRail = function(){
        var over = rail.scrollWidth - rail.clientWidth > 8;
        if (railNav) railNav.hidden = !over;
        if (railNote) railNote.hidden = !over;
        rail.setAttribute('tabindex', over ? '0' : '-1');
      };
      syncRail();
      addEventListener('resize', syncRail, { passive: true });
    }

    /* ---------- accordion FAQ ---------- */
    doc.querySelectorAll('.faq-q').forEach(function(btn){
      btn.addEventListener('click', function(){
        var open = btn.getAttribute('aria-expanded') === 'true';
        var panel = doc.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (panel) panel.classList.toggle('open', !open);
      });
    });

    /* ---------- rete di sicurezza fotografica ----------
       se una foto non arriva resta il fondo scuro disegnato del tema, mai un buco. */
    doc.querySelectorAll('img[data-photo-slot]').forEach(function(im){
      im.addEventListener('error', function(){ im.style.display = 'none'; });
      if (im.complete && im.naturalWidth === 0) im.style.display = 'none';
    });
  }

  /* ---------- avvio: si aspetta la fine dell'intro Umbra ---------- */
  function start(){
    init();
    var portal = doc.getElementById('uPortal');
    function go(){ body.classList.add('ready'); }
    if (portal && !reduced){
      var mo = new MutationObserver(function(){
        if (portal.classList.contains('u-out') || portal.style.display === 'none'){ mo.disconnect(); go(); }
      });
      mo.observe(portal, { attributes: true, attributeFilter: ['class','style'] });
      setTimeout(function(){ mo.disconnect(); go(); }, 11000);
    } else {
      setTimeout(go, 60);
    }
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', start);
  else start();
})();
</script>
${intro}
</body>
</html>`;

  return html;
};

window.U.m["obsidian"]=module.exports;})();
