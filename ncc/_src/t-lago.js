// LAGO — transfer per turisti su laghi, riviera e laguna. Crema, blu lago, terracotta. Bilingue IT/EN.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, badge, mobileBar, head, langToggle, LANG_JS, LANG_CSS, T } = require('./lib');

const SEA = ['Savona','Imperia','Genova','Chiavari','La Spezia','Jesolo','Grado','Rimini','Cervia','Ravenna','Venezia','Trieste','Monfalcone'];

const CSS = `
:root{--cream:#FAF6EE;--cream-2:#F1EADC;--lake:#1D4A66;--lake-2:#2F6A8C;--ink:#1A2630;--ink-2:#5E6B74;--line:#E2D9C7;--terra:#C1683D;--sans:'DM Sans',system-ui,-apple-system,'Segoe UI',sans-serif;--serif:'Cormorant Garamond',Georgia,serif;--mbar-bg:#1D4A66}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--cream);color:var(--ink);font:400 16.5px/1.65 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1200px;margin:0 auto;padding:0 26px}
.top .w{display:flex;justify-content:space-between;align-items:center;height:80px;gap:14px}
.brand{font:600 1.55rem/1 var(--serif);text-decoration:none;letter-spacing:.01em}
.brand small{display:block;font:500 10.5px/1 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--ink-2);margin-top:6px}
.tr{display:flex;gap:12px;align-items:center}
.lang{display:inline-flex;border:1px solid var(--line);border-radius:999px;padding:3px;background:#fff}
.lang button{border:0;background:none;font:600 12px/1 var(--sans);padding:8px 12px;border-radius:999px;cursor:pointer;color:var(--ink-2)}
.lang button[aria-pressed=true]{background:var(--lake);color:#fff}
.tel{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 18px;border-radius:999px;background:var(--lake);color:#fff;text-decoration:none;font:600 14px/1 var(--sans)}
.hero{padding:20px 0 90px}
.frame{position:relative;border-radius:28px;overflow:hidden;min-height:min(78svh,720px);display:flex;align-items:flex-end}
.frame>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.frame::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,38,48,0) 40%,rgba(26,38,48,.7))}
.cap{position:relative;z-index:2;padding:48px;color:#fff;max-width:760px}
.cap .ey{font:500 12px/1 var(--sans);letter-spacing:.24em;text-transform:uppercase;margin:0 0 16px;color:#F7DCC9}
h1{font:500 clamp(3rem,7.4vw,6.4rem)/.92 var(--serif);letter-spacing:-.01em;margin:0 0 18px}
h1 i{color:#F7DCC9}
.cap p{margin:0 0 26px;font-size:1.12rem;color:rgba(255,255,255,.9);max-width:46ch}
.acts{display:flex;gap:12px;flex-wrap:wrap}
.b{display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 24px;border-radius:999px;text-decoration:none;font:600 15px/1 var(--sans)}
.b.t{background:var(--terra);color:#fff}.b.c{background:var(--cream);color:var(--ink)}
.strip{display:flex;gap:40px;flex-wrap:wrap;justify-content:space-between;align-items:center;padding:28px 6px 0;color:var(--ink-2);font-size:14px}
.strip b{font:600 1.7rem/1 var(--serif);color:var(--ink);margin-right:8px}
.stars{display:inline-flex;gap:2px;color:var(--terra);vertical-align:-2px}
section{padding:96px 0}
.k{font:500 12px/1 var(--sans);letter-spacing:.24em;text-transform:uppercase;color:var(--terra);margin:0 0 16px}
h2{font:500 clamp(2.4rem,5vw,4rem)/1 var(--serif);letter-spacing:-.01em;margin:0 0 16px}
h2 i{color:var(--lake-2)}
.sub{color:var(--ink-2);max-width:54ch;margin:0}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px}
.cards article{background:#fff;border-radius:20px;overflow:hidden;border:1px solid var(--line)}
.cards figure{margin:0;aspect-ratio:4/3;background:var(--cream-2)}.cards figure img{width:100%;height:100%;object-fit:cover}
.cards div{padding:24px 24px 28px}.cards h3{font:600 1.6rem/1.1 var(--serif);margin:0 0 8px}.cards p{margin:0;color:var(--ink-2);font-size:15px}
.tl{display:grid;grid-template-columns:.8fr 1.2fr;gap:56px;align-items:start}
.line{position:relative;list-style:none;margin:0;padding:0 0 0 30px}
.line::before{content:'';position:absolute;left:7px;top:10px;bottom:10px;width:2px;background:repeating-linear-gradient(var(--lake-2) 0 8px,transparent 8px 14px)}
.line li{position:relative;padding:0 0 24px}
.line li::before{content:'';position:absolute;left:-30px;top:7px;width:16px;height:16px;border-radius:50%;background:var(--cream);border:2px solid var(--lake)}
.line li:first-child::before{background:var(--terra);border-color:var(--terra)}
.line b{font:600 1.35rem/1.2 var(--serif)}.line a{display:inline-block;margin-left:10px;font:600 12.5px/1 var(--sans);color:var(--lake);text-decoration:none;border-bottom:1px solid currentColor}
.blue{background:var(--lake);color:#EAF1F5}
.blue .k{color:#F7DCC9}.blue .sub{color:#B9CDD9}.blue h2 i{color:#F7DCC9}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:34px;margin-top:44px}
.three h3{font:600 1.5rem/1.15 var(--serif);margin:0 0 8px}.three p{margin:0;color:#B9CDD9}
.three>div>span{display:block;font:500 12px/1 var(--sans);letter-spacing:.2em;color:#F7DCC9;margin-bottom:14px}
.bkx{display:grid;grid-template-columns:.9fr 1.1fr;gap:52px;align-items:center}
.bk{display:grid;gap:12px;background:#fff;border-radius:22px;padding:30px;border:1px solid var(--line)}
.bk label{display:grid;gap:6px}.bk label span{font:500 11px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2)}
.bk input,.bk select{width:100%;height:50px;border-radius:12px;border:1px solid var(--line);background:var(--cream);padding:0 14px;font:500 15px/1 var(--sans);color:var(--ink)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--lake)}
.bk-row{display:grid;grid-template-columns:1fr 120px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border:0;border-radius:999px;background:var(--terra);color:#fff;font:600 15px/1 var(--sans);cursor:pointer}
.bk-note{margin:0;font-size:12.5px;color:var(--ink-2)}
footer{border-top:1px solid var(--line);padding:40px 0;font-size:14px;color:var(--ink-2)}
footer .w{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}footer a{text-decoration:none;color:var(--lake)}
.frame>img{animation:zoom 16s ease-out both}@keyframes zoom{from{transform:scale(1.08)}to{transform:none}}
.cap>*{animation:up .9s cubic-bezier(.2,.7,.2,1) both}.cap h1{animation-delay:.06s}.cap p{animation-delay:.12s}.cap .acts{animation-delay:.18s}
@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.frame>img,.cap>*{animation:none!important}}
@media (max-width:960px){.cards,.three{grid-template-columns:1fr}.tl,.bkx{grid-template-columns:1fr}.cap{padding:30px 24px}}
@media (max-width:600px){.w{padding:0 16px}section{padding:72px 0}.frame{border-radius:20px;min-height:70svh}.tel span{display:none}.tel{padding:0 13px}.brand{font-size:1.25rem}.brand small{display:none}.b{flex:1;justify-content:center}.bk{padding:20px}.pn{font-size:13px;white-space:nowrap}}
${LANG_CSS}
`;

