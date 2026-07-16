/* hero-bg.js — interactive hero background with three switchable modes:
     "particles" · "plexus" · "blobs"
   Canvas 2D (reliably visible, cheap, cursor-reactive). Defensive: no-ops on
   reduced motion; if the canvas 2D context is missing, the static hero remains.

   Switch modes at runtime: window.setHeroBg('plexus'). The chosen mode persists
   in localStorage so a picked winner sticks. */

import { prefersReducedMotion } from "./utils.js";

const MODES = ["particles", "plexus", "blobs"];
const STORE_KEY = "v4-hero-bg";

export function initHeroBg() {
  if (prefersReducedMotion()) return;

  const canvas = document.querySelector("[data-hero-bg]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const hero = canvas.closest(".hero") || canvas.parentElement;

  // Brand colors from tokens.
  const css = getComputedStyle(document.documentElement);
  const accent = (css.getPropertyValue("--color-accent") || "#f97316").trim();
  const accent2 = (css.getPropertyValue("--color-accent-2") || "#0ea5e9").trim();

  let mode = localStorage.getItem(STORE_KEY) || "particles";
  if (!MODES.includes(mode)) mode = "particles";

  let W = 0,
    H = 0,
    dpr = 1;
  const mouse = { x: 0.5, y: 0.5, active: false };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  };

  window.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width;
    mouse.y = (e.clientY - r.top) / r.height;
    mouse.active = true;
  });

  // ── Particle model (shared by particles + plexus) ──────────
  let particles = [];
  const buildParticles = () => {
    const density = mode === "plexus" ? 9000 : 6000;
    const count = Math.min(160, Math.round((W * H) / density));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.6,
    }));
  };

  const stepParticles = () => {
    const mx = mouse.x * W;
    const my = mouse.y * H;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      // wrap
      if (p.x < 0) p.x += W;
      if (p.x > W) p.x -= W;
      if (p.y < 0) p.y += H;
      if (p.y > H) p.y -= H;
      // cursor push
      if (mouse.active) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const R = 150;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * 0.6;
          p.x += (dx / d) * f * 2;
          p.y += (dy / d) * f * 2;
        }
      }
    }
  };

  const drawParticles = () => {
    ctx.clearRect(0, 0, W, H);
    stepParticles();
    ctx.fillStyle = accent;
    for (const p of particles) {
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const drawPlexus = () => {
    ctx.clearRect(0, 0, W, H);
    stepParticles();
    // lines between near particles + to cursor
    const LINK = 130;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          ctx.globalAlpha = (1 - d / LINK) * 0.35;
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = accent;
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  // ── Blobs (soft drifting radial gradients) ─────────────────
  let blobs = [];
  const buildBlobs = () => {
    blobs = [
      { x: 0.3, y: 0.4, r: 0.5, c: accent, phase: 0 },
      { x: 0.7, y: 0.6, r: 0.42, c: accent2, phase: 2 },
      { x: 0.5, y: 0.3, r: 0.38, c: accent, phase: 4 },
    ];
  };
  let t = 0;
  const drawBlobs = () => {
    ctx.clearRect(0, 0, W, H);
    t += 0.005;
    ctx.globalCompositeOperation = "lighter";
    for (const b of blobs) {
      const cx = (b.x + Math.sin(t + b.phase) * 0.08 + (mouse.active ? (mouse.x - 0.5) * 0.1 : 0)) * W;
      const cy = (b.y + Math.cos(t * 0.8 + b.phase) * 0.08 + (mouse.active ? (mouse.y - 0.5) * 0.1 : 0)) * H;
      const rad = b.r * Math.min(W, H);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      const col = hexToRgb(b.c);
      g.addColorStop(0, `rgba(${col},0.32)`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  };

  const hexToRgb = (hex) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  };

  // ── Loop ───────────────────────────────────────────────────
  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 }).observe(hero);
  }

  const paint = () => {
    if (mode === "particles") drawParticles();
    else if (mode === "plexus") drawPlexus();
    else drawBlobs();
  };

  const frame = () => {
    requestAnimationFrame(frame);
    if (!visible) return;
    paint();
  };

  // Expose a switcher so you can preview and pick.
  window.setHeroBg = (m) => {
    if (!MODES.includes(m)) return `modes: ${MODES.join(", ")}`;
    mode = m;
    localStorage.setItem(STORE_KEY, m);
    if (m === "blobs") buildBlobs();
    else buildParticles();
    return `hero bg → ${m}`;
  };

  window.addEventListener("resize", resize);
  resize();
  buildBlobs();
  paint(); // synchronous first frame — visible even if rAF is throttled
  frame();
}
