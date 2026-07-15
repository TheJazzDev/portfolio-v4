/* stats.js — render the hero stats row and count numbers up on scroll-in. */

import { $, el } from "./utils.js";
import { stats } from "./data.js";

const LABELS = {
  yearsOfExperience: "Years Experience",
  projectsCompleted: "Projects",
  npmDownloads: "NPM Downloads",
  clients: "Clients",
};

export function renderStats() {
  const target = $("[data-hero-stats]");
  if (!target) return;

  Object.entries(stats).forEach(([key, value]) => {
    target.append(
      el(
        "div",
        { class: "hero__stat" },
        el("dd", { "data-count": value }, value),
        el("dt", {}, LABELS[key] || key)
      )
    );
  });
}

/** Animate the numeric portion of each stat up from zero. */
export function animateStats(gsap) {
  $("[data-hero-stats]")
    ?.querySelectorAll("[data-count]")
    .forEach((node) => {
      const raw = node.dataset.count; // e.g. "1000+", "4+"
      const num = parseInt(raw, 10);
      if (Number.isNaN(num)) return;
      const suffix = raw.replace(/[0-9]/g, "");

      const obj = { v: 0 };
      gsap.to(obj, {
        v: num,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.4,
        onUpdate: () => {
          node.textContent = Math.round(obj.v) + suffix;
        },
      });
    });
}
