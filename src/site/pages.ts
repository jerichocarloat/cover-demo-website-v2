// Page content for COVER v3. Sources of truth: the v2 demo (jerichocarloat.github.io/cover-website-demo)
// and covernet.de. Copy is taken from those pages; nothing here adds new services or claims.
import { erpModules } from "../erp-modules";
import {
  type Ctx, arrow, asset, benefits, chapter, ctaBand, documentShell, esc, featureGrid, heading, href, icon, pageHero, photo, processBand, tasks, voicesAndLogos,
  type PhotoKey,
} from "./parts";

export type Page = { file: string; html: string };
const ctxFor = (route: string): Ctx => ({ route, depth: route === "" ? 0 : route.split("/").filter(Boolean).length });

const preloadPress = `<link rel="preload" as="image" href="${asset("img/press-1600.webp")}" imagesrcset="${asset("img/press-960.webp")} 960w, ${asset("img/press-1600.webp")} 1600w, ${asset("img/press-2400.webp")} 2400w" imagesizes="100vw" />`;

const flowSteps: Array<{ kind: "Software" | "Service"; tag: string; title: string; text: string; chip: string; icon: string; photo: PhotoKey }> = [
  { kind: "Software", tag: "COVER E-Commerce", title: "Online abgeschlossen.", text: "Im Aboshop mit verlagsspezifischen Shopfunktionen. Die Bestellung fließt direkt in die kaufmännischen Abläufe.", chip: "Bestellung im Aboshop übernommen", icon: "cart-large-2-bold-duotone", photo: "shop" },
  { kind: "Software", tag: "COVER ERP · Abonnements", title: "Verwaltet und versendet.", text: "Aboart, Laufzeit, Preis und Versand sind im ERP hinterlegt. Formdokumente unterstützen Begrüßungen und Kündigungsbestätigungen.", chip: "Begrüßung als Formdokument", icon: "letter-bold-duotone", photo: "workspace" },
  { kind: "Software", tag: "COVER ERP · Debitorenmanagement", title: "Abgerechnet.", text: "Rechnungen im passenden Rhythmus. SEPA-Mandate und Zahlungszuordnung im Debitorenmanagement, integriert mit der Finanzbuchhaltung.", chip: "Rechnung und SEPA-Mandat", icon: "bill-list-bold-duotone", photo: "finance" },
  { kind: "Service", tag: "Kunden- und Aboservice", title: "Betreut.", text: "Fragen und Aboänderungen übernimmt auf Wunsch ein COVER Team, das Ihrem Verlag zugeordnet ist und Ihre Produkte kennt.", chip: "Aboänderung bearbeitet", icon: "headphones-round-bold-duotone", photo: "support" },
  { kind: "Service", tag: "Marketing und Kundenentwicklung", title: "Gehalten.", text: "Abonnentenbindung und Reaktivierung: Kundenwissen aus dem CRM und persönliche Ansprache helfen, Kündiger zurückzugewinnen.", chip: "Abonnent reaktiviert", icon: "chat-round-like-bold-duotone", photo: "review" },
];

