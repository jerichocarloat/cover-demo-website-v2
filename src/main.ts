import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { icons } from "./icons";

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => Array.from(el.querySelectorAll<T>(s));
const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* unavailable */ } },
  del(k: string) { try { localStorage.removeItem(k); } catch { /* unavailable */ } },
};
const NAV_OFFSET = -84;
const TOPIC_KEY = "cover-v3-thema";

let lenis: Lenis | null = null;
const cleanups: Array<() => void> = [];

/* ------------------------------------------------------------ smooth scroll (Lenis is the only engine) */
function initScroll() {
  if (reduce.matches) return;
  lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => { gsap.ticker.remove(raf); lenis?.destroy(); lenis = null; });
}
function scrollToEl(target: Element, opts: { immediate?: boolean; done?: () => void } = {}) {
  if (lenis) { lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET, force: true, immediate: opts.immediate, onComplete: () => opts.done?.() }); return; }
  const y = window.scrollY + target.getBoundingClientRect().top + NAV_OFFSET;
  window.scrollTo({ top: y, behavior: opts.immediate || reduce.matches ? "auto" : "smooth" });
  if (opts.done) window.setTimeout(opts.done, reduce.matches || opts.immediate ? 0 : 600);
}
function focusSection(target: HTMLElement) {
  const f = target.matches("section, article") ? (target.querySelector<HTMLElement>("h1, h2, h3") || target) : target;
  if (!f.hasAttribute("tabindex")) f.setAttribute("tabindex", "-1");
  f.focus({ preventScroll: true });
}

/* ------------------------------------------------------------ nav */
function initNav() {
  const nav = $("[data-nav]");
  if (!nav) return;
  const toggle = $<HTMLButtonElement>("[data-menu-toggle]", nav)!;
  const label = $("[data-menu-label]", nav)!;
  const menu = $("[data-menu]", nav)!;
  const fixed = nav.hasAttribute("data-fixed-solid");
  const sync = () => { if (!fixed) nav.dataset.solid = String(window.scrollY > 24); };
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Menü schließen" : "Menü öffnen";
    menu.hidden = !open;
    nav.dataset.open = String(open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { lenis?.stop(); menu.querySelector<HTMLElement>("a")?.focus(); } else lenis?.start();
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); } });
  window.matchMedia("(min-width: 761px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
}

/* ------------------------------------------------------------ in-page anchors + arriving with a hash */
function initAnchors() {
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (!url.hash || url.pathname !== location.pathname) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
    history.replaceState(null, "", url.hash);
    focusSection(target);
  });
}
function arriveAtHash() {
  if (!location.hash) return;
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!target) return;
  const go = () => { ScrollTrigger.refresh(); scrollToEl(target, { immediate: true }); };
  requestAnimationFrame(go);
  // Images above the target can still change the layout; settle once more after load.
  const startY = () => window.scrollY;
  let y0 = 0;
  window.setTimeout(() => { y0 = startY(); }, 50);
  window.addEventListener("load", () => { if (Math.abs(startY() - y0) < 4) go(); }, { once: true });
}

/* ------------------------------------------------------------ heroes */
const splitWords = (el: HTMLElement) => SplitText.create(el, { type: "words,lines", linesClass: "sw-line", aria: "auto" });

