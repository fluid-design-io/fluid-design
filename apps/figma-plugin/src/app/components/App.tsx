import React from "react";
import "../styles/globals.css";
import Main from "./Main";
import { cn } from "@ui/lib/utils";
import PremiumBadge from "./PremiumBadge";

function App() {
  return (
    <div className="relative isolate flex min-h-full w-full flex-col items-stretch justify-center p-4">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className={cn(
            "animate-in zoom-in-75 fade-in-0 relative left-1/2 -z-10 aspect-[1155/678] w-[32rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-40 duration-1000",
            "from-purple-600 to-sky-400",
            "dark:from-purple-600 dark:to-sky-800",
            "transition-colors",
          )}
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <PremiumBadge />
      <Main />
    </div>
  );
}

export default App;
