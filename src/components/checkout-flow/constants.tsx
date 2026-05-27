import { TruckIcon, PackageIcon, ZapIcon } from "lucide-react";

import type { Product } from "./types/product";

export const products: Product[] = [
  {
    name: "Wireless Headphones",
    text: "Midnight Black",
    color: "#1a1a2e",
    price: 129.0,
    quantity: 1,
  },
  {
    name: "Mechanical Keyboard",
    text: "Tactile Brown / US",
    color: "#2d2d2d",
    price: 189.0,
    quantity: 1,
  },
  {
    name: "USB-C Hub",
    text: "Space Grey, 7-in-1",
    color: "#4a4a5a",
    price: 59.0,
    quantity: 2,
  },
];

export const countries = [
  { value: "United States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Spain", label: "Spain" },
  { value: "Italy", label: "Italy" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Sweden", label: "Sweden" },
  { value: "Japan", label: "Japan" },
  { value: "Singapore", label: "Singapore" },
];

export const deliveries = [
  {
    value: "standard",
    label: "Standard",
    price: 0,
    hint: "5–7 business days",
    icon: <TruckIcon className="size-4" />,
  },
  {
    value: "express",
    label: "Express",
    price: 12.99,
    hint: "2–3 business days",
    icon: <PackageIcon className="size-4" />,
  },
  {
    value: "overnight",
    label: "Overnight",
    price: 29.99,
    hint: "Next business day",
    icon: <ZapIcon className="size-4" />,
  },
];
