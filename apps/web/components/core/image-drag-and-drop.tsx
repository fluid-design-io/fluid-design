import { cn } from "@ui/lib/utils";
import { ImageIcon } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";

const ImageDragAndDrop = forwardRef(
  (
    {
      className,
      dropAreaStyles,
      onDragLeave,
      onDragOver,
      onDrop,
    }: {
      className?: string;
      dropAreaStyles?: string;
      onDragLeave?: (e: React.DragEvent) => void;
      onDragOver?: (e: React.DragEvent) => void;
      onDrop: (files: FileList) => void;
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
            aria-hidden="true"
            className="drop-icon mx-auto h-12 w-12 text-muted-foreground/75"
          />
          <div className="flex justify-center text-sm leading-6 text-muted-foreground/75">
            <label
              className="relative cursor-pointer rounded-md bg-muted px-2 font-semibold text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-primary"
              htmlFor="file-upload"
            >
              <span className="inline">
                Upload
                <span className="sr-only sm:not-sr-only">an image</span>
              </span>
              <input
                accept="image/*"
                className="sr-only"
                id="file-upload"
                name="file-upload"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length) {
                    onDrop(e.target.files);
                  }
                }}
                ref={ref}
                type="file"
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

ImageDragAndDrop.displayName = "ImageDragAndDrop";

export default ImageDragAndDrop;
