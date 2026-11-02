// ALPINO — transfer e taxi in montagna. Bianco neve, verde pino, rosso alpino. Bilingue IT/DE (Alto Adige) o IT/EN.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, badge, mobileBar, head, langToggle, LANG_JS, LANG_CSS, T, lang2 } = require('./lib');

const CSS = `
:root{--snow:#F6F7F4;--snow-2:#ECEEE8;--pine:#1C3A2E;--pine-2:#2C5444;--ink:#16201B;--ink-2:#5A665F;--line:#D9DED6;--red:#C3362B;--sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;--serif:'Fraunces',Georgia,serif;--mbar-bg:#1C3A2E}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--snow);color:var(--ink);font:400 16px/1.65 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1200px;margin:0 auto;padding:0 26px}
.top{position:absolute;top:0;left:0;right:0;z-index:10;color:#fff}
.top .w{display:flex;justify-content:space-between;align-items:center;height:78px;gap:14px}
.brand{font:600 1.2rem/1.1 var(--serif);text-decoration:none;display:flex;align-items:center;gap:10px}
.brand svg{color:#fff}
.tr{display:flex;align-items:center;gap:12px}
.lang{display:inline-flex;border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:3px}
.lang button{border:0;background:none;color:#fff;font:600 12px/1 var(--sans);padding:8px 12px;border-radius:999px;cursor:pointer;letter-spacing:.06em}
.lang button[aria-pressed=true]{background:#fff;color:var(--pine)}
.tel{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:999px;background:var(--red);color:#fff;text-decoration:none;font:600 14px/1 var(--sans)}
.hero{position:relative;min-height:min(92svh,860px);display:flex;align-items:flex-end;color:#fff;overflow:hidden}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(12,24,19,.55) 0%,rgba(12,24,19,.05) 35%,rgba(12,24,19,.72) 100%)}
.hero .w{position:relative;z-index:2;padding-bottom:72px;width:100%}
.hero .ey{display:inline-flex;gap:10px;align-items:center;font:600 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;margin:0 0 20px}
.hero .ey::before{content:'';width:26px;height:2px;background:var(--red)}
h1{font:600 clamp(2.8rem,7vw,6rem)/.96 var(--serif);letter-spacing:-.025em;margin:0 0 22px;max-width:13ch}
.hero p{font-size:1.15rem;max-width:44ch;margin:0 0 30px;color:rgba(255,255,255,.9)}
.acts{display:flex;gap:12px;flex-wrap:wrap}
.b{display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 24px;border-radius:12px;text-decoration:none;font:600 15px/1 var(--sans)}
.b.r{background:var(--red);color:#fff}.b.g{background:rgba(255,255,255,.14);backdrop-filter:blur(8px);color:#fff;border:1px solid rgba(255,255,255,.35)}
.rate{position:absolute;right:26px;bottom:72px;z-index:2;background:rgba(246,247,244,.95);color:var(--ink);border-radius:14px;padding:16px 18px;display:flex;gap:14px;align-items:center}
.rate b{font:600 2rem/1 var(--serif)}.rate span{font-size:13px;color:var(--ink-2);line-height:1.35}.stars{display:inline-flex;gap:2px;color:#D99A00}
section{padding:100px 0}
.k{font:600 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--red);margin:0 0 16px}
h2{font:600 clamp(2rem,4.4vw,3.4rem)/1.04 var(--serif);letter-spacing:-.02em;margin:0 0 16px}
.sub{color:var(--ink-2);max-width:54ch;margin:0}
.seasons{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:46px}
.season{position:relative;border-radius:20px;overflow:hidden;min-height:440px;color:#fff;display:flex;align-items:flex-end}
.season img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.season::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(12,24,19,.85))}
.season div{position:relative;z-index:2;padding:30px}
.season h3{font:600 2rem/1 var(--serif);margin:0 0 10px}
.season ul{margin:0;padding:0;list-style:none;display:grid;gap:6px;font-size:15px;color:rgba(255,255,255,.88)}
.season li::before{content:'—';margin-right:10px;color:#F0A39C}
.routes{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.rl{list-style:none;margin:0;padding:0}
.rl li{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;padding:18px 0;border-bottom:1px solid var(--line)}
.rl li i{width:10px;height:10px;border-radius:50%;border:2px solid var(--pine)}
.rl li b{font-weight:600}.rl li a{font:600 13px/1 var(--sans);text-decoration:none;color:var(--pine);padding:9px 12px;border-radius:999px;background:var(--snow-2)}
.rl li a:hover{background:var(--pine);color:#fff}
.pine{background:var(--pine);color:#EEF2EE}
.pine .sub{color:#B5C5BB}.pine .k{color:#F0A39C}
.feat{display:grid;grid-template-columns:repeat(4,1fr);gap:28px;margin-top:44px}
.feat div{border-top:2px solid rgba(255,255,255,.25);padding-top:20px}
.feat h3{font:600 1.25rem/1.2 var(--serif);margin:0 0 8px}.feat p{margin:0;color:#B5C5BB;font-size:15px}
.bkx{display:grid;grid-template-columns:.9fr 1.1fr;gap:52px;align-items:center}
.bk{display:grid;gap:12px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px;box-shadow:0 30px 60px -40px rgba(22,32,27,.35)}
.bk label{display:grid;gap:6px}.bk label span{font:600 11px/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--ink-2)}
.bk input,.bk select{width:100%;height:50px;border-radius:10px;border:1px solid var(--line);background:var(--snow);padding:0 14px;font:500 15px/1 var(--sans);color:var(--ink)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--pine)}
.bk-row{display:grid;grid-template-columns:1fr 120px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border:0;border-radius:10px;background:var(--pine);color:#fff;font:600 15px/1 var(--sans);cursor:pointer}
.bk-note{margin:0;font-size:12.5px;color:var(--ink-2)}
footer{background:var(--ink);color:#B9C3BD;padding:44px 0;font-size:14px}
footer .w{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}footer a{text-decoration:none;color:#fff}
.hero h1,.hero p,.hero .acts,.hero .ey{animation:up .9s cubic-bezier(.2,.7,.2,1) both}.hero p{animation-delay:.1s}.hero .acts{animation-delay:.18s}
.hero>img{animation:zoom 16s ease-out both}@keyframes zoom{from{transform:scale(1.1)}to{transform:none}}
@keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hero *,.hero>img{animation:none!important}}
@media (max-width:960px){.seasons,.routes,.bkx{grid-template-columns:1fr}.feat{grid-template-columns:1fr 1fr}.rate{position:relative;right:auto;bottom:auto;margin:0 26px 26px;display:inline-flex}.hero{flex-direction:column;justify-content:flex-end;align-items:flex-start}.hero .w{padding-bottom:24px}}
@media (max-width:600px){.w{padding:0 18px}section{padding:72px 0}.feat{grid-template-columns:1fr}.season{min-height:360px}.tel span{display:none}.tel{padding:0 12px}.brand span.n{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rate{margin:0 18px 22px}.b{flex:1;justify-content:center}.bk{padding:20px}}
${LANG_CSS}
`;

