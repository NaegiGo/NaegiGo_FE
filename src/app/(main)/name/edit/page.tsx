"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CameraIcon from "@/assets/icons/camera.svg";
import CloseIcon from "@/assets/icons/close-sm.svg";
import { ScreenBody } from "@/components/common/AppShell";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { FieldGroup, FieldHelp } from "@/components/common/Field";
import { NavHeader } from "@/components/common/NavHeader";
import { NAME_MAX_LENGTH, isValidName } from "@/utils/profile";

// TODO: API 연동 시 로그인한 사용자 정보로 교체
const CURRENT_NAME = "미니";

export default function ProfileEditPage() {
  const router = useRouter();
  const [name, setName] = useState(CURRENT_NAME);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // blob URL은 쓰고 나서 직접 해제해야 메모리가 남지 않는다.
  useEffect(() => {
    if (!photoUrl) return;
    return () => URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  const handlePickPhoto = (file: File | undefined) => {
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  };

  const clearName = () => {
    setName("");
    nameInputRef.current?.focus();
  };

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: API 연동 시 이름·사진 저장 후 이전 화면으로 돌아가기
      }}
    >
      <NavHeader
        title="이름 수정"
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
            disabled={!isValidName(name)}
          >
            저장
          </Button>
        }
      />

      <ScreenBody className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col items-center gap-2.5 pt-2">
          {/* flex로 감싸 아바타가 줄 박스에 얹히지 않게 한다. */}
          <div className="relative flex">
            <Avatar
              // 편집 중인 값을 그대로 보여준다.
              // 이전 이름으로 되돌리면 지운 상태가 안 지워진 것처럼 보인다.
              name={name}
              src={photoUrl ?? undefined}
              className="size-21 text-title"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label="프로필 사진 선택"
              onChange={(event) => handlePickPhoto(event.target.files?.[0])}
            />
            <button
              type="button"
              aria-label="사진 등록"
              onClick={() => fileInputRef.current?.click()}
              className="focus-ring absolute -right-0.5 -bottom-0.5 flex size-[30px] items-center justify-center rounded-full border border-border bg-background shadow-[0_2px_8px_rgba(0,0,0,0.10)]"
            >
              <CameraIcon className="size-4" aria-hidden="true" />
            </button>
          </div>

          <Button
            variant="text"
            className="text-caption text-foreground-secondary"
            onClick={() => setPhotoUrl(null)}
          >
            기본 이미지로 변경
          </Button>
        </div>

        <FieldGroup>
          <div className="relative">
            <input
              ref={nameInputRef}
              value={name}
              maxLength={NAME_MAX_LENGTH}
              aria-label="이름"
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-border bg-background py-3.5 pr-14 pl-4 text-body-lg text-foreground outline-none transition focus:border-primary focus:shadow-focus"
            />
            {name !== "" && (
              <button
                type="button"
                aria-label="이름 지우기"
                onClick={clearName}
                className="focus-ring absolute top-1/2 right-3 flex size-[22px] -translate-y-1/2 items-center justify-center rounded-full bg-foreground-muted text-background"
              >
                <CloseIcon className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
          <FieldHelp counter={`${name.length} / ${NAME_MAX_LENGTH}`}>
            같은 방 친구에게 표시돼요
          </FieldHelp>
        </FieldGroup>
      </ScreenBody>
    </form>
  );
}
