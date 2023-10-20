"use client";

import { Input } from "ui/components/ui/input";
import { Button } from "ui/components/ui/button";
import { Copy } from "lucide-react";
import React, { Fragment, useState } from "react";
import { Skeleton } from "@ui/components/ui/skeleton";
import { cn } from "ui/lib/utils";
import Image from "next/image";
import { useToast } from "ui/components/ui/use-toast";

function ShareableLinkPlugin({ colors, setOpen }) {
  const { toast } = useToast();
  const [loadingSocialPreview, setLoadingSocialPreview] = useState(true);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/?colors=${colors}`,
    );
    setOpen(false);
    toast({
      title: "Copied to clipboard!",
    });
  };
  return (
    <Fragment>
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
              "absolute inset-0 h-full w-full rounded border object-cover transition-opacity",
              loadingSocialPreview ? "opacity-0" : "opacity-100",
            )}
            alt="Social preview"
            onLoad={() => setLoadingSocialPreview(false)}
            width={288}
            height={151}
          />
        </div>
      </div>
      <div className="flex space-x-2">
        <Input
          className="h-8"
          value={`${process.env.NEXT_PUBLIC_URL}/?colors=${colors}`}
          readOnly
        />
        <Button className="h-8" size="icon" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </Fragment>
  );
}

export default ShareableLinkPlugin;
