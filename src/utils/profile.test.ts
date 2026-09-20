import { describe, expect, it } from "vitest";
import { isValidName } from "./profile";

describe("isValidName", () => {
  it("1~10자는 통과한다", () => {
    expect(isValidName("미")).toBe(true);
    expect(isValidName("미니")).toBe(true);
    expect(isValidName("가나다라마바사아자차")).toBe(true);
  });

  it("비어 있거나 10자를 넘으면 막는다", () => {
    expect(isValidName("")).toBe(false);
    expect(isValidName("가나다라마바사아자차카")).toBe(false);
  });

  it("공백만 있는 이름은 막는다", () => {
    expect(isValidName("   ")).toBe(false);
  });

  it("앞뒤 공백은 길이에서 뺀다", () => {
    expect(isValidName("  미  ")).toBe(true);
  });
});
