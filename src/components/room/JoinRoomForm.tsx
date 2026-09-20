"use client";

import { useState } from "react";
import { ScreenBody } from "@/components/common/AppShell";
import { BottomBar } from "@/components/common/BottomBar";
import { Button } from "@/components/common/Button";
import { FieldGroup, FieldHelp, FieldLabel } from "@/components/common/Field";
import {
  CodeInput,
  ROOM_CODE_LENGTH,
  normalizeRoomCode,
} from "@/components/room/CodeInput";

type JoinRoomFormProps = {
  /** URL 링크로 들어온 경우 미리 채워지는 코드 */
  initialCode?: string;
};

export function JoinRoomForm({ initialCode = "" }: JoinRoomFormProps) {
  const [code, setCode] = useState(() =>
    normalizeRoomCode(initialCode).slice(0, ROOM_CODE_LENGTH),
  );

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: API 연동 시 코드로 방을 조회해 방 상세로 이동
      }}
    >
      <ScreenBody className="flex flex-col gap-6 pt-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-title-sm">
            친구가 보낸
            <br />
            {ROOM_CODE_LENGTH}자리 코드를 입력하세요
          </h2>
          <p className="text-body text-foreground-secondary">
            코드는 방장의 방 상세 화면에서 확인할 수 있어요
          </p>
        </div>

        <FieldGroup>
          <FieldLabel>방 코드</FieldLabel>
          <CodeInput value={code} onChange={setCode} />
        </FieldGroup>
      </ScreenBody>

      <BottomBar>
        <Button type="submit" block disabled={code.length < ROOM_CODE_LENGTH}>
          입장하기
        </Button>
      </BottomBar>
    </form>
  );
}
