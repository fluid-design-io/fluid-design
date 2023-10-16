import React, { Fragment } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { Crown, Loader2Icon, Palette } from "lucide-react";
import { Input } from "@ui/components/ui/input";
import { PluginStatus, Step } from "../../typings/core";
import { useAppStore } from "../store/store";
import { cn } from "@ui/lib/utils";
import { Switch, SwitchGroup } from "../components/ui/Switch";
import { PremiumBadgeIcon } from "../components/PremiumBadge";
import PaidVsFree from "../components/PaidVsFree";
import CollectionNameComboBox from "../components/CollectionNameComboBox";

function VariablesView() {
  const {
    isPaidFeature,
    loading,
    setLoading,
    confirmedPalettes,
    generateOptions,
    urlInput,
    step,
    setGenerateOptions,
  } = useAppStore();

  const disabled = () => {
    if (!generateOptions.collectionName) return true;
    if (
      Object.values(confirmedPalettes).every((v) => !v) &&
      !generateOptions.enabled
    )
      return true;
  };

  const postCreatePalette = () =>
    parent.postMessage(
      {
        pluginMessage: {
          type: PluginStatus.CREATE_PALETTES,
          url: urlInput,
          confirmedPalettes,
          options: generateOptions,
          isPaidFeature,
        },
      },
      "*",
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isPaidFeature) {
      postCreatePalette();
    } else {
      parent.postMessage(
        { pluginMessage: { type: PluginStatus.UPGRADE } },
        "*",
      );
    }
  };

  const handleSkip = () => {
    setLoading(true);
    postCreatePalette();
  };

  if (step !== Step.VARIABLES) return null;
  return (
    <Card className="animate-in fade-in-0 relative flex w-full flex-1 flex-col border-border pb-0 duration-300">
      {!isPaidFeature && (
        <PremiumBadgeIcon className="absolute right-2.5 top-2.5" />
      )}
      <form onSubmit={handleSubmit} className="m-0 flex flex-1 flex-col p-0">
        <CardHeader className="p-4 pb-0">
          <CardTitle className="flex items-center justify-between text-sm">
            Palette Variables
            <Switch
              onChange={(c) =>
                setGenerateOptions({ ...generateOptions, enabled: c })
              }
              value={generateOptions.enabled}
              disabled={false}
              id={"enabled"}
            />
          </CardTitle>
          <CardDescription className="text-xs">
            Automatically generate variables for your palettes.
          </CardDescription>
        </CardHeader>
        {!isPaidFeature && <PaidVsFree />}
        {isPaidFeature && (
          <CardContent className="grid flex-1 place-items-start justify-items-stretch p-4">
            <div
              className={cn(
                "flex flex-col items-stretch justify-start space-y-2.5",
                { "opacity-50": !isPaidFeature },
              )}
            >
              <div className="flex flex-col space-y-1">
                <label
                  className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="collectionName"
                >
                  Collection Name
                </label>
                {/* <Input
                  id="collectionName"
                  value={generateOptions.collectionName}
                  onChange={(e) => {
                    setGenerateOptions({
                      ...generateOptions,
                      collectionName: e.target.value,
                    });
                  }}
                  placeholder="Collection Name"
                  disabled={!isPaidFeature || !generateOptions.enabled}
                /> */}
                <CollectionNameComboBox />
              </div>
              <SwitchGroup
                title="Dark Mode"
                onChange={(c) =>
                  setGenerateOptions({ ...generateOptions, darkMode: c })
                }
                value={generateOptions.darkMode}
                description="Generate dark mode variables"
                disabled={!generateOptions.enabled}
              />
              <SwitchGroup
                title="Add Spacing Variables"
                onChange={(c) =>
                  setGenerateOptions({ ...generateOptions, addSpacing: c })
                }
                value={generateOptions.addSpacing}
                description="Generate 16 spacing variables"
                disabled={!generateOptions.enabled}
              />
            </div>
          </CardContent>
        )}
        <CardFooter className="flex-shrink-0 px-4 pb-4">
          <div className="flex w-full flex-col">
            {!isPaidFeature && (
              <Button
                variant="link"
                size="sm"
                className="w-full text-[0.7rem] text-muted-foreground"
                type="button"
                onClick={handleSkip}
              >
                No thanks, I'll create them manually
              </Button>
            )}
            {!isPaidFeature && (
              <Button
                className="w-full"
                size="sm"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <Fragment>
                    Purchase Premium
                    <Crown className="ml-2 h-4 w-4" />
                  </Fragment>
                )}
              </Button>
            )}
            {isPaidFeature && (
              <Button
                className="w-full"
                size="sm"
                type="submit"
                disabled={loading || disabled()}
              >
                {loading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <Fragment>
                    Create Palettes
                    <Palette className="ml-2 h-4 w-4" />
                  </Fragment>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default VariablesView;
