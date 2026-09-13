window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Libreria fotografica.
 *
 * Foto Unsplash, licenza Unsplash: uso commerciale consentito, nessun compenso
 * e nessuna attribuzione obbligatoria. Ogni ID qui sotto è stato raccolto dai
 * risultati di ricerca reali di Unsplash e verificato uno per uno in browser:
 * tutte e 128 le immagini rispondono e si caricano.
 *
 * ATTENZIONE COMMERCIALE: sono foto di repertorio, non la flotta del cliente.
 * Vanno benissimo per la demo; prima di mettere online il sito di un cliente
 * vanno sostituite con le sue foto, altrimenti gli si promette un'auto che non ha.
 * Ogni <img> generato qui porta un attributo data-photo-slot per trovarle subito.
 */

const P = {
  berlina: 'photo-1610099610040-ab19f3a5ec35,photo-1592309905620-e5b59f6dcb98,photo-1619221496652-7ee3d7406203,photo-1609521247503-8de40462e427,photo-1661589997089-405a6076fc18,photo-1609521233053-345bfa8b6f17,photo-1646012656811-d6c6b0be5d9f,photo-1680451553374-09d8d6a1ca58,photo-1700329694402-baa26366b29e,photo-1624343747608-85a728776125,photo-1629019879059-2a0345f93aea,photo-1756407653081-1b6cfa60b608,photo-1710343491609-0cbc6c14b92d,photo-1654441796759-face90b2ae78,photo-1654484521052-c6d2e96c120c,photo-1706117759117-11c1ac198190,photo-1720812943633-e0e64d4aec55,photo-1601320086349-64720d50c1d8,photo-1604969232137-4e4646534f2e,photo-1671332752309-259609d9801f,photo-1764605206511-7a649d9df63b,photo-1686199948265-ddc4ebb1cc92',
  van: 'photo-1565340380388-6ecb7426fc63,photo-1775637483812-fee34cccf8d7,photo-1775637483812-25ce67beeb3d,photo-1775047315770-5a7d1c3f3827,photo-1775053635285-0a1219b6493b,photo-1768394269854-075715f444b9,photo-1768391069045-d8851f8ba18e',
  autista: 'photo-1603122101829-e56305b0a5f7,photo-1603087462214-2aadc739429c,photo-1696992443043-7d63e521b91c,photo-1740485863233-032dff964d0d,photo-1508107394180-35ad18db993e,photo-1740485863195-af1796f9e615,photo-1765292784374-e061c5b3d111,photo-1740485863667-7884e11e28f1,photo-1679569665317-8fe440e49a85',
  interni: 'photo-1584099662811-6744be099a74,photo-1662316208133-55e8e16f89fb,photo-1661336878257-1c51b5af959a,photo-1502014335594-c026800f24ee,photo-1605437241278-c1806d14a4d9,photo-1601673632676-12f89e430aa3,photo-1519120433933-22bc753101f3,photo-1781281209199-a49600e1fcf0,photo-1781281209767-d5bcca177f79,photo-1661336878277-1d0078e7b3e4,photo-1786561048051-191fb1075f6d,photo-1564435147762-f17f9cd384dd,photo-1661336878269-e9b427fd902c,photo-1775848366227-63ba09dddebb,photo-1583669133761-f381444b03b0',
  supercar: 'photo-1614200187524-dc4b892acf16,photo-1570294646112-27ce4f174e38,photo-1614200179396-2bdb77ebf81b,photo-1610847499832-918a1c3c6811,photo-1618846446712-a4eda2adc05f,photo-1503736334956-4c8f8e92946d,photo-1530906358829-e84b2769270f,photo-1532581140115-3e355d1ed1de,photo-1657217674164-9cbf85acfc6d,photo-1707399720709-cd14e30d5e3a,photo-1581439645268-ea7bbe6bd091,photo-1657107154933-0822c6695f6d,photo-1682019323081-94c07163c3e9,photo-1680184411091-f49bdbdc5150',
  matrimonio: 'photo-1596463097767-79a39851a776,photo-1570907870057-e1e338bc0665,photo-1676218424650-437f3db75bf7,photo-1707414616417-f4c835c6a81a,photo-1571394111091-d3edac39a32b,photo-1523371696700-91e21249c0ed,photo-1628188454080-78b0e5decb46,photo-1687975893021-5a8004d314d4,photo-1708926677406-45b973d9166b,photo-1708077806955-9a1f71619e57,photo-1590342855348-4dc7f6141fdb,photo-1460154898712-a7f99bb4a464,photo-1635106544853-b02d725e09ce',
  aeroporto: 'photo-1655919640606-28088c64edb0,photo-1715927134295-6b1016e28414,photo-1687992176093-6417a93fa3d0,photo-1573076978602-a16914734d61,photo-1687552626877-f4596995931c,photo-1705662143994-1f237b825e88,photo-1663271784319-ecc97ce8d4aa,photo-1704794708120-97d4f6894ce0,photo-1702411739431-0b6874405792,photo-1758531491352-7887c1fe45b3,photo-1524747498723-abaf19314a4d,photo-1653582245010-04fc596f8ee2',
  strada: 'photo-1594720714877-26b3506bc184,photo-1652636372386-95800028360c,photo-1588756111081-8ca618899256,photo-1598816530287-60981e23a0c1,photo-1641061657014-ad7493603ea0,photo-1753126391147-9a1639bb78f5,photo-1570105283567-7fd3ec4ba6cd,photo-1606816493585-22a8486501cb,photo-1602668409075-13fddc1f2dab,photo-1724095330169-c45451223348,photo-1600066333973-abd515815372,photo-1671994669988-f6117d075494,photo-1724095330177-a75b0a49b33d,photo-1573914826724-52a752180fde',
  citta: 'photo-1610016302534-6f67f1c968d8,photo-1572602648934-1d98de6dab48,photo-1588523641901-a18c795682e6,photo-1585854189634-9aaabcd884ed,photo-1617103539311-b92a6d2c0c1c,photo-1516296270211-f3ae5494e65d,photo-1620475655006-0f0c6a10a221,photo-1645211710746-9629755e6814',
  notturno: 'photo-1619204715997-1367fe5812f1,photo-1624921245402-47943def41ab,photo-1679055324332-189b4a7bc99e,photo-1516707577720-8221c3643fa3,photo-1656855566586-65a283468fb3,photo-1635406037758-6945c0af1232,photo-1622884589154-4bf891d0af40,photo-1624921245403-41a2201a3052,photo-1670863929161-cd9d05f71528,photo-1610369644714-20595c5abc24,photo-1712422319654-9dfa516369a1,photo-1712422319627-96d586a28796,photo-1760421129731-fb76122cf481,photo-1691341230195-d2daf34c62f2'
};
Object.keys(P).forEach(k => { P[k] = P[k].split(','); });

