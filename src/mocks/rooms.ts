import type { Room } from "@/types/room";

/** API 연동 전까지 쓰는 임시 데이터. 프로토타입 홈 화면과 같은 구성이다. */
export const MOCK_ROOMS: Room[] = [
  {
    id: "1",
    name: "아침 6시 기상",
    status: "active",
    isHost: false,
    hostName: "미니",
    memberCount: 4,
    startDate: "2026-05-27",
    endDate: "2026-06-27",
    remainingDays: 12,
    progressRate: 67,
  },
  {
    id: "2",
    name: "주 3회 헬스",
    status: "pending",
    isHost: true,
    hostName: "미니",
    memberCount: 3,
    startDate: "2026-06-01",
    endDate: "2026-07-01",
  },
  {
    id: "3",
    name: "책 한 권 읽기",
    status: "pending",
    isHost: false,
    hostName: "준호",
    memberCount: 5,
    startDate: "2026-06-03",
    endDate: "2026-07-03",
  },
  {
    id: "4",
    name: "물 2L 마시기",
    status: "ended",
    isHost: false,
    hostName: "하늘",
    memberCount: 4,
    startDate: "2026-04-01",
    endDate: "2026-04-30",
    rank: 2,
  },
];
