"use client";

import { motion, useReducedMotion } from "motion/react";

import headlineStyles from "@/components/directors-cut/natalija-headline-reveal.module.css";

const headline = "Transformation without losing the person.";
const words = headline.split(" ");

type DirectorsCutFinalNatalijaHeadlineProps = {
  id: string;
};

export default function DirectorsCutFinalNatalijaHeadline({
  id,
}: DirectorsCutFinalNatalijaHeadlineProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.h2
      id={id}
      aria-label={headline}
      initial={reducedMotion ? false : "soft"}
      whileInView={reducedMotion ? undefined : "clear"}
      viewport={{ once: true, amount: 0.82, margin: "0px 0px -8% 0px" }}
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
