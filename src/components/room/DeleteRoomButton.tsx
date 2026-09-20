"use client";

import { useState } from "react";
import TrashIcon from "@/assets/icons/trash.svg";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";

/** 방장만 쓰는 방 삭제 버튼 + 확인 모달 */
export function DeleteRoomButton({ memberCount }: { memberCount: number }) {
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
        <TrashIcon className="size-4" aria-hidden="true" />방 삭제
      </Button>

      <Modal
        open={open}
        onClose={close}
        title="방을 삭제할까요?"
        description={
          <>
            참여자 {memberCount}명이 모두 내보내지고,
            <br />
            삭제한 방은 되돌릴 수 없어요.
          </>
        }
        actions={
          <>
            <Button variant="secondary" className="flex-1" onClick={close}>
              취소
            </Button>
            <Button
              variant="danger"
              className="flex-[1.2]"
              onClick={() => {
                // TODO: API 연동 시 방 삭제 요청 후 홈으로 이동
                close();
              }}
            >
              삭제
            </Button>
          </>
        }
      />
    </>
  );
}
