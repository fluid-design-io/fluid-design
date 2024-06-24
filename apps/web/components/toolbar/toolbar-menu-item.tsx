import DesktopPreviewToolbarIcon from '../ui/desktop-primary-toolbar-button'
import { ToolbarMenu } from '../ui/primary-toolbar-menu'

const ToolbarMenuItem = ({ description, icon: Icon, title }: ToolbarMenu) => (
  <div>
    <DesktopPreviewToolbarIcon {...{ description, icon: Icon, title }} />
    <div className="flex items-center gap-4 lg:hidden">
      <div className="flex-shrink-0">
        <div className="rounded bg-muted p-1 ring-1 ring-border">
          <Icon className="size-5" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-accent-foreground/50">{description}</div>
      </div>
    </div>
  </div>
)

export default ToolbarMenuItem
