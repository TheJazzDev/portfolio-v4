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

  initContactForm();
}

/** Contact form: validate, then compose a mailto to the profile email. */
function initContactForm() {
  const form = $("[data-contact-form]");
  const status = $("[data-contact-status]");
  if (!form) return;

  const setStatus = (msg, kind) => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.kind = kind || "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const subject = (data.get("subject") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!name || !email || !subject || !message) {
      setStatus("Please fill in every field.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    const body = `Hi Taiwo,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = href;
    setStatus("Opening your email app…", "success");
    form.reset();
    setTimeout(() => setStatus("", ""), 6000);
  });
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
