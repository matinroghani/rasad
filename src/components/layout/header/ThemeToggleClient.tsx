
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import TopBarButton from "@/components/ui/TopBarButton";

export default function ThemeToggleClient() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <TopBarButton
      icon={
        isDark ? (
          <Sun size={17} strokeWidth={1.8} />
        ) : (
          <Moon size={17} strokeWidth={1.8} />
        )
      }
      title={
        isDark
          ? "فعال‌سازی تم روشن"
          : "فعال‌سازی تم تاریک"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
