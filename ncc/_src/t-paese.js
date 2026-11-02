// PAESE — il taxi di fiducia della città. Chiaro, caldo, telefono in primo piano.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head } = require('./lib');

const CSS = `
:root{--paper:#F4F0E6;--paper-2:#EAE4D6;--ink:#1C1B18;--ink-2:#55524A;--line:#D8D1BF;--acc:#F2B705;--deep:#1E3B2F;--sans:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;--disp:'Bricolage Grotesque','Inter',system-ui,sans-serif;--mbar-bg:#1C1B18}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.6 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1180px;margin:0 auto;padding:0 24px}
.top{position:sticky;top:0;z-index:50;background:rgba(244,240,230,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.top .w{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
.logo{display:flex;align-items:center;gap:10px;font:700 17px/1 var(--disp);letter-spacing:-.01em;text-decoration:none}
.logo b{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--acc);color:var(--ink);font-size:13px;letter-spacing:.02em}
.top nav{display:flex;gap:26px;font-size:14px}.top nav a{text-decoration:none;color:var(--ink-2)}.top nav a:hover{color:var(--ink)}
.call{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:var(--ink);color:var(--paper);text-decoration:none;font:600 14px/1 var(--sans);white-space:nowrap}
.hero{padding:56px 0 64px}
.hero .w{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
.kick{display:inline-flex;align-items:center;gap:10px;font:600 13px/1 var(--sans);letter-spacing:.04em;color:var(--ink-2);margin-bottom:22px}
.kick i{width:10px;height:10px;border-radius:50%;background:#1FAF55;box-shadow:0 0 0 4px rgba(31,175,85,.18)}
h1{font:800 clamp(2.6rem,6.2vw,5rem)/.98 var(--disp);letter-spacing:-.035em;margin:0 0 22px}
h1 em{font-style:normal;background:linear-gradient(transparent 62%,var(--acc) 62%,var(--acc) 92%,transparent 92%)}
.lede{font-size:clamp(1.05rem,1.6vw,1.2rem);color:var(--ink-2);max-width:34ch;margin:0 0 30px}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:10px;padding:17px 24px;border-radius:14px;font:700 16px/1 var(--sans);text-decoration:none;transition:transform .15s ease}
.btn:hover{transform:translateY(-2px)}
.btn-call{background:var(--acc);color:var(--ink)}.btn-wa{background:var(--deep);color:#fff}
.num{display:block;margin-top:22px;font:700 clamp(1.5rem,3vw,2.1rem)/1 var(--disp);letter-spacing:-.02em;text-decoration:none}
.num small{display:block;font:500 13px/1.4 var(--sans);color:var(--ink-2);letter-spacing:0;margin-bottom:6px}
.pic{position:relative;border-radius:22px;overflow:hidden;aspect-ratio:4/5;background:var(--paper-2);box-shadow:0 30px 60px -30px rgba(28,27,24,.45)}
.pic img{width:100%;height:100%;object-fit:cover}
.rate{position:absolute;left:16px;bottom:16px;right:16px;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:14px;background:rgba(244,240,230,.94);backdrop-filter:blur(8px)}
.rate strong{font:800 1.7rem/1 var(--disp)}.rate span{font-size:13px;color:var(--ink-2);line-height:1.35}
.stars{display:inline-flex;gap:2px;color:#E2A400}
.band{background:var(--ink);color:var(--paper);overflow:hidden;white-space:nowrap;padding:14px 0;font:600 14px/1 var(--sans);letter-spacing:.02em}
.band div{display:inline-flex;gap:38px;animation:mq 38s linear infinite;padding-left:38px}
.band span::before{content:'';display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--acc);margin-right:12px;vertical-align:2px}
@keyframes mq{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.band div{animation:none}}
section{padding:96px 0}
.eyebrow{font:700 12px/1 var(--sans);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-2);margin:0 0 16px}
h2{font:800 clamp(2rem,4.2vw,3.2rem)/1.02 var(--disp);letter-spacing:-.03em;margin:0 0 18px}
.sub{color:var(--ink-2);max-width:52ch;margin:0}
.grid2{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
.dest{list-style:none;margin:0;padding:0;border-top:2px solid var(--ink)}
.dest li{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;border-bottom:1px solid var(--line);font:600 1.08rem/1.3 var(--sans)}
.dest li span{font:500 13px/1 var(--sans);color:var(--ink-2);white-space:nowrap}
.dest li a{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font:600 13px/1 var(--sans);padding:8px 12px;border-radius:999px;background:var(--paper-2)}
.dest li a:hover{background:var(--acc)}
.svc{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px}
.svc article{background:#fff;border:1px solid var(--line);border-radius:18px;padding:26px 22px 24px}
.svc h3{font:700 1.15rem/1.2 var(--disp);margin:14px 0 8px}.svc p{margin:0;color:var(--ink-2);font-size:15px}
.svc b{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:var(--paper-2);font:800 15px/1 var(--disp)}
.how{background:var(--deep);color:#EEF2EC}
.how .eyebrow,.how .sub{color:#A9BDB1}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:46px;border-top:1px solid rgba(255,255,255,.18)}
.steps div{padding:28px 28px 0 0}
.steps strong{display:block;font:800 3rem/1 var(--disp);color:var(--acc);margin-bottom:14px}
.steps h3{font:700 1.2rem/1.25 var(--disp);margin:0 0 8px;color:#fff}.steps p{margin:0;color:#B9CBBF;font-size:15px}
.proof{display:grid;grid-template-columns:auto 1fr;gap:56px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:26px;padding:44px}
.proof .big{font:800 clamp(4rem,9vw,7rem)/.9 var(--disp);letter-spacing:-.05em}
.proof p{margin:10px 0 18px;color:var(--ink-2)}
.proof a{font-weight:600}
.faq{border-top:2px solid var(--ink)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;padding:22px 0;font:700 1.08rem/1.35 var(--disp)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:22px;height:22px;border-radius:50%;background:var(--paper-2);position:relative}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:6px;right:6px;top:10px;height:2px;background:var(--ink)}
.faq summary i::after{transform:rotate(90deg);transition:transform .2s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 22px;color:var(--ink-2);max-width:62ch}
.bkwrap{background:var(--acc);border-radius:28px;padding:48px;display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;align-items:center}
.bkwrap h2{margin-bottom:12px}.bkwrap .sub{color:#3a3320}
.bk{display:grid;gap:12px}
.bk label{display:grid;gap:6px}.bk label span{font:700 12px/1 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:#4a4128}
.bk input,.bk select{width:100%;height:52px;border-radius:12px;border:1.5px solid rgba(28,27,24,.18);background:#FFFBEF;padding:0 14px;font:500 16px/1 var(--sans);color:var(--ink)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--ink)}
.bk-row{display:grid;grid-template-columns:1fr 120px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:58px;border:0;border-radius:14px;background:var(--ink);color:#fff;font:700 16px/1 var(--sans);cursor:pointer}
.bk-note{margin:0;font-size:13px;color:#4a4128}
footer{padding:56px 0 40px;border-top:1px solid var(--line);margin-top:96px}
footer .w{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:32px;font-size:15px}
footer h4{font:700 12px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);margin:0 0 14px}
footer p{margin:0 0 6px}footer a{text-decoration:none}
.legal{max-width:1180px;margin:40px auto 0;padding:0 24px;font-size:12px;color:var(--ink-2)}
.hero .ctas,.hero h1,.hero .lede,.hero .kick,.pic{animation:up .7s cubic-bezier(.2,.7,.2,1) both}
.hero h1{animation-delay:.05s}.hero .lede{animation-delay:.12s}.hero .ctas{animation-delay:.18s}.pic{animation-delay:.1s}
@keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hero *,.pic{animation:none!important}}
@media (max-width:960px){.hero .w,.grid2,.bkwrap,.proof{grid-template-columns:1fr}.svc{grid-template-columns:1fr 1fr}.steps{grid-template-columns:1fr}.top nav{display:none}.pic{aspect-ratio:4/3}footer .w{grid-template-columns:1fr}.proof{gap:20px}}
@media (max-width:560px){.w{padding:0 18px}section{padding:72px 0}.hero{padding:34px 0 48px}.svc{grid-template-columns:1fr}.bkwrap{padding:28px 20px}.proof{padding:28px 22px}.call span{display:none}.btn{flex:1;justify-content:center}}
`;

