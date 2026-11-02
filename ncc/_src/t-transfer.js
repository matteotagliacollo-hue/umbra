// TRANSFER — aeroporti, porti, stazioni, gruppi. Tabellone partenze in hero, funzionale, leggibile al volo.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head } = require('./lib');

const CSS = `
:root{--bg:#0E151C;--bg-2:#141D26;--panel:#0A0F14;--fg:#EEF2F5;--fg-2:#9AA8B5;--line:rgba(238,242,245,.1);--amb:#FFB21C;--grn:#38D27A;--light:#F3F5F7;--ink:#0E151C;--sans:'Space Grotesk',system-ui,-apple-system,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;--mbar-bg:#0E151C}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font:400 16px/1.6 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1220px;margin:0 auto;padding:0 26px}
.top{border-bottom:1px solid var(--line)}
.top .w{display:flex;justify-content:space-between;align-items:center;height:68px;gap:16px}
.brand{display:flex;align-items:center;gap:12px;font:700 16px/1.1 var(--sans);text-decoration:none}
.brand svg{flex:none;color:var(--amb)}
.top .r{display:flex;gap:10px;align-items:center}
.pill{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:8px;font:600 14px/1 var(--sans);text-decoration:none;border:1px solid var(--line)}
.pill.y{background:var(--amb);color:var(--ink);border-color:var(--amb)}
.hero{padding:64px 0 80px}
.hero .w{display:grid;grid-template-columns:1fr 1.05fr;gap:52px;align-items:center}
.tag{font:500 12px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--amb);margin:0 0 20px}
h1{font:700 clamp(2.6rem,5.6vw,4.6rem)/1 var(--sans);letter-spacing:-.035em;margin:0 0 20px}
h1 span{color:var(--amb)}
.lede{color:var(--fg-2);font-size:1.12rem;max-width:40ch;margin:0 0 28px}
.facts{display:grid;grid-template-columns:repeat(3,auto);gap:28px;justify-content:start}
.facts b{display:block;font:600 1.6rem/1 var(--mono);color:var(--fg)}.facts span{font-size:13px;color:var(--fg-2)}
.board{background:var(--panel);border:1px solid #1d2731;border-radius:14px;padding:18px;box-shadow:0 40px 80px -40px rgba(0,0,0,.8);font:500 14px/1 var(--mono)}
.bh{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 16px;color:var(--fg-2);font-size:11px;letter-spacing:.16em;text-transform:uppercase}
.bh b{color:var(--amb);font-weight:600}
.bh .clk{color:var(--fg);font-size:14px;letter-spacing:.06em}
.brow{display:grid;grid-template-columns:62px 1fr 132px;gap:12px;align-items:center;padding:13px 8px;border-top:1px solid #18212a}
.brow .h{color:var(--fg-2)}
.brow .d{color:var(--amb);text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.brow .s{justify-self:end;white-space:nowrap;font-size:10.5px;letter-spacing:.1em;color:var(--grn);text-transform:uppercase}
.brow .s::before{content:'●';margin-right:6px}
.flip{display:inline-block;animation:flip .5s steps(3) both}
@keyframes flip{0%{opacity:0;transform:translateY(-6px)}100%{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.flip{animation:none}}
.bf{padding:14px 8px 4px;color:var(--fg-2);font-size:11px;letter-spacing:.08em}
section{padding:100px 0}
.light{background:var(--light);color:var(--ink)}
.light .sub,.light .k{color:#56636F}
.k{font:500 12px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-2);margin:0 0 16px}
h2{font:700 clamp(2rem,4.2vw,3.3rem)/1.02 var(--sans);letter-spacing:-.03em;margin:0 0 16px}
.sub{color:var(--fg-2);max-width:54ch;margin:0}
.veh{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:46px}
.veh article{background:#fff;border:1px solid #DCE2E7;border-radius:14px;overflow:hidden}
.veh figure{margin:0;aspect-ratio:16/10;background:#E3E8EC}.veh figure img{width:100%;height:100%;object-fit:cover}
.veh div{padding:20px 20px 24px}
.veh h3{font:700 1.2rem/1.2 var(--sans);margin:0 0 10px}
.cap{display:flex;gap:16px;font:500 13px/1 var(--mono);color:#56636F}
.cap span{display:inline-flex;align-items:center;gap:6px}.cap b{color:var(--ink);font-size:16px}
.veh p{margin:12px 0 0;font-size:14.5px;color:#56636F}
.bkx{display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;align-items:start}
.bk{display:grid;gap:12px;background:var(--bg-2);border:1px solid var(--line);border-radius:14px;padding:26px}
.bk label{display:grid;gap:6px}.bk label span{font:500 11px/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--fg-2)}
.bk input,.bk select{width:100%;height:50px;border-radius:8px;border:1px solid var(--line);background:var(--panel);color:var(--fg);padding:0 14px;font:500 15px/1 var(--sans)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--amb)}
.bk-row{display:grid;grid-template-columns:1fr 130px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:56px;border:0;border-radius:8px;background:var(--amb);color:var(--ink);font:700 16px/1 var(--sans);cursor:pointer}
.bk-note{margin:0;font-size:12.5px;color:var(--fg-2)}
.steps{list-style:none;margin:28px 0 0;padding:0;counter-reset:s}
.steps li{counter-increment:s;display:grid;grid-template-columns:44px 1fr;gap:16px;padding:18px 0;border-top:1px solid var(--line)}
.steps li::before{content:'0' counter(s);font:600 14px/1.6 var(--mono);color:var(--amb)}
.steps b{display:block;font-weight:700;margin-bottom:2px}.steps span{color:var(--fg-2);font-size:15px}
.svc{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:#DCE2E7;border:1px solid #DCE2E7;border-radius:14px;overflow:hidden;margin-top:44px}
.svc div{background:#fff;padding:30px 28px}
.svc h3{font:700 1.25rem/1.2 var(--sans);margin:0 0 8px;display:flex;gap:12px;align-items:center}
.svc h3 i{font:500 12px/1 var(--mono);color:#B07400;font-style:normal}
.svc p{margin:0;color:#56636F;font-size:15px}
.proof{display:flex;align-items:center;gap:36px;flex-wrap:wrap;margin-top:56px;padding:26px 30px;border-radius:14px;background:var(--ink);color:var(--fg)}
.proof .n{font:600 3rem/1 var(--mono)}.proof .stars{color:var(--amb);display:inline-flex;gap:3px}
.proof p{margin:6px 0 0;color:var(--fg-2);font-size:14.5px}.proof a{margin-left:auto;font-weight:600;color:var(--amb);font-size:14px}
.faq{border-top:1px solid var(--line)}.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;padding:22px 0;font:600 1.1rem/1.35 var(--sans)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:20px;height:20px;position:relative}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:3px;right:3px;top:9px;height:2px;background:var(--amb)}
.faq summary i::after{transform:rotate(90deg);transition:transform .2s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 22px;color:var(--fg-2);max-width:62ch}
footer{border-top:1px solid var(--line);padding:40px 0;font:400 13px/1.6 var(--mono);color:var(--fg-2)}
footer .w{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px}footer a{text-decoration:none}
.hero h1,.hero .lede,.hero .facts,.hero .tag{animation:up .7s cubic-bezier(.2,.7,.2,1) both}.hero .lede{animation-delay:.08s}.hero .facts{animation-delay:.14s}
@keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hero *{animation:none!important}}
@media (max-width:960px){.hero .w,.bkx{grid-template-columns:1fr}.veh{grid-template-columns:1fr 1fr}.top .pill:not(.y){display:none}}
@media (max-width:600px){.w{padding:0 16px}section{padding:72px 0}.hero{padding:40px 0 64px}.veh,.svc{grid-template-columns:1fr}.brow{grid-template-columns:52px 1fr;}.brow .s{grid-column:2;justify-self:start}.facts{grid-template-columns:repeat(3,1fr);gap:14px}.facts b{font-size:1.25rem}.proof a{margin-left:0}.bk{padding:18px}}
`;

