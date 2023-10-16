import React from "react";
import SelectPalettesView from "../screens/SelectPalettesView";
import { PluginStatus, Step } from "../../typings/core";
import BaseColorPalette from "./BaseColorPalette";
import StepFooter from "./StepFooter";
import VariablesView from "../screens/VariablesView";
import { useAppStore } from "../store/store";
import HomeView from "../screens/HomeView";
import CompletedView from "../screens/CompletedView";

function Main() {
  const { setLoading, setIsPaidFeature, setBaseColors, step, setStep } =
    useAppStore();

  const handleClose = () => {
    parent.postMessage({ pluginMessage: { type: PluginStatus.CLOSE } }, "*");
  };

  React.useEffect(() => {
    parent.postMessage(
      { pluginMessage: { type: PluginStatus.PAID_FEATURE } },
      "*",
    );
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      switch (type) {
        case PluginStatus.LOADING:
          setLoading(true);
          break;
        case PluginStatus.COMPLETED:
          setLoading(false);
          setStep(Step.COMPLETED);
          break;
        case PluginStatus.ERROR:
          console.log("error", message);
          setLoading(false);
          break;
        case PluginStatus.FOUND_PALETTES:
          setLoading(false);
          setBaseColors(message);
          setStep(Step.SELECT_PALETTES);
          break;
        case PluginStatus.PAID_FEATURE:
          setIsPaidFeature(message);
          break;
        case PluginStatus.UPGRADE:
          setIsPaidFeature(message);
          setLoading(false);
          break;
        default:
          console.log("Unknown type:", type);
          break;
      }
    };
  }, []);
  return (
    <div className="animate-in fade-in-0 flex w-full flex-1 flex-col">
      <HomeView handleClose={handleClose} />
      {(step === Step.SELECT_PALETTES || step === Step.VARIABLES) && (
        <div className="flex flex-1 flex-col items-center justify-evenly space-y-6">
          <BaseColorPalette />
          <SelectPalettesView onConfirm={() => setStep(Step.VARIABLES)} />
          <VariablesView />
          <StepFooter />
        </div>
      )}
      <CompletedView handleClose={handleClose} />
    </div>
  );
}

export default Main;
