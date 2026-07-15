/* hero.js — hero intro: split-text headline reveal.
   Robustness rule: the hero must NEVER be left hidden. GSAP `from` tweens set a
   hidden start state that only clears once the animation runs; if rAF is throttled
   or GSAP stalls, that would hide content. So we animate as enhancement and
   guarantee a visible end-state via onComplete + a safety fallback. */

import { $, $$, prefersReducedMotion } from "./utils.js";
import { splitLines } from "./splitText.js";

const REVEAL_TARGETS = [".hero__eyebrow", ".hero__sub", ".hero__actions"];

export function initHero(gsap) {
  const title = $(".hero__title");
  if (!title) return;

  const lines = $$(".line", title);
  const allShards = lines.flatMap((line) => splitLines(line));

  const reveal = () => {
    gsap.set(allShards, { clearProps: "transform,opacity" });
    REVEAL_TARGETS.forEach((sel) => {
      const node = $(sel);
      if (node) gsap.set(node, { clearProps: "transform,opacity", opacity: 1, y: 0 });
    });
  };

  if (prefersReducedMotion()) {
    reveal();
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: reveal, // land on the natural, fully-visible state
  });

  tl.from(allShards, { yPercent: 120, duration: 1, stagger: 0.04 })
    .from(".hero__eyebrow", { opacity: 0, y: 20, duration: 0.6 }, "-=0.6")
    .from(".hero__sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
    .from(".hero__actions", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

  // Safety net: if the timeline hasn't progressed shortly after start (e.g. rAF
  // throttled in a background/inspected tab), force everything visible.
  setTimeout(() => {
    if (tl.progress() === 0) {
      tl.kill();
      reveal();
    }
  }, 1200);
}
