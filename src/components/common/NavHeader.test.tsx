import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavHeader } from "./NavHeader";

const back = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

describe("NavHeader", () => {
  it("제목과 좌우 액션을 렌더한다", () => {
    render(
      <NavHeader
        title="방 만들기"
        left={<button>취소</button>}
        right={<button>저장</button>}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "방 만들기" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
  });

  it("back이 켜지면 left 대신 뒤로가기 버튼을 보여주고, 누르면 router.back을 호출한다", async () => {
    const user = userEvent.setup();
    render(<NavHeader title="방 만들기" back left={<button>취소</button>} />);

    expect(screen.queryByRole("button", { name: "취소" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "뒤로 가기" }));

    expect(back).toHaveBeenCalledOnce();
  });

  it("뒤로가기 아이콘은 currentColor를 써서 색을 물려받는다", () => {
    const { container } = render(<NavHeader back />);
    const path = container.querySelector("svg path");

    expect(path).toHaveAttribute("stroke", "currentColor");
  });
});
