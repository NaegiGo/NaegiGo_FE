import { notFound } from "next/navigation";
import { EditRoomForm } from "@/components/room/EditRoomForm";
import { MOCK_ROOM_DETAILS } from "@/mocks/roomDetail";

export default async function RoomEditPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  // TODO: API 연동 시 서버에서 방 상세를 조회
  const room = MOCK_ROOM_DETAILS[roomId];

  // 규칙 수정은 방장만 할 수 있다.
  if (!room || !room.isHost) notFound();

  return <EditRoomForm room={room} />;
}
