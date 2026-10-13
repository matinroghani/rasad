import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

type DashboardLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div
      className={[
        "flex min-h-dvh w-full flex-col gap-3",
        "bg-(--bg-main) p-2 sm:p-3.5",
        "text-(--text-main)",
      ].join(" ")}
    >
      <Header />

      <div className="flex min-h-0 flex-1 items-start gap-4.5">
        <Sidebar />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4">
          <main
            className={[
              "relative z-1 min-h-0 flex-1",
              "min-w-0 rounded-lg",
              "border-[1.5px] border-(--panel-border)",
              "bg-(--panel-bg)",
              "p-3 shadow-(--shadow-sm)",
              "sm:p-5.5",
            ].join(" ")}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}