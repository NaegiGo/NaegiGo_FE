import { describe, expect, it } from "vitest";
import { countDays, formatDays, formatMethod } from "./roomDisplay";

describe("formatDays", () => {
  it("평일만 고르면 평일로 묶어 보여준다", () => {
    expect(formatDays([0, 1, 2, 3, 4])).toBe("평일 (월~금)");
  });

  it("순서가 뒤섞여도 평일로 인식한다", () => {
    expect(formatDays([4, 0, 2, 1, 3])).toBe("평일 (월~금)");
  });

  it("전부 고르면 매일로 보여준다", () => {
    expect(formatDays([0, 1, 2, 3, 4, 5, 6])).toBe("매일");
  });

  it("주말만 고르면 주말로 보여준다", () => {
    expect(formatDays([5, 6])).toBe("주말 (토·일)");
  });

  it("그 외에는 요일을 순서대로 나열한다", () => {
    expect(formatDays([2, 0, 4])).toBe("월·수·금");
  });
});

describe("countDays", () => {
  it("양끝을 포함해 센다", () => {
    expect(countDays("2026-05-27", "2026-06-27")).toBe(32);
    expect(countDays("2026-05-27", "2026-05-27")).toBe(1);
  });
});

describe("formatMethod", () => {
  it("인증 방식을 한국어로 바꾼다", () => {
    expect(formatMethod("honor")).toBe("양심 인증");
    expect(formatMethod("photo")).toBe("사진 인증");
  });
});
