import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CreditCardIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import * as Label from "@radix-ui/react-label";

const inputVariants = cva(
  "w-full rounded-lg border bg-white px-4 py-2.5 pl-10 font-mono text-sm font-medium tracking-widest text-gray-950 transition-all outline-none placeholder:text-gray-400",
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

export interface CardNumber {
  type: "cardNumber";
  name: string;
  label: string;
  required?: boolean;
}

export function CardNumberView({ name, label, required }: CardNumber) {
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
          <div>
            <div className="relative">
              <CreditCardIcon className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-300" />
              <input
                id={id}
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className={inputVariants({ error: !!fieldState.error })}
                {...field}
                onChange={(e) => field.onChange(format(e.target.value))}
              />
            </div>
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

function format(cardNumber: string) {
  return cardNumber
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
