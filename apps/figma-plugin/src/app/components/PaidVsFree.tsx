import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import { Tier } from "../../typings/core";
import { TierCard } from "./TierCard";
import { BASE_URL } from "../../lib/constants";

export const features = [
  {
    name: "Customize palettes",
    tiers: { [Tier.FREE]: true, [Tier.PREMIUM]: true },
  },
  {
    name: "Base color palettes",
    tiers: { [Tier.FREE]: true, [Tier.PREMIUM]: true },
    description: "Create base palettes from your base colors.",
    descriptionImage: `${BASE_URL}/assets/figma-plugin/images/base-palettes.png`,
  },
  {
    name: "Brand palettes (18 palettes)",
    tiers: { [Tier.FREE]: true, [Tier.PREMIUM]: true },
    description: "Create brand palettes from your base colors.",
    descriptionImage: `${BASE_URL}/assets/figma-plugin/images/brand-palettes.png`,
  },
  {
    name: "Color variables (62 variables)",
    tiers: {
      [Tier.FREE]: false,
      [Tier.PREMIUM]: true,
    },
    description:
      "Create color variables and brand alias colors from your base colors.",
    descriptionImage: `${BASE_URL}/assets/figma-plugin/images/dynamic-variables.gif`,
  },
  {
    name: "Spacing variables (35 variables)",
    tiers: {
      [Tier.FREE]: false,
      [Tier.PREMIUM]: true,
    },
    description:
      "Create proportional spacing variables that follows Tailwind CSS convention.",
    descriptionImage: `${BASE_URL}/assets/figma-plugin/images/dynamic-spacing-variables.gif`,
  },
  {
    name: "Variable-based palettes",
    tiers: {
      [Tier.FREE]: false,
      [Tier.PREMIUM]: true,
    },
    description:
      "The entire color palette uses variables instead of hard-coded colors/numbers.\n - palettes\n - texts\n - borders\n - cornerRadius\n - spacings\n",
    descriptionImage: `${BASE_URL}/assets/figma-plugin/images/variable-based-palettes.gif`,
  },
  {
    name: "Dark mode variables",
    tiers: {
      [Tier.FREE]: false,
      [Tier.PREMIUM]: "Figma Team",
    },
    description:
      "Mode is limited by the current file's pricing tier(Figma). To create more than one variable mode, the document needs to be in a paid external team, or upload it to a team in another organization.",
  },
];

function PaidVsFree() {
  const freeTier = {
    name: "FREE",
    id: "tier-free",
    featured: false,
  };
  const premiumTier = {
    name: "PREMIUM",
    id: "tier-premium",
    featured: true,
  };
  return (
    <div className="px-4 pb-4">
      <div className="mt-2 rounded bg-gray-800 p-2.5 text-xs text-background dark:bg-gray-200">
        One-Time Payment, Zero Subscriptions! For the price of your daily coffee
        ☕.
      </div>
      <Tabs defaultValue={Tier.PREMIUM} className="w-full">
        <TabsList className="mb-2 mt-4 grid grid-cols-2 content-center">
          <TabsTrigger value={Tier.FREE}>Free</TabsTrigger>
          <TabsTrigger value={Tier.PREMIUM}>Premium</TabsTrigger>
        </TabsList>
        <TabsContent value={Tier.FREE}>
          <TierCard tier={freeTier} />
        </TabsContent>
        <TabsContent value={Tier.PREMIUM}>
          <TierCard tier={premiumTier} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PaidVsFree;
