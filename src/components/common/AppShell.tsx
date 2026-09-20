import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

/**
 * 화면 전체를 감싸는 프레임.
 * 모바일에서는 화면 전체를, 데스크탑에서는 390px 폭으로 가운데 정렬한다.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh justify-center bg-surface-muted">
      <div className="flex w-full max-w-[390px] flex-col bg-background tracking-[-0.014em]">
        {children}
      </div>
    </div>
  );
}

type ScreenBodyProps = {
  children: ReactNode;
  className?: string;
};

/** 좌우 여백이 들어가는 본문 영역. NavHeader/BottomBar는 여백 밖에 둔다. */
export function ScreenBody({ children, className }: ScreenBodyProps) {
  return (
    <main className={["flex-1 px-5 pb-6", className].filter(Boolean).join(" ")}>
      {children}
    </main>
  );
}
