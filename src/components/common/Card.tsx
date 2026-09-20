import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type CardVariant = "default" | "soft" | "emphasis" | "dark";

const VARIANT_CLASS: Record<CardVariant, string> = {
  default: "border border-border bg-background p-[18px]",
  soft: "bg-surface-muted p-[18px]",
  emphasis: "border border-primary/12 bg-primary-muted p-[18px]",
  dark: "bg-surface-dark p-5 text-surface-dark-foreground",
};

type CardProps = ComponentProps<"div"> & {
  variant?: CardVariant;
};

export function Card({ variant = "default", className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-lg", VARIANT_CLASS[variant], className)}
      {...props}
    />
  );
}
