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
import primaryToolbarMenu from "./primary-toolbar-menu";
import { Toolbar } from "../toolbar";

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
          <ChevronUp className="h-4 w-4 sm:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Toolbar>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Toolbar.UploadImage />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Toolbar.DownloadBasePalette />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Toolbar.ShareableLink />
          </DropdownMenuItem>
        </Toolbar>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobilePrimaryMenu;
