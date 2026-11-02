// Umbra intro v2 — copre la pagina dal primo frame.
// head(): CSS critico + lock, va subito dopo <meta charset>.
// body(name): portale, va subito dopo <body>.
// three.js si carica in modo asincrono: la barra parte subito, la scena 3D si aggancia appena arriva.
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const HEAD = `<!-- UMBRA INTRO v2 (head) -->
<script>(function(d){d.documentElement.className+=' u-lock';setTimeout(function(){d.documentElement.classList.remove('u-lock')},12000)})(document)</script>
<link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" crossorigin>
<style>
html.u-lock,html.u-lock body{background:#050508!important;overflow:hidden!important}
html.u-lock body>*:not(#uPortal){visibility:hidden!important}
html:not(.u-lock) #uPortal{display:none}
#uPortal{position:fixed;inset:0;z-index:2147483000;background:#050508;transition:opacity .9s ease;cursor:pointer;
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;color:#F4F2EC;-webkit-font-smoothing:antialiased}
#uPortal.u-out{opacity:0;pointer-events:none}
#uPortal canvas{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity .6s ease}
#uPortal canvas.u-on{opacity:1}
#uPortal .u-ui{position:absolute;left:0;right:0;bottom:9vh;display:flex;flex-direction:column;align-items:center;gap:13px;pointer-events:none;animation:uIn .5s ease both}
@keyframes uIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#uPortal .u-brand{font-family:Georgia,serif;font-size:1.25rem;letter-spacing:.02em}
#uPortal .u-by{margin-top:-9px;font-size:.62rem;letter-spacing:.34em;text-transform:uppercase;color:#77747f}
#uPortal .u-status{color:#A5A2B0;font-size:.92rem;text-align:center;padding:0 20px}
#uPortal .u-status b{color:#F4F2EC;font-weight:600}
#uPortal .u-track{width:min(320px,70vw);height:2px;background:rgba(238,240,246,.12);border-radius:2px;overflow:hidden}
#uPortal .u-fill{height:100%;width:0%;background:linear-gradient(90deg,#8f93a5,#EEF0F6)}
#uPortal .u-pct{font-family:Georgia,serif;font-size:1.05rem;color:#EEF0F6;font-variant-numeric:tabular-nums}
#uPortal .u-skip{position:absolute;top:22px;right:24px;color:#77747f;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase}
#uPortal .u-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}
#uPortal .u-welcome{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  opacity:0;transform:scale(.96);transition:opacity .8s ease,transform .8s ease;pointer-events:none;text-align:center;padding:0 20px}
#uPortal .u-welcome.u-on{opacity:1;transform:none}
#uPortal .u-eyebrow{font-size:.78rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#A5A2B0;margin-bottom:20px}
#uPortal .u-h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(2.2rem,7vw,4.6rem);line-height:1.1;letter-spacing:-.02em;margin:0}
#uPortal .u-shine{background:linear-gradient(115deg,#8b8fa0 0%,#EEF0F6 30%,#fff 50%,#EEF0F6 62%,#8b8fa0 100%);
  background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:uShine 3.5s ease-in-out infinite}
@keyframes uShine{0%,100%{background-position:12% 0}50%{background-position:88% 0}}
#uPortal .u-sub{color:#A5A2B0;font-size:1.05rem;margin-top:16px}
#uPortal .u-sign{position:absolute;bottom:6vh;left:0;right:0;text-align:center;font-size:.6rem;letter-spacing:.34em;text-transform:uppercase;color:#5f5d68}
</style>`;

