/* modal.js — project detail overlay. Opens when a work card is activated and
   renders the full project detail (description, tech stack, features, highlights,
   micro-apps, npm packages, impact, tags, links) — mirroring the v3 modal. */

import { $, el } from "./utils.js";
import { projects } from "./data.js";

let lastFocused = null;

function section(title, node) {
  return el(
    "div",
    { class: "modal__section" },
    el("h3", { class: "modal__heading" }, title),
    node
  );
}

function list(items, marker, cls = "") {
  return el(
    "ul",
    { class: `modal__list ${cls}` },
    ...items.map((item) =>
      el(
        "li",
        { class: "modal__list-item" },
        el("span", { class: "modal__marker" }, marker),
        el("span", {}, item)
      )
    )
  );
}

function buildBody(project) {
  const body = el("div", { class: "modal__body" });

  body.append(
    el(
      "div",
      { class: "modal__lead" },
      el("p", {}, project.fullDescription || project.description)
    )
  );

  if (project.architecture) {
    body.append(
      el(
        "div",
        { class: "modal__callout" },
        el("h3", { class: "modal__heading" }, "Architecture"),
        el("p", {}, project.architecture)
      )
    );
  }

  body.append(
    el(
      "div",
      { class: "modal__callout modal__callout--accent" },
      el("h3", { class: "modal__heading" }, "Tech Stack"),
      el("p", { class: "modal__stack" }, project.languages)
    )
  );

  if (project.features) body.append(section("Key Features", list(project.features, "✦", "modal__list--grid")));
  if (project.keyFeatures) body.append(section("Key Features", list(project.keyFeatures, "✦", "modal__list--grid")));
  if (project.technicalHighlights)
    body.append(section("Technical Highlights", list(project.technicalHighlights, "▸")));
  if (project.microApps) body.append(section("Micro Apps", list(project.microApps, "◆", "modal__list--grid")));

  if (project.npmPackages) {
    const pkgs = el(
      "div",
      { class: "modal__packages" },
      ...project.npmPackages.map((pkg) =>
        el(
          "a",
          { href: pkg.link, target: "_blank", rel: "noopener noreferrer", class: "modal__package" },
          el("div", { class: "modal__package-name" }, pkg.name),
          el("div", { class: "modal__package-desc" }, pkg.description)
        )
      )
    );
    body.append(section("NPM Packages", pkgs));
  }

  if (project.impact) {
    body.append(
      el(
        "div",
        { class: "modal__callout modal__callout--impact" },
        el("h3", { class: "modal__heading" }, "Impact"),
        el("p", {}, project.impact)
      )
    );
  }

  body.append(
    el(
      "div",
      { class: "modal__tags" },
      ...project.tags.map((t) => el("span", { class: "tag" }, t))
    )
  );

  const links = el("div", { class: "modal__links" });
  if (project.liveDemoLink)
    links.append(
      el(
        "a",
        { href: project.liveDemoLink, target: "_blank", rel: "noopener noreferrer", class: "btn btn--primary" },
        "↗ Live Demo"
      )
    );
  if (project.githubLink)
    links.append(
      el(
        "a",
        { href: project.githubLink, target: "_blank", rel: "noopener noreferrer", class: "btn btn--ghost" },
        "◇ View Code"
      )
    );
  if (links.children.length) body.append(links);

  return body;
}

export function initModal() {
  const root = $("[data-modal]");
  if (!root) return;

  const panel = $("[data-modal-panel]", root);
  const titleEl = $("[data-modal-title]", root);
  const roleEl = $("[data-modal-role]", root);
  const bodyMount = $("[data-modal-content]", root);

  const close = () => {
    root.removeAttribute("data-open");
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  };

  const open = (project) => {
    titleEl.textContent = project.title;
    roleEl.textContent = project.role || "";
    roleEl.style.display = project.role ? "" : "none";
    bodyMount.replaceChildren(buildBody(project));
    panel.scrollTop = 0;
    root.setAttribute("data-open", "");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("[data-modal-close]", root)?.focus();
  };

  // Open when a work card is activated.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-project-id]");
    if (!trigger) return;
    e.preventDefault();
    const project = projects.find((p) => p.id === trigger.dataset.projectId);
    if (project) {
      lastFocused = trigger;
      open(project);
    }
  });

  $("[data-modal-close]", root)?.addEventListener("click", close);
  root.addEventListener("click", (e) => {
    if (e.target === root) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.hasAttribute("data-open")) close();
  });
}
