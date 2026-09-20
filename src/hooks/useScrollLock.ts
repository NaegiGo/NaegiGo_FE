"use client";

import { useEffect } from "react";

// 모달이 여러 개 겹쳐 열려도 마지막 하나가 닫힐 때 원래 값으로 돌아가도록
// 잠금 횟수를 센다.
let lockCount = 0;
let originalOverflow = "";

/**
 * locked인 동안 배경 스크롤을 막는다.
 *
 * 네이티브 <dialog>는 showModal()로 열면 배경의 포커스·클릭은 막지만
 * 스크롤은 막지 않는다.
 *
 * body의 overflow는 뷰포트로 전파되므로 body만 잠그면 된다.
 * (html의 overflow가 visible일 때 적용되는 규칙이다.)
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        document.body.style.overflow = originalOverflow;
      }
    };
  }, [locked]);
}
