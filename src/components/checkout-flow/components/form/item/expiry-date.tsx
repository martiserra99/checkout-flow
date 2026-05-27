import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { cva } from "class-variance-authority";
import * as Label from "@radix-ui/react-label";

const inputVariants = cva(
  "w-full rounded-lg border bg-white px-4 py-2.5 font-mono text-sm font-medium tracking-widest text-gray-950 transition-all outline-none placeholder:text-gray-400",
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

export interface ExpiryDate {
  type: "expiryDate";
  name: string;
  required?: boolean;
}

export function ExpiryDateView({ name, required }: ExpiryDate) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div>
      <Label.Root
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold tracking-wider text-gray-500 uppercase"
      >
        Expiry date
        {required && <span className="ml-0.5 text-gray-400">*</span>}
      </Label.Root>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <div>
            <input
              id={id}
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              className={inputVariants({ error: !!fieldState.error })}
              {...field}
              onChange={(e) => field.onChange(format(e.target.value))}
            />
            {fieldState.error && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

function format(expiryDate: string) {
  const digits = expiryDate.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}
