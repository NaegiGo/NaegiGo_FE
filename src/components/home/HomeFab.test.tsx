import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HomeFab } from "./HomeFab";

const openFab = async () => {
  const user = userEvent.setup();
  render(<HomeFab />);
  await user.click(screen.getByRole("button", { name: "방 추가 메뉴 열기" }));
  return user;
};

describe("HomeFab", () => {
  it("처음에는 액션이 닫혀 있다", () => {
    render(<HomeFab />);

    expect(
      screen.getByRole("button", { name: "방 추가 메뉴 열기" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "새 방 만들기" })).toBeNull();
  });

  it("열면 방 생성·방 참여 링크가 나온다", async () => {
    await openFab();

    expect(screen.getByRole("link", { name: "새 방 만들기" })).toHaveAttribute(
      "href",
      "/rooms/new",
    );
    expect(
      screen.getByRole("link", { name: "방 코드로 참여" }),
    ).toHaveAttribute("href", "/rooms/join");
  });

  it("Esc를 누르면 닫힌다", async () => {
    const user = await openFab();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("link", { name: "새 방 만들기" })).toBeNull();
  });

  it("바깥(딤 영역)을 클릭하면 닫힌다", async () => {
    const user = await openFab();

    await user.click(document.querySelector("[aria-hidden='true']")!);
    expect(screen.queryByRole("link", { name: "새 방 만들기" })).toBeNull();
  });
});