function initHero() {
  const hero = $("[data-hero]");
  if (!hero || reduce.matches) return;
  const media = $("[data-hero-media]", hero);
  const title = $("[data-hero-title]", hero);
  const ins = $$("[data-hero-in]", hero);
  const cards = $$(".fcard", hero);
  const content = $(".hero__content, .phero__content", hero);

  const split = title ? splitWords(title) : null;
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  if (title) tl.set(title, { opacity: 1 });
  if (media) tl.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: "power3.out" }, 0);
  if (split) tl.from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.07 }, 0.15);
  if (ins.length) tl.fromTo(ins, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5);
  if (cards.length) tl.fromTo(cards, { opacity: 0, y: 36, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, ease: "back.out(1.5)" }, 0.85);

  if (media) gsap.to(media, { yPercent: 9, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  if (content) gsap.to(content, { yPercent: -10, opacity: 0.35, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });

  if (!cards.length) { cleanups.push(() => { tl.kill(); split?.revert(); }); return; }
  const floats = cards.map((card, i) => gsap.to(card, { y: i % 2 ? 9 : -9, duration: 3.2 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true }));
  const movers = cards.map((card) => ({ x: gsap.quickTo(card, "x", { duration: 1.2, ease: "power3.out" }), depth: Number(card.dataset.depth || 0.5) }));
  let inView = true;
  const play = () => floats.forEach((f) => (inView && !document.hidden && tl.progress() === 1 ? f.play() : f.pause()));
  tl.eventCallback("onComplete", play);
  const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; play(); });
  io.observe(hero);
  document.addEventListener("visibilitychange", play);
  let frame = 0;
  const onMove = (e: PointerEvent) => {
    if (!finePointer.matches || e.pointerType !== "mouse" || frame) return;
    frame = requestAnimationFrame(() => { frame = 0; const nx = e.clientX / window.innerWidth - 0.5; movers.forEach((m) => m.x(nx * 40 * m.depth)); });
  };
  const reset = () => movers.forEach((m) => m.x(0));
  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", reset);
  window.addEventListener("blur", reset);
  cleanups.push(() => {
    io.disconnect(); document.removeEventListener("visibilitychange", play);
    hero.removeEventListener("pointermove", onMove); hero.removeEventListener("pointerleave", reset); window.removeEventListener("blur", reset);
    floats.forEach((f) => f.kill()); tl.kill(); split?.revert();
  });
}

/* ------------------------------------------------------------ reveals (content starts visible; motion only adds) */
function initReveals() {
  if (reduce.matches) return;
  $$("[data-split]").forEach((el) => {
    if (el.closest("[data-hero]")) return;
    const split = splitWords(el);
    gsap.from(split.words, { yPercent: 105, duration: 1, ease: "expo.out", stagger: 0.04, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 92%", once: true,
    onEnter: (batch) => gsap.from(batch, { y: 36, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, clearProps: "transform,opacity" }),
  });
  const once = (sel: string, trigger: string, vars: gsap.TweenVars) => { if ($(sel) && $(trigger)) gsap.from(sel, { ...vars, clearProps: "transform,opacity", scrollTrigger: { trigger, start: "top 86%", once: true } }); };
  once(".tailor__panel", ".tailor", { y: 48, opacity: 0, duration: 1.1, ease: "expo.out" });
  once(".mods__group", "[data-mods]", { y: 32, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 });
  once(".svc", "[data-svc]", { y: 48, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 });
  once(".voice", "[data-voices]", { x: 64, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1 });
  once(".form", ".contact", { y: 40, opacity: 0, duration: 1.1, ease: "expo.out" });
}

/* ------------------------------------------------------------ counters */
function initCounts() {
  const fmt = new Intl.NumberFormat("de-DE");
  $$("[data-count]").forEach((el) => {
    if (reduce.matches) return;
    const end = Number(el.dataset.count);
    const plain = el.hasAttribute("data-plain");
    const suffix = el.dataset.suffix || "";
    const final = el.textContent || "";
    const state = { v: plain ? end - 30 : 0 };
    const render = () => { el.textContent = (plain ? String(Math.round(state.v)) : fmt.format(Math.round(state.v))) + suffix; };
    ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () => { render(); gsap.to(state, { v: end, duration: 1.8, ease: "power3.out", onUpdate: render, onComplete: () => { el.textContent = final; } }); } });
  });
}

