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
    description: 'Core Business Solutions is a leading SaaS and services provider focused on cybersecurity and compliance, with deep expertise in ISO and CMMC certifications. The company combines a proprietary compliance management platform with assessment services, serving manufacturers, defense industrial base contractors and other regulated industries. Core Business Solutions experienced rapid growth and scale prior to the transaction, which positioned the company as a strategic acquisition target for LRQA.\n\nLRQA is a leading global assurance and inspection services firm, with capabilities across compliance, cybersecurity, certification, and risk management. LRQA is backed by Goldman Sachs and has been pursuing an active M&A strategy to expand its cybersecurity and compliance practice.\n\nHarbor Ridge Capital advised Core Business Solutions on its sale to LRQA.'
  },
  {
    id: 'promevo',
    img: 'assets/img/transactions/promevo.png',
    title: 'Cohere Capital growth investment in Promevo',
    sector: 'Google Cloud Services',
    role: 'Buy-side advisor',
    description: "Promevo is one of the largest Google cloud partners in North America. The company is focused on reselling Google Workspace and Chromebooks. Promevo experienced rapid growth, profitability and scale prior to the transaction, which positioned the company for further success with capital, and sophisticated support from Cohere Capital.\n\nCohere Capital is a leading Boston-based, growth-oriented private equity firm. Cohere has a long track record and deep experience investing in and working with growth companies, with domain expertise in tech-enabled services.\n\nHarbor Ridge Capital advised Cohere on it's investment in Promevo."
  },
  {
    id: '360insights',
    img: 'assets/img/transactions/360insights.png',
    title: 'MTC sale to 360insights',
    sector: 'Channel Software',
    role: 'Sell-side advisor',
    description: 'MTC is a leading channel SaaS provider focused on sales incentive management solutions that save time and money while increasing engagement and ROI. The company counted some of the largest technology companies in the world as loyal clients, including Samsung and Ingram Micro. MTC experienced strong growth and built a loyal enterprise customer base prior to the transaction, which positioned the company as a strategic acquisition target for 360insights.\n\n360insights is a leading channel SaaS provider that manages a full suite of channel incentives — SPIFFs, rebates, co-op advertising and MDF, sell-through allowances, and volume incentives — on a single platform. 360insights is backed by Sageview Capital and has been pursuing an active M&A strategy to consolidate the channel incentives software category.\n\nHarbor Ridge Capital advised MTC on its sale to 360insights.'
  },
  {
    id: 'blackmesh',
    img: 'assets/img/transactions/blackmesh.png',
    title: 'BlackMesh sale to Contegix',
    sector: 'Compliant Cloud / TICC',
    role: 'Sell-side advisor',
    description: 'BlackMesh is a leading compliance and security-focused cloud services provider, offering high-touch managed services to enterprises and government agencies. As a FedRAMP platform-as-a-service (PaaS) provider, the company delivers cloud services in one of the most secure and compliant environments in the industry. BlackMesh built a strong recurring revenue base and differentiated compliance posture prior to the transaction, which positioned the company as a strategic acquisition target for Contegix.\n\nContegix is a cloud service provider focused on managing business-critical applications, including the Atlassian suite, alongside traditional managed IT services for enterprises. Contegix is backed by Strattam Capital and has been pursuing an active M&A strategy to expand its managed cloud and compliance offerings.\n\nHarbor Ridge Capital advised BlackMesh on its sale to Contegix.'
  },
  {
    id: 'hosting',
    img: 'assets/img/transactions/hosting.png',
    title: 'Stelligent sale to Hosting.com',
    sector: 'IT / Cloud Services',
    role: 'Sell-side advisor',
    description: 'Stelligent is a leading cloud services provider focused on DevOps automation and digital transformation on the Amazon Web Services (AWS) cloud. The company is a Premier AWS Consulting Partner, with deep competencies in financial services and DevOps. Stelligent built a strong reputation as one of the most respected AWS partners in the market and experienced rapid growth prior to the transaction, which positioned the company as a strategic acquisition target for Hosting.com.\n\nHosting.com is a leading cloud service provider, offering secure and compliant solutions across a broad portfolio that includes public cloud, private cloud, hybrid IT, and dedicated environments. Hosting.com is backed by Pamlico Capital and has been pursuing an active M&A strategy to expand its cloud and managed services capabilities.\n\nHarbor Ridge Capital advised Hosting.com and Pamlico on its acquisition of Stelligent.'
  },
  {
    id: 'cloud9',
    img: 'assets/img/transactions/cloud9.png',
    title: 'Cloudnine Realtime sale to AbacusNext',
    sector: 'Managed Services',
    role: 'Sell-side advisor',
    description: "Cloudnine Realtime is a leading managed services cloud provider specializing in hosting over 1,000 business applications, primarily for the financial services and CPA verticals — including Intuit QuickBooks®, Sage, and Microsoft Solutions. The company built a loyal customer base across a fragmented small-business market, with strong recurring revenue and deep vertical expertise. Cloudnine Realtime's growth and customer base positioned the company as a strategic acquisition target for AbacusNext.\n\nAbacusNext is a leading case management software and cloud services provider focused on the legal vertical. AbacusNext is backed by Providence Strategic Growth and has been pursuing an active M&A strategy to expand its software and hosting capabilities for professional services firms.\n\nHarbor Ridge Capital advised Cloudnine Realtime on its sale to AbacusNext."
  },
  {
    id: 'conix',
    img: 'assets/img/transactions/conix.png',
    title: 'CONIX sale to CV Systems',
    sector: 'Banking Software',
    role: 'Buy-side advisor',
    description: "CONIX is a cutting-edge fintech software company with state-of-the-art solutions across real-time integrated payments, fraud detection, cybersecurity software, and item processing. The company built a long track record serving financial institutions with mission-critical software. CONIX's product depth and entrenched customer base positioned the company as a strategic acquisition target for CV Systems.\n\nCV Systems is a leading provider of banking software, with core functionality across automated teller machines (ATM), fraud detection, cybersecurity, online payment and transaction processing, and financial software technology solutions. CV Systems has been pursuing an active M&A strategy to broaden its fintech software platform.\n\nHarbor Ridge Capital advised CV Systems on its acquisition of CONIX."
  },
  {
    id: 'rookmedia',
    img: 'assets/img/transactions/rookmedia.png',
    title: 'DomainSponsor sale to RookMedia',
    sector: 'Advertising Technology',
    role: 'Buy-side and Capital Markets Advisor',
    description: "DomainSponsor was a leading adtech and internet marketing business focused on domain name monetization, and one of the two largest players in the category. The company generated substantial scale through its monetization platform serving domain owners and advertisers. DomainSponsor's scale and platform positioned the company as a strategic acquisition target for RookMedia.\n\nRookMedia is a leading adtech and internet marketing business focused on domain name monetization. The combination of the two largest players in the space created a business with over $100mm in revenue and $25mm in EBITDA, and a market-leading position in domain monetization.\n\nHarbor Ridge Capital advised RookMedia on its acquisition and financing of DomainSponsor."
  },
  {
    id: 'blacklotus',
    img: 'assets/img/transactions/blacklotus.png',
    title: 'BlackLotus Communications acquisition of ServerOrigin',
    sector: 'Cybersecurity / DDoS Mitigation',
    role: 'Buy-side advisor',
    description: "BlackLotus Communications is a leading provider of DDoS mitigation and cybersecurity infrastructure services, protecting enterprises, gaming platforms, and critical online services from large-scale denial-of-service attacks. The company built a differentiated network architecture and proprietary mitigation technology that positioned it as a category leader in DDoS protection. BlackLotus pursued the acquisition of ServerOrigin to expand its hosting and infrastructure capabilities.\n\nServerOrigin is a dedicated server hosting and managed infrastructure provider. The acquisition combined ServerOrigin's hosting platform with BlackLotus's DDoS mitigation network to deliver an integrated secure hosting offering.\n\nHarbor Ridge Capital advised BlackLotus Communications on its acquisition of ServerOrigin."
  },
  {
    id: 'lojistic',
    img: 'assets/img/transactions/lojistic.png',
    title: 'Lojistic acquisition of Intelliship',
    sector: 'Logistics Software',
    role: 'Buy-side advisor',
    description: "Lojistic is a leading freight audit and parcel shipping management software platform. The company helps shippers reduce parcel and freight costs through real-time analytics, audit recovery, and carrier rate negotiation. Lojistic pursued the acquisition of Intelliship to expand its capabilities across freight modes and customer segments.\n\nIntelliship is a freight transportation management software (TMS) provider serving small and mid-market shippers. The acquisition added complementary TMS functionality to Lojistic's parcel-focused platform.\n\nHarbor Ridge Capital advised Lojistic on its acquisition of Intelliship."
  },
  {
    id: 'backlog',
    img: 'assets/img/transactions/backlog.png',
    title: 'BurstNET growth investment from Backlog Capital',
    sector: 'Internet Infrastructure',
    role: 'Capital Markets Advisor',
    description: "BurstNET is a leading dedicated server hosting and internet infrastructure provider, serving SMB and enterprise customers across North America with managed servers, colocation, and bandwidth services. The company built a loyal customer base and strong recurring revenue at scale, which positioned BurstNET as an attractive platform investment for Backlog Capital.\n\nBacklog Capital is a private equity firm focused on growth investments in internet infrastructure and technology services companies. Backlog Capital partners with founder-led businesses to accelerate growth and pursue strategic acquisitions.\n\nHarbor Ridge Capital served as capital markets advisor to BurstNET on its growth investment from Backlog Capital."
  },
  {
    id: 'vazata',
    img: 'assets/img/transactions/vazata.png',
    title: 'Vazata growth investment from Ballast Point Ventures',
    sector: 'Internet Infrastructure',
    role: 'Capital Markets Advisor',
    description: "Vazata is a leading provider of compliant cloud, colocation, and managed services for regulated industries, with secure data center facilities serving government and enterprise customers. The company built a strong base of clients requiring compliance-focused hosting (FedRAMP, ITAR, FISMA), which positioned Vazata as an attractive growth investment for Ballast Point Ventures.\n\nBallast Point Ventures is a Florida-based growth equity firm focused on lower middle-market technology and services companies. The firm partners with founder-led businesses to accelerate growth and operational improvement.\n\nHarbor Ridge Capital served as capital markets advisor to Vazata on its growth investment from Ballast Point Ventures."
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
