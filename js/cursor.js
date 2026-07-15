/* cursor.js — magnetic custom cursor (desktop / fine-pointer only) */

import { $, prefersReducedMotion } from "./utils.js";

export function initCursor(gsap) {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const cursor = $(".cursor");
  if (!cursor) return;

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

  window.addEventListener("pointermove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  // Grow over interactive targets.
  const grow = () => gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power3" });
  const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3" });

  document.querySelectorAll("a, button, [data-cursor]").forEach((node) => {
    node.addEventListener("pointerenter", grow);
    node.addEventListener("pointerleave", shrink);
  });
}