/* ================================================================== HOME */
function home(): Page {
  const c = ctxFor("");
  const mod = (slug: string, ic: string, label: string) => `<li><a class="mod" href="${href(c, `plattform/${slug}/`)}" data-mod="${slug}">${icon(ic)}<span>${label}</span>${icon("arrow-right-linear", "i mod__go")}</a></li>`;
  const svc = (pick: string, anchor: string, title: string, text: string, caps: string[], cta: string, src: string, w: number, h: number, ratio: number, px: number, py: number, alt: string) => `
    <a class="svc" href="${href(c, `services/#${anchor}`)}" data-service-card data-pick="${pick}" data-state="preview">
      <span class="svc__surface" data-motion-layer="surface" aria-hidden="true"></span>
      <div class="svc__copy" data-motion-layer="copy"><h3>${title}</h3><p>${text}</p><ul class="svc__caps">${caps.map((x) => `<li>${x}</li>`).join("")}</ul></div>
      <span class="svc__cta" data-motion-layer="cta"><span>${cta}</span><span class="dot-arrow">${arrow}</span></span>
      <div class="svc__photo" data-motion-layer="photo" style="--ratio:${ratio};--px:${px};--py:${py}"><img src="${asset(src)}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" /></div>
    </a>`;
  const prod = (id: string, key: PhotoKey, tag: string, title: string, text: string, items: string[]) => `
    <article class="prod" id="${id}" data-pick="${id}" data-reveal>
      <figure class="prod__media">${photo(key, "(max-width: 1000px) 92vw, 30vw")}</figure>
      <div class="prod__body"><p class="prod__tag">${tag}</p><h3>${title}</h3><p>${text}</p>${tasks(items)}
        <a class="link-arrow" href="${href(c, `plattform/#${id}`)}">Mehr zu ${tag} <span class="dot-arrow">${arrow}</span></a></div>
    </article>`;

  const body = `
<section class="hero" id="top" aria-labelledby="hero-title" data-hero>
  <div class="hero__media" data-hero-media>${photo("press", "100vw", { alt: "", eager: true })}</div>
  <div class="hero__shade" aria-hidden="true"></div>
  <div class="hero__float" aria-hidden="true">
    <div class="fcard fcard--a" data-depth="0.6"><span class="fcard__icon">${icon("refresh-circle-bold-duotone")}</span><span class="fcard__txt"><span class="fcard__k">Aboänderung bearbeitet</span><span class="fcard__v">Kunden- und Aboservice</span></span></div>
    <div class="fcard fcard--b" data-depth="1"><span class="fcard__icon">${icon("bill-list-bold-duotone")}</span><span class="fcard__txt"><span class="fcard__k">Rechnung erstellt</span><span class="fcard__v">COVER ERP</span></span></div>
    <div class="fcard fcard--c" data-depth="0.8"><span class="fcard__icon">${icon("chart-2-bold-duotone")}</span><span class="fcard__txt"><span class="fcard__k">Kampagne ausgewertet</span><span class="fcard__v">COVER CRM</span></span></div>
    <div class="fcard fcard--d" data-depth="0.45"><span class="fcard__icon">${icon("cart-large-2-bold-duotone")}</span><span class="fcard__txt"><span class="fcard__k">Bestellung im Aboshop</span><span class="fcard__v">COVER E-Commerce</span></span></div>
  </div>
  <div class="hero__content">
    <p class="hero__eyebrow" data-hero-in>Verlagstechnologie. Fachkundige Unterstützung.</p>
    <h1 id="hero-title" data-hero-title><span class="hl">Weniger Verwaltung.</span> <span class="hl hl--accent">Mehr Verlag.</span></h1>
    <p class="hero__lead" data-hero-in>ERP, CRM und E-Commerce für Ihr Verlagsgeschäft. Erfahrene Teams für Abonnements, Kundenservice, Buchhaltung und Marketing.</p>
    <div class="hero__ctas" data-hero-in>
      <a class="btn btn--cyan btn--lg" href="${href(c, "plattform/")}">Software entdecken ${arrow}</a>
      <a class="btn btn--glass btn--lg" href="${href(c, "services/")}">Services kennenlernen ${arrow}</a>
    </div>
    <ul class="hero__proof" data-hero-in aria-label="COVER in Zahlen">
      <li><strong>1997</strong><span>gegründet</span></li><li><strong>150</strong><span>Verlagskunden</span></li><li><strong>2.600+</strong><span>COVER Nutzer</span></li>
    </ul>
  </div>
  <a class="hero__strip" href="#einstieg" data-hero-in><span class="hero__strip-t">Bücher, Zeitschriften, Anzeigen oder Veranstaltungen? <strong>Den passenden Einstieg finden</strong></span><span class="dot-arrow">${arrow}</span></a>
</section>

<section class="tailor" id="einstieg" aria-labelledby="tailor-title">
  <div class="shell">
    <form class="tailor__panel" data-tailor novalidate>
      <div class="tailor__intro">
        <p class="eyebrow">Den passenden Einstieg finden</p>
        <h2 id="tailor-title" class="h2" data-split>COVER für <span class="accent">Ihren Verlag.</span></h2>
        <p class="lead">Beginnen Sie mit Software, spezialisierten Services oder beidem zusammen. Zwei Fragen genügen für einen ersten Vorschlag.</p>
      </div>
      <div class="tailor__fields">
        <fieldset><legend><span class="step-no">1</span>Was veröffentlichen Sie? <span class="legend-hint">Mehrfachauswahl</span></legend>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="typ" value="buch" /><span>${icon("book-2-bold-duotone")}Bücher</span></label>
            <label class="chip"><input type="checkbox" name="typ" value="zeitschrift" /><span>${icon("notebook-bold-duotone")}Zeitschriften</span></label>
            <label class="chip"><input type="checkbox" name="typ" value="anzeigen" /><span>${icon("document-text-bold-duotone")}Anzeigen</span></label>
            <label class="chip"><input type="checkbox" name="typ" value="veranstaltungen" /><span>${icon("calendar-bold-duotone")}Veranstaltungen</span></label>
            <label class="chip"><input type="checkbox" name="typ" value="digital" /><span>${icon("shop-bold-duotone")}Digitale Produkte</span></label>
          </div></fieldset>
        <fieldset><legend><span class="step-no">2</span>Wo möchten Sie beginnen?</legend>
          <div class="chips">
            <label class="chip"><input type="radio" name="start" value="software" /><span>Verlagssoftware und E-Commerce</span></label>
            <label class="chip"><input type="radio" name="start" value="service" /><span>Kunden- und Aboservice</span></label>
            <label class="chip"><input type="radio" name="start" value="finance" /><span>Buchhaltung und Verwaltung</span></label>
            <label class="chip"><input type="radio" name="start" value="process" /><span>Verlagsprozesse</span></label>
            <label class="chip"><input type="radio" name="start" value="marketing" /><span>Marketing und Kundenentwicklung</span></label>
            <label class="chip"><input type="radio" name="start" value="hosting" /><span>Migration oder Hosting</span></label>
          </div></fieldset>
        <div class="tailor__actions">
          <button class="btn btn--ink btn--lg" type="submit">Vorschlag anzeigen ${arrow}</button>
          <button class="textbtn" type="reset">Zurücksetzen</button>
          <p class="tailor__status" role="status" aria-live="polite" data-tailor-status></p>
        </div>
      </div>
      <div class="tailor__result" data-tailor-result hidden tabindex="-1">
        <p class="tailor__result-title" data-tailor-title></p>
        <ul class="picks" data-picks></ul>
        <a class="btn btn--cyan" href="${href(c, "kontakt/")}" data-tailor-cta>Über diesen Einstieg sprechen ${arrow}</a>
      </div>
    </form>
  </div>
</section>

<section class="software" id="software" aria-labelledby="software-title">
  <div class="shell">
    ${heading({ eyebrow: "COVER Software", title: 'Die Systeme hinter <span class="accent">Ihrem Verlagsgeschäft.</span>', lead: "Drei Produkte, entwickelt für die Arbeitsweise von Verlagen. Nutzen Sie die Systeme, die Sie brauchen, miteinander verbunden.", id: "software-title" })}
    <div class="prod__grid">
      ${prod("erp", "workspace", "ERP", "Das Verlagsgeschäft steuern.", "Verwalten Sie Produkte, Abonnements, Aufträge und Finanzen, vom ersten Angebot bis zur Rechnung.", ["Produkte und Abonnements verwalten", "Bestellungen und Anzeigenbuchungen bearbeiten", "Rechnungsstellung, Finanzen und Auswertungen verbinden"])}
      ${prod("crm", "growth", "CRM", "Ihre Kunden verstehen.", "Führen Sie Kundendaten, Kontakthistorien und Kampagnenaktivitäten zusammen. Nutzen Sie Ihr Wissen für eine relevantere Kundenansprache.", ["Ein klareres Bild jedes Kunden gewinnen", "Relevante Zielgruppen für die Kommunikation auswählen", "Kampagnen steuern und die Resonanz auswerten"])}
      ${prod("commerce", "shop", "E-Commerce", "Print und Digitales verkaufen.", "Verkaufen Sie Bücher, Abonnements und digitale Produkte. Bieten Sie Ihren Lesern ein Kundenportal. Hosting und Updates übernimmt COVER.", ["Aboshops, Buchshops und Landingpages", "Digitale Dokumente und Kundenportale", "Hosting, Updates und Betrieb durch COVER"])}
    </div>
    <div class="mods" data-mods>
      <header class="mods__head"><h3>Die ERP-Module entdecken</h3><p>Wählen Sie ein Thema und sehen Sie, welche Abläufe es abdeckt.</p></header>
      <div class="mods__grid">
        <div class="mods__group"><h4>Kunden und Produkte</h4><ul>${mod("kontaktmanagement", "user-id-bold-duotone", "Kontaktmanagement")}${mod("produktmanagement", "pen-new-square-bold-duotone", "Produktmanagement")}${mod("wechselversand", "box-bold-duotone", "Wechselversand")}</ul></div>
        <div class="mods__group"><h4>Vertrieb und Publikationsformen</h4><ul>${mod("abonnement", "refresh-circle-bold-duotone", "Abonnements und Zeitschriften")}${mod("buch", "book-2-bold-duotone", "Bücher und Warenwirtschaft")}${mod("anzeigen", "document-text-bold-duotone", "Anzeigen")}${mod("veranstaltungen", "calendar-bold-duotone", "Veranstaltungen")}</ul></div>
        <div class="mods__group"><h4>Finanzen und Vergütung</h4><ul>${mod("debitorenmanagement", "card-bold-duotone", "Debitorenmanagement")}${mod("finanzbuchhaltung", "calculator-bold-duotone", "Finanzbuchhaltung")}${mod("honorare-und-provisionen", "wallet-money-bold-duotone", "Honorare, Tantiemen und Provisionen")}${mod("kostenrechnung", "chart-2-bold-duotone", "Kostenrechnung")}</ul></div>
        <div class="mods__group"><h4>Rechte und Redaktion</h4><ul>${mod("rechte-und-lizenzen", "copyright-bold-duotone", "Rechte und Lizenzen")}${mod("redaktionsverwaltung", "document-text-bold-duotone", "Redaktionsverwaltung")}</ul>
          <p class="mods__bi"><strong>Aus Daten wird Überblick.</strong> Filterbasierte Statistiken, Berichte und eine integrierte Business Intelligence für Ihren gesamten Verlag.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="services" id="services" aria-labelledby="services-title">
  <div class="shell">
    ${heading({ eyebrow: "COVER Services", title: 'Spezialisierte Services. <span class="accent">Mehr Kapazität für Ihr Team.</span>', lead: "Erfahrene Teams für Kundenservice, Finanzen, Verlagsprozesse und Marketing. Wählen Sie die Unterstützung, die Ihr Unternehmen braucht.", id: "services-title" })}
    <div class="svc__rows" data-svc>
      <div class="svc__row" data-expanded="none">
        ${svc("service", "customer-service", "Kunden- und Aboservice", "Erfahrene Menschen für Ihre Kunden und Abonnenten.", ["Kundenanfragen", "Bestellungen und Aboänderungen", "Kundendaten"], "Service kennenlernen", "img/support-1100.webp", 1100, 1375, 0.8, 0.48, 0.15, "Illustrative Szene: Fachkräfte im Kundenservice arbeiten am Bildschirm")}
        ${svc("finance", "accounting", "Buchhaltung und Verwaltung", "Fachkundige Unterstützung für Finanz- und Verwaltungsprozesse.", ["Unterstützung in der Buchhaltung", "Finanzverwaltung", "Honorarabrechnungen"], "Service kennenlernen", "img/finance-1400.webp", 1400, 934, 1.5, 0.5, 0.5, "Ein Taschenrechner und Unterlagen für die Finanzverwaltung")}
      </div>
      <div class="svc__row" data-expanded="none">
        ${svc("process", "publishing-operations", "Verlagsprozesse", "Spezialisierte Unterstützung für die täglichen Aufgaben im Verlag.", ["Anzeigenverwaltung", "Verlagsspezifische Abläufe", "Lettershop und Logistik"], "Service kennenlernen", "img/press-1600.webp", 1600, 1068, 1.5, 0.5, 0.5, "Bedruckte Papierbahnen durchlaufen eine Druckmaschine")}
        ${svc("marketing", "marketing-growth", "Marketing und Kundenentwicklung", "Nutzen Sie Kundendaten und Kampagnen, um Kundenbindung und Wachstum zu stärken.", ["Bestandskundenmarketing", "Kundenbindung und Reaktivierung", "Unterstützung bei der Interessentengewinnung"], "Service kennenlernen", "img/review-1200.webp", 1200, 1800, 0.667, 0.5, 0.3, "Zwei Kolleginnen besprechen eine gedruckte Zeitschrift")}
      </div>
    </div>
    <ul class="capacity" aria-label="COVER Services in Zahlen">
      <li data-reveal><strong>40+</strong><span>festangestellte Servicekräfte</span><p>Nutzen Sie erfahrene Unterstützung, ohne jede spezialisierte Funktion im eigenen Unternehmen aufzubauen.</p></li>
      <li data-reveal><strong>15</strong><span>zusätzliche Kräfte bei Bedarf</span><p>Der COVER Personalpool bietet Flexibilität, wenn Ihr internes Team sie braucht.</p></li>
      <li data-reveal><strong class="cap-word">Fest zugeordnet</strong><span>Menschen, die Ihr Geschäft kennen</span><p>Langjährige Zusammenarbeit schafft ein tiefes Verständnis für Ihre Kunden, Produkte und Prozesse.</p></li>
    </ul>
  </div>
</section>

${whyCover()}

<section class="company" id="unternehmen" aria-labelledby="company-title">
  <div class="shell company__grid">
    <div class="company__copy">
      <p class="eyebrow eyebrow--light">Über COVER</p>
      <h2 id="company-title" class="h2 h2--light" data-split>Verlagskompetenz. <span class="accent">Seit 1997.</span></h2>
      <p class="lead lead--light">COVER entwickelt in Böblingen ERP-, CRM- und E-Commerce-Software für Verlage. Spezialisierte Serviceteams unterstützen die Menschen und Prozesse hinter dem Verlagsgeschäft.</p>
      <a class="btn btn--glass" href="${href(c, "unternehmen/")}">Über COVER ${arrow}</a>
    </div>
    <figure class="company__media" data-reveal>${photo("team", "(max-width: 900px) 92vw, 44vw")}</figure>
    ${numbers()}
  </div>
</section>

${voicesAndLogos()}
${ctaBand(c)}`;
  return { file: "index.html", html: documentShell(c, { title: "COVER | Software und Services für Verlage", description: "ERP, CRM und E-Commerce für Verlage. Die spezialisierten Teams von COVER unterstützen bei Abonnements, Kundenservice, Buchhaltung und Marketing.", section: "home", overHero: true, body, preload: preloadPress }) };
}

function numbers() {
  return `<dl class="company__nums">
  <div><dt>gegründet</dt><dd data-count="1997" data-plain>1997</dd></div>
  <div><dt>Mitarbeitende</dt><dd data-count="70">70</dd></div>
  <div><dt>Verlagskunden</dt><dd data-count="150">150</dd></div>
  <div><dt>COVER Nutzer</dt><dd data-count="2600" data-suffix="+">2.600+</dd></div>
</dl>`;
}

function whyCover() {
  const rows: Array<[string, string, string, string, string]> = [
    ["Für Verlage gemacht", "Branchenübergreifende Software", "Verlagsspezifische Abläufe müssen zusätzlich eingerichtet werden.", "Speziell für Verlage entwickelt", "Abonnements, Bücher, Anzeigen und digitale Produkte."],
    ["Verbundene Abläufe", "Einzellösungen, die verbunden werden müssen", "Werkzeuge und Schnittstellen werden separat zusammengestellt.", "ERP, CRM und E-Commerce, verbunden", "Kunden-, Produkt- und Transaktionsdaten greifen ineinander."],
    ["Die tägliche Arbeit", "Software, mit der Ihr Team selbst arbeitet", "Die täglichen Aufgaben bleiben bei Ihrem Team.", "Fachkundige Menschen für die Aufgaben", "Unterstützung für Kunden, Abonnements und kaufmännische Prozesse."],
    ["Flexible Kapazitäten", "Zusätzliche Kapazitäten selbst organisieren", "Personal einstellen oder zusätzliche Unterstützung koordinieren.", "Kostengünstige und flexible Dienstleistungen", "Ein erfahrener Personalpool passt sich dem Arbeitsaufkommen Ihres Verlags an."],
  ];
  return `<section class="why" id="warum-cover" aria-labelledby="why-title">
  <div class="shell">
    ${heading({ eyebrow: "Warum COVER", title: 'Ein Partner für die Software <span class="accent">und die Arbeit dahinter.</span>', lead: "Wählen Sie die Software. Ergänzen Sie die Unterstützung, die Sie brauchen.", id: "why-title" })}
    <div class="why__table" role="table" aria-label="Vergleich: Nur Software und Einzellösungen gegenüber COVER">
      <div class="why__row why__row--head" role="row"><span role="columnheader">Worauf es ankommt</span><span role="columnheader">Nur Software und Einzellösungen</span><span role="columnheader" class="why__cover"><img src="${asset("brand/cover-logo.png")}" width="250" height="74" alt="COVER" /> Software + fachkundige Unterstützung</span></div>
      ${rows.map(([t, n, nd, y, yd]) => `<div class="why__row" role="row" data-reveal><span role="rowheader">${t}</span><span role="cell" class="why__no"><b>${n}</b>${nd}</span><span role="cell" class="why__yes"><b>${y}</b>${yd}</span></div>`).join("")}
    </div>
  </div>
</section>`;
}

/* ================================================================== SOFTWARE */
const erpGroups: Array<{ title: string; summary: string; modules: Array<[string, string, string]> }> = [
  { title: "Kunden und Produkte", summary: "Kontaktdaten, Verlagsprodukte und Wechselversand.", modules: [
    ["kontaktmanagement", "Kontaktmanagement", "Kunden- und Geschäftspartnerdaten, die in den kaufmännischen Abläufen gemeinsam genutzt werden."],
    ["produktmanagement", "Produktmanagement", "Ihre Verlagsprodukte und die zugehörigen Daten verwalten."],
    ["wechselversand", "Wechselversand", "Kostenfreie Exemplare gezielt an qualifizierte Empfängergruppen versenden."]] },
  { title: "Vertrieb und Publikationsformen", summary: "Abonnements, Bücher, Anzeigen und Veranstaltungen.", modules: [
    ["abonnement", "Abonnements und Zeitschriften", "Abonnements verwalten, versenden und abrechnen."],
    ["buch", "Bücher und Warenwirtschaft", "Titel, Bestellungen, Bestände und Retouren."],
    ["anzeigen", "Anzeigen", "Kaufmännische Anzeigenprozesse planen und verwalten."],
    ["veranstaltungen", "Veranstaltungen", "Veranstaltungen und die zugehörigen kaufmännischen Prozesse verwalten."]] },
  { title: "Finanzen und Vergütung", summary: "Forderungen, Buchhaltung, Honorare und Provisionen.", modules: [
    ["debitorenmanagement", "Debitorenmanagement", "Kundensalden, Forderungen und Prozesse rund um Zahlungen."],
    ["finanzbuchhaltung", "Finanzbuchhaltung", "Integrierte Finanzbuchhaltung mit gypsilon Software."],
    ["honorare-und-provisionen", "Honorare, Tantiemen und Provisionen", "Honorare, Tantiemen und Vertriebsprovisionen verwalten."],
    ["kostenrechnung", "Kostenrechnung", "Die Kosten Ihres Verlags analysieren."]] },
  { title: "Rechte und Redaktion", summary: "Lizenzen und die Verwaltung hinter der redaktionellen Arbeit.", modules: [
    ["rechte-und-lizenzen", "Rechte und Lizenzen", "Verlagsrechte und Lizenzdaten verwalten."],
    ["redaktionsverwaltung", "Redaktionsverwaltung", "Die Verwaltung rund um Mitwirkende und redaktionelle Aufgaben organisieren."]] },
];

function platform(): Page {
  const c = ctxFor("plattform/");
  const nav = (items: Array<[string, string, string, string]>) => `<nav class="jump jump--${items.length}" aria-label="Bereiche auf dieser Seite">${items.map(([id, t, role, text], i) => `<a class="jump__item" href="#${id}" data-reveal><span class="jump__top"><span>${String(i + 1).padStart(2, "0")}</span>${icon("alt-arrow-down-linear")}</span><strong>${t}</strong>${role ? `<span class="jump__role">${role}</span>` : ""}<span class="jump__text">${text}</span></a>`).join("")}</nav>`;
  const modules = `<div class="modgroups" id="module">${erpGroups.map((g) => `<div class="modgroup" data-reveal><h3>${g.title}</h3><p class="modgroup__sum">${g.summary}</p><ul>${g.modules.map(([slug, t, d]) => `<li><a href="${href(c, `plattform/${slug}/`)}"><span><strong>${t}</strong><span>${d}</span></span><span class="dot-arrow">${arrow}</span></a></li>`).join("")}</ul></div>`).join("")}</div>`;
  const body = `
${pageHero(c, { id: "software-hero-title", eyebrow: "COVER Software für Verlage", title: "Verlage arbeiten anders.", accent: "Ihre Software sollte es auch.", lead: "Verwalten Sie Produkte, Abonnements, Kunden und Onlineverkäufe mit Software, die für Verlage entwickelt wurde. ERP, CRM und E-Commerce verbinden die Arbeit hinter Ihrem Geschäft.", photo: "workspace", ctas: [{ to: "#products", label: "Den passenden Einstieg finden", down: true }, { to: "kontakt/", label: "Mit COVER sprechen", ghost: true }] })}

<section id="products" class="overview" aria-labelledby="products-title"><div class="shell">
  ${heading({ eyebrow: "Drei Produkte. Ein vernetztes Verlagsgeschäft.", title: 'Die passende Software <span class="accent">für Ihre Aufgaben.</span>', lead: "ERP steuert die kaufmännischen Prozesse. CRM führt Kundenwissen zusammen. E-Commerce verbindet Ihre Produkte mit den Menschen, die sie kaufen.", id: "products-title" })}
  ${nav([["erp", "ERP", "Produkte, Bestellungen und Finanzen", "Ihre Verlagsprodukte planen, verkaufen und abrechnen."], ["crm", "CRM", "Kunden und Kommunikation", "Kunden verstehen und relevante Kontakte gestalten."], ["commerce", "E-Commerce", "Shops und Kundenportale", "Bücher, Abonnements und digitale Produkte online verkaufen."]])}
</div></section>

${chapter(c, { id: "erp", eyebrow: "01 / ERP · Unternehmensressourcen planen", title: 'Von der Planung <span class="accent">bis zur Rechnung.</span>', lead: "Ein klarer Prozess für die Produkte, die Sie veröffentlichen.", text: "COVER ERP verbindet Planung, Angebote, Bestellungen und Rechnungsstellung. Es unterstützt Zeitschriften, Bücher, Anzeigen, Veranstaltungen, Artikel und Fortsetzungen, ebenso wie E-Paper, E-Books und digitale Zugänge.", tasks: ["Produkte und Abonnements verwalten", "Bestellungen und Anzeigenbuchungen bearbeiten", "Rechnungsstellung, Finanzen und Auswertungen verbinden"], link: ["kontakt/", "Ihren ERP-Bedarf besprechen"], photo: "finance",
  extra: `${processBand("Kaufmännischer ERP-Prozess", [{ title: "Planen", text: "Produkte und kaufmännische Aufgaben anlegen." }, { title: "Anbieten", text: "Das Angebot vorbereiten." }, { title: "Bearbeiten", text: "Die Bestellung abwickeln." }, { title: "Abrechnen", text: "Den Verkauf mit den Finanzen verbinden." }])}
  <div class="sub-head"><h3>Die ERP-Module entdecken</h3><p>Wählen Sie ein Thema und sehen Sie, welche Abläufe es abdeckt.</p></div>
  ${modules}
  <div class="note" data-reveal><h3>Aus Daten wird Überblick.</h3><p>Filterbasierte Statistiken und Berichte unterstützen Entscheidungen im Alltag. Die integrierte Business Intelligence ergänzt Planung, Analyse und Berichtswesen für Ihren gesamten Verlag.</p></div>` })}

${chapter(c, { id: "crm", eyebrow: "02 / CRM · Kundenbeziehungen verwalten", title: 'Kunden kennen. <span class="accent">Kontakte relevant gestalten.</span>', lead: "Kundendaten, Historie und Kommunikation im Zusammenhang.", text: "COVER CRM hilft Ihnen, direkte Kundenbeziehungen zu verwalten, von der Erfassung des Kundenverhaltens und der Verbesserung von Kontaktdaten bis zur Auswahl von Zielgruppen und der Organisation von Kampagnen.", tasks: ["Ein klareres Bild jedes Kunden gewinnen", "Relevante Zielgruppen für die Kommunikation auswählen", "Kampagnen steuern und die Resonanz auswerten"], link: ["kontakt/", "Ihren CRM-Bedarf besprechen"], photo: "tech", reverse: true, tint: true,
  extra: featureGrid([{ label: "01 / Verstehen", title: "Kontakte mit Kontext.", text: "Führen Sie die Kundenhistorie zusammen. Prüfen und ergänzen Sie Kontaktdaten, um ein aussagekräftigeres Kundenbild zu erhalten." }, { label: "02 / Kommunizieren", title: "Werkzeuge für relevante Kontakte.", text: "Kampagnenmanagement, E-Mail-Marketing, Online-Marketing-Automatisierung und Telefonmarketing unterstützen die Kundenansprache." }, { label: "03 / Daten nutzbar halten", title: "Eine bessere Datengrundlage.", text: "Importieren und exportieren Sie Kontaktdaten. Prüfen Sie Dubletten und Postanschriften, um die Datenqualität zu verbessern." }]) })}

${chapter(c, { id: "commerce", eyebrow: "03 / E-Commerce", title: 'Kaufen und abonnieren. <span class="accent">Einfacher gemacht.</span>', lead: "Ein Onlineshop, der Verlage versteht.", text: "Verkaufen Sie Bücher, Abonnements und digitale Produkte über eine verlagsspezifische Plattform. Geben Sie Ihren Kunden einen Ort zum Kaufen, zum Abrufen digitaler Dokumente und zur Verwaltung ihrer Kundenbeziehung.", tasks: ["Gedruckte und digitale Produkte online verkaufen", "Shops, Landingpages und Kundenportale erstellen", "Hosting, Updates und Betrieb COVER überlassen"], link: ["kontakt/", "Ihren Onlinevertrieb besprechen"], photo: "shop",
  extra: `${featureGrid([{ title: "Aboshops", text: "Abonnements mit verlagsspezifischen Shopfunktionen anbieten." }, { title: "Buchshops", text: "Buchkatalog und Onlinebestellung zusammenbringen." }, { title: "Digitale Dokumente", text: "Digitale Verlagsprodukte an Kunden ausliefern." }, { title: "Kundenportale", text: "Ein Onlinebereich für Ihre Kunden und Abonnenten." }, { title: "Landingpages", text: "Gezielte Seiten für Produkte, Angebote und Kampagnen erstellen." }, { title: "CMS-Seiten", text: "Inhalte rund um Ihre Shops und Websites verwalten." }])}
  <div class="sub-head"><h3>Die Plattform hinter dem Shop</h3><p>Für Verlage entwickelt. Von COVER betrieben.</p></div>
  <div class="disclosures">
    <details class="disc"><summary><span><strong>Mehrere Shops und Websites verwalten</strong><small>Eine verlagsspezifische Plattform auf Magento-Basis.</small></span><span class="disc__icon" aria-hidden="true"></span></summary><p>Ein Mandantenbereich auf einer zentral betriebenen Instanz ermöglicht Ihnen, mehrere Shops und Websites zu verwalten und zu konfigurieren. Verlagsspezifische Funktionen bauen auf dem Magento-Framework auf.</p></details>
    <details class="disc"><summary><span><strong>Verbundene Systeme. Betreuter Betrieb.</strong><small>Hosting, Updates, Support und ERP-Anbindungen.</small></span><span class="disc__icon" aria-hidden="true"></span></summary><p>COVER übernimmt Betrieb, Hosting, Updates und Support. Die Plattform ist in andere COVER Systeme integriert und kann über Middleware an andere ERP-Systeme angebunden werden.</p></details>
  </div>` })}

<section id="integrations" class="chapter chapter--tint" aria-labelledby="integrations-title"><div class="shell">
  ${heading({ eyebrow: "Mit dem gesamten Ablauf verbunden", title: 'Verlagsarbeit findet nicht <span class="accent">in einem einzigen System statt.</span>', lead: "Auslieferungspartner, Buchhaltungssysteme und Onlineshops gehören zum selben Geschäft. COVER bietet Schnittstellen und Datenwerkzeuge, um diese Abläufe zu verbinden.", id: "integrations-title" })}
  <div class="integrations">
    <div class="integration" data-reveal><h3>Auslieferungs- und Abopartner</h3><p>Schnittstellen verbinden Verlagsprozesse mit Auslieferungsdiensten und Abonnementvertriebspartnern (WBZ).</p><ul class="tags"><li>Prolit</li><li>KNV</li><li>Herold</li><li>VVA</li><li>WBZ</li></ul></div>
    <div class="integration" data-reveal><h3>Finanzen und Onlineshops</h3><p>Verbinden Sie die Software entlang Ihrer kaufmännischen Abläufe, von der Buchhaltung bis zum E-Commerce.</p><ul class="tags"><li>DATEV</li><li>Syska</li><li>Sage</li><li>Magento</li><li>Shopware</li><li>OXID</li></ul></div>
    <div class="integration" data-reveal><h3>Produktdaten und Auswertungen</h3><p>ONIX-Import und -Export unterstützen den Austausch von Verlagsproduktdaten. Statistiken und Business Intelligence ermöglichen Analysen und Berichte.</p></div>
    <div class="integration" data-reveal><h3>Technischer Betrieb</h3><p>COVER bietet Hosting und Unterstützung beim technischen Betrieb. Für die E-Commerce-Plattform übernimmt COVER Hosting, Updates, Betrieb und Support.</p></div>
  </div>
  <a class="link-arrow" href="${href(c, "kontakt/")}">Ihre Systeme und Anbindungen besprechen <span class="dot-arrow">${arrow}</span></a>
</div></section>

${benefits({ id: "software-benefits-title", eyebrow: "Warum COVER Software", title: 'Verlagskompetenz. <span class="accent">Im System verankert.</span>', intro: "Der Mehrwert liegt nicht allein in der Technologie. Entscheidend ist, wie gut die Software zu Ihrem Verlag passt.", photo: "review", items: [
  { label: "Verlagsspezifisch", title: "Ihre Geschäftsmodelle, verstanden.", text: "Abonnements, Bücher, Anzeigen, Veranstaltungen und digitale Zugänge gehören in ein gemeinsames kaufmännisches Gesamtbild." },
  { label: "Verbundene Produkte", title: "Weniger Aufwand zwischen Systemen.", text: "ERP, CRM und E-Commerce verbinden Kunden-, Produkt- und Transaktionsdaten in den COVER Abläufen." },
  { label: "Nah am Arbeitsalltag", title: "Software, geprägt von Erfahrung.", text: "Serviceteams, Produktmanagement und Entwicklung arbeiten zusammen. Das Wissen über Verlagsprozesse bleibt eng mit der Entwicklung verbunden." },
  { label: "Software + Services", title: "Menschen, wenn Sie sie brauchen.", text: "Ergänzen Sie spezialisierte Unterstützung für Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing." }] })}

<section class="bridge" aria-labelledby="bridge-title"><div class="shell bridge__inner" data-reveal>
  <div><p class="eyebrow">Mehr als die Werkzeuge</p><h2 id="bridge-title" class="h2" data-split>Brauchen Sie auch Menschen, <span class="accent">die die Arbeit übernehmen?</span></h2></div>
  <div><p class="lead">Ihr Team kann die COVER Software selbst nutzen. Wenn Sie zusätzliche Unterstützung brauchen, übernehmen die spezialisierten Serviceteams von COVER ausgewählte Verlagsprozesse.</p><a class="btn btn--ink btn--lg" href="${href(c, "services/")}">COVER Services entdecken ${arrow}</a></div>
</div></section>
${voicesAndLogos(false)}
${ctaBand(c)}`;
  return { file: "plattform/index.html", html: documentShell(c, { title: "ERP, CRM und E-Commerce für Verlage | COVER", description: "Verlagssoftware für Produkte, Abonnements, Bestellungen, Kunden und Onlinevertrieb. Entdecken Sie COVER ERP, CRM, E-Commerce und ihre verbundenen Abläufe.", section: "software", overHero: true, body }) };
}

/* ================================================================== MODULE PAGES */
const modulePhoto: Record<string, PhotoKey> = {
  "/photos/technology-workspace-v6.jpg": "tech", "/photos/print-review-collaboration-v6.webp": "review",
  "/photos/cover-erp-v6.jpg": "finance", "/photos/shared-software-workspace-v6.webp": "workspace",
};
function modulePages(): Page[] {
  return erpModules.map((m) => {
    const c = ctxFor(`plattform/${m.slug}/`);
    const related = m.related.map((s) => erpModules.find((x) => x.slug === s)!).filter(Boolean);
    const body = `
${pageHero(c, { id: "module-title", eyebrow: `COVER ERP / ${m.category}`, title: m.title, lead: `<strong class="phero__sub">${m.headline}</strong> ${m.intro}`, photo: modulePhoto[m.photo.src] ?? "workspace", crumbs: [["Software", "plattform/"], ["ERP", "plattform/#erp"], [m.title]], ctas: [{ to: "#functions", label: "Funktionen entdecken", down: true }, { to: "kontakt/", label: "Ihren ERP-Bedarf besprechen", ghost: true }] })}
<section id="functions" class="overview" aria-labelledby="functions-title"><div class="shell">
  ${heading({ eyebrow: "Das steckt im Modul", title: 'Welche Aufgaben <span class="accent">das Modul abdeckt.</span>', lead: m.sectionIntro, id: "functions-title" })}
  ${featureGrid(m.features.map((f, i) => ({ label: String(i + 1).padStart(2, "0"), title: f.title, text: f.text })))}
  <div class="sub-head"><h3>Im Ablauf Ihres Verlags</h3></div>
  ${processBand(`Ablauf im Modul ${m.title}`, m.steps)}
</div></section>
<section class="context" aria-labelledby="context-title"><div class="shell context__grid" data-reveal>
  <div><p class="eyebrow eyebrow--light">Teil des Ganzen</p><h2 id="context-title" class="h2 h2--light" data-split>${m.contextTitle}</h2></div>
  <div><p class="lead lead--light">${m.context}</p><a class="link-arrow link-arrow--light" href="${href(c, "plattform/#erp")}">COVER ERP im Überblick <span class="dot-arrow">${arrow}</span></a></div>
</div></section>
<section class="related" aria-labelledby="related-title"><div class="shell">
  ${heading({ eyebrow: "Verbundene Arbeitsbereiche", title: 'Passende Module <span class="accent">im Zusammenhang.</span>', lead: "Entdecken Sie weitere Bereiche Ihres Verlagsgeschäfts.", id: "related-title" })}
  <div class="related__grid">${related.map((r) => `<a class="related__card" href="${href(c, `plattform/${r.slug}/`)}" data-reveal><small>${r.category}</small><strong>${r.title}</strong><span>${r.headline}</span><span class="dot-arrow">${arrow}</span></a>`).join("")}</div>
  <a class="link-arrow" href="${href(c, "plattform/#module")}">Zurück zu allen ERP-Modulen <span class="dot-arrow">${arrow}</span></a>
</div></section>
${ctaBand(c)}`;
    return { file: `plattform/${m.slug}/index.html`, html: documentShell(c, { title: `${m.title} für Verlage | COVER`, description: m.intro, section: "software", overHero: true, body }) };
  });
}

/* ================================================================== SERVICES */
function services(): Page {
  const c = ctxFor("services/");
  const areas: Array<[string, string, string, PhotoKey]> = [
    ["customer-service", "Kunden- und Aboservice", "Kunden und Abonnenten gut betreuen.", "support"],
    ["accounting", "Buchhaltung und Verwaltung", "Finanzielle Aufgaben geordnet abwickeln.", "finance"],
    ["publishing-operations", "Verlagsprozesse", "Die spezialisierten Aufgaben im Verlag übernehmen.", "press"],
    ["marketing-growth", "Marketing und Kundenentwicklung", "Ihre Kundenbeziehungen weiterentwickeln.", "growth"],
  ];
  const body = `
${pageHero(c, { id: "services-hero-title", eyebrow: "COVER Services für Verlage", title: "Ihr Kerngeschäft.", accent: "Unsere spezialisierte Unterstützung.", lead: "Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing. Erfahrene Teams übernehmen die tägliche Arbeit, damit Sie sich auf Ihre Publikationen und Ihr Geschäft konzentrieren können.", photo: "support", position: "50% 25%", ctas: [{ to: "#service-areas", label: "Die passende Unterstützung finden", down: true }, { to: "kontakt/", label: "Mit COVER sprechen", ghost: true }] })}
<section id="service-areas" class="overview" aria-labelledby="service-areas-title"><div class="shell">
  ${heading({ eyebrow: "Vier Bereiche, die Ihr Team entlasten", title: 'Die richtige Fachkompetenz. <span class="accent">Dort, wo Sie sie brauchen.</span>', lead: "Sie müssen nicht jede Funktion selbst aufbauen. Entscheiden Sie, welche Aufgaben COVER übernehmen soll. Die Unterstützung lässt sich anpassen, wenn sich Ihr Arbeitsaufkommen verändert.", id: "service-areas-title" })}
  <nav class="areas" aria-label="Die vier Servicebereiche entdecken">${areas.map(([id, t, d, p], i) => `<a class="area" href="#${id}" data-reveal><figure>${photo(p, "(max-width: 900px) 46vw, 24vw")}</figure><span class="jump__top"><span>${String(i + 1).padStart(2, "0")}</span>${icon("alt-arrow-down-linear")}</span><strong>${t}</strong><span class="jump__text">${d}</span></a>`).join("")}</nav>
</div></section>
${chapter(c, { id: "customer-service", eyebrow: "01 / Kunden- und Aboservice", title: 'Für Ihre Kunden <span class="accent">da sein.</span>', lead: "Ein erfahrenes Team für die Anfragen, die jeden Tag eingehen.", text: "Von der Frage zu einer Bestellung bis zur Aboänderung übernimmt COVER die Betreuung Ihrer Kunden und Abonnenten. Die Ihrem Verlag zugeordneten Mitarbeitenden lernen Ihre Produkte, Prozesse und Kunden kennen.", tasks: ["Kunden- und Aboanfragen", "Bestellbearbeitung und Aboänderungen", "Kundenverwaltung und Datenpflege", "Kundenkommunikation"], link: ["kontakt/", "Kundenbetreuung besprechen"], photo: "workspace" })}
${chapter(c, { id: "accounting", eyebrow: "02 / Buchhaltung und Verwaltung", title: 'Finanzielle Aufgaben <span class="accent">zuverlässig abwickeln.</span>', lead: "Spezialisierte Kapazitäten für Ihre kaufmännische Verwaltung.", text: "Rechnungen, Zahlungen und Honorare verlangen Sorgfalt. COVER unterstützt die Buchhaltungs- und Verwaltungsaufgaben Ihres Verlags mit verbundenen Systemen und Verlagskompetenz.", tasks: ["Debitoren- und Kreditorenprozesse", "Buchhaltung und Finanzverwaltung", "Honorarabrechnungen", "Prozesse rund um die Abrechnung"], link: ["kontakt/", "Unterstützung in der Buchhaltung besprechen"], photo: "finance", reverse: true, tint: true })}
${chapter(c, { id: "publishing-operations", eyebrow: "03 / Verlagsprozesse", title: 'Verlagswissen. <span class="accent">Im täglichen Einsatz.</span>', lead: "Unterstützung für die Prozesse, die Verlage besonders machen.", text: "Anzeigenverwaltung, Mailings und Versand müssen sorgfältig koordiniert werden. COVER bringt verlagsspezifische Erfahrung in die kaufmännische Arbeit hinter Ihren Publikationen ein.", tasks: ["Anzeigen- und Mediaverwaltung", "Verlagsspezifische kaufmännische Abläufe", "Lettershop- und Mailingservices", "Versand- und Logistikkoordination"], link: ["kontakt/", "Ihre Verlagsprozesse besprechen"], photo: "press" })}
${chapter(c, { id: "marketing-growth", eyebrow: "04 / Marketing und Kundenentwicklung", title: 'Mehr aus Ihren <span class="accent">Kundenbeziehungen machen.</span>', lead: "Unterstützung, die bei den Kunden ansetzt, die Sie bereits kennen.", text: "COVER unterstützt Bestandskundenmarketing, die Rückgewinnung von Abonnenten und die Gewinnung von Interessenten. Kundenwissen und verbundene Software helfen Ihrem Team, die richtigen Menschen mit relevanterer Kommunikation zu erreichen.", tasks: ["Bestandskundenmarketing und Kundenpflege", "Abonnentenbindung und Reaktivierung", "Unterstützung bei der Interessentengewinnung"], link: ["kontakt/", "Kundenentwicklung besprechen"], photo: "shop", reverse: true, tint: true,
  extra: featureGrid([{ label: "01 / Verstehen", title: "Ihre Kunden kennen.", text: "Die Kontakthistorie im CRM und die Kundensegmentierung helfen, relevante Zielgruppen zu erkennen." }, { label: "02 / Verbinden", title: "Kontakte relevant gestalten.", text: "Kampagnenmanagement, E-Mail-Marketing, Automatisierung und Werkzeuge für Landingpages unterstützen die Kommunikation." }, { label: "03 / Lernen", title: "Die Resonanz verstehen.", text: "Kampagnenauswertung und Business Intelligence helfen Ihrem Team, Aktivitäten einzuordnen und den nächsten Schritt zu planen." }]) })}
${benefits({ id: "service-team-title", eyebrow: "Warum COVER Services", title: 'Mehr Kapazität. <span class="accent">Weniger Aufwand.</span>', intro: "Kosteneffiziente und flexible Services, die erfahrene Menschen und Verlagstechnologie zusammenbringen.", photo: "support", items: [
  { label: "40+ festangestellte Servicemitarbeitende", title: "Ein Fachteam, das bereitsteht.", text: "Nutzen Sie erfahrene Unterstützung für Ihren Verlag, ohne jede spezialisierte Funktion selbst aufbauen zu müssen." },
  { label: "15 zusätzliche Mitarbeitende bei Bedarf", title: "Kapazität, die sich anpasst.", text: "Erweitern Sie die Unterstützung, wenn sich Ihr Arbeitsaufkommen verändert. Der Personalpool von COVER schafft Flexibilität, wenn Ihr internes Team sie braucht." },
  { label: "Ihrem Verlag zugeordnet", title: "Menschen, die Ihr Geschäft kennen.", text: "Langfristige Zusammenarbeit schafft Wissen über Ihre Produkte, Kunden und täglichen Abläufe." },
  { label: "Menschen + Technologie", title: "Weniger Routinearbeit.", text: "Serviceteams arbeiten mit Produktmanagement und Entwicklung zusammen. Automatisierung und Prozesswissen unterstützen gemeinsam die tägliche Arbeit." }] })}
<section id="technology" class="overview overview--tint" aria-labelledby="technology-title"><div class="shell">
  ${heading({ eyebrow: "Die Technologie hinter dem Service", title: 'Erfahrene Menschen. <span class="accent">Verbundene Software.</span>', lead: "ERP, CRM und E-Commerce sind die Softwareprodukte von COVER. Sie unterstützen die Aufgaben Ihres Serviceteams und die Prozesse, die Sie selbst übernehmen.", id: "technology-title" })}
  <div class="foundation">${[["erp", "ERP", "Produkte, Bestellungen, Abonnements und Finanzprozesse."], ["crm", "CRM", "Kundendaten, Kontakthistorie und Kampagnenwerkzeuge."], ["commerce", "E-Commerce", "Onlineshops, digitale Auslieferung und Kundenportale."]].map(([id, t, d]) => `<a class="foundation__card" href="${href(c, `plattform/#${id}`)}" data-reveal><strong>${t}</strong><span>${d}</span><span class="dot-arrow">${arrow}</span></a>`).join("")}</div>
  <div class="crosslink" data-reveal><p>Beginnen Sie mit einem Prozess oder verbinden Sie mehrere Bereiche. Sprechen Sie mit COVER über Ihr Arbeitsaufkommen, Ihre bestehenden Systeme und die Unterstützung, die Ihr Team braucht.</p><a class="link-arrow" href="${href(c, "kontakt/")}">Den passenden Einstieg finden <span class="dot-arrow">${arrow}</span></a></div>
</div></section>
${voicesAndLogos()}
${ctaBand(c)}`;
  return { file: "services/index.html", html: documentShell(c, { title: "Spezialisierte Services für Verlage | COVER", description: "Kundenservice, Buchhaltung, Verlagsprozesse und Kundenmarketing. Erfahrene COVER Teams und flexible Kapazitäten für die Arbeit hinter Ihren Publikationen.", section: "services", overHero: true, body }) };
}

/* ================================================================== OPERATIONS */
function operations(): Page {
  const c = ctxFor("operations/");
  const items: Array<[string, string]> = [
    ["Kunden- und Aboservice", "Aufträge, Anfragen, Vertragsänderungen, Kündigungen und Rückgewinnung mit vollständigem Kundenkontext."],
    ["Buchhaltung", "Unterstützung in Debitoren- und Kreditorenprozessen, abgestimmt auf Ihre Systemlandschaft."],
    ["Anzeigen und Media", "Operative Abwicklung von der Buchung bis zur Faktura, damit Verkaufsteams verkaufen können."],
    ["Honorarabrechnung", "Wiederkehrende, sorgfältige Abrechnung nach den vereinbarten Vertragslogiken."],
    ["Lettershop und Logistik", "Koordination von Versand- und Logistikleistungen mit gebündelten Mengen und etablierten Abläufen."],
    ["Hosting und technischer Betrieb", "Betrieb, Datensicherung, Updates und ein zentraler Ansprechpartner für die COVER Umgebung."],
  ];
  const body = `
${pageHero(c, { id: "ops-title", eyebrow: "COVER Verlagsbetrieb", title: "Eingearbeitete Teams", accent: "für den laufenden Verlagsbetrieb.", lead: "Lagern Sie ausgewählte kaufmännische Prozesse aus, ohne Software und Betrieb voneinander zu trennen. COVER arbeitet im gleichen Systemkontext wie Ihr Team.", photo: "support", position: "50% 25%", crumbs: [["Services", "services/"], ["Verlagsbetrieb"]], ctas: [{ to: "kontakt/", label: "Service-Modell prüfen" }] })}
<section class="overview" aria-labelledby="ops-areas"><div class="shell">
  ${heading({ eyebrow: "01 / Leistungsbereiche", title: 'Definierte Verantwortung <span class="accent">statt anonymer Auslagerung.</span>', id: "ops-areas" })}
  <div class="cards3">${items.map(([t, d], i) => `<article class="card" data-reveal><span class="card__no">${String(i + 1).padStart(2, "0")}</span><h3>${t}</h3><p>${d}</p></article>`).join("")}</div>
</div></section>
<section class="context" aria-labelledby="ops-adv"><div class="shell context__grid" data-reveal>
  <div><p class="eyebrow eyebrow--light">Der operative Vorteil</p><h2 id="ops-adv" class="h2 h2--light" data-split>Service-Erfahrung fließt <span class="accent">zurück ins System.</span></h2></div>
  <div><p class="lead lead--light">Service-Teams sehen wiederkehrende Engpässe im Alltag. Produktmanagement und Entwicklung können daraus bessere Konfigurationen und Automatisierungen entwickeln.</p><p class="stat"><strong>40+</strong><span>feste Service-Mitarbeitende</span></p></div>
</div></section>
<section class="overview" aria-labelledby="ops-model"><div class="shell">
  ${heading({ eyebrow: "03 / Zusammenarbeit", title: 'Ein klares Betriebsmodell <span class="accent">vor dem ersten Vorgang.</span>', id: "ops-model" })}
  ${steps([["Umfang festlegen", "Welche Vorgänge, Kanäle und Ausnahmen gehören in den Service?"], ["Rollen vereinbaren", "Verantwortung, Freigaben, Datenzugriff und Eskalation definieren."], ["Wissen übergeben", "Prozesse, Tonalität, Kundenregeln und Qualitätsfälle trainieren."], ["Kontrolliert starten", "Volumen stufenweise übergeben und Ergebnisse gemeinsam prüfen."], ["Verbessern", "Berichte und Fallmuster für Automatisierung und Prozessentwicklung nutzen."]])}
</div></section>
${ctaBand(c, { eyebrow: "Kapazität mit System", title: "Welcher Prozess bindet heute", accent: "die falschen Ressourcen?", text: "Wir grenzen einen geeigneten Prozess ab und klären, ob Software, Service oder eine Kombination den besseren Einstieg bietet.", button: "Servicebedarf prüfen lassen" })}`;
  return { file: "operations/index.html", html: documentShell(c, { title: "Verlagsbetrieb | COVER", description: "Spezialisierte Teams für Kundenservice, Finanzen, Anzeigen und weitere Verlagsprozesse.", section: "services", overHero: true, body }) };
}

function steps(items: Array<[string, string]>) {
  return `<ol class="steps">${items.map(([t, d], i) => `<li data-reveal><span class="steps__no">${String(i + 1).padStart(2, "0")}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join("")}</ol>`;
}

/* ================================================================== KUNDENENTWICKLUNG */
function growth(): Page {
  const c = ctxFor("kundenentwicklung/");
  const lines: Array<[string, string]> = [["Erstkauf", "Begleitung beim Einstieg, passende Inhalte und nächster sinnvoller Schritt"], ["Abo-Abschluss", "Willkommen, Nutzung, Service und Verlängerung"], ["Einzelkauf", "Relevantes Abo oder thematisch passende Ergänzung"], ["Inaktivität", "Reaktivierung anhand von Interesse und Historie"], ["Kündigung", "Schnelle, wertschätzende Rückgewinnung"], ["Servicekontakt", "Kontextbezogene Information statt Serienmail"]];
  const body = `
${pageHero(c, { id: "growth-title", eyebrow: "COVER Kundenentwicklung", title: "Aus Kundendaten werden", accent: "relevante nächste Schritte.", lead: "COVER verbindet Vertrags-, Kauf- und Service-Daten mit Marketingautomatisierung. So entstehen Kommunikationsabläufe, die zu einem konkreten Ereignis passen.", photo: "growth", crumbs: [["Services", "services/"], ["Kundenentwicklung"]], ctas: [{ to: "kontakt/", label: "90-Tage-Pilot besprechen" }] })}
<section class="overview" aria-labelledby="g1"><div class="shell">
  ${heading({ eyebrow: "01 / Kommunikationsabläufe", title: 'Kommunikation beginnt <span class="accent">mit einem echten Signal.</span>', id: "g1" })}
  <ol class="signals">${lines.map(([s, o], i) => `<li data-reveal><span class="signals__no">${String(i + 1).padStart(2, "0")}</span><strong>${s}</strong><span class="signals__line" aria-hidden="true"></span><p>${o}</p></li>`).join("")}</ol>
</div></section>
<section class="overview overview--tint" aria-labelledby="g2"><div class="shell">
  ${heading({ eyebrow: "02 / Erste Pilotversion", title: 'Der 90-Tage-Pilot <span class="accent">für Kundenbeziehungen.</span>', lead: "Klein genug, um sauber zu lernen. Relevant genug, um eine echte Entscheidung zu treffen.", id: "g2" })}
  ${steps([["Datenbasis und Einwilligung", "Saubere Quellen, klare Segmente und relevante Signale für jeden Kommunikationsablauf."], ["Ein Ziel festlegen", "Zum Beispiel Aktivierung, Rückgewinnung, ergänzende Angebote oder Reaktivierung."], ["Zwei Kommunikationsabläufe umsetzen", "Logik, Inhalte, Technik, Tests und Verantwortlichkeiten verbinden."], ["Messen und verbessern", "Ergebnisse auswerten und den Kommunikationsablauf gezielt weiterentwickeln."]])}
</div></section>
<section class="overview" aria-labelledby="g3"><div class="shell split">
  <div><p class="eyebrow">Was dazugehört</p><h2 id="g3" class="h2" data-split>System, Inhalt und Betrieb <span class="accent">müssen zusammenspielen.</span></h2></div>
  ${tasks(["Daten- und Kommunikationskonzept", "Segmente und Auslöser", "Automatisierung und Integration", "Texte, Landingpage und Qualitätssicherung", "Berichtswesen und Optimierung"])}
</div></section>
${ctaBand(c, { eyebrow: "Besser werden", title: "Wachstum wird", accent: "gemessen und verbessert.", text: "Mit einer klaren Ausgangsbasis lernen Sie aus jedem Kommunikationsablauf und bauen die Maßnahmen aus, die Kundenbeziehungen stärken.", button: "Pilotpotenzial prüfen" })}`;
  return { file: "kundenentwicklung/index.html", html: documentShell(c, { title: "Kundenentwicklung | COVER", description: "Kommunikation entlang der Kundenbeziehung, Kundenbindung und ergänzende Angebote aus verbundenen Verlagsdaten.", section: "services", overHero: true, body }) };
}

/* ================================================================== LOESUNGEN */
function solutions(): Page {
  const c = ctxFor("loesungen/");
  const list = [
    { n: "01", title: "Vom Abo bis zum Zahlungseingang", for: "Abo, Finanzen, IT", problem: "Digitale und gedruckte Abos, Zahlungen, Versand, Zugang und Service durchgängig steuern.", parts: ["Abonnement", "Zahlungsabwicklung", "E-Commerce", "Digitaler Zugang", "Debitoren", "Kundenservice"] },
    { n: "02", title: "Vom Produkt bis zum Markt", for: "Produkt, Redaktion, Rechte", problem: "Von der Idee über Herstellung und Metadaten bis zu Vertrieb und Abrechnung.", parts: ["Produktmanagement", "Redaktion", "Rechte & Lizenzen", "Honorare", "ONIX", "E-Commerce"] },
    { n: "03", title: "Vom Anzeigenauftrag bis zur Rechnung", for: "Anzeigenvertrieb, Betrieb, Finanzen", problem: "Crossmediale Angebote, Prognosen, Disposition, Material, Provision und Faktura verbinden.", parts: ["CRM", "Anzeigen", "Prognosen", "Heftplanung", "Provision", "Finanzen"] },
    { n: "04", title: "Der Lebenszyklus der Kundenbeziehung", for: "Marketing, Abo, Service", problem: "Kunden-, Kauf- und Service-Signale für relevante Kommunikation und Bindung nutzen.", parts: ["CRM", "Segmente", "Automatisierung", "Begleitung beim Einstieg", "Kundenbindung", "Berichtswesen"] },
  ];
  const body = `
${pageHero(c, { id: "sol-title", eyebrow: "Lösungen", title: "Beginnen Sie mit dem Ablauf,", accent: "nicht mit der Modulliste.", lead: "COVER verbindet Software und Services entlang der Abläufe, die für Ihr Geschäftsergebnis zählen.", photo: "review", position: "50% 35%" })}
<section class="overview" aria-labelledby="sol-h"><div class="shell">
  ${heading({ eyebrow: "01 / Vier Ausgangspunkte", title: 'Ein Ziel. <span class="accent">Mehrere verbundene Bausteine.</span>', id: "sol-h" })}
  <div class="solutions">${list.map((s) => `<article class="solution" data-reveal><div class="solution__meta"><span>${s.n}</span><small>${s.for}</small></div><div><h3>${s.title}</h3><p>${s.problem}</p><ul class="tags">${s.parts.map((p) => `<li>${p}</li>`).join("")}</ul></div><a class="link-arrow" href="${href(c, "kontakt/")}">Lösung besprechen <span class="dot-arrow">${arrow}</span></a></article>`).join("")}</div>
</div></section>
${ctaBand(c)}`;
  return { file: "loesungen/index.html", html: documentShell(c, { title: "Lösungen | COVER", description: "COVER Lösungen entlang zentraler Verlagsabläufe.", section: "services", overHero: true, body }) };
}

/* ================================================================== UNTERNEHMEN */
function company(): Page {
  const c = ctxFor("unternehmen/");
  const body = `
${pageHero(c, { id: "about-title", eyebrow: "Über COVER", title: "Verlagskompetenz.", accent: "Seit 1997.", lead: "COVER entwickelt in Böblingen ERP-, CRM- und E-Commerce-Software für Verlage. Spezialisierte Serviceteams unterstützen die Menschen und Prozesse hinter dem Verlagsgeschäft.", photo: "team", ctas: [{ to: "kontakt/", label: "Mit COVER sprechen" }, { to: "services/", label: "Unsere Services", ghost: true }] })}
<section class="company company--plain" aria-label="COVER in Zahlen"><div class="shell">${numbers()}</div></section>
${chapter(c, { id: "about-story", eyebrow: "Eine Branche. Gemeinsames Wissen.", title: 'Entwickelt für die Art, <span class="accent">wie Verlage arbeiten.</span>', lead: "Bücher, Zeitschriften, Anzeigen, Veranstaltungen und digitale Produkte stellen unterschiedliche kaufmännische Anforderungen.", text: "Durch den Fokus auf Verlage verstehen die COVER Teams die Zusammenhänge zwischen Produkten, Kunden und der täglichen Arbeit dahinter. Servicefachkräfte arbeiten eng mit Produktmanagement und Entwicklung zusammen. Erfahrungen aus dem Verlagsbetrieb fließen in die Software ein. Zugleich gibt die Software den Teams Werkzeuge für wiederkehrende Aufgaben an die Hand.", tasks: ["ERP-, CRM- und E-Commerce-Software für Verlage", "Spezialisierte Serviceteams für die Prozesse dahinter", "Service, Produktmanagement und Entwicklung arbeiten zusammen"], link: ["services/", "Unsere Services kennenlernen"], photo: "press" })}
${whyCover()}
${voicesAndLogos()}
${ctaBand(c)}`;
  return { file: "unternehmen/index.html", html: documentShell(c, { title: "Über COVER | Verlagskompetenz seit 1997", description: "Verlagskompetenz seit 1997. COVER aus Böblingen verbindet Verlagssoftware, spezialisierte Serviceteams und praktische Branchenkenntnis.", section: "unternehmen", overHero: true, body }) };
}

/* ================================================================== NEWS */
function news(): Page {
  const c = ctxFor("news/");
  const items: Array<[string, string, string, string, string, PhotoKey]> = [
    ["Abos bezahlen. Einfacher abwickeln.", "Wie der COVER Payment Service die Zahlungsabwicklung für Verlage unterstützt.", "2026-04-16", "16. April 2026", "https://covernet.de/cover-payment-service-effizientes-abo-payment-fuer-verlage", "press"],
    ["Hosting für Ihr COVER System.", "Software im eigenen Haus betreiben oder den technischen Betrieb abgeben?", "2026-03-04", "4. März 2026", "https://covernet.de/hosting-im-haus-vs-hosting-ueber-cover", "workspace"],
    ["Kunden halten beginnt beim Gespräch.", "Persönlicher Kontakt und passende E-Mails können bei der Rückgewinnung helfen.", "2026-02-11", "11. Februar 2026", "https://covernet.de/effektive-rueckgewinnung-von-abokuendigern", "review"],
  ];
  const body = `
${pageHero(c, { id: "news-title", eyebrow: "Aktuelles", title: "Einblicke für", accent: "den Verlagsalltag.", lead: "Gedanken und praktische Themen rund um Software, Kunden und Abläufe. Ausgewählte Beiträge von COVER.", photo: "press" })}
<section class="overview" aria-label="Beiträge"><div class="shell">
  <div class="news">${items.map(([t, d, iso, disp, url, p]) => `<article class="news__card" data-reveal><a href="${url}" rel="noopener" target="_blank"><figure>${photo(p, "(max-width: 900px) 92vw, 30vw", { alt: "" })}</figure><p class="news__meta">Einblicke · <time datetime="${iso}">${disp}</time></p><h2>${t}</h2><p>${d}</p><span class="link-arrow">Auf covernet.de lesen <span class="dot-arrow">${icon("arrow-right-up-linear")}</span></span></a></article>`).join("")}</div>
  <p class="news__all"><a class="link-arrow" href="https://covernet.de/aktuelles" rel="noopener" target="_blank">Alle Beiträge auf covernet.de <span class="dot-arrow">${icon("arrow-right-up-linear")}</span></a></p>
</div></section>
${ctaBand(c)}`;
  return { file: "news/index.html", html: documentShell(c, { title: "Aktuelles | COVER", description: "Einblicke von COVER in Verlagssoftware, Hosting, Abo-Zahlungsabwicklung und Kundenbindung.", section: "unternehmen", overHero: true, body }) };
}

/* ================================================================== KONTAKT */
function contact(): Page {
  const c = ctxFor("kontakt/");
  const body = `
${pageHero(c, { id: "contact-title", eyebrow: "Kontakt", title: "Mit COVER", accent: "sprechen.", lead: "Erzählen Sie uns von Ihrem Verlag, Ihren Systemen und den Aufgaben, bei denen Sie Unterstützung brauchen. Beginnen Sie mit Software, spezialisierten Services oder beidem zusammen.", photo: "tech", ctas: [{ to: "#anfrage", label: "Zur Anfrage", down: true }] })}
<section class="contact" id="anfrage" aria-labelledby="form-title">
  <div class="shell contact__grid">
    <div class="contact__copy">
      <p class="eyebrow eyebrow--light">Ihre Anfrage</p>
      <h2 id="form-title" class="h2 h2--light" data-split>Wo fangen <span class="accent">wir an?</span></h2>
      <p class="lead lead--light">Bei Ihren Prioritäten, Ihren bestehenden Systemen und der Unterstützung, die Ihr Team braucht.</p>
      <address class="contact__direct">
        <span>${icon("buildings-2-bold-duotone")}COVER Softwarelösungen GmbH &amp; Co. KG</span>
        <span>${icon("map-point-linear")}Hanns-Klemm-Str. 1A, 71034 Böblingen</span>
        <span>${icon("phone-linear")}+49 7031 2126-300</span>
        <span>${icon("letter-linear")}vertrieb@covernet.de</span>
      </address>
    </div>
    <form class="form" data-form novalidate>
      <div class="form__body" data-form-body>
        <div class="field field--wide"><label for="f-topic">Worüber möchten Sie sprechen?</label>
          <div class="select"><select id="f-topic" name="thema" data-form-topic required>
            <option value="">Bitte auswählen</option><option>Verlagssoftware und E-Commerce</option><option>Kunden- und Aboservice</option><option>Buchhaltung und Verwaltung</option><option>Verlagsprozesse</option><option>Marketing und Kundenentwicklung</option><option>Migration oder Hosting</option><option>Eine bestehende COVER Installation</option><option>Eine andere Frage</option>
          </select>${icon("alt-arrow-down-linear")}</div><p class="field__err" id="f-topic-err"></p></div>
        <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required /><p class="field__err" id="f-name-err"></p></div>
        <div class="field"><label for="f-company">Unternehmen</label><input id="f-company" name="unternehmen" autocomplete="organization" required /><p class="field__err" id="f-company-err"></p></div>
        <div class="field"><label for="f-mail">Geschäftliche E-Mail-Adresse</label><input id="f-mail" name="email" type="email" autocomplete="email" required /><p class="field__err" id="f-mail-err"></p></div>
        <div class="field"><label for="f-phone">Telefon <span class="opt">optional</span></label><input id="f-phone" name="telefon" type="tel" autocomplete="tel" /></div>
        <div class="field field--wide"><label for="f-msg">Was möchten Sie verbessern?</label><textarea id="f-msg" name="nachricht" rows="5" required></textarea><p class="field__err" id="f-msg-err"></p></div>
        <div class="field field--wide"><label class="check" for="f-privacy"><input id="f-privacy" type="checkbox" name="datenschutz" required /><span>Ich habe die <a href="https://covernet.de/datenschutz" rel="noopener" target="_blank">Datenschutzhinweise</a> gelesen.</span></label><p class="field__err" id="f-privacy-err"></p></div>
        <button class="btn btn--cyan btn--lg form__submit" type="submit"><span>Anfrage vorbereiten</span>${arrow}</button>
        <p class="form__fine">Beginnen Sie mit Ihren Prioritäten und den Systemen, die Ihr Team bereits nutzt. In dieser Demo wird keine Nachricht versendet.</p>
      </div>
      <div class="form__done" data-form-done hidden tabindex="-1">
        <span class="form__done-icon">${icon("check-circle-bold")}</span>
        <p class="eyebrow eyebrow--light">Anfrage vorbereitet</p>
        <h3>Gehen wir den nächsten Schritt, <span data-form-name></span>.</h3>
        <p>Ihre Prioritäten bilden die Grundlage für ein gezieltes Gespräch über Software, Services und Verlagsprozesse. In dieser Demo wird keine Nachricht versendet.</p>
        <button class="textbtn textbtn--light" type="button" data-form-again>Zurück zum Formular</button>
      </div>
    </form>
  </div>
</section>
${voicesAndLogos(false)}`;
  return { file: "kontakt/index.html", html: documentShell(c, { title: "Kontakt zu COVER", description: "Sprechen Sie mit COVER über Verlagssoftware, spezialisierte Services und die Unterstützung, die Ihr Unternehmen braucht.", section: "kontakt", overHero: true, body }) };
}

/* ================================================================== 404 */
function notFound(): Page {
  const c = ctxFor("");
  const body = `<section class="nf"><div class="shell"><p class="eyebrow">404 · Seite nicht gefunden</p><h1 class="h2">Diese Seite ist <span class="accent">nicht verfügbar.</span></h1><p class="lead">Über die Startseite finden Sie die Software und Services von COVER.</p><a class="btn btn--ink btn--lg" href="${href(c, "")}">Zur Startseite ${arrow}</a></div></section>`;
  return { file: "404.html", html: documentShell(c, { title: "Seite nicht gefunden | COVER", description: "Diese Seite ist nicht verfügbar.", section: "", overHero: false, body }) };
}

export function allPages(): Page[] {
  return [home(), platform(), ...modulePages(), services(), operations(), growth(), solutions(), company(), news(), contact(), notFound()];
}
