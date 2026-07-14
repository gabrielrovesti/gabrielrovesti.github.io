// ╔══════════════════════════════════════════════════╗
// ║  CV – Gabriel Rovesti  (Versione Italiana)       ║
// ╚══════════════════════════════════════════════════╝

#let primary    = rgb("#1a4a8a")
#let accent     = rgb("#2d7dd2")
#let sidebar-bg = rgb("#f0f3f8")
#let tag-fill   = rgb("#dce8f7")
#let tag-stroke = rgb("#a8c4e8")
#let muted      = rgb("#5a6272")
#let body-black = rgb("#1c2430")

// ── geometria ─────────────────────────────────────
#let sb-w     = 66mm
#let sb-pad-x = 10pt
#let rh-pad-l = 13pt
#let rh-pad-r = 13pt
#let mg-t     = 12pt
#let mg-b     = 12pt

#set page(
  paper: "a4",
  margin: (top: mg-t, bottom: mg-b, left: sb-w + rh-pad-l, right: rh-pad-r),
  background: place(
    top + left,
    rect(width: sb-w, height: 100%, fill: sidebar-bg)
  ),
)

#set text(font: "New Computer Modern", size: 10pt, fill: body-black)
#set par(justify: true, leading: 0.52em, spacing: 5pt)
#show heading: set text(font: "New Computer Modern", fill: primary)

// ── funzioni ──────────────────────────────────────

#let skill(s) = box(
  inset: (x: 4pt, y: 2pt),
  radius: 2pt,
  fill: tag-fill,
  stroke: 0.4pt + tag-stroke,
  text(size: 7pt, fill: primary, s)
)

#let sb-sec(title) = {
  v(8pt)
  text(fill: primary, weight: "bold", size: 8.5pt, upper(title))
  v(-2pt)
  line(length: 100%, stroke: 0.5pt + primary)
  v(3pt)
}

#let sec(title) = {
  v(7pt)
  text(fill: primary, weight: "bold", size: 9.8pt, upper(title))
  v(-2pt)
  line(length: 100%, stroke: 0.7pt + primary)
  v(3pt)
}

#set list(spacing: 0.65em, marker: text(fill: accent)[•])