const ALT = {
  berlina: 'Berlina executive di colore scuro',
  van: 'Van premium per trasferimenti di gruppo',
  autista: 'Autista in giacca accanto alla vettura',
  interni: 'Interni in pelle di una vettura di rappresentanza',
  supercar: 'Vettura sportiva di prestigio',
  matrimonio: 'Auto d’epoca allestita per una cerimonia',
  aeroporto: 'Terminal aeroportuale',
  strada: 'Strada panoramica del Nord Italia',
  citta: 'Scorcio del centro di Milano',
  notturno: 'Strada cittadina di notte'
};

// selezione deterministica: stesso lead, stesse foto a ogni build,
// lead diversi nello stesso tema, foto diverse.
function seedOf(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function pickN(cat, seed, n, offset) {
  const pool = P[cat], out = [], used = new Set();
  let s = (seed + (offset || 0) * 2654435761) >>> 0;
  for (let i = 0; i < n; i++) {
    let k = 0;
    do { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; k = s % pool.length; } while (used.has(k) && used.size < pool.length);
    used.add(k); out.push(pool[k]);
  }
  return out;
}

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function makePic(id, cat, slot) {
  const base = 'https://images.unsplash.com/' + id;
  const src = (w, q) => base + '?auto=format&fit=crop&w=' + (w || 1400) + '&q=' + (q || 76);
  return {
    id, cat, slot,
    alt: ALT[cat],
    src,
    /** CSS: url() pronta per background-image */
    css: (w, q) => "url('" + src(w, q) + "')",
    /**
     * <img> pronto. opts: {w,q,cls,eager,ratio,alt,style}
     * Larghezze responsive già impostate; loading lazy salvo eager:true.
     */
    tag: (opts) => {
      const o = opts || {};
      const w = o.w || 1400;
      const srcset = [Math.round(w / 2), w, Math.min(2400, w * 2)]
        .map(x => src(x, o.q) + ' ' + x + 'w').join(', ');
      return '<img src="' + src(w, o.q) + '" srcset="' + srcset + '"'
        + ' sizes="' + (o.sizes || '(max-width:900px) 100vw, ' + w + 'px') + '"'
        + ' alt="' + esc(o.alt || ALT[cat]) + '"'
        + ' data-photo-slot="' + esc(slot) + '"'
        + (o.cls ? ' class="' + esc(o.cls) + '"' : '')
        + (o.style ? ' style="' + esc(o.style) + '"' : '')
        + ' loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async"'
        + ' referrerpolicy="no-referrer">';
    }
  };
}

const HERO = { ncc: 'berlina', luxury: 'supercar', cerimonie: 'matrimonio', transfer: 'aeroporto' };
const FLEET = {
  ncc: ['berlina', 'van', 'berlina'],
  luxury: ['supercar', 'berlina', 'supercar'],
  cerimonie: ['matrimonio', 'matrimonio', 'van'],
  transfer: ['berlina', 'van', 'van']
};

function photos(lead) {
  const seed = seedOf(lead.id + lead.name);
  const seg = lead.segment;
  const heroCat = HERO[seg] || 'berlina';
  const fleetCats = FLEET[seg] || FLEET.ncc;

  // Hero, seconda foto e le tre della flotta possono ricadere sulla stessa
  // categoria (es. luxury: hero supercar + flotta supercar/berlina/supercar).
  // Vanno quindi pescate in un colpo solo per categoria, con un unico insieme di
  // "già usate": altrimenti la stessa foto compare due volte nella stessa pagina.
  const want = [
    { cat: heroCat, key: 'hero' },
    { cat: heroCat, key: 'heroAlt' },
    ...fleetCats.map((cat, i) => ({ cat, key: 'fleet' + i }))
  ];
  const byCat = {};
  want.forEach((w, i) => { (byCat[w.cat] = byCat[w.cat] || []).push(i); });

  const assigned = [];
  Object.keys(byCat).sort().forEach(cat => {
    const slots = byCat[cat];
    const picked = pickN(cat, seed, slots.length, 1 + slots[0]);
    slots.forEach((slotIdx, k) => { assigned[slotIdx] = picked[k]; });
  });

  const hero = [assigned[0], assigned[1]];
  const fleetIds = fleetCats.map((_, i) => assigned[2 + i]);

  return {
    hero: makePic(hero[0], heroCat, 'hero'),
    heroAlt: makePic(hero[1], heroCat, 'hero-2'),
    fleet: fleetIds.map((id, i) => makePic(id, fleetCats[i], 'flotta-' + (i + 1))),
    interni: makePic(pickN('interni', seed, 1, 20)[0], 'interni', 'interni'),
    autista: makePic(pickN('autista', seed, 1, 21)[0], 'autista', 'autista'),
    strada: makePic(pickN('strada', seed, 1, 22)[0], 'strada', 'strada'),
    notturno: makePic(pickN('notturno', seed, 1, 23)[0], 'notturno', 'notturno'),
    aeroporto: makePic(pickN('aeroporto', seed, 1, 24)[0], 'aeroporto', 'aeroporto'),
    // solo per i lead di Milano: altrimenti si mostrerebbe una città sbagliata
    citta: /^Milano$/i.test(lead.city) ? makePic(pickN('citta', seed, 1, 25)[0], 'citta', 'citta') : null
  };
}

module.exports = { photos, P, ALT };

window.U.m["photos"]=module.exports;})();