/* ------------------------------------------------------------ services: v2 card expansion, ported 1:1 */
const svcState = new Map<HTMLElement, Animation[]>();
let svcEnabled = false;
function captureLayer(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  let bounds = rect;
  let radius = style.borderRadius || "0px";
  const mask = style.clipPath.match(/^inset\((.*?)\s+round\s+(.*?)\)$/);
  if (mask) {
    const edges = mask[1].split(/\s+/).map((v) => Number.parseFloat(v) || 0);
    const [top, right = top, bottom = top, left = right] = edges;
    bounds = new DOMRect(rect.left + left, rect.top + top, rect.width - left - right, rect.height - top - bottom);
    radius = mask[2];
  }
  const img = element.dataset.motionLayer === "photo" ? element.querySelector("img") : null;
  return { element, bounds, kind: element.dataset.motionLayer, radius, image: img ? { element: img, bounds: img.getBoundingClientRect() } : undefined };
}
function cancelRow(row: HTMLElement) { svcState.get(row)?.forEach((a) => a.cancel()); svcState.delete(row); }
function changeRow(row: HTMLElement, expanded: number | null, animated: boolean) {
  const next = expanded === null ? "none" : String(expanded);
  if (row.dataset.expanded === next) { if (!animated) cancelRow(row); return; }
  const before = $$("[data-motion-layer]", row).map(captureLayer);
  cancelRow(row);
  row.dataset.expanded = next;
  $$("[data-service-card]", row).forEach((card, i) => { card.dataset.state = expanded === null ? "preview" : i === expanded ? "active" : "quiet"; });
  if (!animated || !("animate" in row)) return;
  const after = before.map((s) => ({ ...s, finalBounds: s.element.getBoundingClientRect(), finalImageBounds: s.image?.element.getBoundingClientRect() }));
  const duration = 560;
  const easing = "cubic-bezier(.32,.72,0,1)";
  const running: Animation[] = [];
  after.forEach(({ element, bounds, finalBounds, kind, radius, image, finalImageBounds }) => {
    if (!finalBounds.width || !finalBounds.height) return;
    const x = bounds.left - finalBounds.left;
    const y = bounds.top - finalBounds.top;
    if (kind === "photo") {
      running.push(element.animate([
        { transform: `translate(${x}px, ${y}px)`, clipPath: `inset(0px ${finalBounds.width - bounds.width}px ${finalBounds.height - bounds.height}px 0px round ${radius})` },
        { transform: "translate(0, 0)", clipPath: getComputedStyle(element).clipPath },
      ], { duration, easing }));
      if (image && finalImageBounds?.width) {
        const scale = image.bounds.width / finalImageBounds.width;
        running.push(image.element.animate([
          { transform: `translate(${image.bounds.left - finalImageBounds.left - x}px, ${image.bounds.top - finalImageBounds.top - y}px) scale(${scale})` },
          { transform: "translate(0, 0) scale(1)" },
        ], { duration, easing }));
      }
    } else {
      const scale = kind === "surface" ? ` scale(${bounds.width / finalBounds.width}, ${bounds.height / finalBounds.height})` : "";
      running.push(element.animate([{ transform: `translate(${x}px, ${y}px)${scale}` }, { transform: "translate(0, 0)" }], { duration, easing }));
    }
  });
  svcState.set(row, running);
  void Promise.allSettled(running.map((a) => a.finished)).then(() => { if (svcState.get(row) === running) svcState.delete(row); });
}
function initServices() {
  const rows = $$("[data-svc] .svc__row");
  if (!rows.length) return;
  const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const desktop = window.matchMedia("(min-width: 1101px)");
  const positions = new WeakMap<HTMLElement, { x: number; y: number }>();
  const resetRows = () => rows.forEach((row) => {
    cancelRow(row); row.dataset.expanded = "none"; positions.delete(row);
    $$("[data-service-card]", row).forEach((c) => { c.dataset.state = "preview"; });
  });
  const env = () => { svcEnabled = pointer.matches && desktop.matches && !reduce.matches; resetRows(); };
  env();
  [pointer, desktop, reduce].forEach((m) => m.addEventListener("change", env));
  window.addEventListener("resize", resetRows, { passive: true });
  rows.forEach((row) => {
    row.addEventListener("pointermove", (e) => {
      if (!svcEnabled || e.pointerType !== "mouse" || row.querySelector(":focus-visible")) return;
      const prev = positions.get(row);
      if (prev?.x === e.clientX && prev?.y === e.clientY) return;
      positions.set(row, { x: e.clientX, y: e.clientY });
      const surfaces = $$('[data-motion-layer="surface"]', row);
      const hovered = surfaces.findIndex((s) => { const b = s.getBoundingClientRect(); return e.clientX > b.left + 3 && e.clientX < b.right - 3; });
      if (hovered !== -1) changeRow(row, hovered, true);
    });
    row.addEventListener("pointerleave", (e) => { positions.delete(row); if (svcEnabled && e.pointerType === "mouse") changeRow(row, null, true); });
    row.addEventListener("focusin", (e) => { if (e.target instanceof HTMLElement && e.target.matches(":focus-visible")) changeRow(row, null, false); });
  });
}

