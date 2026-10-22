/* ==========================================================================
   PROJECTS CONTENT — the "5 to 9" side (/after-hours/)
   ---------------------------------------------------------------------------
   Each project = one object. Order here = order on the page.
   Images/videos live in /assets/projects/<id>/  (paths below are relative to it)

   Fields
     id        url-safe name, also the media folder name; page = /after-hours/project/?p=<id>
     title     project name           kind   "Concept" | "Live" | "Open brief"
     cat       "Interface" | "Web app" | "Brand"   (used by the filter)
     year      shown in meta          tone   "light" | "dark"  (text colour on the tile)
     bg        tile + hero background colour     accent   small highlights
     cover     tile image             tile   optional short muted video for tile hover
     size      "wide" | "tall" | "" (tile shape on the grid)
     summary   one line on the tile   intro  the opening paragraph on the project page
     facts     [label, value] pairs shown under the title
     links     [{ label, url }] buttons on the project page
     note      small print at the bottom (e.g. brand ownership)
     blocks    the story, in order. Types:
       { t:"text",  h:"Heading", p:["para", "para"] }
       { t:"list",  h:"Heading", p:"optional intro", items:["…","…"] }
       { t:"img",   src, alt, cap, frame:"browser"|"none", fit:"wide"|"full"|"" }
       { t:"video", src, poster, cap, frame:"browser"|"none" }
       { t:"grid",  cols:2|3, items:[{ src, alt, cap }], frame:"browser"|"none" }
       { t:"phones", items:[{ src, cap }] }   // phone screens in a row that can be dragged sideways
       { t:"compare", h, p, left:"Today", right:"This design", rows:[["before","after"], …] }  // side-by-side comparison
   ========================================================================== */
