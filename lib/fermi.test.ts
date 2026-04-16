import { describe, expect, it } from "vitest";

import {
  ASSET_PROBABILITIES_BY_AGE,
  EDUCATION_PROBABILITIES_BY_AGE,
  INCOME_PROBABILITIES_BY_AGE_FEMALE,
  INCOME_PROBABILITIES_BY_AGE_MALE,
  type AgeRange,
} from "@/data/statistics";
import { defaultConditions, estimate } from "@/lib/fermi";

describe("estimate", () => {
  it("returns the unmarried population itself when all conditions are unspecified", () => {
    const result = estimate(defaultConditions());

    expect(result.population).toBe(2_200_000);
    expect(result.count).toBe(result.population);
    expect(result.breakdown).toHaveLength(1);
  });

  it("uses the default male 25-29 population", () => {
    const result = estimate(defaultConditions());

    expect(result.population).toBe(220 * 10_000);
  });

  it("applies the male 25-29 income probability for over_600", () => {
    const result = estimate({
      gender: "male",
      age: "25-29",
      income: "over_600",
      asset: "none",
      height: "none",
      education: "none",
      nonSmoker: false,
      notBald: false,
      looks: "none",
    });

    expect(result.count).toBeCloseTo(2_200_000 * 0.07, -3);
    expect(result.breakdown.at(-1)?.probability).toBe(0.07);
  });

  it("changes the income pass rate by age for the same income condition", () => {
    const result = estimate({
      gender: "male",
      age: "35-39",
      income: "over_600",
      asset: "none",
      height: "none",
      education: "none",
      nonSmoker: false,
      notBald: false,
      looks: "none",
    });

    expect(result.population).toBe(1_310_000);
    expect(result.count).toBeCloseTo(1_310_000 * 0.3, -3);
    expect(result.breakdown.at(-1)?.probability).toBe(0.3);
  });

  it("applies the income-asset correlation boost when both are selected", () => {
    const result = estimate({
      gender: "male",
      age: "25-29",
      income: "over_600",
      asset: "over_500",
      height: "none",
      education: "none",
      nonSmoker: false,
      notBald: false,
      looks: "none",
    });

    expect(result.breakdown).toHaveLength(3);
    expect(result.breakdown[1]?.probability).toBe(0.07);
    expect(result.breakdown[2]?.probability).toBeCloseTo(0.16 * 1.3);
    expect(result.count).toBeCloseTo(2_200_000 * 0.07 * 0.208, -2);
  });

  it("uses a different female income table than male", () => {
    const female = estimate({
      gender: "female",
      age: "30-34",
      income: "over_600",
      asset: "none",
      height: "none",
      education: "none",
      nonSmoker: false,
      notBald: false,
      looks: "none",
    });
    const male = estimate({
      gender: "male",
      age: "30-34",
      income: "over_600",
      asset: "none",
      height: "none",
      education: "none",
      nonSmoker: false,
      notBald: false,
      looks: "none",
    });

    expect(female.count).toBeCloseTo(1_220_000 * 0.055, -2);
    expect(male.count).toBeCloseTo(1_580_000 * 0.18, -2);
    expect(female.breakdown.at(-1)?.probability).toBe(0.055);
    expect(female.count).not.toBe(male.count);
  });

  it("switches height probabilities by gender", () => {
    const male = estimate({
      ...defaultConditions(),
      gender: "male",
      height: "over_170",
    });
    const female = estimate({
      ...defaultConditions(),
      gender: "female",
      age: "25-29",
      height: "over_170",
    });

    expect(male.breakdown.at(-1)?.probability).toBe(0.65);
    expect(male.count).toBe(1_430_000);
    expect(female.breakdown.at(-1)?.probability).toBe(0.05);
    expect(female.count).toBe(91_500);
  });

  it("uses the age-based education table", () => {
    const age2529 = estimate({
      ...defaultConditions(),
      age: "25-29",
      education: "march",
    });
    const age4549 = estimate({
      ...defaultConditions(),
      age: "45-49",
      education: "march",
    });

    expect(age2529.breakdown.at(-1)?.probability).toBe(0.11);
    expect(age2529.count).toBe(242_000);
    expect(age4549.breakdown.at(-1)?.probability).toBe(0.08);
    expect(age4549.count).toBe(114_400);
  });

  it("never returns less than one person", () => {
    const result = estimate({
      gender: "male",
      age: "20-24",
      income: "over_1000",
      asset: "over_5000",
      height: "over_180",
      education: "kyuutei",
      nonSmoker: true,
      notBald: true,
      looks: "top5",
    });

    expect(result.count).toBe(1);
  });

  it("keeps badge thresholds working with the new tables", () => {
    expect(estimate({ ...defaultConditions() }).badge.tier).toBe("abundant");
    expect(estimate({ ...defaultConditions(), income: "over_500" }).badge.tier).toBe("plenty");
    expect(estimate({ ...defaultConditions(), income: "over_800" }).badge.tier).toBe("narrowed");
    expect(estimate({ ...defaultConditions(), income: "over_1000" }).badge.tier).toBe("rare");
    expect(
      estimate({ ...defaultConditions(), age: "35-39", income: "over_1000", education: "soukei" }).badge.tier,
    ).toBe("very_rare");
    expect(
      estimate({ ...defaultConditions(), age: "25-29", income: "over_1000", education: "soukei" }).badge.tier,
    ).toBe("ultra_rare");
    expect(
      estimate({
        ...defaultConditions(),
        age: "25-29",
        income: "over_1000",
        education: "kyuutei",
        looks: "top5",
      }).badge.tier,
    ).toBe("legendary");
  });

  it("ignores notBald for female conditions", () => {
    const base = estimate({
      ...defaultConditions(),
      gender: "female",
      age: "25-29",
      income: "over_500",
    });
    const withNotBald = estimate({
      ...defaultConditions(),
      gender: "female",
      age: "25-29",
      income: "over_500",
      notBald: true,
    });

    expect(withNotBald.count).toBe(base.count);
    expect(withNotBald.breakdown.at(-1)?.probability).toBe(1);
  });

  it("has entries for every age key across all age-based tables", () => {
    const ages: AgeRange[] = ["20-24", "25-29", "30-34", "35-39", "40-44", "45-49"];

    for (const age of ages) {
      expect(INCOME_PROBABILITIES_BY_AGE_MALE[age]).toBeDefined();
      expect(INCOME_PROBABILITIES_BY_AGE_FEMALE[age]).toBeDefined();
      expect(ASSET_PROBABILITIES_BY_AGE[age]).toBeDefined();
      expect(EDUCATION_PROBABILITIES_BY_AGE[age]).toBeDefined();
    }
  });

  it("shows the same fully-filtered condition changes ratio by age and trends upward through 35-39", () => {
    const ages: AgeRange[] = ["20-24", "25-29", "30-34", "35-39"];
    const results = ages.map((age) =>
      estimate({
        gender: "male",
        age,
        income: "over_600",
        asset: "over_500",
        height: "over_170",
        education: "bachelor",
        nonSmoker: true,
        notBald: false,
        looks: "none",
      }),
    );

    console.log(
      "age-trend",
      results.map((result, index) => ({
        age: ages[index],
        count: result.count,
        ratio: result.ratio,
      })),
    );

    expect(results[0]!.ratio).toBeLessThan(results[1]!.ratio);
    expect(results[1]!.ratio).toBeLessThan(results[2]!.ratio);
    expect(results[2]!.ratio).toBeLessThan(results[3]!.ratio);
  });
});
