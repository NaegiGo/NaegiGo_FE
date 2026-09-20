import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProfileMenu } from "./ProfileMenu";

const openMenu = async () => {
  const user = userEvent.setup();
  render(<ProfileMenu name="미니" />);
  await user.click(screen.getByRole("button", { name: "내 프로필" }));
  return user;
};

describe("ProfileMenu", () => {
  it("처음에는 메뉴가 닫혀 있다", () => {
    render(<ProfileMenu name="미니" />);

    expect(screen.getByRole("button", { name: "내 프로필" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("열면 사용자 이름과 메뉴 항목을 보여준다", async () => {
    await openMenu();

    const menu = screen.getByRole("menu");
    expect(menu).toHaveTextContent("미니");
    expect(menu).toHaveTextContent("카카오로 로그인");
    expect(screen.getByRole("menuitem", { name: "이름 수정" })).toHaveAttribute(
      "href",
      "/name/edit",
    );
    expect(
      screen.getByRole("menuitem", { name: "로그아웃" }),
    ).toBeInTheDocument();
  });

  it("Esc를 누르면 닫힌다", async () => {
    const user = await openMenu();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("메뉴 항목을 고르면 닫힌다", async () => {
    const user = await openMenu();

    await user.click(screen.getByRole("menuitem", { name: "이름 수정" }));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
