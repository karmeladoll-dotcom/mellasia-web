import Image from "next/image";

import styles from "./directors-cut-lab-artifact.module.css";

export default function DirectorsCutLabArtifact() {
  return (
    <>
      <div className={styles.visualAperture}>
        <figure className={styles.visualInner}>
          <Image
            src="/work/afterglow-lab-signal.webp"
            alt="A translucent event pass resting on black fabric under blue and red light"
            width={405}
            height={720}
            sizes="(max-width: 720px) 190px, 192px"
          />
        </figure>
      </div>

      <div className={styles.copy}>
        <p className={styles.label}>LAB SIGNAL 01</p>
        <h3>AFTERGLOW / 07</h3>
        <p className={styles.description}>
          A private birthday pass system built like a backstage ritual.
        </p>
        <p className={styles.microDetails}>
          <span>Claim your pass.</span>
          <span>Access granted.</span>
          <span>Memory opens later.</span>
        </p>
        <a
          className={styles.futureLink}
          href="https://afterglow07.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open AFTERGLOW / 07 in a new tab"
        >
          Enter Afterglow
        </a>
      </div>
    </>
  );
}
