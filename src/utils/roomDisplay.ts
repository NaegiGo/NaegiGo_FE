import { WEEKDAY_LABELS, type VerificationMethod } from "@/types/room";

const WEEKDAY_ONLY = [0, 1, 2, 3, 4];
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6];

const isSameDays = (days: number[], target: number[]) =>
  days.length === target.length && target.every((day) => days.includes(day));

/** 인증 요일을 "평일 (월~금)" 처럼 사람이 읽는 문구로 바꾼다. */
export function formatDays(days: number[]) {
  if (days.length === 0) return "-";
  if (isSameDays(days, EVERY_DAY)) return "매일";
  if (isSameDays(days, WEEKDAY_ONLY)) return "평일 (월~금)";
  if (isSameDays(days, [5, 6])) return "주말 (토·일)";

  return [...days]
    .sort((a, b) => a - b)
    .map((day) => WEEKDAY_LABELS[day])
    .join("·");
}

export function formatMethod(method: VerificationMethod) {
  return method === "photo" ? "사진 인증" : "양심 인증";
}

/** 시작일·종료일 사이의 총 일수 (양끝 포함) */
export function countDays(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00Z`).getTime();
  const end = new Date(`${endDate}T00:00:00Z`).getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  return Math.round((end - start) / oneDay) + 1;
}
