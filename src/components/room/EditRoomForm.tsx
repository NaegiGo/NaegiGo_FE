"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LockIcon from "@/assets/icons/lock.svg";
import PencilIcon from "@/assets/icons/pencil.svg";
import { ScreenBody } from "@/components/common/AppShell";
import { BottomBar } from "@/components/common/BottomBar";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { NavHeader } from "@/components/common/NavHeader";
import { RoomForm } from "@/components/room/RoomForm";
import type { RoomDetail } from "@/types/room";
import {
  isRoomFormValid,
  toRoomFormValues,
  validateRoomForm,
} from "@/utils/roomForm";

/** 시작 전 · 방장만 들어올 수 있는 규칙 수정 화면 */
export function EditRoomForm({ room }: { room: RoomDetail }) {
  const router = useRouter();
  const [values, setValues] = useState(() => toRoomFormValues(room));

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: API 연동 시 규칙 수정 요청 후 방 상세로 돌아가기
      }}
    >
      <NavHeader
        title="규칙 수정"
        left={
          <Button variant="text" onClick={() => router.back()}>
            취소
          </Button>
        }
        right={
          <Button
            type="submit"
            variant="text"
            className="font-semibold"
            disabled={!isRoomFormValid(values)}
          >
            저장
          </Button>
        }
      />

      <ScreenBody className="flex flex-col gap-5 pt-1">
        <Card
          variant="emphasis"
          className="flex items-center gap-2 rounded-xl px-3.5 py-3 text-primary"
        >
          <PencilIcon className="size-4 shrink-0" aria-hidden="true" />
          <span className="text-caption font-semibold">
            편집 중 — 참여자에게 변경 알림이 가요
          </span>
        </Card>

        <RoomForm
          values={values}
          onChange={setValues}
          errors={validateRoomForm(values)}
        />
      </ScreenBody>

      <BottomBar surface="soft">
        <p className="flex items-center justify-center gap-1.5 text-caption text-foreground-secondary">
          <LockIcon className="size-3 shrink-0" aria-hidden="true" />
          시작 후엔 방 이름과 인증 방식만 수정할 수 있어요
        </p>
      </BottomBar>
    </form>
  );
}
