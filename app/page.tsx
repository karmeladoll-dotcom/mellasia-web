import type { Metadata } from "next";
import DirectorsCutFinalExperience from "@/components/directors-cut-final/DirectorsCutFinalExperience";

export const metadata: Metadata = {
  title: { absolute: "Mellasia | Web Design Studio Zagreb" },
  description:
    "Mellasia designs cinematic websites and digital identities for hospitality, beauty, lifestyle and experience-led brands. Independent studio in Zagreb, working worldwide.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <DirectorsCutFinalExperience />;
}
