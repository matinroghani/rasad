import type { Metadata, Viewport } from "next";
import "./globals.css";
import { yekan } from "@/lib/font/font";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import StoreProvider from "@/store/providers/StoreProvider";
import { Suspense } from "react";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteName = "RASAD | رایا سنجش دانا";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "سامانه هوشمند پایش هویت و بیماری دام؛ مدیریت اطلاعات دام‌ها، بررسی وضعیت سلامت و تحلیل داده‌های دامداری.",
  applicationName: siteName,
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f8f4",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        yekan.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <Suspense fallback={<div className="min-h-dvh" />}>
          <StoreProvider>
            <ThemeProvider>
              <ToastProvider />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
