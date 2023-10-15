import React from "react";

function ToastCopied({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-start gap-4">
      <div
        className="h-4 w-4 rounded-full border border-border"
        style={{ backgroundColor: color }}
      />
      <span>Copied {color}</span>
    </div>
  );
}

export default ToastCopied;
