/* =========================================================
   HRC SITE DATA — single source of truth
   Descriptions match harborridgecap.com/transactions verbatim.
   ========================================================= */

// ---- TRANSACTIONS (tombstones) ----
const TRANSACTIONS = [
  {
    id: 'lrqa',
    img: 'assets/img/transactions/lrqa.png',
    title: 'Core Business Solutions sale to LRQA',
    sector: 'Compliance Solutions / TICC',
    role: 'Sell-side advisor',
    description: 'Sell-side advisor to leading SaaS and service provider that helps businesses achieve compliance, focused on ISO and CMMC.'
  },
  {
    id: 'promevo',
    img: 'assets/img/transactions/promevo.png',
    title: 'Cohere Capital growth investment in Promevo',
    sector: 'Google Cloud Services',
    role: 'Buy-side advisor to Cohere Capital',
    description: "Promevo is one of the largest Google cloud partners in North America. The company is focused on reselling Google Workspace and Chromebooks. Promevo experienced rapid growth, profitability and scale prior to the transaction, which positioned the company for further success with capital, and sophisticated support from Cohere Capital.\n\nCohere Capital is a leading Boston-based, growth-oriented private equity firm. Cohere has a long track record and deep experience investing in and working with growth companies, with domain expertise in tech-enabled services.\n\nHarbor Ridge Capital advised Cohere on it's investment in Promevo."
  },
  {
    id: '360insights',
    img: 'assets/img/transactions/360insights.png',
    title: 'MTC sale to 360insights',
    sector: 'Channel Software',
    role: 'Sell-side advisor',
    description: "MTC is a leading channel software-as-a-service (SaaS) provider, focused on creating effective, efficient sales incentive management solutions that save time and money while increasing engagement and ROI. MTC counted some of the largest technology companies in the world as loyal clients including Samsung and Ingram Micro.\n\n360insights, is a fast growing, well capitalized channel SaaS provider as well, which the software can manage all of one's channel incentives on one platform including SPIFFs, Rebates, CO-OP Advertising and MDF, Sell-Through Allowances, and Volume Incentives."
  },
  {
    id: 'blackmesh',
    img: 'assets/img/transactions/blackmesh.png',
    title: 'BlackMesh sale to Contegix',
    sector: 'Compliant Cloud / TICC',
    role: 'Sell-side advisor',
    description: 'Blackmesh is a leading compliance and security-focused cloud services provider, offering high-touch managed services to enterprises and government agencies. As a FedRAMP platform-as-a-service (PaaS) provider, Blackmesh offers cloud services in one of the most secure and compliant environments in the industry.\n\nContegix, is a cloud service provider focused on managing business-critical applications including Atlassian suite of apps, as well as traditional managed IT services for enterprises. Contegix is backed by Strattam Capital.'
  },
  {
    id: 'hosting',
    img: 'assets/img/transactions/hosting.png',
    title: 'Stelligent sale to Hosting.com',
    sector: 'IT / Cloud Services',
    role: 'Sell-side advisor',
    description: 'Stelligent is a cloud service provider focused on DevOps Automation and digital transformation, on the Amazon Web Services (AWS) cloud. Specifically, Stelligent is a Premier AWS Consulting Partner, with competencies in financial services and DevOps.\n\nHosting.com, backed by Pamlico Capital, is a cloud service provider, offering secure and compliant solutions across a broad portfolio of solutions including public cloud, private cloud, hybrid IT and dedicated environments.'
  },
  {
    id: 'cloud9',
    img: 'assets/img/transactions/cloud9.png',
    title: 'Cloudnine Realtime sale to AbacusNext',
    sector: 'Managed Services',
    role: 'Sell-side advisor',
    description: 'Cloudnine Realtime is a managed services cloud provider that specializes in hosting over 1,000 business applications primarily for the financial services and CPA verticals, including Intuit QuickBooks®, Sage, and Microsoft Solutions.\n\nAbacusNext, backed by Providence Equity, is a leading case management software and cloud services provider, focused on the legal space.'
  },
  {
    id: 'conix',
    img: 'assets/img/transactions/conix.png',
    title: 'CONIX sale to CV Systems',
    sector: 'Banking Software',
    role: 'Buy-side advisor to CV Systems',
    description: 'CV Systems is a leading provider of banking software, with core functionality around automated teller machines (ATM), fraud detection, cybersecurity, on-line payment and transaction processing, and financial software technology solutions.\n\nCONIX has been a cutting-edge fintech software company for many years, with state-of-the-art solutions across important strategic initiatives such as real-time integrated payments, fraud detection, cybersecurity software, and item processing solutions.'
  },
  {
    id: 'rookmedia',
    img: 'assets/img/transactions/rookmedia.png',
    title: 'DomainSponsor sale to RookMedia',
    sector: 'Advertising Technology',
    role: 'Buy-side and Capital Markets Advisor',
    description: 'RookMedia is a adtech and internet marketing business focused on domain name monetization.\n\nDomainSponsor, was a direct competitor of RookMedia, with the companies being top two largest in the space. Combined the business exceeded $100mm in revenue and $25mm of EBITDA.'
  }
];

