"use client";

import { useState } from "react";
import CheckIcon from "@/assets/icons/check.svg";
import { ScreenBody } from "@/components/common/AppShell";
import { BottomBar } from "@/components/common/BottomBar";
import { Button } from "@/components/common/Button";
import { Chip } from "@/components/common/Chip";
import { PenaltyCard } from "@/components/room/PenaltyCard";
import { RoomRules } from "@/components/room/RoomRules";
import type { RoomDetail } from "@/types/room";

/** 시작 전 · 참여자 · 아직 참여를 확정하지 않은 상태 */
export function JoinConfirmForm({ room }: { room: RoomDetail }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: 참여 확정 모달 띄우기 (다음 작업)
      }}
    >
      <ScreenBody className="flex flex-col gap-4 pt-1">
        <Chip tone="pending" className="self-start">
          시작 전 · D-{room.remainingDays}
        </Chip>

        <RoomRules room={room} withHost />
        <PenaltyCard>{room.penalty}</PenaltyCard>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            // peer-checked는 형제에만 걸리므로, 자손인 체크 아이콘은
            // 부모에서 [&>svg]로 겨냥한다.
            className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-[6px] border border-border-strong peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:opacity-100 peer-focus-visible:shadow-focus"
          >
            <CheckIcon className="size-3.5 text-primary-foreground opacity-0" />
          </span>
          <span className="text-body">
            기간과 벌칙을 <strong className="font-semibold">확인</strong>했고,
            <br />
            지키지 못하면 벌칙을 받기로{" "}
            <strong className="font-semibold">동의</strong>합니다.
          </span>
        </label>
      </ScreenBody>

      <BottomBar>
        <Button type="submit" block disabled={!agreed}>
          참여 확정하기
        </Button>
      </BottomBar>
    </form>
  );
}
