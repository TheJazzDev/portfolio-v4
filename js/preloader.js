/* preloader.js — GSAP-driven intro loader. Counts 0→100, fills the bar, then
   wipes away and resolves so the hero animation can start. Always resolves, even
   on error, so the site is never blocked. */

import { $, prefersReducedMotion } from "./utils.js";

export function runPreloader(gsap) {
  return new Promise((resolve) => {
    const root = $("[data-preloader]");
    if (!root) return resolve();

    // Signal that JS is driving the exit (disables CSS fallback animations).
    root.classList.add("js-driven");
    document.documentElement.classList.add("js-ready");

    const countEl = $("[data-preloader-count]", root);
    const barEl = $("[data-preloader-bar]", root);

    const finish = () => {
      root.setAttribute("data-done", "");
      resolve();
    };

    // Safety: never let the preloader hang.
    const safety = setTimeout(finish, 3000);

    if (prefersReducedMotion()) {
      clearTimeout(safety);
      setTimeout(finish, 250);
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safety);
        finish();
      },
    });

    tl.to(counter, {
      v: 100,
      duration: 1.4,
      ease: "power2.inOut",
      onUpdate: () => {
        const n = Math.round(counter.v);
        if (countEl) countEl.textContent = n;
        if (barEl) barEl.style.width = n + "%";
      },
    }).to({}, { duration: 0.25 }); // brief hold at 100
  });
}
