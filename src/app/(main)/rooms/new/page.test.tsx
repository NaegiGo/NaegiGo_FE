import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import RoomNewPage from "./page";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

const submitButton = () => screen.getByRole("button", { name: "방 만들기" });

const fillRequired = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("방 이름"), "아침 6시 기상");
  await user.type(screen.getByLabelText("목표 내용"), "평일 6시 기상 인증");
  await user.type(screen.getByLabelText("시작일"), "2026-05-27");
  await user.type(screen.getByLabelText("종료일"), "2026-06-27");
  await user.type(screen.getByLabelText("벌칙 내용"), "커피 쏘기");
};

describe("RoomNewPage", () => {
  it("처음에는 제출 버튼이 비활성이다", () => {
    render(<RoomNewPage />);
    expect(submitButton()).toBeDisabled();
  });

  it("필수값을 모두 채우면 제출 버튼이 활성된다", async () => {
    const user = userEvent.setup();
    render(<RoomNewPage />);

    await fillRequired(user);
    expect(submitButton()).toBeEnabled();
  });

  it("요일을 모두 해제하면 다시 비활성된다", async () => {
    const user = userEvent.setup();
    render(<RoomNewPage />);
    await fillRequired(user);

    for (const label of ["월", "화", "수", "목", "금"]) {
      await user.click(screen.getByRole("button", { name: label }));
    }

    expect(submitButton()).toBeDisabled();
    expect(
      screen.getByText("인증 요일을 하나 이상 선택해주세요"),
    ).toBeInTheDocument();
  });

  it("기본으로 평일이 선택돼 있다", () => {
    render(<RoomNewPage />);

    expect(screen.getByRole("button", { name: "월" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "토" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("요일 칩을 누르면 선택 상태가 토글된다", async () => {
    const user = userEvent.setup();
    render(<RoomNewPage />);

    await user.click(screen.getByRole("button", { name: "토" }));
    expect(screen.getByRole("button", { name: "토" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("인증 방식은 기본이 양심 인증이고 사진 인증으로 바꿀 수 있다", async () => {
    const user = userEvent.setup();
    render(<RoomNewPage />);

    expect(screen.getByRole("radio", { name: "양심 인증" })).toBeChecked();

    await user.click(screen.getByRole("radio", { name: "사진 인증" }));
    expect(screen.getByRole("radio", { name: "사진 인증" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "양심 인증" })).not.toBeChecked();
  });

  it("종료일이 시작일보다 빠르면 안내를 보여주고 제출을 막는다", async () => {
    const user = userEvent.setup();
    render(<RoomNewPage />);
    await fillRequired(user);

    await user.clear(screen.getByLabelText("종료일"));
    await user.type(screen.getByLabelText("종료일"), "2026-05-01");

    expect(
      screen.getByText("종료일은 시작일보다 빠를 수 없어요"),
    ).toBeInTheDocument();
    expect(submitButton()).toBeDisabled();
  });
});