#let job(role, company, period, body) = {
  v(4pt)
  grid(
    columns: (1fr, auto),
    text(weight: "bold", size: 9.5pt)[#role],
    text(size: 8pt, fill: muted, style: "italic")[#period],
  )
  text(size: 8.5pt, fill: accent)[#company]
  v(1pt)
  set text(size: 8.5pt)
  set par(leading: 0.46em, spacing: 4pt)
  body
}

#let edu(degree, school, period, body) = {
  v(4pt)
  grid(
    columns: (1fr, auto),
    text(weight: "bold", size: 9.5pt)[#degree],
    text(size: 8pt, fill: muted, style: "italic")[#period],
  )
  text(size: 8.5pt, fill: accent)[#school]
  v(1pt)
  set text(size: 8.5pt)
  set par(leading: 0.46em, spacing: 4pt)
  body
}

#let proj-sb(title, tech, desc) = {
  v(4pt)
  text(weight: "bold", size: 9pt)[#title]
  linebreak()
  text(size: 7.5pt, fill: muted, style: "italic")[#tech]
  v(1pt)
  text(size: 9pt)[#desc]
  v(2pt)
}

#let proj-compact(title, tech, desc) = block(width: 100%, above: 0pt, below: 0pt)[
  #v(4pt)
  #text(weight: "bold", size: 8.3pt)[#title]
  #text(size: 7pt, fill: muted, style: "italic")[ · #tech]
  #v(1pt)
  #text(size: 7.6pt)[#desc]
]

#let place-sidebar(body) = place(
  top + left,
  dx: sb-pad-x - sb-w - rh-pad-l,
  box(width: sb-w - 2 * sb-pad-x)[#body]
)

// ─────────────────────────────────────────────────
// PAGINA 1 — Sidebar
// ─────────────────────────────────────────────────

#place-sidebar[
  #v(4pt)
  #align(center)[
    #box(clip: true, radius: 50%, width: 62%)[
      #image("gabriel.jpg", width: 100%)
    ]
    #v(4pt)
    #text(size: 12pt, weight: "bold", fill: primary)[Gabriel Rovesti]
    #v(1pt)
    #text(size: 7.5pt, fill: muted, style: "italic")[
      IT Consultant · Backend Developer \
      Docente & Tutor Universitario
    ]
  ]

  #sb-sec("Contatti")
  #set text(size: 8pt)
  ✉ #link("mailto:rovestigabriel@gmail.com")[rovestigabriel\@gmail.com] \
  #v(1pt)
  ✆ +39 346 688 9789 \
  #v(1pt)
  ⌂ Padova, Italia \
  #v(1pt)
  _GitHub_: #link("https://github.com/gabrielrovesti")[github.com/gabrielrovesti] \
  #v(1pt)
  _LinkedIn_: #link("https://linkedin.com/in/gabriel-rovesti-601404220")[linkedin/gabriel-rovesti] \
  #v(1pt)
  _Portfolio_: #link("https://gabrielrovesti.github.io")[gabrielrovesti.github.io]

  #sb-sec("Competenze")
  #set text(size: 8pt)

  *Linguaggi* \
  #v(1pt)
  #skill("Java") #skill("Python") #skill("TypeScript") #skill("Rust") \
  #skill("C/C++") #skill("C#") #skill("F#") #skill("Kotlin") \
  #skill("Elixir") #skill("Go") #skill("Solidity") #skill("SQL")

  #v(4pt)
  *Frontend & Mobile* \
  #v(1pt)
  #skill("React") #skill("React Native") #skill("Angular") \
  #skill("Flutter") #skill("WebAssembly")

  #v(4pt)
  *Backend & Cloud* \
  #v(1pt)
  #skill("Spring Boot") #skill("FastAPI") #skill(".NET") \
  #skill("PostgreSQL") #skill("MongoDB") #skill("Redis") \
  #skill("AWS") #skill("GCP") #skill("Docker") #skill("Kubernetes")

  #v(4pt)
  *Osservabilità* \
  #v(1pt)
  #skill("Grafana") #skill("Splunk") #skill("IBM Instana") #skill("Datadog")

  #v(4pt)
  *Specializzazioni* \
  #v(1pt)
  #skill("WCAG 2.2") #skill("MCP") #skill("AI Agents") \
  #skill("Reactive Systems") #skill("ML/AI") #skill("Prog. Funzionale")

  #sb-sec("Certificazioni")
  #set text(size: 8pt)
  • Anthropic MCP (Intro · Advanced · Claude Code) \
  • Lightbend Reactive Architecture \
  • Kubernetes LFS158 — Linux Fnd. \
  • Cisco Networking · Ethical Hacking \
  • Datadog Kubernetes Fundamentals \
  • English B2 (UniPD) · Berlitz Tedesco A2

  #sb-sec("Lingue")
  #set text(size: 8pt)
  #grid(
    columns: (1fr, auto),
    row-gutter: 2pt,
    column-gutter: 4pt,
    [Italiano], [C2 — Madrelingua],
    [Inglese],  [C1 — Avanzato],
    [Francese], [B1 — Intermedio],
    [Spagnolo], [A2 — Base],
    [Tedesco],  [A2 — Base],
  )

  #sb-sec("Riconoscimenti")
  #set text(size: 8pt)
  • *Top 50 STEM* – UniPD 2024/25 \
  #v(1pt)
  • *2° posto* – Accessibilità Sito Web UniPD \
  #v(1pt)
  • Borse di studio regionali 2019–2022 \
  #v(1pt)
  • Autore Wikipedia (IT/EN) dal 2018
]

// ─────────────────────────────────────────────────
// PAGINA 1 — Contenuto principale
// ─────────────────────────────────────────────────



#sec("Esperienza Professionale")

#job("IT Consultant", "Technology Reply – Padova (cliente: Generali)", "09/2025 – Presente")[
  - Referente e AM (Application Maintenance) per le piattaforme *EmployeeUp*, *Business Partner* e *Provvigioni* del gruppo *Generali* (settore assicurativo) su microservizi *Spring Boot 3*: migrazione, refactoring distribuito, gestione flussi di integrazione con validazione funzionale, analisi evolutiva e quality coverage in compliance *DORA*
  - Migrazione da *Docker Swarm* a *Kubernetes*, interventi su DB *Oracle SQL*; pipeline CI/CD con *Jenkins* su *AWS*; gestione incident con *BMC Helix*
  - Partecipazione a progetti microservizi cloud/on-premise e omnichannel; osservabilità con *Grafana*, *Splunk* e *IBM Instana*; reperibilità su sonde Genertel/GOL di produzione
  - Supporto allo sviluppo di soluzioni *AI* per studi peritali e automazione dei processi di Application Maintenance
]

#job("Insegnante – Sistemi e Reti (ITI)", "ITI Galileo Ferraris – Padova", "09/2024 – 06/2025")[
  - Insegnamento di architetture di rete, protocolli e sicurezza a \~90 studenti (classi III–IV)
  - Sviluppo di laboratori pratici con Cisco Packet Tracer e strumenti di rete Linux
]

