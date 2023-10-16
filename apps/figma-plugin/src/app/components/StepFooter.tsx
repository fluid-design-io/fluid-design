import { cn } from "@ui/lib/utils";
import { CheckIcon } from "lucide-react";
import React from "react";
import { useAppStore } from "../store/store";
import { steps } from "../../typings/core";

export default function StepFooter() {
  const { loading, setStep, step } = useAppStore();
  const currentStep = steps.find((s) => s.step === step);
  return (
    <nav aria-label="Progress" className="flex-shrink-0">
      <ol role="list" className="mb-2 flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.step}
            className={cn(
              stepIdx !== steps.length - 1 ? "pr-8" : "",
              "relative",
            )}
          >
            {currentStep.order > stepIdx ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-8 translate-x-6 bg-primary" />
                </div>
                <button
                  className="group relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-transparent bg-primary hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/80"
                  onClick={() => setStep(step.step)}
                  disabled={loading}
                >
                  <CheckIcon
                    className="h-3.5 w-3.5 text-background"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-[-1.125rem] left-1/2 -translate-x-1/2 text-center text-[0.675rem] text-muted-foreground/50 group-hover:text-muted-foreground">
                    {step.step}
                  </span>
                </button>
              </>
            ) : currentStep.order === stepIdx ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-muted" />
                </div>
                <div
                  className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-[-1.125rem] left-1/2 -translate-x-1/2 text-center text-[0.675rem] text-muted-foreground">
                    {step.step}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-muted" />
                </div>
                <div className="group relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-border bg-background">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-[-1.125rem] left-1/2 -translate-x-1/2 text-center text-[0.675rem] text-muted-foreground/50">
                    {step.step}
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
