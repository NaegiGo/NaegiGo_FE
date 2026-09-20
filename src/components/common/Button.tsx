import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "dangerGhost"
  | "text"
  | "kakao";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "min-h-[50px] rounded-full bg-primary px-[22px] py-3.5 text-body-lg font-semibold text-primary-foreground hover:bg-primary-hover",
  secondary:
    "min-h-[50px] rounded-full bg-surface-muted px-[22px] py-3.5 text-body-lg text-foreground",
  ghost:
    "min-h-[50px] rounded-full border border-border bg-transparent px-[22px] py-3.5 text-body-lg text-primary",
  danger:
    "min-h-[50px] rounded-full bg-danger px-[22px] py-3.5 text-body-lg font-semibold text-white",
  dangerGhost:
    "rounded-full border border-border bg-transparent px-[18px] py-3 text-body text-danger",
  text: "rounded-sm bg-transparent px-3.5 py-2 text-body text-primary",
  kakao:
    "min-h-[54px] gap-2.5 rounded-full bg-kakao px-[22px] py-4 text-body-lg font-semibold text-kakao-foreground",
};

/** sm은 variant의 크기 관련 값을 덮어쓴다. */
const SIZE_SM_CLASS = "min-h-0 rounded-full px-3.5 py-2 text-body font-medium";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: "md" | "sm";
  /** 가로 전체를 채운다. */
  block?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:opacity-45 disabled:active:scale-100",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        VARIANT_CLASS[variant],
        size === "sm" && SIZE_SM_CLASS,
        block && "flex w-full",
        className,
      )}
      {...props}
    />
  );
}
