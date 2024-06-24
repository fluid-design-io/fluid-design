import ColorPickerFab from '@/components/core/color-picker-fab'
import ReactNativePaperLogo from '@/components/svg/react-native-paper-logo'
import ShadcnLogo from '@/components/svg/shadcn-logo'
import TailwindCssLogo from '@/components/svg/tailwindcss-logo'
import { CodeButtonTitle, CodeGenerateType } from '@/lib/generateVariables'
import { Badge } from '@ui/components/ui/badge'
import { Card } from '@ui/components/ui/card'
import { Code2, Figma } from 'lucide-react'
import { Metadata } from 'next'

import CodeGenerateButton from './generate-button'

type CodeButtonType = {
  available?: boolean
  icon: React.ElementType | React.FC<React.SVGProps<SVGSVGElement>>
  title: CodeButtonTitle
  type: CodeGenerateType
}

export const metadata: Metadata = {
  description: 'Generate code for your favorite framework',
  title: 'Code Generator',
}

export default function CodeGenPage() {
  const buttons: CodeButtonType[] = [
    {
      icon: Code2,
      title: CodeButtonTitle.RAW,
      type: CodeGenerateType.CODEGEN,
    },
    {
      icon: TailwindCssLogo,
      title: CodeButtonTitle.TAILWINDCSS,
      type: CodeGenerateType.CODEGEN,
    },
    {
      icon: ShadcnLogo,
      title: CodeButtonTitle.SHADCN,
      type: CodeGenerateType.CODEGEN,
    },
    {
      icon: Figma,
      title: CodeButtonTitle.FIGMA,
      type: CodeGenerateType.PLUGIN,
    },
    {
      icon: ReactNativePaperLogo,
      title: CodeButtonTitle.REACT_NATIVE_PAPER,
      type: CodeGenerateType.CODEGEN,
    },
  ]
  return (
    <div className="site-padding mx-auto mt-6 flex min-h-[80lvh] w-full max-w-[120rem] flex-1 flex-col pb-20 sm:pb-24 md:mt-8 lg:mt-10">
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {buttons.map((props, i) => (
          <CardButton key={`card-code-button-${i}`} {...props} />
        ))}
      </div>
      <ColorPickerFab />
    </div>
  )
}

type CardButtonProps = {
  available?: boolean
  icon: React.ElementType | React.FC<React.SVGProps<SVGSVGElement>>
  title: CodeButtonTitle
  type: CodeGenerateType
}

const CardButton = ({ available = true, icon: Icon, title, type }: CardButtonProps) => (
  <Card className="relative flex flex-col items-center justify-center space-y-4 overflow-hidden py-6">
    <div className="relative z-10 flex items-center justify-center rounded-full border border-border/60 p-1.5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/20 bg-white/30 shadow-sm backdrop-blur-sm backdrop-saturate-200 dark:bg-background-accent/30">
        <Icon className="h-8 w-8 object-contain text-primary/80" />
      </div>
    </div>
    <div>
      <h3 className="-mt-1.5 text-sm font-medium text-foreground/75">{title}</h3>
    </div>
    <Icon className="pointer-events-none absolute bottom-0 right-0 z-[2] h-64 w-64 translate-x-1/4 translate-y-1/4 object-contain text-primary/80 opacity-5 dark:opacity-10" />
    <CodeGenerateButton
      {...{
        available,
        title,
        type,
      }}
    />
    {type === CodeGenerateType.PLUGIN && (
      <Badge className="pointer-events-none absolute right-4 top-0 z-10" variant="outline">
        Plugin
      </Badge>
    )}
  </Card>
)