/* ------------------------------------------------------------ personaliser (homepage) */
type Pick = { kind: string; name: string; why: string; to: string };
const PICKS: Record<string, Pick> = {
  erp: { kind: "Software", name: "COVER ERP", why: "Produkte, Abonnements, Aufträge und Finanzen, vom ersten Angebot bis zur Rechnung.", to: "plattform/index.html#erp" },
  crm: { kind: "Software", name: "COVER CRM", why: "Kundendaten, Kontakthistorien und Kampagnen für eine relevantere Kundenansprache.", to: "plattform/index.html#crm" },
  commerce: { kind: "Software", name: "COVER E-Commerce", why: "Bücher, Abonnements und digitale Produkte verkaufen. Hosting und Updates übernimmt COVER.", to: "plattform/index.html#commerce" },
  "mod:abonnement": { kind: "ERP-Modul", name: "Abonnements und Zeitschriften", why: "Abonnements verwalten, versenden und abrechnen.", to: "plattform/abonnement/index.html" },
  "mod:buch": { kind: "ERP-Modul", name: "Bücher und Warenwirtschaft", why: "Titel, Bestellungen, Bestände und Retouren.", to: "plattform/buch/index.html" },
  "mod:anzeigen": { kind: "ERP-Modul", name: "Anzeigen", why: "Kaufmännische Anzeigenprozesse planen und verwalten.", to: "plattform/anzeigen/index.html" },
  "mod:veranstaltungen": { kind: "ERP-Modul", name: "Veranstaltungen", why: "Veranstaltungen und die zugehörigen kaufmännischen Prozesse verwalten.", to: "plattform/veranstaltungen/index.html" },
  "mod:debitorenmanagement": { kind: "ERP-Modul", name: "Debitorenmanagement", why: "Kundensalden, Forderungen und Prozesse rund um Zahlungen.", to: "plattform/debitorenmanagement/index.html" },
  service: { kind: "Service", name: "Kunden- und Aboservice", why: "Erfahrene Menschen für Ihre Kunden und Abonnenten.", to: "services/index.html#customer-service" },
  finance: { kind: "Service", name: "Buchhaltung und Verwaltung", why: "Fachkundige Unterstützung für Finanz- und Verwaltungsprozesse.", to: "services/index.html#accounting" },
  process: { kind: "Service", name: "Verlagsprozesse", why: "Spezialisierte Unterstützung für die täglichen Aufgaben im Verlag.", to: "services/index.html#publishing-operations" },
  marketing: { kind: "Service", name: "Marketing und Kundenentwicklung", why: "Kundendaten und Kampagnen, um Kundenbindung und Wachstum zu stärken.", to: "services/index.html#marketing-growth" },
};
const startPicks: Record<string, string[]> = { software: ["erp", "commerce"], service: ["service", "crm"], finance: ["finance", "mod:debitorenmanagement"], process: ["process"], marketing: ["marketing", "crm"], hosting: ["commerce", "erp"] };
const startTopic: Record<string, string> = { software: "Verlagssoftware und E-Commerce", service: "Kunden- und Aboservice", finance: "Buchhaltung und Verwaltung", process: "Verlagsprozesse", marketing: "Marketing und Kundenentwicklung", hosting: "Migration oder Hosting" };
const typePicks: Record<string, string> = { zeitschrift: "mod:abonnement", buch: "mod:buch", anzeigen: "mod:anzeigen", veranstaltungen: "mod:veranstaltungen", digital: "commerce" };
const typeLabel: Record<string, string> = { buch: "Bücher", zeitschrift: "Zeitschriften", anzeigen: "Anzeigen", veranstaltungen: "Veranstaltungen", digital: "digitale Produkte" };

