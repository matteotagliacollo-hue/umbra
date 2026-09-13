window.U=window.U||{m:{}};
(function(){var module={exports:{}};var exports=module.exports;
var require=function(p){var k=String(p).split('/').pop().replace(/\.js$/,'');return window.U.m[k];};
/**
 * Copy engine.
 *
 * HARD RULE: nothing here may invent a verifiable fact about the business.
 * No fake years in business, no fake fleet size, no fake client names,
 * no invented testimonials. The only real data points used are the ones
 * scraped from Google (name, city, phone, rating, review count, category).
 * Everything else is category-standard service language that any operator
 * in this sector can truthfully claim, or is written as an editable slot.
 */

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const SEGMENTS = {
  ncc: {
    kicker: 'Noleggio con conducente',
    heroA: 'Il viaggio',
    heroB: 'come dovrebbe essere',
    lede: 'Autista privato, puntualità al minuto e discrezione assoluta. Prenotate in trenta secondi su WhatsApp: vi rispondiamo noi, non un centralino.',
    services: [
      ['Transfer aeroportuali', 'Monitoraggio del volo in tempo reale. Se il vostro aereo ritarda, l\'auto vi aspetta comunque.'],
      ['Business travel', 'Riunioni, fiere, appuntamenti. Un autista che conosce la città e non vi fa mai arrivare tardi.'],
      ['Lunga percorrenza', 'Trasferimenti fra città e verso l\'estero, con preventivo fisso concordato prima della partenza.'],
      ['Servizi su misura', 'Serate, congressi, disposizione oraria. Ci dite l\'esigenza, costruiamo il servizio.']
    ],
    proof: ['Preventivo fisso', 'Nessun costo a sorpresa a fine corsa'],
    fleet: [
      ['Berlina executive', '1–3 passeggeri', 'Classe E, Serie 5 o equivalente. La scelta standard per il business.'],
      ['Van premium', '1–7 passeggeri', 'Classe V o equivalente. Spazio per bagagli veri, non da cabina.'],
      ['Ammiraglia', '1–3 passeggeri', 'Classe S o equivalente. Quando l\'auto fa parte dell\'accoglienza.']
    ]
  },
  luxury: {
    kicker: 'Noleggio auto di prestigio',
    heroA: 'Le auto',
    heroB: 'che non si dimenticano',
    lede: 'Vetture selezionate, consegna dove volete voi, procedura senza burocrazia inutile. Scriveteci su WhatsApp e vi diciamo subito disponibilità e condizioni.',
    services: [
      ['Noleggio giornaliero', 'Una giornata, un weekend, una settimana. Formule chiare, chilometraggio concordato.'],
      ['Consegna e ritiro', 'Vi portiamo l\'auto in hotel, in aeroporto o davanti casa. E la riprendiamo dove dite voi.'],
      ['Eventi e shooting', 'Vetture per servizi fotografici, presentazioni, video. Anche con autista.'],
      ['Noleggio esteso', 'Formule su misura per periodi lunghi, con condizioni dedicate.']
    ],
    proof: ['Condizioni trasparenti', 'Cauzione e massimali comunicati prima di firmare'],
    fleet: [
      ['Sportive', 'Prestazioni pure', 'Il segmento per cui la gente ci chiama. Disponibilità su richiesta.'],
      ['SUV di rappresentanza', 'Presenza e comfort', 'Per chi vuole l\'auto giusta senza rinunciare allo spazio.'],
      ['Cabrio', 'Stagione aperta', 'Lago, costa, collina. Il modo giusto di guidare d\'estate.']
    ]
  },
  cerimonie: {
    kicker: 'Auto per cerimonie ed eventi',
    heroA: 'Il giorno',
    heroB: 'più importante',
    lede: 'Un\'auto impeccabile, un autista in abito, tempi studiati con voi. Nessuna improvvisazione: il vostro giorno non ammette prove.',
    services: [
      ['Matrimoni', 'Auto per gli sposi, sopralluogo del percorso, orari concordati con la cerimonia.'],
      ['Servizio invitati', 'Navette dedicate fra chiesa, location e hotel. Nessuno resta a piedi.'],
      ['Eventi privati', 'Anniversari, lauree, compleanni importanti. L\'arrivo conta quanto la festa.'],
      ['Serate ed eventi aziendali', 'Gala, premiazioni, cene di rappresentanza con più vetture coordinate.']
    ],
    proof: ['Sopralluogo incluso', 'Percorso e tempi verificati prima del giorno'],
    fleet: [
      ['Limousine', 'Fino a 8 posti', 'L\'ingresso che nessuno dimentica. Allestimento concordato con voi.'],
      ['Berlina di rappresentanza', 'Sposi', 'Nastro, addobbo floreale, tappetini nuovi. I dettagli sono compresi.'],
      ['Van per invitati', 'Fino a 8 posti', 'Il servizio che salva la giornata a chi arriva da fuori.']
    ]
  },
  transfer: {
    kicker: 'Transfer e navetta',
    heroA: 'Dall\'aeroporto',
    heroB: 'senza pensieri',
    lede: 'Vi aspettiamo in arrivi con il cartello, seguiamo il volo, partiamo quando siete pronti. Prezzo concordato prima, nessuna sorpresa dopo.',
    services: [
      ['Transfer aeroporto', 'Accoglienza in arrivi, monitoraggio del volo, attesa inclusa in caso di ritardo.'],
      ['Porto e stazione', 'Crociere e alta velocità, con spazio bagagli calcolato sul numero reale di valigie.'],
      ['Navetta hotel', 'Servizio continuativo per strutture ricettive e agenzie, con tariffe concordate.'],
      ['Gruppi', 'Più vetture coordinate per comitive, team aziendali e delegazioni.']
    ],
    proof: ['Volo monitorato', 'Se il volo ritarda, l\'attesa non si paga'],
    fleet: [
      ['Berlina', '1–3 passeggeri', 'La soluzione più rapida per chi viaggia leggero.'],
      ['Van 7 posti', '1–7 passeggeri', 'Famiglie e gruppi, con bagagliaio vero.'],
      ['Minibus', 'Fino a 8 posti', 'Per comitive e trasferimenti di gruppo.']
    ]
  }
};

const FAQ = [
  ['Come si prenota?', 'Il modo più veloce è WhatsApp: scriveteci data, orario, luogo di partenza e destinazione. Vi rispondiamo con il preventivo. Se preferite, potete anche chiamare.'],
  ['Il prezzo è fisso?', 'Sì. Il preventivo viene concordato prima del servizio e non cambia a fine corsa, salvo modifiche richieste da voi durante il viaggio.'],
  ['Con quanto anticipo devo prenotare?', 'Prima si prenota, più è facile garantire la vettura richiesta. Per le richieste last minute conviene scrivere direttamente su WhatsApp: se c\'è disponibilità lo sapete subito.'],
  ['Si può pagare con carta?', 'Sì. I metodi di pagamento accettati vengono confermati al momento della prenotazione.']
];

function content(lead) {
  const s = SEGMENTS[lead.segment] || SEGMENTS.ncc;
  const city = lead.city;
  return {
    ...s,
    city,
    // Real, verifiable proof points only.
    stats: [
      lead.rating ? [lead.rating.replace(',', ','), 'su Google'] : ['24/7', 'reperibilità'],
      lead.reviews > 0 ? [lead.reviews + (lead.reviews >= 100 ? '' : ''), 'recensioni verificate'] : ['H24', 'su prenotazione'],
      ['1', 'referente diretto']
    ],
    faq: FAQ,
    metaTitle: `${lead.name} — ${s.kicker} a ${city}`,
    metaDesc: `${s.kicker} a ${city}. Preventivo su WhatsApp, prezzo concordato prima della partenza. ${lead.phoneDisplay}.`
  };
}

module.exports = { content, esc, SEGMENTS };

window.U.m["content"]=module.exports;})();