const COPY = {
  de: {
    ey: 'Taxi & Transfer', h1a:'Vom Flughafen bis vor die Hütte.', lede:'Transfer zu Flughäfen und Bahnhöfen, Fahrten ins Skigebiet und zu Ausflügen. Den Preis erfahrt ihr vor der Abfahrt.',
    call:'Anrufen', wa:'WhatsApp schreiben', rev:'Bewertungen auf Google',
    k1:'Das ganze Jahr', h2a:'Winter und Sommer.', s1:'Von der Ankunft bis zum letzten Tag: wir fahren euch dorthin, wo das Auto oben nicht hinkommt — oder wo ihr lieber nicht selbst fahrt.',
    win:'Winter', w1:'Transfer mit Ski und Gepäck', w2:'Fahrten ins Skigebiet', w3:'Abends zurück vom Restaurant',
    sum:'Sommer', u1:'Ausgangspunkte für Wanderungen', u2:'Pässe und Täler', u3:'Rückfahrt am Ende der Tour',
    k2:'Strecken', h2b:'Ab ', s2:'Die häufigsten Fahrten. Für alle anderen genügt eine Nachricht.', price:'Preis',
    k3:'Warum mit uns', f:[['Fester Preis','Vor der Abfahrt vereinbart.'],['Ski & Gepäck','Sagt uns vorher, was ihr mitbringt.'],['Abholung am Hotel','Direkt vor eurer Unterkunft.'],['Wir kennen die Straßen','Auch bei Schnee und im Winter.']],
    k4:'Buchen', h2c:'Anfrage in einer Nachricht.', s4:'Felder ausfüllen: WhatsApp öffnet sich mit dem fertigen Text.'
  },
  en: {
    ey: 'Taxi & transfers', h1a:'From the airport to your chalet door.', lede:'Airport and station transfers, rides to the slopes and day trips. You know the price before you leave.',
    call:'Call', wa:'Message on WhatsApp', rev:'Google reviews',
    k1:'All year', h2a:'Winter and summer.', s1:'From arrival to the last day: we drive you where a car can’t easily go up — or where you’d rather not drive yourself.',
    win:'Winter', w1:'Transfers with skis and luggage', w2:'Rides to the ski area', w3:'Back home after dinner',
    sum:'Summer', u1:'Hike starting points', u2:'Passes and valleys', u3:'Pick-up at the end of the trail',
    k2:'Routes', h2b:'From ', s2:'Our most requested rides. For anything else, just send a message.', price:'Price',
    k3:'Why us', f:[['Fixed price','Agreed before departure.'],['Skis & luggage','Tell us what you bring.'],['Hotel pick-up','Right outside your door.'],['We know these roads','Snow and winter included.']],
    k4:'Book', h2c:'Your quote in one message.', s4:'Fill in the fields: WhatsApp opens with the text ready.'
  }
};

