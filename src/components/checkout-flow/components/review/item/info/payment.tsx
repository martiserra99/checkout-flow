import { CreditCardIcon } from "lucide-react";

export interface Payment {
  type: "payment";
  cardNumber: string;
  cardholderName: string;
}

export function PaymentView({ cardNumber, cardholderName }: Payment) {
  return (
    <div className="px-5 py-4">
      <div className="flex items-center gap-2.5">
        <CreditCardIcon className="size-4 text-gray-400" />
        <p className="text-xs font-semibold text-gray-800">
          {maskCard(cardNumber)}
        </p>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{cardholderName}</span>
      </div>
    </div>
  );
}

function maskCard(raw: string) {
  const digits = raw.replace(/\s/g, "");
  if (digits.length < 4) return raw;
  return "•••• •••• •••• " + digits.slice(-4);
}
