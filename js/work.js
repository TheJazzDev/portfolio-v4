/* work.js — render the selected-work reel and (on wide screens) pin it for a
   scroll-scrubbed horizontal sweep. Without JS it degrades to a swipeable track. */

import { $, el, pad2 } from "./utils.js";
import { projects } from "./data.js";

export function renderWork() {
  const target = $("[data-work-grid]");
  if (!target) return;

  projects.forEach((project, i) => {
    const link = project.liveDemoLink || project.githubLink;

    const card = el(
      "article",
      { class: "project-card", "data-cursor": "" },
      el("span", { class: "project-card__index" }, pad2(i + 1)),
      link ? el("span", { class: "project-card__arrow" }, "↗") : null,
      project.status ? el("span", { class: "status-pill" }, project.status) : null,
      el("h3", { class: "project-card__title" }, project.title),
      el("p", {}, project.description),
      el("div", { class: "project-card__stack" }, project.languages),
      el(
        "div",
        { class: "project-card__tags" },
        ...project.tags.slice(0, 4).map((tag) => el("span", { class: "tag" }, tag))
      )
    );

    if (link) {
      card.style.position = "relative";
      card.append(
        el("a", {
          href: link,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `${project.title} — open link`,
          style: "position:absolute;inset:0;",
        })
      );
    }

    target.append(card);
  });
}

/** Pin the work section and translate the track horizontally as the user scrolls. */
export function initWorkReel(gsap, ScrollTrigger) {
  const section = $(".work");
  const viewport = $("[data-work-viewport]");
  const track = $("[data-work-grid]");
  if (!section || !viewport || !track) return;

  // Only pin on wider screens with enough overflow to be worth it.
  const mq = window.matchMedia("(min-width: 900px)");
  if (!mq.matches) return;

  const getScrollDistance = () => track.scrollWidth - viewport.clientWidth;
  if (getScrollDistance() <= 0) return;

  section.classList.add("work--pinned");

  gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => "+=" + getScrollDistance(),
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}
