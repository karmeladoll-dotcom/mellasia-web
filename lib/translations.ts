export type Language = 'en' | 'hr';

export type TranslationShape = {
  nav: {
    work: string;
    capabilities: string;
    forWhom: string;
    studio: string;
    lab: string;
    contact: string;
    cta: string;
  };
  hero: {
    meta: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaGhost: string;
    scroll: string;
    frameLabel: string;
  };
  work: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    statusLabel: string;
    category: string;
    name: string;
    tagline: string;
    description: string;
    viewLive: string;
    fallbackNote: string;
  };
  capabilities: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    pillar1Name: string;
    pillar1Purpose: string;
    pillar1Bullets: string[];
    pillar2Name: string;
    pillar2Purpose: string;
    pillar2Bullets: string[];
    pillar3Name: string;
    pillar3Purpose: string;
    pillar3Bullets: string[];
  };
  forWhom: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    body: string;
    tags: string[];
  };
  studio: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    body: string;
    principles: string[];
  };
  lab: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    body: string;
    slotLabel: string;
    slotStatus: string;
    moreSoon: string;
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleItalic: string;
    subtitle: string;
    formLineLabel_name: string;
    formLineLabel_email: string;
    formLineLabel_service: string;
    formLineLabel_message: string;
    placeholder_service: string;
    services: {
      story: string;
      visual: string;
      build: string;
      other: string;
    };
    submit: string;
    submitting: string;
    panelEmail: string;
    panelLocation: string;
    panelAvailability: string;
    success_headline: string;
    success_subtext: string;
    success_again: string;
    fallback_text: string;
    error_validation: string;
    error_email: string;
    error_message_length: string;
    error_send: string;
  };
  footer: {
    description: string;
    studioHeading: string;
    connectHeading: string;
    linkWork: string;
    linkStudio: string;
    linkLab: string;
    linkContact: string;
    copyright: string;
    tagline: string;
    authorLine: string;
  };
};

export type Translations = TranslationShape;

