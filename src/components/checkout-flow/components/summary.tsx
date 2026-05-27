import type { Product } from "../types/product";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "lucide-react";

import * as constants from "../constants";

interface SummaryProps {
  products: Product[];
  delivery: string;
  onProductsChange: (products: Product[]) => void;
}

export function Summary({
  products,
  delivery,
  onProductsChange,
}: SummaryProps) {
  const [open, setOpen] = useState(false);

  function onQuantityChange(name: string, qty: number) {
    onProductsChange(
      products.map((p) => (p.name === name ? { ...p, quantity: qty } : p)),
    );
  }

  return (
    <>
      {/* ── Mobile: collapsed bar ───────────────────────────────────────── */}
      <div className="relative shrink-0 bg-gray-950 @4xl:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between px-6 py-4 outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500">
              <ShoppingBagIcon
                className="size-3.5 text-white"
                strokeWidth={2}
              />
            </div>
            <span className="text-sm font-bold text-white">Formity Store</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-bold text-white">
              {total(products, delivery)}
            </span>
            {open ? (
              <ChevronUpIcon className="size-4 text-gray-400" />
            ) : (
              <ChevronDownIcon className="size-4 text-gray-400" />
            )}
          </div>
        </button>

        {open && (
          <div className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] overflow-y-auto border-t border-white/8 bg-gray-950 px-6 py-5">
            <Items products={products} onQuantityChange={onQuantityChange} />
            <Totals products={products} delivery={delivery} />
          </div>
        )}
      </div>

      {/* ── Desktop: full sidebar ───────────────────────────────────────── */}
      <aside className="hidden w-96 shrink-0 flex-col overflow-hidden bg-gray-950 @4xl:flex">
        <div className="shrink-0 border-b border-white/8 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500">
              <ShoppingBagIcon className="size-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Formity Store</p>
              <div className="mt-0.5 flex items-center gap-1">
                <LockIcon className="size-2.5 text-gray-600" />
                <p className="text-[10px] font-medium text-gray-500">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <Items products={products} onQuantityChange={onQuantityChange} />
          <Totals products={products} delivery={delivery} />
        </div>
      </aside>
    </>
  );
}

// ── Shared sub-components ───────────────────────────────────────────────────

interface ItemsProps {
  products: Product[];
  onQuantityChange: (name: string, qty: number) => void;
}

function Items({ products, onQuantityChange }: ItemsProps) {
  return (
    <div className="flex flex-col gap-5">
      {products.map((product) => (
        <div key={product.name} className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <div
              className="flex size-11 items-center justify-center rounded-lg text-sm font-black text-white"
              style={{ backgroundColor: product.color }}
            >
              {product.name[0]}
            </div>
            <div className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-gray-700 text-[10px] font-bold text-white">
              {product.quantity}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {product.name}
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-gray-500">
              {product.text}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onQuantityChange(
                  product.name,
                  Math.max(0, product.quantity - 1),
                )
              }
              className="flex size-5 items-center justify-center rounded border border-white/10 text-gray-300 transition-colors outline-none hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <MinusIcon className="size-2.5" />
            </button>
            <span className="w-4 text-center text-xs font-semibold text-white">
              {product.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                onQuantityChange(product.name, product.quantity + 1)
              }
              className="flex size-5 items-center justify-center rounded border border-white/10 text-gray-300 transition-colors outline-none hover:border-white/20 focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <PlusIcon className="size-2.5" />
            </button>
          </div>
          <p className="w-14 shrink-0 text-right text-sm font-semibold text-white">
            {format(product.price * product.quantity)}
          </p>
        </div>
      ))}
    </div>
  );
}

interface TotalsProps {
  products: Product[];
  delivery: string;
}

function Totals({ products, delivery }: TotalsProps) {
  return (
    <div className="mt-7 border-t border-white/8 pt-5">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Subtotal</span>
          <span className="text-sm font-semibold text-gray-300">
            {subtotal(products)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Shipping</span>
          <span className="text-sm font-semibold text-gray-300">
            {shipping(delivery)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between border-t border-white/8 pt-4">
          <span className="text-base font-bold text-white">Total</span>
          <span className="text-base font-bold text-white">
            {total(products, delivery)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const deliveryPrices = Object.fromEntries(
  constants.deliveries.map(({ value, price }) => [value, price]),
);

function subtotal(products: Product[]): string {
  return format(products.reduce((s, p) => s + p.price * p.quantity, 0));
}

function shipping(delivery: string): string {
  if (!delivery) return "—";
  if (deliveryPrices[delivery] === 0) return "Free";
  return format(deliveryPrices[delivery]);
}

function total(products: Product[], delivery: string): string {
  const sub = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const ship = delivery ? (deliveryPrices[delivery] ?? 0) : 0;
  return format(sub + ship);
}

function format(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
