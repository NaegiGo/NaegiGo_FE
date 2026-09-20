export const NAME_MAX_LENGTH = 10;

/** 이름이 저장 가능한지 검사한다. 앞뒤 공백은 빼고 센다. */
export function isValidName(name: string) {
  const trimmed = name.trim();

  return trimmed.length > 0 && trimmed.length <= NAME_MAX_LENGTH;
}
