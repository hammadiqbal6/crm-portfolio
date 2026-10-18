import content from './content.js';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { AuroraMesh } from './components/AuroraMesh';
import { BentoProjects } from './components/BentoProjects';
import { CommandPalette, useCommandPalette } from './components/CommandPalette';
import { Header } from './components/Header';
import { useTheme } from './hooks/useTheme';
import { ArrowIcon, GitHubIcon } from './components/icons';
import { KineticHeading } from './components/KineticHeading';
import { MagneticButton } from './components/MagneticButton';
import { PipelineIllustration } from './components/PipelineIllustration';
import { Reveal } from './components/Reveal';
import { TechMarquee } from './components/TechMarquee';
import { useLenisScroll } from './hooks/useLenisScroll';

const { site, about, experience, skills } = content;

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      <AuroraMesh />
      <div className="container-x relative pb-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {site.status}
            </p>
            <KineticHeading as="h1" className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              {site.headline[0]}
            </KineticHeading>
            <p className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              <span className="text-gradient">{site.headline[1]}</span>
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">{site.intro}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton as="a" href="#projects" className="btn-primary">
                {site.primaryCta}
              </MagneticButton>
              <MagneticButton as="a" href={site.github} className="btn-ghost" target="_blank" rel="noreferrer">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </MagneticButton>
              <MagneticButton as="a" href={site.other.url} className="btn-ghost">
                {site.other.label} <ArrowIcon className="h-4 w-4" />
              </MagneticButton>
            </div>
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {site.facts.map((f) => (
                <div key={f.label} className="glass-card p-4">
                  <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-500">{f.label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal className="hidden lg:block" y={32}>
            <div className="glass-panel rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-500">Pipeline view</p>
              <div className="mt-4">
                <PipelineIllustration />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section border-t border-slate-200/60 dark:border-white/[0.06]">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.35fr]">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="h2">{about.title}</h2>
        </Reveal>
        <Reveal delay={0.08} className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="grid gap-3 pt-2 sm:grid-cols-2">
            {about.points.map((p) => (
              <li key={p} className="flex gap-3 text-base">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section bg-slate-50/60 dark:bg-white/[0.02]">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Where I've worked</h2>
        </Reveal>
        <ol className="relative mt-14 space-y-8 border-l border-slate-200/80 pl-8 dark:border-white/10">
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.06} className="relative">
              <span className="timeline-dot" aria-hidden="true" />
              <article className="glass-card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {job.role} <span className="text-brand-700 dark:text-brand-400">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate-500 dark:text-slate-500">{job.period}</p>
                </div>
                {job.summary && <p className="mt-3 text-slate-600 dark:text-slate-400">{job.summary}</p>}
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 flex-none rounded bg-brand-500/80" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section bg-slate-50/60 dark:bg-white/[0.02]">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Skills</p>
          <h2 className="h2">Tools I work with</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.04}>
              <div className="glass-card h-full p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="skill-pill">{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-900 p-10 text-white sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
              <div className="aurora-mesh !opacity-60" />
            </div>
            <div className="relative max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{content.contact.title}</h2>
              <p className="mt-4 text-lg text-white/85">{content.contact.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton as="a" href={site.github} target="_blank" rel="noreferrer" className="btn bg-white text-slate-900 hover:bg-white/90">
                  <GitHubIcon className="h-4 w-4" /> github.com/hammadiqbal6
                </MagneticButton>
                <MagneticButton as="a" href={site.other.url} className="btn border border-white/30 text-white hover:bg-white/10">
                  {site.other.label} <ArrowIcon className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  useLenisScroll();
  const [cmdOpen, setCmdOpen] = useCommandPalette();
  const [dark, setDark] = useTheme();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header onOpenCommand={() => setCmdOpen(true)} dark={dark} setDark={setDark} />
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <ArchitectureDiagram />
        <BentoProjects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-slate-200/60 py-10 text-sm text-slate-500 dark:border-white/[0.06] dark:text-slate-500">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {site.name}. Built with React, Vite and Tailwind CSS.</p>
          <p>Case studies describe client and company work without private code or client names.</p>
        </div>
      </footer>
    </>
  );
}
