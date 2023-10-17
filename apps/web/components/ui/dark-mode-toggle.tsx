"use client";

import { ChevronsUpDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { cn } from "@ui/lib/utils";

export function ModeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "list-item";
}) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={variant === "icon" ? "icon" : "default"}
          className={cn(
            variant === "list-item" && "flex h-12 items-center justify-start",
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] flex-shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] flex-shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          {variant === "list-item" && (
            <>
              <div className="flex-grow">
                <p className="ml-3 w-full flex-shrink-0 text-start text-sm">
                  {theme === undefined || theme === "system"
                    ? "System"
                    : theme === "dark"
                    ? "Dark"
                    : "Light"}
                </p>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-70" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[8.75rem]">
        <DropdownMenuRadioGroup
          value={theme || "system"}
          onValueChange={setTheme}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