const en: TranslationShape = {
  nav: {
    work: 'Work',
    capabilities: 'Capabilities',
    forWhom: 'For',
    studio: 'Studio',
    lab: 'Lab',
    contact: 'Contact',
    cta: 'Start a project',
  },
  hero: {
    meta: 'MELLASIA · STUDIO · ZAGREB / WORLDWIDE',
    titleLine1: 'Websites that feel',
    titleLine2: 'like a world.',
    subtitle:
      'Mellasia designs cinematic digital experiences for brands built to be felt.',
    ctaPrimary: 'View featured work',
    ctaGhost: 'Start a project',
    scroll: 'Scroll',
    frameLabel: '01 / OPENING FRAME · MELLASIA 2026',
  },
  work: {
    eyebrow: '01 — FEATURED WORK',
    title: 'A first look —',
    titleItalic: 'Forno Nero.',
    statusLabel: 'Featured project',
    category: 'Hospitality / Digital Experience',
    name: 'Forno Nero',
    tagline: 'A digital experience built like a night out.',
    description:
      'Fire, rhythm, appetite. Forno Nero is the studio’s first public frame — a cinematic site where atmosphere leads the menu.',
    viewLive: 'View live project',
    fallbackNote: 'Final visuals in progress.',
  },
  capabilities: {
    eyebrow: '02 — WHAT MELLASIA BUILDS',
    title: 'Three disciplines,',
    titleItalic: 'one direction.',
    pillar1Name: 'Story & Structure',
    pillar1Purpose:
      'What the website is trying to say, and how it leads someone there.',
    pillar1Bullets: [
      'Narrative direction',
      'Hierarchy',
      'User journey',
      'Information architecture',
    ],
    pillar2Name: 'Visual Direction',
    pillar2Purpose: 'How it looks, feels, and frames itself.',
    pillar2Bullets: [
      'Typography',
      'Composition',
      'Image direction',
      'Digital identity',
    ],
    pillar3Name: 'Build & Motion',
    pillar3Purpose: 'How it moves, responds, and holds together.',
    pillar3Bullets: [
      'Responsive frontend',
      'Interaction design',
      'Purposeful motion',
      'Implementation detail',
    ],
  },
  forWhom: {
    eyebrow: '03 — BUILT FOR',
    title: 'For brands built',
    titleItalic: 'to be felt.',
    body:
      'Mellasia partners with hospitality, beauty, lifestyle, fashion, lounge and experience-led brands — places and people whose work earns its presence.',
    tags: [
      'Hospitality',
      'Beauty',
      'Lifestyle',
      'Fashion',
      'Lounge',
      'Experience',
    ],
  },
  studio: {
    eyebrow: '04 — STUDIO',
    title: 'An independent studio led by creative direction —',
    titleItalic: 'not templates.',
    body:
      'Mellasia is an independent digital studio. Every project begins with one question: what should someone feel before they decide?',
    principles: [
      'No borrowed brand voices.',
      'No motion without meaning.',
      'No generic digital places.',
    ],
  },
  lab: {
    eyebrow: '05 — CONCEPT LAB',
    title: 'Future worlds,',
    titleItalic: 'tested before they become real.',
    body:
      'The Lab is where Mellasia tests ideas no one has asked for yet. Cinematic concepts and interactive studies live here while they take shape.',
    slotLabel: 'Experiment',
    slotStatus: 'In development',
    moreSoon: 'More soon.',
  },
  contact: {
    eyebrow: '06 — START A PROJECT',
    titleLine1: 'Tell us what',
    titleItalic: 'should be felt.',
    subtitle: 'Write us. We reply within one working day.',
    formLineLabel_name: 'NAME',
    formLineLabel_email: 'EMAIL',
    formLineLabel_service: 'DISCIPLINE',
    formLineLabel_message: 'MESSAGE',
    placeholder_service: 'Choose a discipline',
    services: {
      story: 'Story & Structure',
      visual: 'Visual Direction',
      build: 'Build & Motion',
      other: 'Other',
    },
    submit: 'Send',
    submitting: 'Sending…',
    panelEmail: 'hello@mellasia.com',
    panelLocation: 'Zagreb · Worldwide',
    panelAvailability: 'By appointment',
    success_headline: 'Message received.',
    success_subtext: 'We respond within one business day.',
    success_again: 'Send another message',
    fallback_text: 'Or write us directly at',
    error_validation: 'All fields are required and properly formatted.',
    error_email: 'Email is not properly formatted.',
    error_message_length: 'Message must be at least 20 characters.',
    error_send:
      'Message not sent. Try again or write us directly at hello@mellasia.com.',
  },
  footer: {
    description:
      'An independent digital studio. Zagreb, worldwide.',
    studioHeading: 'Studio',
    connectHeading: 'Connect',
    linkWork: 'Featured Work',
    linkStudio: 'Studio',
    linkLab: 'Lab',
    linkContact: 'Contact',
    copyright: '© 2026 Mellasia',
    tagline: 'Made for what should be felt — in Zagreb.',
    authorLine: 'Authored by Karmela Sen',
  },
};

