import VisHeroSection from "@/components/visualizer/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visualizer",
  description: "Visualize your color palette with interactive components",
};

export default function VisualizerPage() {
  return <VisHeroSection />;
}
