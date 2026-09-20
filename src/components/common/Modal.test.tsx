import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";

const renderModal = (open: boolean, onClose = vi.fn()) => {
  render(
    <Modal
      open={open}
      onClose={onClose}
      title="방을 삭제할까요?"
      description="삭제한 방은 되돌릴 수 없어요."
      actions={<button onClick={onClose}>취소</button>}
    />,
  );
  return onClose;
};

describe("Modal", () => {
  it("open이 false면 내용이 보이지 않는다", () => {
    renderModal(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("open이면 제목·설명과 함께 dialog로 노출된다", () => {
    renderModal(true);
    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAccessibleName("방을 삭제할까요?");
    expect(
      screen.getByText("삭제한 방은 되돌릴 수 없어요."),
    ).toBeInTheDocument();
  });

  // Esc를 누르면 브라우저가 dialog를 닫고 close 이벤트를 쏜다.
  // jsdom에는 그 기본 동작이 없으므로, close가 왔을 때의 배선만 확인한다.
  // (Esc 자체는 실제 브라우저에서 확인해야 한다.)
  it("dialog가 close 이벤트를 내면 onClose가 호출된다", () => {
    const onClose = renderModal(true);

    fireEvent(screen.getByRole("dialog"), new Event("close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("열려 있는 동안 배경 스크롤을 막고, 닫히면 되돌린다", () => {
    const { rerender } = render(
      <Modal open onClose={vi.fn()} title="방을 삭제할까요?" />,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Modal open={false} onClose={vi.fn()} title="방을 삭제할까요?" />);
    expect(document.body.style.overflow).toBe("");
  });

  it("딤 영역을 클릭하면 dialog를 닫아 onClose로 이어진다", () => {
    const onClose = renderModal(true);

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });
});
