import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ChipTone = "active" | "pending" | "ended" | "warn" | "danger" | "host";

const TONE_CLASS: Record<ChipTone, string> = {
  active: "bg-success-muted text-success",
  pending: "bg-primary-muted text-primary",
  ended: "bg-surface-muted text-foreground-secondary",
  warn: "bg-warning-muted text-warning-foreground",
  danger: "bg-danger-muted text-danger",
  host: "bg-host-muted text-host-foreground",
};

type ChipProps = {
  tone?: ChipTone;
  /** 앞에 상태를 나타내는 점을 찍는다. (진행 중 등) */
  withDot?: boolean;
  children: ReactNode;
  className?: string;
};

export function Chip({
  tone = "ended",
  withDot = false,
  children,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1.5 rounded-full px-2.5 text-caption font-semibold leading-none whitespace-nowrap",
        TONE_CLASS[tone],
        className,
      )}
    >
      {withDot && (
        <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
