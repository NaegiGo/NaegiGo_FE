import Link from "next/link";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import { ScreenBody } from "@/components/common/AppShell";
import { Card } from "@/components/common/Card";
import { Chip } from "@/components/common/Chip";
import { NavHeader } from "@/components/common/NavHeader";
import { DeleteRoomButton } from "@/components/room/DeleteRoomButton";
import { JoinConfirmForm } from "@/components/room/JoinConfirmForm";
import { LeaveRoomButton } from "@/components/room/LeaveRoomButton";
import { LockNote } from "@/components/room/LockNote";
import { MemberList } from "@/components/room/MemberList";
import { RoomCodeCard } from "@/components/room/RoomCodeCard";
import { RoomRules } from "@/components/room/RoomRules";
import type { RoomDetail } from "@/types/room";

/** 시작 전 · 방장 */
function HostView({ room }: { room: RoomDetail }) {
  return (
    <>
      <NavHeader
        title={room.name}
        back
        right={
          <Link
            href={`/rooms/${room.id}/edit`}
            className="focus-ring rounded-sm px-3.5 py-2 text-body-lg text-primary"
          >
            수정
          </Link>
        }
      />
      <ScreenBody className="flex flex-col gap-4 pt-1">
        <Chip tone="pending" className="self-start">
          시작 전 · D-{room.remainingDays}
        </Chip>

        <RoomRules room={room} withPenalty />
        <LockNote>시작 후엔 방 이름·인증 방식만 수정할 수 있어요</LockNote>

        <RoomCodeCard code={room.code} />
        <MemberList members={room.members} />

        <DeleteRoomButton memberCount={room.members.length} />
      </ScreenBody>
    </>
  );
}

/** 시작 전 · 참여자 · 참여 확정 후 */
function JoinedView({ room }: { room: RoomDetail }) {
  return (
    <>
      <NavHeader title={room.name} back />
      <ScreenBody className="flex flex-col gap-4 pt-1">
        <div className="flex items-center justify-between">
          <Chip tone="pending">시작 전 · D-{room.remainingDays}</Chip>
          <Chip tone="active">참여 완료</Chip>
        </div>

        <RoomRules room={room} withHost withPenalty />
        <LockNote>규칙은 방장만 수정할 수 있어요</LockNote>

        <Card variant="soft" className="flex items-center gap-2">
          <SparkleIcon
            className="size-3 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="text-caption text-foreground-secondary">
            시작 전까지는 자유롭게 방을 나갈 수 있어요
          </span>
        </Card>

        <MemberList members={room.members} />

        <LeaveRoomButton />
      </ScreenBody>
    </>
  );
}

export function BeforeStartRoom({ room }: { room: RoomDetail }) {
  if (room.isHost) return <HostView room={room} />;
  if (room.hasJoined) return <JoinedView room={room} />;

  return (
    <>
      <NavHeader title={room.name} back />
      <JoinConfirmForm room={room} />
    </>
  );
}
