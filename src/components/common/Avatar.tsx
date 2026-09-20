import { cn } from "@/utils/cn";

/**
 * Tailwind는 클래스명을 문자열로 조합하면 인식하지 못하므로
 * 완성된 클래스 문자열을 배열로 두고 인덱스로 꺼내 쓴다.
 */
const TINT_CLASS = [
  "bg-avatar-1 text-avatar-1-foreground",
  "bg-avatar-2 text-avatar-2-foreground",
  "bg-avatar-3 text-avatar-3-foreground",
  "bg-avatar-4 text-avatar-4-foreground",
  "bg-avatar-5 text-avatar-5-foreground",
];

const SIZE_CLASS = {
  sm: "size-7 text-caption",
  md: "size-9 text-body",
  lg: "size-12 text-body-lg",
  xl: "size-16 text-title-sm",
} as const;

type AvatarProps = {
  /** 이름. 첫 글자를 이니셜로 쓴다. */
  name: string;
  size?: keyof typeof SIZE_CLASS;
  /** 참여자 구분 틴트. 개수를 넘어가면 앞에서부터 다시 돌려쓴다. */
  tint?: number;
  /** 프로필 사진. 없으면 이니셜을 보여준다. */
  src?: string;
  className?: string;
};

export function Avatar({
  name,
  size = "md",
  tint = 0,
  src,
  className,
}: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        // inline-flex는 내용물(글자/이미지)에 따라 베이스라인이 달라져
        // 아래 내용이 밀린다. vertical-align을 고정해 같게 만든다.
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle font-semibold",
        SIZE_CLASS[size],
        TINT_CLASS[tint % TINT_CLASS.length],
        className,
      )}
    >
      {src ? (
        // 로컬 미리보기(blob URL)도 쓰므로 next/image 대신 img를 쓴다.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        name.charAt(0)
      )}
    </span>
  );
}
