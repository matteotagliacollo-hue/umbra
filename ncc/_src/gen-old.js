// Rigenera le pagine con i template di prima (_a), tema scelto in base al tipo reale di attività + intro nuova.
const fs=require('fs'),path=require('path'),vm=require('vm');
const A=path.join(__dirname,'..','_a'); const ctx={window:{},console}; ctx.window.window=ctx.window; vm.createContext(ctx);
for(const f of fs.readdirSync(A).filter(f=>f.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync(path.join(A,f),'utf8'),ctx,{filename:f});
const U=ctx.window.U; const I=require('./intro'); const R=JSON.parse(fs.readFileSync(path.join(__dirname,'leads.json'),'utf8'));
function h(s){let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
const MAP={ // carattere reale → temi coerenti (si alternano per non avere 100 pagine uguali)
 taxi_locale:['meridian','atelier','grandtour'], ncc_executive:['monolite','notturno','obsidian'],
 transfer_aeroporti:['obsidian','notturno'], minibus_gruppi:['obsidian','meridian'],
 montagna:['grandtour','meridian'], lago_turismo:['grandtour','atelier'],
 luxury_chauffeur:['aurum','velluto'], limousine_eventi:['aurum'], cerimonie:['velluto','atelier'], noleggio_prestigio:['chrome'] };
const SEG={cerimonie:'cerimonie',noleggio_prestigio:'luxury',transfer_aeroporti:'transfer',minibus_gruppi:'transfer'};
const OUT=process.env.OUT||path.join(__dirname,'..'); const want=process.argv.slice(2); const tally={};
for(const slug of Object.keys(U.leads)){
  if(want.length&&!want.includes(slug)) continue;
  if(!fs.existsSync(path.join(__dirname,'..',slug,'index.html'))) continue;
  const r=R[slug]; if(!r) continue; const c=r.character||'taxi_locale';
  const L=U.leads[slug]; const pool=MAP[c]||MAP.taxi_locale;
  L.theme=pool[h(slug)%pool.length]; L.segment=SEG[c]||'ncc';
  let html=U.render(slug); html=I.inject(html,L.name);
  fs.mkdirSync(path.join(OUT,slug),{recursive:true}); fs.writeFileSync(path.join(OUT,slug,'index.html'),html);
  tally[L.theme]=(tally[L.theme]||0)+1;
}
console.log(tally);
