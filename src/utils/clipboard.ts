/**
 * 클립보드에 텍스트를 복사한다.
 *
 * navigator.clipboard는 보안 컨텍스트(https·localhost)에서만 쓸 수 있어서,
 * 사내망 IP로 접속한 모바일 테스트 등에서는 없을 수 있다.
 */
export async function copyToClipboard(text: string) {
  if (!navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
