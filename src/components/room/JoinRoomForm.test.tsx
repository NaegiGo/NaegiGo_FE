import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { JoinRoomForm } from "./JoinRoomForm";

const boxes = () =>
  Array.from({ length: 6 }, (_, i) =>
    screen.getByLabelText(`방 코드 ${i + 1}번째 자리`),
  ) as HTMLInputElement[];

const codeText = () =>
  boxes()
    .map((box) => box.value)
    .join("");

const submitButton = () => screen.getByRole("button", { name: "입장하기" });

describe("JoinRoomForm", () => {
  it("코드가 6자리가 되기 전에는 입장 버튼이 비활성이다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    expect(submitButton()).toBeDisabled();

    await user.type(boxes()[0], "abcde");
    expect(submitButton()).toBeDisabled();
  });

  it("입력하면 다음 칸으로 자동으로 넘어가고, 6자리를 채우면 활성된다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.keyboard("abc123");

    expect(codeText()).toBe("ABC123");
    expect(submitButton()).toBeEnabled();
  });

  it("소문자로 입력해도 대문자로 저장된다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.keyboard("abc");

    expect(codeText()).toBe("ABC");
  });

  it("영문·숫자가 아닌 글자는 무시한다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.keyboard("a-가!b");

    expect(codeText()).toBe("AB");
  });

  it("붙여넣기하면 여러 칸에 나눠 채운다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.paste("abc123");

    expect(codeText()).toBe("ABC123");
    expect(submitButton()).toBeEnabled();
  });

  it("붙여넣은 코드에 하이픈이 섞여 있어도 정리해서 채운다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.paste("abc-123-xyz");

    expect(codeText()).toBe("ABC123");
  });

  it("빈 칸에서 백스페이스를 누르면 앞 칸 글자를 지운다", async () => {
    const user = userEvent.setup();
    render(<JoinRoomForm />);

    await user.click(boxes()[0]);
    await user.keyboard("abc");
    // 세 글자를 넣으면 포커스는 네 번째(빈) 칸에 있다.
    await user.keyboard("{Backspace}");

    expect(codeText()).toBe("AB");
  });

  it("URL로 받은 코드는 미리 채워진다", () => {
    render(<JoinRoomForm initialCode="abc123" />);

    expect(codeText()).toBe("ABC123");
    expect(submitButton()).toBeEnabled();
  });

  it("URL 코드가 6자리를 넘으면 잘라서 채운다", () => {
    render(<JoinRoomForm initialCode="abc123456" />);

    expect(codeText()).toBe("ABC123");
  });
});