function initTailor() {
  const form = $<HTMLFormElement>("[data-tailor]");
  if (!form) return;
  const status = $("[data-tailor-status]", form)!;
  const result = $("[data-tailor-result]", form)!;
  const title = $("[data-tailor-title]", form)!;
  const list = $("[data-picks]", form)!;
  const cta = $<HTMLAnchorElement>("[data-tailor-cta]", form)!;
  let topic = "";
  const render = (types: string[], start: string, animate: boolean) => {
    const keys: string[] = [];
    const add = (k: string) => { if (PICKS[k] && !keys.includes(k)) keys.push(k); };
    (startPicks[start] || []).forEach(add);
    types.forEach((t) => add(typePicks[t]));
    if (types.some((t) => t !== "digital")) add("erp");
    if (!start) add("service");
    list.replaceChildren(...keys.slice(0, 4).map((k) => {
      const p = PICKS[k];
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.className = "pick"; a.href = p.to;
      a.innerHTML = `<span class="pick__kind"></span><span class="pick__name"><span></span>${icons["arrow-right-linear"].replace("<svg ", '<svg class="i" ')}</span><span class="pick__why"></span>`;
      a.querySelector(".pick__kind")!.textContent = p.kind;
      a.querySelector(".pick__name > span")!.textContent = p.name;
      a.querySelector(".pick__why")!.textContent = p.why;
      li.append(a);
      return li;
    }));
    const tl = types.map((t) => typeLabel[t]);
    title.textContent = tl.length ? `Ihr Einstieg für ${tl.length > 1 ? `${tl.slice(0, -1).join(", ")} und ${tl[tl.length - 1]}` : tl[0]}` : "Ihr Einstieg";
    topic = startTopic[start] || "Verlagssoftware und E-Commerce";
    result.hidden = false;
    if (animate && !reduce.matches) gsap.from(list.children, { y: 16, opacity: 0, duration: 0.6, stagger: 0.07, ease: "expo.out", clearProps: "transform,opacity" });
    ScrollTrigger.refresh();
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const types = $$<HTMLInputElement>('input[name="typ"]:checked', form).map((i) => i.value);
    const start = $$<HTMLInputElement>('input[name="start"]:checked', form)[0]?.value || "";
    if (!types.length && !start) { status.textContent = "Bitte wählen Sie mindestens eine Antwort."; return; }
    status.textContent = "";
    render(types, start, true);
    result.focus({ preventScroll: true });
    const r = result.getBoundingClientRect();
    if (r.bottom > window.innerHeight) { const y = window.scrollY + r.top - 120; if (lenis) lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: reduce.matches ? "auto" : "smooth" }); }
    store.set("cover-v3-einstieg", JSON.stringify({ types, start }));
  });
  form.addEventListener("change", () => { status.textContent = ""; });
  form.addEventListener("reset", () => { result.hidden = true; status.textContent = ""; store.del("cover-v3-einstieg"); ScrollTrigger.refresh(); });
  cta.addEventListener("click", () => store.set(TOPIC_KEY, topic));
  try {
    const saved = JSON.parse(store.get("cover-v3-einstieg") || "null");
    if (saved && (saved.types?.length || saved.start)) {
      saved.types?.forEach((t: string) => { const i = form.querySelector<HTMLInputElement>(`input[name="typ"][value="${t}"]`); if (i) i.checked = true; });
      if (saved.start) { const r = form.querySelector<HTMLInputElement>(`input[name="start"][value="${saved.start}"]`); if (r) r.checked = true; }
      render(saved.types || [], saved.start || "", false);
    }
  } catch { /* ignore malformed storage */ }
}

