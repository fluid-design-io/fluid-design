import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";
import { Tier } from "../../typings/core";
import { TierCard } from "./TierCard";
import { BASE_URL } from "../../lib/constants";

export const features = [
  {
    name: "Base color palettes",
    tiers: { [Tier.FREE]: true, [Tier.PREMIUM]: true },
  },
  {
    name: "Customize palettes",
    tiers: { [Tier.FREE]: true, [Tier.PREMIUM]: true },
  },
  {
    name: "Brand palettes (18 palettes)",
    tiers: { [Tier.FREE]: false, [Tier.PREMIUM]: true },
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
    description: "Create spacing variables that follows the 8px grid system.",
  },
  {
    name: "Dark mode variables",
    tiers: {
      [Tier.FREE]: false,
      [Tier.PREMIUM]: "Figma Team",
    },
    description:
      "To create more than one variable mode, the document needs to be in a paid external team, or upload it to a team in another organization.",
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
      <div className="mt-2 rounded bg-gray-900 p-2.5 text-xs text-background">
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
