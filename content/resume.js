/* ==========================================================================
   RESUME CONTENT — the "9 to 5" side (/work/)
   Edit text here only. Layout lives in /work/index.html + /assets/css/work.css.
   Rules kept on purpose:
   - No phone number or email anywhere on the site. LinkedIn is the only contact.
   - The file-generation result is written as "~80%" and appears only in the
     Experience section (not in the summary).
   ========================================================================== */
window.RESUME = {
  name: "Harshad Vaghasiya",
  headline: "Revenue Growth Management · Pricing & Promotion Analytics",
  location: "Gujarat, India · Remote",
  linkedin: "https://www.linkedin.com/in/harshadvaha",
  pdf: "../assets/files/Harshad-Vaghasiya-Resume.pdf",

  // Opening statement (large type). Keep it to one or two sentences.
  intro: "I help FMCG brands decide what to charge, when to promote, and what to stop doing.",

  summary:
    "Revenue Growth Management consultant with 4+ years at NielsenIQ in FMCG pricing strategy, promotion optimization, Price Pack Architecture, trade investment and mix management, within 7+ years of total experience. I advise global FMCG clients across Asia, the Middle East and Eastern Europe, turning price elasticity, sales decomposition and simulation outputs into clear pricing and promotion decisions that protect margin and grow share. I bring AI tools into everyday analysis so recurring work runs faster and with fewer errors.",

  // Big numbers row. Keep these factual.
  facts: [
    { value: "4+", label: "years in RGM at NielsenIQ" },
    { value: "7+", label: "years of total experience" },
    { value: "30+", label: "pricing & promotion projects" },
    { value: "3", label: "regions: Asia, Middle East, Eastern Europe" }
  ],

  experience: [
    {
      company: "NielsenIQ",
      role: "Consultant, Analytics RGM",
      start: "May 2025", end: "Present",
      bullets: [
        "Lead price and promotion analysis across FMCG category portfolios, using price elasticity, sales decomposition, ROI analysis and simulation scenarios to guide pricing and promotional decisions.",
        "Recommend price-change magnitudes, optimal promo depth, promo pressure and which promotional mechanics to invest in versus eliminate for global FMCG clients.",
        "Generate insights that help clients gain market share, compete with private labels, improve margins and drive profitable sales uplift.",
        "Benchmark competitive pricing and channel positioning across Modern Trade and Traditional Trade to shape market share and revenue growth strategies.",
        "Automated Python-based client file generation with AI tools, cutting processing time by ~80% and reducing manual errors."
      ]
    },
    {
      company: "NielsenIQ",
      role: "Analyst, Modelling RGM",
      start: "Mar 2022", end: "Apr 2025",
      bullets: [
        "Supported 30+ pricing and promotion projects across Asia and the Middle East, delivering store-, channel- and category-level insights through Power BI dashboards and NIQ Revenue Management Optimization tools built on statistical regression models.",
        "Built cross-client benchmark dashboards from historical pricing, promotion, channel and sales data to identify sales uplift and promotional effectiveness opportunities.",
        "Automated and optimized key recurring processes, cutting execution time by up to 40%.",
        "Reached platform proficiency 30% faster than benchmark, enabling earlier deployment on client analytics projects."
      ]
    },
    {
      company: "Thomson Reuters",
      role: "Research Analyst",
      start: "Jun 2019", end: "Mar 2022",
      bullets: [
        "Researched and interpreted complex tax laws and regulations across multiple jurisdictions, keeping regulatory content accurate for global products.",
        "Maintained regulatory content through systematic validation, documentation and data management, ensuring accuracy, consistency and compliance.",
        "Aligned methodologies with cross-functional teams to deliver high-quality, compliant outputs."
      ]
    }
  ],

  skills: [
    { group: "Pricing & RGM", items: ["Pricing Strategy", "Price Elasticity Analysis", "Promotion Optimization & Promo ROI", "Price Pack Architecture (PPA)", "Mix Management", "Trade Investment", "Margin & Profitability Analysis", "Competitive & Private Label Pricing", "Scenario Simulation", "Modern & Traditional Trade"] },
    { group: "Analytics & BI", items: ["Power BI", "Advanced Excel (Scenario Analysis)", "Statistical Regression Modelling", "Sales Decomposition", "Retail POS Data", "NIQ Revenue Management Optimization Tools"] },
    { group: "AI in the workflow", items: ["Claude, ChatGPT, Gemini", "AI-assisted Python & SQL", "AI-assisted data checks"] },
    { group: "Working with people", items: ["Client Advisory & Data Storytelling", "Stakeholder Management", "Cross-functional Collaboration", "Tool Adoption"] }
  ],

  // Completed LinkedIn Learning courses, shown under Education (kept short: only ones that add value)
  learning: [
    { title: "Getting Started as a Business Analyst", note: "Learning path", year: "2021" },
    { title: "Data Visualization: Storytelling", year: "2025" },
    { title: "Data Visualization for Data Analysts and Analytics", year: "2025" },
    { title: "Learning Microsoft Power BI Desktop", year: "2021" },
    { title: "Data Analytics for Business Professionals", year: "2021" },
    { title: "SQL Server Fundamentals: Master Basic Query Techniques", year: "2021" },
    { title: "Six Sigma Foundations", year: "2021" },
    { title: "Lean Foundations", year: "2021" },
    { title: "Communicating with Confidence", year: "2025" }
  ],

  education: {
    degree: "Bachelor of Engineering, Mechanical",
    school: "Gujarat Technological University",
    place: "Gujarat, India",
    note: "CGPA 7.9 / 10 · First Class with Distinction"
  }
};
