/* scroll.js — smooth scroll + ScrollTrigger wiring.
   Uses GSAP ScrollTrigger; keeps native scroll (no scroll-hijack library yet).
   A smooth-scroll library (e.g. Lenis) can be vendored in later and hooked here. */

import { prefersReducedMotion } from "./utils.js";

export function initScroll(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Refresh triggers after fonts/layout settle.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());

  // Reduced motion: disable scroll-driven tweens entirely.
  if (prefersReducedMotion()) {
    ScrollTrigger.getAll().forEach((t) => t.disable());
  }
}
