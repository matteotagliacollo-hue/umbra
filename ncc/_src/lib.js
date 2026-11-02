// Umbra NCC v2 — dati, foto, destinazioni, blocchi condivisi.
const esc = s => String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ---------- foto (Unsplash, verificate a vista una per una) ----------
const P = {
  berlina: '1610099610040-ab19f3a5ec35,1592309905620-e5b59f6dcb98,1619221496652-7ee3d7406203,1609521247503-8de40462e427,1661589997089-405a6076fc18,1609521233053-345bfa8b6f17,1646012656811-d6c6b0be5d9f,1680451553374-09d8d6a1ca58,1700329694402-baa26366b29e,1624343747608-85a728776125,1629019879059-2a0345f93aea,1756407653081-1b6cfa60b608,1710343491609-0cbc6c14b92d,1654441796759-face90b2ae78,1654484521052-c6d2e96c120c,1706117759117-11c1ac198190,1720812943633-e0e64d4aec55,1601320086349-64720d50c1d8,1604969232137-4e4646534f2e,1671332752309-259609d9801f,1764605206511-7a649d9df63b,1686199948265-ddc4ebb1cc92',
  van: '1565340380388-6ecb7426fc63,1775637483812-fee34cccf8d7,1775637483812-25ce67beeb3d,1775047315770-5a7d1c3f3827,1775053635285-0a1219b6493b,1768394269854-075715f444b9,1768391069045-d8851f8ba18e,1765461734605-34657fa04db2,1688619100853-cc0e3ae443ab',
  autista: '1603122101829-e56305b0a5f7,1603087462214-2aadc739429c,1696992443043-7d63e521b91c,1740485863233-032dff964d0d,1508107394180-35ad18db993e,1740485863195-af1796f9e615,1765292784374-e061c5b3d111,1740485863667-7884e11e28f1,1679569665317-8fe440e49a85',
  interni: '1584099662811-6744be099a74,1662316208133-55e8e16f89fb,1661336878257-1c51b5af959a,1502014335594-c026800f24ee,1605437241278-c1806d14a4d9,1601673632676-12f89e430aa3,1519120433933-22bc753101f3,1781281209199-a49600e1fcf0,1781281209767-d5bcca177f79,1661336878277-1d0078e7b3e4,1786561048051-191fb1075f6d,1564435147762-f17f9cd384dd,1661336878269-e9b427fd902c,1775848366227-63ba09dddebb,1583669133761-f381444b03b0',
  supercar: '1614200187524-dc4b892acf16,1570294646112-27ce4f174e38,1614200179396-2bdb77ebf81b,1610847499832-918a1c3c6811,1618846446712-a4eda2adc05f,1503736334956-4c8f8e92946d,1530906358829-e84b2769270f,1532581140115-3e355d1ed1de,1657217674164-9cbf85acfc6d,1707399720709-cd14e30d5e3a,1581439645268-ea7bbe6bd091,1657107154933-0822c6695f6d,1682019323081-94c07163c3e9,1680184411091-f49bdbdc5150',
  matrimonio: '1596463097767-79a39851a776,1570907870057-e1e338bc0665,1676218424650-437f3db75bf7,1707414616417-f4c835c6a81a,1571394111091-d3edac39a32b,1523371696700-91e21249c0ed,1628188454080-78b0e5decb46,1687975893021-5a8004d314d4,1708926677406-45b973d9166b,1708077806955-9a1f71619e57,1590342855348-4dc7f6141fdb,1460154898712-a7f99bb4a464,1635106544853-b02d725e09ce',
  aeroporto: '1655919640606-28088c64edb0,1715927134295-6b1016e28414,1687992176093-6417a93fa3d0,1573076978602-a16914734d61,1687552626877-f4596995931c,1705662143994-1f237b825e88,1663271784319-ecc97ce8d4aa,1704794708120-97d4f6894ce0,1702411739431-0b6874405792,1758531491352-7887c1fe45b3,1524747498723-abaf19314a4d,1653582245010-04fc596f8ee2',
  strada: '1594720714877-26b3506bc184,1652636372386-95800028360c,1588756111081-8ca618899256,1598816530287-60981e23a0c1,1641061657014-ad7493603ea0,1753126391147-9a1639bb78f5,1570105283567-7fd3ec4ba6cd,1606816493585-22a8486501cb,1602668409075-13fddc1f2dab,1724095330169-c45451223348,1600066333973-abd515815372,1671994669988-f6117d075494,1724095330177-a75b0a49b33d,1573914826724-52a752180fde',
  citta: '1610016302534-6f67f1c968d8,1572602648934-1d98de6dab48,1588523641901-a18c795682e6,1585854189634-9aaabcd884ed,1617103539311-b92a6d2c0c1c,1516296270211-f3ae5494e65d,1620475655006-0f0c6a10a221,1645211710746-9629755e6814',
  notturno: '1619204715997-1367fe5812f1,1624921245402-47943def41ab,1679055324332-189b4a7bc99e,1516707577720-8221c3643fa3,1656855566586-65a283468fb3,1635406037758-6945c0af1232,1622884589154-4bf891d0af40,1624921245403-41a2201a3052,1670863929161-cd9d05f71528,1610369644714-20595c5abc24,1712422319654-9dfa516369a1,1712422319627-96d586a28796,1760421129731-fb76122cf481,1691341230195-d2daf34c62f2',
  montagna: '1632586632919-bc20878d86e0,1753978103194-1e02e091039a,1662128679549-31ecd8820884,1753978103194-56aebd721785,1671010496451-655961bbd22d,1667490750889-a3c241de59e4',
  neve: '1615928785722-9c4876b83706,1714912187257-ac1546b580ed,1714912187397-2cf4b7f11a21,1615928769128-4290569b6704,1688619100853-cc0e3ae443ab',
  lago: '1780405486190-aeec4c15fe1c,1662716260448-33640ce5b685,1777994404844-a7da5d98a58d,1759471389131-1b0c99f9e8af,1642967929244-621cd237ffdf,1780592446421-e6abf5f21ec8,1636382667057-0752bc8492a6,1766325205734-64f530df222c',
  mare: '1713856956187-60f3e3d26c1b,1713856956101-1621a15ce54f,1730831334364-2003f140f020,1529303875971-f52b9552f3b4'
};
for (const k in P) P[k] = P[k].split(',');

