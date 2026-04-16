import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export const metadata: Metadata = {
  title: "婚活フェルミ推定 - あなたの理想の相手、日本に何人?",
  description:
    "条件を入れるだけで、該当する未婚者の人数を瞬時に可視化。理想が天然記念物レベルかも?",
  openGraph: {
    title: "婚活フェルミ推定 - あなたの理想の相手、日本に何人?",
    description:
      "条件を入れるだけで、該当する未婚者の人数を瞬時に可視化。理想が天然記念物レベルかも?",
    images: ["/og.png"],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "婚活フェルミ推定 - あなたの理想の相手、日本に何人?",
    description:
      "条件を入れるだけで、該当する未婚者の人数を瞬時に可視化。理想が天然記念物レベルかも?",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