module.exports = function alpino(l, f){
  const city = f.city || 'Dolomiti';
  const two = lang2(l); const C = COPY[two];
  const [hero] = pick('montagna', l.slug, 1);
  const [w1] = pick('neve', l.slug, 1); const [s1] = pick('montagna', l.slug+'s', 1);
  const d = f.dests.length ? f.dests : ['Aeroporto','Stazione'];
  const t = (it,o)=>T(it,o,two);
  const html = head({
    title: f.name+' — Taxi e transfer a '+city,
    desc:'Taxi e transfer a '+city+': aeroporti, stazioni, impianti e escursioni. Prezzo detto prima. Chiamate o scrivete su WhatsApp.',
    theme:'#1C3A2E', ogImg: hero,
    fonts:'family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600',
    css: CSS
  }) + `
<body>
<header class="top"><div class="w">
  <a class="brand" href="#"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2 20l7-12 4 6 3-4 6 10z"/></svg><span class="n">${esc(f.name)}</span></a>
  <div class="tr">${langToggle(two)}<a class="tel" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a></div>
</div></header>
<main>
<section class="hero" style="padding:0">
  ${img(hero,'Strada di montagna',{eager:true,w:2000,sizes:'100vw'})}
  <div class="w">
    <p class="ey">${t('Taxi e transfer',C.ey)} · ${esc(city)}</p>
    <h1>${t('Dall’aeroporto alla porta della baita.',C.h1a)}</h1>
    <p>${t('Transfer da aeroporti e stazioni, corse verso gli impianti e le escursioni. Il prezzo lo sapete prima di partire.',C.lede)}</p>
    <div class="acts"><a class="b r" href="tel:${f.tel}">${ICON.phone}${t('Chiama',C.call)}</a><a class="b g" href="${waText(f,'Buongiorno / Hallo / Hello!')}">${ICON.wa}${t('Scrivi su WhatsApp',C.wa)}</a></div>
  </div>
  ${f.reviews?`<div class="rate"><b>${esc(f.rating)}</b><div>${stars(f.ratingNum)}<br><span>${f.reviews} ${t('recensioni su Google',C.rev)}</span></div></div>`:''}
</section>

<section><div class="w">
  <p class="k">${t('Tutto l’anno',C.k1)}</p>
  <h2>${t('Inverno ed estate.',C.h2a)}</h2>
  <p class="sub">${t('Dall’arrivo all’ultimo giorno: vi portiamo dove l’auto fatica a salire, o dove preferite non guidare voi.',C.s1)}</p>
  <div class="seasons">
    <div class="season">${img(w1,'Bosco innevato',{w:1000,sizes:'(max-width:960px) 100vw, 50vw'})}<div><h3>${t('Inverno',C.win)}</h3><ul><li>${t('Transfer con sci e bagagli',C.w1)}</li><li>${t('Corse verso gli impianti',C.w2)}</li><li>${t('Rientro la sera dal ristorante',C.w3)}</li></ul></div></div>
    <div class="season">${img(s1,'Strada tra i monti d’estate',{w:1000,sizes:'(max-width:960px) 100vw, 50vw'})}<div><h3>${t('Estate',C.sum)}</h3><ul><li>${t('Partenze per i sentieri',C.u1)}</li><li>${t('Passi e valli',C.u2)}</li><li>${t('Recupero a fine escursione',C.u3)}</li></ul></div></div>
  </div>
</div></section>

<section style="padding-top:0"><div class="w routes">
  <div><p class="k">${t('Tratte',C.k2)}</p><h2>${t('Da ',C.h2b)}${esc(city)}.</h2><p class="sub">${t('Le corse più richieste. Per tutte le altre basta un messaggio.',C.s2)}</p></div>
  <ul class="rl">${d.map(x=>`<li><i></i><b>${esc(x)}</b><a href="${waText(f,'Buongiorno, quanto costa da '+city+' a '+x+'?')}">${t('Prezzo',C.price)} →</a></li>`).join('')}</ul>
</div></section>

<section class="pine"><div class="w">
  <p class="k">${t('Perché noi',C.k3)}</p>
  <div class="feat">${[['Prezzo fisso','Concordato prima della partenza.'],['Sci e bagagli','Diteci prima cosa portate.'],['Ritiro in hotel','Direttamente davanti all’alloggio.'],['Conosciamo le strade','Anche con la neve e d’inverno.']].map((x,i)=>`<div><h3>${t(x[0],C.f[i][0])}</h3><p>${t(x[1],C.f[i][1])}</p></div>`).join('')}</div>
</div></section>

<section id="prenota"><div class="w bkx">
  <div><p class="k">${t('Prenota',C.k4)}</p><h2>${t('Il preventivo in un messaggio.',C.h2c)}</h2><p class="sub">${t('Compilate i campi: si apre WhatsApp con il testo già pronto.',C.s4)}</p></div>
  ${bookingForm(f,{id:'a',fromPh:'Es. hotel, '+city,toPh:'Es. aeroporto, impianti'})}
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
