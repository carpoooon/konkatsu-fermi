"use client";

import { Camera, Instagram, Link2, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

interface ToastState {
  message: string;
  visible: boolean;
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}${month}${day}`;
}

async function captureResultPanel(fileName: string) {
  const node = document.getElementById("result-panel");
  if (!node) throw new Error("result-panel not found");

  const { toPng } = await import("html-to-image");
  const wrapper = document.createElement("div");
  wrapper.style.background = "#FAFAFA";
  wrapper.style.padding = "24px";
  wrapper.style.display = "inline-block";
  wrapper.style.width = `${Math.ceil(node.getBoundingClientRect().width) + 48}px`;
  wrapper.appendChild(node.cloneNode(true));
  document.body.appendChild(wrapper);

  try {
    const dataUrl = await toPng(wrapper, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#FAFAFA",
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  } finally {
    document.body.removeChild(wrapper);
  }
}

export function ShareButtons({ count, url, tier }: ShareButtonsProps) {
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });

  const text = useMemo(() => buildShareText(count, tier), [count, tier]);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = window.setTimeout(() => setToast({ message: "", visible: false }), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${text} ${url}`)}`;

  const handleInstagram = async () => {
    try {
      await captureResultPanel(`konkatsu-fermi-${formatDate(new Date())}.png`);
      showToast("画像を保存しました。Instagramで投稿してください");
    } catch {
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const fallbackTimer = window.setTimeout(() => {
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      }, 600);
      try {
        window.location.href = "instagram://story-camera";
        window.addEventListener(
          "pagehide",
          () => window.clearTimeout(fallbackTimer),
          { once: true },
        );
      } catch {
        window.clearTimeout(fallbackTimer);
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      }
    } else {
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
    }
  };

  const handleScreenshot = async () => {
    try {
      await captureResultPanel(`konkatsu-fermi-${formatDate(new Date())}.png`);
      showToast("画像を保存しました");
    } catch {
      // silent fail
    }
  };

  return (
    <>
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
        <Button
          variant="icon"
          className="bg-[#E4405F] text-white"
          aria-label="Instagram用画像を保存"
          onClick={handleInstagram}
        >
          <Instagram className="h-6 w-6" />
        </Button>
        <Button
          variant="icon"
          className="bg-[#08131a] text-white"
          aria-label="スクリーンショットを保存"
          onClick={handleScreenshot}
        >
          <Camera className="h-6 w-6" />
        </Button>
      </div>

      {toast.visible ? (
        <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[360px] -translate-x-1/2 rounded-xl border border-[rgba(8,19,26,0.14)] bg-white p-5 text-[16px] leading-[1.6] text-[#08131a] shadow-card md:bottom-6 md:left-auto md:right-6 md:w-auto md:max-w-[420px] md:translate-x-0">
          <div className="flex items-center gap-3">
            <Link2 className="h-5 w-5 shrink-0 text-[#1e3a5f]" />
            <p>{toast.message}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
