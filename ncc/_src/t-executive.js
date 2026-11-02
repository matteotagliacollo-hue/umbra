// EXECUTIVE — autista privato per lavoro. Grafite, ottone, serif editoriale. Modulo di prenotazione in hero.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head } = require('./lib');

const CSS = `
:root{--bg:#0F1113;--bg-2:#16191C;--bg-3:#1D2125;--fg:#ECEAE4;--fg-2:#A6A39B;--fg-3:#6F6C66;--line:rgba(236,234,228,.12);--acc:#C4A46B;--sans:'Manrope',system-ui,-apple-system,'Segoe UI',sans-serif;--serif:'Instrument Serif',Georgia,serif;--mbar-bg:#0F1113}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font:400 16px/1.65 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1240px;margin:0 auto;padding:0 28px}
.top{position:absolute;top:0;left:0;right:0;z-index:20}
.top .w{display:flex;align-items:center;justify-content:space-between;height:84px}
.brand{font:400 1.45rem/1 var(--serif);letter-spacing:.01em;text-decoration:none}
.brand small{display:block;font:600 10px/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--fg-2);margin-top:6px}
.top nav{display:flex;align-items:center;gap:30px;font-size:14px}.top nav a{text-decoration:none;color:var(--fg-2)}.top nav a:hover{color:var(--fg)}
.top .tel{color:var(--fg);font-weight:600;display:inline-flex;gap:8px;align-items:center}
.hero{position:relative;min-height:min(100svh,920px);display:flex;align-items:flex-end;padding:140px 0 72px;overflow:hidden}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.75) brightness(.62)}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,17,19,.92) 0%,rgba(15,17,19,.55) 48%,rgba(15,17,19,.2) 100%),linear-gradient(0deg,var(--bg) 0%,transparent 35%)}
.hero .w{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:end;width:100%}
.over{font:600 11px/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--acc);margin:0 0 22px}
h1{font:400 clamp(3rem,7vw,6.2rem)/.95 var(--serif);letter-spacing:-.02em;margin:0 0 24px}
h1 i{color:var(--acc)}
.lede{font-size:1.12rem;color:#CFCCC4;max-width:40ch;margin:0 0 30px}
.meta{display:flex;gap:28px;flex-wrap:wrap;font-size:14px;color:var(--fg-2)}
.meta b{display:block;font:400 1.9rem/1 var(--serif);color:var(--fg);margin-bottom:6px}
.card{background:rgba(22,25,28,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--line);border-radius:18px;padding:28px}
.card h2{font:400 1.7rem/1.1 var(--serif);margin:0 0 4px}.card .cs{color:var(--fg-2);font-size:14px;margin:0 0 18px}
.bk{display:grid;gap:12px}.bk label{display:grid;gap:6px}
.bk label span{font:600 10.5px/1 var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--fg-3)}
.bk input,.bk select{width:100%;height:48px;border-radius:10px;border:1px solid var(--line);background:var(--bg);color:var(--fg);padding:0 14px;font:500 15px/1 var(--sans)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--acc)}
.bk-row{display:grid;grid-template-columns:1fr 110px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:54px;border:0;border-radius:10px;background:var(--acc);color:#15120C;font:700 15px/1 var(--sans);cursor:pointer;transition:filter .2s}
.bk-go:hover{filter:brightness(1.08)}
.bk-note{margin:2px 0 0;font-size:12.5px;color:var(--fg-3)}
section{padding:110px 0}
.lab{display:flex;align-items:center;gap:14px;font:600 11px/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--fg-3);margin:0 0 26px}
.lab::before{content:'';width:34px;height:1px;background:var(--acc)}
h2.t{font:400 clamp(2.4rem,5vw,4.2rem)/1 var(--serif);letter-spacing:-.015em;margin:0 0 20px}
h2.t i{color:var(--acc)}
.p{color:var(--fg-2);max-width:54ch;margin:0}
.rows{margin-top:56px;border-top:1px solid var(--line)}
.row{display:grid;grid-template-columns:90px 1fr 1.2fr auto;gap:28px;align-items:baseline;padding:30px 0;border-bottom:1px solid var(--line);transition:background .25s}
.row:hover{background:linear-gradient(90deg,transparent,rgba(196,164,107,.05),transparent)}
.row em{font:400 1rem/1 var(--serif);font-style:italic;color:var(--acc)}
.row h3{font:400 1.75rem/1.1 var(--serif);margin:0}.row p{margin:0;color:var(--fg-2);font-size:15px}
.row a{font:600 13px/1 var(--sans);text-decoration:none;color:var(--fg-2);display:inline-flex;gap:6px;align-items:center}.row a:hover{color:var(--acc)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:0;background:var(--bg-2)}
.split figure{margin:0;min-height:560px;position:relative}.split figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.split .txt{padding:96px 72px;display:flex;flex-direction:column;justify-content:center}
.ticks{list-style:none;padding:0;margin:30px 0 0;display:grid;gap:16px}
.ticks li{display:grid;grid-template-columns:22px 1fr;gap:14px;color:#CFCCC4}
.ticks li::before{content:'';width:22px;height:1px;background:var(--acc);margin-top:12px}
.fleet{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px}
.fleet article{background:var(--bg-2);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.fleet figure{margin:0;aspect-ratio:16/10;background:var(--bg-3)}.fleet figure img{width:100%;height:100%;object-fit:cover}
.fleet div{padding:22px 22px 26px}.fleet h3{font:400 1.5rem/1.1 var(--serif);margin:0 0 6px}.fleet p{margin:0;color:var(--fg-2);font-size:14.5px}
.fleet small{display:block;font:600 10.5px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--acc);margin-bottom:12px}
.routes{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:16px;overflow:hidden;margin-top:48px}
.routes a{background:var(--bg);padding:26px 24px;text-decoration:none;display:flex;flex-direction:column;gap:10px;min-height:150px;justify-content:space-between;transition:background .2s}
.routes a:hover{background:var(--bg-2)}
.routes span{font:600 10.5px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--fg-3)}
.routes b{font:400 1.35rem/1.15 var(--serif);font-weight:400}
.routes i{font-style:normal;font-size:13px;color:var(--acc)}
.proof{display:grid;grid-template-columns:auto 1fr;gap:64px;align-items:center;padding:56px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.proof .n{font:400 clamp(5rem,11vw,9rem)/.85 var(--serif)}.proof .stars{color:var(--acc);display:inline-flex;gap:3px}
.proof p{color:var(--fg-2);margin:12px 0 16px;max-width:46ch}.proof a{color:var(--acc);font-weight:600;font-size:14px}
.faq details{border-bottom:1px solid var(--line)}.faq{border-top:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:24px;padding:26px 0;font:400 1.4rem/1.25 var(--serif)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:14px;height:14px;position:relative;margin-top:8px}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:0;right:0;top:6px;height:1px;background:var(--acc)}
.faq summary i::after{transform:rotate(90deg);transition:transform .25s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 26px;color:var(--fg-2);max-width:62ch}
.end{text-align:center;padding:130px 0}
.end h2{font:400 clamp(2.8rem,6vw,5.4rem)/1 var(--serif);margin:0 0 30px}
.end .acts{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.b1,.b2{display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 26px;border-radius:999px;text-decoration:none;font:700 15px/1 var(--sans)}
.b1{background:var(--acc);color:#15120C}.b2{border:1px solid var(--line);color:var(--fg)}
footer{border-top:1px solid var(--line);padding:44px 0 36px;font-size:14px;color:var(--fg-2)}
footer .w{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}footer a{text-decoration:none}
.hero h1,.hero .lede,.hero .over,.hero .meta,.card{animation:up .9s cubic-bezier(.2,.7,.2,1) both}
.hero .lede{animation-delay:.1s}.hero .meta{animation-delay:.18s}.card{animation-delay:.25s}
@keyframes up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.hero>img{animation:zoom 14s ease-out both}@keyframes zoom{from{transform:scale(1.08)}to{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){.hero *,.hero>img,.card{animation:none!important}}
@media (max-width:980px){.hero .w,.split,.proof{grid-template-columns:1fr}.top nav a:not(.tel){display:none}.row{grid-template-columns:60px 1fr;gap:10px 18px}.row p,.row a{grid-column:2}.fleet,.routes{grid-template-columns:1fr 1fr}.split figure{min-height:340px}.split .txt{padding:64px 28px}}
@media (max-width:600px){.w{padding:0 18px}section{padding:80px 0}.fleet,.routes{grid-template-columns:1fr}.hero{padding-top:110px}.card{padding:22px 18px}.meta{gap:20px}.top .tel span{display:none}.proof{gap:12px}}
`;

