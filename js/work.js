/* work.js — render the selected-work grid from data */

import { $, el, pad2 } from "./utils.js";
import { projects } from "./data.js";

export function renderWork() {
  const target = $("[data-work-grid]");
  if (!target) return;

  projects.forEach((project, i) => {
    const card = el(
      "article",
      { class: "project-card", "data-reveal": "", "data-cursor": "" },
      el("span", { class: "project-card__index" }, pad2(i + 1)),
      project.status ? el("span", { class: "status-pill" }, project.status) : null,
      el("h3", { class: "project-card__title" }, project.title),
      el("p", {}, project.description),
      el(
        "div",
        { class: "project-card__tags" },
        ...project.tags.slice(0, 4).map((tag) => el("span", { class: "tag" }, tag))
      )
    );

    // Whole card links out when a live/GitHub link exists.
    const link = project.liveDemoLink || project.githubLink;
    if (link) {
      const anchor = el("a", {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${project.title} — open link`,
        class: "project-card__link",
        style: "position:absolute;inset:0;",
      });
      card.style.position = "relative";
      card.append(anchor);
    }

    target.append(card);
  });
}
