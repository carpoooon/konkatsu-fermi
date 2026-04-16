import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-[10px] py-1 text-[13px] font-semibold", {
  variants: {
    variant: {
      abundant: "bg-[#e6f6f2] text-[#1e7b65]",
      plenty: "bg-[#eef4fa] text-[#1e3a5f]",
      narrowed: "bg-[#f5f7f8] text-[#5a656b]",
      rare: "bg-[#fefbea] text-[#916626]",
      very_rare: "bg-[#fdf3f3] text-[#b22323]",
      ultra_rare: "bg-[#fdf3f3] text-[#b22323]",
      legendary: "bg-[#08131a] text-white",
    },
  },
  defaultVariants: {
    variant: "plenty",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
