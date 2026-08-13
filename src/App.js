import { useState, useRef } from "react";
import "@/App.css";
import { motion, useInView } from "framer-motion";
import { Toaster, toast } from "sonner";
import SitePet from "@/SitePet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  profile,
  about,
  experience,
  projects,
  openSource,
  skills,
  education,
  connect,
  personal,
  contactClosing,
} from "@/data";

// SitePet (pikachu) companion widget - local dev only, hidden on the deployed site.
const SHOW_SITE_PET = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const poke = (topic) => {
  window.dispatchEvent(new CustomEvent("sitepet:react", { detail: { topic } }));
};

/* Fade-and-rise reveal on scroll */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* Section with large heading placed above the content */
const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <div className="wrap">
      <Reveal>
        <h2 className="section-heading">{title}</h2>
      </Reveal>
      <div className="section-body">{children}</div>
    </div>
  </section>
);

const Hero = () => {
  return (
    <header className="hero">
      <div className="wrap">
        <h1 className="hero-title" data-testid="hero-heading">
          <span className="hero-title-line">Hey, I&apos;m Shubham.</span>
          <span className="hero-title-thesis">
            <em>I study markets &amp; the systems beneath them.</em>
          </span>
        </h1>
        <p className="hero-sub">
          Researching execution systems, market microstructure, and on-chain
          infrastructure, and building the open-source tools beneath them.
        </p>

        <div className="hero-cta">
          <a href="#research" className="btn btn-solid" data-testid="hero-cta-research" onClick={() => poke("research")}>
            View Research <span className="arrow">&rarr;</span>
          </a>
          <a href="#work" className="btn" data-testid="hero-cta-work" onClick={() => poke("work")}>
            Selected Work <span className="arrow">&rarr;</span>
          </a>
          <a
            href="https://github.com/shubhamessier"
            target="_blank"
            rel="noreferrer"
            className="btn"
            data-testid="hero-cta-github"
            onClick={() => poke("github")}
          >
            GitHub <span className="arrow">&rarr;</span>
          </a>
        </div>

        <div className="hero-panel">
          <div className="fact">
            <div className="fact-label">Currently</div>
            <div className="fact-value">
              <span className="status-dot" aria-hidden="true" />
              Open to quant &amp; research roles
            </div>
          </div>
          <div className="fact">
            <div className="fact-label">Focus</div>
            <div className="fact-value">Execution &middot; MEV &middot; Microstructure</div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* Collapsible long-form bio - lives inside Profile, not its own section */
const LongerStory = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (next) => {
    setOpen(next);
    if (next) poke("story");
  };
  return (
    <div id="life" className="longer-story">
      <Collapsible open={open} onOpenChange={handleOpenChange} className="disclosure">
        <CollapsibleTrigger asChild>
          <button className="disclosure-trigger" data-testid="personal-toggle">
            <span className="disclosure-title">
              {open ? "The longer story" : "Read the longer story"}
            </span>
            <span className="disclosure-sign">{open ? "-" : "+"}</span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="collapsible-content">
          <div className="longer-story-body">
            {personal.chapters.map((c) => (
              <div className="chapter" key={c.no}>
                <div className="chapter-no">{c.no}</div>
                <h3>{c.title}</h3>
                {c.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {c.books && (
                  <ul className="booklist">
                    {c.books.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="chapter">
              <div className="chapter-no">07</div>
              <h3>Timeline</h3>
              <div style={{ marginTop: 8 }}>
                {personal.timeline.map((t, i) => (
                  <div className="tl-row" key={i}>
                    <div className="tl-year">{t.year}</div>
                    <div className="tl-text">{t.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chapter">
              <div className="chapter-no">08</div>
              <h3>Life</h3>
              <dl className="life-spec">
                <div className="life-row">
                  <dt>Hobbies</dt>
                  <dd>
                    {personal.hobbies.map((h, i) => (
                      <span className="life-item" key={i}>
                        <span className="life-mark" aria-hidden="true">{h.icon}</span>
                        {h.label}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="life-row">
                  <dt>To do</dt>
                  <dd>
                    {personal.todo.map((h, i) => (
                      <span className="life-item" key={i}>
                        <span className="life-mark" aria-hidden="true">{h.icon}</span>
                        {h.label}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="life-row">
                  <dt>To visit</dt>
                  <dd>
                    {personal.countries.map((c, i) => (
                      <span className="life-item" key={i}>
                        <span className="life-mark" aria-hidden="true">{c.flag}</span>
                        {c.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default function App() {
  const copy = (text, label, preview) => {
    try {
      navigator.clipboard?.writeText(text).catch(() => {});
    } catch (e) {
      /* clipboard unavailable */
    }
    toast(`${label} copied`, { description: preview ?? text });
  };

  return (
    <div className="site">
      <Toaster position="bottom-right" />

      <nav className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-name" data-testid="nav-home">
            <b>SG</b>
          </a>
          <div className="nav-links">
            <a href="#work" className="nav-link" data-testid="nav-work" onClick={() => poke("work")}>Work</a>
            <a href="#research" className="nav-link hide-sm" data-testid="nav-research" onClick={() => poke("research")}>Research</a>
            <a href="#life" className="nav-link" data-testid="nav-life" onClick={() => poke("life")}>Personal</a>
            <a href="#contact" className="nav-link" data-testid="nav-contact" onClick={() => poke("contact")}>Contact</a>
          </div>
        </div>
      </nav>

      <div id="top" />
      <div className="opening">
        <Hero />

        {/* About / positioning + longer story nested underneath */}
        <Section id="about" title="Profile">
          <Reveal>
            <p className="lead">{about}</p>
          </Reveal>
          <LongerStory />
        </Section>
      </div>

      {/* Experience */}
      <Section id="work" title="Work">
        {experience.map((e, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="entry" data-testid={`experience-${i}`}>
              <div className="entry-head">
                <div className="entry-title">
                  <span className="entry-role">{e.role}</span>
                  <span className="entry-company">{e.company}</span>
                </div>
                <div className="entry-when">
                  {e.period} · {e.place}
                </div>
              </div>
              <ul className="entry-points">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* Selected Projects */}
      <Section id="research" title="Selected Projects">
        {projects.map((p, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="work-item" data-testid={`project-${i}`}>
              <div className="work-title">
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="work-link"
                  >
                    {p.title}
                  </a>
                ) : (
                  <span>{p.title}</span>
                )}
                <span className="work-ref">{p.stack}</span>
              </div>
              <p className="work-desc">{p.desc}</p>
              <div className="tags">
                {p.tags.map((t, j) => (
                  <span className="tag" key={j}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* Open Source */}
      <Section id="open-source" title="Open Source">
        {openSource.map((p, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <div className="work-item" data-testid={`oss-${i}`}>
              <div className="work-title">
                <span>{p.title}</span>
                <span className="work-ref">{p.pr}</span>
              </div>
              <p className="work-desc">{p.desc}</p>
              <div className="tags">
                {p.tags.map((t, j) => (
                  <span className="tag" key={j}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        {skills.map((s, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="skill-row">
              <div className="skill-group">{s.group}</div>
              <div className="skill-items">{s.items}</div>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* Education */}
      <Section id="education" title="Education">
        <Reveal>
          <div className="entry" style={{ borderTop: "none", paddingTop: 0 }}>
            <div className="entry-head">
              <div className="entry-title">
                <span className="entry-role">{education.school}</span>
                <span className="entry-company">{education.degree}</span>
              </div>
              <div className="entry-when">{education.period}</div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div className="micro-label" style={{ marginBottom: 12 }}>Achievements</div>
            <ul className="entry-points" style={{ marginTop: 0 }}>
              {education.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Let's work together">
        <Reveal>
          <p className="lead">{contactClosing}</p>

          <div className="connect-list" style={{ marginTop: 40 }}>
            {connect.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="connect-row"
                data-testid={`connect-${c.label.toLowerCase()}`}
              >
                <span className="connect-label">{c.label}</span>
                <span className="connect-value">{c.value}</span>
              </a>
            ))}
          </div>

          <div className="actions">
            <button
              className="btn btn-solid"
              data-testid="copy-email-btn"
              onClick={() => {
                copy(profile.email, "Email");
                poke("email");
              }}
            >
              Copy Email
            </button>
            <a
              className="btn"
              href="https://cal.com/shubhamgaur"
              target="_blank"
              rel="noreferrer"
              data-testid="schedule-btn"
              onClick={() => poke("schedule")}
            >
              Schedule a Meeting
            </a>
            <button
              className="btn"
              data-testid="copy-pgp-btn"
              onClick={() => {
                copy(
                  profile.pgpPublicKey,
                  "PGP key",
                  "Shubham Gaur <shubham.gaur7116@gmail.com>",
                );
                poke("pgp");
              }}
            >
              Copy PGP Key
            </button>
          </div>
        </Reveal>
      </Section>

      <footer className="footer">
        <div className="wrap">
          <p>© 2026 Shubham Gaur, There&apos;s always something more..</p>
        </div>
      </footer>
      {SHOW_SITE_PET && <SitePet />}
    </div>
  );
}
