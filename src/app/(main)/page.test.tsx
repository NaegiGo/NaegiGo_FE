import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the home screen placeholder", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "홈" })).toBeInTheDocument();
  });
});