module.exports = function paese(l, f){
  const city = f.city || 'zona';
  const hero = pick('berlina', l.slug, 1)[0];
  const ini = f.name.replace(/^(taxi|ncc|servizio|autonoleggio)\s+/i,'').split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase() || 'TX';
  const short = f.name.length > 28 ? f.name.replace(/\b(noleggio con conducente|servizio taxi|e ncc|taxi e ncc)\b/ig,'').replace(/\s+/g,' ').trim() : f.name;
  const d = f.dests.length ? f.dests : ['Stazione ferroviaria','Aeroporto più vicino','Ospedale','Centro città'];
  const services = [
    ['Aeroporti e stazioni','Vi prendiamo sotto casa e vi lasciamo al terminal. Al ritorno vi aspettiamo all’uscita.'],
    ['Visite e ospedali','Andata e ritorno per visite, esami, dimissioni. Aspettiamo noi, voi non pensate al parcheggio.'],
    ['Serate e cene','Andate a cena tranquilli: vi riportiamo a casa noi, anche tardi.'],
    ['Corse su prenotazione','Fissate giorno e ora anche con settimane di anticipo.']
  ];
  if (f.services.length) services[3] = ['Anche',''+f.services.slice(0,3).map(esc).join(', ')+'.'];
  const ticker = ['Prezzo detto prima di partire','Su prenotazione','Aeroporti e stazioni','Visite mediche','Bagagli e passeggini','Rispondiamo su WhatsApp'];
  const tk = ticker.concat(ticker).map(t=>'<span>'+t+'</span>').join('');
  const html = head({
    title: f.name+' — Taxi a '+city+(f.phoneDisplay?' · '+f.phoneDisplay:''),
    desc: 'Taxi e noleggio con conducente a '+city+'. Aeroporti, stazioni, visite. Prezzo detto prima di partire. Chiamate o scrivete su WhatsApp.',
    theme:'#F4F0E6', ogImg: hero,
    fonts:'family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700',
    css: CSS
  }) + `
<body>
<header class="top"><div class="w">
  <a class="logo" href="#"><b>${esc(ini)}</b>${esc(short)}</a>
  <nav><a href="#dove">Dove andiamo</a><a href="#servizi">Servizi</a><a href="#domande">Domande</a><a href="#prenota">Prenota</a></nav>
  <a class="call" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a>
</div></header>

<main>
<section class="hero"><div class="w">
  <div>
    <div class="kick"><i></i>Taxi e NCC · ${esc(city)}</div>
    <h1>Il taxi di <em>${esc(city)}</em>, a una chiamata.</h1>
    <p class="lede">Aeroporti, stazioni, visite e serate. Il prezzo ve lo diciamo prima di partire, non alla fine.</p>
    <div class="ctas">
      <a class="btn btn-call" href="tel:${f.tel}">${ICON.phone}Chiama ora</a>
      <a class="btn btn-wa" href="${waText(f,'Buongiorno, vorrei prenotare una corsa.')}">${ICON.wa}Scrivi su WhatsApp</a>
    </div>
    <a class="num" href="tel:${f.tel}"><small>Oppure segnatevi il numero</small>${esc(f.phoneDisplay)}</a>
  </div>
  <div class="pic">
    ${img(hero,'Auto pronta per una corsa',{eager:true,w:1100,sizes:'(max-width:960px) 100vw, 46vw'})}
    ${f.reviews?`<div class="rate"><strong>${esc(f.rating)}</strong><div>${stars(f.ratingNum)}<br><span>${f.reviews} recensioni su Google</span></div></div>`:''}
  </div>
</div></section>

<div class="band" aria-hidden="true"><div>${tk}</div></div>

<section id="dove"><div class="w grid2">
  <div class="rv">
    <p class="eyebrow">Dove andiamo</p>
    <h2>Da ${esc(city)} a dove serve.</h2>
    <p class="sub">Le corse che ci chiedono più spesso. Per tutte le altre basta un messaggio: vi diciamo subito il prezzo.</p>
  </div>
  <ul class="dest rv">
    ${d.map(x=>`<li>${esc(x)}<a href="${waText(f,'Buongiorno, quanto costa una corsa da '+city+' a '+x+'?')}">Prezzo ${ICON.arrow}</a></li>`).join('')}
  </ul>
</div></section>

<section id="servizi" style="padding-top:0"><div class="w">
  <p class="eyebrow rv">Servizi</p>
  <h2 class="rv">Le corse di tutti i giorni.</h2>
  <div class="svc">
    ${services.map((s,i)=>`<article class="rv"><b>${i+1}</b><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('')}
  </div>
