"use client";

import { useId } from "react";
import { cn } from "@/utils/cn";

type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

type SegmentedProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** 스크린리더용 그룹 이름 */
  label: string;
};

/**
 * 네이티브 라디오를 숨겨서 쓴다.
 * 화살표 키 이동과 탭 정지점 하나만 두는 동작을 브라우저가 처리한다.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedProps<T>) {
  const name = useId();

  return (
    <fieldset className="grid auto-cols-fr grid-flow-col gap-1 rounded-md bg-surface-muted p-1">
      <legend className="sr-only">{label}</legend>

      {options.map((option) => {
        const selected = option.value === value;

        return (
          <label
            key={option.value}
            className={cn(
              "focus-ring-within flex h-10 cursor-pointer items-center justify-center rounded-sm text-body transition",
              selected
                ? "bg-background font-semibold text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(0,0,0,0.04)]"
                : "text-foreground-dim",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        );
      })}
    </fieldset>
  );
}
