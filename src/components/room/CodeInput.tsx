"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

export const ROOM_CODE_LENGTH = 6;

/** 영문·숫자만 남기고 대문자로 맞춘다. (대소문자 구분 없음) */
export function normalizeRoomCode(raw: string) {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
};

export function CodeInput({
  value,
  onChange,
  length = ROOM_CODE_LENGTH,
}: CodeInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // onFocus 가드가 최신 값을 봐야 한다.
  // 상태를 바꾼 직후에는 아직 리렌더 전이라 props의 value가 옛 값이고,
  // 그 값으로 판단하면 방금 옮긴 포커스를 앞 칸으로 되돌려버린다.
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  /** 값을 바꾸고 포커스를 옮긴다. 옮기기 전에 ref를 먼저 맞춘다. */
  const commit = (next: string) => {
    valueRef.current = next;
    onChange(next);
  };

  const focusAt = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    inputsRef.current[clamped]?.focus();
  };

  const replaceAt = (index: number, char: string) =>
    normalizeRoomCode(
      value.slice(0, index) + char + value.slice(index + 1),
    ).slice(0, length);

  const handleChange = (index: number, raw: string) => {
    const typed = normalizeRoomCode(raw).slice(-1);
    if (typed === "") return;

    commit(replaceAt(index, typed));
    focusAt(index + 1);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      if (value[index]) {
        // 현재 칸이 차 있으면 그 글자만 지운다.
        commit(value.slice(0, index) + value.slice(index + 1));
        return;
      }
      // 비어 있으면 앞 칸으로 이동하며 지운다.
      commit(value.slice(0, Math.max(0, index - 1)));
      focusAt(index - 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pasted = normalizeRoomCode(event.clipboardData.getData("text")).slice(
      0,
      length,
    );
    if (pasted === "") return;

    commit(pasted);
    focusAt(pasted.length);
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }, (_, index) => {
        const char = value[index] ?? "";

        return (
          <input
            key={index}
            ref={(element) => {
              inputsRef.current[index] = element;
            }}
            value={char}
            maxLength={1}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            aria-label={`방 코드 ${index + 1}번째 자리`}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            // 빈 칸을 건너뛰고 뒤쪽을 누르면 이어서 입력할 칸으로 보낸다.
            onFocus={() => {
              if (index > valueRef.current.length) {
                focusAt(valueRef.current.length);
              }
            }}
            className={cn(
              "h-15 min-w-0 flex-1 rounded-md border bg-background text-center text-title font-medium text-foreground uppercase outline-none transition",
              char === "" ? "border-border" : "border-foreground",
              "focus:border-2 focus:border-primary focus:shadow-focus",
            )}
          />
        );
      })}
    </div>
  );
}
