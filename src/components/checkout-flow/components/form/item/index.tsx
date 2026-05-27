import { CalloutView, type Callout } from "./callout";
import { CardNumberView, type CardNumber } from "./card-number";
import { ColumnsView, type Columns } from "./columns";
import { CvvView, type Cvv } from "./cvv";
import { DeliveryView, type Delivery } from "./delivery";
import { ExpiryDateView, type ExpiryDate } from "./expiry-date";
import { InputView, type Input } from "./input";
import { SelectView, type Select } from "./select";

export type Item =
  | Callout
  | CardNumber
  | Columns
  | Cvv
  | Delivery
  | ExpiryDate
  | Input
  | Select;

export function ItemView(item: Item) {
  switch (item.type) {
    case "callout": {
      return <CalloutView {...item} />;
    }
    case "cardNumber": {
      return <CardNumberView {...item} />;
    }
    case "columns": {
      return <ColumnsView {...item} />;
    }
    case "cvv": {
      return <CvvView {...item} />;
    }
    case "delivery": {
      return <DeliveryView {...item} />;
    }
    case "expiryDate": {
      return <ExpiryDateView {...item} />;
    }
    case "input": {
      return <InputView {...item} />;
    }
    case "select": {
      return <SelectView {...item} />;
    }
  }
}
