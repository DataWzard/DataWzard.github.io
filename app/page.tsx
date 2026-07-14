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
      "Jacob possessed a rare ability to translate technical complexity into solutions that actually drove results for customers.",
    name: "Tony Villanova",
    title: "VP, Technology Partnerships - Paccurate",
  },
  {
    quote:
      "Jacob brings a hunger to learn along with a friendly and collaborative attitude to the workplace. Any team would be happy to have him on board.",
    name: "Dan Norton",
    title: "VP, Product - Paccurate",
  },
  {
    quote:
      "He zeroed in on the most valuable pieces of data and turned them into dashboards that displayed information relevant for our customers.",
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
        <a className="header-cta" href="mailto:jakestack91@gmail.com">Let&apos;s talk <span>↗</span></a>
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
            <a className="button button-secondary" href="/Jacob_Stack_Resume.pdf" target="_blank" rel="noreferrer">View résumé <span>↗</span></a>
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
                  <a href={project.href} target="_blank" rel="noreferrer">{project.linkLabel} <span>↗</span></a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="all-work">
          <a href="https://github.com/DataWzard" target="_blank" rel="noreferrer">Browse all GitHub projects <span>↗</span></a>
          <a href="https://public.tableau.com/app/profile/jacob.stack/vizzes" target="_blank" rel="noreferrer">Browse all Tableau dashboards <span>↗</span></a>
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
          <p>Feedback from product, partnerships, and customer-facing leaders.</p>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name}>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption><strong>{testimonial.name}</strong><span>{testimonial.title}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-section">
        <p className="section-kicker">05 / Contact</p>
        <h2>Have a messy problem?<br /><em>Let&apos;s make it useful.</em></h2>
        <p>For analytics, business intelligence, solutions engineering, and data product conversations.</p>
        <a className="contact-email" href="mailto:jakestack91@gmail.com">jakestack91@gmail.com <span>↗</span></a>
      </section>

      <footer>
        <p>© 2026 Jacob Stack</p>
        <div>
          <a href="https://www.linkedin.com/in/stack-jacob/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/DataWzard" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://public.tableau.com/app/profile/jacob.stack/vizzes" target="_blank" rel="noreferrer">Tableau</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
