import type { ReactNode } from "react";
import { AppShell } from "@/components/common/AppShell";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
