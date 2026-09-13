window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
// Umbra 3D intro — inserted verbatim before </body>. Only the `name` value changes.
const BLOCK = `<!-- ===== UMBRA INTRO 3D — configurare solo "name" ===== -->
<script>window.UMBRA_INTRO = { name: "__NAME__" };<\/script>
<div id="uPortal">
  <div class="u-flash" id="uFlash"></div>
  <div class="u-ui" id="uUi">
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="url(#ug)" stroke-width="1.6"/><path d="M16 3.5a12.5 12.5 0 0 1 0 25 15.5 15.5 0 0 0 0-25z" fill="url(#ug)"/><defs><linearGradient id="ug" x1="4" y1="4" x2="28" y2="28"><stop stop-color="#EEF0F6"/><stop offset="1" stop-color="#C3C6D3"/></linearGradient></defs></svg>
    <div class="u-brand">Umbra</div>
    <div class="u-by">by Matteo Tagliacollo</div>
    <div class="u-status">Stiamo aprendo l'anteprima riservata a <b class="u-name"></b></div>
    <div class="u-track"><div class="u-fill" id="uFill"></div></div>
    <div class="u-pct" id="uPct">0%</div>
  </div>
  <div class="u-skip">Tocca per saltare</div>
  <div class="u-welcome" id="uWelcome">
    <div class="u-eyebrow">Umbra presenta</div>
    <h1 class="u-h1">Benvenuto,<br><span class="u-shine u-name"></span></h1>
    <p class="u-sub">Il vostro nuovo sito è pronto. Guardatelo.</p>
    <div class="u-sign">Umbra · by Matteo Tagliacollo</div>
  </div>
</div>
<style>
#uPortal{position:fixed;inset:0;z-index:99999;background:#050508;transition:opacity 1s ease;cursor:pointer;
  font-family:'Inter',system-ui,sans-serif;color:#F4F2EC}
#uPortal.u-out{opacity:0;pointer-events:none}
#uPortal canvas{position:absolute;inset:0;width:100%;height:100%}
#uPortal .u-ui{position:absolute;left:0;right:0;bottom:9vh;display:flex;flex-direction:column;align-items:center;gap:13px;pointer-events:none}
#uPortal .u-brand{font-family:Georgia,serif;font-size:1.25rem;letter-spacing:.02em}
#uPortal .u-by{margin-top:-9px;font-size:.62rem;letter-spacing:.34em;text-transform:uppercase;color:#77747f;
  font-family:'Inter',system-ui,sans-serif}
#uPortal .u-status{color:#A5A2B0;font-size:.92rem;text-align:center;padding:0 20px}
#uPortal .u-status b{color:#F4F2EC;font-weight:600}
#uPortal .u-track{width:min(320px,70vw);height:2px;background:rgba(238,240,246,.12);border-radius:2px;overflow:hidden}
#uPortal .u-fill{height:100%;width:0%;background:linear-gradient(90deg,#8f93a5,#EEF0F6);transition:width .18s linear}
#uPortal .u-pct{font-family:Georgia,serif;font-size:1.05rem;color:#EEF0F6}
#uPortal .u-skip{position:absolute;top:24px;right:28px;color:#77747f;font-size:.78rem;letter-spacing:.16em;text-transform:uppercase}
#uPortal .u-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .5s ease}
#uPortal .u-welcome{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  opacity:0;transform:scale(.96);transition:opacity .8s ease,transform .8s ease;pointer-events:none;text-align:center;padding:0 20px}
#uPortal .u-welcome.u-on{opacity:1;transform:none}
#uPortal .u-eyebrow{font-size:.8rem;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:#A5A2B0;margin-bottom:20px}
#uPortal .u-h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(2.4rem,7vw,4.6rem);line-height:1.1;letter-spacing:-.02em;margin:0}
#uPortal .u-shine{background:linear-gradient(115deg,#8b8fa0 0%,#EEF0F6 30%,#fff 50%,#EEF0F6 62%,#8b8fa0 100%);
  background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:uShine 3.5s ease-in-out infinite}
@keyframes uShine{0%,100%{background-position:12% 0}50%{background-position:88% 0}}
#uPortal .u-sub{color:#A5A2B0;font-size:1.05rem;margin-top:16px}
#uPortal .u-sign{position:absolute;bottom:6vh;left:0;right:0;text-align:center;font-size:.6rem;
  letter-spacing:.34em;text-transform:uppercase;color:#5f5d68}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  var NAME=(window.UMBRA_INTRO&&window.UMBRA_INTRO.name)||"";
  document.querySelectorAll('#uPortal .u-name').forEach(function(e){e.textContent=NAME+(e.closest('.u-welcome')?'.':'')});
  var portal=document.getElementById('uPortal'),fill=document.getElementById('uFill'),
      pct=document.getElementById('uPct'),ui=document.getElementById('uUi'),
      welcome=document.getElementById('uWelcome'),flash=document.getElementById('uFlash'),done=false;
  document.documentElement.style.overflow='hidden';
  function finish(){if(done)return;done=true;portal.classList.add('u-out');
    document.documentElement.style.overflow='';
    setTimeout(function(){portal.style.display='none'},1100)}
  function showWelcome(){ui.style.display='none';welcome.classList.add('u-on');setTimeout(finish,2400)}
  portal.addEventListener('click',finish);
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(typeof THREE==='undefined'||reduced){
    var p=0,iv=setInterval(function(){p+=4;if(p>=100){p=100;clearInterval(iv);showWelcome()}
      fill.style.width=p+'%';pct.textContent=p+'%'},60);
    return;
  }
  var scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050508,.045);
  var camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,100);camera.position.set(0,0,8.5);
  var renderer=new THREE.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));portal.insertBefore(renderer.domElement,portal.firstChild);
  var N=5200,R=2.35,tube=.1,start=new Float32Array(N*3),target=new Float32Array(N*3),pos=new Float32Array(N*3);
  function rnd(){return Math.random()*2-1}
  for(var i=0;i<N;i++){
    var v=new THREE.Vector3(rnd(),rnd(),rnd()).normalize().multiplyScalar(6+Math.random()*9);
    start[i*3]=v.x;start[i*3+1]=v.y;start[i*3+2]=v.z;
    var a=Math.random()*Math.PI*2,b=Math.random()*Math.PI*2,tr=tube*Math.sqrt(Math.random());
    target[i*3]=(R+tr*Math.cos(b))*Math.cos(a);target[i*3+1]=(R+tr*Math.cos(b))*Math.sin(a);target[i*3+2]=tr*Math.sin(b);
  }
  pos.set(start);
  var geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  var mat=new THREE.PointsMaterial({color:0xdfe2ec,size:.035,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false});
  var ring=new THREE.Points(geo,mat);ring.rotation.x=.32;scene.add(ring);
  var M=900,dpos=new Float32Array(M*3);
  for(var j=0;j<M;j++){dpos[j*3]=rnd()*18;dpos[j*3+1]=rnd()*18;dpos[j*3+2]=-6-Math.random()*24}
  var dgeo=new THREE.BufferGeometry();dgeo.setAttribute('position',new THREE.BufferAttribute(dpos,3));
  scene.add(new THREE.Points(dgeo,new THREE.PointsMaterial({color:0x8f93a5,size:.02,transparent:true,opacity:.5,depthWrite:false})));
  var t0=performance.now(),CONV=2600,THRU=1200;
  var ease=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
  (function frame(){
    if(done){renderer.dispose();return}
    var t=performance.now()-t0,p=Math.min(1,t/CONV),e=ease(p);
    for(var i=0;i<N;i++){pos[i*3]=start[i*3]+(target[i*3]-start[i*3])*e;
      pos[i*3+1]=start[i*3+1]+(target[i*3+1]-start[i*3+1])*e;pos[i*3+2]=start[i*3+2]+(target[i*3+2]-start[i*3+2])*e}
    geo.attributes.position.needsUpdate=true;
    ring.rotation.z+=.0016+.004*(1-p);
    var s=Math.round(p*100);fill.style.width=s+'%';pct.textContent=s+'%';
    if(t<CONV){camera.position.z=8.5-1.3*e}
    else if(t<CONV+THRU){var q=ease((t-CONV)/THRU);camera.position.z=7.2-9.2*q;camera.rotation.z=.10*q;
      mat.opacity=.95*(1-q*.55);if(q>.72)flash.style.opacity=(q-.72)/.28}
    else{flash.style.opacity=0;showWelcome();return}
    renderer.render(scene,camera);requestAnimationFrame(frame);
  })();
  addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
})();
<\/script>
<!-- ===== FINE UMBRA INTRO 3D ===== -->`;

module.exports = function intro(name) {
  return BLOCK.replace('__NAME__', String(name).replace(/"/g, '&quot;'));
};

window.U.m["intro"]=module.exports;})();
