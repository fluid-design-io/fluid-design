import React from "react";
import { useAppStore } from "../store/store";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import Header from "../components/Header";
import { Loader2, ChevronRight } from "lucide-react";
import { PluginStatus, Step } from "../../typings/core";
import { BASE_URL } from "../../lib/constants";
import VersionInfo from "../components/VersionInfo";

function HomeView({ handleClose }: { handleClose: () => void }) {
  const { urlInput, loading, setUrlInput, step } = useAppStore();
  const [errorText, setErrorText] = React.useState("");

  const handleSubmit = () => {
    // dev is http://localhost:3000, prod is https://fluid-color.vercel.app
    // show error if url does not start with BASE_URL
    if (!urlInput.startsWith(BASE_URL)) {
      setErrorText("Please enter a valid palette url");
      return;
    }

    const toekn = urlInput.split("?")[1];
    if (!toekn) {
      setErrorText("Please enter a valid palette url");
      return;
    }

    parent.postMessage(
      { pluginMessage: { type: PluginStatus.FIND_PALETTES, url: urlInput } },
      "*",
    );
  };
  if (step !== Step.URL) return null;
  return (
    <div className="flex flex-1 flex-col justify-between">
      <div />
      <div className="space-y-6">
        <Header />
        <form
          className="relative mb-12 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Input
            placeholder="Paste the url here"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="pr-12"
          />
          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={!urlInput || urlInput.length < "https://".length}
            className="absolute inset-y-1 right-1 h-8"
            variant="secondary"
            type="submit"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          <div className="text-[0.8rem] text-muted-foreground">{errorText}</div>
        </form>
      </div>
      <Button
        variant="link"
        size="sm"
        onClick={handleClose}
        className="z-10 flex-shrink-0 text-xs text-muted-foreground"
        disabled={loading}
      >
        Close Plugin
      </Button>

      <VersionInfo />
    </div>
  );
}

export default HomeView;
