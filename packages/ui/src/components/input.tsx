import * as React from "react";

import { cn } from "../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-950",
        className,
      )}
      {...props}
    />
  );
});
