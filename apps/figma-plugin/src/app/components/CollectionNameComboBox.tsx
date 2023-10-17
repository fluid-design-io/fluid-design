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
import { CustomVariableCollection, PluginStatus } from "../../typings/core";
import { Plus } from "lucide-react";
import { Badge } from "@ui/components/ui/badge";

function CollectionNameComboBox() {
  const { setLoading, generateOptions, updateGenerateOptions, collections } =
    useAppStore();
  const [activeCollection, setActiveCollection] =
    React.useState<CustomVariableCollection>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [input, setInput] = React.useState<string>("");

  const handleCreateNewCollection = () => {
    updateGenerateOptions("collectionId", undefined);
    updateGenerateOptions("collectionName", input);
    setActiveCollection(undefined);
    setValue(input);
    setOpen(false);
  };

  React.useEffect(() => {
    setLoading(true);
    parent.postMessage(
      { pluginMessage: { type: PluginStatus.GET_USER_EXISTING_COLLECTIONS } },
      "*",
    );
    !value && setValue(generateOptions.collectionName);
  }, []);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="relative w-full justify-between"
          disabled={!generateOptions?.enabled}
        >
          {value ? value : "Select a collection..."}
          <div className="flex items-center space-x-3">
            {!generateOptions?.collectionId && (
              <Badge className="pointer-events-none h-6 text-[0.675rem]">
                NEW
              </Badge>
            )}
            {activeCollection?.count && (
              <Badge
                className="pointer-events-none h-6 text-[0.675rem] text-foreground/75"
                variant="outline"
              >
                {activeCollection.count}{" "}
                {activeCollection.count > 1 ? "variables" : "variable"}
              </Badge>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[19.5rem] p-0">
        <Command>
          <CommandInput
            id="collection"
            placeholder="Search or type to create new one..."
            className="h-9"
            value={input}
            onValueChange={(e) => setInput(e)}
          />
          <CommandEmpty>No collection found.</CommandEmpty>
          <CommandGroup>
            {input.length > 0 && (
              <CommandItem
                value={input}
                onSelect={handleCreateNewCollection}
                className="flex items-center justify-between space-x-1.5"
              >
                <div>
                  <span className="font-semibold">{input}</span>
                </div>
                <div className="flex items-center justify-center space-x-1.5 text-foreground/80">
                  <span>New</span>
                  <Plus className="h-4 w-4" />
                </div>
              </CommandItem>
            )}
            {collections.map((collection, i) => (
              <CommandItem
                key={collection.searchId + `-${i}`}
                value={collection.searchId}
                onSelect={(selected) => {
                  const isSame =
                    selected === activeCollection?.searchId.toLowerCase();
                  console.log(
                    "selected",
                    selected,
                    activeCollection?.searchId.toLowerCase(),
                    "isSame",
                    isSame,
                  );
                  setValue(
                    isSame ? generateOptions?.collectionName : collection.name,
                  );
                  setActiveCollection(isSame ? undefined : collection);
                  updateGenerateOptions(
                    "collectionId",
                    isSame ? undefined : collection.id,
                  );
                  setOpen(false);
                }}
                className="flex items-center justify-between"
              >
                <div>{collection.name}</div>
                <div className="flex items-center justify-center space-x-1.5 text-foreground/80">
                  <span>
                    {collection.count}
                    {collection.count > 1 ? " variables" : " variable"}
                  </span>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      activeCollection && activeCollection?.id === collection.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CollectionNameComboBox;
