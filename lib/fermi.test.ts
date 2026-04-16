import { describe, expect, it } from "vitest";

import { defaultConditions, estimate } from "@/lib/fermi";

describe("estimate", () => {
  it("returns the unmarried population itself when all conditions are unspecified", () => {
    const result = estimate(defaultConditions());

    expect(result.population).toBe(2_200_000);
    expect(result.count).toBe(2_200_000);
    expect(result.breakdown).toHaveLength(1);
  });

  it("multiplies probabilities across conditions", () => {
    const result = estimate({
      ...defaultConditions(),
      income: "over_500",
      height: "over_175",
    });

    expect(result.count).toBe(203_280);
    expect(result.breakdown.at(-1)?.count).toBe(203_280);
  });

  it("applies the under_300 income probability", () => {
    const result = estimate({
      ...defaultConditions(),
      income: "under_300",
    });

    expect(result.count).toBe(660_000);
    expect(result.breakdown.at(-1)?.probability).toBe(0.3);
  });

  it("applies the under_300 asset probability", () => {
    const result = estimate({
      ...defaultConditions(),
      asset: "under_300",
    });

    expect(result.count).toBe(1_210_000);
    expect(result.breakdown.at(-1)?.probability).toBe(0.55);
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

  it("applies the new education probabilities", () => {
    const march = estimate({
      ...defaultConditions(),
      education: "march",
    });
    const kyuutei = estimate({
      ...defaultConditions(),
      education: "kyuutei",
    });

    expect(march.breakdown.at(-1)?.probability).toBe(0.1);
    expect(march.count).toBe(220_000);
    expect(kyuutei.breakdown.at(-1)?.probability).toBe(0.015);
    expect(kyuutei.count).toBe(33_000);
  });

  it("never returns less than one person", () => {
    const result = estimate({
      gender: "male",
      age: "45-49",
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

  it("changes badge at threshold values", () => {
    expect(estimate({ ...defaultConditions(), age: "25-29" }).badge.tier).toBe("abundant");
    expect(estimate({ ...defaultConditions(), age: "45-49", income: "over_500" }).badge.tier).toBe("plenty");
    expect(estimate({ ...defaultConditions(), age: "40-44", income: "over_1000" }).badge.tier).toBe("narrowed");
    expect(
      estimate({
        ...defaultConditions(),
        age: "40-44",
        income: "over_1000",
        asset: "over_5000",
      }).badge.tier,
    ).toBe("rare");
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        asset: "over_5000",
        looks: "top5",
      }).badge.tier,
    ).toBe("very_rare");
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        education: "soukei",
        nonSmoker: true,
        looks: "top5",
      }).badge.tier,
    ).toBe("ultra_rare");
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        education: "kyuutei",
        height: "over_180",
        looks: "top5",
      }).badge.tier,
    ).toBe("legendary");
  });

  it("applies exact threshold values to the expected badge tiers", () => {
    expect(estimate({ ...defaultConditions(), age: "25-29" }).count).toBeGreaterThanOrEqual(1_000_000);
    expect(estimate({ ...defaultConditions(), age: "45-49", income: "over_500" }).count).toBeGreaterThanOrEqual(100_000);
    expect(estimate({ ...defaultConditions(), age: "40-44", income: "over_1000" }).count).toBeGreaterThanOrEqual(10_000);
    expect(
      estimate({
        ...defaultConditions(),
        age: "40-44",
        income: "over_1000",
        asset: "over_5000",
      }).count,
    ).toBeGreaterThanOrEqual(1_000);
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        asset: "over_5000",
        looks: "top5",
      }).count,
    ).toBeGreaterThanOrEqual(100);
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        education: "soukei",
        nonSmoker: true,
        looks: "top5",
      }).count,
    ).toBeGreaterThanOrEqual(10);
    expect(
      estimate({
        ...defaultConditions(),
        age: "45-49",
        income: "over_1000",
        education: "kyuutei",
        height: "over_180",
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
});
