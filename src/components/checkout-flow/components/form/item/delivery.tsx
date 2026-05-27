import { useFormContext, Controller } from "react-hook-form";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";

const itemVariants = cva(
  "group flex w-full items-center gap-4 rounded-xl border bg-white px-5 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=checked]:border-gray-950 data-[state=checked]:bg-gray-950",
  {
    variants: {
      error: {
        true: "border-red-300 hover:border-red-400 hover:bg-red-50 focus-visible:ring-red-300",
        false:
          "border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-950",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const iconContainerVariants = cva(
  "flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors group-data-[state=checked]:bg-white/10",
  {
    variants: {
      error: {
        true: "bg-red-100",
        false: "bg-gray-100",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const iconVariants = cva(
  "transition-colors group-data-[state=checked]:text-white",
  {
    variants: {
      error: {
        true: "text-red-500",
        false: "text-gray-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const labelVariants = cva(
  "text-sm font-semibold group-data-[state=checked]:text-white",
  {
    variants: {
      error: {
        true: "text-red-700",
        false: "text-gray-900",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const hintVariants = cva("mt-0.5 text-xs font-medium", {
  variants: {
    error: {
      true: "text-red-400",
      false: "text-gray-400",
    },
  },
  defaultVariants: {
    error: false,
  },
});

const priceVariants = cva(
  "shrink-0 text-sm font-bold group-data-[state=checked]:text-white",
  {
    variants: {
      error: {
        true: "text-red-700",
        false: "text-gray-900",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface Delivery {
  type: "delivery";
  name: string;
  label: string;
  options: {
    value: string;
    label: string;
    price: number;
    hint: string;
    icon: React.ReactNode;
  }[];
}

export function DeliveryView({ name, options }: Delivery) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <RadioGroup.Root
            value={field.value}
            onValueChange={field.onChange}
            className="flex flex-col gap-3"
          >
            {options.map((option) => (
              <RadioGroup.Item
                key={option.value}
                value={option.value}
                className={itemVariants({ error: !!fieldState.error })}
              >
                <div
                  className={iconContainerVariants({
                    error: !!fieldState.error,
                  })}
                >
                  <span className={iconVariants({ error: !!fieldState.error })}>
                    {option.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <p className={labelVariants({ error: !!fieldState.error })}>
                    {option.label}
                  </p>
                  <p className={hintVariants({ error: !!fieldState.error })}>
                    {option.hint}
                  </p>
                </div>
                <p className={priceVariants({ error: !!fieldState.error })}>
                  {format(option.price)}
                </p>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          {fieldState.error && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

function format(price: number): string {
  if (price === 0) {
    return "Free";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
