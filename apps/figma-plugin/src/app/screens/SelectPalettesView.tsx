import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { ConfirmedPalettes, useAppStore } from "../store/store";
import { Step } from "../../typings/core";
import {} from "immer";
import { Switch, SwitchGroup } from "../components/ui/Switch";

function SelectPalettesView({ onConfirm }: { onConfirm: () => void }) {
  const { step, confirmedPalettes, updateConfirmedPalette } = useAppStore();
  if (step !== Step.SELECT_PALETTES) return null;
  return (
    <Card className="animate-in fade-in-0 flex w-full flex-1 flex-col border-border pb-0 duration-300">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="flex items-center justify-between text-sm">
          Select Palettes
          <Switch
            onChange={(c) => {
              if (c) {
                Object.keys(confirmedPalettes).forEach(
                  (key: keyof ConfirmedPalettes) => {
                    updateConfirmedPalette(key, true);
                  },
                );
              } else {
                Object.keys(confirmedPalettes).forEach(
                  (key: keyof ConfirmedPalettes) => {
                    updateConfirmedPalette(key, false);
                  },
                );
              }
            }}
            value={Object.values(confirmedPalettes).every((v) => v)}
            disabled={false}
            id={"select-all-palettes"}
          />
        </CardTitle>
        <CardDescription className="text-xs">
          Select the palettes you want to generate
        </CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 place-items-start justify-items-stretch gap-4 p-4">
        <div className="divide-y divide-border/30 rounded-md border border-border px-4 py-2 dark:divide-border/60">
          <SwitchGroup
            className="py-1.5"
            title="Primary"
            onChange={(c) => updateConfirmedPalette("primary", c)}
            value={confirmedPalettes.primary}
          />
          <SwitchGroup
            className="py-1.5"
            title="Secondary"
            onChange={(c) => updateConfirmedPalette("secondary", c)}
            value={confirmedPalettes.secondary}
          />
          <SwitchGroup
            className="py-1.5"
            title="Accent"
            onChange={(c) => updateConfirmedPalette("accent", c)}
            value={confirmedPalettes.accent}
          />
          <SwitchGroup
            className="py-1.5"
            title="Gray"
            onChange={(c) => updateConfirmedPalette("gray", c)}
            value={confirmedPalettes.gray}
          />
          <SwitchGroup
            className="py-1.5"
            title="Brand"
            onChange={(c) => updateConfirmedPalette("brand", c)}
            value={confirmedPalettes.brand}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-shrink-0 px-4 pb-4">
        <Button className="w-full" size="sm" onClick={onConfirm}>
          Next
          <ChevronRight className="ms-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SelectPalettesView;
