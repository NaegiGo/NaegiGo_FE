import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("이름의 첫 글자를 이니셜로 보여준다", () => {
    const { container } = render(<Avatar name="미니" />);
    expect(container.textContent).toBe("미");
  });

  it("틴트 개수를 넘는 인덱스는 앞에서부터 다시 돌려쓴다", () => {
    const { container: first } = render(<Avatar name="미니" tint={0} />);
    const { container: sixth } = render(<Avatar name="준호" tint={5} />);

    expect(first.firstElementChild).toHaveClass("bg-avatar-1");
    expect(sixth.firstElementChild).toHaveClass("bg-avatar-1");
  });
});
