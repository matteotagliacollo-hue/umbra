window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * MONOLITE — bianco e nero assoluti, tipografia cinetica, sezioni fissate.
 *
 * Art direction: sottrazione totale. Due colori (nero/bianco), un solo accento
 * rosso #FF2D16 in tre punti (barra di lettura, quadrato sull'angolo della foto
 * dell'hero, azione WhatsApp). Un solo carattere (Archivo) in due pesi.
 * Titoli enormi con crenatura negativa. Firme: rivelazione cinetica per parole,
 * flotta "fissata" con sticky, inversione del tema a metà pagina.
 *
 * Fotografia: bianco e nero assoluto (grayscale(1) contrast(1.15)), nessuna
 * eccezione — il rosso vive solo nella grafica. Ritagli netti e rettangolari,
 * spesso a tutta altezza di viewport: colonna verticale nell'hero, fascia a
 * piena pagina fra due blocchi tipografici, tre verticali con numerazione
 * enorme nella flotta, foto fissata che regge mentre il metodo scorre a fianco.
 * Una sola maschera tipografica in tutta la pagina: il nome della città
 * ritagliato dentro la fotografia (background-clip:text), con il colore pieno
 * come rete di sicurezza se l'immagine non carica.
 *
 * Nessun fatto inventato: si usano solo i dati reali del lead e il copy di `c`.
 */

const { esc } = require('../lib/content.js');

