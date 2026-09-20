/** 인증 방식 */
export type VerificationMethod = "honor" | "photo";

/** 인증 요일. 0=월 ~ 6=일 */
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const WEEKDAY_LABELS = [
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
] as const;

export type RoomStatus = "active" | "pending" | "ended";

export type Room = {
  id: string;
  name: string;
  status: RoomStatus;
  /** 내가 이 방의 방장인지 */
  isHost: boolean;
  hostName: string;
  memberCount: number;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
  /** 진행 중 · 종료까지 남은 일수 */
  remainingDays?: number;
  /** 진행 중 · 내 달성률 (0~100) */
  progressRate?: number;
  /** 종료 · 내 순위 */
  rank?: number;
};

export type RoomMember = {
  id: string;
  name: string;
  isHost: boolean;
  isMe: boolean;
};

/** 방 상세 화면에서 쓰는 정보 */
export type RoomDetail = {
  id: string;
  name: string;
  status: RoomStatus;
  goal: string;
  penalty: string;
  /** 방 코드 (방장에게만 노출) */
  code: string;
  startDate: string;
  endDate: string;
  days: number[];
  method: VerificationMethod;
  /** 시작까지 남은 일수 */
  remainingDays: number;
  hostName: string;
  /** 내가 방장인지 */
  isHost: boolean;
  /** 참여자로서 참여를 확정했는지. 방장은 항상 true */
  hasJoined: boolean;
  members: RoomMember[];
};
