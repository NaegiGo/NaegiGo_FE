import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BottomBar } from "./BottomBar";

describe("BottomBar", () => {
  it("children을 렌더한다", () => {
    render(
      <BottomBar>
        <button>입장하기</button>
      </BottomBar>,
    );

    expect(
      screen.getByRole("button", { name: "입장하기" }),
    ).toBeInTheDocument();
  });
});
