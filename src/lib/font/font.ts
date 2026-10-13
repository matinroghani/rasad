// src/lib/font/font.ts
import localFont from "next/font/local";

export const yekan = localFont({
  src: [
    {
      path: "../../../public/fonts/YekanBakhFaNum-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/YekanBakhFaNum-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/YekanBakhFaNum-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yekan",
  display: "swap",
});