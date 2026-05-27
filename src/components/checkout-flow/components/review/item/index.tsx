import { PencilIcon } from "lucide-react";

import { InfoView, type Info } from "./info";

export interface Item {
  text: string;
  edit: string;
  info: Info;
}

interface ItemViewProps {
  item: Item;
  onEdit: (edit: string) => void;
}

export function ItemView({ item, onEdit }: ItemViewProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
        <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          {item.text}
        </p>
        <button
          type="button"
          onClick={() => onEdit(item.edit)}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold text-gray-400 transition-colors outline-none hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400/50"
        >
          <PencilIcon className="size-3" />
          Edit
        </button>
      </div>
      <InfoView {...item.info} />
    </div>
  );
}
