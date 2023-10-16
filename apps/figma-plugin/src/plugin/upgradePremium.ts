export async function upgradeToPremium() {
  if (figma.payments.status.type === "UNPAID") {
    await figma.payments.initiateCheckoutAsync({
      interstitial: "PAID_FEATURE",
    });
    if (figma.payments.status.type === "UNPAID") {
      figma.notify("Upgrade cancelled.");
      return false;
    } else {
      figma.notify("Upgrade successful!");
      return true;
    }
  }
}
