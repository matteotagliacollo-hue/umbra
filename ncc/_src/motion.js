// Motore animazioni condiviso (GSAP + ScrollTrigger + MotionPath da cdnjs).
// Regola: senza JS o con reduced-motion tutto resta visibile. Gli stati iniziali li imposta GSAP.
const GSAP = `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js" defer></script>`;

const ENGINE = `<script>
(function(){
function boot(){
  var H=document.documentElement, q=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  // header che diventa pieno
  var hd=document.querySelector('.hd');
  function onS(){ if(hd) hd.classList.toggle('solid', scrollY>40); var p=document.querySelector('.prog i'); if(p){var m=document.documentElement.scrollHeight-innerHeight; p.style.transform='scaleX('+(m>0?scrollY/m:0)+')'} }
  addEventListener('scroll',onS,{passive:true}); onS();
  if(typeof gsap==='undefined'||!window.ScrollTrigger) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger); if(window.MotionPathPlugin) gsap.registerPlugin(MotionPathPlugin);
  H.classList.add('anim');
  var mob=matchMedia('(max-width:760px)').matches;

  // HERO: parole che salgono, foto che si stringe. Parte quando l'intro è finita.
  var heroTl=gsap.timeline({paused:true});
  heroTl.from('.hero .w8 > span',{yPercent:115,duration:1.05,ease:'expo.out',stagger:.06})
        .from('.hero [data-in]',{y:26,opacity:0,duration:.9,ease:'power3.out',stagger:.08},'-=.75')
        .from('.hero .hmedia',{scale:1.18,duration:2.2,ease:'expo.out'},0);
  function playHero(){heroTl.play()}
  if(/\\bu-lock\\b/.test(H.className)) addEventListener('umbra:intro-done',playHero,{once:true}); else playHero();
  q('.hero .hmedia').forEach(function(m){gsap.to(m,{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})});

  // titoli di sezione: parole che salgono
  q('[data-split]').forEach(function(el){gsap.from(el.querySelectorAll('.w8 > span'),{yPercent:110,duration:.9,ease:'expo.out',stagger:.045,scrollTrigger:{trigger:el,start:'top 86%'}})});
  // blocchi che entrano
  q('[data-up]').forEach(function(el){gsap.from(el,{y:50,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}})});
  // manifesto: le parole si accendono mentre scorri
  q('.mani').forEach(function(m){gsap.fromTo(m.querySelectorAll('.mw'),{opacity:.14},{opacity:1,ease:'none',stagger:.08,scrollTrigger:{trigger:m,start:'top 78%',end:'bottom 45%',scrub:true}})});
  // foto che si aprono
  q('[data-clip]').forEach(function(el){var img=el.querySelector('img,.phx');
    gsap.fromTo(el,{clipPath:'inset(18% 12% 18% 12% round 24px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'none',scrollTrigger:{trigger:el,start:'top 92%',end:'top 35%',scrub:true}});
    if(img) gsap.fromTo(img,{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:true}})});
  // parallax
  q('[data-par]').forEach(function(el){gsap.fromTo(el,{yPercent:-10},{yPercent:10,ease:'none',scrollTrigger:{trigger:el.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
  // card impilate: quelle sotto si rimpiccioliscono quando arriva la successiva
  var cards=q('.stack .sc');
  cards.forEach(function(c,i){ if(i===cards.length-1) return;
    gsap.to(c,{scale:.9,opacity:.55,ease:'none',scrollTrigger:{trigger:cards[i+1],start:'top bottom',end:'top '+(mob?'90px':'120px'),scrub:true}})});
  // contatori
  q('[data-count]').forEach(function(el){var t=parseFloat(el.getAttribute('data-count')),d=(el.getAttribute('data-count').split(/[.,]/)[1]||'').length,o={v:0};
    gsap.to(o,{v:t,duration:2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%'},onUpdate:function(){el.textContent=o.v.toFixed(d).replace('.',',')}})});
  // passi: la linea si riempie
  q('.steps').forEach(function(s){var f=s.querySelector('.sfill'); if(f) gsap.fromTo(f,{scaleY:0},{scaleY:1,ease:'none',scrollTrigger:{trigger:s,start:'top 70%',end:'bottom 60%',scrub:true}});
    q('.st',s).forEach(function(x){gsap.from(x,{x:-30,opacity:0,duration:.8,ease:'power3.out',scrollTrigger:{trigger:x,start:'top 82%'}})})});
  // ticker che accelera con la velocità di scroll
  q('.tick .tk').forEach(function(t){var tw=gsap.to(t,{xPercent:-50,repeat:-1,duration:28,ease:'none'});
    ScrollTrigger.create({onUpdate:function(self){var v=Math.min(4,1+Math.abs(self.getVelocity())/600);gsap.to(tw,{timeScale:v*(self.direction),duration:.3,overwrite:true})}})});

  // PERCORSO: si disegna con lo scroll, il mezzo lo segue, le tappe si accendono
  q('.route').forEach(function(r){var p=r.querySelector('.rpath'),veh=r.querySelector('.veh'),len=p.getTotalLength();
    var base=r.querySelector('.rbase'); var svg=r.querySelector('svg');
    q('.rstop',r).forEach(function(s){var at=parseFloat(s.getAttribute('data-at')),pt=p.getPointAtLength(len*at);s.setAttribute('transform','translate('+pt.x+','+pt.y+')')});
    gsap.set(p,{strokeDasharray:len,strokeDashoffset:len});
    var tl=gsap.timeline({scrollTrigger:{trigger:r,start:mob?'top 15%':'top top',end:mob?'+=140%':'+=170%',scrub:.6,pin:true,anticipatePin:1}});
    tl.to(p,{strokeDashoffset:0,ease:'none',duration:1},0);
    if(veh&&window.MotionPathPlugin) tl.to(veh,{motionPath:{path:p,align:p,alignOrigin:[.5,.5],autoRotate:veh.hasAttribute('data-rot')},ease:'none',duration:1},0);
    q('.rstop',r).forEach(function(s){var at=parseFloat(s.getAttribute('data-at'));tl.fromTo(s.querySelector('.rlab'),{opacity:0,y:10},{opacity:1,y:0,duration:.06},Math.max(0,at-.03));tl.fromTo(s.querySelector('.rdot'),{scale:0},{scale:1,duration:.05,transformOrigin:'50% 50%'},Math.max(0,at-.04))});
    q('.rlist li',r).forEach(function(li,i,a){tl.fromTo(li,{opacity:.25},{opacity:1,duration:.05},(i+1)/(a.length+1))});
  });

  // galleria orizzontale (desktop: fissata; telefono: swipe nativo + foto che entrano)
  q('.hgal').forEach(function(g){var tr=g.querySelector('.htrack');
    if(!mob){var d=function(){return tr.scrollWidth-innerWidth+64};
      gsap.to(tr,{x:function(){return -d()},ease:'none',scrollTrigger:{trigger:g,start:'top top',end:function(){return '+='+d()},scrub:.5,pin:true,invalidateOnRefresh:true,anticipatePin:1}});
      q('.hit',tr).forEach(function(it,i){gsap.from(it,{y:i%2?60:-30,ease:'none',scrollTrigger:{trigger:g,start:'top bottom',end:'bottom top',scrub:true}})});
    } else { q('.hit',tr).forEach(function(it){gsap.from(it,{opacity:0,scale:.9,duration:.8,ease:'power3.out',scrollTrigger:{trigger:it,start:'top 92%',scroller:undefined}})}) }
  });
  // flotta: le card salgono sfalsate
  q('.fleet').forEach(function(f){gsap.from(f.children,{y:80,opacity:0,duration:1,ease:'power3.out',stagger:.12,scrollTrigger:{trigger:f,start:'top 85%'}})});
  // CTA finale: il testo cresce
  q('.final .big').forEach(function(b){gsap.fromTo(b,{scale:.82,opacity:.3},{scale:1,opacity:1,ease:'none',scrollTrigger:{trigger:b,start:'top 95%',end:'top 40%',scrub:true}})});
  // tabellone partenze: lettere che girano
  q('[data-flap]').forEach(function(el,i){var fin=el.textContent,ch='ABCDEFGHILMNOPRSTUVZ0123456789',n=0;
    ScrollTrigger.create({trigger:el,start:'top 92%',once:true,onEnter:function(){var iv=setInterval(function(){n++;el.textContent=fin.split('').map(function(c,k){return (c===' '||k<n*1.6)?c:ch[Math.floor(Math.random()*ch.length)]}).join('');if(n*1.6>=fin.length){clearInterval(iv);el.textContent=fin}},45+i*4)}})});

  addEventListener('umbra:intro-done',function(){ScrollTrigger.refresh()});
  addEventListener('load',function(){ScrollTrigger.refresh()});
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
</script>`;

