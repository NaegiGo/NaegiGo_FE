import Image from "next/image";
import { ScreenBody } from "@/components/common/AppShell";
import { Avatar } from "@/components/common/Avatar";
import { RoomCard } from "@/components/home/RoomCard";
import { MOCK_ROOMS } from "@/mocks/rooms";

export default function HomePage() {
  // TODO: API 연동 시 서버에서 받아온 목록으로 교체
  const rooms = MOCK_ROOMS;

  return (
    <ScreenBody className="flex flex-col">
      <div className="flex items-center justify-between pt-3.5 pb-4.5">
        {/* 원본 144x48 비율(3:1)에 맞춘 크기 */}
        <Image
          src="/images/logo-wordmark.png"
          alt="내기고"
          width={72}
          height={24}
          priority
        />
        {/* TODO: 프로필 메뉴 열기 (다음 작업) */}
        <button type="button" aria-label="내 프로필">
          <Avatar name="미니" size="lg" />
        </button>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <h1 className="text-body-lg font-semibold">내 방</h1>
        <span className="text-body-lg font-semibold text-foreground-secondary tabular-nums">
          {rooms.length}
        </span>
      </div>

      {rooms.length === 0 ? (
        <p className="py-10 text-center text-body text-foreground-secondary">
          아직 참여 중인 방이 없어요
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </ul>
      )}
    </ScreenBody>
  );
}