</div></section>

<section class="how"><div class="w">
  <p class="eyebrow">Come funziona</p>
  <h2>Tre passaggi, niente app.</h2>
  <div class="steps">
    <div><strong>01</strong><h3>Chiamate o scrivete</h3><p>Diteci da dove, per dove, giorno e ora.</p></div>
    <div><strong>02</strong><h3>Vi diciamo il prezzo</h3><p>Prima di partire, così sapete già quanto spendete.</p></div>
    <div><strong>03</strong><h3>Vi veniamo a prendere</h3><p>All’ora fissata, sotto casa o dove ci dite.</p></div>
  </div>
</div></section>

${f.reviews?`<section><div class="w"><div class="proof rv">
  <div class="big">${esc(f.rating)}</div>
  <div><div>${stars(f.ratingNum)}</div><p>Media di <b>${f.reviews} recensioni</b> lasciate su Google da chi ha viaggiato con ${esc(f.name)}.</p><a href="${f.maps}" target="_blank" rel="noopener">Leggete le recensioni su Google ↗</a></div>
</div></div></section>`:''}

<section id="domande" style="padding-top:0"><div class="w grid2">
  <div><p class="eyebrow">Domande</p><h2>Quello che ci chiedono.</h2></div>
  ${faq([
    ['Il prezzo è fisso?','Sì. Vi diciamo il prezzo prima della partenza e quello resta, anche se c’è traffico.'],
    ['Con quanto anticipo devo prenotare?','Per gli aeroporti meglio il giorno prima. Per le corse in città spesso basta una chiamata.'],
    ['Posso pagare con carta?','Chiedetelo quando prenotate: vi diciamo subito i metodi di pagamento.'],
    ['Portate anche bagagli grandi o passeggini?','Sì, diteci cosa portate così scegliamo l’auto giusta.']
  ])}
</div></section>

<section id="prenota" style="padding-top:0"><div class="w"><div class="bkwrap">
  <div><h2>Prenotate adesso.</h2><p class="sub">Compilate e si apre WhatsApp con il messaggio pronto. Vi risponde direttamente ${esc(f.name)}.</p></div>
  ${bookingForm(f,{id:'p'})}
</div></div></section>
</main>

<footer><div class="w">
  <div><a class="logo" href="#"><b>${esc(ini)}</b>${esc(short)}</a><p style="margin-top:14px;color:var(--ink-2)">Taxi e noleggio con conducente a ${esc(city)}.</p></div>
  <div><h4>Contatti</h4><p><a href="tel:${f.tel}">${esc(f.phoneDisplay)}</a></p><p><a href="${waText(f,'Buongiorno')}">WhatsApp</a></p></div>
  <div><h4>Dove siamo</h4><p>${esc(f.address)}${f.address?'<br>':''}${esc(city)}</p><p><a href="${f.maps}" target="_blank" rel="noopener">Apri in Google Maps ↗</a></p></div>
</div><p class="legal">${esc(f.name)} · Foto di repertorio · Anteprima realizzata da Umbra</p></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
</body></html>`;
  return html;
};
