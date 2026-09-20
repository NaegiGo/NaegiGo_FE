import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ProfileEditPage from "./page";

const back = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ back }) }));

const nameInput = () => screen.getByLabelText("이름") as HTMLInputElement;
const saveButton = () => screen.getByRole("button", { name: "저장" });

describe("ProfileEditPage", () => {
  it("현재 이름이 채워져 있고 저장할 수 있다", () => {
    render(<ProfileEditPage />);

    expect(nameInput()).toHaveValue("미니");
    expect(saveButton()).toBeEnabled();
  });

  it("글자수 카운터를 보여준다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    expect(screen.getByText("2 / 10")).toBeInTheDocument();

    await user.type(nameInput(), "짱");
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  it("10자를 넘겨 입력할 수 없다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.clear(nameInput());
    await user.type(nameInput(), "가나다라마바사아자차카타");

    expect(nameInput()).toHaveValue("가나다라마바사아자차");
  });

  it("비어 있으면 저장이 비활성되고, 한 글자만 넣어도 활성된다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.clear(nameInput());
    expect(saveButton()).toBeDisabled();

    await user.type(nameInput(), "미");
    expect(saveButton()).toBeEnabled();
  });

  it("지우기 버튼은 값이 있을 때만 보이고, 누르면 비운다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.click(screen.getByRole("button", { name: "이름 지우기" }));

    expect(nameInput()).toHaveValue("");
    expect(screen.queryByRole("button", { name: "이름 지우기" })).toBeNull();
  });

  it("이름을 비우면 아바타 이니셜도 사라진다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.click(screen.getByRole("button", { name: "이름 지우기" }));

    // 아바타는 aria-hidden이라 DOM으로 확인한다.
    expect(document.querySelector("[aria-hidden='true']")).toHaveTextContent(
      "",
    );
  });

  it("지우기 후에는 이름 입력칸에 포커스가 간다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.click(screen.getByRole("button", { name: "이름 지우기" }));
    expect(nameInput()).toHaveFocus();
  });

  it("취소를 누르면 이전 화면으로 돌아간다", async () => {
    const user = userEvent.setup();
    render(<ProfileEditPage />);

    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(back).toHaveBeenCalled();
  });

  it("사진을 고르면 아바타에 미리보기가 뜨고, 기본 이미지로 되돌릴 수 있다", async () => {
    const user = userEvent.setup();
    URL.createObjectURL = vi.fn(() => "blob:preview");
    URL.revokeObjectURL = vi.fn();
    render(<ProfileEditPage />);

    const file = new File(["x"], "me.png", { type: "image/png" });
    await user.upload(screen.getByLabelText("프로필 사진 선택"), file);

    // 아바타는 aria-hidden이라 접근성 트리에 없으므로 DOM으로 확인한다.
    expect(document.querySelector("img")).toHaveAttribute(
      "src",
      "blob:preview",
    );

    await user.click(
      screen.getByRole("button", { name: "기본 이미지로 변경" }),
    );
    expect(document.querySelector("img")).toBeNull();
  });
});
