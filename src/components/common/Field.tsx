import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

const FIELD_CLASS =
  "w-full rounded-md border border-border bg-background px-4 py-3.5 text-body-lg text-foreground outline-none transition placeholder:text-foreground-muted focus:border-primary focus:shadow-focus";

/** 라벨·입력·도움말을 묶는 세로 그룹. */
export function FieldGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function FieldLabel({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-caption font-semibold text-foreground-dim",
        className,
      )}
      {...props}
    />
  );
}

/** 입력 아래 도움말. 글자수 카운터를 함께 두려면 counter를 넘긴다. */
export function FieldHelp({
  children,
  counter,
  className,
}: {
  children?: ReactNode;
  counter?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <span className="px-0.5 text-caption text-foreground-secondary">
        {children}
      </span>
      {counter != null && (
        <span className="text-caption text-foreground-secondary tabular-nums">
          {counter}
        </span>
      )}
    </div>
  );
}

export function TextField({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(FIELD_CLASS, className)} {...props} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        FIELD_CLASS,
        "min-h-24 resize-none leading-[1.44]",
        className,
      )}
      {...props}
    />
  );
}
