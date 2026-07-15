/* splitText.js — lightweight word/char splitter for reveal animations.
   Wraps each word in a span so lines can be masked and animated. Keeps the
   original text in the a11y tree (aria-label) and hides shards from AT. */

export function splitLines(node) {
  const text = node.textContent.trim();
  node.setAttribute("aria-label", text);

  const words = text.split(/\s+/);
  node.textContent = "";

  const spans = words.map((word) => {
    const inner = document.createElement("span");
    inner.textContent = word;
    inner.setAttribute("aria-hidden", "true");
    inner.style.display = "inline-block";
    inner.style.willChange = "transform";

    const outer = document.createElement("span");
    outer.style.display = "inline-block";
    outer.style.overflow = "hidden";
    outer.style.verticalAlign = "top";
    outer.append(inner);
    node.append(outer, document.createTextNode(" "));
    return inner;
  });

  return spans;
}
