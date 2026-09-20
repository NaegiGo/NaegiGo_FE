import type { ReactNode } from "react";

type BottomBarProps = {
  children: ReactNode;
  /** soft는 본문과 톤을 구분해야 하는 화면(예: 규칙 수정)에서 쓴다. */
  surface?: "default" | "soft";
};

/**
 * 화면 하단에 고정되는 CTA 영역.
 *
 * 바 전체가 위로 갈수록 투명해지는 그라데이션이고, 버튼은 그 위에 얹힌다.
 * 버튼이 반투명하면 뒤 그라데이션이 비쳐 보이므로
 * 버튼은 비활성 상태에서도 불투명한 단색이어야 한다. (Button 참고)
 */
export function BottomBar({ children, surface = "default" }: BottomBarProps) {
  const gradientClass =
    surface === "soft"
      ? "from-surface-muted to-surface-muted/0"
      : "from-background to-background/0";

  return (
    <div
      className={[
        "sticky bottom-0 shrink-0 px-5 pt-3",
        "pb-[calc(1.25rem+env(safe-area-inset-bottom))]",
        // 아래에서 위로 배경색이 옅어진다. from-35%까지는 단색을 유지해
        // 버튼 아래쪽이 확실히 가려지게 한다.
        "bg-linear-to-t from-50%",
        gradientClass,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
