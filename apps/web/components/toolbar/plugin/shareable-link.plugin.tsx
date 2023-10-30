"use client";

import { Input } from "ui/components/ui/input";
import { Button } from "ui/components/ui/button";
import { Copy, Figma } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@ui/components/ui/skeleton";
import { cn } from "ui/lib/utils";
import Image from "next/image";
import { useToast } from "ui/components/ui/use-toast";
import { Switch } from "@ui/components/ui/switch";
import { Label } from "@ui/components/ui/label";
import { useColorStore } from "@/store/store";

function ShareableLinkPlugin({ colors, setOpen }) {
  const { toast } = useToast();
  const { baseColors } = useColorStore();
  const [loadingSocialPreview, setLoadingSocialPreview] = useState(true);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [figmaPlugin, setFigmaPlugin] = useState(false);
  const staticURL = `${process.env.NEXT_PUBLIC_URL}/?colors=${colors}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(
      figmaPlugin ? staticURL + `&token=${token}` : staticURL,
    );
    setOpen(false);
    toast({
      title: "Copied to clipboard!",
    });
  };
  const handleGenerateToken = async () => {
    setLoading(true);
    const { data, error } = await fetch("/api/v1/figma-plugin", {
      body: JSON.stringify({
        baseColors,
      }),
      method: "POST",
    }).then((res) => res.json());
    if (error) {
      toast({
        title: "Error generating token",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    setToken(data.token);
    setLoading(false);
  };
  useEffect(() => {
    if (!figmaPlugin || !!token) return;
    handleGenerateToken();
  }, [figmaPlugin]);
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative">
        <div
          className={cn(
            "mb-4 overflow-hidden rounded-md",
            "aspect-[120/63] w-[16rem] rounded-md sm:w-[22rem]",
          )}
        >
          <Skeleton
            className={cn("h-full w-full", {
              "opacity-0": !loadingSocialPreview,
            })}
          />
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}/api/og?colors=${colors}`}
            className={cn(
              "absolute inset-0 h-full w-full rounded border object-cover",
            )}
            alt="Social preview"
            onLoad={() => setLoadingSocialPreview(false)}
            width={288}
            height={151}
          />
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <Label
          htmlFor="preserve-size"
          className="flex items-center justify-start text-foreground/80"
        >
          <Figma className="h3.5 me-1.5 w-3.5" /> Figma Plugin
        </Label>
        <Switch
          id="preserve-size"
          onCheckedChange={setFigmaPlugin}
          checked={figmaPlugin}
          aria-label="Figma Plugin"
        />
      </div>
      <div className="flex space-x-2">
        <Input
          className="h-8"
          value={figmaPlugin ? staticURL + `&token=${token}` : staticURL}
          readOnly
          disabled={loading}
        />
        <Button
          className="h-8"
          size="icon"
          onClick={handleCopy}
          disabled={loading}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ShareableLinkPlugin;
