import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Izrada web stranica Zagreb",
  description:
    "Mellasia je web design studio iz Zagreba za custom web stranice, digitalni identitet i pažljivo oblikovana digitalna iskustva za hospitality, beauty i lifestyle brendove.",
  alternates: {
    canonical: "/izrada-web-stranica-zagreb",
  },
  openGraph: {
    title: "Izrada web stranica Zagreb | Mellasia",
    description:
      "Custom web dizajn i razvoj za hospitality, beauty, lifestyle i experience-led brendove.",
    url: "/izrada-web-stranica-zagreb",
    locale: "hr_HR",
    images: [
      {
        url: "/forno/forno-still.jpg",
        width: 1600,
        height: 900,
        alt: "Kinematografski web dizajn studija Mellasia za hospitality brend",
      },
    ],
  },
};

const services = [
  {
    title: "Custom web dizajn",
    body: "Vizualni smjer, struktura i sučelje oblikovani oko karaktera brenda, bez gotovih tema i generičnih blokova.",
  },
  {
    title: "Web razvoj",
    body: "Brza, responzivna i pristupačna izvedba koja precizno radi na mobitelu, tabletu i velikom ekranu.",
  },
  {
    title: "Digitalni identitet",
    body: "Tipografija, boje, vizualni jezik i sadržaj koji zajedno stvaraju prepoznatljiv digitalni nastup.",
  },
  {
    title: "SEO temelji i lansiranje",
    body: "Struktura sadržaja, metadata, sitemap, indeksiranje i tehnička priprema za vidljivost na tražilicama.",
  },
];

const process = [
  {
    title: "Usmjerimo priču",
    body: "Definiramo publiku, cilj, ponudu i osjećaj koji stranica mora prenijeti.",
  },
  {
    title: "Oblikujemo iskustvo",
    body: "Slažemo sadržaj, ritam, tipografiju i vizualni smjer prije razvoja.",
  },
  {
    title: "Gradimo precizno",
    body: "Razvijam responzivnu stranicu i provjeravam ključne interakcije na stvarnim veličinama ekrana.",
  },
  {
    title: "Lansiramo jasno",
    body: "Pripremamo domenu, SEO osnove, indeksiranje i siguran prijelaz na produkciju.",
  },
];

