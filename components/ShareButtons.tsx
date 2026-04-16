"use client";

import { MessageCircle } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import type { FermiResult } from "@/lib/fermi";

interface ShareButtonsProps {
  count: number;
  url: string;
  tier: FermiResult["badge"]["tier"];
}

const HASHTAG = "#婚活フェルミ推定";

function buildShareText(count: number, tier: FermiResult["badge"]["tier"]): string {
  const formatted = new Intl.NumberFormat("ja-JP").format(count);
  switch (tier) {
    case "abundant":
      return `理想の条件で絞っても未婚者は日本に約${formatted}人。選びたい放題じゃん🎉 ${HASHTAG}`;
    case "plenty":
      return `理想の相手、日本に約${formatted}人もいた。まだまだ選択肢あるな😌 ${HASHTAG}`;
    case "narrowed":
      return `理想の相手、日本に約${formatted}人…意外と絞り込まれてる🔍 ${HASHTAG}`;
    case "rare":
      return `理想の相手、日本に約${formatted}人。レア度上がってきた⚠️ ${HASHTAG}`;
    case "very_rare":
      return `理想の相手、日本に約${formatted}人しかいない件。激レア💎 ${HASHTAG}`;
    case "ultra_rare":
      return `理想の相手、日本にたった約${formatted}人。超激レア案件🦄 ${HASHTAG}`;
    case "legendary":
    default:
      return `理想の相手、日本に約${formatted}人…天然記念物レベル、見つけたら国に届け出を😇 ${HASHTAG}`;
  }
}

export function ShareButtons({ count, url, tier }: ShareButtonsProps) {
  const text = useMemo(() => buildShareText(count, tier), [count, tier]);

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${text} ${url}`)}`;

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="icon"
        className="bg-black text-white"
        aria-label="Xでシェア"
        onClick={() => window.open(xUrl, "_blank", "noopener,noreferrer")}
      >
        <span className="text-[20px] font-semibold leading-none">X</span>
      </Button>
      <Button
        variant="icon"
        className="bg-[#00b900] text-white"
        aria-label="LINEでシェア"
        onClick={() => window.open(lineUrl, "_blank", "noopener,noreferrer")}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
