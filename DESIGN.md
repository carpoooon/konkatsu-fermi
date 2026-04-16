# DESIGN.md — 婚活フェルミ推定アプリ

> 静的SPA（Next.js 14 App Router / Tailwind CSS v3）のUIデザインガイドライン。
> ベーストーンは note を参考にしつつ、「数字を主役にした large-display」と「派手にしないモノトーン + 1アクセント」に調整。

---

## Read first

1. このDESIGN.md（色・タイポグラフィ・コンポーネント定義）
2. 既存ページのコード（実装済みパターンの踏襲）
3. 参考: `_references/awesome-design-md-jp/design-md/note/DESIGN.md`

## Source of truth

- デザイン正本: この DESIGN.md
- 定義にない色・フォント・余白・角丸は**独自追加しない** — 追加が必要なら DESIGN.md を先に更新する
- 新しい画面・コンポーネントを作る時は、本ドキュメントの値を必ず参照する

---

## 1. Visual Theme & Atmosphere

- **デザイン方針**: 数字がヒーロー。情報が主役で、装飾は最小限
- **密度**: ゆったりとした余白、情報階層が一目でわかる
- **キーワード**: シンプル、すっきり、読みやすい、数字主役、モノトーン+1アクセント
- **特徴**: 純粋な黒（`#000000`）を避けて `#08131a`（ほぼ黒）を使用、柔らかい読書体験。アクセントは深い紺 1色のみ

---

## 2. Color Palette & Roles

### Neutral — Gray Scale

| トークン | 値 | 用途 |
|---|---|---|
| `gray-900` | `#08131a` | 本文テキスト、CTA背景 |
| `gray-700` | `#363f42` | 強調テキスト |
| `gray-600` | `#5a656b` | セカンダリテキスト |
| `gray-400` | `#9ca7ad` | プレースホルダー、薄いアイコン |
| `gray-200` | `#c5ccd1` | 薄いボーダー |
| `gray-100` | `#e8ecef` | 区切り線、ミュートされた面 |
| `gray-50`  | `#f5f7f8` | セカンダリ背景 |

### Surface（背景）

| トークン | 値 | 用途 |
|---|---|---|
| `bg-base` | `#FAFAFA` | ページ背景（off-white） |
| `bg-surface` | `#ffffff` | カード、パネル面 |
| `bg-inverse` | `#08131a` | 反転面（CTAボタン、フッターなど） |

### Text

| トークン | 値 | 用途 |
|---|---|---|
| `text-primary` | `#08131a` | 本文 |
| `text-secondary` | `rgba(8,19,26,0.66)` | 補足、キャプション |
| `text-muted` | `rgba(8,19,26,0.50)` | 無効・弱いテキスト |
| `text-inverse` | `#ffffff` | 暗い背景上のテキスト |

### Border

| トークン | 値 | 用途 |
|---|---|---|
| `border-default` | `rgba(8,19,26,0.14)` | カード・入力の標準ボーダー |
| `border-strong` | `rgba(8,19,26,0.22)` | 強調ボーダー |
| `border-focus` | `#1e3a5f` | フォーカスリング |

### Accent（唯一のアクセント色）

- **Accent Navy** (`#1e3a5f`): ステータスのアクセント、リンク、フォーカスリング

※アクセントは紺1色のみ。赤・緑・黄などのマルチカラーは**ステータスバッジ**でのみ使用。

### Status（ステータスバッジ専用色）

> 該当人数の希少度を示す。これ以外の用途では使わない。

| 状態 | 背景 | 文字色 | 意味 |
|---|---|---|---|
| `abundant` | `#e6f6f2` | `#1e7b65` | 余裕あり（100万+） |
| `plenty`   | `#eef4fa` | `#1e3a5f` | 選択肢は豊富（10万〜100万） |
| `narrowed` | `#f5f7f8` | `#5a656b` | 絞り込まれてきた（1万〜10万） |
| `rare`     | `#fefbea` | `#916626` | レア度UP（1000〜1万） |
| `very_rare`| `#fdf3f3` | `#b22323` | 激レア（100〜1000） |
| `ultra_rare`| `#fdf3f3`| `#b22323` | 超激レア（10〜100） |
| `legendary`| `#08131a` | `#ffffff` | 天然記念物（〜10） |

### Social Colors（シェアボタン）

| サービス | 色 | 備考 |
|---|---|---|
| X (Twitter) | `#000000` | tier別バズワード文言をプリセット |
| LINE | `#00b900` | 同上 |

