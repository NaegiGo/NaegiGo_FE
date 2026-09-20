"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/assets/icons/back.svg";

type NavHeaderProps = {
  /** 가운데 정렬되는 화면 제목 */
  title?: ReactNode;
  /** 왼쪽에 뒤로가기 버튼을 둔다. left보다 우선한다. */
  back?: boolean;
  /** 뒤로가기 대신 쓸 왼쪽 액션 (예: 취소) */
  left?: ReactNode;
  /** 오른쪽 액션 (예: 수정, 저장) */
  right?: ReactNode;
};

export function NavHeader({
  title,
  back = false,
  left,
  right,
}: NavHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-11 shrink-0 items-center bg-background px-2">
      {back ? (
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => router.back()}
          className="flex size-11 items-center justify-center text-primary"
        >
          <BackIcon className="size-6" />
        </button>
      ) : (
        left
      )}

      {title != null && (
        <h1 className="pointer-events-none absolute left-1/2 flex h-11 max-w-[60%] -translate-x-1/2 items-center truncate text-body-lg font-semibold">
          {title}
        </h1>
      )}

      <div className="ml-auto flex items-center gap-1">{right}</div>
    </header>
  );
}
