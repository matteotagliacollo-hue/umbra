// FERMATA — template per il taxi/NCC di città. Struttura propria:
// strada verticale fissa con l'auto che scende mentre scorri, sezioni come "fermate",
// chat WhatsApp animata, griglia a mattonelle che si ribaltano, città che si rimpicciolisce
// e lascia entrare le destinazioni, mosaico a colonne con velocità diverse, numero di telefono a contachilometri.
const { esc, pick, img, waText, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head } = require('./lib');

const CSS = `
:root{--bg:#F6F4EF;--bg-2:#ECE8DF;--paper:#FFFFFF;--ink:#14161A;--ink-2:#5C5F66;--line:#DCD7CC;--sig:#F5B700;--green:#1F7A4D;--road:#22252B;
--disp:'Syne',system-ui,sans-serif;--body:'Outfit',system-ui,-apple-system,sans-serif;--gut:clamp(64px,8vw,120px);--mbar-bg:#14161A}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 17px/1.6 var(--body);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1320px;margin:0 auto 0 0;padding-left:max(var(--gut),env(safe-area-inset-left,0px));padding-right:max(24px,env(safe-area-inset-right,0px))}
/* la strada */
.road{position:fixed;left:clamp(18px,3vw,40px);top:0;bottom:0;width:22px;z-index:40;pointer-events:none}
.road::before{content:'';position:absolute;inset:0;background:var(--road);border-radius:3px}
.road .lane{position:absolute;left:10px;top:0;bottom:0;width:2px;background:repeating-linear-gradient(to bottom,rgba(255,255,255,.55) 0 14px,transparent 14px 30px)}
.road .done{position:absolute;left:0;right:0;top:0;height:100%;background:var(--sig);transform-origin:50% 0;transform:scaleY(0);opacity:.9;border-radius:3px}
.road .car{position:absolute;left:-5px;top:0;width:32px;height:52px;will-change:transform}
.stop{position:absolute;left:calc(clamp(18px,3vw,40px) - 9px);top:6px;width:40px;height:40px;border-radius:50%;background:var(--bg);border:3px solid var(--road);display:grid;place-items:center;font:800 13px/1 var(--disp);z-index:41;transition:background .4s,color .4s,border-color .4s}
.stop.on{background:var(--sig);border-color:var(--sig)}
/* header */
.hd{position:fixed;left:0;right:0;top:0;z-index:50;transition:background .3s,box-shadow .3s}
.hd.solid{background:rgba(246,244,239,.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--line)}
.hd .w{display:flex;justify-content:space-between;align-items:center;height:70px;gap:12px}
.brand{font:800 17px/1 var(--disp);text-decoration:none;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.call{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 18px;border-radius:999px;background:var(--ink);color:#fff;text-decoration:none;font:600 15px/1 var(--body);white-space:nowrap}
/* hero */
.hero{min-height:100svh;display:flex;align-items:center;padding-block:110px 60px}
.hero .w{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:40px;align-items:center;width:100%}
.tag{display:inline-flex;align-items:center;gap:10px;font:600 13px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);margin-bottom:26px}
.tag i{width:9px;height:9px;border-radius:50%;background:var(--green);box-shadow:0 0 0 0 rgba(31,122,77,.5);animation:pulse 2s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(31,122,77,0)}100%{box-shadow:0 0 0 0 rgba(31,122,77,0)}}
h1{font:800 min(5.6rem,calc(36vw / var(--L,8)))/.92 var(--disp);letter-spacing:-.04em;margin:0 0 28px;text-transform:uppercase}
h1 .ln{display:block;overflow:hidden}h1 .ln>span{display:inline-block}
h1 .hl{color:var(--bg);-webkit-text-stroke:2px var(--ink);text-stroke:2px var(--ink)}
.lede{font-size:1.15rem;color:var(--ink-2);max-width:40ch;margin:0 0 30px}
.acts{display:flex;gap:12px;flex-wrap:wrap}
.b{display:inline-flex;align-items:center;gap:10px;height:58px;padding:0 26px;border-radius:16px;text-decoration:none;font:700 16px/1 var(--body);transition:transform .2s}
.b:hover{transform:translateY(-3px)}.b.y{background:var(--sig);color:var(--ink)}.b.dk{background:var(--ink);color:#fff}.b.wa{background:#1FAF55;color:#fff}
.stage{position:relative;height:min(640px,78svh);min-width:320px}
.stage .ph{position:absolute;right:0;top:4%;width:78%;height:80%;border-radius:28px;overflow:hidden;transform:rotate(3deg);box-shadow:0 40px 80px -40px rgba(20,22,26,.6)}
.stage .ph img,.stage .ph .phx{width:100%;height:100%;object-fit:cover}
.phone{position:absolute;left:0;bottom:0;width:min(300px,70%);aspect-ratio:9/18.5;background:#0E1013;border-radius:42px;padding:12px;box-shadow:0 50px 90px -30px rgba(20,22,26,.7),inset 0 0 0 2px #2a2d33}
.scr{height:100%;border-radius:32px;overflow:hidden;background:#ECE5DD;display:flex;flex-direction:column}
.scr .top{background:#075E54;color:#fff;padding:26px 14px 12px;display:flex;align-items:center;gap:10px;font:600 13px/1.2 var(--body)}
.scr .top b{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#25D366;font-size:12px}
.scr .top small{display:block;font-weight:400;opacity:.8;font-size:11px}
.msgs{flex:1;padding:14px 10px;display:flex;flex-direction:column;gap:8px;justify-content:flex-end;font:400 12.5px/1.4 var(--body)}
.m{max-width:84%;padding:8px 10px;border-radius:10px;box-shadow:0 1px 1px rgba(0,0,0,.1);color:#111}
.m.o{align-self:flex-end;background:#DCF8C6;border-top-right-radius:2px}.m.i{align-self:flex-start;background:#fff;border-top-left-radius:2px}
.m.typing{display:flex;gap:4px;padding:12px 12px}.m.typing i{width:6px;height:6px;border-radius:50%;background:#999;animation:dot 1.2s infinite}.m.typing i:nth-child(2){animation-delay:.15s}.m.typing i:nth-child(3){animation-delay:.3s}
@keyframes dot{30%{transform:translateY(-4px);opacity:1}0%,60%,100%{opacity:.4}}
.ex{position:absolute;left:0;bottom:-30px;font:500 11px/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2)}
/* sezioni */
.sec{position:relative;padding-block:clamp(90px,12vw,160px)}
.k{font:600 13px/1 var(--body);letter-spacing:.16em;text-transform:uppercase;color:var(--ink-2);margin:0 0 18px}
.h2{font:800 clamp(2.4rem,5.6vw,4.8rem)/.95 var(--disp);letter-spacing:-.035em;margin:0 0 22px;text-transform:uppercase;max-width:16ch}
.sub{color:var(--ink-2);max-width:54ch;margin:0;font-size:1.08rem}
/* fermata 1: chi siamo */
.about{display:grid;grid-template-columns:1.2fr .8fr;gap:60px;align-items:center}
.big{font:700 clamp(1.8rem,3.6vw,3rem)/1.18 var(--disp);letter-spacing:-.02em;margin:0}
.big em{font-style:normal;background:linear-gradient(transparent 60%,var(--sig) 60%)}
.ring{position:relative;width:min(300px,70vw);aspect-ratio:1;margin-inline:auto}
.ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.ring .tr{fill:none;stroke:var(--bg-2);stroke-width:14}.ring .fl{fill:none;stroke:var(--sig);stroke-width:14;stroke-linecap:round}
.ring .c{position:absolute;inset:0;display:grid;place-items:center;text-align:center}
.ring .c b{display:block;font:800 clamp(3.6rem,8vw,5rem)/1 var(--disp);letter-spacing:-.04em}.ring .c span{font-size:14px;color:var(--ink-2)}
.ring .stars{color:#E2A400;display:inline-flex;gap:2px;margin-top:6px}
/* fermata 2: mattonelle */
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(220px,auto);gap:16px;margin-top:54px;perspective:1200px}
.tile{position:relative;border-radius:24px;padding:26px;background:var(--paper);border:1px solid var(--line);overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;transform-style:preserve-3d;transition:translate .35s cubic-bezier(.2,.7,.2,1)}
.tile:hover{translate:0 -6px}
.tile.ph1{grid-column:span 2;grid-row:span 2;color:#fff}.tile.ph2{grid-column:span 2;color:#fff}
.tile .im{position:absolute;inset:0}.tile .im img,.tile .im .phx{width:100%;height:100%;object-fit:cover}
.tile .im::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 30%,rgba(20,22,26,.85))}
.tile h3{position:relative;font:800 1.45rem/1.05 var(--disp);letter-spacing:-.02em;margin:0 0 8px;text-transform:uppercase}
.tile p{position:relative;margin:0;font-size:15px;color:inherit;opacity:.82}
.tile .ic{position:absolute;top:22px;left:24px;width:44px;height:44px;border-radius:12px;background:var(--sig);display:grid;place-items:center;font:800 16px/1 var(--disp);color:var(--ink)}
.tile.dk{background:var(--ink);color:#fff;border-color:var(--ink)}
/* fermata 3: la città che si rimpicciolisce */
.dest{min-height:100svh;display:flex;align-items:center;overflow:hidden;background:var(--ink);color:#fff}
.dest .w{width:100%;position:relative}
.cityw{font:800 clamp(4rem,19vw,17rem)/.82 var(--disp);letter-spacing:-.06em;text-transform:uppercase;margin:0;white-space:nowrap;color:var(--sig);transform-origin:0 50%}
.dl{list-style:none;margin:30px 0 0;padding:0;display:grid;gap:0;max-width:820px;margin-left:auto}
.dl li{display:grid;grid-template-columns:44px 1fr auto;gap:16px;align-items:center;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.14);font:700 clamp(1.1rem,2vw,1.5rem)/1.2 var(--disp)}
.dl li span{font:600 13px/1 var(--body);color:rgba(255,255,255,.55)}
.dl li a{font:600 14px/1 var(--body);text-decoration:none;background:rgba(255,255,255,.1);padding:10px 14px;border-radius:999px;white-space:nowrap}
.dl li a:hover{background:var(--sig);color:var(--ink)}
/* fermata 4: mosaico */
.mos{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:54px;align-items:start}
.col{display:grid;gap:16px}
.col figure{margin:0;position:relative;border-radius:22px;overflow:hidden;background:var(--bg-2)}
.col figure img,.col figure .phx{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.col figure.t{aspect-ratio:3/4}.col figure.s{aspect-ratio:1}.col figure.l{aspect-ratio:4/3}
.col figcaption{position:absolute;left:14px;bottom:12px;z-index:2;color:#fff;font:600 13px/1 var(--body);text-shadow:0 1px 8px rgba(0,0,0,.5)}
/* fermata 5: prenotare */
.book{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center}
.book .phone{position:relative;left:auto;bottom:auto;width:min(320px,80vw);margin-inline:auto}
.bk{display:grid;gap:12px;background:var(--paper);border:1px solid var(--line);border-radius:26px;padding:30px;margin-top:30px}
.bk label{display:grid;gap:6px}.bk label span{font:600 12px/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2)}
.bk input,.bk select{width:100%;height:54px;border-radius:14px;border:1.5px solid var(--line);background:var(--bg);color:var(--ink);padding:0 16px;font:500 16px/1 var(--body)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--ink)}
.bk-row{display:grid;grid-template-columns:1fr 120px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:60px;border:0;border-radius:16px;background:#1FAF55;color:#fff;font:700 16px/1 var(--body);cursor:pointer}
.bk-note{margin:0;font-size:13px;color:var(--ink-2)}
.faq{border-top:3px solid var(--ink)}.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;padding:26px 0;font:700 1.2rem/1.3 var(--disp)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:30px;height:30px;border-radius:50%;background:var(--sig);position:relative}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:9px;right:9px;top:14px;height:2px;background:var(--ink)}
.faq summary i::after{transform:rotate(90deg);transition:transform .25s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 26px;color:var(--ink-2);max-width:62ch}
/* finale */
.fin{background:var(--sig);padding-block:clamp(100px,13vw,170px);overflow:hidden}
.fin .k{color:#5a4a00}
.odo{display:flex;flex-wrap:wrap;font:800 clamp(2.8rem,10vw,9rem)/1 var(--disp);letter-spacing:-.04em;margin:0 0 34px;text-decoration:none}
.odo .d{display:inline-block;height:1em;overflow:hidden;vertical-align:top}.odo .d>span{display:block;transform:translateY(-90%)}
.odo .sp{display:inline-block;width:.3em}
.foot{background:var(--ink);color:#BFC2C8;padding-block:60px 44px;font-size:15px}
.foot .w{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:30px}.foot h4{font:700 12px/1 var(--body);letter-spacing:.16em;text-transform:uppercase;color:#fff;margin:0 0 14px}
.foot p{margin:0 0 6px}.foot a{text-decoration:none;color:#fff}.foot .legal{grid-column:1/-1;font-size:12px;margin-top:20px}
.phx{background:linear-gradient(160deg,#59626d,#272c33)}
:focus-visible{outline:3px solid var(--sig);outline-offset:3px}
@media (max-width:980px){h1{font-size:min(4.2rem,calc(70vw / var(--L,8)))}.hero .w,.about,.book{grid-template-columns:1fr}.stage{height:520px;margin-top:20px;min-width:0}.bento{grid-template-columns:1fr 1fr}.tile.ph1{grid-column:span 2;grid-row:span 1;min-height:320px}.foot .w{grid-template-columns:1fr}}
@media (max-width:640px){:root{--gut:46px}.road{left:12px;width:12px}.road .lane{left:5px}.road .car{left:-7px;width:26px;height:42px}.stop{width:30px;height:30px;font-size:11px;left:3px}
 .bento{grid-template-columns:1fr}.tile.ph1,.tile.ph2{grid-column:auto}.mos{grid-template-columns:1fr 1fr}.mos .col:nth-child(3){display:none}.b{flex:1;justify-content:center}.call span{display:none}.call{padding:0 14px}.bk{padding:20px}.dl li{grid-template-columns:30px 1fr;}.dl li a{grid-column:2;justify-self:start}.stage{height:460px}}
`;

