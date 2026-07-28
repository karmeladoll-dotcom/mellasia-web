"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import styles from "./directors-cut-lab-threshold.module.css";

type DirectorsCutLabThresholdProps = {
  id?: string;
  headingId?: string;
  invitationTarget?: string;
  interactionLightSequence?: boolean;
  artifact?: ReactNode;
};

export default function DirectorsCutLabThreshold({
  id = "lab",
  headingId = "lab-threshold-title",
  invitationTarget = "#start",
  interactionLightSequence = false,
  artifact,
}: DirectorsCutLabThresholdProps) {
  const thresholdRef = useRef<HTMLDetailsElement>(null);
  const thresholdClassName = interactionLightSequence
    ? `${styles.threshold} ${styles.interactionLightSequence}`
    : styles.threshold;

  useEffect(() => {
    const threshold = thresholdRef.current;
    const summary = threshold?.querySelector("summary");

    if (
      !interactionLightSequence ||
      !threshold ||
      !summary ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 720px)").matches
    ) {
      return;
    }

    let clearTimer: number | undefined;
    let closingComplete = false;

    const clearClosingLight = () => {
      threshold.classList.remove(styles.closingLight);
      closingComplete = false;

      if (clearTimer !== undefined) {
        window.clearTimeout(clearTimer);
        clearTimer = undefined;
      }
    };

    const releaseClosingLight = () => {
      if (
        closingComplete &&
        !summary.matches(":hover") &&
        !summary.matches(":focus-visible")
      ) {
        clearClosingLight();
      }
    };

    const prepareClosingLight = () => {
      if (!threshold.open) {
        return;
      }

      clearClosingLight();
      void threshold.offsetWidth;
      threshold.classList.add(styles.closingLight);
      clearTimer = window.setTimeout(() => {
        closingComplete = true;
        releaseClosingLight();
      }, 440);
    };

    const handleToggle = () => {
      if (threshold.open) {
        clearClosingLight();
      }
    };

    summary.addEventListener("click", prepareClosingLight);
    summary.addEventListener("pointerleave", releaseClosingLight);
    summary.addEventListener("blur", releaseClosingLight);
    threshold.addEventListener("toggle", handleToggle);

    return () => {
      summary.removeEventListener("click", prepareClosingLight);
      summary.removeEventListener("pointerleave", releaseClosingLight);
      summary.removeEventListener("blur", releaseClosingLight);
      threshold.removeEventListener("toggle", handleToggle);
      clearClosingLight();
    };
  }, [interactionLightSequence]);

  return (
    <section id={id} className={styles.lab} aria-labelledby={headingId}>
      <div className={styles.intro}>
        <p className={styles.label}>Mellasia Lab</p>
        <h2 id={headingId}>Imagination begins before the brief.</h2>
        <p className={styles.supportingCopy}>
          Some ideas arrive as a texture, a cut, or a behavior. I keep them
          open long enough to become useful.
        </p>
      </div>

      <details ref={thresholdRef} className={thresholdClassName}>
        <summary className={styles.summary}>
          <span className={styles.closedLabel}>Open the threshold</span>
          <span className={styles.openLabel}>Close the threshold</span>
        </summary>

        <div className={styles.openContent}>
          {artifact ?? (
            <>
              <div className={styles.mobileMaterial} aria-hidden="true" />
              <div className={styles.revealCopy}>
                <p>
                  Here, an image, a behavior, or a single line can be tested
                  before it has a client or a final name.
                </p>
                <a href={invitationTarget}>Bring an unfinished idea</a>
              </div>
            </>
          )}
        </div>
      </details>
    </section>
  );
}
