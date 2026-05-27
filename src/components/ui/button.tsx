import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-500 hover:bg-emerald-600 focus-visible:ring-emerald-500",
        dark: "bg-gray-950 hover:bg-gray-800 focus-visible:ring-gray-950",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "dark";
}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  );
}
