import type { Metadata, Viewport } from "next";
import "./globals.css";
import { yekan } from "@/lib/font/font";

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

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${yekan.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