const BODY = `<!-- UMBRA INTRO v2 (body) -->
<div id="uPortal" aria-hidden="true">
  <div class="u-flash" id="uFlash"></div>
  <div class="u-ui" id="uUi">
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="url(#ug)" stroke-width="1.6"/><path d="M16 3.5a12.5 12.5 0 0 1 0 25 15.5 15.5 0 0 0 0-25z" fill="url(#ug)"/><defs><linearGradient id="ug" x1="4" y1="4" x2="28" y2="28"><stop stop-color="#EEF0F6"/><stop offset="1" stop-color="#C3C6D3"/></linearGradient></defs></svg>
    <div class="u-brand">Umbra</div>
    <div class="u-by">by Matteo Tagliacollo</div>
    <div class="u-status">Stiamo aprendo l'anteprima riservata a <b>__NAME__</b></div>
    <div class="u-track"><div class="u-fill" id="uFill"></div></div>
    <div class="u-pct" id="uPct">0%</div>
  </div>
  <div class="u-skip">Tocca per saltare</div>
  <div class="u-welcome" id="uWelcome">
    <div class="u-eyebrow">Umbra presenta</div>
    <h1 class="u-h1">Benvenuto,<br><span class="u-shine">__NAME__.</span></h1>
    <p class="u-sub">Il vostro nuovo sito è pronto. Guardatelo.</p>
    <div class="u-sign">Umbra · by Matteo Tagliacollo</div>
  </div>
</div>
<script>
(function(){
  var H=document.documentElement;
  if(!/\\bu-lock\\b/.test(H.className))return;
  var portal=document.getElementById('uPortal'),fill=document.getElementById('uFill'),pct=document.getElementById('uPct'),
      ui=document.getElementById('uUi'),welcome=document.getElementById('uWelcome'),flash=document.getElementById('uFlash'),
      done=false,t0=performance.now(),CONV=2600,THRU=1100,three=null,welcomed=false;
  function finish(){if(done)return;done=true;
    portal.classList.add('u-out');setTimeout(function(){H.classList.remove('u-lock');window.dispatchEvent(new Event('umbra:intro-done'));window.dispatchEvent(new Event('resize'))},450);
    setTimeout(function(){portal.style.display='none'},1000)}
  function showWelcome(){if(welcomed)return;welcomed=true;ui.style.display='none';welcome.classList.add('u-on');setTimeout(finish,2100)}
  portal.addEventListener('click',finish);
  var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
  var reduced=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  // barra: parte al primo frame, indipendente da three.js
  (function bar(){if(done||welcomed)return;var t=performance.now()-t0,p=Math.min(1,t/CONV),s=Math.round(ease(p)*100);
    fill.style.width=s+'%';pct.textContent=s+'%';
    if(!three&&t>=CONV){showWelcome();return}
    requestAnimationFrame(bar)})();
  if(reduced)return;
  function start(){if(done||welcomed||typeof THREE==='undefined')return;
    var el=performance.now()-t0;if(el>CONV*0.75)return; // troppo tardi: resta la versione senza 3D
    try{
    var scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050508,.045);
    var camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,100);camera.position.set(0,0,8.5);
    var renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(innerWidth,innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));portal.insertBefore(renderer.domElement,portal.firstChild);
    }catch(e){return}
    three=true;requestAnimationFrame(function(){renderer.domElement.classList.add('u-on')});
    var N=innerWidth<700?3200:5200,R=2.35,tube=.1,st=new Float32Array(N*3),tg=new Float32Array(N*3),pos=new Float32Array(N*3);
    function r(){return Math.random()*2-1}
    for(var i=0;i<N;i++){var v=new THREE.Vector3(r(),r(),r()).normalize().multiplyScalar(6+Math.random()*9);
      st[i*3]=v.x;st[i*3+1]=v.y;st[i*3+2]=v.z;var a=Math.random()*Math.PI*2,b=Math.random()*Math.PI*2,tr=tube*Math.sqrt(Math.random());
      tg[i*3]=(R+tr*Math.cos(b))*Math.cos(a);tg[i*3+1]=(R+tr*Math.cos(b))*Math.sin(a);tg[i*3+2]=tr*Math.sin(b)}
    pos.set(st);var geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    var mat=new THREE.PointsMaterial({color:0xdfe2ec,size:.035,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false});
    var ring=new THREE.Points(geo,mat);ring.rotation.x=.32;scene.add(ring);
    var M=900,dp=new Float32Array(M*3);for(var j=0;j<M;j++){dp[j*3]=r()*18;dp[j*3+1]=r()*18;dp[j*3+2]=-6-Math.random()*24}
    var dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(dp,3));
    scene.add(new THREE.Points(dg,new THREE.PointsMaterial({color:0x8f93a5,size:.02,transparent:true,opacity:.5,depthWrite:false})));
    (function frame(){
      if(done){renderer.dispose();return}
      var t=performance.now()-t0,p=Math.min(1,t/CONV),e=ease(p);
      for(var i=0;i<N*3;i++)pos[i]=st[i]+(tg[i]-st[i])*e;
      geo.attributes.position.needsUpdate=true;ring.rotation.z+=.0016+.004*(1-p);
      if(t<CONV){camera.position.z=8.5-1.3*e}
      else if(t<CONV+THRU){var q=ease((t-CONV)/THRU);camera.position.z=7.2-9.2*q;camera.rotation.z=.10*q;mat.opacity=.95*(1-q*.55);if(q>.72)flash.style.opacity=(q-.72)/.28}
      else{flash.style.transition='opacity .5s ease';flash.style.opacity=0;showWelcome();renderer.render(scene,camera);return}
      renderer.render(scene,camera);requestAnimationFrame(frame)})();
    addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
  }
  if(typeof THREE!=='undefined')start();
  else{var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.crossOrigin='anonymous';s.async=true;s.onload=start;document.head.appendChild(s)}
})();
</script>
<!-- /UMBRA INTRO v2 -->`;

module.exports = {
  head: () => HEAD,
  body: name => BODY.replace(/__NAME__/g, esc(name)),
  // inietta in una pagina qualsiasi, togliendo l'intro vecchia se c'è
  inject(html, name) {
    const a = html.indexOf('<!-- ===== UMBRA INTRO 3D'); const endTag = '<!-- ===== FINE UMBRA INTRO 3D ===== -->';
    if (a > -1) { const b = html.indexOf(endTag, a); html = html.slice(0, a) + html.slice(b + endTag.length); }
    html = html.replace(/<!-- UMBRA INTRO v2 \(head\) -->[\s\S]*?<\/style>/, '').replace(/<!-- UMBRA INTRO v2 \(body\) -->[\s\S]*?<!-- \/UMBRA INTRO v2 -->/, '');
    html = html.replace(/<meta charset="utf-8">/i, m => m + '\n' + HEAD);
    html = html.replace(/<body([^>]*)>/i, (m) => m + '\n' + module.exports.body(name));
    return html;
  }
};
