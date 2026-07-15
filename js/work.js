/* work.js — render the selected-work reel and (on wide screens) pin it for a
   scroll-scrubbed horizontal sweep. Without JS it degrades to a swipeable track. */

import { $, $$, el, pad2 } from "./utils.js";
import { projects } from "./data.js";

const CATEGORIES = [
  ["all", "All"],
  ["webapp", "Web Apps"],
  ["website", "Websites"],
  ["mobile", "Mobile"],
];

export function renderWork() {
  const target = $("[data-work-grid]");
  if (!target) return;

  renderFilters();

  projects.forEach((project, i) => {
    const card = el(
      "button",
      {
        type: "button",
        class: "project-card",
        "data-cursor": "",
        "data-project-id": project.id,
        "aria-label": `${project.title} — view details`,
      },
      el("span", { class: "project-card__index" }, pad2(i + 1)),
      el("span", { class: "project-card__arrow" }, "→"),
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
    card.dataset.category = project.category;
    target.append(card);
  });
}

function renderFilters() {
  const bar = $("[data-work-filters]");
  if (!bar) return;

  CATEGORIES.forEach(([value, label], i) => {
    bar.append(
      el(
        "button",
        {
          type: "button",
          class: "work__filter" + (i === 0 ? " is-active" : ""),
          role: "tab",
          "aria-selected": i === 0 ? "true" : "false",
          "data-filter": value,
          "data-cursor": "",
        },
        label
      )
    );
  });

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    applyFilter(btn.dataset.filter);
    $$(".work__filter", bar).forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
  });
}

function applyFilter(category) {
  $$("[data-work-grid] .project-card").forEach((card) => {
    const show = category === "all" || card.dataset.category === category;
    card.style.display = show ? "" : "none";
  });
  // The reel width changed — let ScrollTrigger recompute the pin distance.
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
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
