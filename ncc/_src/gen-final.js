// Sostituisce gli stili deboli o non in linea (meridian, obsidian, monolite, chrome) con i template nuovi.
const fs=require('fs'),path=require('path'),vm=require('vm');
const A=path.join(__dirname,'..','_a');const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
for(const f of fs.readdirSync(A).filter(f=>f.endsWith('.js')).sort()) vm.runInContext(fs.readFileSync(path.join(A,f),'utf8'),ctx,{filename:f});
const U=ctx.window.U;const L=require('./lib'),I=require('./intro'),v3=require('./v3'),fer=require('./t-fermata');
const R=JSON.parse(fs.readFileSync(path.join(__dirname,'leads.json'),'utf8'));
function h(s){let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
const MAP={taxi_locale:['meridian','atelier','grandtour'],ncc_executive:['monolite','notturno','obsidian'],transfer_aeroporti:['obsidian','notturno'],minibus_gruppi:['obsidian','meridian'],montagna:['grandtour','meridian'],lago_turismo:['grandtour','atelier'],luxury_chauffeur:['aurum','velluto'],limousine_eventi:['aurum'],cerimonie:['velluto','atelier'],noleggio_prestigio:['chrome']};
const WEAK=new Set(['meridian','obsidian','monolite','chrome']);
const NEW={taxi_locale:'fermata',ncc_executive:'executive',luxury_chauffeur:'executive',limousine_eventi:'nero',noleggio_prestigio:'nero',transfer_aeroporti:'transfer',minibus_gruppi:'transfer',montagna:'alpino',lago_turismo:'lago',cerimonie:'cerimonia'};
const tally={},list=[];
for(const slug of Object.keys(U.leads)){
 if(!fs.existsSync(path.join(__dirname,'..',slug,'index.html')))continue;const r=R[slug];if(!r)continue;
 const c=r.character||'taxi_locale';const pool=MAP[c]||MAP.taxi_locale;const old=pool[h(slug)%pool.length];
 if(!WEAK.has(old))continue;
 const t=NEW[c]||'fermata';const f=L.facts(r);let html=t==='fermata'?fer(r,f):v3(r,f,t);html=I.inject(html,f.name);
 fs.writeFileSync(path.join(__dirname,'..',slug,'index.html'),html);tally[t]=(tally[t]||0)+1;list.push(slug+','+old+','+t);
}
fs.writeFileSync(path.join(__dirname,'sostituiti.csv'),'slug,stile_vecchio,template_nuovo\n'+list.join('\n')+'\n');
console.log(tally,list.length);