module.exports = function transfer(l, f){
  const city = f.city || 'Nord Italia';
  const mini = l.character === 'minibus_gruppi' || /minibus|navetta|bus|van/i.test(f.name+' '+(l.category||''));
  const d = (f.dests.length ? f.dests : ['Aeroporto','Stazione','Porto']).slice(0,6);
  const hours = ['05:30','06:45','08:10','10:20','13:05','16:40'];
  const pv = pick('berlina',l.slug,1).concat(pick('van',l.slug,2));
  const cap1 = x => x.charAt(0).toUpperCase()+x.slice(1);
  const base = [['Berlina','1–3','3','Coppie e viaggi di lavoro, con il bagaglio di una settimana.'],['Van','fino a 8','8','Famiglie e piccoli gruppi. Spazio per valigie grandi, sci e passeggini.'],
      mini?['Minibus','','','Gruppi, squadre, matrimoni. Un solo mezzo, tutti insieme.']:['Più mezzi','','','Per gruppi più grandi organizziamo più auto in partenza insieme.']];
  const real = f.vehicles.slice(0,3).map(v=>[cap1(v),'','','Nella flotta di '+esc(f.name)+'.']);
  const veh = real.concat(base.filter(b=>!real.some(r=>r[0].toLowerCase().includes(b[0].toLowerCase())))).slice(0,3);
  const html = head({
    title: f.name+' — Transfer da '+city+' per aeroporti e stazioni',
    desc:'Transfer da '+city+' per aeroporti, stazioni e porti'+(mini?', anche per gruppi':'')+'. Prezzo fisso a tratta, preventivo su WhatsApp.',
    theme:'#0E151C', ogImg: pv[1],
    fonts:'family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600',
    css: CSS
  }) + `
<body>
<header class="top"><div class="w">
  <a class="brand" href="#"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 16l20-7-3-2-6 2-6-4-2 1 4 5-4 1-2-1-1 1 3 3z"/></svg>${esc(f.name)}</a>
  <div class="r"><a class="pill" href="tel:${f.tel}">${ICON.phone}${esc(f.phoneDisplay)}</a><a class="pill y" href="#prenota">Prenota</a></div>
</div></header>
<main>
<section class="hero"><div class="w">
  <div>
    <p class="tag">Transfer${mini?' e gruppi':''} · ${esc(city)}</p>
    <h1>Da ${esc(city)} al <span>gate</span>, senza pensieri.</h1>
    <p class="lede">Aeroporti, stazioni e porti${mini?', anche per gruppi':''}. Prezzo fisso a tratta, deciso prima di partire.</p>
    <div class="facts">
      ${f.reviews?`<div><b>${esc(f.rating)}★</b><span>${f.reviews} recensioni</span></div>`:''}
      <div><b>${d.length}</b><span>tratte frequenti</span></div>
      <div><b>€ fisso</b><span>a tratta</span></div>
    </div>
  </div>
  <div class="board" aria-label="Tratte principali">
    <div class="bh"><span><b>Partenze</b> da ${esc(city)}</span><span class="clk" id="clk">--:--</span></div>
    ${d.map((x,i)=>`<div class="brow"><span class="h">${hours[i]}</span><span class="d"><span class="flip" style="animation-delay:${.15+i*.12}s">${esc(x)}</span></span><span class="s">Su prenotazione</span></div>`).join('')}
    <div class="bf">Orari di esempio · partite all’ora che scegliete voi</div>
  </div>
</div></section>

<section class="light"><div class="w">
  <p class="k">I mezzi</p>
  <h2>Scegliamo il mezzo in base a voi e ai bagagli.</h2>
  <p class="sub">Diteci quanti siete e cosa portate: vi mandiamo il mezzo giusto, non quello che capita.</p>
  <div class="veh">
    ${veh.map((v,i)=>`<article><figure>${img(pv[i]||pv[0],v[0],{w:800,sizes:'(max-width:600px) 100vw, 33vw'})}</figure><div><h3>${esc(v[0])}</h3>${v[1]?`<div class="cap"><span>Posti <b>${v[1]}</b></span></div>`:''}<p>${v[3]}</p></div></article>`).join('')}
  </div>
  <div class="svc">
    <div><h3><i>01</i>Arrivi</h3><p>Vi aspettiamo all’uscita con il vostro nome. Dateci il numero del volo o del treno quando prenotate.</p></div>
    <div><h3><i>02</i>Partenze</h3><p>Calcoliamo l’orario di partenza in base al volo, così arrivate con il margine giusto.</p></div>
    <div><h3><i>03</i>Porti e crociere</h3><p>Transfer per terminal e imbarchi, con spazio per tutti i bagagli.</p></div>
    <div><h3><i>04</i>${mini?'Gruppi ed eventi':'Lunghe tratte'}</h3><p>${mini?'Squadre, gite, matrimoni, aziende: un unico mezzo e un solo preventivo.':'Città, montagna, estero: preventivo fisso concordato prima.'}</p></div>
  </div>
  ${f.reviews?`<div class="proof"><div class="n">${esc(f.rating)}</div><div>${stars(f.ratingNum)}<p>Media di ${f.reviews} recensioni su Google.</p></div><a href="${f.maps}" target="_blank" rel="noopener">Leggi le recensioni ↗</a></div>`:''}
</div></section>

<section id="prenota"><div class="w bkx">
  <div>
    <p class="k">Prenota</p>
    <h2>Il preventivo in un messaggio.</h2>
    <p class="sub">Compilate i campi: si apre WhatsApp con il testo già scritto e vi risponde direttamente ${esc(f.name)}.</p>
    <ol class="steps"><li><div><b>Scrivete la tratta</b><span>Da dove, per dove, giorno e ora.</span></div></li><li><div><b>Ricevete il prezzo</b><span>Fisso, prima di partire.</span></div></li><li><div><b>Partite</b><span>Il mezzo è sotto casa all’ora concordata.</span></div></li></ol>
  </div>
  ${bookingForm(f,{id:'t',bigGroups:mini,labels:{from:'Da',to:'A',date:'Giorno e ora',pax:'Persone',send:'Chiedi il preventivo su WhatsApp',note:'Nessun dato viene salvato su questa pagina.'}})}
</div></section>

<section style="padding-top:0"><div class="w">
  <p class="k">Domande</p>
  ${faq([
    ['E se il volo arriva in ritardo?','Con il numero del volo seguiamo l’orario reale di arrivo.'],
    ['Quanti bagagli posso portare?','Diteci quante valigie e se avete sci, bici o passeggini: scegliamo il mezzo di conseguenza.'],
    ['Il prezzo è a persona o a corsa?','È a corsa, concordato prima della partenza.'],
    ['Si può prenotare andata e ritorno?','Sì, anche insieme nello stesso messaggio.']
  ])}
</div></section>
</main>
<footer><div class="w"><span>${esc(f.name)} · ${esc(f.address)}${f.address?', ':''}${esc(city)}</span><a href="${f.maps}" target="_blank" rel="noopener">Google Maps ↗</a><span>Foto di repertorio · Anteprima Umbra</span></div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
<script>(function(){var c=document.getElementById('clk');function t(){var d=new Date();c.textContent=('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)}t();setInterval(t,20000)})()</script>
</body></html>`;
  return html;
};
