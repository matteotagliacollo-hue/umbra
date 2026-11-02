// NERO — luxury chauffeur, limousine, auto di prestigio. Variante CERIMONIA (avorio) per auto da matrimonio.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head } = require('./lib');

const BASE = `
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);font:400 16px/1.7 var(--sans);-webkit-font-smoothing:antialiased}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1240px;margin:0 auto;padding:0 28px}
.top{position:absolute;top:0;left:0;right:0;z-index:10}
.top .w{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:92px}
.top nav{display:flex;gap:28px;font:500 12px/1 var(--sans);letter-spacing:.22em;text-transform:uppercase}.top nav a{text-decoration:none;opacity:.75}.top nav a:hover{opacity:1}
.mono{justify-self:center;text-align:center;text-decoration:none}
.mono b{display:block;font:400 1.7rem/1 var(--disp);letter-spacing:.06em}
.mono small{display:block;margin-top:6px;font:500 9.5px/1 var(--sans);letter-spacing:.42em;text-transform:uppercase;opacity:.65}
.top .tel{justify-self:end;display:inline-flex;gap:8px;align-items:center;font:500 13px/1 var(--sans);letter-spacing:.08em;text-decoration:none;padding:12px 18px;border:1px solid var(--line);border-radius:999px}
.hero{position:relative;min-height:100svh;display:grid;place-items:center;text-align:center;overflow:hidden;color:var(--hero-fg)}
.hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:var(--hero-filter)}
.hero::after{content:'';position:absolute;inset:0;background:var(--hero-veil)}
.hero .c{position:relative;z-index:2;padding:120px 24px 90px;max-width:980px}
.over{font:500 11px/1 var(--sans);letter-spacing:.42em;text-transform:uppercase;color:var(--acc);margin:0 0 28px}
h1{font:400 clamp(3.2rem,9vw,8rem)/.9 var(--disp);letter-spacing:-.01em;margin:0 0 26px}
h1 i{font-style:italic;color:var(--acc)}
.hero p{font-size:1.1rem;max-width:44ch;margin:0 auto 34px;opacity:.88}
.acts{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.b1,.b2{display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 28px;border-radius:999px;text-decoration:none;font:600 13px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase}
.b1{background:var(--acc);color:var(--on-acc)}.b2{border:1px solid currentColor}
.scroll{position:absolute;left:50%;bottom:28px;z-index:2;width:1px;height:56px;background:linear-gradient(var(--acc),transparent);animation:sc 2.4s ease-in-out infinite}
@keyframes sc{0%,100%{transform:translateY(-8px);opacity:.3}50%{transform:none;opacity:1}}
section{padding:120px 0}
.lab{font:500 11px/1 var(--sans);letter-spacing:.42em;text-transform:uppercase;color:var(--acc);margin:0 0 24px}
h2{font:400 clamp(2.6rem,5.6vw,4.8rem)/.98 var(--disp);margin:0 0 22px}h2 i{color:var(--acc)}
.p{color:var(--fg-2);max-width:52ch;margin:0}
.intro{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:end}
.intro .big{font:400 clamp(1.6rem,2.6vw,2.2rem)/1.35 var(--disp);margin:0}
.gal{display:grid;grid-template-columns:1.4fr 1fr;grid-template-rows:300px 300px;gap:16px;margin-top:70px}
.gal figure{margin:0;overflow:hidden;border-radius:4px;background:var(--bg-2)}.gal figure:first-child{grid-row:1/3}
.gal img{width:100%;height:100%;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}.gal figure:hover img{transform:scale(1.04)}
.list{margin-top:60px;border-top:1px solid var(--line)}
.it{display:grid;grid-template-columns:120px 1fr 1.1fr;gap:36px;padding:40px 0;border-bottom:1px solid var(--line);align-items:baseline}
.it span{font:400 1.1rem/1 var(--disp);font-style:italic;color:var(--acc)}
.it h3{font:400 2rem/1.05 var(--disp);margin:0}.it p{margin:0;color:var(--fg-2)}
.band{background:var(--bg-2);text-align:center}
.band .n{font:400 clamp(6rem,14vw,11rem)/.85 var(--disp);color:var(--acc)}
.band .stars{display:inline-flex;gap:4px;color:var(--acc);margin:18px 0 10px}
.band p{color:var(--fg-2);margin:0 0 18px}.band a{font:500 12px/1 var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--acc)}
.bkx{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px;align-items:center}
.bk{display:grid;gap:14px}
.bk label{display:grid;gap:6px}.bk label span{font:500 10.5px/1 var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--fg-3)}
.bk input,.bk select{width:100%;height:52px;border:0;border-bottom:1px solid var(--line);background:transparent;color:var(--fg);padding:0 2px;font:400 17px/1 var(--sans);border-radius:0}
.bk select{background:var(--bg)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--acc)}
.bk-row{display:grid;grid-template-columns:1fr 130px;gap:22px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:58px;margin-top:10px;border:0;border-radius:999px;background:var(--acc);color:var(--on-acc);font:600 13px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;cursor:pointer}
.bk-note{margin:0;font-size:12.5px;color:var(--fg-3)}
.faq{border-top:1px solid var(--line)}.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:24px;padding:28px 0;font:400 1.6rem/1.2 var(--disp)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:16px;height:16px;position:relative;margin-top:10px}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:0;right:0;top:7px;height:1px;background:var(--acc)}
.faq summary i::after{transform:rotate(90deg);transition:transform .3s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 28px;color:var(--fg-2);max-width:60ch}
footer{border-top:1px solid var(--line);padding:46px 0;text-align:center;font-size:13px;color:var(--fg-3)}
footer .mono{display:inline-block;margin-bottom:16px;color:var(--fg)}footer a{text-decoration:none}
.hero .c>*{animation:up 1.1s cubic-bezier(.2,.7,.2,1) both}.hero h1{animation-delay:.08s}.hero p{animation-delay:.18s}.hero .acts{animation-delay:.26s}
.hero>img{animation:zoom 18s ease-out both}@keyframes zoom{from{transform:scale(1.1)}to{transform:none}}
@keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.hero *,.hero>img,.scroll{animation:none!important}}
@media (max-width:980px){.top nav{display:none}.top .w{grid-template-columns:1fr auto}.mono{justify-self:start;text-align:left}.intro,.bkx{grid-template-columns:1fr;gap:30px}.it{grid-template-columns:70px 1fr;gap:8px 20px}.it p{grid-column:2}.gal{grid-template-columns:1fr 1fr;grid-template-rows:240px 200px}.gal figure:first-child{grid-row:auto;grid-column:1/3}}
@media (max-width:600px){.over{letter-spacing:.22em;line-height:1.6}.w{padding:0 18px}section{padding:84px 0}.top .tel span{display:none}.b1,.b2{flex:1;justify-content:center}.gal{grid-template-rows:220px 160px}}
`;
const DARK = `:root{--bg:#0B0B0C;--bg-2:#141414;--fg:#F1ECE2;--fg-2:#A9A397;--fg-3:#6D685F;--line:rgba(241,236,226,.13);--acc:#CDB07A;--on-acc:#0B0B0C;--hero-fg:#F1ECE2;--hero-filter:brightness(.55) saturate(.8);--hero-veil:radial-gradient(ellipse at center,rgba(11,11,12,.15),rgba(11,11,12,.75));--sans:'Manrope',system-ui,-apple-system,sans-serif;--disp:'Bodoni Moda',Didot,Georgia,serif;--mbar-bg:#0B0B0C}`;
const LIGHT = `:root{--bg:#F8F4EC;--bg-2:#EFE8DA;--fg:#2A2621;--fg-2:#6E665B;--fg-3:#9A9083;--line:rgba(42,38,33,.14);--acc:#8E7448;--on-acc:#fff;--hero-fg:#fff;--hero-filter:brightness(.78) saturate(.9);--hero-veil:linear-gradient(180deg,rgba(42,38,33,.35),rgba(42,38,33,.55));--sans:'Manrope',system-ui,-apple-system,sans-serif;--disp:'Cormorant Garamond',Georgia,serif;--mbar-bg:#2A2621}
.top{color:#fff}.top .tel{border-color:rgba(255,255,255,.4)}.hero .over{color:#F3E3C4}.hero h1 i{color:#F3E3C4}.b2{color:#fff}`;

