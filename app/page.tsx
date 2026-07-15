import { AnalyticsPreferencesButton } from "./Analytics";
import { ContactCard } from "./ContactCard";
import { ResumeRequest } from "./ResumeRequest";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

const experience = [
  {
    dates: "Apr 2026 - Present",
    company: "Arizona State University",
    role: "Business Intelligence Analyst II",
    summary:
      "Own enterprise analytics intake and delivery, turn ambiguous questions into decision-ready analysis, and build predictive models that support proactive student success.",
  },
  {
    dates: "Sep 2024 - Aug 2025",
    company: "Paccurate",
    role: "Solutions Engineer, Data",
    summary:
      "Designed logistics analytics and predictive reporting solutions across Product, Engineering, Sales, and Customer Success, including the Transmutr ETL framework.",
  },
  {
    dates: "Feb 2022 - Sep 2024",
    company: "Amazon",
    role: "Business Analyst",
    summary:
      "Built executive reporting, AWS-based ELT pipelines, and standardized KPI systems for warehouse and transportation operations, cutting recurring report preparation by 70%.",
  },
  {
    dates: "Feb 2021 - Feb 2022",
    company: "Public Consulting Group",
    role: "Data Analyst",
    summary:
      "Automated public-sector financial reporting and delivered forecasting tools and executive dashboards, reducing manual reporting effort by 50%.",
  },
];

const projects = [
  {
    index: "01",
    type: "ETL automation",
    title: "Transmutr",
    description:
      "A configurable pipeline that processes large logistics files, standardizes messy inputs, calculates operational metrics, and produces analysis-ready Excel workbooks.",
    outcome: "Large-file processing / validation / automated reporting",
    tags: ["Python", "Pandas", "Excel", "ETL"],
    href: "https://github.com/DataWzard/Transmutr",
    linkLabel: "View repository",
    visual: "pipeline",
  },
  {
    index: "02",
    type: "Interactive analytics",
    title: "Startup performance quadrant",
    description:
      "An interactive Tableau exploration designed to compare company performance, reveal outliers, and make a dense dataset easier to interrogate.",
    outcome: "Exploratory analysis / segmentation / visual storytelling",
    tags: ["Tableau", "Analytics", "Data Viz"],
    href: "https://public.tableau.com/views/StartUpsDashboard/TheStartupQuadrant?:showVizHome=no",
    linkLabel: "Open dashboard",
    visual: "scatter",
  },
  {
    index: "03",
    type: "Decision support",
    title: "Profit map",
    description:
      "A story-led profitability view that helps stakeholders move from geographic patterns to the operational questions behind them.",
    outcome: "Margin analysis / regional comparison / executive narrative",
    tags: ["Tableau", "Business Analysis", "Story"],
    href: "https://public.tableau.com/views/ProfitMap_17575533711420/Story1?:showVizHome=no",
    linkLabel: "Open dashboard",
    visual: "map",
  },
  {
    index: "04",
    type: "Scenario analysis",
    title: "Expansion analysis",
    description:
      "An interactive prioritization experience for comparing expansion opportunities and communicating the tradeoffs behind a recommendation.",
    outcome: "Location strategy / comparison / recommendation",
    tags: ["Tableau", "Strategy", "Presentation"],
    href: "https://public.tableau.com/views/ExpansionAnalysisInsights_17555356754650/FinalPresentation?:showVizHome=no",
    linkLabel: "Open dashboard",
    visual: "bars",
  },
];

