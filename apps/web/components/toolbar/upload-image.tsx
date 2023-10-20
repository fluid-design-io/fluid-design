"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import ToolbarMenuItem from "./toolbar-menu-item";

function ToolbarUploadImage() {
  const menuItem = primaryToolbarMenu["Upload Image"];
  return (
    <Dialog>
      {/* //TODO Add function */}
      <DialogTrigger disabled>
        <ToolbarMenuItem {...menuItem} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ToolbarUploadImage;

ToolbarUploadImage.displayName = "ToolbarUploadImage";