#job("Tutor Didattico e di Coordinamento", "Università di Padova – Dip. Matematica", "10/2023 – 09/2025")[
  - *Tutor di Coordinamento*: gestione di 15+ tutor nei corsi triennali e magistrali
  - *Tutor Didattico*: Automi e Linguaggi Formali, OOP (triennale); Computability (magistrale, in inglese)
  - Produzione di materiale didattico avanzato; supporto documentato a centinaia di studenti
]

#job("Tutor Inclusione & Consulente Accessibilità", "Università di Padova – Servizi Disabilità", "10/2023 – 09/2025")[
  - 350+ ore di supporto specializzato a studenti DSA/BES/Asperger/autismo in ambito STEM
  - Gestione prove d'esame personalizzate (ESSE3/Cineca, Uniweb); tutor lettore e amanuense
  - Sviluppo strumenti digitali conformi WCAG 2.1; seminari sull'accessibilità universitaria
]

#job("Stagista Curriculare – Sviluppatore Blockchain", "Sync Lab S.r.l. – Padova", "03/2023 – 06/2023")[
  - Implementazione POC DApp Ethereum con EthersJS/Web3JS e standard W3C (SSI/DID)
  - Studio e applicazione di tecniche Zero-Knowledge Proof per la verifica d'identità
]

#job("Insegnante Privato & Consulente IT", "Freelance – Italia", "02/2016 – Presente")[
  - 10+ anni di tutoring in informatica, matematica e lingue; esperto con studenti DSA/ADHD
  - Consulenza tecnica a startup (Finblock, Vantura): definizione stack tecnologico e piani tecnici
]


#job("Technical Lead & Data Manager", "Clesp S.r.l. – Padova", "07/2020 – 10/2021")[
  - Gestione database MySQL e sviluppo dashboard KPI per 500+ punti vendita Buffetti
  - Team leadership nel servizio clienti e automazione delle procedure operative
]

#sec("Progetti Selezionati")

#grid(
  columns: (1fr, 1fr),
  column-gutter: 10pt,
  row-gutter: 3pt,

  proj-compact(
    "AccessibleHub",
    "React Native · TS · WCAG 2.2",
    [Tesi magistrale: toolkit React Native per WCAG 2.2/MCAG/WCAG2Mobile con moduli interattivi e demo reale.]
  ),
  proj-compact(
    "ai-agent-skills",
    "MCP · Claude Code · Codex",
    [Libreria portabile di skill per agenti AI multi-provider; workflow ingegneristici disciplinati e riutilizzabili.]
  ),

  proj-compact(
    "spring-boot-migration-guide",
    "Java · Spring Boot 3/4",
    [Guida pratica alla migrazione Spring Boot 2.7→3.x→4.x, verificata su fonti ufficiali con demo funzionante ad ogni step.]
  ),
  proj-compact(
    "ctrl-verify",
    "CIF/ESCET · PyNuSMV · BDD",
    [Metodi formali simbolici per sistemi reattivi: supervisor synthesis BDD-based e model checking di proprietà safety/response.]
  ),

  proj-compact(
    "VerifiedMovies",
    "Ethereum · Solidity · ZKP",
    [Tesi triennale: DApp blockchain con Self-Sovereign Identity e Zero-Knowledge Proof (standard W3C).]
  ),
  [],
)

#sec("Formazione")

#edu("Laurea Magistrale in Informatica — 104/110", "Università degli Studi di Padova", "09/2023 – 07/2025")[
  *Major:* Internet, Mobile e Sicurezza — sicurezza mobile, crittografia avanzata, big data. *Minor:* Innovazione e Imprenditorialità ICT (startup, ITIL, NIST). *Tesi:* _Designing an accessibility learning toolkit._ 400+ ore di tutorato universitario.
]

#edu("Laurea Triennale in Informatica — 98/110", "Università degli Studi di Padova", "09/2020 – 07/2023")[
  Algoritmi, basi di dati, programmazione concorrente, ingegneria del software, sviluppo web accessibile. *Tesi:* _VerifiedMovies — sicurezza e autenticazione mediante blockchain._
]

#edu("Diploma Perito Informatico — 100/100", "I.I.S. Polo Tecnico di Adria", "09/2015 – 06/2020")[
  Programmazione C/C\+\+/Java, reti Cisco, sviluppo web (HTML/CSS/JS/PHP), Android, progettazione DB.
]
