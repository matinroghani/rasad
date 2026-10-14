import { useCallback, useEffect, useRef, useState } from "react";

export default function useSidebarScrollIndicator() {
  const navRef = useRef<HTMLElement>(null);
  const [canScrollDown, setCanScrollDown] = useState(false);

  const updateScrollIndicator = useCallback(() => {
    const nav = navRef.current;

    if (!nav) return;

    const hasMoreContent = nav.scrollHeight > nav.clientHeight + 2;

    const isAtBottom =
      nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 4;

    setCanScrollDown(hasMoreContent && !isAtBottom);
  }, []);

  useEffect(() => {
    const nav = navRef.current;

    if (!nav) return;

    updateScrollIndicator();

    nav.addEventListener("scroll", updateScrollIndicator, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateScrollIndicator);

    resizeObserver.observe(nav);

    if (nav.firstElementChild) {
      resizeObserver.observe(nav.firstElementChild);
    }

    return () => {
      nav.removeEventListener("scroll", updateScrollIndicator);
      resizeObserver.disconnect();
    };
  }, [updateScrollIndicator]);

  return {
    navRef,
    canScrollDown,
  };
}
