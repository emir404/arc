import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: reusable wrapper; callers pass htmlFor + text.
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-1 text-sm font-medium leading-none text-black select-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
