import ColorPickerFab from "@/components/core/color-picker-fab";
import ShadcnLogo from "@/components/svg/shadcn-logo";
import TailwindCssLogo from "@/components/svg/tailwindcss-logo";
import { Card } from "@ui/components/ui/card";
import { Code2, Figma } from "lucide-react";
import CodeGenerateButton from "./generate-button";
import { CodeGenerateType, CodeButtonTitle } from "@/lib/generateVariables";
import ReactNativePaperLogo from "@/components/svg/react-native-paper-logo";
import WebflowLogo from "@/components/svg/webflow-logo";
import { Metadata } from "next";
import { Badge } from "@ui/components/ui/badge";
import TamaguiLogo from "@/components/svg/tamagui-logo";

type CodeButtonType = {
  title: CodeButtonTitle;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  type: CodeGenerateType;
  available?: boolean;
};

export const metadata: Metadata = {
  title: "Code Generator",
  description: "Generate code for your favorite framework",
};

export default function CodeGenPage() {
  const buttons: CodeButtonType[] = [
    {
      title: CodeButtonTitle.RAW,
      icon: Code2,
      type: CodeGenerateType.CODEGEN,
    },
    {
      title: CodeButtonTitle.TAILWINDCSS,
      icon: TailwindCssLogo,
      type: CodeGenerateType.CODEGEN,
    },
    {
      title: CodeButtonTitle.SHADCN,
      icon: ShadcnLogo,
      type: CodeGenerateType.CODEGEN,
    },
    {
      title: CodeButtonTitle.FIGMA,
      icon: Figma,
      type: CodeGenerateType.PLUGIN,
    },
    {
      title: CodeButtonTitle.REACT_NATIVE_PAPER,
      icon: ReactNativePaperLogo,
      type: CodeGenerateType.CODEGEN,
    },
    {
      title: CodeButtonTitle.TAMAGUI,
      icon: TamaguiLogo,
      available: false,
      type: CodeGenerateType.CODEGEN,
    },
    {
      title: CodeButtonTitle.WEBFLOW,
      icon: WebflowLogo,
      available: false,
      type: CodeGenerateType.PLUGIN,
    },
  ];
  return (
    <div className="site-padding mx-auto mt-6 flex w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24 md:mt-8 lg:mt-10">
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {buttons.map((props, i) => (
          <CardButton key={`card-code-button-${i}`} {...props} />
        ))}
      </div>
      <ColorPickerFab />
    </div>
  );
}

const CardButton = ({ title, icon: Icon, type, available = true }) => (
  <Card className="relative flex flex-col items-center justify-center space-y-4 overflow-hidden py-6">
    <div className="relative z-10 flex items-center justify-center rounded-full border border-border/60 p-1.5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/20 bg-white/30 shadow-sm backdrop-blur-sm backdrop-saturate-200 dark:bg-background-accent/30">
        <Icon className="h-8 w-8 object-contain text-primary/80" />
      </div>
    </div>
    <div>
      <h3 className="-mt-1.5 text-sm font-medium text-foreground/75">
        {title}
      </h3>
    </div>
    <Icon className="pointer-events-none absolute bottom-0 right-0 z-[2] h-64 w-64 translate-x-1/4 translate-y-1/4 object-contain text-primary/80 opacity-5 dark:opacity-10" />
    <CodeGenerateButton
      {...{
        title,
        type,
        available,
      }}
    />
    {type === CodeGenerateType.PLUGIN && (
      <Badge
        className="pointer-events-none absolute right-4 top-0 z-10"
        variant="outline"
      >
        Plugin
      </Badge>
    )}
  </Card>
);
