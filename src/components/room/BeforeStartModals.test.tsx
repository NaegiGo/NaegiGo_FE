import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BeforeStartRoom } from "./BeforeStartRoom";
import { MOCK_ROOM_DETAILS } from "@/mocks/roomDetail";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

const HOST = MOCK_ROOM_DETAILS["2"];
const NOT_JOINED = MOCK_ROOM_DETAILS["3"];
const JOINED = MOCK_ROOM_DETAILS["5"];

describe("방 삭제 모달", () => {
  it("삭제 버튼을 누르면 참여자 수를 담은 확인 모달이 열린다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={HOST} />);

    expect(screen.queryByRole("dialog")).toBeNull();
    await user.click(screen.getByRole("button", { name: /방 삭제/ }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName("방을 삭제할까요?");
    expect(dialog).toHaveTextContent("참여자 3명이 모두 내보내지고,");
  });

  it("취소하면 모달이 닫히고 화면은 그대로다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={HOST} />);

    await user.click(screen.getByRole("button", { name: /방 삭제/ }));
    await user.click(screen.getByRole("button", { name: "취소" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("button", { name: /방 삭제/ })).toBeInTheDocument();
  });
});

describe("방 나가기 모달", () => {
  it("나가기 버튼을 누르면 확인 모달이 열린다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={JOINED} />);

    await user.click(screen.getByRole("button", { name: /방 나가기/ }));

    expect(screen.getByRole("dialog")).toHaveAccessibleName("방을 나갈까요?");
  });

  it("취소하면 닫힌다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={JOINED} />);

    await user.click(screen.getByRole("button", { name: /방 나가기/ }));
    await user.click(screen.getByRole("button", { name: "취소" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("참여 확정 모달", () => {
  it("동의 후 제출하면 벌칙을 담은 확인 모달이 열린다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={NOT_JOINED} />);

    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "참여 확정하기" }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName("정말 참여하시겠어요?");
    expect(dialog).toHaveTextContent("꼴찌가 모두에게 커피 한 잔씩 쏘기");
  });

  it("취소하면 모달만 닫히고 동의 체크는 유지된다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={NOT_JOINED} />);

    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "참여 확정하기" }));
    await user.click(screen.getByRole("button", { name: "취소" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByRole("button", { name: "참여 확정하기" })).toBeEnabled();
  });
});
