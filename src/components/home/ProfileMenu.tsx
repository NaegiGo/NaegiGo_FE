"use client";

import Link from "next/link";
import { useState } from "react";
import LeaveIcon from "@/assets/icons/leave.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import { Avatar } from "@/components/common/Avatar";
import { useEscapeKey } from "@/hooks/useEscapeKey";

const ITEM_CLASS =
  "focus-ring flex w-full items-center gap-3 rounded-md px-3.5 py-3 text-left text-body hover:bg-surface-muted";

type ProfileMenuProps = {
  name: string;
};

export function ProfileMenu({ name }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEscapeKey(open, close);

  return (
    <div className="relative">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/70"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="내 프로필"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "focus-ring relative rounded-full",
          // 메뉴가 열렸을 때만 딤 위로 올린다.
          // 항상 올리면 FAB를 열었을 때 아바타만 안 흐려진다.
          open && "z-40 ring-[3px] ring-primary-muted",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Avatar name={name} size="lg" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-40 mt-2 w-60 overflow-hidden rounded-lg border border-border bg-background shadow-pop"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 pt-4 pb-3.5">
            <Avatar name={name} size="lg" />
            <div className="flex flex-col gap-1">
              <span className="text-body-lg font-semibold">{name}</span>
              <span className="text-caption text-foreground-secondary">
                카카오로 로그인
              </span>
            </div>
          </div>

          <div className="p-1.5">
            <Link
              href="/name/edit"
              role="menuitem"
              className={ITEM_CLASS}
              onClick={close}
            >
              <PencilIcon
                className="size-[18px] text-foreground-dim"
                aria-hidden="true"
              />
              이름 수정
            </Link>
            {/* TODO: 로그인 기능 붙은 뒤 실제 로그아웃 연결 */}
            <button
              type="button"
              role="menuitem"
              className={`${ITEM_CLASS} text-danger`}
              onClick={close}
            >
              <LeaveIcon className="size-[18px]" aria-hidden="true" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
