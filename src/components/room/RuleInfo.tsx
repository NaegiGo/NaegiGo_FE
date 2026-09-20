import type { ReactNode } from "react";
import { Card } from "@/components/common/Card";

export type RuleInfoRow = {
  label: string;
  value: ReactNode;
};

/** 목표·기간·요일 같은 규칙을 라벨/값 표로 보여준다. */
export function RuleInfo({ rows }: { rows: RuleInfoRow[] }) {
  return (
    <Card className="px-[18px] py-1">
      <dl>
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={[
              "flex items-baseline gap-4 py-3",
              index > 0 && "border-t border-border",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <dt className="w-16 shrink-0 text-caption text-foreground-secondary">
              {row.label}
            </dt>
            <dd className="flex-1 text-body text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
