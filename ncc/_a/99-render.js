window.U=window.U||{m:{}};
window.U.esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')};
window.U.badge=function(n){var U=window.U;return '\n<div class="umbra-flag" role="note">'+
'<svg width="15" height="15" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="#C3C6D3" stroke-width="2"/><path d="M16 3.5a12.5 12.5 0 0 1 0 25 15.5 15.5 0 0 0 0-25z" fill="#EEF0F6"/></svg>'+
'<span><b>Anteprima Umbra</b> realizzata per '+U.esc(n)+' &middot; non &egrave; il sito ufficiale dell\'azienda</span></div>'+
'<style>.umbra-flag{position:fixed;left:14px;bottom:14px;z-index:8500;display:flex;align-items:center;gap:9px;max-width:min(430px,calc(100vw - 28px));padding:9px 14px;border-radius:999px;background:rgba(8,8,11,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(238,240,246,.22);box-shadow:0 6px 26px rgba(0,0,0,.4);font:400 11.5px/1.35 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#C8C8D2;letter-spacing:.01em;pointer-events:none}'+
'.umbra-flag b{color:#F4F2EC;font-weight:600}.umbra-flag svg{flex:none}'+
'@media (max-width:760px){.umbra-flag{left:8px;right:8px;max-width:none;bottom:calc(78px + env(safe-area-inset-bottom,0px));font-size:10.5px;padding:7px 11px;justify-content:center;text-align:center}}'+
'@media print{.umbra-flag{display:none}}</style>'};
window.U.render=function(slug){var U=window.U;
  var l=U.leads&&U.leads[slug]; if(!l) return null;
  var c=U.m.content.content(l); c.pics=U.m.photos.photos(l);
  var html=U.m[l.theme](l,c,U.m.intro(l.name));
  html=html.replace(/<head([^>]*)>/i,'<head$1>\n<meta name="robots" content="noindex,nofollow,noarchive">\n<meta name="referrer" content="no-referrer">');
  var a=html.indexOf('<!-- ===== UMBRA INTRO 3D');
  if(a>-1) html=html.slice(0,a)+U.badge(l.name)+'\n'+html.slice(a);
  else html=html.replace(/<\/body>/i,U.badge(l.name)+'\n</body>');
  return html;
};
