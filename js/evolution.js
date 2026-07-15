/* evolution.js — the "portfolio journey" section: each version of the portfolio.
   Data lives here (v4-specific, not part of the shared project data). */

import { $, el } from "./utils.js";

const versions = [
  {
    version: "V1",
    year: "2023",
    url: "https://jazzdev-v1.vercel.app",
    description: "First iteration — simple, functional design focused on showcasing projects.",
    technologies: ["React", "CSS"],
  },
  {
    version: "V2",
    year: "2024",
    url: "https://jazzdev-v2.vercel.app",
    description: "Enhanced version with improved UI/UX and interactive elements.",
    technologies: ["Next.js", "Tailwind CSS", "GSAP"],
  },
  {
    version: "V3",
    year: "2025",
    url: "https://jazzdev-v3.vercel.app",
    description: "Professional portfolio with admin panel, analytics, and testimonials.",
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4"],
  },
  {
    version: "V4",
    year: "2026",
    url: "#",
    description: "Cinematic, framework-free build — HTML, CSS, JS and GSAP, animated end to end.",
    technologies: ["HTML5", "CSS3", "Vanilla JS", "GSAP"],
    isCurrent: true,
  },
];

export function renderEvolution() {
  const target = $("[data-evolution]");
  if (!target) return;

  versions.forEach((v) => {
    const card = el(
      "div",
      {
        class: "evo-card" + (v.isCurrent ? " evo-card--current" : ""),
        "data-reveal": "",
      },
      el(
        "div",
        { class: "evo-card__head" },
        el(
          "div",
          {},
          el("span", { class: "evo-card__version" }, v.version),
          el("span", { class: "evo-card__year" }, v.year)
        ),
        v.isCurrent ? el("span", { class: "evo-card__badge" }, "Current") : null
      ),
      el("p", { class: "evo-card__desc" }, v.description),
      el(
        "div",
        { class: "evo-card__tech" },
        ...v.technologies.map((t) => el("span", { class: "tag" }, t))
      ),
      v.isCurrent
        ? el("span", { class: "evo-card__active" }, "✓ You're viewing it")
        : el(
            "a",
            {
              class: "evo-card__link",
              href: v.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-cursor": "",
            },
            `View ${v.version} ↗`
          )
    );
    target.append(card);
  });
}
