import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-[15px] font-semibold leading-[1.4] transition-[background-color,color,opacity,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "min-h-11 border border-transparent bg-[#08131a] px-5 py-3 text-white hover:opacity-90 active:opacity-[0.82] disabled:bg-[rgba(8,19,26,0.14)] disabled:text-[rgba(8,19,26,0.50)]",
        secondary:
          "min-h-11 border border-[rgba(8,19,26,0.22)] bg-white px-5 py-3 text-[#08131a] hover:bg-[#f5f7f8] disabled:border-[rgba(8,19,26,0.14)] disabled:text-[rgba(8,19,26,0.50)]",
        ghost:
          "min-h-11 border border-transparent bg-transparent px-5 py-3 text-[#08131a] hover:bg-[rgba(8,19,26,0.05)] disabled:text-[rgba(8,19,26,0.50)]",
        icon:
          "h-11 w-11 rounded-lg border border-transparent bg-[#08131a] p-0 text-white hover:opacity-90 active:opacity-[0.82] disabled:bg-[rgba(8,19,26,0.14)] disabled:text-[rgba(8,19,26,0.50)]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
