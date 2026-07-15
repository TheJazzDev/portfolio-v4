/* contact.js — wire up the contact finale: email, socials, closing marquee. */

import { $, $$, el } from "./utils.js";
import { splitLines } from "./splitText.js";
import { profile } from "./data.js";

export function renderContact() {
  const email = $("[data-contact-email]");
  if (email) {
    email.textContent = profile.email;
    email.href = `mailto:${profile.email}`;
  }

  const socials = $("[data-contact-socials]");
  if (socials) {
    [
      ["GitHub", profile.github],
      ["LinkedIn", profile.linkedin],
      ["Twitter", profile.twitter],
    ].forEach(([label, href]) => {
      socials.append(
        el(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            class: "nav__link",
            "data-cursor": "",
          },
          label
        )
      );
    });
  }

  const marquee = $("[data-contact-marquee]");
  if (marquee) {
    const item = el("span", { class: "marquee__item" });
    const words = ["Let's Talk", "Available for Work", "Get in Touch", "Say Hello"];
    words.forEach((w) => {
      item.append(el("span", {}, w));
      item.append(el("span", {}, "✦"));
    });
    marquee.append(item);
  }

  const copyright = $("[data-contact-copyright]");
  if (copyright) {
    copyright.textContent = `© ${new Date().getFullYear()} ${profile.name}`;
  }
}

/** Reveal the contact title lines when the finale scrolls into view. */
export function initContact(gsap) {
  const title = $(".contact__title");
  if (!title) return;

  const shards = $$(".line", title).flatMap((line) => splitLines(line));

  gsap.from(shards, {
    yPercent: 120,
    duration: 0.9,
    stagger: 0.06,
    ease: "power4.out",
    scrollTrigger: { trigger: title, start: "top 80%", once: true },
    onComplete: () => gsap.set(shards, { clearProps: "transform" }),
  });
}
