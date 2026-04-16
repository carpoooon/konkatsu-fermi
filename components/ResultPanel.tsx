"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { BreakdownBar } from "@/components/BreakdownBar";
import { ShareButtons } from "@/components/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Conditions, type FermiResult } from "@/lib/fermi";
import { toQueryString } from "@/lib/queryState";

function formatNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("ja-JP", options).format(value);
}

export function ResultPanel({ result, conditions }: { result: FermiResult; conditions: Conditions }) {
  const motionValue = useMotionValue(result.count);
  const rounded = useTransform(() => Math.round(motionValue.get()));
  const [displayCount, setDisplayCount] = useState(result.count);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const controls = animate(motionValue, result.count, { duration: 0.4, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (latest) => setDisplayCount(latest));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, result.count, rounded]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(`${window.location.origin}${window.location.pathname}${toQueryString(conditions)}`);
  }, [conditions]);

  const percentage = useMemo(
    () => `${formatNumber(result.ratio * 100, { maximumFractionDigits: result.ratio < 0.01 ? 3 : 1 })}%`,
    [result.ratio],
  );

  return (
    <Card id="result-panel" className="min-w-0">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle>推定結果</CardTitle>
          <Badge variant={result.badge.tier}>{result.badge.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2 rounded-xl border border-[rgba(8,19,26,0.14)] bg-white p-5 md:p-6">
          <p className="text-[13px] font-normal leading-[1.5] text-[rgba(8,19,26,0.66)]">該当人数</p>
          <motion.p
            key={result.count}
            initial={{ opacity: 0.8, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className='font-number whitespace-nowrap text-[56px] font-bold leading-none text-[#08131a] [font-feature-settings:"tnum"] [font-variant-numeric:tabular-nums] sm:text-[64px] md:text-[80px] lg:text-[96px]'
          >
            {formatNumber(displayCount)}人
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label="未婚母集団に占める割合" value={percentage} />
          <Metric label="都道府県あたり平均" value={`${formatNumber(result.perPrefecture, { maximumFractionDigits: 1 })}人`} />
          <Metric label="未婚母集団" value={`${formatNumber(result.population)}人`} />
        </div>

        <section className="space-y-4">
          <h2 className='text-[18px] font-bold leading-[1.4] text-[#08131a] md:text-[22px] [font-feature-settings:"palt"] tracking-[0.04em]'>
            絞り込みの流れ
          </h2>
          <BreakdownBar steps={result.breakdown} />
        </section>

        <section className="space-y-4">
          <h2 className='text-[18px] font-bold leading-[1.4] text-[#08131a] md:text-[22px] [font-feature-settings:"palt"] tracking-[0.04em]'>
            シェア
          </h2>
          <ShareButtons count={result.count} url={shareUrl} tier={result.badge.tier} />
        </section>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[rgba(8,19,26,0.14)] bg-white p-4">
      <p className="text-[13px] leading-[1.5] text-[rgba(8,19,26,0.66)]">{label}</p>
      <p className="mt-2 whitespace-nowrap text-[22px] font-bold leading-[1.4] text-[#08131a]">{value}</p>
    </div>
  );
}