module.exports = function nero(l, f){
  const city = f.city || 'Nord Italia';
  const wed = l.character === 'cerimonie';
  const self = l.character === 'noleggio_prestigio';
  const limo = l.character === 'limousine_eventi';
  const ini = f.name.split(/\s+/).filter(w=>w.length>2).map(w=>w[0]).join('').slice(0,3).toUpperCase() || 'NC';
  const heroCat = wed ? 'matrimonio' : self ? 'supercar' : 'interni';
  const [hero] = pick(heroCat, l.slug, 1);
  const g = wed ? pick('matrimonio', l.slug+'g', 3) : self ? pick('supercar', l.slug+'g', 3) : [pick('berlina',l.slug,1)[0], pick('autista',l.slug,1)[0], pick('notturno',l.slug,1)[0]];
  const C = wed ? {
    over:'Auto per cerimonie · '+city, h1:'Il giorno <i>del sì.</i>', lede:'L’auto per gli sposi, con autista. Tempi e percorso studiati insieme a voi, perché quel giorno non si fanno prove.',
    i1:'Ogni matrimonio ha un orario preciso. Il nostro lavoro è rispettarlo, e farvi arrivare come avete immaginato.',
    items:[['La sposa','Dalla casa alla chiesa o al comune, con i tempi concordati con fotografo e cerimonia.'],['Gli sposi','Dalla cerimonia alla location, con le soste per le foto.'],['Gli ospiti','Su richiesta, corse per famiglie e invitati tra cerimonia, location e hotel.']],
    k:'Le date si riempiono', bk:'Chiedete la vostra data.', note:'Indicate data, luogo della cerimonia e location: vi rispondiamo con disponibilità e preventivo.',
    faqs:[['Possiamo vedere l’auto prima?','Sì, chiedetelo quando prenotate: fissiamo un incontro.'],['L’auto viene addobbata?','Chiedetelo nel messaggio: vi diciamo cosa è incluso.'],['Con quanto anticipo prenotare?','Il prima possibile: le date di maggio-settembre si prenotano con mesi di anticipo.']]
  } : self ? {
    over:'Noleggio auto di prestigio · '+city, h1:'Guidatela <i>voi.</i>', lede:'Auto di prestigio a noleggio, a giornata o nel weekend. Condizioni chiare prima di firmare.',
    i1:'Una giornata, un weekend, un evento. Vi diciamo subito disponibilità, cauzione e chilometri inclusi.',
    items:[['A giornata','Ritiro al mattino, riconsegna la sera.'],['Weekend','Dal venerdì al lunedì, per un viaggio vero.'],['Eventi e shooting','Per servizi fotografici, video, presentazioni.']],
    k:'Disponibilità', bk:'Chiedete l’auto e la data.', note:'Vi rispondiamo con disponibilità, cauzione e condizioni.',
    faqs:[['Che requisiti servono?','Età minima, anni di patente e cauzione ve li comunichiamo prima della prenotazione.'],['I chilometri sono illimitati?','Dipende dalla formula: ve lo diciamo nel preventivo.'],['Consegnate l’auto?','Chiedetelo nel messaggio con indirizzo e orario.']]
  } : {
    over:(limo?'Limousine e auto con autista':'Chauffeur privato')+' · '+city, h1:limo?'L’arrivo <i>che si ricorda.</i>':'Il viaggio, <i>senza pensieri.</i>',
    lede: limo?'Limousine e auto di rappresentanza con autista per serate, compleanni, eventi e matrimoni.':'Auto di rappresentanza con autista per aeroporti, eventi e ospiti importanti. Riservatezza e puntualità, prezzo concordato prima.',
    i1: limo?'Una serata importante merita un arrivo all’altezza. Diteci l’occasione: pensiamo noi a orari e percorso.':'Ospiti da accogliere, una serata importante, un volo all’alba. Vi lasciamo solo la parte del viaggio che conta.',
    items: limo?[['Serate ed eventi','Compleanni, addii al celibato e al nubilato, feste aziendali.'],['Matrimoni','L’auto degli sposi e le corse per gli ospiti.'],['Su misura','Diteci l’occasione e il numero di persone.']]:[['Aeroporti e jet privati','Accoglienza agli arrivi, bagagli, auto pronta.'],['Ospiti e delegazioni','Più auto coordinate, un solo referente.'],['Serate ed eventi','Andata, attesa, ritorno: nessun pensiero.']],
    k:'Prenotazioni', bk:'Diteci l’occasione.', note:'Vi risponde direttamente '+f.name+'.',
    faqs:[['Il prezzo è concordato prima?','Sì, sempre prima del servizio.'],['L’autista attende durante l’evento?','Sì, se lo prevedete nella prenotazione.'],['Fate servizi fuori città?','Sì, anche lunghe tratte: chiedete il preventivo.']]
  };
  if (f.vehicles.length) C.items[2] = ['Le auto', f.vehicles.slice(0,4).map(esc).join(', ')+'.'];
  const html = head({
    title: f.name+' — '+C.over.replace(' · ',' a '),
    desc: C.lede, theme: wed?'#F8F4EC':'#0B0B0C', ogImg: hero,
    fonts: wed?'family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600':'family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Manrope:wght@400;500;600',
    css: (wed?LIGHT:DARK)+BASE
  }) + `
<body>
<header class="top"><div class="w">
  <nav><a href="#servizi">Servizi</a><a href="#prenota">Prenota</a></nav>
  <a class="mono" href="#"><b>${esc(ini)}</b><small>${esc(f.name.length>30?f.name.slice(0,28)+'…':f.name)}</small></a>
  <a class="tel" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a>
</div></header>
<main>
<section class="hero" style="padding:0">
  ${img(hero, wed?'Auto per cerimonia':'Interni di un’auto di rappresentanza',{eager:true,w:2000,sizes:'100vw'})}
  <div class="c">
    <p class="over">${esc(C.over)}</p>
    <h1>${C.h1}</h1>
    <p>${esc(C.lede)}</p>
    <div class="acts"><a class="b1" href="${waText(f,'Buongiorno, vorrei informazioni.')}">${ICON.wa}WhatsApp</a><a class="b2" href="tel:${f.tel}">${ICON.phone}Chiama</a></div>
  </div>
  <i class="scroll" aria-hidden="true"></i>
</section>

<section><div class="w">
  <div class="intro"><div><p class="lab">${esc(f.name)}</p><h2>${wed?'Fatto <i>con calma.</i>':self?'Chiaro <i>prima.</i>':'Discreti, <i>puntuali.</i>'}</h2></div><p class="big">${esc(C.i1)}</p></div>
  <div class="gal">${g.map((x,i)=>`<figure>${img(x,'Foto di repertorio',{w:i?800:1400,sizes:i?'(max-width:980px) 50vw, 33vw':'(max-width:980px) 100vw, 60vw'})}</figure>`).join('')}</div>
</div></section>

<section id="servizi" style="padding-top:0"><div class="w">
  <p class="lab">Servizi</p>
  <div class="list">${C.items.map((x,i)=>`<div class="it"><span>${['I','II','III'][i]}</span><h3>${esc(x[0])}</h3><p>${x[1]}</p></div>`).join('')}</div>
</div></section>

${f.reviews?`<section class="band"><div class="w"><div class="n">${esc(f.rating)}</div>${stars(f.ratingNum)}<p>${f.reviews} recensioni su Google</p><a href="${f.maps}" target="_blank" rel="noopener">Leggi le recensioni</a></div></section>`:''}

<section id="prenota"><div class="w bkx">
  <div><p class="lab">${esc(C.k)}</p><h2>${esc(C.bk)}</h2><p class="p">${esc(C.note)}</p></div>
  ${bookingForm(f,{id:'n',labels:{from:wed?'Partenza (casa della sposa)':self?'Auto desiderata':'Partenza',to:wed?'Cerimonia e location':self?'Ritiro e riconsegna':'Destinazione',date:wed?'Data del matrimonio':'Data e ora',pax:self?'Giorni':'Persone',send:'Invia su WhatsApp',note:'Si apre WhatsApp con il messaggio pronto.'},toPh:wed?'Es. chiesa, villa':self?'Es. sede, hotel':'Es. aeroporto, evento',fromPh:self?'Es. il modello che vi interessa':undefined})}
</div></section>

<section style="padding-top:0"><div class="w"><p class="lab">Domande</p>${faq(C.faqs)}</div></section>
</main>
<footer><div class="w"><a class="mono" href="#"><b>${esc(ini)}</b><small>${esc(f.name)}</small></a><p>${esc(f.address)}${f.address?' · ':''}${esc(city)} · <a href="${f.maps}" target="_blank" rel="noopener">Google Maps</a> · <a href="tel:${f.tel}">${esc(f.phoneDisplay)}</a></p><p>Foto di repertorio · Anteprima Umbra</p></div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
</body></html>`;
  return html;
};
