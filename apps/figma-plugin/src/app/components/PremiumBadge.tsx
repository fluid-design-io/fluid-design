import React from "react";
import { useAppStore } from "../store/store";
import { cn } from "@ui/lib/utils";
import { Crown } from "lucide-react";

function PremiumBadge() {
  const { isPaidFeature } = useAppStore();
  if (!isPaidFeature) return null;
  return (
    <div className="group/preimum-badge">
      <PremiumBadgeIcon className="fixed right-4 top-4 z-10" />
      <div
        className={cn(
          "absolute left-4 right-4 top-11 z-10",
          "shaodw rounded-md border border-border bg-background p-2 opacity-0 transition-opacity group-hover/preimum-badge:opacity-100",
        )}
      >
        <p className="text-center text-xs">
          You can generate dynamic variables for your palettes
        </p>
      </div>
    </div>
  );
}

export const PremiumBadgeIcon = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex items-center justify-center bg-white/80",
      "select-none rounded-md border border-border px-2.5 py-0.5 text-[0.675rem] font-bold uppercase tracking-wide shadow-sm",
      className,
    )}
  >
    <div
      className={cn(
        "bg-gradient-to-r from-gray-500 to-gray-950 bg-clip-text text-transparent dark:from-gray-400 dark:to-gray-200",
      )}
    >
      Premium
    </div>
    <Crown className="ml-1.5 inline-block h-3 w-3 text-gray-950 dark:text-gray-100" />
  </div>
);

export default PremiumBadge;
