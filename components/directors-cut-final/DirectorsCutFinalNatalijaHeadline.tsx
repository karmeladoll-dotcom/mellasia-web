"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";

import headlineStyles from "@/components/directors-cut/natalija-headline-reveal.module.css";

const headline = "Transformation without losing the person.";
const words = headline.split(" ");

type DirectorsCutFinalNatalijaHeadlineProps = {
  id: string;
};

export default function DirectorsCutFinalNatalijaHeadline({
  id,
}: DirectorsCutFinalNatalijaHeadlineProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const heading = headingRef.current;
    if (reducedMotion || !heading || typeof IntersectionObserver === "undefined") {
      controls.set("clear");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          controls.set("soft");
          return;
        }

        if (entry.intersectionRatio >= 0.82) {
          controls.start("clear");
        }
      },
      { threshold: [0, 0.82], rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, [controls, reducedMotion]);

  return (
    <motion.h2
      ref={headingRef}
      id={id}
      aria-label={headline}
      initial={reducedMotion ? false : "soft"}
      animate={reducedMotion ? "clear" : controls}
    >
      {words.map((word, index) => (
        <span key={word}>
          <motion.span
            aria-hidden="true"
            className={headlineStyles.word}
            custom={index}
            variants={{
              soft: (wordIndex: number) =>
                wordIndex === 0
                  ? { opacity: 1, filter: "blur(0px)" }
                  : { opacity: 0.2, filter: "blur(7px)" },
              clear: (wordIndex: number) => ({
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.92,
                  delay:
                    wordIndex === 0 ? 0 : 0.14 + (wordIndex - 1) * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                },
              }),
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.h2>
  );
}