module.exports = function render(lead, c, intro) {
  const name = esc(lead.name);
  const city = esc(lead.city);
  const tel = esc(lead.tel);
  const phone = esc(lead.phoneDisplay);
  const wa = lead.whatsapp ? esc(lead.whatsapp) : null;
  const address = lead.address ? esc(lead.address) : null;
  const rating = lead.rating ? esc(lead.rating) : null;
  const reviews = Number(lead.reviews) > 0 ? Number(lead.reviews) : 0;
  const category = lead.category ? esc(lead.category) : null;
  const kicker = esc(c.kicker);

  // monogramma: iniziali reali del nome, massimo due lettere
  const initials = String(lead.name)
    .replace(/[^A-Za-zÀ-ÿ0-9 ]/g, ' ')
    .split(/\s+/).filter(Boolean).slice(0, 2)
    .map(w => w[0].toUpperCase()).join('') || 'N';

  const waBtn = (cls, label) => wa
    ? `<a class="${cls}" href="${wa}" target="_blank" rel="noopener">${label}</a>`
    : '';

  const steps = [
    ['Si scrive', wa ? 'Un messaggio su WhatsApp con data, orario, partenza e destinazione.' : 'Una telefonata con data, orario, partenza e destinazione.'],
    ['Si riceve il preventivo', 'Prezzo concordato prima della partenza. Non cambia a fine corsa.'],
    ['Si viaggia', 'L\'auto arriva all\'indirizzo indicato. Il resto non vi riguarda.']
  ];

  const services = c.services.map(([t, d], i) => `
      <article class="srv rev">
        <div class="srv-n">${String(i + 1).padStart(2, '0')}</div>
        <h3 class="srv-t kin">${esc(t)}</h3>
        <p class="srv-d">${esc(d)}</p>
      </article>`).join('');

  // flotta: una verticale a tutta altezza per vettura, numerazione enorme sopra
  const pics = c.pics;
  const cars = c.fleet.map(([n, size, d], i) => {
    const pic = pics.fleet[i];
    const shot = pic ? `
          <figure class="shot car-shot">
            ${pic.tag({
              w: 900, q: 74, cls: 'ph ph-rev',
              alt: esc(n) + ' — ' + pic.alt.toLowerCase(),
              sizes: '(max-width:860px) 100vw, 30vw'
            })}
            <div class="car-num mono" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
          </figure>` : '';
    return `
        <article class="car" data-i="${i}">${shot}
          <div class="car-in">
            <h3 class="car-t kin">${esc(n)}</h3>
            <div class="car-s">${esc(size)}</div>
            <p class="car-d">${esc(d)}</p>
          </div>
        </article>`;
  }).join('');

  // maschera tipografica — usata una volta sola, sul nome della zona
  const maskPic = pics.citta || pics.notturno;

  const faq = c.faq.map(([q, a], i) => `
        <div class="faq-i">
          <button class="faq-q" type="button" aria-expanded="false" aria-controls="fa${i}">
            <span>${esc(q)}</span><i class="faq-p" aria-hidden="true"></i>
          </button>
          <div class="faq-a" id="fa${i}"><div><p>${esc(a)}</p></div></div>
        </div>`).join('');

  const stats = c.stats.map(([v, l]) => `
          <div class="stat rev"><div class="stat-v">${esc(v)}</div><div class="stat-l">${esc(l)}</div></div>`).join('');

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(c.metaTitle)}</title>
<meta name="description" content="${esc(c.metaDesc)}">
<meta name="theme-color" content="#000000">
<meta property="og:title" content="${esc(c.metaTitle)}">
<meta property="og:description" content="${esc(c.metaDesc)}">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --acc:#FF2D16;
  --pad:clamp(18px,5vw,72px);
  --ease:cubic-bezier(.76,0,.24,1);
  --out:cubic-bezier(.16,1,.3,1);
}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  margin:0;background:#FFF;color:#000;
  font-family:'Archivo','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-weight:400;font-size:16px;line-height:1.5;
  overflow-x:clip;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;
}
img,svg{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
p{margin:0}
h1,h2,h3{margin:0;font-weight:700}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
:focus-visible{outline:2px solid currentColor;outline-offset:4px}
::selection{background:#000;color:#FFF}
.inv ::selection{background:#FFF;color:#000}

/* ---------- tipografia ---------- */
.giant{font-size:clamp(2.6rem,6.8vw,7rem);line-height:.86;letter-spacing:-.055em;font-weight:700;
  text-transform:uppercase;overflow-wrap:break-word}
.big{font-size:clamp(2.2rem,7.5vw,5.5rem);line-height:.92;letter-spacing:-.045em;font-weight:700;text-transform:uppercase}
@media (max-width:560px){
  .giant{font-size:clamp(1.8rem,9vw,3rem);letter-spacing:-.04em}
  .big{font-size:clamp(1.8rem,7vw,2.6rem);letter-spacing:-.035em}
}
.lbl{font-size:.66rem;font-weight:700;letter-spacing:.34em;text-transform:uppercase;line-height:1.2}
.mono{font-variant-numeric:tabular-nums}

/* ---------- barra di lettura (accento 1/3) ---------- */
.prog{position:fixed;top:0;left:0;right:0;height:2px;z-index:70;pointer-events:none}
.prog i{display:block;height:100%;width:100%;background:var(--acc);transform:scaleX(0);transform-origin:0 50%}

/* ---------- cursore ---------- */
.dot{position:fixed;top:0;left:0;width:12px;height:12px;border-radius:50%;background:#FFF;
  mix-blend-mode:difference;pointer-events:none;z-index:8000;opacity:0;
  transition:width .35s var(--out),height .35s var(--out),opacity .3s linear;will-change:transform}
html.curs .dot{opacity:1}
html.curs.hov .dot{width:46px;height:46px}
html.curs body,html.curs a,html.curs button{cursor:none}

/* ---------- header ---------- */
.hdr{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;
  justify-content:space-between;gap:16px;padding:16px var(--pad);
  color:#FFF;mix-blend-mode:difference}
.hdr-l{display:flex;align-items:center;gap:12px;min-width:0}
.hdr-m{width:26px;height:26px;border:1px solid currentColor;display:grid;place-items:center;
  font-size:.6rem;font-weight:700;letter-spacing:.02em;flex:none}
.hdr-n{font-size:.68rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;white-space:nowrap}
@media (max-width:700px){.hdr-n{display:none}}
.hdr-r{display:flex;align-items:center;gap:26px}
.hdr-a{font-size:.66rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;position:relative;white-space:nowrap}
.hdr-a::after{content:"";position:absolute;left:0;right:0;bottom:-5px;height:1px;background:currentColor;
  transform:scaleX(0);transform-origin:0 50%;transition:transform .5s var(--ease)}
.hdr-a:hover::after,.hdr-a:focus-visible::after{transform:scaleX(1)}
@media (max-width:860px){.hdr-r .hdr-a.only-d{display:none}}

/* ---------- cinetica ---------- */
.kw{display:inline-block;overflow:hidden;vertical-align:bottom;max-width:100%;
  padding-bottom:.1em;margin-bottom:-.1em;padding-right:.06em;margin-right:-.06em}
.kwi{display:inline-block;max-width:100%;overflow-wrap:break-word;
  transform:translateY(115%);transition:transform 1s var(--out)}
.kin.on .kwi{transform:none}
.rev{opacity:0;transform:translateY(28px);transition:opacity .9s var(--out),transform .9s var(--out)}
.rev.on{opacity:1;transform:none}
.rule{height:1px;background:currentColor;transform:scaleX(0);transform-origin:0 50%;
  transition:transform 1.4s var(--ease);opacity:.85}
.rule.on{transform:scaleX(1)}
html.nomo .kwi{transform:none}
html.nomo .rev{opacity:1;transform:none}
html.nomo .rule{transform:scaleX(1)}
html.nomo *{transition-duration:.001s!important;animation:none!important}

/* ---------- fotografia: bianco e nero assoluto ---------- */
/* color:transparent — se una foto si rompe non deve comparire il testo alt
   sopra il fondo nero: resta il blocco scuro, l'alt resta agli screen reader */
.ph{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);color:transparent}
.ph-rev{clip-path:inset(0 0 100% 0);transition:clip-path 1.2s var(--ease)}
.ph-rev.on{clip-path:inset(0 0 0 0)}
html.nomo .ph-rev{clip-path:none;transition:none}
/* fondo di sicurezza: se una foto non carica resta un blocco scuro, mai un buco bianco */
.shot{position:relative;margin:0;overflow:hidden;isolation:isolate;
  background:linear-gradient(180deg,#171717 0%,#000 100%)}
.shot::before{content:"";position:absolute;inset:0;z-index:0;opacity:.5;
  background:repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 36px)}
.shot img{position:absolute;inset:0;z-index:1}
.shot-c{position:absolute;z-index:2;left:clamp(14px,2.4vw,28px);bottom:clamp(14px,2.4vw,26px);
  color:#FFF;mix-blend-mode:difference;max-width:calc(100% - 40px)}

/* ---------- hero ---------- */
.hero{min-height:100svh;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,32%)}
.hero-type{padding:88px var(--pad) 30px;display:grid;min-width:0;
  grid-template-rows:auto 1fr auto;gap:clamp(28px,6vw,60px)}
.hero-shot{border-left:1px solid #000}
/* il quadrato rosso: unico colore della pagina, a cavallo dell'angolo della foto */
.sq-o{position:absolute;top:0;left:0;width:clamp(34px,4.4vw,68px);height:clamp(34px,4.4vw,68px);
  background:var(--acc);z-index:3}
@media (max-width:900px){
  .hero{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto}
  .hero-shot{height:clamp(210px,34svh,340px);border-left:0;border-top:1px solid #000}
}
.hero-top{display:block;min-width:0}
.hero-k{margin-bottom:14px;opacity:.62}
.fit{white-space:nowrap;max-width:100%;line-height:.9;letter-spacing:-.045em;font-weight:700;text-transform:uppercase;
  font-size:clamp(1.4rem,7vw,4rem)}
.fit span{display:inline-block;letter-spacing:-.045em}
.hero-mid{display:flex;flex-direction:column;justify-content:center;min-width:0}
.hero-mid .giant{max-width:14ch}
@media (max-width:700px){.hero-mid .giant{max-width:none}}
.hero-mid .giant:nth-child(2){padding-left:clamp(0px,4vw,96px)}
.hero-bot{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap}
.hero-info{max-width:min(520px,100%);min-width:0}
.hero-lede{font-size:.92rem;line-height:1.5;max-width:34ch;opacity:.75}
.hero-cta{display:flex;gap:22px;margin-top:20px;flex-wrap:wrap}
.link-u{font-size:.72rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  padding-bottom:5px;border-bottom:1px solid currentColor;transition:opacity .35s var(--ease)}
.link-u:hover{opacity:.5}
.meta{margin-top:26px;display:flex;flex-wrap:wrap;gap:14px clamp(22px,6vw,44px);
  padding-top:14px;border-top:1px solid #000}
.meta div{font-size:.86rem;letter-spacing:-.01em;font-weight:700;line-height:1.1}
.meta div span{display:block;margin-top:7px;font-size:.6rem;line-height:1.2;opacity:.62;
  font-weight:700;letter-spacing:.2em;text-transform:uppercase}
@media (max-width:560px){.meta{gap:12px 26px}.meta div{font-size:.8rem}}
.scroll{display:flex;align-items:flex-end;gap:12px;flex:none;margin-left:auto}
@media (max-width:700px){.scroll{display:none}}
.scroll b{font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;writing-mode:vertical-rl}
.scroll i{display:block;width:1px;height:74px;background:currentColor;opacity:.25;position:relative;overflow:hidden}
.scroll i::after{content:"";position:absolute;left:0;top:0;width:1px;height:26px;background:#000;
  animation:sc 2.2s var(--ease) infinite}
@keyframes sc{0%{transform:translateY(-30px)}60%,100%{transform:translateY(76px)}}

/* ---------- fasce ---------- */
.sec{padding:clamp(70px,11vw,150px) var(--pad);border-top:1px solid #000}
.inv .sec,.sec.inv{border-color:rgba(255,255,255,.3)}
.sec-h{display:flex;align-items:baseline;justify-content:space-between;gap:20px;margin-bottom:clamp(34px,6vw,72px)}
.sec-h .lbl{opacity:.6}

/* prova */
.proof-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,30%);
  gap:clamp(26px,4vw,64px);align-items:start}
.inset{aspect-ratio:3/4}
@media (max-width:860px){
  .proof-grid{grid-template-columns:minmax(0,1fr)}
  .inset{aspect-ratio:16/10;order:-1}
}
.proof-line{font-size:clamp(1.5rem,4.4vw,3.2rem);line-height:1.02;letter-spacing:-.035em;font-weight:700;max-width:20ch}
.stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:clamp(40px,6vw,72px);border-top:1px solid #000;padding-top:22px}
.stat-v{font-size:clamp(2rem,5.5vw,4rem);line-height:1;letter-spacing:-.05em;font-weight:700}
.stat-l{font-size:.64rem;letter-spacing:.2em;text-transform:uppercase;margin-top:8px;opacity:.62;font-weight:700}
@media (max-width:600px){.stats{grid-template-columns:1fr;gap:0}
  .stat{padding:16px 0;border-bottom:1px solid rgba(0,0,0,.15);display:flex;align-items:baseline;gap:16px}
  .stat:last-child{border-bottom:0}.stat-l{margin-top:0}}

/* servizi */
.srv{display:grid;grid-template-columns:64px minmax(0,1fr) minmax(0,34ch);gap:clamp(16px,3vw,48px);
  align-items:start;padding:clamp(24px,3.4vw,44px) 0;border-bottom:1px solid rgba(0,0,0,.18)}
.srv:first-of-type{border-top:1px solid rgba(0,0,0,.18)}
.srv-n{font-size:.68rem;font-weight:700;letter-spacing:.14em;padding-top:.7em;opacity:.6}
.srv-t{font-size:clamp(1.6rem,4.4vw,3.4rem);line-height:.98;letter-spacing:-.04em;text-transform:uppercase}
.srv-d{font-size:.94rem;line-height:1.55;opacity:.72;padding-top:.5em}
@media (max-width:760px){.srv{grid-template-columns:44px minmax(0,1fr)}
  .srv-d{grid-column:2}}

/* ---------- fascia fotografica a piena pagina ---------- */
.band{height:clamp(300px,86svh,900px);border-top:1px solid #000}
.band .shot-c{left:var(--pad);bottom:clamp(20px,3vw,38px)}
.band-x{position:absolute;z-index:2;right:var(--pad);top:clamp(76px,9vw,96px);
  color:#FFF;mix-blend-mode:difference}

/* ---------- inversione: il blocco che si espande ---------- */
.flip{position:relative;height:clamp(280px,52vh,520px);background:#FFF;overflow:hidden;
  display:grid;place-items:center;border-top:1px solid #000}
.flip-b{position:absolute;inset:0;background:#000;transform:scaleY(0);transform-origin:50% 100%;
  transition:transform 1.15s var(--ease)}
.flip.on .flip-b{transform:none}
.flip-t{position:relative;z-index:1;color:#FFF;mix-blend-mode:difference;text-align:center;
  font-size:clamp(2rem,9vw,7rem);line-height:.9;letter-spacing:-.06em;font-weight:700;text-transform:uppercase}

/* ---------- metà nera ---------- */
.inv{background:#000;color:#FFF}
.inv .meta,.inv .stats,.inv .srv:first-of-type{border-color:rgba(255,255,255,.3)}
.inv .srv{border-bottom-color:rgba(255,255,255,.18)}
.inv .scroll i::after{background:#FFF}

/* ---------- flotta fissata ---------- */
.fleet{display:grid;grid-template-columns:minmax(0,40%) minmax(0,60%);border-top:1px solid rgba(255,255,255,.3)}
.fleet-l{position:sticky;top:0;height:100svh;display:flex;flex-direction:column;justify-content:center;
  gap:clamp(14px,2.6vh,26px);overflow:hidden;padding:0 clamp(20px,3vw,48px) 0 var(--pad);border-right:1px solid rgba(255,255,255,.3)}
.fleet-l h2{font-size:clamp(2.2rem,5vw,4.2rem);line-height:.9;letter-spacing:-.05em;text-transform:uppercase}
.fleet-l h2 span{display:block}
.lbl-d{opacity:.62}
.count{display:flex;align-items:baseline;gap:10px;font-size:.7rem;font-weight:700;letter-spacing:.2em}
.count b{font-size:clamp(1.6rem,3vw,2.4rem);letter-spacing:-.04em;line-height:1}
.count s{text-decoration:none;opacity:.62}
.silh{width:100%;max-width:480px;opacity:.9}
.silh path,.silh circle,.silh line{fill:none;stroke:#FFF;stroke-width:2.4;vector-effect:non-scaling-stroke;
  stroke-linecap:square;stroke-linejoin:miter}
.silh .thin{opacity:.35;stroke-width:1.4}
.silh .draw{stroke-dasharray:2600;stroke-dashoffset:2600;transition:stroke-dashoffset 2.4s var(--out)}
.silh.on .draw{stroke-dashoffset:0}
html.nomo .silh .draw{stroke-dashoffset:0}
.car{min-height:100svh;display:grid;grid-template-columns:minmax(0,32%) minmax(0,1fr);
  align-items:center;gap:clamp(22px,3.4vw,54px);padding:60px clamp(20px,4vw,72px);
  border-bottom:1px solid rgba(255,255,255,.18)}
.car:last-child{border-bottom:0}
.car-shot{height:min(76svh,720px);border:1px solid rgba(255,255,255,.28)}
.car-num{position:absolute;z-index:2;left:0;top:0;color:#FFF;mix-blend-mode:difference;
  font-size:clamp(3rem,8vw,7.5rem);line-height:.78;letter-spacing:-.06em;font-weight:700;
  padding:clamp(8px,1.4vw,18px) clamp(10px,1.6vw,22px)}
.car-in{max-width:44ch}
.car-t{font-size:clamp(1.7rem,2.8vw,2.6rem);line-height:.94;letter-spacing:-.045em;
  text-transform:uppercase;overflow-wrap:break-word}
.car-s{font-size:.66rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;margin-top:16px;opacity:.62}
.car-d{font-size:1rem;line-height:1.55;margin-top:20px;opacity:.75;max-width:34ch}
@media (max-width:860px){
  .fleet{grid-template-columns:1fr}
  .fleet-l{position:static;height:auto;padding:clamp(60px,10vw,90px) var(--pad) 30px;border-right:0;
    border-bottom:1px solid rgba(255,255,255,.3)}
  .car{min-height:0;padding:36px var(--pad) 44px;grid-template-columns:minmax(0,1fr);
    gap:clamp(20px,5vw,32px)}
  .car-shot{height:auto;aspect-ratio:4/5;max-height:64svh}
  .count{display:none}
}

/* ---------- come funziona: foto fissata, testo che le scorre accanto ---------- */
.pinsec{border-top:1px solid rgba(255,255,255,.3)}
.pin{display:grid;grid-template-columns:minmax(0,42%) minmax(0,58%)}
.pin-shot{align-self:start;position:sticky;top:0;height:100svh;
  border-right:1px solid rgba(255,255,255,.3)}
.pin-txt{padding:0 var(--pad)}
.pin-txt .sec-h{padding-top:clamp(60px,9vw,110px)}
.step{min-height:62svh;display:flex;flex-direction:column;justify-content:center;
  padding:clamp(28px,4vw,54px) 0;border-bottom:1px solid rgba(255,255,255,.18)}
.step:last-child{border-bottom:0;padding-bottom:clamp(60px,9vw,110px)}
.step-n{font-size:clamp(3.4rem,9vw,7.5rem);line-height:.78;letter-spacing:-.06em;font-weight:700;opacity:.9}
.step h3{font-size:clamp(1.2rem,2.6vw,2rem);letter-spacing:-.02em;margin-top:26px;text-transform:uppercase}
.step p{font-size:.95rem;line-height:1.55;opacity:.65;margin-top:14px;max-width:36ch}
@media (max-width:860px){
  .pin{grid-template-columns:minmax(0,1fr)}
  .pin-shot{position:static;height:clamp(240px,44svh,420px);border-right:0;
    border-bottom:1px solid rgba(255,255,255,.3)}
  .step{min-height:0;padding:30px 0}
  .step:last-child{padding-bottom:clamp(50px,10vw,80px)}
}

/* zona */
.zona{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(28px,4vw,56px)}
.zona-city{font-size:clamp(2.4rem,15vw,11rem);line-height:.82;letter-spacing:-.06em;font-weight:700;
  text-transform:uppercase;overflow-wrap:break-word}
/* maschera tipografica — un colpo solo in tutta la pagina.
   Rete di sicurezza doppia: il colore pieno se background-clip:text non c'è,
   e un secondo strato bianco sotto la foto se l'immagine non carica. */
.mask{color:#FFF}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
  .mask{
    background-image:var(--ph),linear-gradient(#FFF,#FFF);
    background-size:cover,cover;background-position:50% 46%;background-repeat:no-repeat;
    -webkit-background-clip:text;background-clip:text;
    -webkit-text-fill-color:transparent;
    filter:grayscale(1) contrast(1.15);
  }
}
.zona-row{display:flex;gap:clamp(24px,5vw,90px);flex-wrap:wrap}
.zona-row div{font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.zona-row div span{display:block;opacity:.5;font-weight:400;letter-spacing:.08em;margin-top:8px;text-transform:none;font-size:.86rem}

/* faq */
.faq-i{border-bottom:1px solid rgba(255,255,255,.2)}
.faq-i:first-child{border-top:1px solid rgba(255,255,255,.2)}
.faq-q{display:flex;align-items:center;justify-content:space-between;gap:24px;width:100%;
  text-align:left;padding:clamp(20px,2.6vw,32px) 0;
  font-size:clamp(1.05rem,2.4vw,1.7rem);line-height:1.15;letter-spacing:-.02em;font-weight:700}
.faq-p{position:relative;width:16px;height:16px;flex:none}
.faq-p::before,.faq-p::after{content:"";position:absolute;left:0;top:7px;width:16px;height:2px;background:#FFF;
  transition:transform .5s var(--ease)}
.faq-p::after{transform:rotate(90deg)}
.faq-i.on .faq-p::after{transform:rotate(0)}
.faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s var(--ease)}
.faq-i.on .faq-a{grid-template-rows:1fr}
.faq-a>div{overflow:hidden}
.faq-a p{font-size:.96rem;line-height:1.6;opacity:.65;max-width:60ch;padding-bottom:clamp(20px,2.6vw,32px)}

/* contatti */
.cta-big{font-size:clamp(2.2rem,8vw,6rem);line-height:.92;letter-spacing:-.05em;font-weight:700;
  text-transform:uppercase;padding:clamp(18px,2.4vw,30px) 0;border-bottom:1px solid rgba(255,255,255,.2);
  display:flex;align-items:baseline;justify-content:space-between;gap:20px;
  transition:padding-left .6s var(--ease),opacity .4s var(--ease)}
.cta-big:first-of-type{border-top:1px solid rgba(255,255,255,.2)}
.cta-big em{font-style:normal;font-size:.6rem;letter-spacing:.24em;opacity:.6;font-weight:700;flex:none}
.cta-big:hover{padding-left:clamp(10px,2vw,32px)}
.cta-acc{display:inline-block;margin-top:clamp(34px,5vw,56px);background:var(--acc);color:#000;
  padding:20px 34px;font-size:.72rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;
  transition:transform .5s var(--ease)}
.cta-acc:hover{transform:translateY(-3px)}
.contact-grid{display:flex;gap:clamp(24px,5vw,90px);flex-wrap:wrap;margin-top:clamp(40px,6vw,70px)}
.contact-grid div{font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.contact-grid div span{display:block;opacity:.5;font-weight:400;letter-spacing:.06em;margin-top:8px;
  text-transform:none;font-size:.92rem}

/* footer */
.foot{background:#000;color:#FFF;padding:40px var(--pad) calc(40px + env(safe-area-inset-bottom));
  border-top:1px solid rgba(255,255,255,.2);display:flex;justify-content:space-between;
  gap:16px;flex-wrap:wrap;font-size:.64rem;letter-spacing:.18em;text-transform:uppercase;font-weight:700}
.foot span{opacity:.62}

/* barra mobile */
.bar{position:fixed;left:0;right:0;bottom:0;z-index:65;display:none;min-height:62px;
  border-top:1px solid rgba(255,255,255,.25);background:#000;
  padding-bottom:env(safe-area-inset-bottom)}
.bar a{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:17px 10px;
  font-size:.7rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#FFF}
.bar a.wa{background:var(--acc);color:#000}
.bar a+a{border-left:1px solid rgba(255,255,255,.25)}
@media (max-width:860px){.bar{display:flex}
  body{padding-bottom:calc(62px + env(safe-area-inset-bottom))}
  .hero{min-height:calc(100svh - 62px)}}

@media (prefers-reduced-motion:reduce){
  .kwi{transform:none}.rev{opacity:1;transform:none}.rule{transform:scaleX(1)}
  .flip-b{transform:none}.silh .draw{stroke-dashoffset:0}
  *{animation:none!important;transition-duration:.001s!important}
}
</style>
</head>
<body>

<div class="prog" aria-hidden="true"><i id="pg"></i></div>
<div class="dot" id="dot" aria-hidden="true"></div>

<header class="hdr">
  <div class="hdr-l">
    <div class="hdr-m" aria-hidden="true">${initials}</div>
    <div class="hdr-n">${name}</div>
  </div>
  <nav class="hdr-r">
    <a class="hdr-a only-d" href="#contatti">Contatti</a>
    ${wa ? `<a class="hdr-a" href="${wa}" target="_blank" rel="noopener" aria-label="Scrivere su WhatsApp a ${name}">WhatsApp</a>` : `<a class="hdr-a" href="tel:${tel}" aria-label="Telefonare a ${name}">Telefono</a>`}
  </nav>
</header>

<main>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-type">
      <div class="hero-top">
        <div class="hero-k lbl">${kicker} — ${city}</div>
        <h1 class="fit"><span id="nm">${name}</span></h1>
      </div>

      <div class="hero-mid">
        <p class="giant kin">${esc(c.heroA)}</p>
        <p class="giant kin">${esc(c.heroB)}</p>
      </div>

      <div class="hero-bot">
        <div class="hero-info">
          <p class="hero-lede">${esc(c.lede)}</p>
          <div class="hero-cta">
            ${wa ? `<a class="link-u" href="${wa}" target="_blank" rel="noopener">Scrivere ora</a>` : ''}
            <a class="link-u" href="tel:${tel}">${phone}</a>
          </div>
          <div class="meta">
            <div>${city}<span>Zona operativa</span></div>
            ${rating ? `<div class="mono">${rating}<span>Valutazione Google</span></div>` : ''}
            ${reviews ? `<div class="mono">${reviews}<span>Recensioni Google</span></div>` : ''}
          </div>
        </div>
        <div class="scroll" aria-hidden="true"><b>Scorrere</b><i></i></div>
      </div>
    </div>

    <figure class="shot hero-shot">
      ${pics.hero.tag({
        w: 1800, q: 78, cls: 'ph', eager: true,
        alt: pics.hero.alt + ' — ' + name,
        sizes: '(max-width:900px) 100vw, 34vw'
      })}
      <div class="sq-o" aria-hidden="true"></div>
    </figure>
  </section>

  <!-- PROVA -->
  <section class="sec">
    <div class="sec-h"><h2 class="lbl">01 — Prova</h2><div class="lbl">${esc(c.proof[0])}</div></div>
    <div class="proof-grid">
      <div>
        <p class="proof-line kin">${esc(c.proof[1])}</p>
        <div class="stats">${stats}</div>
      </div>
      <figure class="shot inset">
        ${pics.interni.tag({
          w: 900, q: 74, cls: 'ph ph-rev',
          sizes: '(max-width:860px) 100vw, 30vw'
        })}
      </figure>
    </div>
  </section>

  <!-- FASCIA FOTOGRAFICA A PIENA PAGINA -->
  <figure class="shot band">
    ${pics.strada.tag({
      w: 1800, q: 76, cls: 'ph ph-rev',
      sizes: '100vw'
    })}
    <figcaption class="shot-c lbl">${city} e dintorni</figcaption>
    <div class="band-x lbl" aria-hidden="true">${kicker}</div>
  </figure>

  <!-- SERVIZI -->
  <section class="sec" id="servizi">
    <div class="sec-h"><h2 class="lbl">02 — Servizi</h2><div class="lbl">${city}</div></div>
    ${services}
  </section>

  <!-- INVERSIONE -->
  <div class="flip" id="flip" aria-hidden="true">
    <div class="flip-b"></div>
    <div class="flip-t">Flotta</div>
  </div>

  <!-- FLOTTA FISSATA -->
  <section class="inv" id="flotta">
    <div class="fleet">
      <div class="fleet-l">
        <div class="lbl lbl-d">03 — Flotta</div>
        <h2><span class="kin">Le</span><span class="kin">vetture</span></h2>
        <div class="count"><b id="cn">01</b><s>/ ${String(c.fleet.length).padStart(2, '0')}</s></div>
        <div>
          <svg class="silh" viewBox="0 0 900 300" role="img" aria-label="Profilo essenziale di una vettura">
            <path class="draw" d="M58 214 C58 184 86 170 134 165 L238 152 C302 94 374 74 470 74 C574 74 648 102 708 155 L816 176 C856 184 870 196 870 214"/>
            <path class="draw" d="M268 148 C322 102 386 86 468 86 L468 150"/>
            <path class="thin" d="M492 88 C556 92 616 112 664 150"/>
            <circle cx="214" cy="214" r="52"/>
            <circle cx="712" cy="214" r="52"/>
            <line class="thin" x1="266" y1="214" x2="660" y2="214"/>
            <line class="thin" x1="20" y1="272" x2="880" y2="272"/>
          </svg>
        </div>
      </div>
      <div class="fleet-r">${cars}</div>
    </div>
  </section>

  <!-- COME FUNZIONA — foto fissata, testo che le scorre accanto -->
  <section class="pinsec inv">
    <div class="pin">
      <figure class="shot pin-shot">
        ${pics.autista.tag({
          w: 1200, q: 76, cls: 'ph',
          sizes: '(max-width:860px) 100vw, 44vw'
        })}
      </figure>
      <div class="pin-txt">
        <div class="sec-h"><h2 class="lbl">04 — Metodo</h2><div class="lbl">Tre passaggi</div></div>
        ${steps.map(([t, d], i) => `<div class="step rev"><div class="step-n mono">${String(i + 1).padStart(2, '0')}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <!-- ZONA -->
  <section class="sec inv">
    <div class="sec-h"><h2 class="lbl">05 — Zona</h2><div class="lbl">Base operativa</div></div>
    <div class="zona">
      <div class="zona-city mask rev" style="--ph:${esc(maskPic.css(1600, 74))}" role="img"
           aria-label="${city}, ritagliata dentro la fotografia: ${esc(maskPic.alt)}">${city}</div>
      <div class="rule" aria-hidden="true"></div>
      <div class="zona-row">
        ${address ? `<div>Indirizzo<span>${address}</span></div>` : ''}
        <div>Telefono<span><a href="tel:${tel}">${phone}</a></span></div>
        ${category ? `<div>Categoria<span>${category}</span></div>` : ''}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="sec inv">
    <div class="sec-h"><h2 class="lbl">06 — Domande</h2><div class="lbl">Risposte brevi</div></div>
    <div class="faq">${faq}</div>
  </section>

  <!-- CONTATTI -->
  <section class="sec inv" id="contatti">
    <div class="sec-h"><div class="lbl">07 — Contatti</div><div class="lbl">${city}</div></div>
    <h2 class="big kin" style="margin-bottom:clamp(30px,5vw,60px)">${wa ? 'Si parte da un messaggio' : 'Si parte da una telefonata'}</h2>
    ${wa ? `<a class="cta-big" href="${wa}" target="_blank" rel="noopener">WhatsApp<em>Preventivo</em></a>` : ''}
    <a class="cta-big" href="tel:${tel}">${phone}<em>Chiamata</em></a>
    <div class="contact-grid">
      ${address ? `<div>Indirizzo<span>${address}</span></div>` : ''}
      <div>Zona<span>${city}</span></div>
      <div>Riferimento<span>${name}</span></div>
    </div>
    ${wa ? waBtn('cta-acc', 'Scrivere su WhatsApp') : `<a class="cta-acc" href="tel:${tel}">Chiamare ora</a>`}
  </section>
</main>

<footer class="foot">
  <div>${name}</div>
  <span>Anteprima realizzata da Umbra</span>
</footer>

<nav class="bar" aria-label="Contatti rapidi">
  ${wa ? `<a class="wa" href="${wa}" target="_blank" rel="noopener">WhatsApp</a>` : ''}
  <a href="tel:${tel}">Chiamare</a>
</nav>

<script>
(function(){
  var docEl = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) docEl.classList.add('nomo');

  /* --- nome adattato alla larghezza, su una riga sola --- */
  var nm = document.getElementById('nm');
  var MIN = 15;   /* sotto questo corpo si va a capo invece di rimpicciolire */
  function measure(){
    return Math.max(nm.scrollWidth, Math.ceil(nm.getBoundingClientRect().width));
  }
  function fit(){
    if (!nm) return;
    var box = nm.parentElement;
    /* si misura con un corpo minuscolo: il contenitore non puo' essere gonfiato dal testo */
    box.style.whiteSpace = 'nowrap';
    box.style.overflowWrap = '';
    nm.style.fontSize = '10px';
    var avail = Math.min(box.clientWidth, docEl.clientWidth);
    if (!avail) { nm.style.fontSize = ''; return; }
    nm.style.fontSize = '100px';
    var w = measure();
    if (!w) { nm.style.fontSize = ''; return; }
    var size = Math.min(190, 100 * avail / w);
    if (size < MIN){                       /* nome lunghissimo: due righe, corpo leggibile */
      box.style.whiteSpace = 'normal';
      box.style.overflowWrap = 'break-word';
      nm.style.fontSize = '';
      return;
    }
    nm.style.fontSize = size.toFixed(2) + 'px';
    /* rete di sicurezza: la riga non deve mai superare il contenitore */
    for (var i = 0; i < 8; i++){
      var cur = measure();
      if (cur <= avail || size <= MIN) break;
      size = Math.max(MIN, size * Math.max(0.88, avail / cur));
      nm.style.fontSize = size.toFixed(2) + 'px';
    }
    if (measure() > avail){
      box.style.whiteSpace = 'normal';
      box.style.overflowWrap = 'break-word';
      nm.style.fontSize = size.toFixed(2) + 'px';
    }
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit).catch(function(){});
  var rt;
  addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(fit, 120); });

  /* --- spezzatura dei titoli in parole mascherate --- */
  function split(el){
    if (el.dataset.split) return;
    el.dataset.split = '1';
    var words = (el.textContent || '').split(/\\s+/).filter(Boolean);
    var extra = el.querySelector('.sq');
    el.textContent = '';
    words.forEach(function(word, i){
      var mask = document.createElement('span');
      mask.className = 'kw';
      var inner = document.createElement('span');
      inner.className = 'kwi';
      inner.textContent = word;
      inner.style.transitionDelay = (i * 0.075).toFixed(3) + 's';
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      else if (extra) inner.appendChild(extra);
    });
    if (extra && !extra.parentElement) el.appendChild(extra);
  }
  var kins = [].slice.call(document.querySelectorAll('.kin'));
  if (!reduced) kins.forEach(split);

  /* --- rivelazioni --- */
  var revs = [].slice.call(document.querySelectorAll('.kin,.rev,.rule,.silh,.ph-rev'));
  function start(){
    if (reduced || !('IntersectionObserver' in window)){
      revs.forEach(function(e){ e.classList.add('on'); });
      var f = document.getElementById('flip'); if (f) f.classList.add('on');
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add('on'); io.unobserve(en.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    revs.forEach(function(e){ io.observe(e); });

    var flip = document.getElementById('flip');
    if (flip){
      var io2 = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){ flip.classList.add('on'); io2.disconnect(); }
        });
      }, { threshold: 0.35 });
      io2.observe(flip);
    }

    var cn = document.getElementById('cn');
    var cars = [].slice.call(document.querySelectorAll('.car'));
    if (cn && cars.length){
      var io3 = new IntersectionObserver(function(entries){
        entries.forEach(function(en){
          if (en.isIntersecting){
            var n = parseInt(en.target.getAttribute('data-i'), 10) + 1;
            cn.textContent = (n < 10 ? '0' : '') + n;
          }
        });
      }, { rootMargin: '-50% 0px -50% 0px' });
      cars.forEach(function(e){ io3.observe(e); });
    }
  }

  /* l'intro Umbra tiene lo scroll bloccato: si parte quando sparisce */
  (function whenReady(){
    var portal = document.getElementById('uPortal');
    if (!portal){ start(); return; }
    var t0 = Date.now();
    var iv = setInterval(function(){
      var gone = portal.style.display === 'none' || portal.classList.contains('u-out');
      if (gone || Date.now() - t0 > 9000){ clearInterval(iv); start(); }
    }, 120);
  })();

  /* --- barra di lettura --- */
  var pg = document.getElementById('pg'), tick = false;
  function prog(){
    var h = document.documentElement.scrollHeight - innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, (window.pageYOffset || 0) / h)) : 0;
    pg.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    tick = false;
  }
  addEventListener('scroll', function(){
    if (!tick){ tick = true; requestAnimationFrame(prog); }
  }, { passive: true });
  prog();

  /* --- cursore a punto pieno (solo mouse) --- */
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (fine && !reduced){
    var dot = document.getElementById('dot');
    var x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, running = false, shown = false;
    dot.style.transform = 'translate(' + (cx - 6) + 'px,' + (cy - 6) + 'px)';
    function loop(){
      cx += (x - cx) * 0.22; cy += (y - cy) * 0.22;
      dot.style.transform = 'translate(' + (cx - 6) + 'px,' + (cy - 6) + 'px)';
      if (Math.abs(x - cx) > 0.4 || Math.abs(y - cy) > 0.4){ requestAnimationFrame(loop); }
      else { running = false; }
    }
    addEventListener('mousemove', function(e){
      x = e.clientX; y = e.clientY;
      if (!shown){ shown = true; cx = x; cy = y; docEl.classList.add('curs'); }
      if (!running){ running = true; requestAnimationFrame(loop); }
      var t = e.target;
      var over = t && t.closest && t.closest('a,button');
      docEl.classList.toggle('hov', !!over);
    }, { passive: true });
  }

  /* --- FAQ --- */
  [].slice.call(document.querySelectorAll('.faq-q')).forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.parentElement;
      var open = item.classList.toggle('on');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* --- foto: se una non carica resta il fondo scuro del tema, mai un buco --- */
  [].slice.call(document.querySelectorAll('img[data-photo-slot]')).forEach(function(im){
    function drop(){ im.style.display = 'none'; }
    im.addEventListener('error', drop);
    /* l'errore puo' essere gia' scattato prima di questo script */
    if (im.complete && !im.naturalWidth) drop();
  });
})();
</script>
${intro}
</body>
</html>`;
};

window.U.m["monolite"]=module.exports;})();
