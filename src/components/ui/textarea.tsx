import type * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-black shadow-[0px_1px_2px_0px_rgba(3,22,47,0.04)] transition-[color,border-color,box-shadow] outline-none field-sizing-content",
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

export { Textarea };
