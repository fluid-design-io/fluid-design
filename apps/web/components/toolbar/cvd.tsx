import primaryToolbarMenu from "../ui/primary-toolbar-menu";
import { useColorStore } from "@/store/store";
import ToolbarMenuItem from "./toolbar-menu-item";
import { cn } from "@ui/lib/utils";
import { handleToggleReadability } from "@/app/actions";

function CVD() {
  const menuItem = primaryToolbarMenu["Color Vision Deficiency"];
  const { showReadability } = useColorStore();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleToggleReadability(`${!showReadability}`);
        useColorStore.setState({ showReadability: !showReadability });
      }}
    >
      <button
        type="submit"
        aria-label="Toggle Readability"
        className={cn(
          showReadability &&
            "-mx-1.5 rounded-sm bg-primary/20 px-1.5 lg:mx-0 lg:px-0",
        )}
      >
        <ToolbarMenuItem {...menuItem} />
      </button>
    </form>
  );
}

export default CVD;

CVD.displayName = "CVD";
