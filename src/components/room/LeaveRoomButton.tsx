"use client";

import { useState } from "react";
import LeaveIcon from "@/assets/icons/leave.svg";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

/** 시작 전 참여자가 쓰는 방 나가기 버튼 + 확인 모달 */
export function LeaveRoomButton() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button
        variant="dangerGhost"
        block
        className="mt-1"
        onClick={() => setOpen(true)}
      >
        <LeaveIcon className="size-4" aria-hidden="true" />방 나가기
      </Button>

      <Modal
        open={open}
        onClose={close}
        title="방을 나갈까요?"
        description="시작 전에는 언제든 다시 참여할 수 있어요."
        actions={
          <>
            <Button variant="secondary" className="flex-1" onClick={close}>
              취소
            </Button>
            <Button
              variant="danger"
              className="flex-[1.2]"
              onClick={() => {
                // TODO: API 연동 시 방 나가기 요청 후 홈으로 이동
                close();
              }}
            >
              나가기
            </Button>
          </>
        }
      />
    </>
  );
}
