export async function checkAndRunPremiumFeature(Fn: Function) {
  if (figma.payments.status.type === "UNPAID") {
    await figma.payments.initiateCheckoutAsync({
      interstitial: "PAID_FEATURE",
    });
    if (figma.payments.status.type === "UNPAID") {
      figma.notify("Please upgrade to use this feature.");
      return;
    }
  }
  console.log(`====================================`);
  console.log("Paid feature activated.");
  Fn();
}
