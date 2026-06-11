import type { Next, Jump } from "@formity/react";
import type { FormStatus } from "../../types/status";

import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { ItemView, type Item } from "./item";

interface ReviewProps {
  heading: string;
  message: string;
  content: Item[];
  button: string;
  next: Next<Record<never, never>>;
  jump: Jump<Record<never, never>>;
  status: FormStatus;
}

export function Review({
  heading,
  message,
  content,
  button,
  next,
  jump,
  status,
}: ReviewProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="px-10 py-9">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-950">{heading}</h2>
            <p className="mt-1 text-sm font-medium text-gray-400">{message}</p>
          </div>
          <div className="flex max-w-md flex-col gap-3">
            {content.map((item, i) => (
              <ItemView key={i} item={item} onEdit={(edit) => jump(edit, {})} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-10 py-4">
        <Button
          variant="dark"
          disabled={status.submitting}
          className="ml-auto"
          onClick={() => next({})}
        >
          {status.submitting ? "Submitting..." : button}
          <ArrowRightIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
