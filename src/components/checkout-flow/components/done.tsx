import { CheckIcon, ArrowLeftIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

interface DoneProps {
  onStartOver: () => void;
}

export function Done({ onStartOver }: DoneProps) {
  return (
    <div className="@container h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-row">
        {/* Dark panel */}
        <aside className="hidden w-96 shrink-0 flex-col items-center justify-center bg-gray-950 px-10 text-center @3xl:flex">
          <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-emerald-500">
            <CheckIcon className="size-7 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-bold text-white">Order confirmed!</h2>
        </aside>

        {/* Content */}
        <main className="flex flex-1 flex-col items-start justify-center bg-white px-14">
          <p className="mb-1 text-sm font-semibold tracking-wider text-emerald-500 uppercase">
            Thank you
          </p>
          <h1 className="mb-3 text-3xl font-bold text-gray-950 @3xl:text-4xl">
            Your order is on its way.
          </h1>
          <p className="max-w-sm text-base leading-relaxed font-medium text-gray-400">
            We&apos;ve sent a confirmation to your email. Your items will arrive
            within the estimated delivery window.
          </p>
          <Button variant="dark" onClick={onStartOver} className="mt-6">
            <ArrowLeftIcon className="size-3.5" /> Start over
          </Button>
        </main>
      </div>
    </div>
  );
}
