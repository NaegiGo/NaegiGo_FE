/** 조건부 클래스명을 공백으로 이어 붙인다. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
