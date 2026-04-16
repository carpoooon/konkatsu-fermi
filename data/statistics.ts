export type Gender = "male" | "female";
export type AgeRange = "20-24" | "25-29" | "30-34" | "35-39" | "40-44" | "45-49";
export type IncomeLevel =
  | "none"
  | "under_300"
  | "over_300"
  | "over_400"
  | "over_500"
  | "over_600"
  | "over_700"
  | "over_800"
  | "over_1000";
export type AssetLevel =
  | "none"
  | "under_300"
  | "over_300"
  | "over_500"
  | "over_1000"
  | "over_2000"
  | "over_3000"
  | "over_5000";
export type HeightLevel =
  | "none"
  | "under_160"
  | "over_160"
  | "over_165"
  | "over_168"
  | "over_170"
  | "over_173"
  | "over_175"
  | "over_178"
  | "over_180";
export type EducationLevel = "none" | "bachelor" | "march" | "soukei" | "kyuutei";
export type LooksLevel = "none" | "above_avg" | "top30" | "top10" | "top5";

export const AGE_LABELS: Record<AgeRange, string> = {
  "20-24": "20〜24歳",
  "25-29": "25〜29歳",
  "30-34": "30〜34歳",
  "35-39": "35〜39歳",
  "40-44": "40〜44歳",
  "45-49": "45〜49歳",
};

export const GENDER_LABELS: Record<Gender, string> = {
  male: "男性",
  female: "女性",
};

export const INCOME_LABELS: Record<IncomeLevel, string> = {
  none: "指定なし",
  under_300: "300万円未満",
  over_300: "300万円以上",
  over_400: "400万円以上",
  over_500: "500万円以上",
  over_600: "600万円以上",
  over_700: "700万円以上",
  over_800: "800万円以上",
  over_1000: "1,000万円以上",
};

export const ASSET_LABELS: Record<AssetLevel, string> = {
  none: "指定なし",
  under_300: "300万円未満",
  over_300: "300万円以上",
  over_500: "500万円以上",
  over_1000: "1,000万円以上",
  over_2000: "2,000万円以上",
  over_3000: "3,000万円以上",
  over_5000: "5,000万円以上",
};

export const HEIGHT_LABELS: Record<HeightLevel, string> = {
  none: "指定なし",
  under_160: "160cm未満",
  over_160: "160cm以上",
  over_165: "165cm以上",
  over_168: "168cm以上",
  over_170: "170cm以上",
  over_173: "173cm以上",
  over_175: "175cm以上",
  over_178: "178cm以上",
  over_180: "180cm以上",
};

export const EDUCATION_LABELS: Record<EducationLevel, string> = {
  none: "指定なし",
  bachelor: "大卒以上",
  march: "MARCH・関関同立以上",
  soukei: "早慶上理以上",
  kyuutei: "旧帝大以上",
};

export const LOOKS_LABELS: Record<LooksLevel, string> = {
  none: "指定なし",
  above_avg: "平均以上",
  top30: "上位30%",
  top10: "上位10%",
  top5: "上位5%",
};

export const UNMARRIED_POPULATION_10K: Record<Gender, Record<AgeRange, number>> = {
  male: {
    "20-24": 285,
    "25-29": 220,
    "30-34": 158,
    "35-39": 131,
    "40-44": 127,
    "45-49": 143,
  },
  female: {
    "20-24": 267,
    "25-29": 183,
    "30-34": 122,
    "35-39": 85,
    "40-44": 77,
    "45-49": 88,
  },
};

export const INCOME_PROBABILITIES: Record<Exclude<IncomeLevel, "none">, number> = {
  under_300: 0.3,
  over_300: 0.7,
  over_400: 0.5,
  over_500: 0.33,
  over_600: 0.22,
  over_700: 0.15,
  over_800: 0.09,
  over_1000: 0.05,
};

export const ASSET_PROBABILITIES: Record<Exclude<AssetLevel, "none">, number> = {
  under_300: 0.55,
  over_300: 0.45,
  over_500: 0.35,
  over_1000: 0.25,
  over_2000: 0.15,
  over_3000: 0.1,
  over_5000: 0.05,
};

export const HEIGHT_PROBABILITIES_MALE: Record<Exclude<HeightLevel, "none">, number> = {
  under_160: 0.03,
  over_160: 0.97,
  over_165: 0.88,
  over_168: 0.75,
  over_170: 0.65,
  over_173: 0.5,
  over_175: 0.28,
  over_178: 0.14,
  over_180: 0.08,
};

export const HEIGHT_PROBABILITIES_FEMALE: Record<Exclude<HeightLevel, "none">, number> = {
  under_160: 0.58,
  over_160: 0.42,
  over_165: 0.18,
  over_168: 0.08,
  over_170: 0.05,
  over_173: 0.025,
  over_175: 0.01,
  over_178: 0.003,
  over_180: 0.001,
};

export const EDUCATION_PROBABILITIES: Record<Exclude<EducationLevel, "none">, number> = {
  bachelor: 0.58,
  march: 0.1,
  soukei: 0.03,
  kyuutei: 0.015,
};

export const LOOKS_PROBABILITIES: Record<Exclude<LooksLevel, "none">, number> = {
  above_avg: 0.5,
  top30: 0.3,
  top10: 0.1,
  top5: 0.05,
};

export const NON_SMOKER_PROBABILITY = 0.73;
export const NOT_BALD_PROBABILITY_MALE = 0.7;