module.exports = function lago(l, f){
  const city = f.city || 'Lago';
  const sea = SEA.includes(city);
  const cat = sea ? 'mare' : 'lago';
  const [hero, c2] = pick(cat, l.slug, 2);
  const [c1] = pick('aeroporto', l.slug, 1); const [c3] = pick('van', l.slug, 1);
  const d = f.dests.length ? f.dests : ['Aeroporto','Stazione'];
  const t = (it,en)=>T(it,en,'en');
  const place = sea ? t('la costa','the coast') : t('il lago','the lake');
  const html = head({
    title: f.name+' — Transfer e taxi a '+city,
    desc:'Transfer da '+city+' per aeroporti e stazioni, giri '+(sea?'sulla costa':'sul lago')+' su richiesta. Prezzo concordato prima. Preventivo su WhatsApp.',
    theme:'#FAF6EE', ogImg: hero,
    fonts:'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600',
    css: CSS
  }) + `
<body>
<header class="top"><div class="w">
  <a class="brand" href="#">${esc(f.name)}<small>${esc(city)} · Transfer &amp; Taxi</small></a>
  <div class="tr">${langToggle('en')}<a class="tel" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a></div>
</div></header>
<main>
<section class="hero"><div class="w">
  <div class="frame">
    ${img(hero,sea?'Costa al tramonto':'Paese sul lago',{eager:true,w:2000,sizes:'100vw'})}
    <div class="cap">
      <p class="ey">${esc(city)} · ${t('Transfer privati','Private transfers')}</p>
      <h1>${t('Arrivate, <i>vi portiamo noi.</i>','You land, <i>we drive.</i>')}</h1>
      <p>${t('Dall’aeroporto all’hotel, dall’hotel ai paesi intorno. Prezzo concordato prima di partire.','From the airport to your hotel and around '+(sea?'the coast':'the lake')+'. Price agreed before you set off.')}</p>
      <div class="acts"><a class="b t" href="${waText(f,'Hello! I would like a quote / Buongiorno, vorrei un preventivo.')}">${ICON.wa}WhatsApp</a><a class="b c" href="tel:${f.tel}">${ICON.phone}<span class="pn">${esc(f.phoneDisplay)}</span></a></div>
    </div>
  </div>
  <div class="strip">
    ${f.reviews?`<span><b>${esc(f.rating)}</b>${stars(f.ratingNum)} · ${f.reviews} ${t('recensioni Google','Google reviews')}</span>`:''}
    <span>${t('Su prenotazione','By reservation')}</span><span>${t('Prezzo fisso a tratta','Fixed price per ride')}</span><a href="#prenota" style="color:var(--terra);font-weight:600;text-decoration:none">${t('Chiedi il preventivo →','Get a quote →')}</a>
  </div>
</div></section>

<section style="padding-top:0"><div class="w">
  <p class="k">${t('Cosa facciamo','What we do')}</p>
  <h2>${t('Tre modi per <i>non guidare</i> in vacanza.','Three ways to <i>not drive</i> on holiday.')}</h2>
  <div class="cards">
    <article><figure>${img(c1,'Terminal aeroportuale',{w:800,sizes:'(max-width:960px) 100vw, 33vw'})}</figure><div><h3>${t('Aeroporti','Airports')}</h3><p>${t('Vi aspettiamo agli arrivi con il vostro nome e vi portiamo in hotel.','We meet you at arrivals with your name and take you to your hotel.')}</p></div></article>
    <article><figure>${img(c2,sea?'Paese sulla costa':'Paese sul lago',{w:800,sizes:'(max-width:960px) 100vw, 33vw'})}</figure><div><h3>${t('Giri su richiesta','Tours on request')}</h3><p>${t('Paesi, cantine, ristoranti intorno a ','Villages, wineries and restaurants around ')}${place}. ${t('Decidete voi le tappe.','You choose the stops.')}</p></div></article>
    <article><figure>${img(c3,'Van per gruppi',{w:800,sizes:'(max-width:960px) 100vw, 33vw'})}</figure><div><h3>${t('Famiglie e gruppi','Families & groups')}</h3><p>${t('Van con spazio per valigie, passeggini e attrezzatura.','Vans with room for suitcases, strollers and gear.')}</p></div></article>
  </div>
</div></section>

<section style="padding-top:0"><div class="w tl">
  <div><p class="k">${t('Tratte','Routes')}</p><h2>${t('Da ','From ')}${esc(city)}.</h2><p class="sub">${t('Le corse che ci chiedono più spesso. Per le altre scrivete: rispondiamo con il prezzo.','Our most requested rides. For anything else, message us for a price.')}</p></div>
  <ul class="line"><li><b>${esc(city)}</b></li>${d.map(x=>`<li><b>${esc(x)}</b><a href="${waText(f,'Quote / Preventivo: '+city+' → '+x)}">${t('prezzo','price')}</a></li>`).join('')}</ul>
</div></section>

<section class="blue"><div class="w">
  <p class="k">${t('Come funziona','How it works')}</p>
  <h2>${t('Prenotate da casa, <i>partite tranquilli.</i>','Book from home, <i>travel relaxed.</i>')}</h2>
  <div class="three">
    <div><span>01</span><h3>${t('Scriveteci','Message us')}</h3><p>${t('Volo, hotel, numero di persone e bagagli.','Flight, hotel, number of people and bags.')}</p></div>
    <div><span>02</span><h3>${t('Prezzo fisso','Fixed price')}</h3><p>${t('Vi rispondiamo con il prezzo della corsa. Non cambia.','We reply with the price of the ride. It won’t change.')}</p></div>
    <div><span>03</span><h3>${t('Vi aspettiamo','We wait for you')}</h3><p>${t('All’arrivo o davanti all’hotel, all’ora concordata.','At arrivals or outside your hotel, on time.')}</p></div>
  </div>
</div></section>

<section id="prenota"><div class="w bkx">
  <div><p class="k">${t('Prenota','Book')}</p><h2>${t('Il preventivo <i>in un messaggio.</i>','Your quote <i>in one message.</i>')}</h2><p class="sub">${t('Compilate i campi: si apre WhatsApp con il testo pronto.','Fill in the fields: WhatsApp opens with the message ready.')}</p></div>
  ${bookingForm(f,{id:'l',fromPh:'Es. hotel, '+city,toPh:'Es. aeroporto'})}
</div></section>
</main>
<footer><div class="w"><span>${esc(f.name)} · ${esc(f.address)}${f.address?', ':''}${esc(city)}</span><a href="${f.maps}" target="_blank" rel="noopener">Google Maps ↗</a><span>Foto di repertorio · Anteprima Umbra</span></div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
${LANG_JS}
</body></html>`;
  return html;
};
