// Shared HTML parts for the static COVER v3 site. Every link is relative so the
// export runs from any folder (GitHub Pages sub-path, preview hosts, file shares).

export type Ctx = { depth: number; route: string };

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Relative link to another page, e.g. href(ctx, "services/") or href(ctx, "plattform/#erp"). */
export function href(ctx: Ctx, target: string) {
  const up = "../".repeat(ctx.depth);
  const [path, hash] = target.split("#");
  const file = path === "" ? "index.html" : path.endsWith("/") ? `${path}index.html` : path;
  return `${up}${file}${hash ? `#${hash}` : ""}`;
}
/** Public asset path; Vite rewrites absolute public URLs relative to each page because base is "./". */
export const asset = (p: string) => `/${p.replace(/^\//, "")}`;

export const icon = (name: string, cls?: string) => `<i data-icon="${name}"${cls ? ` class="${cls}"` : ""}></i>`;
export const arrow = icon("arrow-right-linear");

type Img = { src: string; w: number; h: number; alt: string; sizes?: string; lazy?: boolean; set?: Array<[string, number]> };
export function img(i: Img) {
  const srcset = i.set ? ` srcset="${i.set.map(([s, w]) => `${asset(s)} ${w}w`).join(", ")}"` : "";
  return `<img src="${asset(i.src)}"${srcset}${i.sizes ? ` sizes="${i.sizes}"` : ""} width="${i.w}" height="${i.h}" alt="${esc(i.alt)}"${i.lazy === false ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async" />`;
}

// Photo catalogue (sizes of the generated WebP variants).
export const photos = {
  press: { base: "img/press", sizes: [960, 1600, 2400], ratio: 1602 / 2400, alt: "Bedruckte Papierbahnen durchlaufen eine Druckmaschine" },
  team: { base: "img/team", sizes: [800, 1400], ratio: 933 / 1400, alt: "Illustrative Szene: Verlagsfachleute besprechen ihre Arbeit am Laptop" },
  support: { base: "img/support", sizes: [700, 1100], ratio: 1375 / 1100, alt: "Illustrative Szene: Fachkräfte im Kundenservice arbeiten am Bildschirm" },
  finance: { base: "img/finance", sizes: [800, 1400], ratio: 934 / 1400, alt: "Rechnungen und ein Taschenrechner auf einem Schreibtisch" },
  growth: { base: "img/growth", sizes: [800, 1400], ratio: 989 / 1400, alt: "Ausgedruckte Diagramme mit einer Lupe" },
  shop: { base: "img/shop", sizes: [800, 1400], ratio: 933 / 1400, alt: "Laptop mit einem illustrativen Onlineshop für Bücher und Magazine" },
  review: { base: "img/review", sizes: [700, 1200], ratio: 1800 / 1200, alt: "Zwei Kolleginnen besprechen eine gedruckte Zeitschrift" },
  workspace: { base: "img/workspace", sizes: [800, 1400], ratio: 933 / 1400, alt: "Ein Team arbeitet gemeinsam an Laptops" },
  tech: { base: "img/tech", sizes: [800, 1400], ratio: 934 / 1400, alt: "Eine Fachkraft arbeitet mit Software an einem Bildschirm" },
} as const;
export type PhotoKey = keyof typeof photos;
export function photo(key: PhotoKey, sizes: string, opts: { alt?: string; eager?: boolean } = {}) {
  const p = photos[key];
  const top = p.sizes[p.sizes.length - 1];
  const mid = p.sizes[Math.min(1, p.sizes.length - 1)];
  return img({
    src: `${p.base}-${mid}.webp`, w: mid, h: Math.round(mid * p.ratio), alt: opts.alt ?? p.alt, sizes, lazy: !opts.eager,
    set: p.sizes.map((w) => [`${p.base}-${w}.webp`, w] as [string, number]).filter(([, w]) => w <= top),
  });
}

/* ------------------------------------------------------------------ layout */
const navItems: Array<[string, string, string]> = [
  ["plattform/", "Software", "software"],
  ["services/", "Services", "services"],
  ["unternehmen/", "Über uns", "unternehmen"],
  ["kontakt/", "Kontakt", "kontakt"],
];

