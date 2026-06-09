"use client";

import { useEffect, useRef } from "react";

// A soft colored glow that follows the cursor.
// Uses a rAF loop + lerp so the color drifts toward the pointer smoothly.
// Disabled for touch / reduced-motion users.
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glow = { x: target.x, y: target.y };
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const tick = () => {
      glow.x += (target.x - glow.x) * 0.12;
      glow.y += (target.y - glow.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[450px] w-[450px] rounded-full opacity-0 blur-[65px] transition-opacity duration-500 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(94,233,181,0.20) 0%, rgba(0,186,118,0.10) 35%, rgba(0,153,102,0) 72%)",
        willChange: "transform",
      }}
    />
  );
}
