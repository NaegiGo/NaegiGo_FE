import { describe, expect, it } from "vitest";
import { EMPTY_ROOM_FORM, isRoomFormValid, validateRoomForm } from "./roomForm";

const VALID = {
  ...EMPTY_ROOM_FORM,
  name: "아침 6시 기상",
  goal: "평일 아침 6시 기상 인증",
  startDate: "2026-05-27",
  endDate: "2026-06-27",
  penalty: "꼴찌가 커피 쏘기",
};

describe("validateRoomForm", () => {
  it("모두 채우면 오류가 없다", () => {
    expect(validateRoomForm(VALID)).toEqual({});
    expect(isRoomFormValid(VALID)).toBe(true);
  });

  it("공백만 넣은 값은 비어 있는 것으로 본다", () => {
    const errors = validateRoomForm({ ...VALID, name: "   ", penalty: "  " });

    expect(errors.name).toBeDefined();
    expect(errors.penalty).toBeDefined();
  });

  it("종료일이 시작일보다 빠르면 오류다", () => {
    const errors = validateRoomForm({
      ...VALID,
      startDate: "2026-06-27",
      endDate: "2026-05-27",
    });

    expect(errors.dateRange).toBe("종료일은 시작일보다 빠를 수 없어요");
  });

  it("같은 날짜는 허용한다", () => {
    const errors = validateRoomForm({
      ...VALID,
      startDate: "2026-05-27",
      endDate: "2026-05-27",
    });

    expect(errors.dateRange).toBeUndefined();
  });

  it("요일을 하나도 안 고르면 오류다", () => {
    expect(validateRoomForm({ ...VALID, days: [] }).days).toBeDefined();
  });
});
