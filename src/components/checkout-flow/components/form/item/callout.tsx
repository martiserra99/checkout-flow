export interface Callout {
  type: "callout";
  icon: React.ReactNode;
  text: string;
}

export function CalloutView({ icon, text }: Callout) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-gray-400">
      {icon}
      <p className="text-xs font-medium text-gray-400">{text}</p>
    </div>
  );
}