/* ------------------------------------------------------------ flow tabs (homepage): auto-advancing, pausable */
function initFlow() {
  const root = $("[data-flow]");
  if (!root) return;
  const tabs = $$<HTMLButtonElement>("[data-flow-tab]", root);
  const imgs = $$("[data-flow-img]", root);
  const chips = $$("[data-flow-chip]", root);
  const stage = $("[data-flow-stage]", root)!;
  const STEP = 6500;
  let active = 0;
  let timer = 0;
  let started = 0;
  let remaining = STEP;
  let inView = false;
  let hold = false;
  const auto = () => !reduce.matches;
  root.classList.add("is-live");
  const set = (i: number, focus = false) => {
    active = (i + tabs.length) % tabs.length;
    tabs.forEach((t, k) => {
      const on = k === active;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle("is-done", k < active);
    });
    imgs.forEach((im, k) => im.classList.toggle("is-on", k === active));
    chips.forEach((c, k) => c.classList.toggle("is-on", k === active));
    stage.setAttribute("aria-labelledby", tabs[active].id);
    if (focus) tabs[active].focus();
    remaining = STEP;
    restart();
  };
  const stop = () => { window.clearTimeout(timer); timer = 0; root.classList.add("is-paused"); };
  const restart = () => {
    window.clearTimeout(timer);
    root.style.setProperty("--flow-step", `${STEP}ms`);
    tabs.forEach((t) => { const bar = t.querySelector<HTMLElement>(".flow__bar i"); if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; } });
    if (!auto() || !inView || hold || document.hidden) { stop(); return; }
    root.classList.remove("is-paused");
    started = performance.now();
    timer = window.setTimeout(() => set(active + 1), remaining);
  };
  const pause = () => { if (!timer) return; remaining = Math.max(400, remaining - (performance.now() - started)); stop(); };
  const resume = () => { if (timer || hold || !inView || document.hidden || !auto()) return; root.classList.remove("is-paused"); started = performance.now(); timer = window.setTimeout(() => set(active + 1), remaining); };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => set(i));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); set(active + 1, true); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); set(active - 1, true); }
      if (e.key === "Home") { e.preventDefault(); set(0, true); }
      if (e.key === "End") { e.preventDefault(); set(tabs.length - 1, true); }
    });
  });
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hold = true; pause(); } });
  root.addEventListener("pointerleave", () => { hold = false; resume(); });
  root.addEventListener("focusin", () => { hold = true; pause(); });
  root.addEventListener("focusout", (e) => { if (!root.contains(e.relatedTarget as Node)) { hold = false; resume(); } });
  const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; if (inView) resume(); else pause(); }, { threshold: 0.35 });
  io.observe(root);
  document.addEventListener("visibilitychange", () => (document.hidden ? pause() : resume()));
  set(0);
}

/* ------------------------------------------------------------ marquee */
function initMarquee() {
  const marquee = $("[data-marquee]");
  if (!marquee) return;
  const track = $(".marquee__track", marquee)!;
  if (reduce.matches) { marquee.dataset.static = "true"; return; }
  const originals = Array.from(track.children);
  originals.forEach((li) => { const c = li.cloneNode(true) as HTMLElement; c.setAttribute("aria-hidden", "true"); c.querySelector("img")!.alt = ""; track.appendChild(c); });
  marquee.style.setProperty("--marquee-dur", `${originals.length * 4.5}s`);
  const io = new IntersectionObserver(([e]) => { marquee.dataset.running = String(e.isIntersecting && !document.hidden); });
  io.observe(marquee);
  const vis = () => { if (document.hidden) marquee.dataset.running = "false"; };
  document.addEventListener("visibilitychange", vis);
  cleanups.push(() => { io.disconnect(); document.removeEventListener("visibilitychange", vis); });
}

/* ------------------------------------------------------------ voices */
function initVoices() {
  const track = $("[data-voices]");
  if (!track) return;
  const prev = $<HTMLButtonElement>("[data-voices-prev]")!;
  const next = $<HTMLButtonElement>("[data-voices-next]")!;
  const items = $$(".voice", track);
  const update = () => { prev.disabled = track.scrollLeft < 8; next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 8; };
  const go = (dir: number) => track.scrollBy({ left: dir * (items[0].getBoundingClientRect().width + 20), behavior: reduce.matches ? "auto" : "smooth" });
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  track.addEventListener("scroll", update, { passive: true });
  track.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } });
  track.setAttribute("data-lenis-prevent-wheel", "");
  window.addEventListener("resize", update);
  update();
}

