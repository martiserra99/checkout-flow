"use client";

import type { OnReturn } from "@formity/react";
import type { Product } from "./types/product";
import type { Status, FormStatus } from "./types/status";

import { useState, useCallback } from "react";
import { useFormity } from "@formity/react";

import { Steps } from "./components/steps";
import { Summary } from "./components/summary";
import { Done } from "./components/done";

import { flow, inputs, type Schema } from "./flow";

import * as constants from "./constants";

export function CheckoutFlow() {
  const [status, setStatus] = useState<Status>({
    type: "form",
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done" });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        onStartOver={() => setStatus({ type: "form", submitting: false })}
      />
    );
  }

  return <Form status={status} onReturn={onReturn} />;
}

interface FormProps {
  status: FormStatus;
  onReturn: OnReturn<Schema>;
}

function Form({ status, onReturn }: FormProps) {
  const [products, setProducts] = useState<Product[]>(constants.products);
  const [delivery, setDelivery] = useState<string>("");

  const { step, form } = useFormity({
    flow,
    inputs,
    params: { status, onValuesChange: ({ delivery }) => setDelivery(delivery) },
    history: false,
    onReturn,
  });

  return (
    <div className="@container h-full w-full overflow-hidden">
      <div className="flex h-full w-full flex-col @4xl:flex-row">
        <Summary
          products={products}
          delivery={delivery}
          onProductsChange={setProducts}
        />
        <main className="flex min-h-0 flex-1 flex-col bg-white">
          <Steps current={step} />
          {form}
        </main>
      </div>
    </div>
  );
}
