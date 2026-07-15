/* experience.js — render the experience timeline from data */

import { $, el } from "./utils.js";
import { profile } from "./data.js";

export function renderExperience() {
  const target = $("[data-timeline]");
  if (!target) return;

  profile.experience.forEach((job) => {
    const item = el(
      "div",
      { class: "timeline__item", "data-reveal": "" },
      el(
        "div",
        { class: "timeline__meta" },
        el("div", { class: "accent" }, job.period),
        el("div", {}, job.location)
      ),
      el(
        "div",
        {},
        el("h3", { class: "timeline__role" }, job.role),
        el("div", { class: "eyebrow", style: "margin-top:0.5rem;" }, job.company),
        el("p", { style: "margin-top:0.75rem;" }, job.description),
        el(
          "ul",
          { class: "timeline__highlights" },
          ...job.highlights.map((h) => el("li", {}, h))
        )
      )
    );
    target.append(item);
  });
}
