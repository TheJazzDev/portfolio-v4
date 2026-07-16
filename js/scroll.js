/* scroll.js — Lenis smooth momentum scroll + GSAP ScrollTrigger wiring.
   Lenis gives the buttery inertia feel; it drives ScrollTrigger via GSAP's ticker
   so scroll-linked animations stay in sync. Defensive: if Lenis fails to load or
   reduced-motion is on, we fall back to native scroll and still run ScrollTrigger. */

import { prefersReducedMotion } from "./utils.js";

let lenis = null;

export async function initScroll(gsap, ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  // Expose for non-motion modules that need a refresh (e.g. work filters).
  window.ScrollTrigger = ScrollTrigger;

  const reduced = prefersReducedMotion();

  if (!reduced) {
    try {
      const { default: Lenis } = await import("../assets/vendor/lenis/lenis.mjs");
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
        smoothWheel: true,
        syncTouch: false, // native touch scroll on mobile feels better
      });

      // Keep ScrollTrigger in sync with Lenis.
      lenis.on("scroll", ScrollTrigger.update);

      // Drive Lenis from GSAP's ticker (single rAF source of truth).
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      window.lenis = lenis; // for anchor handling / debugging
    } catch (err) {
      console.warn("[v4] Lenis not loaded; native scroll.", err);
    }
  }

  // Smooth-scroll in-page anchor links through Lenis when available.
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href");
    if (id.length < 2) return;
    const dest = document.querySelector(id);
    if (!dest) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(dest, { offset: -72 });
    else dest.scrollIntoView({ behavior: "smooth" });
  });

  // Refresh triggers after fonts/layout settle.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());

  if (reduced) {
    ScrollTrigger.getAll().forEach((t) => t.disable());
  }
}