> Instagram・スクリーンショット機能は**モバイルSafariで動作保証不可のため廃止**（`<a download>` がフォトライブラリに保存されない、html-to-imageがiOS Safariで失敗する等）。追加するなら Web Share API (`navigator.share`) ベースで再設計が必要。

---

## 3. Typography Rules

### 3.1 Font Family

```css
/* デフォルト（和文・欧文混在） */
font-family: "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
  Arial, "Noto Sans JP", Meiryo, sans-serif;

/* 数字専用（巨大ヒーロー数字） */
font-family: "Helvetica Neue", "Inter", "SF Pro Display", Arial, sans-serif;
font-variant-numeric: tabular-nums;
font-feature-settings: "tnum";
```

- 見出しは `font-feature-settings: "palt"` + `letter-spacing: 0.04em` を**見出しのみに**適用
- 本文・ボタン・入力には palt / letter-spacing を**適用しない**
- 数字（人数）は `tabular-nums` で桁揃え

### 3.2 Type Scale

| Role | Size (lg+) | Size (md) | Size (sm) | Size (モバイル) | Weight | Line Height | 用途 |
|---|---|---|---|---|---|---|---|
| Display / Hero Number | `60px` | `56px` | `52px` | `44px` | 700 | 1.05 | 該当人数（ヒーロー数字） |
| H1 | `32px` | `32px` | `24px` | `24px` | 700 | 1.3 | ページタイトル |
| H2 | `22px` | `22px` | `18px` | `18px` | 700 | 1.4 | セクション見出し |
| H3 | `16px` | `16px` | `16px` | `16px` | 600 | 1.5 | カード見出し・ラベル |
| Body | `16px` | `16px` | `16px` | `16px` | 400 | 1.6 | 本文 |
| Small | `13px` | `13px` | `13px` | `13px` | 400 | 1.5 | キャプション・フッター |
| Button | `15px` | `15px` | `15px` | `15px` | 600 | 1.4 | ボタン内テキスト |

- **ヒーロー数字は段階的にスケール**: モバイル 44px → sm 52px → md 56px → lg 60px。カード幅からのはみ出し防止で上限 60px
- 単位（「人」）はヒーロー数字内で `0.5em` の副次表示にして、桁が増えても枠を割らないようにする
- 本文サイズは16pxを下回らない（モバイル可読性）

### 3.3 禁則処理

```css
body {
  word-wrap: break-word;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 4. Component Stylings

### Buttons

**Primary（黒ソリッド・CTA）**
- Background: `#08131a`
- Text: `#ffffff`
- Border: none
- Border Radius: `8px`
- Padding: `12px 20px`
- Font Size: `15px` / Weight: `600`
- Min Height: `44px`（タップターゲット）
- Hover: opacity 0.88
- Active: opacity 0.82
- Disabled: background `rgba(8,19,26,0.14)` / text `rgba(8,19,26,0.50)`

**Secondary（白ベース・ボーダー）**
- Background: `#ffffff`
- Text: `#08131a`
- Border: `1px solid rgba(8,19,26,0.22)`
- Border Radius: `8px`
- Padding: `12px 20px`
- Hover: background `#f5f7f8`

**Ghost（アイコン用の透明ボタン）**
- Background: transparent
- Text: `#08131a`
- Hover: background `rgba(8,19,26,0.05)`

**Icon Button（シェアボタン等）**
- 正方形 `44px × 44px`
- Border Radius: `10px`
- 中央にアイコン（24px）
- 各サービスカラーを背景に、白アイコン

**禁止**: 背景が薄いグレーだけで縁取りもないボタン（現状の「白っぽい」状態の解消）。必ず上記4種のいずれかに揃える

### Cards / Panels

- Background: `#ffffff`
- Border: `1px solid rgba(8,19,26,0.14)`
- Border Radius: `12px`
- Padding: `24px`（モバイル 20px）
- Shadow: `0 1px 3px rgba(8,19,26,0.06)`（控えめ）

### Inputs / Selects

- Background: `#ffffff`
- Border: `1px solid rgba(8,19,26,0.22)`
- Border Radius: `8px`
- Height: `44px`（タップターゲット）
- Padding: `10px 14px`
- Font Size: `15px`
- Focus: `border-color: #1e3a5f`, `outline: 2px solid rgba(30,58,95,0.2)`

### Switch / Toggle

- 幅 `44px × 24px`、ノブ `20px`
- OFF: `#c5ccd1`
- ON: `#08131a`
- Transition: 150ms

### Badge

- Padding: `4px 10px`
- Border Radius: `999px`
- Font Size: `13px` / Weight: `600`
- Status 色は上記表を参照

