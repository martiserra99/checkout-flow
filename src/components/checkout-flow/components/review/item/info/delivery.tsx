import * as constants from "../../../../constants";

export interface Delivery {
  type: "delivery";
  delivery: string;
}

export function DeliveryView({ delivery }: Delivery) {
  const option = deliveries[delivery];
  return (
    <div className="px-5 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-800">{option.label}</p>
          <p className="mt-0.5 text-xs font-medium text-gray-400">
            {option.hint}
          </p>
        </div>
        <p className="text-xs font-semibold text-gray-800">
          {format(option.price)}
        </p>
      </div>
    </div>
  );
}

const deliveries = Object.fromEntries(
  constants.deliveries.map((d) => [d.value, d]),
);

function format(price: number) {
  if (price === 0) {
    return "Free";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
