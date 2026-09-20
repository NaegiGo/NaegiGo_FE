"use client";

import Link from "next/link";
import { useState } from "react";
import CloseIcon from "@/assets/icons/close-md.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const ACTION_CLASS =
  "focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-background px-5 text-body font-semibold whitespace-nowrap shadow-[0_8px_24px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.04)]";

export function HomeFab() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEscapeKey(open, close);

  return (
    <>
      {open && (
        // 바깥 클릭으로 닫기. 동시에 뒤 내용을 흐리게 덮는다.
        <div
          className="fixed inset-0 z-30 bg-background/70"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* 셸과 같은 폭으로 잡아 데스크탑에서도 카드 오른쪽 끝에 붙는다. */}
      {/* 레이어: 닫힌 FAB z-20 < 딤 z-30 < 열린 오버레이 z-40.
          닫힌 FAB가 z-30을 넘으면 프로필 메뉴를 연 상태에서도 눌린다. */}
      <div
        className={[
          "pointer-events-none fixed inset-x-0 bottom-8 mx-auto flex w-full max-w-[390px] flex-col items-end gap-3 px-5",
          open ? "z-40" : "z-20",
        ].join(" ")}
      >
        {open && (
          <>
            <Link
              href="/rooms/join"
              className={`pointer-events-auto ${ACTION_CLASS}`}
              onClick={close}
            >
              방 코드로 참여
            </Link>
            <Link
              href="/rooms/new"
              className={`pointer-events-auto ${ACTION_CLASS}`}
              onClick={close}
            >
              새 방 만들기
            </Link>
          </>
        )}

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "방 추가 메뉴 닫기" : "방 추가 메뉴 열기"}
          onClick={() => setOpen((prev) => !prev)}
          className={[
            "focus-ring pointer-events-auto inline-flex size-14 items-center justify-center rounded-full text-white shadow-fab transition",
            open ? "mt-1.5 bg-foreground" : "bg-primary",
          ].join(" ")}
        >
          {open ? (
            <CloseIcon className="size-[22px]" />
          ) : (
            <PlusIcon className="size-6" />
          )}
        </button>
      </div>
    </>
  );
}