### Breakdown Bar（絞り込み可視化バー）

- Track: `#f5f7f8`
- Fill: `#08131a`（単色）
- Height: `8px`
- Border Radius: `4px`
- ラベル・数値は bar 上部に `13px`

---

## 5. Layout Principles

### Grid

- **Desktop (md: 768px+)**: 2カラム grid、左 条件パネル / 右 結果パネル
- **Mobile (〜767px)**: 1カラム縦並び、条件 → 結果の順
- コンテナ最大幅: `1120px`、中央寄せ
- 左右パディング: `24px`（モバイル `16px`）

### Spacing Scale (4px base)

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 80px |

- セクション間: `48px`（モバイル `32px`）
- カード内アイテム間: `16px`

---

## 6. Depth & Elevation

| Level | Shadow | 用途 |
|---|---|---|
| 0 | none | フラット面（背景） |
| 1 | `0 1px 3px rgba(8,19,26,0.06)` | カード・パネル |
| 2 | `0 4px 12px rgba(8,19,26,0.08)` | ドロップダウン |
| 3 | `0 12px 32px rgba(8,19,26,0.12)` | モーダル |

影は控えめに。過剰なドロップシャドウは禁止。

---

## 7. Do's and Don'ts

### Do

- テキスト色は `#08131a` を使う（純黒 `#000` 禁止）
- 数字（人数）は `tabular-nums` で桁揃え
- ボタンは4種（Primary / Secondary / Ghost / Icon）のみ使用
- タップターゲット 44px 以上を必ず確保
- モバイル幅375px でレイアウトを崩さない
- カードは `border + 控えめshadow` で表現、ドロップシャドウ過剰NG
- アクセントは紺 `#1e3a5f` 1色のみ

### Don't

- 純黒 `#000000` をテキスト・背景に使わない
- ボタンで背景が薄いグレーだけ・縁取りなし（白っぽい見え）にしない
- 本文に `letter-spacing: 0.04em` や `palt` を適用しない
- アクセントカラーを2色以上増やさない（紺以外を追加するなら先にDESIGN.mdを更新）
- ステータスバッジ色を他の用途に流用しない
- 装飾目的のグラデーション・絵文字背景を使わない（絵文字はバッジラベル内のみ可）

---

## 8. Responsive Behavior

### Breakpoints

| Name | Min Width | 用途 |
|---|---|---|
| sm | 640px | 大きめモバイル |
| md | 768px | タブレット（2カラム化の境界） |
| lg | 1024px | 小さいデスクトップ |
| xl | 1280px | デスクトップ |

### タッチターゲット

- 最小サイズ: `44px × 44px`（ボタン・セレクト・トグルすべて）
- 隣接タップターゲット間の余白: `8px` 以上

### レスポンシブルール

- 375px で水平スクロールが発生しない
- ヒーロー数字はモバイルで 44px まで縮小（上限 60px）、単位「人」は 0.5em 副次表示で枠はみ出しを防ぐ
- 2カラムはmd(768px)未満で1カラムに切り替え
- シェアボタンはモバイルで横並び（必要なら2段に折返し）

---

## 9. Agent Prompt Guide

### クイックリファレンス

```
Background: #FAFAFA（ページ）、#ffffff（カード）
Text Primary: #08131a（純黒禁止）
Text Secondary: rgba(8,19,26,0.66)
Border: rgba(8,19,26,0.14)
Accent: #1e3a5f（紺1色）
CTA Button Bg: #08131a / Text: #ffffff / Radius: 8px / Min Height: 44px

Font: "Helvetica Neue", "Hiragino Sans", Arial, "Noto Sans JP", sans-serif
Hero Number: 60px(lg) / 56px(md) / 52px(sm) / 44px(モバイル) / 700 / tabular-nums（単位「人」は 0.5em 副次表示）
Body: 16px / 400 / line-height 1.6
Button: 15px / 600

Breakpoint: md = 768px（2カラム化）
Max Container: 1120px
```

### プロンプト例

```
DESIGN.md に従って以下を実装してください:
- 背景 #FAFAFA、カードは白 + rgba(8,19,26,0.14) ボーダー
- CTAボタンは黒 #08131a ソリッド、白文字、radius 8px、高さ44px
- 純黒 #000 と薄グレーだけのボタンは禁止
- ヒーロー数字は上限 60px / tabular-nums、モバイルで 44px。単位「人」は 0.5em の副次表示
- 2カラムは md(768px)+、モバイルでは1カラム
- タップターゲット 44px 以上
- アクセントは紺 #1e3a5f のみ（色を増やさない）
```
