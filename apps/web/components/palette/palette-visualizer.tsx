import SvgGeometry from "@/components/svg/geometry";
import SvgPattern from "@/components/svg/pattern";
import SvgLanding from "@/components/svg/landing";
import SvgNamecard from "@/components/svg/namecard";
import SvgArtisticFont from "../svg/artistic-font";
import DataChart from "../svg/data-chart";
import { Card } from "@ui/components/card";
import { cn } from "@ui/lib/utils";
import VisHeroSection from "../visualizer/hero-section";
import VisContactForm from "../visualizer/contact-form";
import VisTestimonials from "../visualizer/testimonial";
function PaletteVisualizer() {
  const cardStyle = cn(
    "flex aspect-[4/3] items-center justify-center p-6 [&>svg]:rounded overflow-hidden",
    "[&>svg]:w-full [&>svg]:h-full",
  );
  return (
    <main className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <VisHeroSection />
      </Card>
      <Card className="overflow-hidden">
        <VisTestimonials />
      </Card>
      <Card className="overflow-hidden">
        <VisContactForm />
      </Card>
      <h1 className="text-3xl font-semibold">Graphics</h1>
      <div
        className={
          "default grid gap-4 md:grid-cols-2 md:gap-6 lg:gap-8 xl:grid-cols-3"
        }
      >
        <Card className={cardStyle}>
          <SvgLanding />
        </Card>
        <Card className={cardStyle}>
          <DataChart />
        </Card>
        <Card className={cardStyle}>
          <SvgNamecard />
        </Card>
        <Card className={cardStyle}>
          <SvgArtisticFont />
        </Card>
        <Card className={cardStyle}>
          <SvgGeometry />
        </Card>
        <Card className={cardStyle}>
          <SvgPattern />
        </Card>
      </div>
    </main>
  );
}

export default PaletteVisualizer;
