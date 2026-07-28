import type { Metadata } from "next";

import DirectorsCutFinalExperience from "@/components/directors-cut-final/DirectorsCutFinalExperience";

export const metadata: Metadata = {
  title: "Mellasia | Director's Cut Final Candidate",
  description:
    "The isolated final integration candidate for the Mellasia Director's Cut experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MellasiaDirectorsCutFinalPage() {
  return <DirectorsCutFinalExperience />;
}
