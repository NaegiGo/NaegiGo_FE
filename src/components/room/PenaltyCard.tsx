import type { ReactNode } from "react";
import FlagIcon from "@/assets/icons/flag.svg";
import { Card } from "@/components/common/Card";

/** 벌칙을 강조해서 보여주는 어두운 카드 */
export function PenaltyCard({ children }: { children: ReactNode }) {
  return (
    <Card variant="dark" className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-surface-dark-secondary">
        <FlagIcon className="size-4" aria-hidden="true" />
        <span className="text-caption font-semibold">벌칙</span>
      </div>
      <p className="text-body-lg font-semibold">{children}</p>
    </Card>
  );
}
