# COVER Demo Website v2

Deutschsprachiges Präsentationskonzept für COVER. Gestaltungsprinzipien von mailchimp.com (vollflächiger Hero,
große Headline mit farbigem Akzent, Pill-Buttons, Personalisierungs-Panel, große Kundenstimmen) auf Basis von
Inhalt und Strategie der ersten Demo (cover-website-demo). Schrift: Manrope (wie in der ersten Demo). Farben: COVER Cyan aus dem Logo, Navy, Weiß und Nebelgrau.
Inhalte stammen ausschließlich aus der ersten Demo (jerichocarloat.github.io/cover-website-demo) und covernet.de.

## Eigene Elemente
- **Hero**: „Weniger Verwaltung. Mehr Verlag.“ über einer Druckmaschine, GSAP-Intro, Pointer-Parallax-Karten (illustrativ).
- **Den passenden Einstieg finden**: Publikationsformen + Startpunkt ergeben einen Vorschlag aus Software, ERP-Modulen und Services mit Links zu den Seiten; das Kontaktformular wird vorbelegt.
- **Services-Karten**: die Hover-Expansion aus der ersten Demo (`ServiceExperience`), 1:1 nach Vanilla-TS portiert.
- **ERP-Module**: 13 eigene Modulseiten (Daten aus `src/erp-modules.ts`, aus der ersten Demo übernommen).

## Stack
Vite + TypeScript, GSAP 3.13 (ScrollTrigger, SplitText), Lenis als einziger Smooth-Scroll. Kein Three.js.
`prefers-reduced-motion` schaltet Lenis, Split-Animationen und Marquee ab; ohne JavaScript ist alles sichtbar.

## Seiten (wie in der ersten Demo)
Startseite · Software (`plattform/`) mit 13 ERP-Modulseiten · Services · Verlagsbetrieb (`operations/`) · Kundenentwicklung · Lösungen · Über COVER (`unternehmen/`) · Aktuelles (`news/`) · Kontakt · 404.
Navigation: Software, Services, Unternehmen, Kontakt. Alle Links sind relativ, die Seite läuft daher in jedem Unterordner (z. B. GitHub Pages).

## Aufbau
- `src/site/parts.ts` – gemeinsame Bausteine (Header, Footer, Hero, Kapitel, Kundenstimmen, CTA)
- `src/site/pages.ts` – alle Seiteninhalte (Quelle: erste Demo und covernet.de)
- `scripts/generate.ts` – schreibt die HTML-Seiten nach `site/`, Vite baut sie nach `dist/`
- `src/main.ts` – Lenis, GSAP (ScrollTrigger, SplitText), Services-Karten aus der ersten Demo, Einstiegsfinder, Formular

## Entwickeln
```sh
npm ci
npm run dev     # generiert die Seiten und startet Vite
npm run build   # → dist/ (23 Seiten, relative Pfade)
```

## Veröffentlichen
Der Workflow `.github/workflows/deploy-pages.yml` baut bei jedem Push auf `main` und veröffentlicht `dist/` über GitHub Pages
(Einstellungen → Pages → Source: GitHub Actions). Konzept, keine offizielle Website (`noindex`); das Formular versendet nichts.
