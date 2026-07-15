/* contact.js — wire up contact email + socials from data */

import { $, el } from "./utils.js";
import { profile } from "./data.js";

export function renderContact() {
  const email = $("[data-contact-email]");
  if (email) {
    email.textContent = profile.email;
    email.href = `mailto:${profile.email}`;
  }

  const socials = $("[data-contact-socials]");
  if (socials) {
    const links = [
      ["GitHub", profile.github],
      ["LinkedIn", profile.linkedin],
      ["Twitter", profile.twitter],
    ];
    links.forEach(([label, href]) => {
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
}
