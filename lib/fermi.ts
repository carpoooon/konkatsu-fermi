import {
  AGE_LABELS,
  ASSET_LABELS,
  ASSET_PROBABILITIES,
  EDUCATION_LABELS,
  EDUCATION_PROBABILITIES,
  GENDER_LABELS,
  HEIGHT_LABELS,
  HEIGHT_PROBABILITIES_FEMALE,
  HEIGHT_PROBABILITIES_MALE,
  INCOME_LABELS,
  INCOME_PROBABILITIES,
  LOOKS_LABELS,
  LOOKS_PROBABILITIES,
  NON_SMOKER_PROBABILITY,
  NOT_BALD_PROBABILITY_MALE,
  UNMARRIED_POPULATION_10K,
  type AgeRange,
  type AssetLevel,
  type EducationLevel,
  type Gender,
  type HeightLevel,
  type IncomeLevel,
  type LooksLevel,
} from "@/data/statistics";

export interface Conditions {
  gender: Gender;
  age: AgeRange;
  income: IncomeLevel;
  asset: AssetLevel;
  height: HeightLevel;
  education: EducationLevel;
  nonSmoker: boolean;
  notBald: boolean;
  looks: LooksLevel;
}

export interface BreakdownStep {
  label: string;
  count: number;
  probability: number;
}

export interface FermiResult {
  count: number;
  population: number;
  ratio: number;
  perPrefecture: number;
  breakdown: BreakdownStep[];
  badge: {
    label: string;
    tier: "abundant" | "plenty" | "narrowed" | "rare" | "very_rare" | "ultra_rare" | "legendary";
  };
}

const POPULATION_MULTIPLIER = 10_000;

const BADGES: Array<{
  min: number;
  tier: FermiResult["badge"]["tier"];
  label: string;
}> = [
  { min: 1_000_000, tier: "abundant", label: "余裕あり 🎉" },
  { min: 100_000, tier: "plenty", label: "選択肢は豊富 😌" },
  { min: 10_000, tier: "narrowed", label: "絞り込まれてきた 🔍" },
  { min: 1_000, tier: "rare", label: "レア度UP ⚠️" },
  { min: 100, tier: "very_rare", label: "激レア 💎" },
  { min: 10, tier: "ultra_rare", label: "超激レア 🦄" },
  { min: 0, tier: "legendary", label: "天然記念物レベル - 発見したら国に届け出を 😇" },
];

function withStep(steps: BreakdownStep[], label: string, currentCount: number, probability: number): number {
  const nextCount = Math.round(currentCount * probability);
  steps.push({
    label,
    count: nextCount,
    probability,
  });
  return nextCount;
}

function resolveHeightProbability(gender: Gender, height: HeightLevel): number {
  if (height === "none") return 1;
  return gender === "male" ? HEIGHT_PROBABILITIES_MALE[height] : HEIGHT_PROBABILITIES_FEMALE[height];
}

function resolveHeightLabel(gender: Gender, height: HeightLevel): string {
  return HEIGHT_LABELS[height];
}

function resolveBadge(count: number): FermiResult["badge"] {
  const found = BADGES.find((badge) => count >= badge.min) ?? BADGES[BADGES.length - 1];
  return { tier: found.tier, label: found.label };
}

export function defaultConditions(): Conditions {
  return {
    gender: "male",
    age: "25-29",
    income: "none",
    asset: "none",
    height: "none",
    education: "none",
    nonSmoker: false,
    notBald: false,
    looks: "none",
  };
}

export function estimate(conditions: Conditions): FermiResult {
  const population = UNMARRIED_POPULATION_10K[conditions.gender][conditions.age] * POPULATION_MULTIPLIER;
  const breakdown: BreakdownStep[] = [
    {
      label: `${AGE_LABELS[conditions.age]}${GENDER_LABELS[conditions.gender]}・未婚`,
      count: population,
      probability: 1,
    },
  ];

  let count = population;

  if (conditions.income !== "none") {
    count = withStep(
      breakdown,
      `年収 ${INCOME_LABELS[conditions.income]}`,
      count,
      INCOME_PROBABILITIES[conditions.income],
    );
  }

  if (conditions.asset !== "none") {
    count = withStep(
      breakdown,
      `金融資産 ${ASSET_LABELS[conditions.asset]}`,
      count,
      ASSET_PROBABILITIES[conditions.asset],
    );
  }

  if (conditions.height !== "none") {
    count = withStep(
      breakdown,
      `身長 ${resolveHeightLabel(conditions.gender, conditions.height)}`,
      count,
      resolveHeightProbability(conditions.gender, conditions.height),
    );
  }

  if (conditions.education !== "none") {
    count = withStep(
      breakdown,
      `学歴 ${EDUCATION_LABELS[conditions.education]}`,
      count,
      EDUCATION_PROBABILITIES[conditions.education],
    );
  }

  if (conditions.nonSmoker) {
    count = withStep(breakdown, "非喫煙", count, NON_SMOKER_PROBABILITY);
  }

  if (conditions.notBald) {
    const probability = conditions.gender === "male" ? NOT_BALD_PROBABILITY_MALE : 1;
    count = withStep(breakdown, "薄毛でない", count, probability);
  }

  if (conditions.looks !== "none") {
    count = withStep(
      breakdown,
      `容姿 ${LOOKS_LABELS[conditions.looks]}`,
      count,
      LOOKS_PROBABILITIES[conditions.looks],
    );
  }

  const finalCount = Math.max(1, count);

  return {
    count: finalCount,
    population,
    ratio: finalCount / population,
    perPrefecture: finalCount / 47,
    breakdown,
    badge: resolveBadge(finalCount),
  };
}
