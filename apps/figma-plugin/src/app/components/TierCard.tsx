import React from "react";
import { cn } from "@ui/lib/utils";
import { Check, InfoIcon, XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/ToolTip";
import { features } from "./PaidVsFree";

export const TierCard = ({ tier }: { tier: any }) => {
  return (
    <div
      className={cn("ring-1 ring-border", "relative rounded-sm bg-background")}
    >
      <dl className="divide-y divide-border text-sm leading-6">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex items-center justify-between px-4 py-2 sm:grid sm:grid-cols-2"
          >
            <dt className="pr-2.5 text-xs text-foreground/90">
              {feature.name}
            </dt>
            <dd className="flex items-center justify-end">
              {feature.description && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger type="button" className="flex justify-end">
                      <InfoIcon className="mr-1.5 h-4 w-4 text-muted-foreground/70" />
                      <div className="sr-only">
                        {feature.tiers[tier.name]} description
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="mx-4 max-w-[20rem] border border-foreground/60 bg-foreground text-muted shadow">
                      {feature.descriptionImage && (
                        <img
                          src={feature.descriptionImage}
                          alt={feature.name}
                          className="w-full overflow-hidden rounded py-1"
                        />
                      )}
                      <p className="text-xs font-normal">
                        {feature.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {typeof feature.tiers[tier.name] === "string" ? (
                <span
                  className={cn(
                    "flex h-5 items-center justify-center text-xs",
                    tier.featured ? "font-semibold text-primary" : "",
                  )}
                >
                  {feature.tiers[tier.name]}
                </span>
              ) : (
                <>
                  {feature.tiers[tier.name] === true ? (
                    <Check
                      className="mx-auto h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  ) : (
                    <XIcon
                      className="mx-auto h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">
                    {feature.tiers[tier.name] === true ? "Yes" : "No"}
                  </span>
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
