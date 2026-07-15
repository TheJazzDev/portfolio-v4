/* main.js — entry point.
   Order: render data-driven DOM -> mark js-ready -> register GSAP -> animate.
   GSAP is vendored as ESM under assets/vendor/. If it fails to load, the site
   still shows all content (progressive enhancement). */

import { renderAbout } from "./about.js";
import { renderWork } from "./work.js";
import { renderExperience } from "./experience.js";
import { renderContact } from "./contact.js";
import { renderStats } from "./stats.js";

// Render content that comes from data.js (safe without GSAP).
function renderContent() {
  renderStats();
  renderAbout();
  renderWork();
  renderExperience();
  renderContact();
}

async function initMotion() {
  let gsap, ScrollTrigger;
  try {
    ({ gsap } = await import("../assets/vendor/gsap/index.js"));
    ({ ScrollTrigger } = await import("../assets/vendor/gsap/ScrollTrigger.js"));
  } catch (err) {
    // No GSAP -> leave the static site fully visible.
    console.warn("[v4] GSAP not loaded; running static.", err);
    return;
  }

  // Only now do we allow the CSS that hides pre-animation state.
  document.documentElement.classList.add("js-ready");

  const { initScroll } = await import("./scroll.js");
  const { initHero } = await import("./hero.js");
  const { initReveals } = await import("./reveal.js");
  const { initMarquees } = await import("./marquee.js");
  const { initCursor } = await import("./cursor.js");
  const { animateStats } = await import("./stats.js");
  const { initWorkReel } = await import("./work.js");

  initScroll(gsap, ScrollTrigger);
  initHero(gsap);
  initReveals(gsap);
  initMarquees(gsap);
  initCursor(gsap);
  animateStats(gsap);
  initWorkReel(gsap, ScrollTrigger);
}

function boot() {
  renderContent();
  initMotion();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
