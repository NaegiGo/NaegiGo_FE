"use client";

import { useEffect, useRef } from "react";

/** enabled인 동안 Esc를 누르면 onEscape를 부른다. */
export function useEscapeKey(enabled: boolean, onEscape: () => void) {
  // 콜백이 매 렌더 새로 만들어져도 리스너를 다시 붙이지 않는다.
  const onEscapeRef = useRef(onEscape);
  useEffect(() => {
    onEscapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscapeRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);
}
