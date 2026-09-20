import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Segmented } from "./Segmented";

const OPTIONS = [
  { value: "honor", label: "양심 인증" },
  { value: "photo", label: "사진 인증" },
];

const renderSegmented = (value = "honor") => {
  const onChange = vi.fn();
  render(
    <Segmented
      label="인증 방식"
      options={OPTIONS}
      value={value}
      onChange={onChange}
    />,
  );
  return onChange;
};

describe("Segmented", () => {
  it("선택된 항목만 checked다", () => {
    renderSegmented();

    expect(screen.getByRole("radio", { name: "양심 인증" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "사진 인증" })).not.toBeChecked();
  });

  it("클릭하면 값을 바꾼다", async () => {
    const user = userEvent.setup();
    const onChange = renderSegmented();

    await user.click(screen.getByRole("radio", { name: "사진 인증" }));
    expect(onChange).toHaveBeenCalledWith("photo");
  });

  it("화살표 키로 다음 항목을 고를 수 있다", async () => {
    const user = userEvent.setup();
    const onChange = renderSegmented();

    screen.getByRole("radio", { name: "양심 인증" }).focus();
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalledWith("photo");
  });

  it("탭 정지점은 그룹 전체에 하나다", async () => {
    const user = userEvent.setup();
    renderSegmented();

    await user.tab();
    expect(screen.getByRole("radio", { name: "양심 인증" })).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("radio", { name: "사진 인증" })).not.toHaveFocus();
  });
});
