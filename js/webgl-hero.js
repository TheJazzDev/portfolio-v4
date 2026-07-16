/* webgl-hero.js — Lusion-style interactive WebGL background for the hero.
   A fullscreen shader: flowing domain-warped noise in the brand palette that
   reacts to the cursor. Self-contained and defensive — if WebGL or Three.js
   fails, it silently no-ops and the static hero remains fully visible. */

import { prefersReducedMotion } from "./utils.js";

const VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/* Domain-warped simplex-ish noise flow field, tinted to the brand orange over
   near-black, with a soft cursor-reactive light. */
const FRAG = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;      // 0..1
  uniform vec2 uRes;
  uniform vec3 uAccent;
  uniform vec3 uAccent2;
  uniform float uIntensity; // 0..1 eases in on load

  // hash + value noise
  vec2 hash2(vec2 p){
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(
      mix(dot(hash2(i+vec2(0,0)), f-vec2(0,0)), dot(hash2(i+vec2(1,0)), f-vec2(1,0)), u.x),
      mix(dot(hash2(i+vec2(0,1)), f-vec2(0,1)), dot(hash2(i+vec2(1,1)), f-vec2(1,1)), u.x),
      u.y);
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float aspect = uRes.x / uRes.y;
    vec2 p = uv; p.x *= aspect;
    vec2 m = uMouse; m.x *= aspect;

    float t = uTime * 0.06;

    // domain warp
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 2.0*q + vec2(1.7, 9.2) + t*0.5),
                  fbm(p + 2.0*q + vec2(8.3, 2.8) - t*0.5));
    float f = fbm(p + 2.0*r);

    // cursor-reactive glow
    float d = distance(p, m);
    float glow = smoothstep(0.6, 0.0, d) * 0.6;

    // base near-black, lift with orange in the warped bands
    vec3 col = vec3(0.04);
    float bands = smoothstep(0.35, 0.75, f + glow*0.5);
    col = mix(col, uAccent * 0.9, bands);
    col = mix(col, uAccent2 * 0.5, smoothstep(0.6, 0.95, r.x) * 0.35);
    col += uAccent * glow * 0.8;

    // subtle vignette
    float vig = smoothstep(1.2, 0.2, length(uv - 0.5));
    col *= vig;

    col *= uIntensity;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export async function initWebGLHero() {
  if (prefersReducedMotion()) return;

  const canvas = document.querySelector("[data-webgl-hero]");
  if (!canvas) return;

  let THREE;
  try {
    THREE = await import("../assets/vendor/three/three.module.js");
  } catch (err) {
    console.warn("[v4] three.js not loaded; skipping WebGL hero.", err);
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
  } catch (err) {
    console.warn("[v4] WebGL unavailable; static hero.", err);
    return;
  }

  const hero = canvas.closest(".hero") || canvas.parentElement;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const hexToRgb = (hex) => {
    const n = parseInt(hex.replace("#", ""), 16);
    return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
  };
  const css = getComputedStyle(document.documentElement);
  const accent = hexToRgb((css.getPropertyValue("--color-accent") || "#f97316").trim());
  const accent2 = hexToRgb((css.getPropertyValue("--color-accent-2") || "#0ea5e9").trim());

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uRes: { value: new THREE.Vector2(1, 1) },
    uAccent: { value: accent },
    uAccent2: { value: accent2 },
    uIntensity: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

  const resize = () => {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w * dpr, h * dpr);
  };
  resize();
  window.addEventListener("resize", resize);

  // Cursor tracking (smoothed).
  const target = { x: 0.5, y: 0.5 };
  window.addEventListener("pointermove", (e) => {
    const rect = hero.getBoundingClientRect();
    target.x = (e.clientX - rect.left) / rect.width;
    target.y = 1 - (e.clientY - rect.top) / rect.height;
  });

  // Pause rendering when the hero is offscreen (perf).
  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 }).observe(hero);
  }

  const clock = new THREE.Clock();
  let intensity = 0;

  const render = () => {
    requestAnimationFrame(render);
    if (!visible) return;
    uniforms.uTime.value = clock.getElapsedTime();
    // ease mouse + intensity
    uniforms.uMouse.value.x += (target.x - uniforms.uMouse.value.x) * 0.05;
    uniforms.uMouse.value.y += (target.y - uniforms.uMouse.value.y) * 0.05;
    intensity += (1 - intensity) * 0.02;
    uniforms.uIntensity.value = intensity;
    renderer.render(scene, camera);
  };
  render();
}
