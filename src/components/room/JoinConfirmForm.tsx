"use client";

import { useState } from "react";
import CheckIcon from "@/assets/icons/check.svg";
import FlagIcon from "@/assets/icons/flag.svg";
import { ScreenBody } from "@/components/common/AppShell";
import { BottomBar } from "@/components/common/BottomBar";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Chip } from "@/components/common/Chip";
import { Modal } from "@/components/common/Modal";
import { PenaltyCard } from "@/components/room/PenaltyCard";
import { RoomRules } from "@/components/room/RoomRules";
import type { RoomDetail } from "@/types/room";

/** 시작 전 · 참여자 · 아직 참여를 확정하지 않은 상태 */
export function JoinConfirmForm({ room }: { room: RoomDetail }) {
  const [agreed, setAgreed] = useState(false);
  const [confirming, setConfirming] = useState(false);

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        setConfirming(true);
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

      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title="정말 참여하시겠어요?"
        description={
          <>
            확정 후엔 취소할 수 없고,
            <br />
            종료 시점에 꼴찌가 되면{" "}
            <strong className="font-semibold">벌칙</strong>을 받게 돼요.
          </>
        }
        actions={
          <>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setConfirming(false)}
            >
              취소
            </Button>
            <Button
              className="flex-[1.2]"
              onClick={() => {
                // TODO: API 연동 시 참여 확정 요청 후 화면 갱신
                setConfirming(false);
              }}
            >
              참여 확정
            </Button>
          </>
        }
      >
        <Card variant="emphasis" className="mt-1 px-3.5 py-3">
          <div className="mb-1 flex items-center gap-2 text-primary">
            <FlagIcon className="size-3.5" aria-hidden="true" />
            <span className="text-caption font-semibold">벌칙</span>
          </div>
          <p className="text-body font-semibold">{room.penalty}</p>
        </Card>
      </Modal>
    </form>
  );
}