// split di un titolo in parole animabili: "<span class=w8><span>parola</span></span>"
function split(html){
  return html.split(/(<[^>]+>)/).map(part=>{
    if(part.startsWith('<')) return part;
    return part.split(/(\s+)/).map(w=>/^\s+$/.test(w)||!w?w:'<span class="w8"><span>'+w+'</span></span>').join('');
  }).join('');
}
// manifesto: ogni parola in uno span che si accende
function mani(text){ return text.split(/\s+/).map(w=>'<span class="mw">'+w+'</span>').join(' '); }

const BASE_CSS = `
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--fg);font:400 16.5px/1.65 var(--body);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit}img{display:block;max-width:100%}
.w{max-width:1260px;margin:0 auto;padding-left:max(22px,env(safe-area-inset-left,0px));padding-right:max(22px,env(safe-area-inset-right,0px))}
.w8{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em;margin-bottom:-.08em}.w8>span{display:inline-block}
.prog{position:fixed;left:0;right:0;top:0;height:3px;z-index:60;pointer-events:none}.prog i{display:block;height:100%;background:var(--acc);transform-origin:0 50%;transform:scaleX(0)}
.hd{position:fixed;left:0;right:0;top:0;z-index:50;transition:background .35s,box-shadow .35s,color .35s;color:var(--hd-fg,var(--fg))}
.hd .w{display:flex;align-items:center;justify-content:space-between;gap:14px;height:72px}
.hd.solid{background:var(--hd-solid);color:var(--fg);box-shadow:0 1px 0 var(--line);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.hd .nav{display:flex;gap:26px;font-size:14px}.hd .nav a{text-decoration:none;opacity:.8}.hd .nav a:hover{opacity:1}
.hd .r{display:flex;gap:10px;align-items:center}
.brand{text-decoration:none;display:flex;align-items:center;gap:10px;font:var(--brand-font);letter-spacing:var(--brand-ls,0);min-width:0}
.brand .bn{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:38vw}
.pill{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 18px;border-radius:var(--r-btn);font:600 14px/1 var(--body);text-decoration:none;white-space:nowrap}
.pill.a{background:var(--acc);color:var(--on-acc)}.pill.o{border:1px solid currentColor}
section{position:relative}
.sec{padding-block:clamp(84px,11vw,150px)}
.eye{font:600 12px/1 var(--body);letter-spacing:.22em;text-transform:uppercase;color:var(--acc-2,var(--acc));margin:0 0 20px;display:flex;align-items:center;gap:12px}
.eye::before{content:'';width:28px;height:2px;background:currentColor}
.h2{font:var(--h2-font);letter-spacing:var(--h2-ls,-.02em);margin:0 0 20px;text-wrap:balance;max-width:18ch}
.lead{color:var(--fg-2);max-width:56ch;margin:0;font-size:1.08rem}
.hero{position:relative;overflow:hidden}
.hmedia{position:absolute;inset:0;will-change:transform}.hmedia img,.hmedia .phx{width:100%;height:100%;object-fit:cover}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:58px;padding:0 26px;border-radius:var(--r-btn);font:700 15.5px/1 var(--body);text-decoration:none;transition:transform .2s}
.btn:hover{transform:translateY(-2px)}.btn.a{background:var(--acc);color:var(--on-acc)}.btn.g{background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.4);backdrop-filter:blur(8px)}.btn.d{background:var(--fg);color:var(--bg)}
.stars{display:inline-flex;gap:2px;color:var(--star,#E4A400)}
.tick{overflow:hidden;white-space:nowrap;padding-block:22px;background:var(--tick-bg);color:var(--tick-fg);font:var(--tick-font)}
.tk{display:inline-flex;gap:44px;padding-left:44px}.tk span{display:inline-flex;align-items:center;gap:44px}.tk span::after{content:'';width:10px;height:10px;border-radius:var(--tick-dot-r,50%);background:var(--acc)}
.mani{font:var(--mani-font);letter-spacing:-.015em;margin:0;max-width:24ch;text-wrap:balance}
.mani .mw{transition:none}
.stack{display:grid;gap:22px;margin-top:56px}
.sc{position:sticky;top:110px;display:grid;grid-template-columns:1.1fr 1fr;min-height:380px;border-radius:var(--r-card);overflow:hidden;background:var(--card);border:1px solid var(--line);transform-origin:50% 0;box-shadow:0 -20px 50px -30px rgba(0,0,0,.35)}
.sc:nth-child(2){top:126px}.sc:nth-child(3){top:142px}.sc:nth-child(4){top:158px}
.sc .tx{padding:44px;display:flex;flex-direction:column;justify-content:space-between;gap:30px}
.sc .n{font:var(--num-font);color:var(--acc)}.sc h3{font:var(--h3-font);margin:0 0 10px}.sc p{margin:0;color:var(--fg-2)}
.sc .ph{position:relative;min-height:260px}.sc .ph img,.sc .ph .phx{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sc a.more{font:600 14px/1 var(--body);text-decoration:none;color:var(--acc-2,var(--acc));display:inline-flex;gap:8px;align-items:center}
.route{min-height:100svh;display:flex;align-items:center;background:var(--route-bg);color:var(--route-fg);overflow:hidden}
.route .w{display:grid;grid-template-columns:.8fr 1.6fr;gap:40px;align-items:center;width:100%;padding-block:90px}
.route .h2{color:inherit}.route .lead{color:var(--route-fg-2)}
.route svg{width:100%;height:auto;overflow:visible}
.rbase{fill:none;stroke:var(--route-base);stroke-width:2;stroke-dasharray:3 9;stroke-linecap:round}
.rpath{fill:none;stroke:var(--acc);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.rdot{fill:var(--route-bg);stroke:var(--acc);stroke-width:4}
.rlab{font:600 15px var(--body);fill:var(--route-fg);paint-order:stroke;stroke:var(--route-bg);stroke-width:6px;stroke-linejoin:round}
.rlist{list-style:none;margin:28px 0 0;padding:0;display:grid;gap:8px}
.rlist li{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--route-line);font-weight:600}
.rlist a{font:600 12.5px/1 var(--body);text-decoration:none;color:var(--acc);white-space:nowrap}
.hgal{overflow:hidden;background:var(--bg-2)}
.hgal .head{padding-block:110px 40px}
.htrack{display:flex;gap:28px;padding-left:max(22px,calc((100vw - 1260px)/2 + 22px));padding-right:22px;padding-bottom:110px;width:max-content}
.hit{flex:none;width:min(520px,72vw);margin:0}
.hit .im{position:relative;aspect-ratio:4/5;border-radius:var(--r-card);overflow:hidden;background:var(--bg-3)}.hit:nth-child(even) .im{aspect-ratio:4/3;margin-top:80px}
.hit img,.hit .phx{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hit figcaption{display:flex;justify-content:space-between;gap:10px;margin-top:14px;font-size:14px;color:var(--fg-2)}.hit figcaption b{color:var(--fg);font-weight:600}
.fleet{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
.fc{border-radius:var(--r-card);overflow:hidden;background:var(--card);border:1px solid var(--line)}
.fc .im{position:relative;aspect-ratio:16/11;overflow:hidden;background:var(--bg-3)}.fc .im img,.fc .im .phx{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fc .tx{padding:24px 24px 28px}.fc small{display:block;font:600 11px/1 var(--body);letter-spacing:.18em;text-transform:uppercase;color:var(--acc-2,var(--acc));margin-bottom:12px}
.fc h3{font:var(--h3-font);margin:0 0 6px}.fc p{margin:0;color:var(--fg-2);font-size:15px}
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:20px}
.nums div{padding:44px 24px 40px 0}.nums div+div{padding-left:32px;border-left:1px solid var(--line)}
.nums b{display:block;font:var(--bignum-font);letter-spacing:-.04em;line-height:.9}.nums span{display:block;margin-top:12px;color:var(--fg-2);font-size:15px}
.steps{position:relative;display:grid;gap:0;margin-top:50px;padding-left:44px}
.steps::before,.sfill{content:'';position:absolute;left:11px;top:6px;bottom:6px;width:2px;background:var(--line)}
.sfill{background:var(--acc);transform-origin:50% 0}
.st{position:relative;padding:0 0 46px}.st::before{content:'';position:absolute;left:-44px;top:4px;width:24px;height:24px;border-radius:50%;background:var(--bg);border:2px solid var(--acc)}
.st h3{font:var(--h3-font);margin:0 0 6px}.st p{margin:0;color:var(--fg-2);max-width:48ch}
.two{display:grid;grid-template-columns:.9fr 1.1fr;gap:70px;align-items:start}
.proof{display:grid;grid-template-columns:auto 1fr;gap:56px;align-items:center}
.proof .big{font:var(--bignum-font);font-size:clamp(5rem,12vw,10rem);line-height:.85;letter-spacing:-.05em}
.faq details{border-bottom:1px solid var(--line)}.faq{border-top:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:20px;padding:24px 0;font:var(--faq-font)}
.faq summary::-webkit-details-marker{display:none}
.faq summary i{flex:none;width:18px;height:18px;position:relative;margin-top:6px}
.faq summary i::before,.faq summary i::after{content:'';position:absolute;left:0;right:0;top:8px;height:2px;background:var(--acc)}
.faq summary i::after{transform:rotate(90deg);transition:transform .25s}.faq details[open] summary i::after{transform:none}
.faq p{margin:0 0 24px;color:var(--fg-2);max-width:62ch}
.bk{display:grid;gap:12px;background:var(--card);border:1px solid var(--line);border-radius:var(--r-card);padding:30px}
.bk label{display:grid;gap:6px}.bk label span{font:600 11px/1 var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--fg-2)}
.bk input,.bk select{width:100%;height:52px;border-radius:var(--r-in);border:1px solid var(--line);background:var(--bg);color:var(--fg);padding:0 14px;font:500 16px/1 var(--body)}
.bk input:focus,.bk select:focus{outline:none;border-color:var(--acc)}
.bk-row{display:grid;grid-template-columns:1fr 120px;gap:12px}
.bk-go{display:flex;align-items:center;justify-content:center;gap:10px;height:58px;border:0;border-radius:var(--r-btn);background:var(--acc);color:var(--on-acc);font:700 15.5px/1 var(--body);cursor:pointer}
.bk-note{margin:0;font-size:12.5px;color:var(--fg-2)}
.final{padding-block:clamp(110px,14vw,190px);text-align:center;overflow:hidden}
.final .big{font:var(--final-font);letter-spacing:-.03em;margin:0 auto 34px;max-width:14ch;text-wrap:balance}
.final .acts{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.foot{border-top:1px solid var(--line);padding-block:56px 40px;font-size:14px;color:var(--fg-2)}
.foot .w{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:30px}.foot h4{font:600 11px/1 var(--body);letter-spacing:.18em;text-transform:uppercase;margin:0 0 14px;color:var(--fg)}
.foot p{margin:0 0 6px}.foot a{text-decoration:none}
.legal{margin-top:36px;font-size:12px;color:var(--fg-2)}
.phx{background:linear-gradient(160deg,#59626d,#272c33)}
:focus-visible{outline:2px solid var(--acc);outline-offset:3px}
@media (max-width:980px){.hd .nav{display:none}.sc{grid-template-columns:1fr;min-height:0}.sc .ph{min-height:220px;order:-1}.sc .tx{padding:28px}.route .w{grid-template-columns:1fr;gap:10px;padding-block:70px}.fleet{grid-template-columns:1fr 1fr}.two,.proof{grid-template-columns:1fr;gap:28px}.foot .w{grid-template-columns:1fr}}
@media (max-width:760px){.sec{padding-block:86px}.sc{top:80px}.sc:nth-child(2){top:92px}.sc:nth-child(3){top:104px}.sc:nth-child(4){top:116px}
 .hgal .head{padding-block:86px 30px}.htrack{width:auto;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:86px;-webkit-overflow-scrolling:touch;scrollbar-width:none}.htrack::-webkit-scrollbar{display:none}.hit{width:78vw;scroll-snap-align:center}.hit:nth-child(even) .im{margin-top:0;aspect-ratio:4/5}
 .fleet{grid-template-columns:1fr}.nums{grid-template-columns:1fr}.nums div,.nums div+div{padding:28px 0;border-left:0;border-top:1px solid var(--line)}.nums div:first-child{border-top:0}
 .bk{padding:20px}.btn{flex:1}.brand .bn{max-width:46vw}.pill .pt{display:none}.pill{padding:0 14px}.rlab{font-size:22px}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
`;

module.exports = { GSAP, ENGINE, split, mani, BASE_CSS };
