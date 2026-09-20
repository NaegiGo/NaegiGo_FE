"use client";

import { useState } from "react";
import { ScreenBody } from "@/components/common/AppShell";
import { BottomBar } from "@/components/common/BottomBar";
import { Button } from "@/components/common/Button";
import { NavHeader } from "@/components/common/NavHeader";
import { RoomForm } from "@/components/room/RoomForm";
import {
  EMPTY_ROOM_FORM,
  isRoomFormValid,
  validateRoomForm,
} from "@/utils/roomForm";

export default function RoomNewPage() {
  const [values, setValues] = useState(EMPTY_ROOM_FORM);

  return (
    <>
      <NavHeader title="방 만들기" back />

      <form
        className="flex flex-1 flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          // TODO: API 연동 시 방 생성 요청 후 방 상세로 이동
        }}
      >
        <ScreenBody className="flex flex-col gap-5 pt-2">
          <RoomForm
            values={values}
            onChange={setValues}
            errors={validateRoomForm(values)}
          />
        </ScreenBody>

        <BottomBar>
          <Button type="submit" block disabled={!isRoomFormValid(values)}>
            방 만들기
          </Button>
        </BottomBar>
      </form>
    </>
  );
}