window.PROJECTS = [
  {
    id: "kosh",
    title: "Kosh",
    sub: "Trading platform, web and mobile",
    kind: "Concept", cat: "Interface", year: "2026",
    bg: "#E7E2D8", tone: "light", accent: "#3846C4",
    cover: "cover.webp", size: "wide",
    summary: "A calmer trading platform for Indian retail investors.",
    intro: "Kosh is a concept trading platform for beginner-to-intermediate investors who find today's broker apps noisy. It covers equity, F&O with an option chain, mutual funds and SIPs, IPOs, ETFs, GTT orders and a news section that informs without pushing trades.",
    facts: [["Type", "Product design concept"], ["Platforms", "Web · Mobile"], ["Screens", "7 web · 13 mobile"], ["Year", "2026"]],
    blocks: [
      { t: "text", h: "The problem",
        p: ["Indian broker apps are built for frequent trading, but most people opening them are new investors. SEBI's own study found that 93% of individual F&O traders lost money between FY22 and FY24, with combined losses of over ₹1.8 lakh crore. Yet most apps put derivatives, offers and buy buttons a tap away from everything.",
            "Before drawing anything, I read public reviews and forum threads about eleven Indian broker apps and kept only the complaints an interface could actually fix."] },
      { t: "compare", h: "Common complaints, and what Kosh does", left: "What users complain about", right: "In Kosh",
        rows: [
          ["Option chains are dense and the order ticket leads with the premium, not the risk.", "The option-chain ticket shows the maximum possible loss first."],
          ["F&O is switched on in a couple of taps, and the risk is buried in small print.", "F&O stays off until you choose it, with SEBI's loss figures shown before you switch it on."],
          ["GTT orders sit in a separate place, with an unclear status.", "Orders and GTT share one screen, and every trigger shows a clear status."],
          ["Related tasks are split across separate apps for stocks, funds and IPOs.", "SIPs, mutual funds and IPOs live inside the same app."],
          ["News is mixed with buy buttons and promotions, nudging people to trade.", "Briefing is a reading room for news, with no trade buttons."],
          ["Placing an order means filling a form field by field.", "Type \"buy 10 tcs at 4100\" in ⌘K and the ticket explains what will happen before anything is placed."]
        ] },
      { t: "img", src: "web-chain.webp", alt: "Kosh option chain with order ticket showing maximum loss", cap: "Option chain. The ticket leads with the maximum loss, not the premium.", frame: "browser", fit: "wide" },
      { t: "text", h: "Borrowed from good desktop software", p: ["The visual direction comes from well-made Mac apps rather than other trading apps: quiet surfaces, a clear hierarchy, and dense data that stays readable.", "A ⌘K bar handles search and orders in plain words. Typing \"buy 10 tcs at 4100\" fills the ticket and explains what will happen before anything is placed."] },
      { t: "grid", cols: 2, frame: "browser", items: [
        { src: "web-cmdk.webp", alt: "Command bar with a typed order", cap: "⌘K: search, or type an order in plain words" },
        { src: "web-orders.webp", alt: "Orders and GTT screen", cap: "Orders & GTT with a clear status for every trigger" },
        { src: "web-invest.webp", alt: "Invest screen with SIPs and IPOs", cap: "SIPs, funds and IPOs in one place" },
        { src: "web-briefing.webp", alt: "Briefing news screen", cap: "Briefing: a reading room for news, with no trade buttons" }
      ] },
      { t: "text", h: "F&O stays off until you choose it", p: ["Futures & Options sit behind a deliberate activation step with SEBI's own loss figures shown first. Once switched on, every derivatives ticket shows the worst case before the upside."] },
      { t: "img", src: "web-fno.webp", alt: "F&O activation screen", cap: "Activation, with the risk numbers up front", frame: "browser", fit: "wide" },
      { t: "phones", h: "On the phone", items: [
        { src: "m-today.webp", cap: "Today" }, { src: "m-markets.webp", cap: "Markets" }, { src: "m-stock.webp", cap: "Stock" },
        { src: "m-order.webp", cap: "Order sheet" }, { src: "m-review.webp", cap: "Review & swipe" }, { src: "m-portfolio.webp", cap: "Portfolio" },
        { src: "m-orders.webp", cap: "Orders & GTT" }, { src: "m-search.webp", cap: "Typed order" }, { src: "m-invest.webp", cap: "Invest" },
        { src: "m-briefing.webp", cap: "Briefing" }, { src: "m-chain.webp", cap: "Option chain" }, { src: "m-risk.webp", cap: "Risk disclosure" }, { src: "m-dark.webp", cap: "Dark mode" }
      ] },
      { t: "img", src: "web-dark.webp", alt: "Kosh markets screen in dark mode", cap: "Markets, in dark mode", frame: "browser", fit: "wide" }
    ]
  },

  {
    id: "plotform",
    title: "Plotform",
    sub: "Website for a house-planning brand",
    kind: "Live", cat: "Web app", year: "2026",
    bg: "#F3F0E9", tone: "light", accent: "#8A6A3B",
    cover: "cover.webp", tile: "tile.mp4", size: "",
    summary: "One scroll turns a hand sketch into a finished home.",
    intro: "Plotform designs layout plans, 3D elevations and furnished interiors for Indian homes. Its website tells that story in a single scroll: a hand sketch becomes a measured plan, then a 3D plan, then furnished rooms, a tilted perspective and finally the lit elevation.",
    facts: [["Type", "Website"], ["Status", "Live"], ["Pages", "Home, designs, guides, brief form"], ["Year", "2026"]],
    links: [{ label: "Visit plotform.design", url: "https://plotform.design" }],
    blocks: [
      { t: "video", src: "scroll.mp4", poster: "scroll.webp", cap: "The home page, scrolled from top to bottom. The house is drawn live in the browser.", frame: "browser" },
      { t: "list", h: "Six stages, one scroll", p: "Each stage answers one question a homeowner has, in the order they usually ask it:", items: ["Sketch: does it fit how we live?", "Floor plan: are the rooms the right size?", "3D plan: how does it feel at full height?", "Interiors: where does the furniture go?", "Perspective: how does it sit on the plot?", "Elevation: what will the street see?"] },
      { t: "img", src: "designs.webp", alt: "Plotform designs page", cap: "Designs page: five concept homes from five regions", frame: "browser", fit: "wide" },
      { t: "text", h: "Built to be found", p: ["Alongside the main pages there are plain-language guides for the searches people actually make, such as 30×40 plans, east-facing plans and Vastu layouts. A short brief form sends requirements straight to the team's inbox."] }
    ]
  },

  {
    id: "loanlens",
    title: "LoanLens",
    sub: "Loan calculator for India",
    kind: "Live", cat: "Web app", year: "2026",
    bg: "#4B3FD1", tone: "dark", accent: "#FF7A45",
    cover: "cover.webp", tile: "tile.mp4", size: "",
    summary: "Shows what a loan really costs, not just the EMI.",
    intro: "Most EMI calculators stop at the monthly payment. LoanLens adds processing fees, GST on those fees and bundled insurance to show an all-in annual rate, then helps people compare offers, plan prepayments and test a refinance. There is no sign-in and no lender advertising, and every number stays in the browser.",
    facts: [["Type", "Web app"], ["Status", "Live"], ["Built with", "React · TypeScript"], ["Year", "2026"]],
    links: [{ label: "Open LoanLens", url: "https://harshadvaha.github.io/LoanLens/" }, { label: "Source on GitHub", url: "https://github.com/harshadvaha/LoanLens" }],
    blocks: [
      { t: "video", src: "demo.mp4", poster: "demo.webp", cap: "Every input has a slider. The cost breakdown and the advice update as you drag.", frame: "browser" },
      { t: "text", h: "One comparable number", p: ["Two loans with the same headline rate can cost very different amounts once fees and insurance are added. Since October 2024 the RBI has required lenders to share a Key Facts Statement with an all-inclusive annual rate, but most online calculators still stop at the EMI.", "LoanLens folds fees, GST and insurance into one all-in rate, so offers can be ranked by what they really cost."] },
      { t: "grid", cols: 2, frame: "browser", items: [
        { src: "compare.webp", alt: "Compare offers screen", cap: "Compare offers, ranked by total cost" },
        { src: "prepay.webp", alt: "Prepayment screen", cap: "Prepay: lower EMI or shorter tenure?" },
        { src: "refinance.webp", alt: "Refinance screen", cap: "Refinance: when does switching pay off?" },
        { src: "new-dark.webp", alt: "New loan screen in dark mode", cap: "Dark theme" }
      ] },
      { t: "list", h: "What's inside", items: ["True cost of a new loan, with a full amortisation schedule", "Saved loans with a health check against the best rate you were quoted", "Offer comparison ranked by total cost", "Prepayment and refinance break-even", "Rate-rise and affordability stress tests", "A learning section on how rates and RBI rules work"] },
      { t: "phones", h: "On the phone", items: [{ src: "m-home.webp", cap: "Home" }, { src: "m-new.webp", cap: "New loan" }] },
      { t: "text", h: "Checked, not guessed", p: ["Calculations were checked against an independent reference on hundreds of randomly generated loans, plus scripted tests for typing, sliders, saving and exporting."] }
    ]
  },

  {
    id: "upi",
    title: "UPI Home",
    sub: "Payments app redesign",
    kind: "Concept", cat: "Interface", year: "2026",
    bg: "#0F5A44", tone: "dark", accent: "#9FE3C2",
    cover: "cover.webp", size: "tall",
    summary: "Putting the four things people do every day back on top.",
    intro: "Home screens of popular UPI apps bury the few things people do daily (scan and pay, pay a contact, check balance, pay bills) under offers and cross-sell tiles. This concept strips the home back to those actions and walks through every key flow, across 17 screens.",
    facts: [["Type", "UX concept"], ["Platform", "Mobile"], ["Screens", "17"], ["Year", "2026"]],
    blocks: [
      { t: "phones", h: "The core flows", items: [
        { src: "s01.webp", cap: "Home" }, { src: "s02.webp", cap: "Scan & pay" }, { src: "s03.webp", cap: "Pay" }, { src: "s04.webp", cap: "Check balance" }, { src: "s09.webp", cap: "Bills & recharge" }
      ] },
      { t: "text", h: "The problem",
        p: ["UPI handled 23.2 billion payments in May 2026, and two apps carry about four in five of them (NPCI data, via Inc42). For most people these apps are now as routine as a wallet, yet their home screens have grown into marketplaces for loans, insurance, rewards and shopping.",
            "India's consumer regulator (CCPA) has listed disguised ads and interface interference among the dark patterns apps should avoid. This concept asks what a payments home looks like when it is built around the few things people open it for."] },
      { t: "compare", h: "What's different from today's apps",
        p: "Compared with the home screens of the most-used UPI apps in India:",
        left: "Typical UPI app today", right: "This concept",
        rows: [
          ["The home screen opens on offers, rewards and loan or insurance banners. The four daily actions compete with a dozen other tiles.", "Scan, pay a contact, pay a UPI ID and transfer to your own account sit together at the top. Everything else is one level down."],
          ["Checking balance is a separate trip: leave what you were doing, open another screen, enter the PIN.", "Balance is one tap from home and also shown inside the payment flow, so you know before you pay."],
          ["Scratch cards and ads appear on balance and payment-success screens, right when you want to confirm the money moved.", "No ads on balance or confirmation screens. One clearly labelled sponsored slot on home, and nowhere else."],
          ["Scanner controls sit near the top of the screen, out of thumb reach, and a QR code on a far wall is hard to read.", "Torch and zoom (1×, 2×, 4×) sit just under the scan frame, within reach of one thumb."],
          ["Bills are filed by category, so you hunt for the one that is due.", "Bills and recharges are sorted by due date, so what is due soon is on top."]
        ] },
      { t: "phones", h: "Every other screen", items: [
        { src: "s05.webp", cap: "To own account" }, { src: "s06.webp", cap: "UPI ID or number" }, { src: "s07.webp", cap: "Pay a contact" }, { src: "s08.webp", cap: "My QR" },
        { src: "s10.webp", cap: "Electricity bill" }, { src: "s11.webp", cap: "Mobile recharge" }, { src: "s12.webp", cap: "Find your biller" }, { src: "s13.webp", cap: "History" },
        { src: "s14.webp", cap: "Money" }, { src: "s15.webp", cap: "Profile" }, { src: "s16.webp", cap: "Search" }, { src: "s17.webp", cap: "Alerts" }
      ] }
    ],
    note: "An independent concept, not affiliated with any payments company. It uses an original palette and no brand assets."
  },

  {
    id: "lavan",
    title: "Lavan",
    sub: "Skincare brand identity",
    kind: "Concept", cat: "Brand", year: "2026",
    bg: "#141A2B", tone: "dark", accent: "#D9786E",
    cover: "cover.webp", size: "",
    summary: "An identity drawn from a white salt desert at night.",
    intro: "Lavan means salt in Sanskrit. The brand comes from a white salt desert, where the ground cracks into hexagons each dry season and flamingos arrive at dawn. Every decision in the identity, from the mark to the palette to the product names, comes from that one landscape.",
    facts: [["Type", "Brand identity"], ["Includes", "Logo, palette, type, packaging, social"], ["Brand", "Fictional"], ["Year", "2026"]],
    blocks: [
      { t: "text", h: "The brief I set", p: ["Can a skincare brand feel rooted in a real Indian place, instead of the generic spa-and-botanicals look the category often borrows?", "The place is the Rann of Kutch in Gujarat. After the monsoon its water dries into a salt desert, and its mudflats hold Flamingo City, the only site in India where greater flamingos breed regularly (Gujarat Tourism). A salt hexagon split by one crack became the mark, flamingo pink became the only bright colour, and the four products are named after stages of the salt cycle."] },
      { t: "img", src: "s01.webp", alt: "Lavan brand story", fit: "full" },
      { t: "img", src: "s02.webp", alt: "Lavan monogram and logo system", fit: "full" },
      { t: "img", src: "s03.webp", alt: "Lavan colour palette", fit: "full" },
      { t: "img", src: "s04.webp", alt: "Lavan typography", fit: "full" },
      { t: "img", src: "s05.webp", alt: "Lavan product range", fit: "full" },
      { t: "img", src: "s06.webp", alt: "Lavan business card and social posts", fit: "full" },
      { t: "img", src: "s07.webp", alt: "Lavan voice guidelines", fit: "full" }
    ]
  },

  {
    id: "mct",
    title: "MCT Angler Shirt",
    sub: "Apparel artwork for a lifting-equipment brand",
    kind: "Open brief", cat: "Brand", year: "2026",
    bg: "#1C1D21", tone: "dark", accent: "#ED1C26",
    cover: "cover.webp", size: "wide",
    summary: "Wrong attachment. Right catch.",
    intro: "A response to an open brief from MCT Equipment for a long-sleeve performance fishing shirt for their crew. Their tyre-handler machine grips a marlin instead of a tyre, under the line \"Wrong attachment. Right catch.\" The artwork follows MCT's own guidelines for colour, type and logo use.",
    facts: [["Type", "Apparel & illustration"], ["Includes", "Front, back & sleeves, print template, 3D mock-up"], ["Files", "Print-ready vector"], ["Year", "2026"]],
    blocks: [
      { t: "img", src: "board.webp", alt: "MCT fishing shirt presentation board", fit: "wide" },
      { t: "text", h: "A joke the crew gets", p: ["Most ideas for a fishing shirt put a fish on a boat. This one keeps the company's own machine at the centre, so it only makes sense to people who work with it. A seagull on the dropped tyre finishes the scene."] },
      { t: "img", src: "illustration.webp", alt: "Hero illustration of the tyre-handler holding a marlin", fit: "", bg: "#26282E", pad: true },
      { t: "grid", cols: 2, items: [
        { src: "mockup.webp", alt: "3D shirt mock-up", cap: "3D mock-up" },
        { src: "template.webp", alt: "Printer template", cap: "Printer template with front, back and sleeves" }
      ] }
    ],
    note: "MCT Equipment's name and logo belong to their owner. Shown here as a response to an open design brief."
  },

  {
    id: "singalong",
    title: "Sing Along",
    sub: "Lyrics prompter web app",
    kind: "Live", cat: "Web app", year: "2026",
    bg: "#E9874E", tone: "dark", accent: "#FFE6C7",
    cover: "cover.webp", tile: "tile.mp4", size: "tall",
    summary: "Karaoke-style lyrics that keep time with any music you play.",
    intro: "Sing Along is a lyrics prompter. It does not play music: people play a song on Spotify, YouTube or any speaker, and Sing Along shows the words line by line, in time. Small details make it useful for practice, like a \"Music\" cue during long intros and a button to replay the previous line.",
    facts: [["Type", "Web app"], ["Status", "Live"], ["Works on", "Phone & laptop browsers"], ["Year", "2026"]],
    links: [{ label: "Open Sing Along", url: "https://harshadvaha.github.io/Sing-Along/" }, { label: "Source on GitHub", url: "https://github.com/harshadvaha/Sing-Along" }],
    blocks: [
      { t: "video", src: "demo.mp4", poster: "demo.webp", cap: "The built-in demo tape, at real speed. The current line glows; the next one waits below.", frame: "browser" },
      { t: "text", h: "Why it doesn't play music", p: ["Music apps already do that well. Sing Along only does the part they don't: big, readable lines in sync, a clear cue for when the vocals start, and quick rewind for the line you missed."] },
      { t: "grid", cols: 2, frame: "browser", items: [
        { src: "idle.webp", alt: "Sing Along start screen", cap: "Search for a song, or try the demo" },
        { src: "night.webp", alt: "Sing Along night mode", cap: "Night mode" }
      ] },
      { t: "phones", h: "On the phone", items: [{ src: "m-idle.webp", cap: "Start" }, { src: "m-lyrics.webp", cap: "Singing" }] }
    ]
  },

  {
    id: "saelin",
    title: "Saelin",
    sub: "Skincare brand identity",
    kind: "Concept", cat: "Brand", year: "2026",
    bg: "#2F4A44", tone: "dark", accent: "#B08A3E",
    cover: "cover.webp", size: "",
    summary: "Daily ritual, quietly done well.",
    intro: "A complete identity for a fictional clean-beauty brand for 20 to 35 year olds. The mark comes from the moment a drop of serum lands on skin, so it stays away from the usual leaf icons. The system covers a wordmark and monogram, an earthy palette with one ochre accent, three typefaces, packaging, stationery and social templates.",
    facts: [["Type", "Brand identity"], ["Includes", "Logo, palette, type, packaging, social"], ["Brand", "Fictional"], ["Year", "2026"]],
    blocks: [
      { t: "text", h: "The brief I set", p: ["\"Clean\" and \"natural\" are some of the most overused words in beauty, and brand founders themselves call them out as greenwashing when nothing backs them up (Beauty Independent).", "So Saelin avoids leaf icons and green-wash cues. The identity comes from one observable moment, a drop of serum landing on skin, and keeps the claims to what the product does in a short daily routine for 20 to 35 year olds."] },
      { t: "img", src: "s01.webp", alt: "Saelin logo system", fit: "full" },
      { t: "img", src: "s02.webp", alt: "Saelin colour palette", fit: "full" },
      { t: "img", src: "s03.webp", alt: "Saelin typography", fit: "full" },
      { t: "img", src: "s04.webp", alt: "Saelin packaging", fit: "full" },
      { t: "img", src: "s05.webp", alt: "Saelin business card", fit: "full" },
      { t: "img", src: "s06.webp", alt: "Saelin social templates", fit: "full" },
      { t: "img", src: "s07.webp", alt: "Saelin guideline excerpts", fit: "full" }
    ]
  },

  {
    id: "elevate",
    title: "Elevate Healthcare",
    sub: "Print collateral suite",
    kind: "Open brief", cat: "Brand", year: "2026",
    bg: "#1D2436", tone: "dark", accent: "#C9A45C",
    cover: "cover.webp", size: "wide",
    summary: "Ten print pieces, one navy-and-gold system.",
    intro: "A response to an open brief for Elevate Healthcare Solutions, a practice-management partner for clinics and medical groups. Ten pieces share one system: a trifold pamphlet, a packages sheet, a presentation folder, folder inserts, business cards, a proposal template, a tabletop presenter, a box lid, a box insert card and a thank-you card.",
    facts: [["Type", "Print design"], ["Pieces", "10"], ["Output", "Print-ready PDF"], ["Year", "2026"]],
    blocks: [
      { t: "grid", cols: 2, items: [
        { src: "p01-1.webp", alt: "Trifold pamphlet, outside", cap: "Trifold pamphlet" }, { src: "p01-2.webp", alt: "Trifold pamphlet, inside", cap: "Trifold, inside" },
        { src: "p07-1.webp", alt: "Tabletop presenter cover", cap: "Tabletop presenter" }, { src: "p07-2.webp", alt: "Tabletop presenter page", cap: "Presenter, problems page" }
      ] },
      { t: "text", h: "One calm voice across ten pieces", p: ["Navy carries the trust, a single gold rule marks what matters, and a serif headline keeps it human. Every piece ends with the same next step, so a clinic always knows what to do after reading."] },
      { t: "img", src: "p03-1.webp", alt: "Presentation folder", cap: "Presentation folder", fit: "wide" },
      { t: "grid", cols: 3, items: [
        { src: "p02-1.webp", alt: "Packages sheet", cap: "Packages sheet" }, { src: "p05-1.webp", alt: "Folder insert", cap: "Folder insert" }, { src: "p06-1.webp", alt: "Proposal template", cap: "Proposal template" },
        { src: "p05-3.webp", alt: "Revenue snapshot insert", cap: "Revenue snapshot" }, { src: "p09-1.webp", alt: "Box insert card", cap: "Box insert card" }, { src: "p10-1.webp", alt: "Thank-you card", cap: "Thank-you card" }
      ] },
      { t: "grid", cols: 2, items: [
        { src: "p07-4.webp", alt: "Presenter, how it works", cap: "Presenter, how it works" }, { src: "p07-5.webp", alt: "Presenter, packages", cap: "Presenter, packages" }
      ] }
    ],
    note: "Elevate Healthcare Solutions' name belongs to its owner. Shown here as a response to an open design brief."
  }
];

/* Design groundwork: completed LinkedIn Learning courses, shown near the end of /after-hours/ */
window.DESIGN_LEARNING = {
  intro: "The design side started with a UX course track in 2021.",
  items: [
    { title: "UX Design series, 7 courses", note: "Overview, user data, personas, ideation, scenarios & storyboards, paper prototyping, implementation planning", year: "2021" },
    { title: "UX Foundations: Prototyping", year: "2021" },
    { title: "UX Foundations: Multidevice Design", year: "2021" },
    { title: "Figma for UX Design", year: "2021" },
    { title: "Agile Requirements Foundations", year: "2021" }
  ]
};
