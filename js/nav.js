/* nav.js — mobile menu toggle. Works without GSAP (pure DOM), so it's initialised
   from renderContent, not the motion path — navigation must never depend on GSAP. */

import { $, $$ } from "./utils.js";

export function initNav() {
  const toggle = $("[data-nav-toggle]");
  const menu = $("[data-mobile-menu]");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.toggleAttribute("data-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () =>
    setOpen(!menu.hasAttribute("data-open"))
  );

  // Close on link click and on Escape.
  $$(".mobile-menu__link", menu).forEach((link) =>
    link.addEventListener("click", () => setOpen(false))
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.hasAttribute("data-open")) setOpen(false);
  });
}
