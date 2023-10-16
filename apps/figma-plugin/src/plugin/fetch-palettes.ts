import { PluginStatus } from "../typings/core";

export const fetchPalettes = async (url: string) => {
  figma.ui.postMessage({ type: PluginStatus.LOADING });
  // add a 0.2 second delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 200));
  const response = await fetch(url, {
    method: "GET",
  });
  const { data, error } = await response.json();
  if (error) {
    figma.ui.postMessage({
      type: PluginStatus.ERROR,
      message: data.error.message,
    });
    return;
  }
  // Parse and Generate Palette
  if (data && data.primary) {
    // createPalettes(data.colorPalettes);
    figma.ui.postMessage({
      type: PluginStatus.FOUND_PALETTES,
      message: data,
    });
  }
};
