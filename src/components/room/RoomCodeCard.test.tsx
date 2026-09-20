import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RoomCodeCard } from "./RoomCodeCard";

const writeText = vi.fn();

const defineOnNavigator = (key: string, value: unknown) =>
  Object.defineProperty(navigator, key, {
    value,
    configurable: true,
    writable: true,
  });

/**
 * userEvent.setup()이 navigator.clipboard를 자체 스텁으로 덮어쓰므로
 * 반드시 setup 이후에 목을 설치해야 한다.
 */
const setup = (options?: { clipboard?: unknown; share?: unknown }) => {
  const user = userEvent.setup();

  defineOnNavigator(
    "clipboard",
    "clipboard" in (options ?? {}) ? options?.clipboard : { writeText },
  );
  defineOnNavigator("share", options?.share);

  return user;
};

const shareUrl = `${window.location.origin}/rooms/join?code=ABC123`;

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
});

describe("RoomCodeCard", () => {
  it("복사 버튼을 누르면 방 코드를 클립보드에 넣고 복사됨을 알린다", async () => {
    const user = setup();
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "복사" }));

    expect(writeText).toHaveBeenCalledWith("ABC123");
    expect(screen.getByRole("button", { name: "복사됨" })).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("복사됨");
  });

  it("클립보드를 쓸 수 없으면 실패를 알린다", async () => {
    const user = setup({ clipboard: undefined });
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "복사" }));

    expect(
      screen.getByRole("button", { name: "복사 실패" }),
    ).toBeInTheDocument();
  });

  it("복사가 거부되면 실패를 알린다", async () => {
    const user = setup({
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "복사" }));

    expect(
      screen.getByRole("button", { name: "복사 실패" }),
    ).toBeInTheDocument();
  });

  // 가짜 타이머를 쓰면 user-event의 내부 대기와 얽혀 멈춘다.
  // 되돌아오는 시간이 2초라 실제로 기다린다.
  it("복사 후 잠시 뒤에 원래 라벨로 돌아온다", async () => {
    const user = setup();
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "복사" }));
    expect(screen.getByRole("button", { name: "복사됨" })).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "복사" }, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it("공유 API가 있으면 입장 링크로 공유 시트를 연다", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    const user = setup({ share });
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "URL 공유하기" }));

    expect(share).toHaveBeenCalledWith(
      expect.objectContaining({ url: shareUrl }),
    );
    expect(writeText).not.toHaveBeenCalled();
  });

  it("공유 API가 없으면 링크를 대신 복사한다", async () => {
    const user = setup();
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "URL 공유하기" }));

    expect(writeText).toHaveBeenCalledWith(shareUrl);
    expect(
      screen.getByRole("button", { name: "링크 복사됨" }),
    ).toBeInTheDocument();
  });

  it("공유 시트를 닫으면 링크 복사로 대체한다", async () => {
    const user = setup({
      share: vi.fn().mockRejectedValue(new Error("Abort")),
    });
    render(<RoomCodeCard code="ABC123" />);

    await user.click(screen.getByRole("button", { name: "URL 공유하기" }));

    expect(writeText).toHaveBeenCalledWith(shareUrl);
  });
});
