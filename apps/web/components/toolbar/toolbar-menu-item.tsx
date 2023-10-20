import { ToolbarMenu } from "../ui/primary-toolbar-menu";
import DesktopPreviewToolbarIcon from "../ui/desktop-primary-toolbar-button";

const ToolbarMenuItem = ({ title, description, icon: Icon }: ToolbarMenu) => (
  <div>
    <DesktopPreviewToolbarIcon {...{ title, description, icon: Icon }} />
    <div className="flex items-center gap-4 lg:hidden">
      <div className="flex-shrink-0">
        <div className="rounded bg-muted p-1 ring-1 ring-border">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-accent-foreground/50">{description}</div>
      </div>
    </div>
  </div>
);

export default ToolbarMenuItem;
