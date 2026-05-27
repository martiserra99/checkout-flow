import { ItemView, type Item } from ".";

export interface Columns {
  type: "columns";
  columns: Item[];
}

export function ColumnsView({ columns }: Columns) {
  return (
    <div className="grid grid-cols-1 gap-5 @sm:grid-cols-2">
      {columns.map((item, i) => (
        <ItemView key={i} {...item} />
      ))}
    </div>
  );
}
