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

  // viewBox가 없으면 CSS로 크기를 줄일 때 아이콘이 축소되지 않고 잘린다.
  // 이 테스트는 vitest.config.mts의 svgr 설정만 지켜준다.
  // 실제 화면에 쓰이는 next.config.ts 설정도 같이 맞춰 둬야 한다.
  it("아이콘은 크기를 줄여도 잘리지 않도록 viewBox를 유지한다", () => {
    const { container } = render(<NavHeader back />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 24 24",
    );
  });
});
