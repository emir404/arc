import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-xl border bg-white px-3.5 py-2 text-base text-black shadow-[0px_1px_2px_0px_rgba(3,22,47,0.04)] transition-[color,border-color,box-shadow] outline-none",
        "placeholder:text-black/35",
        "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
