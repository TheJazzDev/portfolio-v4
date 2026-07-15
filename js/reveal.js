/* reveal.js — generic scroll-in reveals for [data-reveal] elements.
   Robustness: reveals must degrade to "visible". Each element gets a ScrollTrigger
   that fades it in; a per-page safety fallback force-reveals everything if rAF is
   throttled (background/inspected tab) so content is never permanently hidden. */

import { $$ } from "./utils.js";

export function initReveals(gsap) {
  const items = $$("[data-reveal]");

  const show = (el) =>
    gsap.set(el, { clearProps: "transform,opacity", opacity: 1, y: 0 });

  items.forEach((item) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 85%", once: true },
    });
  });

  // Safety net: if nothing has revealed shortly after init (rAF stalled), show all.
  setTimeout(() => {
    const anyHidden = items.some((el) => getComputedStyle(el).opacity === "0");
    const inView = items.filter(
      (el) => el.getBoundingClientRect().top < window.innerHeight
    );
    // If in-view items are still hidden, rAF/ScrollTrigger isn't running — reveal all.
    if (anyHidden && inView.some((el) => getComputedStyle(el).opacity === "0")) {
      items.forEach(show);
    }
  }, 1500);
}
