import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("방 개수를 제목 옆에 보여준다", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "내 방" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("진행 중인 방은 남은 일수·달성률·인원을 보여준다", () => {
    render(<HomePage />);
    const card = screen
      .getByRole("heading", { name: "아침 6시 기상" })
      .closest("li")!;

    expect(within(card).getByText("진행 중")).toBeInTheDocument();
    expect(within(card).getByText("D-12")).toBeInTheDocument();
    expect(within(card).getByText("67% 달성")).toBeInTheDocument();
    expect(within(card).getByText("4명")).toBeInTheDocument();
  });

  it("시작 전 방은 방장 여부에 따라 인원과 방장 이름을 구분해 보여준다", () => {
    render(<HomePage />);
    const hosted = screen
      .getByRole("heading", { name: "주 3회 헬스" })
      .closest("li")!;
    const joined = screen
      .getByRole("heading", { name: "책 한 권 읽기" })
      .closest("li")!;

    expect(within(hosted).getByText("내가 방장인 방")).toBeInTheDocument();
    expect(within(hosted).getByText("06.01 시작")).toBeInTheDocument();
    expect(within(hosted).getByText("3명")).toBeInTheDocument();

    expect(within(joined).queryByText("내가 방장인 방")).toBeNull();
    expect(within(joined).getByText("방장 준호")).toBeInTheDocument();
  });

  it("종료된 방은 기간과 순위를 보여준다", () => {
    render(<HomePage />);
    const card = screen
      .getByRole("heading", { name: "물 2L 마시기" })
      .closest("li")!;

    expect(within(card).getByText("종료")).toBeInTheDocument();
    expect(within(card).getByText("04.01 — 04.30")).toBeInTheDocument();
    expect(within(card).getByText("2위")).toBeInTheDocument();
  });

  it("방 카드는 방 상세로 이동하는 링크다", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /아침 6시 기상/ })).toHaveAttribute(
      "href",
      "/rooms/1",
    );
  });
});
