import { RuleInfo, type RuleInfoRow } from "@/components/room/RuleInfo";
import type { RoomDetail } from "@/types/room";
import { formatDateRange } from "@/utils/date";
import { countDays, formatDays, formatMethod } from "@/utils/roomDisplay";

type RoomRulesProps = {
  room: RoomDetail;
  /** 방장 행을 맨 앞에 넣는다. (참여자 화면) */
  withHost?: boolean;
  /** 벌칙 행을 표 안에 넣는다. 별도 PenaltyCard를 쓸 때는 끈다. */
  withPenalty?: boolean;
};

export function RoomRules({
  room,
  withHost = false,
  withPenalty = false,
}: RoomRulesProps) {
  const rows: RuleInfoRow[] = [];

  if (withHost) rows.push({ label: "방장", value: room.hostName });

  rows.push(
    { label: "목표", value: room.goal },
    {
      label: "기간",
      value: (
        <>
          <span className="tabular-nums">
            {formatDateRange(room.startDate, room.endDate)}
          </span>{" "}
          <span className="text-caption text-foreground-secondary tabular-nums">
            ({countDays(room.startDate, room.endDate)}일)
          </span>
        </>
      ),
    },
    { label: "요일", value: formatDays(room.days) },
    { label: "인증", value: formatMethod(room.method) },
  );

  if (withPenalty) rows.push({ label: "벌칙", value: room.penalty });

  return <RuleInfo rows={rows} />;
}
