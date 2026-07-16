/* work.js — render the selected-work section as large, alternating showcase rows.
   Each row is one project: oversized index + title/detail on one side, a visual
   panel on the other, sides alternating down the page. Clicking a row opens the
   project detail modal.

   Only the first FEATURED_COUNT rows show by default (23 full-height rows is too
   much scroll); the rest are revealed via a "View all" toggle. Category filters
   override the collapse and show every matching row. */

import { $, $$, el, pad2 } from "./utils.js";
import { projects } from "./data.js";

const CATEGORIES = [
  ["all", "All"],
  ["webapp", "Web Apps"],
  ["website", "Websites"],
  ["mobile", "Mobile"],
];

const FEATURED_COUNT = 6;

let expanded = false;
let currentFilter = "all";

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
    if (i >= FEATURED_COUNT) row.dataset.extra = "";
    target.append(row);
  });

  renderToggle(target);
  update();
}

function categoryLabel(cat) {
  return (CATEGORIES.find(([v]) => v === cat) || [, cat])[1];
}

function renderToggle(target) {
  const btn = el(
    "button",
    { type: "button", class: "work__more", "data-work-more": "", "data-cursor": "" },
    ""
  );
  btn.addEventListener("click", () => {
    expanded = !expanded;
    update();
    if (!expanded) {
      // Collapsing: bring the user back to the section top so they aren't stranded.
      $("#work")?.scrollIntoView({ behavior: "smooth" });
    }
  });
  target.after(btn);
}

/** Recompute which rows are visible from the current filter + expanded state. */
function update() {
  const filtered = currentFilter !== "all";
  const rows = $$("[data-work-grid] .work-row");
  let shownCount = 0;

  rows.forEach((row) => {
    const matches = currentFilter === "all" || row.dataset.category === currentFilter;
    const isExtra = row.hasAttribute("data-extra");
    // When filtering, show all matches. Otherwise honour the featured collapse.
    const show = matches && (filtered || expanded || !isExtra);
    row.style.display = show ? "" : "none";
    if (show) shownCount += 1;
  });

  const more = $("[data-work-more]");
  if (more) {
    const total = filtered
      ? rows.filter((r) => r.dataset.category === currentFilter).length
      : projects.length;
    // Hide the toggle while filtering or when nothing is collapsed.
    const hideToggle = filtered || total <= FEATURED_COUNT;
    more.style.display = hideToggle ? "none" : "";
    more.textContent = expanded ? "Show less ↑" : `View all ${total} projects →`;
  }

  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
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
    currentFilter = btn.dataset.filter;
    update();
    $$(".work__filter", bar).forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
    });
  });
}
