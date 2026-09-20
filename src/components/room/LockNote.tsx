import type { ReactNode } from "react";
import LockIcon from "@/assets/icons/lock.svg";

/** 자물쇠 아이콘과 함께 보여주는 작은 안내 문구 */
export function LockNote({ children }: { children: ReactNode }) {
  return (
    <p className="-mt-2 flex items-center gap-1.5 pl-1 text-caption text-foreground-secondary">
      <LockIcon className="size-3 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
