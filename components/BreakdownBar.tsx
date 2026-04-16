"use client";

import { type BreakdownStep } from "@/lib/fermi";

function formatCount(value: number) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

export function BreakdownBar({ steps }: { steps: BreakdownStep[] }) {
  const max = Math.max(...steps.map((step) => step.count), 1);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const width = `${Math.max((step.count / max) * 100, 2)}%`;

        return (
          <div key={`${step.label}-${index}`} className="space-y-2">
            <div className="flex items-end justify-between gap-4">
              <p className="min-w-0 text-[13px] font-normal leading-[1.5] text-[#08131a]">{step.label}</p>
              <p className='shrink-0 font-number text-[13px] leading-[1.5] text-[rgba(8,19,26,0.66)] [font-feature-settings:"tnum"] [font-variant-numeric:tabular-nums]'>
                {formatCount(step.count)}人
              </p>
            </div>
            <div className="h-2 rounded-[4px] bg-[#f5f7f8]">
              <div
                className="h-2 rounded-[4px] bg-[#08131a] transition-all duration-500"
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
