/* experience.js — render the experience timeline and animate its spine on scroll. */

import { $, el } from "./utils.js";
import { profile } from "./data.js";

export function renderExperience() {
  const target = $("[data-timeline]");
  if (!target) return;

  // Spine + progress line live behind the items.
  const spine = el(
    "div",
    { class: "timeline__spine", "aria-hidden": "true" },
    el("div", { class: "timeline__progress", "data-timeline-progress": "" })
  );
  target.append(spine);

  profile.experience.forEach((job) => {
    const item = el(
      "div",
      { class: "timeline__item", "data-reveal": "", "data-timeline-item": "" },
      el(
        "div",
        { class: "timeline__meta" },
        el("div", { class: "timeline__period" }, job.period),
        el("div", {}, job.location)
      ),
      el(
        "div",
        {},
        el("h3", { class: "timeline__role" }, job.role),
        el("div", { class: "eyebrow timeline__company" }, job.company),
        el("p", { style: "margin-top:0.75rem;" }, job.description),
        el(
          "ul",
          { class: "timeline__highlights" },
          ...job.highlights.map((h) => el("li", {}, h))
        ),
        el("div", { class: "timeline__stack" }, job.skills)
      )
    );
    target.append(item);
  });
}

/** Draw the accent progress line and light up nodes as they pass the viewport middle. */
export function initTimeline(gsap, ScrollTrigger) {
  const timeline = $("[data-timeline]");
  const progress = $("[data-timeline-progress]");
  if (!timeline || !progress) return;

  gsap.to(progress, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: timeline,
      start: "top 60%",
      end: "bottom 80%",
      scrub: 0.5,
    },
  });

  timeline.querySelectorAll("[data-timeline-item]").forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 65%",
      end: "bottom 35%",
      onToggle: (self) =>
        item.toggleAttribute("data-active", self.isActive),
    });
  });
}
