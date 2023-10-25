import { cn } from "@ui/lib/utils";
import { ImageIcon } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

const ImageDragAndDrop = forwardRef(
  (
    {
      onDrop,
      onDragOver,
      onDragLeave,
      className,
      dropAreaStyles,
    }: {
      onDrop: (files: FileList) => void;
      className?: string;
      dropAreaStyles?: string;
      onDragOver?: (e: React.DragEvent) => void;
      onDragLeave?: (e: React.DragEvent) => void;
    },
    ref?: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const drop = useRef(null);
    const [isDropping, setIsDropping] = useState(false);

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDropping(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDropping(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDropping(false);
      const { files } = e.dataTransfer;

      if (files && files.length) {
        onDrop(files);
      }
    };
    useEffect(() => {
      drop?.current?.addEventListener("dragover", handleDragOver);
      drop?.current?.addEventListener("drop", handleDrop);
      drop?.current?.addEventListener("dragleave", handleDragLeave);

      return () => {
        drop?.current?.removeEventListener("dragover", handleDragOver);
        drop?.current?.removeEventListener("drop", handleDrop);
        drop?.current?.removeEventListener("dragleave", handleDragLeave);
      };
    }, []);

    return (
      <div
        className={cn(
          "flex w-full items-center justify-center rounded-lg border border-dashed border-border/75 px-6 py-10",
          isDropping && "border-primary bg-primary/40",
          className,
        )}
        ref={drop}
      >
        <div className={cn("rounded px-6 py-4 text-center", dropAreaStyles)}>
          <ImageIcon
            className="drop-icon mx-auto h-12 w-12 text-muted-foreground/75"
            aria-hidden="true"
          />
          <div className="flex justify-center text-sm leading-6 text-muted-foreground/75">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-muted px-2 font-semibold text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-primary"
            >
              <span className="inline">
                Upload
                <span className="sr-only sm:not-sr-only">an image</span>
              </span>
              <input
                ref={ref}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length) {
                    onDrop(e.target.files);
                  }
                }}
              />
            </label>
            <p className="sr-only sm:not-sr-only sm:pl-1">or drag and drop</p>
          </div>
          <p
            className={cn("text-xs leading-5 text-muted-foreground/75", {
              "opacity-0": isDropping,
            })}
          >
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    );
  },
);

export default ImageDragAndDrop;
