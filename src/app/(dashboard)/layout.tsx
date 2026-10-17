import DashboardMotion from "@/components/layout/DashboardMotion";
import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import type { ReactNode } from "react";

type DashboardLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div
      className={[
        "flex h-dvh w-full flex-col gap-3 overflow-hidden",
        "bg-(--bg-main) p-2 sm:p-3.5",
        "text-(--text-main)",
      ].join(" ")}
    >
      <Header />

      <div className="flex min-h-0 flex-1 items-stretch gap-4.5 overflow-hidden">
        <Sidebar />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
          <main
            className={[
              "dashboard-content-scroll",
              "relative z-1 flex min-h-0 min-w-0 flex-1 flex-col",
              "overflow-y-auto rounded-lg",
              "border-[1.5px] border-(--panel-border)",
              "bg-(--panel-bg)",
              "p-3 shadow-(--shadow-sm)",
              "sm:p-5.5",
            ].join(" ")}
          >
            <DashboardMotion>{children}</DashboardMotion>
          </main>
        </div>
      </div>
    </div>
  );
}
