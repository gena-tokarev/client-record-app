"use client";

import React, { FC, PropsWithChildren, ReactNode, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./badge";

interface ComboboxProps {
  options: {
    id: number | string;
    value: string;
    label: ReactNode;
  }[];
}

export const Combobox: FC<PropsWithChildren<ComboboxProps>> = ({ options }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);

  const handleChange = useCallback(
    (currentValue: ComboboxProps["options"][0]) => {
      if (value.find(({ id }) => currentValue.id === id)) {
        // setValue();
      }
    },
    [value],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <Badge>adfsd</Badge>
          <Badge>adfsd</Badge>
          <Badge>adfsd</Badge>
          <Badge>adfsd</Badge>
          <Badge>adfsd</Badge>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleChange}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
