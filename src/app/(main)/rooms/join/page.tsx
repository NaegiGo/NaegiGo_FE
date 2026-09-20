import { NavHeader } from "@/components/common/NavHeader";
import { JoinRoomForm } from "@/components/room/JoinRoomForm";

export default async function RoomJoinPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  // 공유 URL(/rooms/join?code=ABC123)로 들어오면 코드를 미리 채운다.
  const { code } = await searchParams;

  return (
    <>
      <NavHeader title="방 코드 입력" back />
      <JoinRoomForm initialCode={code} />
    </>
  );
}
