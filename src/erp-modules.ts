export type ErpModuleFeature = { title: string; text: string };

export type ErpModule = {
  slug: string;
  title: string;
  category: string;
  headline: string;
  intro: string;
  sectionIntro: string;
  features: ErpModuleFeature[];
  steps: ErpModuleFeature[];
  contextTitle: string;
  context: string;
  related: string[];
  photo: { src: string; alt: string };
  // Internal evidence only. Source URLs are never rendered as outbound UI links.
  sources: string[];
};

const contactPhoto = { src: "/photos/technology-workspace-v6.jpg", alt: "Eine Fachkraft arbeitet mit Software am Computer" };
const publishingPhoto = { src: "/photos/print-review-collaboration-v6.webp", alt: "Ein Verlagsteam bespricht eine Publikation am Laptop" };
const financePhoto = { src: "/photos/cover-erp-v6.jpg", alt: "Eine Person prüft Rechnungen und kaufmännische Unterlagen" };
const softwarePhoto = { src: "/photos/shared-software-workspace-v6.webp", alt: "Ein Team arbeitet gemeinsam an Laptops" };

// FACT: functional descriptions below are paraphrases of the listed COVER pages.
// Editorial process steps explain those functions; they do not promise a new offer.
// Optional functions remain explicitly optional. No source-specific legal or
// certification claims are reproduced, and no product-interface image is invented.
export const erpModules: ErpModule[] = [
  {
    slug: "kontaktmanagement", title: "Kontaktmanagement", category: "Kunden & Produkte",
    headline: "Alle Kontakte. Ein gemeinsamer Überblick.",
    intro: "Kunden, Interessenten und Geschäftspartner im Zusammenhang sehen. COVER verbindet Adressen, Ansprechpartner, Kontakte und Geschäftsbeziehungen in einer zentralen Datenbasis.",
    sectionIntro: "Die Grundlage für kaufmännische Abläufe und eine passende Kundenansprache.",
    features: [
      { title: "Adressen und Ansprechpartner", text: "Verwalten Sie internationale B2B- und B2C-Adressen mit mehreren Ansprechpartnern und frei definierbaren Merkmalen." },
      { title: "Beziehungen und Historie", text: "Führen Sie Verlagskontakte, Geschäftsbeziehungen und die Werbehistorie zu einer Adresse oder Person zusammen." },
      { title: "Vorgänge und Zielgruppen", text: "Organisieren Sie Aufgaben und Wiedervorlagen. Nutzen Sie Kontaktmerkmale zur Zielgruppenauswahl sowie Import und Export zur Datenpflege." },
    ],
    steps: [
      { title: "Erfassen", text: "Adressen und Ansprechpartner anlegen." },
      { title: "Einordnen", text: "Merkmale, Kontakte und Beziehungen ergänzen." },
      { title: "Nutzen", text: "Vorgänge bearbeiten und passende Zielgruppen auswählen." },
    ],
    contextTitle: "Kundenwissen verbindet die Arbeit.",
    context: "Kontaktmanagement bildet eine gemeinsame Grundlage für COVER ERP und CRM. Kaufmännische Vorgänge und Kundenkommunikation greifen auf den gleichen Kontaktkontext zurück.",
    related: ["abonnement", "buch", "veranstaltungen"], photo: contactPhoto,
    sources: ["https://covernet.de/kontaktmanagement", "https://covernet.de/crm-erp-e-commerce"],
  },
  {
    slug: "produktmanagement", title: "Produktmanagement", category: "Kunden & Produkte",
    headline: "Von der Produktidee bis zur Veröffentlichung.",
    intro: "Planen und steuern Sie Ihre Titel und Verlagsprodukte. COVER bringt Aufgaben, Termine, Produktionsdaten und kaufmännische Informationen im Produktkontext zusammen.",
    sectionIntro: "Ein Überblick über die Arbeit hinter jedem Titel.",
    features: [
      { title: "Titel und Termine", text: "Organisieren Sie Titel, Ausgaben und Auflagen. Planen und überwachen Sie Aufgaben und Termine innerhalb Ihrer Buchprojekte." },
      { title: "Herstellung und Einkauf", text: "Verwalten Sie Produktionsdaten, Angebote und Einkäufe. Vor- und Nachkalkulationen unterstützen den Vergleich von Planung und Ergebnis." },
      { title: "Autoren und Rechte", text: "Betreuen Sie Autoren und Rezensenten. Ordnen Sie Honorarverträge und Lizenzgeschäfte einem Titel zu. Honorarabrechnung und ONIX-Titelmeldungen sind optional verfügbar." },
    ],
    steps: [
      { title: "Planen", text: "Titel, Aufgaben und Termine festlegen." },
      { title: "Steuern", text: "Herstellung, Einkauf und Beteiligte koordinieren." },
      { title: "Überblick behalten", text: "Produktdaten und Kalkulationen zusammenführen." },
    ],
    contextTitle: "Das Produkt bleibt der Bezugspunkt.",
    context: "Produktmanagement verbindet die Planung eines Titels mit seiner Herstellung und kaufmännischen Betrachtung. So lassen sich Buchprojekte über ihren Lebenszyklus hinweg überblicken.",
    related: ["buch", "rechte-und-lizenzen", "honorare-und-provisionen"], photo: publishingPhoto,
    sources: ["https://covernet.de/produktmanagement"],
  },
  {
    slug: "wechselversand", title: "Wechselversand", category: "Kunden & Produkte",
    headline: "Die richtigen Exemplare an die richtigen Empfänger.",
    intro: "Steuern Sie die wechselnde Verteilung von Freiexemplaren anhand definierter Empfängergruppen. COVER Versandsteuerung ergänzt die Zeitschriftenabwicklung als optionales Modul.",
    sectionIntro: "Empfängerstrukturen bestimmen, Versand planen und die Verteilung nachvollziehen.",
    features: [
      { title: "Empfänger gezielt auswählen", text: "Definieren und gewichten Sie Empfängerstrukturen über Adressmerkmale, etwa Branche, Unternehmensgröße oder Tätigkeit der Ansprechpartner." },
      { title: "Versandregeln festlegen", text: "Hinterlegen Sie Optimierungsvorgaben und Regeln für die Versandrotation. Pflichtversand und Wechselversand fließen in den Versandpool ein." },
      { title: "Verteilung auswerten", text: "Analysieren Sie Versandpools nach Empfängerstruktur. Die Historie der Versandläufe macht die bisherige Verteilung nachvollziehbar." },
    ],
    steps: [
      { title: "Definieren", text: "Empfängergruppen und deren Gewichtung festlegen." },
      { title: "Verteilen", text: "Den Versandpool anhand der Regeln zusammenstellen." },
      { title: "Auswerten", text: "Empfängerstruktur und Versandhistorie betrachten." },
    ],
    contextTitle: "Zwischen Leserschaft und Anzeigenmarkt.",
    context: "Gezielte Verbreitung ist Teil des Zeitschriftengeschäfts. Versandsteuerung nutzt qualifizierte Adressdaten und ergänzt die Abonnementabwicklung um die Planung wechselnder Freiexemplare.",
    related: ["kontaktmanagement", "abonnement", "anzeigen"], photo: { src: "/photos/printing-press-v6.webp", alt: "Eine Druckmaschine produziert gedruckte Publikationen" },
    sources: ["https://covernet.de/wechselversand"],
  },
  {
    slug: "abonnement", title: "Abonnements & Zeitschriften", category: "Vertrieb & Verlagsformate",
    headline: "Abonnements vom Bezug bis zur Rechnung steuern.",
    intro: "Verwalten Sie heft- oder zeitraumbezogene Abonnements, Versand und Abrechnung. Unterschiedliche Bezugsarten, Konditionen und Abrechnungsrhythmen bleiben dabei abbildbar.",
    sectionIntro: "Die laufenden Abläufe hinter Ihren Zeitschriften und Abonnements.",
    features: [
      { title: "Abonnements verwalten", text: "Bilden Sie unterschiedliche Aboarten, Laufzeiten, Preise, Rabatte und Einzel- oder Sammelbezüge ab." },
      { title: "Versand organisieren", text: "Verwalten Sie Pflicht-, Werbe- und Einzelversand, Versandaufteilungen und die Zahlen für die IVW-Meldung." },
      { title: "Abrechnen und kommunizieren", text: "Steuern Sie Fakturierung und Provisionsabrechnung. Formdokumente unterstützen beispielsweise Begrüßungen und Kündigungsbestätigungen; Aktionen können Prämien einschließen." },
    ],
    steps: [
      { title: "Anlegen", text: "Bezugsart, Konditionen und Laufzeit erfassen." },
      { title: "Beliefern", text: "Versand und Bezugsänderungen organisieren." },
      { title: "Abrechnen", text: "Rechnungen im passenden Rhythmus erstellen." },
    ],
    contextTitle: "Ein Abonnement ist eine laufende Beziehung.",
    context: "COVER verbindet die Abonnementverwaltung mit Versand, Fakturierung und Kundendaten. Optional ergänzt die Versandsteuerung diese Abläufe um die gezielte Verteilung von Freiexemplaren.",
    related: ["kontaktmanagement", "wechselversand", "debitorenmanagement"], photo: { src: "/photos/customer-support-editorial-v3.webp", alt: "Eine Mitarbeiterin betreut Kunden am Computer mit Unterstützung eines Kollegen" },
    sources: ["https://covernet.de/abonnement"],
  },
  {
    slug: "buch", title: "Buch & Warenwirtschaft", category: "Vertrieb & Verlagsformate",
    headline: "Titel, Bestellungen und Bestände zusammenbringen.",
    intro: "Verwalten Sie den Vertrieb von Büchern, elektronischen Medien und weiteren Artikeln. Von der Bestellung über die Auslieferung bis zur Rechnung.",
    sectionIntro: "Für Direktverkauf, Buchhandelsvertrieb und die Warenwirtschaft dahinter.",
    features: [
      { title: "Titel und Aufträge", text: "Pflegen Sie Titel- und Artikeldaten. Bearbeiten Sie Einzel- und Fortsetzungsbestellungen, individuelle Konditionen, Aktionen und Vormerkungen." },
      { title: "Bestände und Auslieferung", text: "Überwachen Sie Lagerbestände, Reservierungen, Retouren und Inventuren. Eigene und externe Auslieferung gehören zum Funktionsumfang." },
      { title: "Vertrieb und Abrechnung", text: "Organisieren Sie Vertreterabwicklung und internationale Rechnungsstellung. Honorarabrechnung und VLB-Meldungen über ONIX stehen optional zur Verfügung." },
    ],
    steps: [
      { title: "Bestellen", text: "Aufträge und Konditionen erfassen." },
      { title: "Ausliefern", text: "Bestände und Versand zusammenführen." },
      { title: "Abrechnen", text: "Verkäufe fakturieren und Retouren bearbeiten." },
    ],
    contextTitle: "Vom Titel zum kaufmännischen Vorgang.",
    context: "Buch und Warenwirtschaft verbinden Produktdaten mit Vertrieb, Lager und Fakturierung. Das Modul unterstützt eigene und fremde Titel sowie unterschiedliche Vertriebswege.",
    related: ["produktmanagement", "debitorenmanagement", "honorare-und-provisionen"], photo: publishingPhoto,
    sources: ["https://covernet.de/buch"],
  },
  {
    slug: "anzeigen", title: "Anzeigen", category: "Vertrieb & Verlagsformate",
    headline: "Anzeigen verkaufen. Die Abwicklung im Blick behalten.",
    intro: "COVER unterstützt Anzeigenverkauf und kaufmännische Abwicklung. Vom Abschluss über die Disposition bis zur Heftplanung, für Print und Cross-Media.",
    sectionIntro: "Verkaufsinformationen und die Arbeit hinter jeder Anzeigenbuchung.",
    features: [
      { title: "Verkauf unterstützen", text: "Nutzen Sie Kontaktberichte, Produkt- und Etatzuordnungen sowie Forecasts und Auswertungen für Innen- und Außendienst." },
      { title: "Buchungen abwickeln", text: "Verwalten Sie Anzeigenaufträge, Rabatte und Disposition. Verfolgen Sie Druckunterlagen und organisieren Sie die Heftplanung." },
      { title: "Vergütung und Nachweise", text: "Bilden Sie Vertreterprovisionen und Agenturvergütungen ab. Belegexemplare und Auswertungen unterstützen die kaufmännische Betreuung." },
    ],
    steps: [
      { title: "Verkaufen", text: "Kundenkontakte, Angebote und Abschlüsse bearbeiten." },
      { title: "Disponieren", text: "Buchungen, Unterlagen und Heftplanung koordinieren." },
      { title: "Abwickeln", text: "Vergütung, Belegexemplare und Auswertungen bearbeiten." },
    ],
    contextTitle: "Verkauf und Produktion im Zusammenhang.",
    context: "Die Anzeigenabwicklung verbindet kaufmännische Aufträge mit Disposition und Heftplanung. Bei Bedarf ist die Integration eines Online-Buchungssystems möglich.",
    related: ["kontaktmanagement", "wechselversand", "honorare-und-provisionen"], photo: { src: "/photos/printing-press-v6.webp", alt: "Eine laufende Druckmaschine für gedruckte Verlagserzeugnisse" },
    sources: ["https://covernet.de/anzeigen"],
  },
  {
    slug: "veranstaltungen", title: "Veranstaltungen", category: "Vertrieb & Verlagsformate",
    headline: "Vom ersten Termin bis zur letzten Abrechnung.",
    intro: "Planen, organisieren und verwalten Sie Seminare, Kongresse und weitere Veranstaltungen. COVER unterstützt Teilnehmerbetreuung und kaufmännische Abläufe im selben Kontext.",
    sectionIntro: "Die organisatorische und kaufmännische Arbeit hinter Ihrem Veranstaltungsangebot.",
    features: [
      { title: "Planung und Organisation", text: "Verwalten Sie Themen, Termine, Veranstaltungsorte, Aufgaben und Zuständigkeiten sowie Konditionen und benötigte Ausstattung." },
      { title: "Menschen betreuen", text: "Organisieren Sie Referenten, Sponsoren und Teilnehmer. Buchungsüberwachung und Teilnehmerunterlagen unterstützen die Durchführung." },
      { title: "Ansprache und Abrechnung", text: "Gewinnen Sie Teilnehmer durch gezielte Ansprache. Verwalten Sie Teilnahmebuchungen, Abrechnung und Auswertungen." },
    ],
    steps: [
      { title: "Planen", text: "Thema, Termin und Organisation festlegen." },
      { title: "Betreuen", text: "Referenten, Sponsoren und Teilnehmer begleiten." },
      { title: "Abrechnen", text: "Buchungen abschließen und Ergebnisse auswerten." },
    ],
    contextTitle: "Veranstaltungen gehören zur Kundenbeziehung.",
    context: "Bestehende Buchkäufer oder Abonnenten können passende Veranstaltungsangebote erhalten. Umgekehrt lassen sich Teilnehmer auf relevante Bücher oder Zeitschriften aufmerksam machen.",
    related: ["kontaktmanagement", "buch", "abonnement"], photo: softwarePhoto,
    sources: ["https://covernet.de/veranstaltungen"],
  },
  {
    slug: "debitorenmanagement", title: "Debitorenmanagement", category: "Finanzen & Vergütung",
    headline: "Forderungen, Zahlungen und Kundenkonten überblicken.",
    intro: "Verwalten Sie Debitorenbuchungen und zahlungsbezogene Abläufe. Das vollständig integrierte Modul von gypsilon verbindet die Debitorenbuchhaltung mit COVER.",
    sectionIntro: "Damit aus Rechnungen nachvollziehbare Konten und Zahlungsvorgänge werden.",
    features: [
      { title: "Konten und Belege", text: "Übernehmen Sie Belege aus Branchensystemen und verwalten Sie Debitorenbuchungen auf eigenen Konten. Ansichten und Auswertungen lassen sich definieren." },
      { title: "Zahlungen bearbeiten", text: "Erfassen Sie Bankbuchungen manuell oder elektronisch. Regeln unterstützen die Zahlungszuordnung; SEPA-Mandate und Fälligkeiten werden verwaltet." },
      { title: "Offene Forderungen verfolgen", text: "Nutzen Sie das integrierte Mahnwesen für offene Forderungen. Debitoren und Kreditoren können miteinander verknüpft werden." },
    ],
    steps: [
      { title: "Übernehmen", text: "Rechnungsbelege den Debitorenkonten zuordnen." },
      { title: "Buchen", text: "Zahlungseingänge und Bankbuchungen bearbeiten." },
      { title: "Nachhalten", text: "Offene Forderungen und Mahnungen überblicken." },
    ],
    contextTitle: "Der Verkauf geht in die Buchhaltung über.",
    context: "Debitorenmanagement führt die Belege aus dem Verlagsgeschäft in die Kundenkonten. Die integrierte gypsilon-Lösung unterstützt die weitere zahlungsbezogene Bearbeitung.",
    related: ["finanzbuchhaltung", "abonnement", "buch"], photo: financePhoto,
    sources: ["https://covernet.de/debitorenmanagement"],
  },
  {
    slug: "finanzbuchhaltung", title: "Finanzbuchhaltung", category: "Finanzen & Vergütung",
    headline: "Kaufmännische Vorgänge in der Buchhaltung zusammenführen.",
    intro: "Die gypsilon-Finanzbuchhaltung ist vollständig in COVER integriert. Sie erfasst Geschäftsfälle im Rechnungswesen und unterstützt deren Auswertung nach unterschiedlichen Kriterien.",
    sectionIntro: "Rechnungswesen als Teil des verbundenen Verlagsgeschäfts.",
    features: [
      { title: "Haupt- und Nebenbücher", text: "Erfassen Sie die Geschäftsfälle Ihres Rechnungswesens in der integrierten Finanzbuchhaltung." },
      { title: "Belege und Zahlungen", text: "Belegerkennung, Workflows und Zahlungswesen unterstützen die laufende buchhalterische Arbeit." },
      { title: "Auswertungen", text: "Betrachten Sie Ihre Buchhaltungsdaten nach unterschiedlichen Kriterien. Eingaben und Aktualisierungen stehen im integrierten System zur Verfügung." },
    ],
    steps: [
      { title: "Erfassen", text: "Geschäftsfälle und Belege aufnehmen." },
      { title: "Bearbeiten", text: "Buchungen und Zahlungsvorgänge verwalten." },
      { title: "Auswerten", text: "Buchhaltungsdaten nach relevanten Kriterien betrachten." },
    ],
    contextTitle: "Finanzbuchhaltung von gypsilon. In COVER integriert.",
    context: "Die Anbindung verbindet Rechnungswesen und Verlagsgeschäft. Aktualisierte Daten stehen im System bereit, ohne dass sie mehrfach erfasst werden müssen.",
    related: ["debitorenmanagement", "kostenrechnung", "honorare-und-provisionen"], photo: financePhoto,
    sources: ["https://covernet.de/finanzbuchhaltung"],
  },
  {
    slug: "honorare-und-provisionen", title: "Honorare & Provisionen", category: "Finanzen & Vergütung",
    headline: "Vergütung passend zur Verlagsarbeit verwalten.",
    intro: "Honorare für Beiträge und Titel, Provisionen für den Vertrieb: COVER bildet die Vergütung in den jeweiligen redaktionellen und kaufmännischen Abläufen ab.",
    sectionIntro: "Unterschiedliche Vergütungsarten gehören zu unterschiedlichen Aufgaben.",
    features: [
      { title: "Beitragshonorare", text: "Die Redaktionsverwaltung unterstützt Honorararten, etwa nach Seiten oder Zeilen. Sie lassen sich den Beteiligten eines Beitrags zuordnen." },
      { title: "Titelbezogene Honorare", text: "Honorarverträge können einem Titel zugeordnet werden. In Produktmanagement und Buch ist die Honorarabrechnung optional verfügbar." },
      { title: "Vertriebsprovisionen", text: "Die Anzeigenabwicklung unterstützt Vertreterprovisionen und Agenturvergütungen. Auch die Abonnementverwaltung bietet Provisionsabrechnung." },
    ],
    steps: [
      { title: "Zuordnen", text: "Beteiligte und passende Vergütungsarten festlegen." },
      { title: "Verwalten", text: "Honorare und Provisionen im jeweiligen Vorgang führen." },
      { title: "Abrechnen", text: "Die Vergütung im vorgesehenen Modul bearbeiten." },
    ],
    contextTitle: "Vergütung bleibt mit der Leistung verbunden.",
    context: "Ob redaktioneller Beitrag, Buchtitel oder Anzeigenauftrag: Die Vergütung wird im passenden fachlichen Zusammenhang verwaltet. COVER verbindet diese Aufgaben mit der Verlagsabwicklung.",
    related: ["redaktionsverwaltung", "produktmanagement", "anzeigen"], photo: financePhoto,
    sources: ["https://covernet.de/redaktionsverwaltung", "https://covernet.de/produktmanagement", "https://covernet.de/buch", "https://covernet.de/anzeigen", "https://covernet.de/abonnement"],
  },
  {
    slug: "kostenrechnung", title: "Kostenrechnung", category: "Finanzen & Vergütung",
    headline: "Die Kosten hinter Ihrem Verlag verstehen.",
    intro: "COVER ERP umfasst neben Auftragsabwicklung und Finanzbuchhaltung auch die Kostenrechnung. Für einen klareren Blick auf die Kosten Ihres Verlagsgeschäfts.",
    sectionIntro: "Kosten betrachten, kaufmännische Zusammenhänge verstehen und Entscheidungen vorbereiten.",
    // FACT: costs analysis preserves the approved overview copy. COVER's public
    // overview confirms the module but specifies no allocation or forecast tools.
    // The remaining items describe the surrounding ERP/reporting context only.
    features: [
      { title: "Kosten im Blick", text: "Betrachten Sie die Kosten hinter Ihrem Verlagsgeschäft als Teil der kaufmännischen Arbeit." },
      { title: "Im ERP-Kontext", text: "Kostenrechnung gehört zum COVER ERP-Angebot, neben den Modulen für Aufträge, Forderungen und Finanzbuchhaltung." },
      { title: "Analyse und Reporting", text: "Für Planung und Analyse bietet COVER filterbasierte Statistiken und Reports sowie eine integrierte Business-Intelligence-Lösung." },
    ],
    steps: [
      { title: "Abbilden", text: "Das Verlagsgeschäft kaufmännisch betrachten." },
      { title: "Verstehen", text: "Die Kosten hinter der Arbeit analysieren." },
      { title: "Planen", text: "Auswertungen zur Vorbereitung von Entscheidungen nutzen." },
    ],
    contextTitle: "Von den Zahlen zum kaufmännischen Überblick.",
    context: "Kostenrechnung ergänzt den Blick auf Ihr Verlagsgeschäft. Welche Auswertungen Sie benötigen und wie sie in Ihre Abläufe passen, besprechen Sie mit COVER.",
    related: ["finanzbuchhaltung", "debitorenmanagement", "produktmanagement"], photo: financePhoto,
    sources: ["https://covernet.de/crm-erp-e-commerce"],
  },
  {
    slug: "rechte-und-lizenzen", title: "Rechte & Lizenzen", category: "Rechte & Redaktion",
    headline: "Lizenzgeschäfte vom Vertrag bis zur Abrechnung begleiten.",
    intro: "Verwalten Sie den Einkauf und Verkauf von Rechten und Lizenzen. COVER verbindet Verträge, Geschäftspartner, Termine und Abrechnungsdaten.",
    sectionIntro: "Vertragsverwaltung und kaufmännische Abläufe für Ihr Lizenzgeschäft.",
    features: [
      { title: "Partner und Verträge", text: "Erfassen Sie Lizenzpartner und Verträge. Halten Sie Kommunikation, Aufgaben und Termine im Blick, etwa bei auslaufenden Verträgen." },
      { title: "Lizenzeinkauf", text: "Verwalten Sie Einkaufsverträge. Lizenzbeurteilung und Lizenzkalkulation unterstützen die Vorbereitung von Entscheidungen." },
      { title: "Lizenzverkauf", text: "Erfassen Sie Verkaufsverträge und Abrechnungsdaten. Daraus können Abrechnungsaufträge für die Bearbeitung im Modul Buch entstehen." },
    ],
    steps: [
      { title: "Vereinbaren", text: "Partner und Lizenzverträge anlegen." },
      { title: "Überwachen", text: "Aufgaben, Termine und Vertragsdaten bearbeiten." },
      { title: "Abrechnen", text: "Abrechnungsdaten in kaufmännische Vorgänge überführen." },
    ],
    contextTitle: "Rechte sind auch kaufmännische Beziehungen.",
    context: "COVER verbindet Lizenzverwaltung mit Kommunikation und Abrechnung. Im Lizenzverkauf erfolgt die abschließende Abrechnung über die Abläufe des Moduls Buch.",
    related: ["buch", "produktmanagement", "kontaktmanagement"], photo: publishingPhoto,
    sources: ["https://covernet.de/rechte-und-lizenzen"],
  },
  {
    slug: "redaktionsverwaltung", title: "Redaktionsverwaltung", category: "Rechte & Redaktion",
    headline: "Beiträge, Beteiligte und Honorare organisieren.",
    intro: "Behalten Sie die administrative Arbeit rund um redaktionelle Beiträge im Blick. COVER verbindet Bearbeitungsstatus, Beteiligte, Zuordnungen und Honorarabwicklung.",
    sectionIntro: "Die Organisation hinter den Inhalten, die Sie veröffentlichen.",
    features: [
      { title: "Beiträge überblicken", text: "Sehen Sie den aktuellen Bearbeitungsstatus. Ordnen Sie Beiträge Fachrubriken, Produkten und Stichworten zu." },
      { title: "Beteiligte verwalten", text: "Verwalten und qualifizieren Sie Autoren, Übersetzer, Fotografen und weitere Dienstleister für eine gezielte Ansprache." },
      { title: "Honorare und Beitragsdaten", text: "Hinterlegen Sie Honorararten bei den Beteiligten, etwa nach Seiten oder Zeilen. Beitragsdaten können für Übersichten exportiert werden." },
    ],
    steps: [
      { title: "Zuordnen", text: "Beitrag, Rubrik und Beteiligte erfassen." },
      { title: "Bearbeiten", text: "Status und anstehende Aufgaben überblicken." },
      { title: "Abschließen", text: "Honorare abrechnen und Beitragsdaten exportieren." },
    ],
    contextTitle: "Redaktionelle Arbeit mit klarem Überblick.",
    context: "Die Redaktionsverwaltung führt Beiträge und Beteiligte im fachlichen Zusammenhang. Statusinformationen zeigen offene Arbeit; Honorararten unterstützen die anschließende Abrechnung.",
    related: ["honorare-und-provisionen", "produktmanagement", "kontaktmanagement"], photo: publishingPhoto,
    sources: ["https://covernet.de/redaktionsverwaltung"],
  },
];

export function findErpModule(slug: string): ErpModule | undefined {
  return erpModules.find(module => module.slug === slug);
}

export function erpModuleHref(slug: string): string {
  return `/plattform/${slug}`;
}
