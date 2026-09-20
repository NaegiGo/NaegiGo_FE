import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("기본 type은 submit이 아니라 button이다", () => {
    render(<Button>확인</Button>);
    expect(screen.getByRole("button", { name: "확인" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("disabled면 클릭 핸들러가 불리지 않는다", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        방 만들기
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "방 만들기" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("variant와 block에 따라 클래스가 바뀐다", () => {
    const { rerender } = render(<Button variant="danger">삭제</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-danger");

    rerender(
      <Button variant="secondary" block>
        취소
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-surface-muted");
    expect(button).toHaveClass("w-full");
  });
});
