import type { Metadata } from "next";
import DirectorsCutFinalExperience from "@/components/directors-cut-final/DirectorsCutFinalExperience";

export const metadata: Metadata = {
  title: "Mellasia | Director's Cut",
  description:
    "An independent Mellasia homepage study moving from appetite to identity, imagination, and invitation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MellasiaDirectorsCutPage() {
  return <DirectorsCutFinalExperience />;
}
