import {
  type AgeRange,
  type AssetLevel,
  type EducationLevel,
  type Gender,
  type HeightLevel,
  type IncomeLevel,
  type LooksLevel,
} from "@/data/statistics";
import { defaultConditions, type Conditions } from "@/lib/fermi";

const VALID = {
  g: ["male", "female"] as Gender[],
  age: ["20-24", "25-29", "30-34", "35-39", "40-44", "45-49"] as AgeRange[],
  income: [
    "none",
    "under_300",
    "over_300",
    "over_400",
    "over_500",
    "over_600",
    "over_700",
    "over_800",
    "over_1000",
  ] as IncomeLevel[],
  asset: [
    "none",
    "under_300",
    "over_300",
    "over_500",
    "over_1000",
    "over_2000",
    "over_3000",
    "over_5000",
  ] as AssetLevel[],
  height: [
    "none",
    "under_160",
    "over_160",
    "over_165",
    "over_168",
    "over_170",
    "over_173",
    "over_175",
    "over_178",
    "over_180",
  ] as HeightLevel[],
  edu: ["none", "bachelor", "march", "soukei", "kyuutei"] as EducationLevel[],
  looks: ["none", "above_avg", "top30", "top10", "top5"] as LooksLevel[],
};

function isValidValue<T extends string>(value: string | null, allowed: readonly T[]): value is T {
  return value !== null && allowed.includes(value as T);
}

function parseBoolean(value: string | null): boolean | undefined {
  if (value === "1" || value === "true") return true;
  if (value === "0" || value === "false") return false;
  return undefined;
}

export function toQueryString(c: Conditions): string {
  const defaults = defaultConditions();
  const params = new URLSearchParams();

  if (c.gender !== defaults.gender) params.set("g", c.gender);
  if (c.age !== defaults.age) params.set("age", c.age);
  if (c.income !== defaults.income) params.set("income", c.income);
  if (c.asset !== defaults.asset) params.set("asset", c.asset);
  if (c.height !== defaults.height) params.set("height", c.height);
  if (c.education !== defaults.education) params.set("edu", c.education);
  if (c.nonSmoker !== defaults.nonSmoker) params.set("ns", c.nonSmoker ? "1" : "0");
  if (c.notBald !== defaults.notBald) params.set("nb", c.notBald ? "1" : "0");
  if (c.looks !== defaults.looks) params.set("looks", c.looks);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function parseQueryString(query: string): Partial<Conditions> {
  const normalized = query.startsWith("?") ? query.slice(1) : query;
  const params = new URLSearchParams(normalized);
  const parsed: Partial<Conditions> = {};

  if (isValidValue(params.get("g"), VALID.g)) parsed.gender = params.get("g") as Gender;
  if (isValidValue(params.get("age"), VALID.age)) parsed.age = params.get("age") as AgeRange;
  if (isValidValue(params.get("income"), VALID.income)) parsed.income = params.get("income") as IncomeLevel;
  if (isValidValue(params.get("asset"), VALID.asset)) parsed.asset = params.get("asset") as AssetLevel;
  if (isValidValue(params.get("height"), VALID.height)) parsed.height = params.get("height") as HeightLevel;
  if (isValidValue(params.get("edu"), VALID.edu)) parsed.education = params.get("edu") as EducationLevel;
  if (isValidValue(params.get("looks"), VALID.looks)) parsed.looks = params.get("looks") as LooksLevel;

  const nonSmoker = parseBoolean(params.get("ns"));
  const notBald = parseBoolean(params.get("nb"));
  if (typeof nonSmoker === "boolean") parsed.nonSmoker = nonSmoker;
  if (typeof notBald === "boolean") parsed.notBald = notBald;

  return parsed;
}
