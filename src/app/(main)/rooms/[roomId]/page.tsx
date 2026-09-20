import { notFound } from "next/navigation";
import { ScreenBody } from "@/components/common/AppShell";
import { NavHeader } from "@/components/common/NavHeader";
import { BeforeStartRoom } from "@/components/room/BeforeStartRoom";
import { MOCK_ROOM_DETAILS } from "@/mocks/roomDetail";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  // TODO: API 연동 시 서버에서 방 상세를 조회
  const room = MOCK_ROOM_DETAILS[roomId];

  if (!room) notFound();

  if (room.status !== "pending") {
    // 진행 중·종료 상태 화면은 별도 작업 범위
    return (
      <>
        <NavHeader title={room.name} back />
        <ScreenBody>
          <p className="py-10 text-center text-body text-foreground-secondary">
            준비 중인 화면이에요
          </p>
        </ScreenBody>
      </>
    );
  }

  return <BeforeStartRoom room={room} />;
}
