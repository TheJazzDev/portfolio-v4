/* work.js — render the selected-work section as large, alternating showcase rows.
   Each row is one project: oversized index + title/detail on one side, a visual
   panel on the other, sides alternating down the page. Clicking a row opens the
   project detail modal. */

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
    const row = el(
      "button",
      {
        type: "button",
        class: "work-row",
        "data-cursor": "",
        "data-project-id": project.id,
        "data-reveal": "",
        "aria-label": `${project.title} — view details`,
      },
      // Visual / index panel
      el(
        "div",
        { class: "work-row__visual" },
        el("span", { class: "work-row__index" }, pad2(i + 1)),
        el(
          "div",
          { class: "work-row__tags" },
          ...project.tags.slice(0, 3).map((t) => el("span", { class: "tag" }, t))
        )
      ),
      // Content panel
      el(
        "div",
        { class: "work-row__content" },
        project.status
          ? el("span", { class: "status-pill" }, project.status)
          : el("span", { class: "work-row__cat" }, categoryLabel(project.category)),
        el("h3", { class: "work-row__title" }, project.title),
        el("p", { class: "work-row__desc" }, project.description),
        el("div", { class: "work-row__stack" }, project.languages),
        el(
          "span",
          { class: "work-row__cta" },
          "View Project ",
          el("span", { class: "work-row__arrow" }, "→")
        )
      )
    );
    row.dataset.category = project.category;
    target.append(row);
  });
}

function categoryLabel(cat) {
  return (CATEGORIES.find(([v]) => v === cat) || [, cat])[1];
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
  $$("[data-work-grid] .work-row").forEach((row) => {
    const show = category === "all" || row.dataset.category === category;
    row.style.display = show ? "" : "none";
  });
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}
