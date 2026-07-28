"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./director-cut-motion-study.module.css";

type DirectorCutOpeningMotionProps = {
  openingTitleId?: string;
  fornoTitleId?: string;
  fornoAnchorId?: string;
  openingAriaLabel?: string;
  raiseFornoImage?: boolean;
};

export function DirectorCutOpeningMotion({
  openingTitleId = "motion-study-title",
  fornoTitleId = "motion-study-forno-title",
  fornoAnchorId = "forno-study",
  openingAriaLabel = "Mellasia opening to Forno motion study",
  raiseFornoImage = false,
}: DirectorCutOpeningMotionProps = {}) {
  const storyRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0.12, 0.36], ["0dvh", "-2dvh"]);
  const fornoY = useTransform(scrollYProgress, [0.24, 0.64], ["100dvh", "0dvh"]);
  const boundaryY = useTransform(scrollYProgress, [0.24, 0.64], ["0dvh", "-100dvh"]);
  const imageY = useTransform(scrollYProgress, [0.64, 0.78], [14, 0]);

  return (
    <div className={styles.page}>
      <section ref={storyRef} className={styles.story} aria-label={openingAriaLabel}>
        <span id={fornoAnchorId} className={styles.fornoAnchor} aria-hidden="true" />

        <div className={styles.stage}>
          <motion.section
            className={styles.prologue}
            aria-labelledby={openingTitleId}
            style={reducedMotion ? undefined : { y: heroY }}
          >
            <div className={styles.openingComposition}>
              <div className={styles.prologueCopy}>
                <h1 id={openingTitleId}>
                  <span className={styles.heroLead}>Websites that feel</span>
                  <span className={styles.heroNoun}>like a world.</span>
                </h1>
                <p className={styles.prologueIntro}>
                  I direct story, image, type and motion into websites made for remembering.
                </p>
                <a className={styles.primaryLink} href={`#${fornoAnchorId}`}>See the work</a>
              </div>

              <p className={styles.prologueStatement}>
                I do not make websites for clicks. I make them for remembering.
              </p>
            </div>
          </motion.section>

          <motion.section
            className={
              raiseFornoImage
                ? `${styles.forno} ${styles.fornoComposed}`
                : styles.forno
            }
            aria-labelledby={fornoTitleId}
            style={reducedMotion ? undefined : { y: fornoY }}
          >
            <header className={styles.fornoHeader}>
              <p className={styles.projectName}>Forno Nero</p>
              <h2 id={fornoTitleId}>Appetite before information.</h2>
            </header>

            <div
              className={
                raiseFornoImage
                  ? `${styles.fornoWorld} ${styles.fornoWorldSoftened}`
                  : styles.fornoWorld
              }
            >
              <motion.div
                className={styles.imagePlane}
                style={reducedMotion ? undefined : { y: imageY }}
              >
                <div className={styles.mobileImageSettle}>
                  <picture>
                    <source media="(max-width: 720px)" srcSet="/forno/forno-still-mobile.jpg" />
                    <Image
                      className={raiseFornoImage ? styles.fornoStillRaised : undefined}
                      src="/forno/forno-still.jpg"
                      alt="A Forno Nero pizza glowing under warm restaurant light"
                      fill
                      priority
                      sizes="100vw"
                    />
                  </picture>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            className={styles.boundaryTrack}
            style={reducedMotion ? undefined : { y: boundaryY }}
            aria-hidden="true"
          >
            <div className={styles.exposureLine} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function DirectorCutMotionStudy() {
  return (
    <main lang="en">
      <DirectorCutOpeningMotion />
    </main>
  );
}
