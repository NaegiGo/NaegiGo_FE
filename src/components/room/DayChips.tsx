"use client";

import { WEEKDAY_LABELS } from "@/types/room";
import { cn } from "@/utils/cn";

type DayChipsProps = {
  /** 선택된 요일 인덱스 목록 (0=월 ~ 6=일) */
  value: number[];
  onChange: (value: number[]) => void;
};

export function DayChips({ value, onChange }: DayChipsProps) {
  const toggle = (day: number) => {
    onChange(
      value.includes(day)
        ? value.filter((selected) => selected !== day)
        : [...value, day].sort((a, b) => a - b),
    );
  };

  return (
    <div className="flex gap-1.5">
      {WEEKDAY_LABELS.map((label, day) => {
        const selected = value.includes(day);

        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(day)}
            className={cn(
              "focus-ring flex h-10 flex-1 items-center justify-center rounded-[10px] border text-body transition",
              selected
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-border bg-background text-foreground-secondary",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