module.exports = function executive(l, f){
  const city = f.city || 'Nord Italia';
  const [hero] = pick('notturno', l.slug, 1);
  const [side] = pick('interni', l.slug, 1);
  const cars = pick('berlina', l.slug, 2).concat(pick('van', l.slug, 1));
  const d = f.dests.length ? f.dests : ['Aeroporto','Stazione AV','Centro città'];
  const base = [['Berlina','1–3 passeggeri','La scelta per il lavoro e i transfer in aeroporto.'],['Berlina di fascia alta','1–3 passeggeri','Quando l’auto fa parte dell’accoglienza.'],['Van','fino a 7 passeggeri','Per gruppi e bagagli voluminosi.']];
  const real = f.vehicles.slice(0,3).map(v=>[v.charAt(0).toUpperCase()+v.slice(1),'Nella flotta di '+f.name,'']);
  const fleet = real.concat(base).slice(0,3);
  const rows = [
    ['Aeroporti','Andata e ritorno da '+city+'. Vi aspettiamo in arrivo con il vostro nome.','Transfer aeroporto'],
    ['Stazioni AV','Coincidenze strette, valigie pesanti: ci pensiamo noi.','Transfer stazione'],
    ['Appuntamenti di lavoro','Riunioni, fiere, visite in azienda. Autista a disposizione per la giornata.','Servizio a disposizione'],
    ['Lunghe tratte','Città, montagna, estero. Preventivo fisso concordato prima.','Lunga percorrenza']
  ];
  const html = head({
    title: f.name+' — Autista privato a '+city,
    desc:'Noleggio con conducente a '+city+': aeroporti, stazioni, appuntamenti di lavoro. Preventivo fisso su WhatsApp.',
    theme:'#0F1113', ogImg: hero,
    fonts:'family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700',
    css: CSS
  }) + `
<body>
<header class="top"><div class="w">
  <a class="brand" href="#">${esc(f.name)}<small>NCC · ${esc(city)}</small></a>
  <nav><a href="#servizi">Servizi</a><a href="#tratte">Tratte</a><a href="#auto">Auto</a><a class="tel" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a></nav>
</div></header>
<main>
<section class="hero">
  ${img(hero,'Auto con autista in città di sera',{eager:true,w:2000,sizes:'100vw'})}
  <div class="w">
    <div>
      <p class="over">Noleggio con conducente · ${esc(city)}</p>
      <h1>Autista privato,<br><i>a ${esc(city)}.</i></h1>
      <p class="lede">${f.ownCopy?esc(f.ownCopy)+'. ':''}Aeroporti, stazioni, appuntamenti di lavoro. Il prezzo è concordato prima della partenza e non cambia.</p>
      <div class="meta">
        ${f.reviews?`<div><b>${esc(f.rating)}</b>su ${f.reviews} recensioni Google</div>`:''}
        <div><b>Fisso</b>il preventivo</div>
        <div><b>${f.dests.length||'—'}</b>tratte frequenti</div>
      </div>
    </div>
    <div class="card"><h2>Preventivo in un messaggio</h2><p class="cs">Compilate i campi: si apre WhatsApp con il testo pronto.</p>${bookingForm(f,{id:'e',labels:{from:'Da',to:'A',date:'Quando',pax:'Passeggeri',send:'Invia su WhatsApp',note:'Vi risponde direttamente '+esc(f.name)+'.'}})}</div>
  </div>
</section>

<section id="servizi"><div class="w">
  <p class="lab">Servizi</p>
  <h2 class="t">Puntuali, <i>discreti</i>, chiari sul prezzo.</h2>
  <p class="p">Il lavoro di un autista privato è semplice da spiegare: arrivare prima di voi, fare la strada giusta, non farvi pensare a nulla.</p>
  <div class="rows">
    ${rows.map((r,i)=>`<div class="row"><em>0${i+1}</em><h3>${r[0]}</h3><p>${r[1]}</p><a href="${waText(f,'Buongiorno, vorrei informazioni per: '+r[2])}">Chiedi ${ICON.arrow}</a></div>`).join('')}
  </div>
</div></section>

<div class="split">
  <figure>${img(side,'Interni di un’auto di rappresentanza',{w:1200})}</figure>
  <div class="txt">
    <p class="lab">Per le aziende</p>
    <h2 class="t">Ospiti, clienti, <i>trasferte</i>.</h2>
    <p class="p">Organizziamo gli spostamenti di chi arriva da fuori: dall’aeroporto all’hotel, dall’hotel alla sede, fino al ritorno.</p>
    <ul class="ticks"><li>Un solo referente per tutte le corse</li><li>Nome dell’ospite su cartello all’arrivo</li><li>Preventivo scritto prima del servizio</li></ul>
  </div>
</div>

<section id="tratte"><div class="w">
  <p class="lab">Tratte</p>
  <h2 class="t">Da ${esc(city)}, <i>le più richieste</i>.</h2>
  <div class="routes">
    ${d.map(x=>`<a href="${waText(f,'Buongiorno, vorrei un preventivo da '+city+' a '+x+'.')}"><span>Da ${esc(city)}</span><b>${esc(x)}</b><i>Chiedi il prezzo →</i></a>`).join('')}
  </div>
</div></section>

<section id="auto" style="padding-top:0"><div class="w">
  <p class="lab">Le auto</p>
  <h2 class="t">L’auto giusta <i>per il viaggio</i>.</h2>
  <div class="fleet">
    ${fleet.map((v,i)=>`<article><figure>${img(cars[i]||cars[0],v[0],{w:800,sizes:'(max-width:600px) 100vw, 33vw'})}</figure><div><small>${esc(v[1])}</small><h3>${esc(v[0])}</h3>${v[2]?`<p>${v[2]}</p>`:''}</div></article>`).join('')}
  </div>
</div></section>

${f.reviews?`<section style="padding-top:0"><div class="w"><div class="proof"><div class="n">${esc(f.rating)}</div><div>${stars(f.ratingNum)}<p>Media di ${f.reviews} recensioni lasciate su Google dai clienti di ${esc(f.name)}.</p><a href="${f.maps}" target="_blank" rel="noopener">Leggi le recensioni su Google ↗</a></div></div></div></section>`:''}

<section style="padding-top:0"><div class="w">
  <p class="lab">Domande</p>
  ${faq([
    ['Il prezzo può cambiare durante il viaggio?','No. Il preventivo è concordato prima della partenza: traffico e attese brevi non lo modificano.'],
    ['Cosa succede se il volo è in ritardo?','Comunicateci il numero del volo quando prenotate, così l’orario di attesa si regola sull’arrivo reale.'],
    ['Emettete fattura?','Chiedetelo al momento della prenotazione insieme ai dati dell’azienda.'],
    ['Con quanto anticipo prenotare?','Per aeroporti e lunghe tratte meglio il giorno prima; per le corse in giornata scriveteci comunque.']
  ])}
</div></section>

<section class="end"><div class="w">
  <h2>Diteci dove.<br>Al resto pensiamo noi.</h2>
  <div class="acts"><a class="b1" href="${waText(f,'Buongiorno, vorrei un preventivo.')}">${ICON.wa}Scrivi su WhatsApp</a><a class="b2" href="tel:${f.tel}">${ICON.phone}${esc(f.phoneDisplay)}</a></div>
</div></section>
</main>
<footer><div class="w"><span>${esc(f.name)} · ${esc(f.address)}${f.address?', ':''}${esc(city)}</span><a href="${f.maps}" target="_blank" rel="noopener">Google Maps ↗</a><span>Foto di repertorio · Anteprima Umbra</span></div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
</body></html>`;
  return html;
};
