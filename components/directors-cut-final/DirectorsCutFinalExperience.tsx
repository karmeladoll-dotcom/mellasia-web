import Image from "next/image";
import Link from "next/link";

import DirectorsCutFinalOpening from "@/components/directors-cut-final/DirectorsCutFinalOpening";
import DirectorsCutFinalNatalijaHeadline from "@/components/directors-cut-final/DirectorsCutFinalNatalijaHeadline";
import DirectorsCutLabArtifact from "@/components/directors-cut/DirectorsCutLabArtifact";
import DirectorsCutLabThreshold from "@/components/directors-cut/DirectorsCutLabThreshold";

import styles from "@/components/directors-cut/directors-cut.module.css";
import finalStyles from "./directors-cut-final.module.css";

const navigation = [
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Lab", href: "#lab" },
  { label: "Start", href: "#start" },
];

export default function DirectorsCutFinalExperience() {
  return (
    <main className={styles.page} lang="en">
      <header className={styles.navigation}>
        <Link
          className={styles.wordmark}
          href="/"
          aria-label="Mellasia production homepage"
        >
          Mellasia
        </Link>
        <nav aria-label="Director's Cut final candidate navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <DirectorsCutFinalOpening />

      <div className={styles.fornoClose}>
        <p className={styles.workingNote}>
          Forno had to feel warm before it explained the restaurant.
        </p>
        <p className={styles.fornoBody}>
          The first frame carries heat, anticipation and the sense that the
          evening has already started.
        </p>
      </div>

      <section
        id="method"
        className={styles.identity}
        aria-labelledby="identity-title"
      >
        <div className={styles.identityIntro}>
          <p className={styles.projectName}>Natalija</p>
          <DirectorsCutFinalNatalijaHeadline id="identity-title" />
          <p>
            Natalija needed intimacy, a clear before and after, and a direct
            path to booking. The portrait does the explaining.
          </p>
        </div>

        <div className={styles.identityComposition}>
          <div className={styles.natalijaWorld}>
            <Image
              src="/work/natalija-hero-split.png"
              alt="Natalija portrait divided between natural skin and a finished beauty look"
              fill
              sizes="(max-width: 760px) 88vw, (max-width: 1280px) 46vw, 600px"
            />
          </div>

          <div className={styles.methodNote}>
            <p className={styles.methodStatement}>
              Before the build, I choose the first signal, the necessary
              change, and the practical next step before I animate anything.
            </p>
          </div>

          <blockquote className={styles.motionPrinciple}>
            <p>The page is the film.</p>
            <p>Motion is editing.</p>
          </blockquote>
        </div>
      </section>

      <DirectorsCutLabThreshold
        headingId="lab-title"
        interactionLightSequence
        artifact={<DirectorsCutLabArtifact />}
      />

      <section
        id="start"
        className={`${styles.invitation} ${finalStyles.invitation}`}
        aria-labelledby="invitation-title"
      >
        <div className={finalStyles.invitationFrame}>
          <div className={finalStyles.closingManifesto}>
            <p className={finalStyles.manifestoLabel}>
              STUDIO POINT OF VIEW
            </p>
            <blockquote>
              <p>
                &ldquo;The page should open like a door, hold like a room, and
                leave like a scene you keep replaying.&rdquo;
              </p>
              <footer>remembered, not optimized</footer>
            </blockquote>
          </div>

          <div className={finalStyles.invitationLead}>
            <h2 id="invitation-title">Tell me what should be felt.</h2>
          </div>

          <div className={finalStyles.invitationCopy}>
            <p>
              Send the world, the mood, the reference, or the unfinished idea.
              I&apos;ll help shape it into a web experience people remember.
            </p>
          </div>

          <a
            className={`${styles.emailLink} ${finalStyles.emailLink}`}
            href="mailto:hello@mellasia.com"
            aria-label="Email Mellasia at hello@mellasia.com"
          >
            <span>Write to Mellasia</span>
            <strong>hello@mellasia.com</strong>
          </a>
        </div>
      </section>

      <footer className={styles.colophon}>
        <a className={styles.colophonMark} href="#hero-light-study-title">
          Mellasia
        </a>
        <div>
          <p>Authored by Karmela Sen</p>
          <p>Zagreb</p>
        </div>
        <p>&copy; 2026 Mellasia</p>
      </footer>
    </main>
  );
}
