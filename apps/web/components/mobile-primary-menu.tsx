import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { cn } from "@ui/lib/utils";
import { ChevronUp, Download, ImagePlus, LucideIcon, Menu } from "lucide-react";

function MobilePrimaryMenu({ disabled }: { disabled: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("lg:hidden")} asChild>
        <Button
          title="Open menu"
          aria-label="Open Menu"
          className={cn(
            "transition-colors duration-300",
            "rounded-s-none border-s border-s-border lg:rounded-s-md",
          )}
          size="sm"
          disabled={disabled}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[9.7rem]">
        <DropdownMenuLabel>Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MenuItem
            title="Upload Image"
            description="Generate a color palette from an image"
            icon={ImagePlus}
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MenuItem
            title="Download"
            description="Download the current palette as a PNG"
            icon={Download}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const MenuItem = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) => (
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0">
      <div className="rounded bg-muted p-1 ring-1 ring-border">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
    <div className="flex flex-col">
      <div className="text-sm font-medium text-foreground">{title}</div>
      <div className="text-xs text-accent-foreground/50">{description}</div>
    </div>
  </div>
);

export default MobilePrimaryMenu;