export function header(ctx: Ctx, section: string, overHero: boolean) {
  const links = navItems.map(([to, label, key]) => `<a href="${href(ctx, to)}"${section === key ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<a class="skip" href="#main">Zum Inhalt springen</a>
<header class="nav" data-nav${overHero ? "" : ' data-solid="true" data-fixed-solid'}>
  <div class="nav__inner">
    <a class="nav__brand" href="${href(ctx, "")}" aria-label="COVER Startseite"><img src="${asset("brand/cover-logo.png")}" width="250" height="74" alt="COVER" /></a>
    <nav class="nav__links" aria-label="Hauptnavigation">${links}</nav>
    <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
      <span class="sr-only" data-menu-label>Menü öffnen</span><span class="nav__bars" aria-hidden="true"><span></span><span></span></span>
    </button>
  </div>
  <div class="menu" id="menu" hidden data-menu>
    <nav aria-label="Mobile Navigation">${links}</nav>
    <p class="menu__foot">+49 7031 2126-300<br />vertrieb@covernet.de</p>
  </div>
</header>`;
}

export function footer(ctx: Ctx) {
  return `<footer class="foot">
  <div class="shell">
    <div class="foot__top">
      <div class="foot__brand">
        <a href="${href(ctx, "")}" aria-label="COVER Startseite"><img src="${asset("brand/cover-logo.png")}" width="250" height="74" alt="COVER" loading="lazy" /></a>
        <p>Verlagssoftware. Spezialisierte Services. Ein erfahrener Partner.</p>
      </div>
      <nav class="foot__cols" aria-label="Fußnavigation">
        <div><h2>Software</h2><a href="${href(ctx, "plattform/#erp")}">ERP</a><a href="${href(ctx, "plattform/#crm")}">CRM</a><a href="${href(ctx, "plattform/#commerce")}">E-Commerce</a><a href="${href(ctx, "plattform/#module")}">ERP-Module</a></div>
        <div><h2>Services</h2><a href="${href(ctx, "services/")}">Spezialisierte Services</a><a href="${href(ctx, "operations/")}">Verlagsbetrieb</a><a href="${href(ctx, "kundenentwicklung/")}">Kundenentwicklung</a><a href="${href(ctx, "loesungen/")}">Lösungen</a></div>
        <div><h2>Über uns</h2><a href="${href(ctx, "unternehmen/")}">Über COVER</a><a href="${href(ctx, "news/")}">Aktuelles</a><a href="${href(ctx, "kontakt/")}">Kontakt</a><a href="https://covernet.de/kundenbereich-login" rel="noopener" target="_blank">Kundenbereich</a></div>
        <div><h2>Kontakt</h2><p>Hanns-Klemm-Str. 1A<br />71034 Böblingen<br />+49 7031 2126-300<br />vertrieb@covernet.de</p></div>
      </nav>
    </div>
    <div class="foot__base">
      <p>© Cover Softwarelösungen GmbH &amp; Co. KG · Präsentationskonzept, nicht die offizielle Website. Kundenlogos und Zitate von covernet.de.</p>
      <p class="foot__legal"><a href="https://covernet.de/impressum" rel="noopener" target="_blank">Impressum</a><a href="https://covernet.de/datenschutz" rel="noopener" target="_blank">Datenschutz</a></p>
    </div>
  </div>
</footer>`;
}

export function documentShell(ctx: Ctx, o: { title: string; description: string; section: string; overHero: boolean; body: string; preload?: string }) {
  return `<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${esc(o.title)}</title>
  <meta name="description" content="${esc(o.description)}" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="theme-color" content="#0f2a36" />
  <link rel="icon" href="${asset("brand/favicon.png")}" />
  ${o.preload ?? ""}
  <script>(function(){var d=document.documentElement;d.classList.add("js");if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion");setTimeout(function(){if(!d.classList.contains("ready"))d.classList.remove("motion")},3000)})();</script>
  <script type="module" src="/entry.ts"></script>
</head>
<body data-page="${o.section}">
${header(ctx, o.section, o.overHero)}
<main id="main">
${o.body}
</main>
${footer(ctx)}
</body>
</html>
`;
}

/* ------------------------------------------------------------------ sections */
export function heading(o: { eyebrow?: string; title: string; lead?: string; light?: boolean; id?: string; tag?: "h1" | "h2" }) {
  const t = o.tag ?? "h2";
  return `<header class="sec-head">
  <div>${o.eyebrow ? `<p class="eyebrow${o.light ? " eyebrow--light" : ""}">${o.eyebrow}</p>` : ""}<${t}${o.id ? ` id="${o.id}"` : ""} class="h2${o.light ? " h2--light" : ""}" data-split>${o.title}</${t}></div>
  ${o.lead ? `<p class="lead${o.light ? " lead--light" : ""}">${o.lead}</p>` : ""}
</header>`;
}

/** Full-bleed photographic page hero, the same stage as the homepage at a smaller scale. */
export function pageHero(ctx: Ctx, o: { id: string; eyebrow: string; title: string; accent?: string; lead: string; photo: PhotoKey; ctas?: Array<{ to: string; label: string; ghost?: boolean; down?: boolean }>; crumbs?: Array<[string, string?]>; position?: string }) {
  const crumbs = o.crumbs ? `<nav class="crumbs" aria-label="Brotkrumennavigation"><ol>${o.crumbs.map(([label, to]) => `<li>${to ? `<a href="${href(ctx, to)}">${label}</a>` : `<span aria-current="page">${label}</span>`}</li>`).join("")}</ol></nav>` : "";
  const ctas = o.ctas?.length ? `<div class="phero__ctas" data-hero-in>${o.ctas.map((c) => `<a class="btn ${c.ghost ? "btn--glass" : "btn--cyan"} btn--lg" href="${c.to.startsWith("#") ? c.to : href(ctx, c.to)}">${c.label} ${icon(c.down ? "alt-arrow-down-linear" : "arrow-right-linear")}</a>`).join("")}</div>` : "";
  return `<section class="phero" aria-labelledby="${o.id}" data-hero>
  <div class="hero__media" data-hero-media style="--pos:${o.position ?? "50% 50%"}">${photo(o.photo, "100vw", { alt: "", eager: true })}</div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="shell phero__content">
    ${crumbs}
    <p class="hero__eyebrow" data-hero-in>${o.eyebrow}</p>
    <h1 id="${o.id}" data-hero-title><span class="hl">${o.title}</span>${o.accent ? ` <span class="hl hl--accent">${o.accent}</span>` : ""}</h1>
    <p class="phero__lead" data-hero-in>${o.lead}</p>
    ${ctas}
  </div>
</section>`;
}

export const tasks = (items: string[]) => `<ul class="ticks">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

export function chapter(ctx: Ctx, o: { id: string; eyebrow: string; title: string; lead: string; text: string; tasks: string[]; link: [string, string]; photo: PhotoKey; reverse?: boolean; tint?: boolean; extra?: string; alt?: string }) {
  return `<section id="${o.id}" class="chapter${o.tint ? " chapter--tint" : ""}" aria-labelledby="${o.id}-title">
  <div class="shell">
    <div class="chapter__grid${o.reverse ? " chapter__grid--rev" : ""}">
      <div class="chapter__copy">
        <p class="eyebrow">${o.eyebrow}</p>
        <h2 id="${o.id}-title" class="h2" data-split>${o.title}</h2>
        <p class="chapter__lead">${o.lead}</p>
        <p class="chapter__text">${o.text}</p>
        ${tasks(o.tasks)}
        <a class="link-arrow" href="${href(ctx, o.link[0])}">${o.link[1]} <span class="dot-arrow">${arrow}</span></a>
      </div>
      <figure class="chapter__media" data-reveal>${photo(o.photo, "(max-width: 900px) 92vw, 50vw", { alt: o.alt })}</figure>
    </div>
    ${o.extra ?? ""}
  </div>
</section>`;
}

export function featureGrid(items: Array<{ label?: string; title: string; text: string }>, cols = 3) {
  return `<div class="features features--${cols}">${items.map((f) => `<div class="feature" data-reveal>${f.label ? `<p class="feature__label">${f.label}</p>` : ""}<h3>${f.title}</h3><p>${f.text}</p></div>`).join("")}</div>`;
}

export function processBand(label: string, steps: Array<{ title: string; text: string }>) {
  return `<ol class="process" aria-label="${label}">${steps.map((s, i) => `<li data-reveal><span class="process__no">${String(i + 1).padStart(2, "0")}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join("")}</ol>`;
}

export function benefits(o: { id: string; eyebrow: string; title: string; intro: string; items: Array<{ label: string; title: string; text: string }>; photo: PhotoKey; alt?: string }) {
  return `<section class="benefits" aria-labelledby="${o.id}">
  <div class="shell">
    ${heading({ eyebrow: o.eyebrow, title: o.title, lead: o.intro, id: o.id })}
    <div class="benefits__grid">
      ${o.items.map((b, i) => `<div class="benefit benefit--${i}" data-reveal><p class="benefit__label">${b.label}</p><h3>${b.title}</h3><p>${b.text}</p></div>`).join("")}
      <figure class="benefits__photo" data-reveal>${photo(o.photo, "(max-width: 900px) 92vw, 34vw", { alt: o.alt })}</figure>
    </div>
  </div>
</section>`;
}

export const quotes = [
  { cls: "ink", text: "Wir haben mit COVER einen Partner für unsere digitale Transformation im Bereich Musik, Buch und Musikalien, dem wir jederzeit vertrauen.", name: "Dr. Johannes Graulich", role: "Geschäftsführer · Carus-Verlag, Leinfelden-Echterdingen", logo: "carus.png", org: "Carus-Verlag" },
  { cls: "cyan", text: "Der Erfolg des Landwirtschaftsverlags hängt unter anderem mit der Leistungsfähigkeit von COVER zusammen.", name: "Paul Pankoke", role: "Leiter Vertriebsmanagement · Landwirtschaftsverlag, Münster", logo: "landwirtschaftsverlag.png", org: "Landwirtschaftsverlag" },
  { cls: "soft", text: "Wir arbeiten extrem gerne mit COVER aufgrund der hohen Kompetenz der Mitarbeiter und der Innovationsfreude.", name: "Robert Narr", role: "Geschäftsführer · Narr Francke Attempto Verlag, Tübingen", logo: "nfa.png", org: "Narr Francke Attempto Verlag" },
];
const logos: Array<[string, string]> = [
  ["redbull-logo.png", "Red Bull Media House"], ["landwirtschaftsverlag.png", "Landwirtschaftsverlag"], ["carus.png", "Carus-Verlag"], ["herold.png", "HEROLD"],
  ["kohlhammer.png", "Kohlhammer"], ["herder-1.png", "Herder"], ["nfa.png", "Narr Francke Attempto Verlag"], ["ulmer.png", "Verlag Eugen Ulmer"], ["vth.png", "VTH – Verlag für Technik und Handwerk"],
];

export function voicesAndLogos(withQuotes = true) {
  const q = withQuotes ? `<div class="shell">
    <header class="sec-head sec-head--tight">
      <div><p class="eyebrow">Kundenstimmen</p><h2 id="voices-title" class="h2" data-split>Was Verlage sagen.</h2></div>
      <div class="voices__nav">
        <button class="round" type="button" data-voices-prev aria-label="Vorherige Kundenstimme">${icon("alt-arrow-left-linear")}</button>
        <button class="round" type="button" data-voices-next aria-label="Nächste Kundenstimme">${icon("alt-arrow-right-linear")}</button>
      </div>
    </header>
  </div>
  <div class="voices__track" data-voices tabindex="0" aria-label="Kundenstimmen, horizontal scrollbar">
    ${quotes.map((v) => `<figure class="voice voice--${v.cls}"><blockquote><p>„${v.text}“</p></blockquote><figcaption><img src="${asset(`logos/${v.logo}`)}" alt="${v.org}" width="200" height="100" loading="lazy" /><span><strong>${v.name}</strong>${v.role}</span></figcaption></figure>`).join("")}
  </div>` : "";
  return `<section class="voices${withQuotes ? "" : " voices--logos"}" id="kunden" aria-labelledby="${withQuotes ? "voices-title" : "logos-title"}">
  ${q}
  <div class="logos">
    <h2 class="logos__title" id="logos-title">In guter Gesellschaft. <span>Eine Auswahl unserer Kunden.</span></h2>
    <div class="marquee" data-marquee><ul class="marquee__track">${logos.map(([f, n]) => `<li><img src="${asset(`logos/${f}`)}" alt="${n}" width="200" height="100" loading="lazy" /></li>`).join("")}</ul></div>
  </div>
</section>`;
}

export function ctaBand(ctx: Ctx, o: { eyebrow?: string; title?: string; accent?: string; text?: string; button?: string } = {}) {
  return `<section class="cta" aria-labelledby="cta-title">
  <div class="shell cta__grid">
    <div>
      <p class="eyebrow eyebrow--light">${o.eyebrow ?? "Lassen Sie uns sprechen"}</p>
      <h2 id="cta-title" class="h2 h2--light" data-split>${o.title ?? "Was braucht"} <span class="accent">${o.accent ?? "Ihr Verlagsgeschäft?"}</span></h2>
    </div>
    <div class="cta__side">
      <p class="lead lead--light">${o.text ?? "Ein besseres System. Mehr Unterstützung. Oder einen klareren Weg, beides zu verbinden. Sagen Sie uns, wo Sie beginnen möchten."}</p>
      <div class="cta__actions"><a class="btn btn--cyan btn--lg" href="${href(ctx, "kontakt/")}">${o.button ?? "Mit COVER sprechen"} ${arrow}</a><span class="cta__phone">${icon("phone-linear")}+49 7031 2126-300</span></div>
    </div>
  </div>
</section>`;
}