const ENGINE = `<script>
(function(){
function boot(){
 var H=document.documentElement,q=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 var hd=document.querySelector('.hd');addEventListener('scroll',function(){hd.classList.toggle('solid',scrollY>30)},{passive:true});
 // fermate che si accendono (anche senza GSAP)
 if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on')})},{rootMargin:'0px 0px -45% 0px'});q('.stop').forEach(function(s){io.observe(s)})}
 if(typeof gsap==='undefined'||!window.ScrollTrigger||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 gsap.registerPlugin(ScrollTrigger);var mob=matchMedia('(max-width:640px)').matches;
 // STRADA: l'auto scende con la pagina, l'asfalto percorso si colora
 var road=document.querySelector('.road'),car=road.querySelector('.car'),done=road.querySelector('.done');
 ScrollTrigger.create({start:0,end:'max',onUpdate:function(s){var h=road.clientHeight-car.clientHeight;gsap.to(car,{y:s.progress*h,rotation:gsap.utils.clamp(-14,14,s.getVelocity()/220),duration:.5,ease:'power3.out',overwrite:true});gsap.to(done,{scaleY:s.progress,duration:.5,ease:'power3.out',overwrite:true})}});
 // HERO: righe che entrano da sinistra, foto che ruota, chat che si scrive (dopo l'intro)
 var tl=gsap.timeline({paused:true});
 tl.from('h1 .ln>span',{xPercent:-105,duration:1.1,ease:'expo.out',stagger:.09})
   .from('.hero [data-in]',{y:30,opacity:0,duration:.8,ease:'power3.out',stagger:.08},'-=.7')
   .from('.stage .ph',{rotation:-8,scale:.85,opacity:0,duration:1.2,ease:'expo.out'},0.1)
   .from('.stage .phone',{y:120,opacity:0,duration:1.1,ease:'expo.out'},0.3);
 var chat=q('.hero .msgs .m');gsap.set(chat,{opacity:0,y:14,scale:.96,transformOrigin:'100% 100%'});
 chat.forEach(function(m,i){tl.to(m,{opacity:1,y:0,scale:1,duration:.4,ease:'back.out(2)'},1.1+i*.75);if(m.classList.contains('typing'))tl.to(m,{opacity:0,height:0,padding:0,margin:0,duration:.2},1.1+i*.75+.65)});
 if(/\\bu-lock\\b/.test(H.className))addEventListener('umbra:intro-done',function(){tl.play()},{once:true});else tl.play();
 // titoli
 q('.h2').forEach(function(h){gsap.from(h,{yPercent:40,opacity:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:h,start:'top 88%'}})});
 // anello della valutazione
 q('.ring').forEach(function(r){var f=r.querySelector('.fl'),L=2*Math.PI*90,v=parseFloat(r.getAttribute('data-v'))/5;gsap.set(f,{strokeDasharray:L,strokeDashoffset:L});
   var o={n:0},b=r.querySelector('b'),fin=b.textContent;
   gsap.timeline({scrollTrigger:{trigger:r,start:'top 80%'}}).to(f,{strokeDashoffset:L*(1-v),duration:2,ease:'power3.out'},0).to(o,{n:parseFloat(fin.replace(',','.')),duration:2,ease:'power3.out',onUpdate:function(){b.textContent=o.n.toFixed(1).replace('.',',')}},0)});
 q('.big').forEach(function(b){gsap.from(b,{opacity:0,y:40,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:b,start:'top 85%'}})});
 // mattonelle che si ribaltano
 gsap.from('.tile',{rotationX:-75,y:80,opacity:0,transformOrigin:'50% 0%',duration:1.1,ease:'expo.out',stagger:{each:.09,from:'start'},scrollTrigger:{trigger:'.bento',start:'top 82%'}});
 // la città si rimpicciolisce e lascia entrare le destinazioni
 var D=document.querySelector('.dest');
 if(D){var dt=gsap.timeline({scrollTrigger:{trigger:D,start:'top top',end:mob?'+=150%':'+=200%',scrub:.7,pin:true,anticipatePin:1}});
   dt.fromTo('.cityw',{scale:1.15},{scale:mob?.42:.36,y:mob?-10:-20,duration:1,ease:'power2.inOut'})
     .from('.dl li',{x:mob?120:260,opacity:0,stagger:.18,duration:.5,ease:'power3.out'},.35)
     .from('.dest .k',{opacity:0,duration:.2},.3)}
 // mosaico: colonne a velocità diverse
 var sp=mob?[-30,30,0]:[-90,60,-160];q('.mos .col').forEach(function(c,i){gsap.fromTo(c,{y:-sp[i]/2},{y:sp[i],ease:'none',scrollTrigger:{trigger:'.mos',start:'top bottom',end:'bottom top',scrub:true}})});
 q('.mos figure').forEach(function(f){gsap.from(f,{clipPath:'inset(100% 0 0 0 round 22px)',duration:1.2,ease:'expo.out',scrollTrigger:{trigger:f,start:'top 92%'}})});
 // chat di prenotazione: i messaggi arrivano mentre scorri
 var bp=document.querySelector('.book .msgs');
 if(bp){var bm=q('.m',bp);gsap.set(bm,{opacity:0,y:16});
   var bt=gsap.timeline({scrollTrigger:{trigger:'.book',start:'top 70%',end:'bottom 70%',scrub:.5}});bm.forEach(function(m,i){bt.to(m,{opacity:1,y:0,duration:.3},i*.4)})}
 // numero di telefono a contachilometri
 q('.odo').forEach(function(o){gsap.fromTo(o.querySelectorAll('.d>span'),{y:0,yPercent:function(i){return -((i*3)%5)*10}},{yPercent:-90,duration:1.8,ease:'expo.out',stagger:.05,scrollTrigger:{trigger:o,start:'top 88%'}})});
 addEventListener('umbra:intro-done',function(){ScrollTrigger.refresh()});addEventListener('load',function(){ScrollTrigger.refresh()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
</script>`;

