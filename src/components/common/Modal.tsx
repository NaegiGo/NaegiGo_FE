"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/utils/cn";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** 제목 아래 설명 */
  description?: ReactNode;
  /** 설명과 액션 사이에 들어가는 추가 내용 (예: 벌칙 카드) */
  children?: ReactNode;
  /** 하단 버튼 영역 */
  actions?: ReactNode;
  className?: string;
};

/**
 * 확인용 모달.
 * 네이티브 <dialog>를 써서 포커스 가두기와 Esc 닫기를 브라우저에 맡긴다.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useScrollLock(open);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Esc·딤 클릭·프로그램적 close 등 모든 닫힘이 close 이벤트로 모인다.
      onClose={onClose}
      onClick={(event) => {
        // 시트 바깥(딤) 클릭으로 닫기
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      className={cn(
        "m-auto w-[calc(100%-40px)] max-w-[350px] bg-transparent p-0 text-foreground",
        "backdrop:bg-scrim backdrop:backdrop-blur-[2px]",
        className,
      )}
    >
      <div className="flex flex-col gap-3 rounded-xl bg-background px-[22px] pt-6 pb-5 shadow-pop">
        <div className="flex flex-col gap-1 text-center">
          <h2 id={titleId} className="text-title-sm">
            {title}
          </h2>
          {description != null && (
            <p className="mt-1 text-body text-foreground-secondary">
              {description}
            </p>
          )}
        </div>

        {children}

        {actions != null && <div className="mt-2 flex gap-2.5">{actions}</div>}
      </div>
    </dialog>
  );
}
