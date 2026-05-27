export interface Shipping {
  type: "shipping";
  name: string;
  surname: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export function ShippingView({
  name,
  surname,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
}: Shipping) {
  return (
    <div className="px-5 py-4">
      <p className="text-xs leading-relaxed font-medium text-gray-600">
        {name} {surname}
        <br />
        {addressLine1}
        {addressLine2 && `, ${addressLine2}`}
        <br />
        {city}, {state} {postalCode}
        <br />
        {country}
      </p>
    </div>
  );
}
