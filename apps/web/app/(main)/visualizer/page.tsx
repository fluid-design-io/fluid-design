import VisHeroSection from "@/components/visualizer/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Visualize your color palette with interactive components",
  title: "Visualizer",
};

export default function VisualizerPage() {
  return <VisHeroSection />;
}
