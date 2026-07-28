"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { DirectorCutOpeningMotion } from "@/components/directors-cut-motion-study/DirectorCutMotionStudy";

import lightStyles from "./directors-cut-final-opening.module.css";

export default function DirectorsCutFinalOpening() {
  const openingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: openingRef,
    offset: ["start start", "end end"],
  });
  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.46],
    [1, 1, 0],
  );

  return (
    <div ref={openingRef} className={lightStyles.study}>
      <DirectorCutOpeningMotion
        openingTitleId="hero-light-study-title"
        fornoTitleId="directors-cut-final-forno-title"
        fornoAnchorId="work"
        openingAriaLabel="Mellasia Director's Cut final opening to Forno Nero"
        raiseFornoImage
      />

      <div
        className={lightStyles.lightStory}
        data-hero-light="title-projector"
        aria-hidden="true"
      >
        <motion.div
          className={lightStyles.lightStage}
          style={reducedMotion ? undefined : { opacity: lightOpacity }}
        >
          <div
            className={`${lightStyles.lightField} ${lightStyles.titleProjectorField}`}
          >
            <span className={lightStyles.lightVolume} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
