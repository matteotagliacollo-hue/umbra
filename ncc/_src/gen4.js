const fs=require('fs'),path=require('path');const L=require('./lib'),I=require('./intro'),fer=require('./t-fermata');
const R=JSON.parse(fs.readFileSync(path.join(__dirname,'leads.json'),'utf8'));const OUT=process.env.OUT;
for(const s of process.argv.slice(2)){const l=R[s];const f=L.facts(l);let h=fer(l,f);h=I.inject(h,f.name);fs.mkdirSync(path.join(OUT,s),{recursive:true});fs.writeFileSync(path.join(OUT,s,'index.html'),h);console.log(s,h.length)}
