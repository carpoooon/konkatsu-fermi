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

export const INCOME_PROBABILITIES_BY_AGE_MALE: Record<AgeRange, Record<IncomeLevel, number>> = {
  "20-24": {
    none: 1,
    under_300: 0.75,
    over_300: 0.25,
    over_400: 0.08,
    over_500: 0.02,
    over_600: 0.008,
    over_700: 0.002,
    over_800: 0.0005,
    over_1000: 0.0001,
  },
  "25-29": {
    none: 1,
    under_300: 0.42,
    over_300: 0.58,
    over_400: 0.32,
    over_500: 0.16,
    over_600: 0.07,
    over_700: 0.025,
    over_800: 0.008,
    over_1000: 0.001,
  },
  "30-34": {
    none: 1,
    under_300: 0.25,
    over_300: 0.75,
    over_400: 0.52,
    over_500: 0.32,
    over_600: 0.18,
    over_700: 0.09,
    over_800: 0.035,
    over_1000: 0.007,
  },
  "35-39": {
    none: 1,
    under_300: 0.18,
    over_300: 0.82,
    over_400: 0.66,
    over_500: 0.46,
    over_600: 0.30,
    over_700: 0.17,
    over_800: 0.09,
    over_1000: 0.025,
  },
  "40-44": {
    none: 1,
    under_300: 0.15,
    over_300: 0.85,
    over_400: 0.73,
    over_500: 0.55,
    over_600: 0.38,
    over_700: 0.24,
    over_800: 0.14,
    over_1000: 0.055,
  },
  "45-49": {
    none: 1,
    under_300: 0.13,
    over_300: 0.87,
    over_400: 0.77,
    over_500: 0.60,
    over_600: 0.44,
    over_700: 0.30,
    over_800: 0.19,
    over_1000: 0.085,
  },
};

export const INCOME_PROBABILITIES_BY_AGE_FEMALE: Record<AgeRange, Record<IncomeLevel, number>> = {
  "20-24": {
    none: 1,
    under_300: 0.72,
    over_300: 0.28,
    over_400: 0.08,
    over_500: 0.02,
    over_600: 0.005,
    over_700: 0.001,
    over_800: 0.0003,
    over_1000: 0.00005,
  },
  "25-29": {
    none: 1,
    under_300: 0.48,
    over_300: 0.52,
    over_400: 0.25,
    over_500: 0.10,
    over_600: 0.035,
    over_700: 0.012,
    over_800: 0.004,
    over_1000: 0.0008,
  },
  "30-34": {
    none: 1,
    under_300: 0.45,
    over_300: 0.55,
    over_400: 0.28,
    over_500: 0.14,
    over_600: 0.055,
    over_700: 0.022,
    over_800: 0.009,
    over_1000: 0.002,
  },
  "35-39": {
    none: 1,
    under_300: 0.47,
    over_300: 0.53,
    over_400: 0.27,
    over_500: 0.13,
    over_600: 0.055,
    over_700: 0.023,
    over_800: 0.01,
    over_1000: 0.0025,
  },
  "40-44": {
    none: 1,
    under_300: 0.49,
    over_300: 0.51,
    over_400: 0.26,
    over_500: 0.13,
    over_600: 0.055,
    over_700: 0.024,
    over_800: 0.011,
    over_1000: 0.003,
  },
  "45-49": {
    none: 1,
    under_300: 0.51,
    over_300: 0.49,
    over_400: 0.24,
    over_500: 0.12,
    over_600: 0.052,
    over_700: 0.022,
    over_800: 0.01,
    over_1000: 0.0028,
  },
};

export const ASSET_PROBABILITIES_BY_AGE: Record<AgeRange, Record<AssetLevel, number>> = {
  "20-24": {
    none: 1,
    under_300: 0.88,
    over_300: 0.12,
    over_500: 0.05,
    over_1000: 0.015,
    over_2000: 0.003,
    over_3000: 0.001,
    over_5000: 0.0003,
  },
  "25-29": {
    none: 1,
    under_300: 0.72,
    over_300: 0.28,
    over_500: 0.16,
    over_1000: 0.07,
    over_2000: 0.018,
    over_3000: 0.007,
    over_5000: 0.0015,
  },
  "30-34": {
    none: 1,
    under_300: 0.62,
    over_300: 0.38,
    over_500: 0.26,
    over_1000: 0.14,
    over_2000: 0.055,
    over_3000: 0.025,
    over_5000: 0.008,
  },
  "35-39": {
    none: 1,
    under_300: 0.54,
    over_300: 0.46,
    over_500: 0.34,
    over_1000: 0.21,
    over_2000: 0.1,
    over_3000: 0.055,
    over_5000: 0.022,
  },
  "40-44": {
    none: 1,
    under_300: 0.48,
    over_300: 0.52,
    over_500: 0.41,
    over_1000: 0.27,
    over_2000: 0.15,
    over_3000: 0.085,
    over_5000: 0.038,
  },
  "45-49": {
    none: 1,
    under_300: 0.43,
    over_300: 0.57,
    over_500: 0.47,
    over_1000: 0.33,
    over_2000: 0.19,
    over_3000: 0.115,
    over_5000: 0.058,
  },
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

export const EDUCATION_PROBABILITIES_BY_AGE: Record<AgeRange, Record<EducationLevel, number>> = {
  "20-24": { none: 1, bachelor: 0.6, march: 0.11, soukei: 0.035, kyuutei: 0.018 },
  "25-29": { none: 1, bachelor: 0.6, march: 0.11, soukei: 0.035, kyuutei: 0.018 },
  "30-34": { none: 1, bachelor: 0.58, march: 0.105, soukei: 0.033, kyuutei: 0.017 },
  "35-39": { none: 1, bachelor: 0.55, march: 0.098, soukei: 0.03, kyuutei: 0.015 },
  "40-44": { none: 1, bachelor: 0.5, march: 0.09, soukei: 0.027, kyuutei: 0.013 },
  "45-49": { none: 1, bachelor: 0.45, march: 0.08, soukei: 0.023, kyuutei: 0.011 },
};

export const LOOKS_PROBABILITIES: Record<Exclude<LooksLevel, "none">, number> = {
  above_avg: 0.5,
  top30: 0.3,
  top10: 0.1,
  top5: 0.05,
};

export const NON_SMOKER_PROBABILITIES_BY_AGE: Record<Gender, Record<AgeRange, number>> = {
  male: {
    "20-24": 0.8,
    "25-29": 0.78,
    "30-34": 0.72,
    "35-39": 0.7,
    "40-44": 0.67,
    "45-49": 0.7,
  },
  female: {
    "20-24": 0.95,
    "25-29": 0.94,
    "30-34": 0.92,
    "35-39": 0.9,
    "40-44": 0.88,
    "45-49": 0.9,
  },
};

export const NOT_BALD_PROBABILITIES_BY_AGE_MALE: Record<AgeRange, number> = {
  "20-24": 0.98,
  "25-29": 0.95,
  "30-34": 0.88,
  "35-39": 0.78,
  "40-44": 0.65,
  "45-49": 0.52,
};

export const INCOME_ASSET_CORRELATION_BOOST = 1.5;
