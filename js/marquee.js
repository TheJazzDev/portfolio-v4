/* marquee.js — infinite horizontal marquee for the skills strip */

import { $$, prefersReducedMotion } from "./utils.js";

export function initMarquees(gsap) {
  if (prefersReducedMotion()) return;

  $$(".marquee__track").forEach((track) => {
    // Duplicate content so the loop is seamless.
    track.innerHTML += track.innerHTML;
    const distance = track.scrollWidth / 2;
    const speed = Number(track.dataset.speed) || 40; // px/sec

    gsap.to(track, {
      x: -distance,
      duration: distance / speed,
      ease: "none",
      repeat: -1,
    });
  });
}