const hr: TranslationShape = {
  nav: {
    work: 'Rad',
    capabilities: 'Discipline',
    forWhom: 'Za koga',
    studio: 'Studio',
    lab: 'Lab',
    contact: 'Kontakt',
    cta: 'Pokreni projekt',
  },
  hero: {
    meta: 'MELLASIA · STUDIO · ZAGREB / GLOBALNO',
    titleLine1: 'Web stranice koje',
    titleLine2: 'se osjećaju kao svijet.',
    subtitle:
      'Mellasia oblikuje filmska digitalna iskustva za brendove koji su stvoreni da ostave dojam.',
    ctaPrimary: 'Pogledaj izdvojeni rad',
    ctaGhost: 'Pokreni projekt',
    scroll: 'Listaj',
    frameLabel: '01 / POČETNI KADAR · MELLASIA 2026',
  },
  work: {
    eyebrow: '01 — IZDVOJENI RAD',
    title: 'Prvi pogled —',
    titleItalic: 'Forno Nero.',
    statusLabel: 'Izdvojeni projekt',
    category: 'Ugostiteljstvo / Digitalno iskustvo',
    name: 'Forno Nero',
    tagline: 'Digitalno iskustvo osmišljeno kao izlazak.',
    description:
      'Vatra, ritam, apetit. Forno Nero je prvi javni kadar studija — filmska stranica gdje atmosfera vodi prije jelovnika.',
    viewLive: 'Pogledaj projekt uživo',
    fallbackNote: 'Završni vizuali u izradi.',
  },
  capabilities: {
    eyebrow: '02 — ŠTO MELLASIA GRADI',
    title: 'Tri discipline,',
    titleItalic: 'jedan smjer.',
    pillar1Name: 'Priča i struktura',
    pillar1Purpose:
      'Što stranica želi reći i kako vodi posjetitelja do toga.',
    pillar1Bullets: [
      'Narativni smjer',
      'Hijerarhija',
      'Korisničko putovanje',
      'Informacijska arhitektura',
    ],
    pillar2Name: 'Vizualni smjer',
    pillar2Purpose: 'Kako izgleda, kako se osjeća, kako se uokviruje.',
    pillar2Bullets: [
      'Tipografija',
      'Kompozicija',
      'Smjer slika',
      'Digitalni identitet',
    ],
    pillar3Name: 'Izvedba i pokret',
    pillar3Purpose: 'Kako se kreće, kako odgovara, kako drži cjelinu.',
    pillar3Bullets: [
      'Responzivni frontend',
      'Interakcijski dizajn',
      'Pokret sa svrhom',
      'Detalj izvedbe',
    ],
  },
  forWhom: {
    eyebrow: '03 — ZA KOGA',
    title: 'Za brendove stvorene',
    titleItalic: 'da se osjete.',
    body:
      'Mellasia surađuje s brendovima iz ugostiteljstva, beauty industrije, lifestylea, mode i prostora vođenih iskustvom — s mjestima i ljudima čiji rad zaslužuje svoju prisutnost.',
    tags: [
      'Ugostiteljstvo',
      'Beauty',
      'Lifestyle',
      'Moda',
      'Lounge',
      'Iskustvo',
    ],
  },
  studio: {
    eyebrow: '04 — STUDIO',
    title: 'Nezavisni studio vođen kreativnim smjerom —',
    titleItalic: 'ne predlošcima.',
    body:
      'Mellasia je nezavisni digitalni studio. Svaki projekt počinje jednim pitanjem: što bi netko trebao osjetiti prije nego što odluči?',
    principles: [
      'Bez posuđenih glasova brendova.',
      'Bez pokreta bez značenja.',
      'Bez generičkih digitalnih prostora.',
    ],
  },
  lab: {
    eyebrow: '05 — CONCEPT LAB',
    title: 'Budući svjetovi,',
    titleItalic: 'isprobani prije nego što postanu stvarni.',
    body:
      'Lab je prostor u kojem Mellasia istražuje ideje koje nitko još nije naručio. Filmski koncepti i interaktivne studije ovdje žive dok ne dobiju oblik.',
    slotLabel: 'Eksperiment',
    slotStatus: 'U razvoju',
    moreSoon: 'Uskoro više.',
  },
  contact: {
    eyebrow: '06 — POKRENI PROJEKT',
    titleLine1: 'Reci nam što',
    titleItalic: 'treba osjetiti.',
    subtitle: 'Pišite nam. Odgovaramo unutar jednog radnog dana.',
    formLineLabel_name: 'IME',
    formLineLabel_email: 'EMAIL',
    formLineLabel_service: 'DISCIPLINA',
    formLineLabel_message: 'PORUKA',
    placeholder_service: 'Odaberite disciplinu',
    services: {
      story: 'Priča i struktura',
      visual: 'Vizualni smjer',
      build: 'Izvedba i pokret',
      other: 'Drugo',
    },
    submit: 'Pošalji',
    submitting: 'Šaljem…',
    panelEmail: 'hello@mellasia.com',
    panelLocation: 'Zagreb · Globalno',
    panelAvailability: 'Po dogovoru',
    success_headline: 'Poruka primljena.',
    success_subtext: 'Odgovaramo unutar jednog radnog dana.',
    success_again: 'Pošalji novu poruku',
    fallback_text: 'Ili nam pišite izravno na',
    error_validation: 'Sva polja su obavezna i ispravnog formata.',
    error_email: 'Email nije ispravnog formata.',
    error_message_length: 'Poruka mora imati najmanje 20 znakova.',
    error_send:
      'Poruka nije poslana. Pokušajte ponovno ili nam pišite izravno na hello@mellasia.com.',
  },
  footer: {
    description:
      'Nezavisni digitalni studio. Zagreb, globalno.',
    studioHeading: 'Studio',
    connectHeading: 'Veza',
    linkWork: 'Izdvojeni rad',
    linkStudio: 'Studio',
    linkLab: 'Lab',
    linkContact: 'Kontakt',
    copyright: '© 2026 Mellasia',
    tagline: 'Stvoreno za ono što se treba osjetiti — u Zagrebu.',
    authorLine: 'Autorica: Karmela Sen',
  },
};

export const translations: Record<Language, TranslationShape> = { en, hr };
