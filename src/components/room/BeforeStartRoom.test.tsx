import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { BeforeStartRoom } from "./BeforeStartRoom";
import { MOCK_ROOM_DETAILS } from "@/mocks/roomDetail";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

const HOST = MOCK_ROOM_DETAILS["2"];
const NOT_JOINED = MOCK_ROOM_DETAILS["3"];
const JOINED = MOCK_ROOM_DETAILS["5"];

describe("BeforeStartRoom · 방장", () => {
  it("방 코드와 수정 링크, 방 삭제 버튼을 보여준다", () => {
    render(<BeforeStartRoom room={HOST} />);

    expect(screen.getByText("ABC123")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "수정" })).toHaveAttribute(
      "href",
      "/rooms/2/edit",
    );
    expect(screen.getByRole("button", { name: /방 삭제/ })).toBeInTheDocument();
  });

  it("규칙 표에 목표·요일·인증·벌칙이 들어간다", () => {
    render(<BeforeStartRoom room={HOST} />);

    expect(screen.getByText("평일 아침 6시 기상 인증")).toBeInTheDocument();
    expect(screen.getByText("평일 (월~금)")).toBeInTheDocument();
    expect(screen.getByText("양심 인증")).toBeInTheDocument();
    expect(
      screen.getByText("꼴찌가 모두에게 커피 한 잔씩 쏘기"),
    ).toBeInTheDocument();
  });

  it("방장 화면에는 방장 행이 없다", () => {
    render(<BeforeStartRoom room={HOST} />);
    expect(screen.queryByText("방장", { selector: "dt" })).toBeNull();
  });
});

describe("BeforeStartRoom · 참여자 (확정 전)", () => {
  it("동의 전에는 참여 확정 버튼이 비활성이다", () => {
    render(<BeforeStartRoom room={NOT_JOINED} />);

    expect(
      screen.getByRole("button", { name: "참여 확정하기" }),
    ).toBeDisabled();
  });

  it("동의하면 참여 확정 버튼이 활성된다", async () => {
    const user = userEvent.setup();
    render(<BeforeStartRoom room={NOT_JOINED} />);

    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: "참여 확정하기" })).toBeEnabled();
  });

  it("방 코드와 참여자 목록은 보여주지 않는다", () => {
    render(<BeforeStartRoom room={NOT_JOINED} />);

    expect(screen.queryByText("XYZ789")).toBeNull();
    expect(screen.queryByRole("heading", { name: "참여자" })).toBeNull();
  });
});

describe("BeforeStartRoom · 참여자 (확정 후)", () => {
  it("참여 완료 표시와 방 나가기 버튼을 보여준다", () => {
    render(<BeforeStartRoom room={JOINED} />);

    expect(screen.getByText("참여 완료")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /방 나가기/ }),
    ).toBeInTheDocument();
  });

  it("방 코드 카드와 수정 링크는 없다", () => {
    render(<BeforeStartRoom room={JOINED} />);

    expect(screen.queryByText("DEF456")).toBeNull();
    expect(screen.queryByRole("link", { name: "수정" })).toBeNull();
  });

  it("참여자 목록에서 나와 방장을 구분해 보여준다", () => {
    render(<BeforeStartRoom room={JOINED} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("미니");
    expect(items[0]).toHaveTextContent("방장");
    expect(items[1]).toHaveTextContent("나");
  });
});
