'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

type ComboboxOption = {
  value: string;
  label: string;
};

interface ComboboxProps {
  value: string; // Controlled value
  onChange: (value: string) => void; // Callback to handle selection change
  options: ComboboxOption[]; // List of options to select from
  placeholder?: string; // Optional placeholder for empty state
  className?: string; // Optional custom styling class
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  className = ''
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState('');

  // Update the selected value and call the onChange callback
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue); // Notify parent of the selected value
    setOpen(false);
  };

  // Handle custom "Other" value selection
  const handleCustomSelect = () => {
    if (customValue) {
      onChange(customValue);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search options...' />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* "Other" option */}
            <CommandItem
              key='other'
              value='other'
              onSelect={() => setOpen(false)} // Close the popover on "Other"
            >
              <Check className='mr-2 h-4 w-4 opacity-0' />
              Other...
            </CommandItem>
          </CommandList>

          {/* Input for custom value if "Other" is selected */}
          {open && value === 'other' && (
            <div className='p-2'>
              <input
                type='text'
                placeholder='Enter custom option'
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className='w-full rounded-md border p-2'
              />
              <Button
                variant='outline'
                onClick={handleCustomSelect}
                className='mt-2 w-full'
              >
                Set Custom Value
              </Button>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
