import type { FieldValues, DefaultValues, Resolver } from "react-hook-form";
import type { Next, Jump } from "@formity/react";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useEffectEvent } from "react";

import { Button } from "@/src/components/ui/button";

import { ItemView, type Item } from "./item";

interface FormProps<T extends FieldValues, U extends T> {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    back: string | null;
    next: string;
    edit: string;
  };
  next: Next<T>;
  jump: Jump<T>;
  prev: string | null;
  values: U;
  onValuesChange: (values: U) => void;
  edit: boolean;
}

export function Form<T extends FieldValues, U extends T>({
  defaultValues,
  resolver,
  heading,
  message,
  content,
  buttons,
  next,
  jump,
  prev,
  values,
  onValuesChange,
  edit,
}: FormProps<T, U>) {
  const form = useForm({ defaultValues, resolver });

  const onFieldsChange = useEffectEvent(({ values: fields }: { values: T }) => {
    onValuesChange({ ...values, ...fields });
  });

  useEffect(() => {
    return form.subscribe({
      formState: { values: true },
      callback: onFieldsChange,
    });
  }, [form]);

  return (
    <form
      noValidate
      autoComplete="off"
      className="@container flex flex-1 flex-col overflow-hidden"
      onSubmit={form.handleSubmit((fields) => {
        if (edit) jump("review", fields);
        else next(fields);
      })}
    >
      <FormProvider {...form}>
        <div className="flex-1 overflow-y-auto">
          <div className="px-10 py-9">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-gray-950">{heading}</h2>
              <p className="mt-1 text-sm font-medium text-gray-400">
                {message}
              </p>
            </div>
            <div className="flex max-w-md flex-col gap-5">
              {content.map((item, i) => (
                <ItemView key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-10 py-4">
          {buttons.back && !edit && (
            <button
              type="button"
              onClick={() => jump(prev, form.getValues())}
              className="inline-flex items-center gap-2 rounded text-sm font-medium text-gray-400 transition-colors outline-none hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-400"
            >
              <ArrowLeftIcon className="size-3.5" /> {buttons.back}
            </button>
          )}
          <Button variant="dark" className="ml-auto">
            {edit ? buttons.edit : buttons.next}
            <ArrowRightIcon className="size-3.5" />
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
