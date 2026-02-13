import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";

type Project = {
  id: number;
  image: string;
  heading: string;
  text: string;
  tools: string;
  link: string;
  source?: string;
};

type Skill = {
  id: number;
  text: string;
  percent: number;
};

const CONTACT_EMAIL = "yassine.yousfi.contact@gmail.com";

const PROJECTS: Project[] = [
  {
    id: 1,
    image: "/images/pricing-platform.svg",
    heading: "Cross-Asset Pricing API and IDE",
    text: "Building and maintaining a cross-asset pricing API and a pricing IDE in an R&D market engineering environment.",
    tools: "Java, C#, REST API, Financial Engineering",
    link: "https://www.linkedin.com/in/yassine-yousfi-568801ab/",
  },
  {
    id: 2,
    image: "/images/pricing-service.svg",
    heading: "Zero Coupon Bond Pricing Microservice",
    text: "Designed and shipped a zero coupon bond pricing microservice in Python, orchestrated in Kubernetes and monitored with Elastic Stack.",
    tools: "Python, Flask, Kubernetes, CI/CD, Elastic Stack",
    link: "https://www.linkedin.com/in/yassine-yousfi-568801ab/",
  },
  {
    id: 3,
    image: "/images/pricework.svg",
    heading: "PriceWork (Upwork)",
    text: "Created a salary comparison web app with geolocation autocomplete and protected API access control.",
    tools: "React, Node.js, Firebase, GeoDB API",
    link: "https://www.upwork.com/",
  },
  {
    id: 4,
    image: "/images/alecol.svg",
    heading: "Alecol EdTech POC",
    text: "Built interactive learning experiences including MCQ, drag-and-drop, and sentence exercises with scalable patterns.",
    tools: "React, Node.js, Atomic Design, Strategy Pattern",
    link: "https://www.linkedin.com/company/alecol/",
  },
];

const SKILLS: Skill[] = [
  { id: 1, text: "Architecture Design", percent: 90 },
  { id: 2, text: "Java", percent: 100 },
  { id: 3, text: "React", percent: 99 },
  { id: 4, text: "Python", percent: 95 },
  { id: 5, text: "Product Design", percent: 90 },
  { id: 6, text: "HTML/CSS", percent: 95 },
  { id: 7, text: "JavaScript", percent: 90 },
];

const INITIAL_FORM = { name: "", email: "", message: "" };