function seed(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function pick(cat, s, n){const pool=P[cat],out=[];let x=seed(s+cat);const used=new Set();
  for(let i=0;i<n&&used.size<pool.length;i++){let k;do{x=(Math.imul(x,1664525)+1013904223)>>>0;k=x%pool.length}while(used.has(k));used.add(k);out.push(pool[k])}return out}
const url = (id,w,h) => 'https://images.unsplash.com/photo-'+id+'?auto=format&fit=crop&w='+w+(h?'&h='+h:'')+'&q=72';
function img(id, alt, o={}){const w=o.w||1400;
  return '<img src="'+url(id,w,o.h)+'" srcset="'+url(id,Math.round(w/2),o.h&&Math.round(o.h/2))+' '+Math.round(w/2)+'w, '+url(id,w,o.h)+' '+w+'w" sizes="'+(o.sizes||'(max-width:900px) 100vw, 50vw')+'" alt="'+esc(alt)+'"'+(o.cls?' class="'+o.cls+'"':'')+' loading="'+(o.eager?'eager':'lazy')+'"'+(o.eager?' fetchpriority="high"':'')+' decoding="async" referrerpolicy="no-referrer" data-photo-slot="repertorio">'}

// ---------- destinazioni vere per città (aeroporti e stazioni principali) ----------
const AIR = {
  MXP:'Aeroporto di Milano Malpensa', LIN:'Aeroporto di Milano Linate', BGY:'Aeroporto di Bergamo Orio al Serio', VRN:'Aeroporto di Verona Villafranca',
  VCE:'Aeroporto di Venezia Marco Polo', TSF:'Aeroporto di Treviso', TRS:'Aeroporto di Trieste', BLQ:'Aeroporto di Bologna', TRN:'Aeroporto di Torino Caselle',
  GOA:'Aeroporto di Genova', CUF:'Aeroporto di Cuneo Levaldigi', PSA:'Aeroporto di Pisa', NCE:'Aeroporto di Nizza', INN:'Aeroporto di Innsbruck', BZO:'Aeroporto di Bolzano',
  RMI:'Aeroporto di Rimini', PMF:'Aeroporto di Parma', BSL:'Aeroporto di Basilea-Mulhouse', GVA:'Aeroporto di Ginevra', ZRH:'Aeroporto di Zurigo', LJU:'Aeroporto di Lubiana', MUC:'Aeroporto di Monaco di Baviera'
};
const R = (a, extra) => ({ air: a, extra: extra || [] });
const CITY = {
  'Milano':R(['MXP','LIN','BGY'],['Stazione Milano Centrale','Fiera Milano Rho']), 'Rho':R(['MXP','LIN','BGY'],['Fiera Milano Rho','Stazione Milano Centrale']), 'Corsico':R(['LIN','MXP','BGY'],['Stazione Milano Centrale']),
  'Monza':R(['LIN','BGY','MXP'],['Autodromo di Monza','Stazione Milano Centrale']), 'Brianza':R(['LIN','BGY','MXP'],['Stazione Milano Centrale']), 'Malpensa':R(['MXP','LIN','BGY'],['Stazione Milano Centrale','Lago Maggiore']),
  'Varese':R(['MXP','LIN','BGY'],['Lugano','Stazione Milano Centrale']), 'Como':R(['MXP','LIN','BGY'],['Lugano','Bellagio','Stazione Milano Centrale']), 'Lecco':R(['BGY','LIN','MXP'],['Bellagio','Stazione Milano Centrale']),
  'Bergamo':R(['BGY','LIN','MXP'],['Stazione Milano Centrale','Città Alta']), 'Treviglio':R(['BGY','LIN','MXP'],['Stazione Milano Centrale']), 'Brescia':R(['BGY','VRN','LIN'],['Lago di Garda','Stazione di Brescia']),
  'Iseo':R(['BGY','VRN','LIN'],['Franciacorta','Stazione di Brescia']), 'Cremona':R(['BGY','LIN','PMF'],['Stazione Milano Centrale']), 'Pavia':R(['LIN','MXP','BGY'],['Stazione Milano Centrale']),
  'Voghera':R(['LIN','MXP','GOA'],['Stazione Milano Centrale']), 'Vigevano':R(['MXP','LIN'],['Stazione Milano Centrale']), 'Abbiategrasso':R(['MXP','LIN'],['Stazione Milano Centrale']),
  'Mantova':R(['VRN','BLQ','BGY'],['Stazione di Verona Porta Nuova']), 'Sondrio':R(['BGY','LIN','MXP'],['St. Moritz','Livigno']), 'Bormio':R(['BGY','LIN','MXP'],['Livigno','St. Moritz','Passo dello Stelvio']),
  'Torino':R(['TRN','MXP','CUF'],['Stazione Torino Porta Nuova','Sestriere']), 'Pinerolo':R(['TRN','CUF'],['Sestriere','Stazione Torino Porta Nuova']), 'Ivrea':R(['TRN','MXP'],['Valle d’Aosta','Stazione Torino Porta Nuova']),
  'Biella':R(['MXP','TRN'],['Stazione Torino Porta Nuova','Stazione Milano Centrale']), 'Vercelli':R(['MXP','TRN','LIN'],['Stazione Milano Centrale']), 'Novara':R(['MXP','LIN','TRN'],['Stazione Milano Centrale']),
  'Borgosesia':R(['MXP','TRN'],['Valsesia','Alagna']), 'Verbania':R(['MXP','LIN'],['Isole Borromee','Stresa']), 'Stresa':R(['MXP','LIN'],['Isole Borromee','Lago d’Orta']), 'Domodossola':R(['MXP'],['Briga','Valle Vigezzo']),
  'Alessandria':R(['TRN','GOA','MXP'],['Serravalle Designer Outlet','Stazione di Alessandria']), 'Asti':R(['TRN','CUF','GOA'],['Langhe','Stazione di Asti']), 'Alba':R(['CUF','TRN'],['Langhe','Barolo']),
  'Cuneo':R(['CUF','TRN','NCE'],['Nizza','Langhe']), 'Mondovi':R(['CUF','TRN','GOA'],['Langhe','Prato Nevoso']), 'Aosta':R(['TRN','GVA','MXP'],['Courmayeur','Cervinia']),
  'Genova':R(['GOA','MXP','PSA'],['Porto di Genova','Portofino']), 'Chiavari':R(['GOA','PSA'],['Portofino','Cinque Terre']), 'La Spezia':R(['PSA','GOA'],['Cinque Terre','Porto della Spezia','Portovenere']),
  'Savona':R(['GOA','NCE','TRN'],['Porto di Savona','Stazione di Savona']), 'Imperia':R(['NCE','GOA'],['Sanremo','Monaco']),
  'Verona':R(['VRN','BGY','VCE'],['Lago di Garda','Stazione Verona Porta Nuova','Arena di Verona']), 'Valpolicella':R(['VRN','BGY'],['Lago di Garda','Verona centro']), 'Lago di Garda':R(['VRN','BGY','MXP'],['Gardaland','Verona centro']),
  'Desenzano':R(['VRN','BGY','MXP'],['Sirmione','Stazione di Desenzano']), 'Riva del Garda':R(['VRN','BZO','BGY'],['Arco','Malcesine','Stazione di Rovereto']),
  'Venezia':R(['VCE','TSF'],['Piazzale Roma','Terminal crociere','Stazione Venezia Santa Lucia']), 'Jesolo':R(['VCE','TSF'],['Venezia Piazzale Roma','Terminal crociere']),
  'Treviso':R(['TSF','VCE'],['Venezia Piazzale Roma','Colline del Prosecco']), 'Conegliano':R(['TSF','VCE'],['Colline del Prosecco','Cortina']), 'Castelfranco Veneto':R(['TSF','VCE','VRN'],['Venezia Piazzale Roma']),
  'Padova':R(['VCE','TSF','VRN'],['Stazione di Padova','Venezia']), 'Este':R(['VCE','BLQ','VRN'],['Stazione di Padova','Colli Euganei']), 'Rovigo':R(['VCE','BLQ','VRN'],['Stazione di Padova','Delta del Po']),
  'Vicenza':R(['VRN','VCE','TSF'],['Stazione di Vicenza','Asiago']), 'Schio':R(['VRN','VCE','TSF'],['Asiago','Stazione di Vicenza']), 'Bassano del Grappa':R(['TSF','VCE','VRN'],['Asiago','Colline del Prosecco']),
  'Belluno':R(['TSF','VCE'],['Cortina','Dolomiti']), "Cortina d'Ampezzo":R(['VCE','TSF','INN'],['Dolomiti','San Candido']),
  'Trento':R(['VRN','BZO','BGY'],['Lago di Garda','Madonna di Campiglio']), 'Canazei':R(['BZO','VRN','INN'],['Passo Sella','Val Gardena']), 'Bolzano':R(['BZO','VRN','INN','MUC'],['Val Gardena','Merano']),
  'Merano':R(['BZO','INN','VRN','MUC'],['Val Venosta','Bolzano']), 'Bressanone':R(['INN','BZO','VRN','MUC'],['Plose','Val Pusteria']), 'Ortisei':R(['BZO','INN','VRN'],['Seceda','Alpe di Siusi']), 'Vipiteno':R(['INN','BZO','MUC'],['Brennero','Val Ridanna']),
  'Udine':R(['TRS','VCE','LJU'],['Lignano','Tarvisio']), 'Codroipo':R(['TRS','VCE'],['Lignano','Udine']), 'Pordenone':R(['TSF','VCE','TRS'],['Piancavallo','Venezia']),
  'Trieste':R(['TRS','VCE','LJU'],['Porto di Trieste','Lubiana']), 'Monfalcone':R(['TRS','VCE','LJU'],['Porto di Trieste','Grado']), 'Grado':R(['TRS','VCE'],['Aquileia','Lignano']),
  'Bologna':R(['BLQ','RMI','VRN'],['Stazione Bologna Centrale','Fiera di Bologna']), 'Imola':R(['BLQ','RMI'],['Autodromo di Imola','Stazione Bologna Centrale']), 'Modena':R(['BLQ','PMF','VRN'],['Maranello','Stazione AV Reggio Emilia']),
  'Carpi':R(['BLQ','VRN','PMF'],['Modena','Stazione AV Reggio Emilia']), 'Reggio Emilia':R(['BLQ','PMF','VRN'],['Stazione AV Reggio Emilia']), 'Parma':R(['PMF','BLQ','LIN'],['Stazione di Parma','Fidenza Village']),
  'Fidenza':R(['PMF','BLQ','LIN'],['Fidenza Village','Salsomaggiore']), 'Piacenza':R(['LIN','PMF','BGY'],['Stazione Milano Centrale']), 'Ferrara':R(['BLQ','VCE'],['Stazione Bologna Centrale','Comacchio']),
  'Ravenna':R(['BLQ','RMI'],['Porto di Ravenna','Mirabilandia']), 'Cervia':R(['RMI','BLQ'],['Milano Marittima','Porto di Ravenna']), 'Forli':R(['BLQ','RMI'],['Stazione Bologna Centrale']), 'Rimini':R(['RMI','BLQ'],['San Marino','Riccione'])
};
function dests(city){const c=CITY[city];if(!c)return[];return c.air.map(k=>AIR[k]).concat(c.extra).slice(0,6)}

// ---------- archetipo ----------
const SOUTH_TYROL = ['Bolzano','Merano','Bressanone','Ortisei','Vipiteno'];
function archetype(l){
  const c = l.character || 'taxi_locale';
  if (c==='taxi_locale') return 'paese';
  if (c==='ncc_executive') return 'executive';
  if (c==='transfer_aeroporti'||c==='minibus_gruppi') return 'transfer';
  if (c==='montagna') return 'alpino';
  if (c==='lago_turismo') return 'lago';
  if (c==='cerimonie') return 'cerimonia';
  return 'nero'; // luxury_chauffeur, limousine_eventi, noleggio_prestigio
}
function lang2(l){ if (SOUTH_TYROL.includes(l.city)) return 'de'; return 'en'; }

// ---------- dati veri ----------
function facts(l){
  const digits = String(l.phone||'').replace(/\D/g,'');
  const intl = digits.startsWith('39') ? digits : '39'+digits;
  const r = parseFloat(String(l.rating||'').replace(',','.'));
  const ev = l.character_evidence === 'fonte' || (l.vehicles&&l.vehicles.length) || l.website;
  return {
    name: l.name, city: l.city || '', address: l.address || '',
    phoneDisplay: l.phone || '', tel: '+'+intl, wa: 'https://wa.me/'+intl,
    rating: isFinite(r) ? String(l.rating) : '', ratingNum: isFinite(r)?r:0, reviews: +l.reviews || 0,
    maps: 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent([l.name,l.address,l.city].filter(Boolean).join(' ')),
    vehicles: ev ? (l.vehicles||[]) : [], services: ev ? (l.services||[]) : [], ownCopy: ev ? l.own_copy : null,
    dests: dests(l.city), founded: l.founded || null
  };
}
function waText(f, msg){ return f.wa + '?text=' + encodeURIComponent(msg); }

// ---------- blocchi condivisi ----------
const ICON = {
  phone:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  wa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>',
  star:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"/></svg>',
  pin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  arrow:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};
function stars(n){return '<span class="stars" aria-label="'+n+' su 5">'+[1,2,3,4,5].map(i=>'<i style="opacity:'+(n>=i-0.25?1:.28)+'">'+ICON.star+'</i>').join('')+'</span>'}

// Modulo prenotazione → messaggio WhatsApp precompilato (funziona davvero, nessun dato inviato a noi)
function bookingForm(f, o={}){
  const L = o.labels || {from:'Partenza',to:'Destinazione',date:'Giorno e ora',pax:'Persone',send:'Chiedi il preventivo su WhatsApp',note:'Si apre WhatsApp con il messaggio già scritto. Vi risponde direttamente '+f.name+'.'};
  const opts = (o.dests||f.dests).map(d=>'<option>'+esc(d)+'</option>').join('');
  return '<form class="bk" data-wa="'+esc(f.wa)+'" onsubmit="return umbraBook(this)">'+
    '<label><span>'+L.from+'</span><input name="from" placeholder="'+esc(o.fromPh||('Es. '+(f.city||'il vostro indirizzo')))+'" autocomplete="off"></label>'+
    '<label><span>'+L.to+'</span><input name="to" list="dl-'+o.id+'" placeholder="'+esc(o.toPh||'Es. aeroporto, stazione, hotel')+'" autocomplete="off"><datalist id="dl-'+o.id+'">'+opts+'</datalist></label>'+
    '<div class="bk-row"><label><span>'+L.date+'</span><input name="when" placeholder="'+esc(o.whenPh||'Es. ven 14, ore 6:30')+'" autocomplete="off"></label>'+
    '<label class="bk-pax"><span>'+L.pax+'</span><select name="pax">'+[1,2,3,4,5,6,7,8].map(n=>'<option>'+n+'</option>').join('')+(o.bigGroups?'<option>9–16</option><option>più di 16</option>':'')+'</select></label></div>'+
    '<button type="submit" class="bk-go">'+ICON.wa+'<span>'+L.send+'</span></button>'+
    '<p class="bk-note">'+L.note+'</p></form>';
}
const BOOK_JS = `<script>function umbraBook(f){var g=function(n){return (f.elements[n]&&f.elements[n].value||'').trim()};
var m='Buongiorno, vorrei un preventivo.'+(g('from')?'\\nPartenza: '+g('from'):'')+(g('to')?'\\nDestinazione: '+g('to'):'')+(g('when')?'\\nQuando: '+g('when'):'')+'\\nPersone: '+g('pax');
window.open(f.getAttribute('data-wa')+'?text='+encodeURIComponent(m),'_blank','noopener');return false}</script>`;

// FAQ con <details>: niente JS, accessibile
function faq(items, cls){return '<div class="'+(cls||'faq')+'">'+items.map(([q,a])=>'<details><summary>'+q+'<i aria-hidden="true"></i></summary><p>'+a+'</p></details>').join('')+'</div>'}

// Comparsa allo scroll solo dove il browser la supporta in CSS: il contenuto non resta mai nascosto
const REVEAL_CSS = ''; // niente comparse allo scroll: il contenuto è sempre visibile

function badge(name){return '<div class="umbra-flag" role="note"><svg width="14" height="14" viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="14" stroke="#C3C6D3" stroke-width="2"/><path d="M16 3.5a12.5 12.5 0 0 1 0 25 15.5 15.5 0 0 0 0-25z" fill="#EEF0F6"/></svg><span><b>Anteprima Umbra</b> per '+esc(name)+' · non è il sito ufficiale</span></div>'+
'<style>.umbra-flag{position:fixed;left:14px;bottom:14px;z-index:8500;display:flex;align-items:center;gap:8px;max-width:min(420px,calc(100vw - 28px));padding:8px 13px;border-radius:999px;background:rgba(8,8,11,.84);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(238,240,246,.2);font:400 11px/1.35 system-ui,-apple-system,"Segoe UI",sans-serif;color:#C8C8D2;pointer-events:none}.umbra-flag b{color:#F4F2EC;font-weight:600}@media (max-width:760px){.umbra-flag{left:8px;right:8px;max-width:none;bottom:calc(74px + env(safe-area-inset-bottom,0px));justify-content:center;font-size:10.5px}}</style>'}

// barra fissa mobile: chiama + WhatsApp
function mobileBar(f, cls){return '<nav class="mbar '+(cls||'')+'" aria-label="Contatti rapidi"><a href="tel:'+f.tel+'">'+ICON.phone+'<span>Chiama</span></a><a href="'+waText(f,'Buongiorno, vorrei un preventivo.')+'" class="mbar-wa">'+ICON.wa+'<span>WhatsApp</span></a></nav>'}
const MBAR_CSS = `.mbar{display:none}@media (max-width:760px){.mbar{display:grid;grid-template-columns:1fr 1fr;position:fixed;left:0;right:0;bottom:0;z-index:8000;padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px));gap:8px;background:var(--mbar-bg,#111);border-top:1px solid rgba(255,255,255,.08)}
.mbar a{display:flex;align-items:center;justify-content:center;gap:8px;height:48px;border-radius:12px;font:600 15px/1 var(--sans);text-decoration:none;color:var(--mbar-fg,#fff);background:var(--mbar-b1,rgba(255,255,255,.08))}
.mbar .mbar-wa{background:#1FAF55;color:#fff}body{padding-bottom:72px}}`;

function head(o){return `<!doctype html>
<html lang="it"${o.htmlAttr||''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow,noarchive">
<meta name="referrer" content="no-referrer">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<meta name="theme-color" content="${o.theme}">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
${o.ogImg?'<meta property="og:image" content="'+url(o.ogImg,1200,630)+'">':''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link href="https://fonts.googleapis.com/css2?${o.fonts}&display=swap" rel="stylesheet">
<style>${o.css}
${REVEAL_CSS}
${MBAR_CSS}
</style>
</head>`}

function langToggle(two){ // IT / DE oppure IT / EN, solo CSS + 1 riga di JS
  return '<div class="lang" role="group" aria-label="Lingua"><button type="button" data-set="it" aria-pressed="true">IT</button><button type="button" data-set="'+two+'" aria-pressed="false">'+two.toUpperCase()+'</button></div>';
}
const LANG_JS = `<script>(function(){var h=document.documentElement;document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){var l=b.getAttribute('data-set');h.setAttribute('data-lang',l);h.lang=l;document.querySelectorAll('.lang button').forEach(function(x){x.setAttribute('aria-pressed',String(x.getAttribute('data-set')===l))})})})})()</script>`;
const LANG_CSS = `html:not([data-lang=de]) [data-l=de],html:not([data-lang=en]) [data-l=en],html[data-lang=de] [data-l=it],html[data-lang=en] [data-l=it]{display:none!important}`;
const T = (it, other, two) => '<span data-l="it">'+it+'</span><span data-l="'+two+'">'+other+'</span>';

module.exports = { esc, P, pick, url, img, facts, waText, archetype, lang2, ICON, stars, bookingForm, BOOK_JS, faq, badge, mobileBar, head, langToggle, LANG_JS, LANG_CSS, T, SOUTH_TYROL };
