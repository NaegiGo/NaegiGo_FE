"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Modal } from "@/components/common/Modal";

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="dangerGhost" onClick={() => setOpen(true)}>
        방 삭제 모달 열기
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="방을 삭제할까요?"
        description={
          <>
            참여자 3명이 모두 내보내지고,
            <br />
            삭제한 방은 되돌릴 수 없어요.
          </>
        }
        actions={
          <>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="danger"
              className="flex-[1.2]"
              onClick={() => setOpen(false)}
            >
              삭제
            </Button>
          </>
        }
      >
        <Card variant="emphasis" className="mt-1 px-3.5 py-3">
          <p className="text-body font-semibold">
            꼴찌가 모두에게 커피 한 잔씩
          </p>
        </Card>
      </Modal>
    </>
  );
}
