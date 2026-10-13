"use client";

import { useEffect, type RefObject } from "react";

export function useDragScroll(
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startY = 0;
    let startScroll = 0;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (e.button !== 0) return;

      isDown = true;
      moved = false;
      startY = e.clientY;
      startScroll = el.scrollTop;
      el.classList.add("is-dragging");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;

      const delta = e.clientY - startY;
      if (Math.abs(delta) > 4) moved = true;

      el.scrollTop = startScroll - delta;
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("is-dragging");
    };

    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [ref]);
}