/* ------------------------------------------------------------ contact form */
function initForm() {
  const form = $<HTMLFormElement>("[data-form]");
  if (!form) return;
  const body = $("[data-form-body]", form)!;
  const done = $("[data-form-done]", form)!;
  const submit = $<HTMLButtonElement>(".form__submit", form)!;
  const select = $<HTMLSelectElement>("[data-form-topic]", form);
  const preset = store.get(TOPIC_KEY);
  if (preset && select && Array.from(select.options).some((o) => o.value === preset)) select.value = preset;
  store.del(TOPIC_KEY);

  type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  type Rule = [string, string, (el: Field) => string];
  const allRules: Rule[] = [
    ["f-topic", "f-topic-err", (el) => (!el.value ? "Bitte wählen Sie ein Thema." : "")],
    ["f-name", "f-name-err", (el) => (el.value.trim().length < 2 ? "Bitte geben Sie Ihren Namen an." : "")],
    ["f-company", "f-company-err", (el) => (!el.value.trim() ? "Bitte geben Sie Ihr Unternehmen an." : "")],
    ["f-mail", "f-mail-err", (el) => (!el.value.trim() ? "Bitte geben Sie Ihre E-Mail-Adresse an." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) ? "Die E-Mail-Adresse ist unvollständig, zum Beispiel name@verlag.de." : "")],
    ["f-msg", "f-msg-err", (el) => (el.value.trim().length < 3 ? "Beschreiben Sie kurz, was Sie verbessern möchten." : "")],
    ["f-privacy", "f-privacy-err", (el) => (!(el as HTMLInputElement).checked ? "Bitte bestätigen Sie die Datenschutzhinweise." : "")],
  ];
  const rules = allRules.filter(([id, err]) => document.getElementById(id) && document.getElementById(err));
  const check = ([id, errId, rule]: Rule) => {
    const el = $<Field>(`#${id}`)!;
    const msg = rule(el);
    $(`#${errId}`)!.textContent = msg;
    el.setAttribute("aria-invalid", String(Boolean(msg)));
    if (msg) el.setAttribute("aria-describedby", errId); else el.removeAttribute("aria-describedby");
    return !msg;
  };
  rules.forEach((r) => {
    const el = $<Field>(`#${r[0]}`)!;
    el.addEventListener("blur", () => { if ((el as HTMLInputElement).type !== "checkbox" && el.value) check(r); });
    el.addEventListener("input", () => { if (el.getAttribute("aria-invalid") === "true") check(r); });
    el.addEventListener("change", () => { if (el.getAttribute("aria-invalid") === "true") check(r); });
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = rules.map(check);
    const bad = rules.find((_, i) => !ok[i]);
    if (bad) { $<HTMLElement>(`#${bad[0]}`)!.focus(); return; }
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    submit.querySelector("span")!.textContent = "Wird vorbereitet …";
    window.setTimeout(() => {
      $("[data-form-name]", form)!.textContent = $<HTMLInputElement>("#f-name")!.value.trim().split(/\s+/)[0];
      body.hidden = true;
      done.hidden = false;
      done.focus();
      if (!reduce.matches) gsap.from(done.children, { opacity: 0, y: 14, duration: 0.6, stagger: 0.07, ease: "expo.out", clearProps: "transform,opacity" });
      submit.disabled = false;
      submit.removeAttribute("aria-busy");
      submit.querySelector("span")!.textContent = "Anfrage vorbereiten";
      ScrollTrigger.refresh();
    }, 900);
  });
  $("[data-form-again]", form)!.addEventListener("click", () => {
    form.reset();
    rules.forEach(([id, err]) => { $(`#${err}`)!.textContent = ""; $(`#${id}`)!.removeAttribute("aria-invalid"); });
    done.hidden = true; body.hidden = false;
    $<HTMLElement>("#f-topic")?.focus();
  });
}

/* ------------------------------------------------------------ boot */
async function boot() {
  initScroll();
  initNav();
  initAnchors();
  initServices();
  initTailor();
  initFlow();
  initMarquee();
  initVoices();
  initForm();
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]); } catch { /* no fonts API */ }
  initHero();
  initReveals();
  initCounts();
  root.classList.add("ready");
  ScrollTrigger.refresh();
  arriveAtHash();
  window.addEventListener("hashchange", () => { const t = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) scrollToEl(t, { immediate: true }); });
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

  reduce.addEventListener("change", () => {
    if (!reduce.matches) return;
    cleanups.splice(0).forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((t) => t.kill());
    gsap.globalTimeline.clear();
    root.classList.remove("motion");
    gsap.set("[data-hero-in], [data-reveal], .fcard, .svc, .voice, .form, .mods__group, .tailor__panel, .hero__content, .phero__content, [data-hero-media]", { clearProps: "all" });
    const m = $("[data-marquee]"); if (m) m.dataset.static = "true";
  });
}

boot();