const faqs = [
  {
    question: "Koliko košta izrada web stranice?",
    answer:
      "Cijena ovisi o opsegu, količini sadržaja, jezicima, animaciji i funkcionalnostima. Nakon kratkog briefa dobivate jasan prijedlog opsega i ponudu.",
  },
  {
    question: "Koliko traje izrada?",
    answer:
      "Rok se određuje prema opsegu projekta i spremnosti sadržaja. Prije početka dogovaramo faze, povratne informacije i realan datum lansiranja.",
  },
  {
    question: "Radite li samo sa Zagrebom?",
    answer:
      "Ne. Mellasia je studio iz Zagreba, ali suradnja može biti potpuno online s klijentima iz Hrvatske i inozemstva.",
  },
  {
    question: "Je li SEO uključen?",
    answer:
      "Svaki projekt dobiva tehničke SEO temelje. Šira strategija sadržaja, dodatne landing stranice i kontinuirana optimizacija dogovaraju se prema ciljevima projekta.",
  },
  {
    question: "Možete li preuzeti i vizualni identitet?",
    answer:
      "Da. Web projekt može uključiti digitalni identitet, smjer fotografije, tipografiju, sadržaj i materijale potrebne za dosljedan nastup brenda.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Izrada web stranica Zagreb",
  serviceType: "Custom web design and development",
  url: "https://www.mellasia.com/izrada-web-stranica-zagreb",
  description:
    "Custom web dizajn, razvoj i digitalni identitet za hospitality, beauty, lifestyle i experience-led brendove.",
  provider: {
    "@id": "https://www.mellasia.com/#organization",
  },
  areaServed: ["Zagreb", "Croatia", "Europe", "Worldwide"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const contactHref =
  "mailto:hello@mellasia.com?subject=Upit%20za%20izradu%20web%20stranice";

export default function WebDesignZagrebPage() {
  return (
    <main className={styles.page} lang="hr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd, faqJsonLd]).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.navigation}>
        <Link className={styles.wordmark} href="/" aria-label="Mellasia početna">
          Mellasia
        </Link>
        <nav aria-label="Navigacija stranice usluge">
          <a href="#usluge">Usluge</a>
          <a href="#radovi">Radovi</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="web-design-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Web design studio Zagreb</p>
          <h1 id="web-design-title">Izrada web stranica s karakterom.</h1>
          <p className={styles.heroIntro}>
            Dizajn, razvoj i digitalni identitet za hospitality, beauty i lifestyle brendove iz Zagreba i svijeta.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryCta} href={contactHref}>
              Pokrenimo projekt
            </a>
            <a className={styles.secondaryCta} href="#pristup">
              Pogledaj pristup
            </a>
          </div>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/forno/forno-still.jpg"
            alt="Pizza u toplom filmskom kadru kao dio Mellasia web iskustva za restoran"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 48vw"
          />
        </div>
      </section>

      <section id="pristup" className={styles.statement} aria-labelledby="approach-title">
        <h2 id="approach-title">Prvo osjećaj. Zatim odluka.</h2>
        <div>
          <p>
            Dobra web stranica ne treba samo izgledati profesionalno. Mora odmah pokazati tko ste, zašto ste drugačiji i što posjetitelj treba učiniti dalje.
          </p>
          <p>
            Mellasia spaja strategiju, dizajn, sadržaj i razvoj u jedno cjelovito iskustvo. Rezultat je stranica koja pripada vašem brendu i radi za njegov sljedeći korak.
          </p>
        </div>
      </section>

      <section id="usluge" className={styles.services} aria-labelledby="services-title">
        <header className={styles.sectionHeading}>
          <h2 id="services-title">Što projekt može uključiti</h2>
          <p>Opseg se slaže prema stvarnom cilju, bez paketa koji dodaju stvari koje vam ne trebaju.</p>
        </header>
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="radovi" className={styles.work} aria-labelledby="work-title">
        <header className={styles.workHeading}>
          <h2 id="work-title">Svaki projekt traži vlastiti prvi kadar.</h2>
        </header>

        <article className={styles.workFeature}>
          <div className={styles.workImageWide}>
            <Image
              src="/images/bocca-di-lupo-1.png"
              alt="Vizualna kampanja restorana Bocca di Lupo"
              fill
              sizes="(max-width: 800px) 100vw, 62vw"
            />
          </div>
          <div className={styles.workCopy}>
            <p>Bocca di Lupo</p>
            <h3>Vizualni sustav koji nosi atmosferu restorana.</h3>
          </div>
        </article>

        <article className={styles.workFeatureReverse}>
          <div className={styles.workImagePortrait}>
            <Image
              src="/work/natalija-hero-split.png"
              alt="Beauty portret podijeljen između prirodnog izgleda i završnog make-upa"
              fill
              sizes="(max-width: 800px) 100vw, 38vw"
            />
          </div>
          <div className={styles.workCopyLarge}>
            <p>Natalija</p>
            <h3>Transformacija bez gubitka osobe.</h3>
            <span>Jasna priča, snažan vizual i izravan put prema rezervaciji.</span>
          </div>
        </article>
      </section>

      <section className={styles.studio} aria-labelledby="studio-title">
        <div className={styles.founderImage}>
          <Image
            src="/images/Mellasia Founder Picture.jpg"
            alt="Karmela Sen, osnivačica studija Mellasia"
            fill
            sizes="(max-width: 800px) 88vw, 34vw"
          />
        </div>
        <div className={styles.studioCopy}>
          <h2 id="studio-title">Jedna osoba vodi cijeli projekt.</h2>
          <p>
            Mellasia je nezavisni studio koji vodi Karmela Sen. Od prvog razgovora do finalne provjere surađujete izravno s osobom koja oblikuje i gradi vašu stranicu.
          </p>
        </div>
      </section>

      <section id="proces" className={styles.process} aria-labelledby="process-title">
        <h2 id="process-title">Od prve ideje do lansiranja</h2>
        <div className={styles.processGrid}>
          {process.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <h2 id="faq-title">Česta pitanja</h2>
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="kontakt" className={styles.contact} aria-labelledby="contact-title">
        <h2 id="contact-title">Imate projekt na umu?</h2>
        <p>Pošaljite ideju, cilj ili postojeću stranicu. Odgovorit ću s jasnim prijedlogom sljedećeg koraka.</p>
        <a href={contactHref}>hello@mellasia.com</a>
      </section>

      <footer className={styles.footer}>
        <Link className={styles.wordmark} href="/">
          Mellasia
        </Link>
        <p>Web design studio, Zagreb</p>
        <p>© 2026 Mellasia</p>
      </footer>
    </main>
  );
}