// ---- SECTORS ----
const SECTORS = [
  { name: 'Cybersecurity & Compliance', desc: 'MDR, GRC tooling, third-party risk, identity, assessment services, and CMMC/ISO compliance.' },
  { name: 'SaaS', desc: 'Vertical and horizontal software, with a focus on bootstrapped and founder-owned businesses.' },
  { name: 'Tech-Enabled Services', desc: 'Services businesses with software-driven operating leverage and recurring revenue.' },
  { name: 'Managed Services', desc: 'MSPs, MSSPs, and cloud services providers serving regulated and SMB-to-enterprise customers.' },
  { name: 'Internet Infrastructure', desc: 'Hosting, data centers, public/private cloud, and adjacent infrastructure platforms.' }
];

// ---- INSIGHTS (blog posts) ----
const POSTS = [
  {
    slug: 'ai-isnt-eating-saas',
    title: "AI Isn't Eating SaaS. It's Expanding It.",
    date: '2026-05-05',
    dateDisplay: 'May 5, 2026',
    excerpt: "The SaaS apocalypse is a tidy story. AI eats workflows. Seats compress. The numbers tell a different story — and so does the architecture.",
    tag: 'Market View',
    href: 'insights/ai-isnt-eating-saas.html'
  },
  {
    slug: 'rise-of-ai-acquihires',
    title: 'The Rise of AI Acquihires',
    date: '2025-11-05',
    dateDisplay: 'November 5, 2025',
    excerpt: 'The significant volume of AI acquihires in 2025, why these are mutually attractive to both big tech and early-stage start-ups, and why this should only increase.',
    tag: 'M&A Trends',
    href: 'insights/rise-of-ai-acquihires.html'
  },
  {
    slug: 'pe-rule-of-40-saas-take-privates',
    title: 'PE Takes Another Rule of 40 SaaS Vendor Private at 6x',
    date: '2025-08-30',
    dateDisplay: 'August 30, 2025',
    excerpt: "An analysis of the last 8 SaaS take-privates — and a prediction of who's next.",
    tag: 'SaaS',
    href: 'insights/pe-rule-of-40-saas-take-privates.html'
  },
  {
    slug: 'q2-ma-update',
    title: 'Q2 M&A Update: Deal Counts Down, Capital Hits 2021 Levels',
    date: '2025-07-10',
    dateDisplay: 'July 10, 2025',
    excerpt: 'Five years of PitchBook data covering 84,000 US-based transactions. Some trends were expected, others pleasantly surprising.',
    tag: 'Market View',
    href: 'insights/q2-ma-update.html'
  }
];

