import * as React from "react";

import { cn } from "@/lib/utils";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-[16px] font-semibold leading-[1.5] text-[#08131a]", className)} {...props} />
  ),
);
Label.displayName = "Label";

export { Label };
