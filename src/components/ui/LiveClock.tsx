"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date());

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time
    ? time.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  const formattedDate = time
    ? new Intl.DateTimeFormat("fa-IR", {
        calendar: "persian",
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }).format(time)
    : " ";

  return (
    <div
      className={[
        "flex min-w-0 shrink-0 flex-col items-end",
        "rounded-md border border-white/15 bg-white/[0.06]",
        "px-2 py-1 text-[#e8f2e8] backdrop-blur-md",
        "sm:px-3 sm:py-1.5",
      ].join(" ")}
    >
      <span className="text-xs font-bold tabular-nums tracking-wide sm:text-sm">
        {formattedTime}
      </span>

      <span className="max-w-full truncate text-[9px] opacity-75 sm:text-[10px]">
        {formattedDate}
      </span>
    </div>
  );
}
