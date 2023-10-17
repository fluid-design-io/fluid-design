import React from "react";
import packageJson from "../../../package.json";

function VersionInfo() {
  return (
    <div className="fixed bottom-2 right-2 text-[0.675rem] font-semibold text-muted-foreground">
      {packageJson.version}
    </div>
  );
}

export default VersionInfo;
