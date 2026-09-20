import CopyIcon from "@/assets/icons/copy.svg";
import ShareIcon from "@/assets/icons/share.svg";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";

/** 방장에게만 보이는 방 코드 카드 */
export function RoomCodeCard({ code }: { code: string }) {
  return (
    <Card variant="soft" className="flex flex-col gap-3.5">
      <span className="text-caption font-medium text-foreground-secondary">
        방 코드
      </span>

      <div className="flex items-center justify-between">
        <span className="text-title font-semibold tracking-[4px] tabular-nums">
          {code}
        </span>
        {/* TODO: 클립보드 복사 연결 (다음 작업) */}
        <Button
          size="sm"
          variant="secondary"
          className="bg-background shadow-[0_0_0_1px_var(--color-border)]"
        >
          <CopyIcon className="size-3.5" aria-hidden="true" />
          복사
        </Button>
      </div>

      {/* TODO: URL 공유 연결 (다음 작업) */}
      <Button variant="ghost" block className="min-h-11 rounded-xl text-body">
        <ShareIcon className="size-4" aria-hidden="true" />
        URL 공유하기
      </Button>
    </Card>
  );
}
