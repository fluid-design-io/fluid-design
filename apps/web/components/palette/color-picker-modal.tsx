import { BaseColorTypes, BaseColors, ColorMode, RawColor } from "@/types/app";
import { HexColorPicker } from "react-colorful";
import tinycolor from "tinycolor2";
import { color, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { colorHelper } from "@/lib/colorHelper";
import { createPortal } from "react-dom";
import { cn } from "@ui/lib/utils";

function ColorPickerModal({
  onClose,
  colorString,
  onChange,
  type,
}: {
  onClose: () => void;
  colorString: string;
  onChange: (newBaseColor: keyof BaseColors, newColor: RawColor) => void;
  type: BaseColorTypes;
}) {
  const [_color, setColor] = useState(colorString); // internal state
  const submitRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const validColor = tinycolor(_color).isValid()
    ? tinycolor(_color).toHexString()
    : colorString;
  const handleInputChange = (e) => {
    const { value } = e.target;
    const color = tinycolor(value);
    if (color.isValid()) {
      setColor(color.getOriginalInput() as string);
    } else {
      setColor(value);
    }
  };
  // listen for escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleColorChange = () => {
    const { h, s, l, a } = tinycolor(_color).toHsl();
    const RawColor = {
      h: Math.round(h * 100) / 100,
      s: Math.round(s * 100) / 100,
      l: Math.round(l * 100) / 100,
      a: Math.round(a * 100) / 100,
    };
    onChange(type, RawColor);
    onClose();
  };

  const inputStyle = {
    primary:
      "selection:bg-primary selection:text-primary-foreground focus:ring-primary",
    secondary:
      "selection:bg-secondary selection:text-secondary-foreground focus:ring-secondary",
    accent:
      "selection:bg-accent selection:text-accent-foreground focus:ring-accent",
  };

  useEffect(() => {
    // listen for escape key
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 250);
  }, []);
  return createPortal(
    <motion.div
      key={`color-picker-modal-${type}`}
      style={{
        backgroundColor: validColor,
      }}
      className="fixed inset-0 z-50 flex max-h-[100dvh] w-full items-center justify-center pb-[calc(env(safe-area-inset-bottom)+10vh)] sm:pb-[env(safe-area-inset-bottom)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div onClick={onClose} className="fixed inset-0 h-full w-full" />
      <motion.div
        layout
        layoutId={`color-picker-${type}`}
        className={cn(
          "relative flex flex-col gap-4 rounded-xl border border-border bg-white/75 text-start transition-colors duration-1000 ease-in-out dark:bg-black/75",
        )}
      >
        <motion.h4
          layoutId={`color-picker-title-${type}`}
          className="z-[2] px-4 pt-4 capitalize text-gray-800 dark:text-gray-100"
        >
          {type} Color
        </motion.h4>
        <motion.div
          className="px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25 } }}
          exit={{ opacity: 0 }}
        >
          <HexColorPicker
            color={validColor}
            onChange={(c) => setColor(c)}
            className="!w-full min-w-[12rem]"
          />
        </motion.div>
        <motion.div className="px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInputChange({ target: { value: e.target[0].value } });
            }}
            className=""
          >
            <motion.input
              layoutId={`color-picker-value-${type}`}
              ref={inputRef}
              type="text"
              name="color"
              id="color"
              className={cn(
                "block w-full rounded-lg border border-border bg-transparent px-2.5 py-1.5 text-sm outline-none focus:ring focus:ring-opacity-50",
                inputStyle[type],
              )}
              placeholder="Enter a color"
              value={_color}
              onFocus={(e) => e.target.select()}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitRef.current?.click();
                }
              }}
            />
          </form>
        </motion.div>
        <div className="flex">
          <button
            className="hocus:bg-border block w-full rounded-bl-xl border-r border-t border-r-border border-t-border px-4 py-2 text-foreground transition dark:text-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            ref={submitRef}
            className="hocus:bg-border block w-full rounded-br-xl border-t border-t-border px-4 py-2 text-foreground transition dark:text-gray-100"
            onClick={handleColorChange}
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default ColorPickerModal;
