import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@ui/lib/utils";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { useAppStore } from "../store/store";
import { PluginStatus } from "../../typings/core";

interface CustomVariableCollection extends VariableCollection {
  searchId: string;
}

function CollectionNameComboBox() {
  const { setLoading } = useAppStore();
  const [collections, setCollections] = React.useState<
    CustomVariableCollection[]
  >([]);
  const [activeCollection, setActiveCollection] =
    React.useState<CustomVariableCollection>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: PluginStatus.GET_USER_EXISTING_COLLECTIONS } },
      "*",
    );
  }, []);
  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      switch (type) {
        case PluginStatus.GET_USER_EXISTING_COLLECTIONS:
          setLoading(false);
          setCollections(
            message.map((c) => ({ ...c, searchId: c.id + c.name })),
          );
          console.log(message);
          break;
      }
    };
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : "Select a collection..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[20rem] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>
            <Button value={value} onSelect={() => {}}>
              Create new {value}
            </Button>
          </CommandEmpty>
          <CommandGroup>
            <CommandItem value={value} onSelect={() => {}}>
              Create new {value}
            </CommandItem>
            {collections.map((collection, i) => (
              <CommandItem
                key={collection.searchId + `-${i}`}
                value={collection.searchId}
                onSelect={(selected) => {
                  setValue(
                    selected === collection.id ? undefined : collection.name,
                  );
                  console.log(`selected: ${selected}`);
                  setActiveCollection(collection);
                  setOpen(false);
                }}
              >
                {collection.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    activeCollection && activeCollection?.id === collection.id
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CollectionNameComboBox;
