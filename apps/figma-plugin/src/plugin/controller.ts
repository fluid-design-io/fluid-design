import { PluginStatus } from "../typings/core";
import { createPalettes } from "./create-palettes";
import { fetchPalettes } from "./fetch-palettes";
import { upgradeToPremium } from "./upgradePremium";

figma.showUI(__html__, { themeColors: true, width: 376, height: 480 });

figma.payments.setPaymentStatusInDevelopment({ type: "UNPAID" });

figma.ui.onmessage = async (msg) => {
  const type = msg.type as PluginStatus;
  if (type) {
    if (type === PluginStatus.FIND_PALETTES) {
      await fetchPalettes(msg.url);
    } else if (type === PluginStatus.CREATE_PALETTES) {
      await createPalettes({
        url: msg.url,
        options: msg.options,
        isPaidFeature: msg.isPaidFeature,
        confirmedPalettes: msg.confirmedPalettes,
      });
    } else if (type === PluginStatus.PAID_FEATURE) {
      const isPaid = figma.payments.status.type === "PAID";
      figma.ui.postMessage({
        type: PluginStatus.PAID_FEATURE,
        message: isPaid,
      });
    } else if (type === PluginStatus.UPGRADE) {
      const isPaid = await upgradeToPremium();
      figma.ui.postMessage({
        type: PluginStatus.UPGRADE,
        message: isPaid,
      });
    } else if (type === PluginStatus.CLOSE) {
      figma.closePlugin();
    }
  }
};
