import React from "react";
import { Button } from "@ui/components/ui/button";
import { PartyPopper } from "lucide-react";
import { useAppStore } from "../store/store";
import { Step } from "../../typings/core";

function CompletedView({ handleClose }: { handleClose: () => void }) {
  const { loading, step } = useAppStore();
  if (step !== Step.COMPLETED) return null;
  return (
    <div className="flex flex-1 flex-col items-center justify-evenly space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <PartyPopper className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-semibold">Palettes Created!</h1>
        <p className="text-center text-sm">
          The palettes have been created in the document. You can now use them
          in your designs.
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClose}
        className="flex-shrink-0 text-xs text-muted-foreground"
        disabled={loading}
      >
        Close Plugin
      </Button>
    </div>
  );
}

export default CompletedView;
