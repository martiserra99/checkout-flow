import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import * as Label from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";

const triggerVariants = cva(
  "flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-950 transition-all outline-none data-placeholder:text-gray-400",
  {
    variants: {
      error: {
        true: "border-red-300 focus-visible:border-red-400 focus-visible:ring-2 focus-visible:ring-red-400/15",
        false:
          "border-gray-200 focus-visible:border-gray-400 focus-visible:ring-2 focus-visible:ring-gray-400/15",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface Select {
  type: "select";
  name: string;
  label: string;
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
  required?: boolean;
}

export function SelectView({
  name,
  label,
  placeholder,
  options,
  required,
}: Select) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div>
      <Label.Root
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold tracking-wider text-gray-500 uppercase"
      >
        {label}
        {required && <span className="ml-0.5 text-gray-400">*</span>}
      </Label.Root>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <SelectPrimitive.Root
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectPrimitive.Trigger
                id={id}
                className={triggerVariants({ error: !!fieldState.error })}
              >
                <span className="min-w-0 flex-1 truncate text-left">
                  <SelectPrimitive.Value placeholder={placeholder} />
                </span>
                <SelectPrimitive.Icon>
                  <ChevronDownIcon className="size-4 shrink-0 text-gray-400" />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                  position="popper"
                  sideOffset={4}
                  className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
                >
                  <SelectPrimitive.ScrollUpButton className="flex items-center justify-center py-1 text-gray-400">
                    <ChevronUpIcon className="size-4" />
                  </SelectPrimitive.ScrollUpButton>
                  <SelectPrimitive.Viewport className="p-1">
                    {options.map((o) => (
                      <SelectPrimitive.Item
                        key={o.value}
                        value={o.value}
                        className="relative flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 outline-none select-none data-highlighted:bg-gray-50 data-highlighted:text-gray-950"
                      >
                        <SelectPrimitive.ItemText>
                          {o.label}
                        </SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator className="ml-auto">
                          <CheckIcon className="size-3.5 text-emerald-500" />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                  <SelectPrimitive.ScrollDownButton className="flex items-center justify-center py-1 text-gray-400">
                    <ChevronDownIcon className="size-4" />
                  </SelectPrimitive.ScrollDownButton>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
            {fieldState.error && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
