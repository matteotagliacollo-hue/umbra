const fs=require('fs'),path=require('path');const L=require('./lib'),I=require('./intro'),v3=require('./v3');
const R=JSON.parse(fs.readFileSync(path.join(__dirname,'leads.json'),'utf8'));
const OUT=process.env.OUT; const [tpl,...slugs]=process.argv.slice(2);
for(const s of slugs){const l=R[s];const f=L.facts(l);let h=v3(l,f,tpl);h=I.inject(h,f.name);fs.mkdirSync(path.join(OUT,s),{recursive:true});fs.writeFileSync(path.join(OUT,s,'index.html'),h);console.log(tpl,s,h.length)}
