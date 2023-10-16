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
import { useAppStore } from "../store/store";
import { Step } from "../../typings/core";
import {} from "immer";
import { SwitchGroup } from "../components/Switch";

function SelectPalettesView({ onConfirm }: { onConfirm: () => void }) {
  const { step, confirmedPalettes, updateConfirmedPalette, isPaidFeature } =
    useAppStore();
  if (step !== Step.SELECT_PALETTES) return null;
  return (
    <Card className="animate-in fade-in-0 flex w-full flex-1 flex-col pb-0 duration-300">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-sm">Select Palettes</CardTitle>
        <CardDescription className="text-xs">
          Select the palettes you want to generate
        </CardDescription>
      </CardHeader>
      <CardContent className="grid flex-1 place-items-start justify-items-stretch gap-4 p-4">
        <div className="divide-y divide-border/30 rounded-md border px-4 py-2">
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
            disabled={!isPaidFeature}
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
