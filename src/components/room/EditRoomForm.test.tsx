import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EditRoomForm } from "./EditRoomForm";
import { MOCK_ROOM_DETAILS } from "@/mocks/roomDetail";

const back = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ back }) }));

const ROOM = MOCK_ROOM_DETAILS["2"];

describe("EditRoomForm", () => {
  it("기존 방 정보로 폼이 채워져 있다", () => {
    render(<EditRoomForm room={ROOM} />);

    expect(screen.getByLabelText("방 이름")).toHaveValue("주 3회 헬스");
    expect(screen.getByLabelText("목표 내용")).toHaveValue(
      "평일 아침 6시 기상 인증",
    );
    expect(screen.getByLabelText("시작일")).toHaveValue("2026-05-27");
    expect(screen.getByLabelText("종료일")).toHaveValue("2026-06-27");
    expect(screen.getByLabelText("벌칙 내용")).toHaveValue(
      "꼴찌가 모두에게 커피 한 잔씩 쏘기",
    );
  });

  it("기존 인증 요일과 인증 방식이 선택돼 있다", () => {
    render(<EditRoomForm room={ROOM} />);

    expect(screen.getByRole("button", { name: "월" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "토" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("radio", { name: "양심 인증" })).toBeChecked();
  });

  it("시작 후 수정 제한 안내를 하단에 보여준다", () => {
    render(<EditRoomForm room={ROOM} />);

    expect(
      screen.getByText("시작 후엔 방 이름과 인증 방식만 수정할 수 있어요"),
    ).toBeInTheDocument();
  });

  it("참여자에게 알림이 간다는 안내를 보여준다", () => {
    render(<EditRoomForm room={ROOM} />);

    expect(
      screen.getByText("편집 중 — 참여자에게 변경 알림이 가요"),
    ).toBeInTheDocument();
  });

  it("취소를 누르면 이전 화면으로 돌아간다", async () => {
    const user = userEvent.setup();
    render(<EditRoomForm room={ROOM} />);

    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(back).toHaveBeenCalled();
  });

  it("필수값을 비우면 저장이 비활성된다", async () => {
    const user = userEvent.setup();
    render(<EditRoomForm room={ROOM} />);

    expect(screen.getByRole("button", { name: "저장" })).toBeEnabled();

    await user.clear(screen.getByLabelText("방 이름"));
    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
  });

  it("종료일을 시작일보다 앞으로 바꾸면 안내를 보여주고 저장을 막는다", async () => {
    const user = userEvent.setup();
    render(<EditRoomForm room={ROOM} />);

    await user.clear(screen.getByLabelText("종료일"));
    await user.type(screen.getByLabelText("종료일"), "2026-05-01");

    expect(
      screen.getByText("종료일은 시작일보다 빠를 수 없어요"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "저장" })).toBeDisabled();
  });
});
