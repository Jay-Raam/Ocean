import { useEffect, useRef } from "react";
import { useApp } from "../../lib/AppContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Custom cursor: a fixed dot that lerps toward the
 * pointer (x += (target - x) / 5 per frame) and grows into a frosted
 * bubble carrying a contextual label ("View", "Next", "Prev", …).
 * Only initialised on hover-capable devices ≥1025px.
 */
export function CustomCursor() {
  const { cursorBubble } = useApp();
  const cursorRef = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery("(hover: hover) and (min-width: 1025px)");

  useEffect(() => {
    if (!canHover) return;

    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;
    let initialized = false;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!initialized) {
        initialized = true;
        cursor.classList.add("cursor-init");
      }
    };

    const loop = () => {
      currentX += (x - currentX) / 5;
      currentY += (y - currentY) / 5;
      cursor.style.left = `${currentX}px`;
      cursor.style.top = `${currentY}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div className={`cursor-bubble ${cursorBubble ? "cursor-active" : ""}`}>
        <div className="cursor-before" />
        <span className="cursor-text">{cursorBubble ?? ""}</span>
      </div>
    </div>
  );
}

/** Component that registers cursor-bubble text on hover of interactive elements. */
export function useCursorBubble(text: string | null) {
  const { setCursorBubble } = useApp();
  return {
    onMouseEnter: () => setCursorBubble(text),
    onMouseLeave: () => setCursorBubble(null),
  };
}
