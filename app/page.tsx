"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ConditionPanel } from "@/components/ConditionPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { defaultConditions, estimate, type Conditions } from "@/lib/fermi";
import { parseQueryString, toQueryString } from "@/lib/queryState";

export default function HomePage() {
  const [conditions, setConditions] = useState<Conditions>(defaultConditions);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const restored = parseQueryString(window.location.search);
    if (Object.keys(restored).length > 0) {
      setConditions((current) => ({ ...current, ...restored }));
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hydratedRef.current) return;
    const query = toQueryString(conditions);
    const nextUrl = `${window.location.pathname}${query}`;
    window.history.replaceState(null, "", nextUrl);
  }, [conditions]);

  const result = useMemo(() => estimate(conditions), [conditions]);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-[1120px] px-4 py-8 md:px-6 md:py-12">
        <header className="max-w-[720px] space-y-4">
          <p className="text-[13px] leading-[1.5] text-[rgba(8,19,26,0.66)]">条件を入れるだけで日本全国をフェルミ推定</p>
          <h1 className='text-[24px] font-bold leading-[1.3] text-[#08131a] md:text-[32px] [font-feature-settings:"palt"] tracking-[0.04em]'>
            婚活フェルミ推定
          </h1>
          <p className="text-[16px] leading-[1.6] text-[rgba(8,19,26,0.66)]">
            理想条件を入れると、該当する未婚者が日本に何人いそうかをざっくり推定します。
          </p>
          <p className="text-[16px] leading-[1.6] text-[rgba(8,19,26,0.66)]">
            条件を積むほど、理想がどこまで希少かが見えてきます。
          </p>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-6">
          <ConditionPanel
            conditions={conditions}
            onChange={setConditions}
            onReset={() => setConditions(defaultConditions())}
          />
          <ResultPanel result={result} conditions={conditions} />
        </section>

        <footer className="mt-8 space-y-2 text-[13px] leading-[1.5] text-[rgba(8,19,26,0.66)] md:mt-12">
          <p>出典: 未婚人口は国勢調査ベースの万人単位データ、各条件は簡易な確率テーブルを用いた近似です。</p>
          <p>注記: 各条件は独立と仮定して乗算しています。実社会では相関があるため、結果は厳密値ではありません。</p>
          <p>エンタメ目的の推定ツールです。実際の婚活や属性評価を保証するものではありません。</p>
        </footer>
      </div>
    </main>
  );
}
