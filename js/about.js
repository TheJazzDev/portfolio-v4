/* about.js — render bio + skills marquee from data */

import { $, el } from "./utils.js";
import { profile } from "./data.js";

export function renderAbout() {
  const bioTarget = $("[data-about-bio]");
  if (bioTarget) {
    profile.bio
      .split("\n\n")
      .forEach((para) => bioTarget.append(el("p", { "data-reveal": "" }, para.trim())));
  }

  const marqueeTarget = $("[data-skills-marquee]");
  if (marqueeTarget) {
    const skills = Object.values(profile.skills).flat();
    const item = el("span", { class: "marquee__item" });
    skills.forEach((skill) => {
      item.append(el("span", {}, skill));
      item.append(el("span", { class: "accent" }, "✦"));
    });
    marqueeTarget.append(item);
  }
}
