"use client";

import { useEffect, useState } from "react";
import CheckIcon from "@/assets/icons/check.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import ShareIcon from "@/assets/icons/share.svg";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { copyToClipboard } from "@/utils/clipboard";

type Feedback = {
  target: "code" | "url";
  message: string;
  failed: boolean;
};

/** 방장에게만 보이는 방 코드 카드 */
export function RoomCodeCard({ code }: { code: string }) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 2000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleCopyCode = async () => {
    const ok = await copyToClipboard(code);
    setFeedback({
      target: "code",
      message: ok ? "복사됨" : "복사 실패",
      failed: !ok,
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/rooms/join?code=${code}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "내기고", text: "같이 내기해요!", url });
        return;
      } catch {
        // 사용자가 공유 시트를 닫은 경우도 여기로 온다. 링크 복사로 대체한다.
      }
    }

    const ok = await copyToClipboard(url);
    setFeedback({
      target: "url",
      message: ok ? "링크 복사됨" : "복사 실패",
      failed: !ok,
    });
  };

  const codeFeedback = feedback?.target === "code" ? feedback : null;
  const urlFeedback = feedback?.target === "url" ? feedback : null;

  return (
    <Card variant="soft" className="flex flex-col gap-3.5">
      <span className="text-caption font-medium text-foreground-secondary">
        방 코드
      </span>

      <div className="flex items-center justify-between">
        <span className="text-title font-semibold tracking-[4px] tabular-nums">
          {code}
        </span>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCopyCode}
          className="bg-background shadow-[0_0_0_1px_var(--color-border)]"
        >
          {codeFeedback && !codeFeedback.failed ? (
            <CheckIcon className="size-3.5 text-success" aria-hidden="true" />
          ) : (
            <CopyIcon className="size-3.5" aria-hidden="true" />
          )}
          {codeFeedback?.message ?? "복사"}
        </Button>
      </div>

      <Button
        variant="ghost"
        block
        onClick={handleShare}
        className="min-h-11 rounded-xl text-body"
      >
        <ShareIcon className="size-4" aria-hidden="true" />
        {urlFeedback?.message ?? "URL 공유하기"}
      </Button>

      {/* 복사 결과를 스크린리더에도 알린다 */}
      <span role="status" aria-live="polite" className="sr-only">
        {feedback?.message ?? ""}
      </span>
    </Card>
  );
}