const GSAP = `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>`;

const CAR = `<svg class="car" viewBox="0 0 32 52" aria-hidden="true"><rect x="3" y="2" width="26" height="48" rx="9" fill="#F5B700"/><rect x="6" y="13" width="20" height="11" rx="3" fill="#14161A"/><rect x="6" y="33" width="20" height="8" rx="3" fill="#14161A" opacity=".85"/><rect x="11" y="26" width="10" height="5" rx="1.5" fill="#14161A"/><circle cx="8" cy="4" r="2" fill="#fff"/><circle cx="24" cy="4" r="2" fill="#fff"/></svg>`;

module.exports = function fermata(l, f){
 const city = f.city || 'Nord Italia';
 const ini = f.name.replace(/^(taxi|ncc|servizio|autonoleggio)\s+/i,'').split(/\s+/).filter(Boolean).map(w=>w[0]).join('').slice(0,2).toUpperCase()||'TX';
 const d = (f.dests.length ? f.dests : ['Stazione ferroviaria','Aeroporto','Ospedale','Centro città']).slice(0,6);
 const air = d.find(x=>/Aeroporto/.test(x)) || d[0];
 const P = (cat,n,salt) => pick(cat, l.slug+(salt||''), n);
 const [hp] = P('berlina',1,'h');
 const ph = (id,alt,o) => img(id, alt, Object.assign({w:900,sizes:'(max-width:640px) 100vw, 33vw'}, o||{}));
 const g = [P('citta',1,'a')[0],P('berlina',1,'b')[0],P('notturno',1,'c')[0],P('autista',1,'d')[0],P('strada',1,'e')[0],P('aeroporto',1,'f')[0],P('interni',1,'g')[0],P('van',1,'i')[0],P('notturno',1,'j')[0]];
 const caps = ['In città','Pronta alla partenza','Di sera','Alla porta','Fuori porta','Al terminal','A bordo','Per i gruppi','Rientro tardi'];
 const cols = [[0,'t'],[1,'s'],[2,'l']].map((_,c)=>[0,1,2].map(r=>{const i=c*3+r;const shape=['t','s','l','s','l','t','l','t','s'][i];return `<figure class="${shape}">${ph(g[i],caps[i])}<figcaption>${caps[i]}</figcaption></figure>`}).join(''));
 const tiles = [
  ['ph1','Aeroporti e stazioni','Sotto casa all’ora che dite, al terminal con il margine giusto. Al ritorno vi aspettiamo all’uscita.','aeroporto'],
  ['','Visite e ospedali','Andata e ritorno per visite, esami e dimissioni.',null,'01'],
  ['dk','Serate e cene','Andate a cena tranquilli: vi riportiamo noi, anche tardi.',null,'02'],
  ['ph2','Corse su prenotazione','Fissate giorno e ora anche con settimane di anticipo.','strada'],
  ['','Bagagli e passeggini','Diteci cosa portate: scegliamo l’auto giusta.',null,'03'],
  ['dk','Prezzo detto prima','Lo sapete prima di salire. Non cambia con il traffico.',null,'04']
 ];
 if (f.services.length) tiles[4] = ['','Anche',f.services.slice(0,3).map(esc).join(', ')+'.',null,'03'];
 const tileHTML = tiles.map(t=>`<article class="tile ${t[0]}">${t[3]?`<div class="im">${ph(P(t[3],1,'t'+t[1])[0],t[1],{w:1000})}</div>`:''}${t[4]?`<span class="ic">${t[4]}</span>`:''}<h3>${t[1]}</h3><p>${t[2]}</p></article>`).join('');
 // contachilometri: la colonna di cifre finisce sulla cifra giusta
 const odoHTML = String(f.phoneDisplay).split('').map(ch=>{
   if(!/\d/.test(ch)) return ch===' '?'<span class="sp"></span>':`<span>${esc(ch)}</span>`;
   const n=+ch; const seq=[]; for(let k=0;k<10;k++) seq.push((n+1+k)%10); // finisce su n
   return `<span class="d"><span>${seq.map(x=>`<span style="display:block">${x}</span>`).join('')}</span></span>`;
 }).join('');
 const chatHero = `<div class="m o">Buongiorno, domani mattina da ${esc(city)} a ${esc(air.replace(/^Aeroporto (di )?/,'aeroporto di '))}. Siamo in 2 con 2 valigie.</div><div class="m i typing"><i></i><i></i><i></i></div><div class="m i">Buongiorno! A che ora? Vi scrivo subito il prezzo, fisso.</div><div class="m o">Alle 6:30, grazie 🙏</div>`;
 const html = head({
  title: f.name+' — Taxi a '+city+(f.phoneDisplay?' · '+f.phoneDisplay:''),
  desc: 'Taxi e noleggio con conducente a '+city+'. Aeroporti, stazioni, visite e serate. Prezzo detto prima di partire.',
  theme:'#F6F4EF', ogImg: hp,
  fonts:'family=Syne:wght@600;700;800&family=Outfit:wght@400;500;600;700', css: CSS
 }).replace(/\.mbar\{display:none\}@media \(max-width:760px\)\{\.mbar\{/,'.mbar{display:none}@media (max-width:760px){.mbar{') + `
<body>
<div class="road" aria-hidden="true"><i class="lane"></i><i class="done"></i>${CAR}</div>
<header class="hd"><div class="w"><a class="brand" href="#">${esc(f.name)}</a><a class="call" href="tel:${f.tel}">${ICON.phone}<span>${esc(f.phoneDisplay)}</span></a></div></header>
<main>
<section class="hero"><div class="w">
 <div>
  <p class="tag" data-in><i></i>Taxi e NCC · ${esc(city)}</p>
  <h1 style="--L:${Math.max(7,...('DA '+city+' OVUNQUE VI SERVA.').split(/\s+/).map(w=>w.length))}"><span class="ln"><span>Da ${esc(city)}</span></span><span class="ln"><span class="hl">ovunque</span></span><span class="ln"><span>vi serva.</span></span></h1>
  <p class="lede" data-in>Aeroporti, stazioni, visite e serate. Ci scrivete su WhatsApp, vi diciamo il prezzo prima di partire, passiamo a prendervi.</p>
  <div class="acts" data-in><a class="b y" href="tel:${f.tel}">${ICON.phone}Chiama</a><a class="b wa" href="${waText(f,'Buongiorno, vorrei prenotare una corsa.')}">${ICON.wa}WhatsApp</a></div>
 </div>
 <div class="stage" data-in>
  <div class="ph">${img(hp,'Auto pronta per la corsa',{eager:true,w:1100,sizes:'(max-width:980px) 90vw, 36vw'})}</div>
  <div class="phone"><div class="scr"><div class="top"><b>${esc(ini)}</b><div>${esc(f.name)}<small>online</small></div></div><div class="msgs">${chatHero}</div></div></div>
  <span class="ex">Esempio di conversazione</span>
 </div>
</div></section>

<section class="sec"><div class="w" style="position:relative"><span class="stop">01</span>
 <p class="k">Fermata 1 · Chi siamo</p>
 <div class="about">
  <p class="big">A ${esc(city)} siamo quelli che chiamate per <em>l’aeroporto all’alba</em>, la visita in ospedale e il rientro dopo cena. Prezzo detto prima, sempre.</p>
  ${f.reviews?`<div class="ring" data-v="${String(f.rating).replace(',','.')}"><svg viewBox="0 0 200 200"><circle class="tr" cx="100" cy="100" r="90"/><circle class="fl" cx="100" cy="100" r="90"/></svg><div class="c"><div><b>${esc(f.rating)}</b><span>${f.reviews} recensioni Google</span><br>${stars(f.ratingNum)}</div></div></div>`:''}
 </div>
</div></section>

<section class="sec" style="padding-top:0"><div class="w" style="position:relative"><span class="stop">02</span>
 <p class="k">Fermata 2 · Servizi</p><h2 class="h2">Le corse di tutti i giorni.</h2>
 <div class="bento">${tileHTML}</div>
</div></section>

<section class="dest" id="dove"><div class="w"><span class="stop" style="top:-60px">03</span>
 <p class="k" style="color:rgba(255,255,255,.6)">Fermata 3 · Dove andiamo</p>
 <p class="cityw" style="font-size:min(19vw,${Math.round(150/Math.max(6,city.length))}vw)">${esc(city)}</p>
 <ul class="dl">${d.map((x,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${esc(x)}<a href="${waText(f,'Buongiorno, quanto costa una corsa da '+city+' a '+x+'?')}">Prezzo →</a></li>`).join('')}</ul>
</div></section>

<section class="sec"><div class="w" style="position:relative"><span class="stop">04</span>
 <p class="k">Fermata 4 · In giro</p><h2 class="h2">Ogni giorno, sulla strada.</h2>
 <div class="mos">${cols.map(c=>`<div class="col">${c}</div>`).join('')}</div>
</div></section>

<section class="sec" id="prenota" style="padding-top:0"><div class="w" style="position:relative"><span class="stop">05</span>
 <p class="k">Fermata 5 · Prenotare</p>
 <div class="book">
  <div class="phone"><div class="scr"><div class="top"><b>${esc(ini)}</b><div>${esc(f.name)}<small>online</small></div></div><div class="msgs">
   <div class="m o">Buongiorno, vorrei prenotare una corsa.</div><div class="m i">Buongiorno! Da dove a dove, e quando?</div>
   <div class="m o">Da casa a ${esc(d[0])}, venerdì alle 7.</div><div class="m i">Perfetto. Vi scrivo il prezzo: è quello, anche con il traffico.</div><div class="m o">Confermo 👍</div></div></div></div>
  <div><h2 class="h2">Tre messaggi e siete a posto.</h2><p class="sub">Compilate qui sotto: si apre WhatsApp con il testo già scritto. Vi risponde direttamente ${esc(f.name)}.</p>
  ${bookingForm(f,{id:'f'})}</div>
 </div>
</div></section>

<section class="sec" style="padding-top:0"><div class="w" style="position:relative"><span class="stop">06</span>
 <p class="k">Fermata 6 · Domande</p>
 ${faq([
  ['Il prezzo è fisso?','Sì. Ve lo diciamo prima della partenza e resta quello, anche con il traffico.'],
  ['Con quanto anticipo prenoto?','Per gli aeroporti meglio il giorno prima. In città spesso basta una chiamata.'],
  ['Posso pagare con carta?','Chiedetelo quando prenotate: vi diciamo subito i metodi di pagamento.'],
  ['Portate bagagli grandi o passeggini?','Sì, diteci cosa portate così scegliamo l’auto giusta.']
 ])}
</div></section>

<section class="fin"><div class="w"><p class="k">Capolinea · Salvatevi il numero</p>
 <a class="odo" href="tel:${f.tel}" aria-label="${esc(f.phoneDisplay)}">${odoHTML}</a>
 <div class="acts"><a class="b dk" href="tel:${f.tel}">${ICON.phone}Chiama ora</a><a class="b wa" href="${waText(f,'Buongiorno, vorrei prenotare una corsa.')}">${ICON.wa}WhatsApp</a></div>
</div></section>
</main>
<footer class="foot"><div class="w">
 <div><p style="font:800 20px/1.1 var(--disp);color:#fff">${esc(f.name)}</p><p>Taxi e noleggio con conducente a ${esc(city)}.</p></div>
 <div><h4>Contatti</h4><p><a href="tel:${f.tel}">${esc(f.phoneDisplay)}</a></p><p><a href="${waText(f,'Buongiorno')}">WhatsApp</a></p></div>
 <div><h4>Dove siamo</h4><p>${esc(f.address)}${f.address?'<br>':''}${esc(city)}</p><p><a href="${f.maps}" target="_blank" rel="noopener">Google Maps ↗</a></p></div>
 <p class="legal">${esc(f.name)} · Foto di repertorio · Anteprima realizzata da Umbra</p>
</div></footer>
${mobileBar(f)}
${badge(f.name)}
${BOOK_JS}
${GSAP}
${ENGINE}
</body></html>`;
 return html;
};
