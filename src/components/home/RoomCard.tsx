import Link from "next/link";
import CrownIcon from "@/assets/icons/crown.svg";
import { Card } from "@/components/common/Card";
import { Chip } from "@/components/common/Chip";
import { cn } from "@/utils/cn";
import { formatDateRange, formatMonthDay } from "@/utils/date";
import type { Room } from "@/types/room";

function MetaDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[3px] rounded-full bg-current opacity-50"
    />
  );
}

/** 상태별로 카드 아래 표시되는 부가 정보 */
function RoomMeta({ room }: { room: Room }) {
  if (room.status === "active") {
    return (
      <>
        <span className="tabular-nums">D-{room.remainingDays}</span>
        <MetaDot />
        <span className="tabular-nums">{room.progressRate}% 달성</span>
        <MetaDot />
        <span>{room.memberCount}명</span>
      </>
    );
  }

  if (room.status === "pending") {
    return (
      <>
        <span className="tabular-nums">
          {formatMonthDay(room.startDate)} 시작
        </span>
        <MetaDot />
        {room.isHost ? (
          <span>{room.memberCount}명</span>
        ) : (
          <span>방장 {room.hostName}</span>
        )}
      </>
    );
  }

  return (
    <>
      <span className="tabular-nums">
        {formatDateRange(room.startDate, room.endDate)}
      </span>
      <MetaDot />
      <span>{room.rank}위</span>
    </>
  );
}

const STATUS_CHIP = {
  active: { tone: "active", label: "진행 중", withDot: true },
  pending: { tone: "pending", label: "시작 전", withDot: false },
  ended: { tone: "ended", label: "종료", withDot: false },
} as const;

export function RoomCard({ room }: { room: Room }) {
  const isEnded = room.status === "ended";
  const chip = STATUS_CHIP[room.status];

  return (
    <li>
      <Link href={`/rooms/${room.id}`} className="focus-ring block rounded-lg">
        <Card
          variant={isEnded ? "soft" : "default"}
          className="flex flex-col gap-2.5"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3
                className={cn(
                  "text-body-lg font-semibold",
                  isEnded && "text-foreground-dim",
                )}
              >
                {room.name}
              </h3>
              {room.status === "pending" && room.isHost && (
                <>
                  <CrownIcon
                    className="size-4 text-host-foreground"
                    aria-hidden="true"
                  />
                  <span className="sr-only">내가 방장인 방</span>
                </>
              )}
            </div>
            <Chip tone={chip.tone} withDot={chip.withDot}>
              {chip.label}
            </Chip>
          </div>

          <div className="flex items-center gap-2 text-caption text-foreground-secondary">
            <RoomMeta room={room} />
          </div>

          {room.status === "active" && (
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${room.progressRate}%` }}
              />
            </div>
          )}
        </Card>
      </Link>
    </li>
  );
}
