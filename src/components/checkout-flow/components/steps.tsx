import { cva } from "class-variance-authority";
import { ChevronRightIcon } from "lucide-react";

const labelVariants = cva("text-xs font-semibold", {
  variants: {
    state: {
      active: "text-gray-950",
      done: "text-emerald-500",
      pending: "text-gray-400",
    },
  },
});

const steps = [
  { id: "shipping", label: "Shipping" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

interface StepsProps {
  current: number;
}

export function Steps({ current }: StepsProps) {
  return (
    <div className="shrink-0 border-b border-gray-100 px-10 py-5">
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            {i > 0 && <ChevronRightIcon className="size-3 text-gray-300" />}
            <span className={labelVariants({ state: state(current, i) })}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function state(current: number, i: number) {
  if (i === current) return "active";
  if (i < current) return "done";
  return "pending";
}
