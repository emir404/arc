import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 touch-manipulation select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border font-[550] leading-none tracking-[-0.01em] transition-[background-color,border-color,color,opacity,box-shadow,transform] duration-200 active:scale-[0.96] motion-reduce:active:scale-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 focus-visible:outline-2 focus-visible:outline-offset-2",
  {
    variants: {
      variant: {
        /* On light backgrounds */
        default:
          "border-[#0a76ff] bg-primary text-primary-foreground shadow-[0px_4px_8px_0px_rgba(3,22,47,0.1),inset_0px_-4px_24px_0px_#0a76ff] hover:bg-[#0a76ff] focus-visible:outline-primary",
        secondary:
          "border-[#f5f5f5] bg-secondary text-secondary-foreground shadow-[0px_4px_8px_0px_rgba(25,25,25,0.03),inset_0px_-4px_24px_0px_#f5f5f5] hover:bg-[#e2e2e5] focus-visible:outline-primary",
        /* On brand-blue / dark backgrounds */
        glass:
          "border-[#f5f5f5]/10 bg-[#eaeaec]/30 text-white/95 shadow-[0px_4px_8px_0px_rgba(25,25,25,0.03),inset_0px_-4px_24px_0px_rgba(245,245,245,0.3)] hover:bg-[#eaeaec]/40 focus-visible:outline-white",
        white:
          "border-white bg-[#fafafa] text-black/95 shadow-[0px_4px_8px_0px_rgba(3,22,47,0.1),inset_0px_-4px_24px_0px_#ffffff] hover:bg-white focus-visible:outline-white",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground focus-visible:outline-primary",
        link: "border-transparent text-primary underline-offset-4 hover:underline focus-visible:outline-primary",
      },
      size: {
        /* Figma pill: 18px label + 14px vertical padding = 46px */
        default: "h-[46px] px-4.5 text-lg",
        sm: "h-9 gap-1.5 px-3.5 text-base",
        lg: "h-14 px-6 text-xl",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
