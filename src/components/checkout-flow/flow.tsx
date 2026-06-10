import type { UnionToIntersection } from "type-fest";
import type { Flow, s } from "@formity/react";
import type { FormStatus } from "./types/status";

import { LockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "./components/form";
import { Review } from "./components/review";

import * as constants from "./constants";

type Values = UnionToIntersection<Fields[keyof Fields]>;

type Fields = {
  shipping: {
    name: string;
    surname: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  delivery: {
    delivery: string;
  };
  payment: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
};

export type Schema = {
  render: {
    step: number;
    form: React.ReactNode;
  };
  struct: [
    s.Jump<s.Form<Fields["shipping"]>>,
    s.Jump<s.Form<Fields["delivery"]>>,
    s.Jump<s.Form<Fields["payment"]>>,
    s.Variables<{ edit: boolean }>,
    s.Jump<s.Form<Record<never, never>>>,
    s.Return<Values>,
  ];
  inputs: Values & { edit: boolean };
  params: {
    status: FormStatus;
    onValuesChange: (values: Values) => void;
  };
};

export const flow: Flow<Schema> = [
  {
    jump: {
      id: "shipping",
      at: {
        form: {
          fields: (values) => ({
            name: [values.name, []],
            surname: [values.surname, []],
            addressLine1: [values.addressLine1, []],
            addressLine2: [values.addressLine2, []],
            city: [values.city, []],
            state: [values.state, []],
            postalCode: [values.postalCode, []],
            country: [values.country, []],
          }),

          render: ({ fields, values, params, next, jump }) => ({
            step: 0,
            form: (
              <Form
                key="shipping"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    name: z.string().nonempty("Required"),
                    surname: z.string().nonempty("Required"),
                    addressLine1: z.string().nonempty("Required"),
                    addressLine2: z.string(),
                    city: z.string().nonempty("Required"),
                    state: z.string().nonempty("Required"),
                    postalCode: z.string().nonempty("Required"),
                    country: z.string().nonempty("Required"),
                  }),
                )}
                heading="Shipping address"
                message="Where should we send your order?"
                content={[
                  {
                    type: "columns",
                    columns: [
                      {
                        type: "input",
                        name: "name",
                        label: "First name",
                        placeholder: "Jane",
                        required: true,
                      },
                      {
                        type: "input",
                        name: "surname",
                        label: "Last name",
                        placeholder: "Smith",
                        required: true,
                      },
                    ],
                  },
                  {
                    type: "input",
                    name: "addressLine1",
                    label: "Address line 1",
                    placeholder: "123 Main Street",
                    required: true,
                  },
                  {
                    type: "input",
                    name: "addressLine2",
                    label: "Address line 2",
                    placeholder: "Apt, suite, unit (optional)",
                  },
                  {
                    type: "columns",
                    columns: [
                      {
                        type: "input",
                        name: "city",
                        label: "City",
                        placeholder: "New York",
                        required: true,
                      },
                      {
                        type: "input",
                        name: "state",
                        label: "State / Province",
                        placeholder: "NY",
                        required: true,
                      },
                    ],
                  },
                  {
                    type: "columns",
                    columns: [
                      {
                        type: "input",
                        name: "postalCode",
                        label: "Zip / Postal code",
                        placeholder: "10001",
                        required: true,
                      },
                      {
                        type: "select",
                        name: "country",
                        label: "Country",
                        placeholder: "Select a country",
                        options: constants.countries,
                        required: true,
                      },
                    ],
                  },
                ]}
                buttons={{
                  back: null,
                  next: "Continue",
                  edit: "Save & review",
                }}
                onNext={next}
                onJump={jump}
                prevId={null}
                values={values}
                onValuesChange={params.onValuesChange}
                edit={values.edit}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: "delivery",
      at: {
        form: {
          fields: (values) => ({
            delivery: [values.delivery, []],
          }),
          render: ({ fields, values, params, next, jump }) => ({
            step: 1,
            form: (
              <Form
                key="delivery"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    delivery: z.string().nonempty("Required"),
                  }),
                )}
                heading="Delivery method"
                message="Choose how fast you'd like your order to arrive."
                content={[
                  {
                    type: "delivery",
                    name: "delivery",
                    label: "Delivery",
                    options: constants.deliveries,
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Continue",
                  edit: "Save & review",
                }}
                onNext={next}
                onJump={jump}
                prevId="shipping"
                values={values}
                onValuesChange={params.onValuesChange}
                edit={values.edit}
              />
            ),
          }),
        },
      },
    },
  },
  {
    jump: {
      id: "payment",
      at: {
        form: {
          fields: (values) => ({
            cardNumber: [values.cardNumber, []],
            cardholderName: [values.cardholderName, []],
            expiryDate: [values.expiryDate, []],
            cvv: [values.cvv, []],
          }),
          render: ({ fields, values, params, next, jump }) => ({
            step: 2,
            form: (
              <Form
                key="payment"
                defaultValues={fields}
                resolver={zodResolver(
                  z.object({
                    cardNumber: z
                      .string()
                      .nonempty("Required")
                      .regex(
                        /^\d{4} \d{4} \d{4} \d{4}$/,
                        "Enter a valid 16-digit card number",
                      ),
                    cardholderName: z
                      .string()
                      .nonempty("Required")
                      .min(2, "Enter a valid name"),
                    expiryDate: z
                      .string()
                      .nonempty("Required")
                      .regex(/^\d{2}\/\d{2}$/, "Use MM/YY format"),
                    cvv: z
                      .string()
                      .nonempty("Required")
                      .regex(/^\d{3,4}$/, "Enter a valid CVV (3–4 digits)"),
                  }),
                )}
                heading="Payment"
                message="Your payment information is encrypted and secure."
                content={[
                  {
                    type: "cardNumber",
                    name: "cardNumber",
                    label: "Card number",
                    required: true,
                  },
                  {
                    type: "input",
                    name: "cardholderName",
                    label: "Cardholder name",
                    placeholder: "Jane Smith",
                    required: true,
                  },
                  {
                    type: "columns",
                    columns: [
                      {
                        type: "expiryDate",
                        name: "expiryDate",
                        required: true,
                      },
                      {
                        type: "cvv",
                        name: "cvv",
                        required: true,
                      },
                    ],
                  },
                  {
                    type: "callout",
                    icon: <LockIcon />,
                    text: "256-bit SSL encryption. We never store your card details.",
                  },
                ]}
                buttons={{
                  back: "Back",
                  next: "Review order",
                  edit: "Save & review",
                }}
                onNext={next}
                onJump={jump}
                prevId="delivery"
                values={values}
                onValuesChange={params.onValuesChange}
                edit={values.edit}
              />
            ),
          }),
        },
      },
    },
  },
  {
    variables: () => ({
      edit: true,
    }),
  },
  {
    jump: {
      id: "review",
      at: {
        form: {
          fields: () => ({}),
          render: ({ values, params, next, jump }) => ({
            step: 3,
            form: (
              <Review
                key="review"
                heading="Review order"
                message="Check everything looks right before placing your order."
                content={[
                  {
                    text: "Shipping address",
                    edit: "shipping",
                    info: {
                      type: "shipping",
                      name: values.name,
                      surname: values.surname,
                      addressLine1: values.addressLine1,
                      addressLine2: values.addressLine2,
                      city: values.city,
                      state: values.state,
                      postalCode: values.postalCode,
                      country: values.country,
                    },
                  },
                  {
                    text: "Delivery",
                    edit: "delivery",
                    info: {
                      type: "delivery",
                      delivery: values.delivery,
                    },
                  },
                  {
                    text: "Payment",
                    edit: "payment",
                    info: {
                      type: "payment",
                      cardNumber: values.cardNumber,
                      cardholderName: values.cardholderName,
                    },
                  },
                ]}
                button="Place order"
                onNext={next}
                onJump={jump}
                status={params.status}
              />
            ),
          }),
        },
      },
    },
  },
  {
    return: (values) => ({
      name: values.name,
      surname: values.surname,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: values.country,
      delivery: values.delivery,
      cardNumber: values.cardNumber,
      cardholderName: values.cardholderName,
      expiryDate: values.expiryDate,
      cvv: values.cvv,
    }),
  },
];

export const inputs: Schema["inputs"] = {
  name: "",
  surname: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  delivery: "",
  cardNumber: "",
  cardholderName: "",
  expiryDate: "",
  cvv: "",
  edit: false,
};
