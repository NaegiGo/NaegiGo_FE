import type { RoomDetail } from "@/types/room";

const BASE = {
  goal: "평일 아침 6시 기상 인증",
  penalty: "꼴찌가 모두에게 커피 한 잔씩 쏘기",
  startDate: "2026-05-27",
  endDate: "2026-06-27",
  days: [0, 1, 2, 3, 4],
  method: "honor",
  remainingDays: 2,
} satisfies Partial<RoomDetail>;

/**
 * API 연동 전까지 쓰는 임시 데이터.
 * "5"는 홈 목록에 없지만, 참여 확정 후 상태를 확인하려고 둔 항목이다.
 */
export const MOCK_ROOM_DETAILS: Record<string, RoomDetail> = {
  "2": {
    ...BASE,
    id: "2",
    name: "주 3회 헬스",
    status: "pending",
    code: "ABC123",
    hostName: "미니",
    isHost: true,
    hasJoined: true,
    members: [
      { id: "m1", name: "미니", isHost: true, isMe: true },
      { id: "m2", name: "준호", isHost: false, isMe: false },
      { id: "m3", name: "하늘", isHost: false, isMe: false },
    ],
  },
  "3": {
    ...BASE,
    id: "3",
    name: "책 한 권 읽기",
    status: "pending",
    code: "XYZ789",
    hostName: "준호",
    isHost: false,
    hasJoined: false,
    members: [
      { id: "m1", name: "준호", isHost: true, isMe: false },
      { id: "m2", name: "하늘", isHost: false, isMe: false },
    ],
  },
  "5": {
    ...BASE,
    id: "5",
    name: "아침 6시 기상",
    status: "pending",
    code: "DEF456",
    hostName: "미니",
    isHost: false,
    hasJoined: true,
    members: [
      { id: "m1", name: "미니", isHost: true, isMe: false },
      { id: "m2", name: "준호", isHost: false, isMe: true },
      { id: "m3", name: "하늘", isHost: false, isMe: false },
    ],
  },
};