const easeInOutCubic = (progress: number) => {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

export default function HomePage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  useEffect(() => {
    let frameId: number | null = null;

    const handleSmoothAnchorScroll = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const anchor = event.target.closest("a[href^='#']");
      if (!anchor) {
        return;
      }

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      const target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();

      const reduceMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        target.scrollIntoView({ block: "start" });
        window.history.pushState(null, "", hash);
        return;
      }

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      const startY = window.pageYOffset;
      const targetY = target.getBoundingClientRect().top + window.pageYOffset;
      const distance = targetY - startY;
      const duration = 1400;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutCubic(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
          return;
        }

        window.history.pushState(null, "", hash);
      };

      frameId = requestAnimationFrame(animate);
    };

    document.addEventListener("click", handleSmoothAnchorScroll);

    return () => {
      document.removeEventListener("click", handleSmoothAnchorScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Request failed");
      }

      setStatus({
        type: "success",
        message: result.message === "success" ? "Message sent. I will reply soon." : result.message,
      });
      setFormData(INITIAL_FORM);
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error?.message || "Message could not be sent now. Please email me directly.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Yassine Yousfi</title>
        <meta
          name="description"
          content="Yassine Yousfi portfolio, full stack software engineer focused on financial platforms and product delivery."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="app-shell">
        <header className="hero" id="home">
          <div className="hero-backdrop" aria-hidden="true" />

          <nav className="site-header" aria-label="Primary">
            <a className="brand" href="#home" aria-label="Go to top">
              <span>YY</span>
            </a>
            <div className="nav-links">
              <ul>
                <li>
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="hero-content">
            <section className="hero-layout">
              <div className="hero-copy">
                <h1>Yassine Yousfi</h1>
                <h2>Full Stack Software Engineer At SG ATS.</h2>
                <p>
                  Currently at Societe Generale ATS, I design and maintain pricing platforms for financial
                  products, translating market complexity into fast, reliable tools through full-stack engineering.
                </p>
                <div className="hero-actions">
                  <a href="#projects" className="btn btn-primary">
                    View Projects
                  </a>
                  <a href="#contact" className="btn btn-ghost">
                    Contact
                  </a>
                </div>
              </div>

              <figure className="hero-photo-wrap">
                <img src="/images/photo-yassine.jfif" alt="Yassine Yousfi portrait" className="hero-photo" />
                <span className="duotone-wash" aria-hidden="true" />
              </figure>
            </section>
          </div>

          <a href="#projects" className="scroll-link" aria-label="Scroll to projects">
            <span className="scroll-down" aria-hidden="true">
              Scroll
            </span>
          </a>
        </header>

        <main>
          <section className="section projects" id="projects">
            <div className="section-head">
              <p className="eyebrow">Experience Highlights</p>
              <h3>Recent delivery across SG ATS, Upwork, and product-focused freelance work.</h3>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((project) => (
                <article className="project-card" key={project.id}>
                  <img src={project.image} alt={`${project.heading} preview`} loading="lazy" decoding="async" />
                  <div className="project-copy">
                    <h4>{project.heading}</h4>
                    <p>{project.text}</p>
                    <p className="tools">{project.tools}</p>
                    <div className="project-actions">
                      {project.source ? (
                        <a className="btn btn-ghost" href={project.source} target="_blank" rel="noopener noreferrer">
                          Source
                        </a>
                      ) : null}
                      <a className="btn btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">
                        Visit
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section about" id="about">
            <div className="section-head">
              <p className="eyebrow">About</p>
              <h3>Practical engineering with a product mindset.</h3>
            </div>
            <div className="about-grid">
              <p>
                I am Yassine Yousfi, a full stack developer focused on creating reliable web products from idea to
                production. I enjoy shaping both the user experience and the system underneath it.
              </p>
              <p>
                My work blends frontend detail, backend logic, and clean deployment workflows so teams can ship
                faster without compromising quality.
              </p>
            </div>
            <div className="about-stats">
              <div>
                <strong>3+</strong>
                <span>Years Building</span>
              </div>
              <div>
                <strong>10+</strong>
                <span>Projects Shipped</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Hands-on Delivery</span>
              </div>
            </div>
          </section>

          <section className="section skills" id="skills">
            <div className="section-head">
              <p className="eyebrow">Skills</p>
              <h3>Tooling that supports end-to-end product delivery.</h3>
            </div>
            <div className="skills-grid">
              {SKILLS.map((skill) => (
                <article className="skill-card" key={skill.id}>
                  <div className="skill-top">
                    <h4>{skill.text}</h4>
                    <span>{skill.percent}%</span>
                  </div>
                  <div className="skill-track" role="img" aria-label={`${skill.text} proficiency ${skill.percent} percent`}>
                    <div className="skill-fill" style={{ width: `${skill.percent}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="site-footer" id="contact">
          <div className="contact-layout">
            <div className="contact-intro">
              <h3>Let&apos;s build something useful.</h3>
              <p>Available for freelance work and product collaborations.</p>
              <div className="footer-links">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                <a href="https://github.com/yasTheDreamer/" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yassine-yousfi-568801ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                required
              />

              <label htmlFor="contact-email">Your Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                required
              />

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
                required
              />

              <button className="btn btn-primary contact-submit" type="submit" disabled={status.type === "loading"}>
                {status.type === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status.message ? (
                <p className={`form-status ${status.type}`} aria-live="polite">
                  {status.message}
                </p>
              ) : null}
            </form>
          </div>
          <p className="copyright">(c) {new Date().getFullYear()} Yassine Yousfi</p>
        </footer>
      </div>
    </>
  );
}