const testimonials = [
  {
    quote:
      "Jacob was a consistently supportive, curious and eager member of our data team. He was always ready to collaborate and experiment with new data workflows in myriad of tools: R, Python, Google Colab and more. His contributions helped shape the data processing pipeline for our GTM and customer success organizations, as well as informed the long-term direction of product innovations to power customer-facing analysis tools on our roadmap. Jacob brings a hunger to learn along with a friendly and collaborative attitude to the workplace. Any team would be happy to have him on board!",
    name: "Dan Norton",
    title: "VP of Product - Paccurate",
  },
  {
    quote:
      "I had the pleasure to work with Jacob during his time at Paccurate, and even in the limited time we overlapped, his impact was clear. He possessed a rare ability to translate technical complexity into solutions that actually drove results for customers. From building custom analytics to supporting pre-sales efforts with sharp, tailored demos, he consistently made things easier for both the team and our clients. Smart, collaborative, and easy to work with. He was a real asset.",
    name: "Tony Villanova",
    title: "VP of Technology Partnerships - Paccurate",
  },
  {
    quote:
      "When I worked with Jacob, he always did a wonderful job enabling his sales team with robust data analyses and data visualizations. If I were a sales organization looking for a data analyst to support a quantitative, ROI-based sales process, I would be confident in Jacob's abilities.",
    name: "Vance Reeds",
    title: "Head of Sales - Paccurate",
  },
  {
    quote:
      "Where I was focused on growth marketing, Jacob specialised in data analytics within the product team. Communicating with Jacob was easy, and he was able to articulate clearly ways to glean insights for different initiatives and objectives on the marketing and product front. Jacob's reputation for clear thinking and analytical depth was evident across the organisation. What consistently stood out was his ability to translate complex data into meaningful insights that supported broader business goals. He approached problems with a strong data-driven mindset, always seeking measurable outcomes and always grounded in curiosity. Equally important, he is genuinely great to work with: open, approachable, and collaborative. His initiative in exploring ideas and engaging across departments made him a valuable partner in conversations that bridged analytics to benefit other functions, not just product. I'm confident he will be an asset to any team looking for someone who can combine thorough analysis with clear communication and a growth-focused perspective.",
    name: "Neil Patel",
    title: "Lead Marketing Consultant - Paccurate",
  },
  {
    quote:
      "Transforming high-stakes projects with precision analysis - Jacob's contributions are crucial to the success of business initiatives. Seamlessly aligning ETL automation with team goals, Jacob drives essential operational efficiencies, continuously advancing his scope clarity and project execution.",
    name: "Amazon Performance Feedback",
    title: "Business Analyst Impact - Amazon",
  },
  {
    quote:
      "Jacob is a dedicated, hard worker who loves analytics. He is not only extremely skilled but has fun practicing code in his spare time. I would recommend him to anyone who is looking for a rising star in the analytics space.",
    name: "Anthony Mullins",
    title: "Data Analyst - Amazon",
  },
  {
    quote:
      "Data is really only valuable once it's turned into information; otherwise, it's just millions of numbers in a database. Fortunately, Jacob is the data wizard capable of reconstructing those millions of arbitrary points of data into actual information. When we worked together, I saw him swim through data like a fish swims through water, zeroing in on the most valuable pieces of data and spinning them into graphs and dashboards that displayed actual information relevant for our customers. His efforts equipped me to have more intelligent, data-backed recommendations for customers, elevating my ability to have a rapid, positive impact. There are lots of data lovers out there, but Jacob is a cut above the rest. He's intensely curious and creative, and his curiosity is only outmatched by his capacity to constantly listen to feedback and continue improving. Every team out there needs a Jacob.",
    name: "Jared Jaramillo",
    title: "Customer Success Manager - Paccurate",
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "pipeline") {
    return (
      <div className="pipeline-visual" aria-hidden="true">
        <span>CSV</span><i>+</i><span>JSON</span><b>→</b><strong>TRANSFORM</strong><b>→</b><span>XLSX</span>
      </div>
    );
  }

  if (type === "scatter") {
    return (
      <div className="chart scatter-chart" aria-hidden="true">
        {["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"].map((point) => (
          <i key={point} className={point} />
        ))}
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="chart map-chart" aria-hidden="true">
        <span className="region r1" /><span className="region r2" /><span className="region r3" />
        <span className="region r4" /><span className="region r5" />
        <i className="pin pin-a" /><i className="pin pin-b" /><i className="pin pin-c" />
      </div>
    );
  }

  return (
    <div className="chart bar-chart" aria-hidden="true">
      {[58, 86, 43, 72, 64, 92].map((height, index) => (
        <i key={height} style={{ height: `${height}%` }}><span>{index + 1}</span></i>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Jacob Stack, home">
          JS<span>/</span>DATA
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <ContactCard />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Business intelligence + analytics engineering</p>
          <h1>I turn messy data into <em>clear decisions.</em></h1>
          <p className="hero-intro">
            I&apos;m Jacob Stack, a Business Intelligence Analyst with 5+ years of experience building the pipelines, models, dashboards, and narratives that help teams act with confidence.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore selected work <span>↓</span></a>
            <ResumeRequest />
          </div>
          <p className="location">Phoenix, Arizona <i /> Open to relocation</p>
        </div>

        <div className="hero-visual" aria-label="A visual summary showing data transformed into decisions">
          <div className="visual-topline"><span>Decision system</span><b>LIVE</b></div>
          <div className="signal-chart" aria-hidden="true">
            <div className="grid-lines" />
            <div className="trend-line" />
            <i className="signal-dot dot-one" /><i className="signal-dot dot-two" /><i className="signal-dot dot-three" />
            <span className="chart-label label-a">SOURCE</span>
            <span className="chart-label label-b">MODEL</span>
            <span className="chart-label label-c">ACTION</span>
          </div>
          <div className="visual-metrics">
            <div><strong>70%</strong><span>less report prep</span></div>
            <div><strong>50%</strong><span>less manual effort</span></div>
            <div><strong>5+</strong><span>years in analytics</span></div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Core capabilities">
        <span>Analytics strategy</span><i>✦</i><span>Data engineering</span><i>✦</i><span>Business intelligence</span><i>✦</i><span>Statistical modeling</span>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <div><p className="section-kicker">01 / Selected work</p><h2>Proof, not promises.</h2></div>
          <p>Projects that connect technical craft to a practical decision, operational improvement, or clearer story.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-visual"><ProjectVisual type={project.visual} /></div>
              <div className="project-body">
                <div className="project-meta"><span>{project.index}</span><span>{project.type}</span></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p className="project-outcome">{project.outcome}</p>
                <div className="project-footer">
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                  <a href={project.href} target="_blank" rel="noreferrer" data-analytics-event="project_click" data-analytics-label={project.title}>{project.linkLabel} <span>↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="all-work">
          <a href="https://github.com/DataWzard" target="_blank" rel="noreferrer" data-analytics-event="portfolio_click" data-analytics-label="All GitHub projects">Browse all GitHub projects <span>↗</span></a>
          <a href="https://public.tableau.com/app/profile/jacob.stack/vizzes" target="_blank" rel="noreferrer" data-analytics-event="portfolio_click" data-analytics-label="All Tableau dashboards">Browse all Tableau dashboards <span>↗</span></a>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">02 / Experience</p><h2>Built for real-world constraints.</h2></div>
          <p>Analytics work across education, logistics, transportation, and public-sector finance.</p>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article key={item.company}>
              <p className="timeline-date">{item.dates}</p>
              <div><h3>{item.role}</h3><p className="company">{item.company}</p></div>
              <p className="timeline-summary">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-copy">
          <p className="section-kicker">03 / How I work</p>
          <h2>Technical depth. Business context. No black boxes.</h2>
          <p>
            I work across the full data lifecycle: clarify the question, validate the source, build the transformation, test the model, and communicate the answer in language the audience can use.
          </p>
          <p>
            My best work happens where engineering and analysis meet - especially when the problem is ambiguous, the stakeholders are varied, and the result needs to hold up in the real world.
          </p>
          <div className="education">
            <span>Education</span>
            <p><strong>M.S. Computer Science</strong> · Southern New Hampshire University · In progress</p>
            <p><strong>B.S. Data Analytics</strong> · Southern New Hampshire University · 2025</p>
          </div>
        </div>
        <div className="toolbox">
          <p>Technical toolkit</p>
          <div className="tool-group"><span>Languages</span><p>Python · SQL · R · Java · JavaScript</p></div>
          <div className="tool-group"><span>Analytics + BI</span><p>Tableau · Power BI · Looker · QuickSight · Alteryx · Metabase · Excel</p></div>
          <div className="tool-group"><span>Data engineering</span><p>Snowflake · AWS · BigQuery · Airflow · ETL/ELT · Docker</p></div>
          <div className="tool-group"><span>Delivery</span><p>Salesforce · HubSpot · Airtable · Jira · Notion · AI workflows</p></div>
          <div className="cert-row"><span>Tableau</span><span>Power BI Data Analyst</span><span>Advanced SQL</span></div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-heading">
          <div><p className="section-kicker">04 / In their words</p><h2>Trusted across the table.</h2></div>
          <p>Browse every recommendation from leaders and teammates across product, sales, marketing, customer success, and analytics.</p>
        </div>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      <section className="contact-section">
        <p className="section-kicker">05 / Contact</p>
        <h2>Have a messy problem?<br /><em>Let&apos;s make it useful.</em></h2>
        <p>For analytics, business intelligence, solutions engineering, and data product conversations.</p>
        <a className="contact-email" href="mailto:jakestack91@gmail.com" data-analytics-event="contact_click" data-analytics-label="Email from contact section">jakestack91@gmail.com <span>↗</span></a>
      </section>

      <footer>
        <p>© 2026 Jacob Stack</p>
        <div>
          <a href="https://www.linkedin.com/in/stack-jacob/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/DataWzard" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://public.tableau.com/app/profile/jacob.stack/vizzes" target="_blank" rel="noreferrer">Tableau</a>
          <AnalyticsPreferencesButton />
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
