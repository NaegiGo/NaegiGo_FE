import type { ReactNode } from "react";

type BottomBarProps = {
  children: ReactNode;
  /** soft는 본문과 톤을 구분해야 하는 화면(예: 규칙 수정)에서 쓴다. */
  surface?: "default" | "soft";
};

/** 화면 하단에 고정되는 CTA 영역. */
export function BottomBar({ children, surface = "default" }: BottomBarProps) {
  return (
    <div
      className={[
        "sticky bottom-0 shrink-0 px-5 pt-3",
        "pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
        surface === "soft" ? "bg-surface-muted" : "bg-background",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