// ---- CASE STUDIES ----
const CASE_STUDIES = [
  {
    slug: 'hrc-increases-valuation-70',
    title: 'HRC Increases Valuation by 70%',
    date: '2025-05-20',
    dateDisplay: 'May 20, 2025',
    excerpt: 'Sale of Core Business Solutions to LRQA, a portfolio company of Goldman Sachs.',
    tag: 'Sell-side',
    href: 'case-studies/hrc-increases-valuation-70.html'
  },
  {
    slug: 'hrc-facilitates-95mm-acquisition',
    title: 'HRC Facilitates $95mm Acquisition',
    date: '2025-05-16',
    dateDisplay: 'May 16, 2025',
    excerpt: 'Strategic growth investment by Cohere Capital in Promevo, a leading Google Cloud partner.',
    tag: 'Buy-side',
    href: 'case-studies/hrc-facilitates-95mm-acquisition.html'
  },
  {
    slug: 'hrc-increases-cash-at-closing',
    title: 'HRC Increases Cash at Closing by 50%',
    date: '2023-01-29',
    dateDisplay: 'January 29, 2023',
    excerpt: 'How a sell-side process restructure converted contingent consideration into upfront cash.',
    tag: 'Sell-side',
    href: 'case-studies/hrc-increases-cash-at-closing.html'
  },
  {
    slug: 'banking-saas-acquisition',
    title: 'HRC Advises Acquisition of Banking SaaS Company',
    date: '2023-01-29',
    dateDisplay: 'January 29, 2023',
    excerpt: 'Buy-side mandate for a strategic acquirer in the banking software vertical.',
    tag: 'Buy-side',
    href: 'case-studies/banking-saas-acquisition.html'
  }
];

// ---- WHITEPAPERS ----
const WHITEPAPERS = [
  {
    slug: 'cyber-compliance-trends',
    title: 'Cyber & Compliance Trends',
    date: '2026-01-01',
    dateDisplay: 'Industry Insights',
    excerpt: 'CMMC 2.0 mandate, market size, M&A activity, strategic acquirer profiles, and a market map of ~500 leading companies.',
    tag: 'Whitepaper',
    href: 'whitepapers/cyber-compliance-trends.html'
  },
  {
    slug: 'macro-ma',
    title: 'Macro M&A',
    date: '2025-04-01',
    dateDisplay: 'Industry Insights',
    excerpt: 'Twenty quarters of M&A trends across software, services, healthcare, manufacturing, and telecom.',
    tag: 'Whitepaper',
    href: 'whitepapers/macro-ma.html'
  },
  {
    slug: 'compliance-trends',
    title: 'Compliance Trends',
    date: '2025-01-01',
    dateDisplay: 'Industry Insights',
    excerpt: 'TICC M&A update — banner 2024 driven by PE and strategic deal activity, with increasing deal sizes.',
    tag: 'Whitepaper',
    href: 'whitepapers/compliance-trends.html'
  }
];

// ---- TESTIMONIALS ----
const TESTIMONIALS = [
  {
    quote: 'Their strategic insight, market expertise, and hands-on approach were instrumental in helping us identify the right partner, structure the deal, and achieve a successful transaction. From the very beginning, their team took the time to understand our goals.',
    name: 'Scott Dawson',
    title: 'President & Co-Founder, Core Business Solutions, Inc.'
  },
  {
    quote: 'Without Cyrus and HRC, the transaction that BlackMesh went through would not have been possible. Every step of the way, Cyrus was engaged, proactive, and became part of the team.',
    name: 'Jason Ford',
    title: 'Co-Founder & CTO, BlackMesh'
  },
  {
    quote: 'HRC was invaluable in guiding us through the various hurdles and challenges of a highly complex international deal. We dramatically increased our equity value and moved into position as the clear market leader in our industry.',
    name: 'Daniel Law',
    title: 'CEO, Rook Media'
  },
  {
    quote: 'Cyrus and the team have brought significant value beyond the standard scope of work — referring our largest customer, advising on key hires, and now executing on highly accretive add-on acquisitions.',
    name: 'Shawn Arcus',
    title: 'CEO, BurstNET Technologies'
  }
];
