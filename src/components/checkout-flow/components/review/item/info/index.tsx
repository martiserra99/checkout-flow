import { ShippingView, type Shipping } from "./shipping";
import { DeliveryView, type Delivery } from "./delivery";
import { PaymentView, type Payment } from "./payment";

export type Info = Shipping | Delivery | Payment;

export function InfoView(info: Info) {
  switch (info.type) {
    case "shipping": {
      return <ShippingView {...info} />;
    }
    case "delivery": {
      return <DeliveryView {...info} />;
    }
    case "payment": {
      return <PaymentView {...info} />;
    }
  }
}
