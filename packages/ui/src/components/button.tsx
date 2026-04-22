import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-slate-900 px-5 py-3 text-white hover:bg-slate-700",
        secondary: "bg-white/90 px-5 py-3 text-slate-950 hover:bg-white",
        ghost: "px-4 py-2 text-slate-700 hover:bg-slate-100",
        outline: "border border-slate-300 px-5 py-3 text-slate-900 hover:bg-slate-50",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, ...props },
  ref,
) {
  return <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
});
