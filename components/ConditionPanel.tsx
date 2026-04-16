"use client";

import type { ReactNode } from "react";

import {
  AGE_LABELS,
  ASSET_LABELS,
  EDUCATION_LABELS,
  GENDER_LABELS,
  HEIGHT_LABELS,
  INCOME_LABELS,
  LOOKS_LABELS,
  type Gender,
} from "@/data/statistics";
import { type Conditions } from "@/lib/fermi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ConditionPanelProps {
  conditions: Conditions;
  onChange: (conditions: Conditions) => void;
  onReset: () => void;
}

const GENDERS: Gender[] = ["male", "female"];
const AGES = Object.keys(AGE_LABELS) as Array<keyof typeof AGE_LABELS>;
const INCOMES = Object.keys(INCOME_LABELS) as Array<keyof typeof INCOME_LABELS>;
const ASSETS = Object.keys(ASSET_LABELS) as Array<keyof typeof ASSET_LABELS>;
const EDUCATIONS = Object.keys(EDUCATION_LABELS) as Array<keyof typeof EDUCATION_LABELS>;
const LOOKS = Object.keys(LOOKS_LABELS) as Array<keyof typeof LOOKS_LABELS>;

export function ConditionPanel({ conditions, onChange, onReset }: ConditionPanelProps) {
  const heights = Object.keys(HEIGHT_LABELS) as Array<keyof typeof HEIGHT_LABELS>;

  const update = <K extends keyof Conditions>(key: K, value: Conditions[K]) => {
    onChange({ ...conditions, [key]: value });
  };

  return (
    <Card className="min-w-0">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>条件を選ぶ</CardTitle>
          <Button variant="ghost" className="px-4" onClick={onReset}>
            リセット
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Label>性別</Label>
          <RadioGroup
            value={conditions.gender}
            onValueChange={(value) => update("gender", value as Gender)}
            className="grid grid-cols-2 gap-4"
          >
            {GENDERS.map((gender) => (
              <RadioGroupItem key={gender} value={gender} aria-label={GENDER_LABELS[gender]}>
                {GENDER_LABELS[gender]}
              </RadioGroupItem>
            ))}
          </RadioGroup>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="年齢">
            <Select value={conditions.age} onValueChange={(value) => update("age", value as Conditions["age"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AGES.map((age) => (
                  <SelectItem key={age} value={age}>
                    {AGE_LABELS[age]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="年収">
            <Select
              value={conditions.income}
              onValueChange={(value) => update("income", value as Conditions["income"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {INCOMES.map((income) => (
                  <SelectItem key={income} value={income}>
                    {INCOME_LABELS[income]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="資産">
            <Select value={conditions.asset} onValueChange={(value) => update("asset", value as Conditions["asset"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ASSETS.map((asset) => (
                  <SelectItem key={asset} value={asset}>
                    {ASSET_LABELS[asset]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="身長">
            <Select
              value={conditions.height}
              onValueChange={(value) => update("height", value as Conditions["height"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {heights.map((height) => (
                  <SelectItem key={height} value={height}>
                    {HEIGHT_LABELS[height]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="学歴">
            <Select
              value={conditions.education}
              onValueChange={(value) => update("education", value as Conditions["education"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EDUCATIONS.map((education) => (
                  <SelectItem key={education} value={education}>
                    {EDUCATION_LABELS[education]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="容姿">
            <Select value={conditions.looks} onValueChange={(value) => update("looks", value as Conditions["looks"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOOKS.map((looks) => (
                  <SelectItem key={looks} value={looks}>
                    {LOOKS_LABELS[looks]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="space-y-4">
          <ToggleRow
            label="非喫煙"
            checked={conditions.nonSmoker}
            onCheckedChange={(checked) => update("nonSmoker", checked)}
          />
          <ToggleRow
            label="薄毛でない"
            checked={conditions.notBald}
            onCheckedChange={(checked) => update("notBald", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center justify-between rounded-md border border-[rgba(8,19,26,0.14)] bg-white px-4 py-3">
      <span className="text-[16px] font-semibold leading-[1.5] text-[#08131a]">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  );
}
