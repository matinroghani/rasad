"use client";

import { useEffect, useState } from "react";

const words = [
  "پایش هوشمند دامداری",
  "مدیریت سلامت گله",
  "تحلیل داده‌های دامداری",
  "مدیریت تولید شیر",
];

export default function TypingEffect() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 350);
    } else {
      timeout = setTimeout(
        () => {
          setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
        },
        isDeleting ? 45 : 85,
      );
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWord.length]);

  return (
    <span
      dir="rtl"
      className="inline-flex h-5 min-w-0 max-w-full items-center overflow-hidden whitespace-nowrap"
    >
      <span className="truncate">{currentWord.slice(0, charIndex)}</span>

      <span
        aria-hidden="true"
        className="mr-1 inline-block h-3.5 w-0.75 shrink-0 animate-pulse rounded-full bg-[#c0b5a2]"
      />
    </span>
  );
}