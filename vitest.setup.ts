import "@testing-library/jest-dom/vitest";

// jsdom(29)은 아직 <dialog>의 showModal/close를 구현하지 않는다.
// Modal이 네이티브 <dialog>를 쓰므로 테스트 환경에서만 최소 동작을 채운다.
// 포커스 가두기·Esc 기본 동작은 실제 브라우저의 몫이라 여기서 흉내내지 않는다.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close() {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  };
}
