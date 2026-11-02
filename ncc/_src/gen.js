// node gen.js [slug...]  — rigenera le pagine in ../<slug>/index.html (o in OUT se impostato)
const fs=require('fs'),path=require('path');
const L=require('./lib'),I=require('./intro');
const T={paese:require('./t-paese'),executive:require('./t-executive'),transfer:require('./t-transfer'),alpino:require('./t-alpino'),lago:require('./t-lago'),nero:require('./t-nero'),cerimonia:require('./t-nero')};
const leads=JSON.parse(fs.readFileSync(path.join(__dirname,'leads.json'),'utf8'));
const OUT=process.env.OUT||path.join(__dirname,'..');
const want=process.argv.slice(2);const res={};
for(const l of Object.values(leads)){
  if(want.length&&!want.includes(l.slug))continue;
  if(l.slug==='nolo-experience-brescia')continue; // non è un NCC: pagina vecchia lasciata com'è
  const a=L.archetype(l);const fn=T[a]||(process.env.FALLBACK?T.paese:null);if(!fn)continue;
  const f=L.facts(l);let h=fn(l,f,a);h=I.inject(h,f.name);
  fs.mkdirSync(path.join(OUT,l.slug),{recursive:true});fs.writeFileSync(path.join(OUT,l.slug,'index.html'),h);res[a]=(res[a]||0)+1;
}
console.log(res);
