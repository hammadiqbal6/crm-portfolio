import { useEffect, useMemo, useState } from 'react';
import content from './content.js';

const { site, about, experience, projects, skills, nav } = content;

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
function SunIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}
function ArrowIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
function LockIcon(p) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
      /* storage unavailable */
    }
  }, [dark]);
  return [dark, setDark];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Header() {
  const [dark, setDark] = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b1020]/80' : ''
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#top" className="group flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 font-mono text-sm text-white shadow">
            HI
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="chip hidden md:inline-flex">{site.badge}</span>
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-300"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-[#0b1020]/95 md:hidden">
          <ul className="container-x flex flex-col py-3">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-slate-700 dark:text-slate-200">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="blob pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/30" aria-hidden="true" />
      <div className="blob pointer-events-none absolute right-0 top-40 h-60 w-60 rounded-full bg-accent-500/20" style={{ animationDelay: '-6s' }} aria-hidden="true" />
      <div className="container-x relative pb-20 sm:pb-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {site.status}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          {site.headline[0]}{' '}
          <span className="bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400 bg-clip-text text-transparent">{site.headline[1]}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{site.intro}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">
            {site.primaryCta}
          </a>
          <a href={site.github} className="btn-ghost" target="_blank" rel="noreferrer">
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
          <a href={site.other.url} className="btn-ghost">
            {site.other.label} <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {site.facts.map((f) => (
            <div key={f.label} className="card p-4">
              <dt className="text-xs text-slate-500 dark:text-slate-400">{f.label}</dt>
              <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section border-t border-slate-200/70 dark:border-white/5">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="reveal">
          <p className="eyebrow">About</p>
          <h2 className="h2">{about.title}</h2>
        </div>
        <div className="reveal space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
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
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section bg-slate-50/70 dark:bg-white/[0.015]">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Where I've worked</h2>
        </div>
        <ol className="relative mt-14 space-y-10 border-l border-slate-200 pl-8 dark:border-white/10">
          {experience.map((job) => (
            <li key={job.company + job.period} className="reveal relative">
              <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border-4 border-white bg-brand-500 dark:border-[#0b1020]" aria-hidden="true" />
              <div className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {job.role} <span className="text-brand-600 dark:text-brand-400">· {job.company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate-500 dark:text-slate-400">{job.period}</p>
                </div>
                {job.summary && <p className="mt-3 text-slate-600 dark:text-slate-300">{job.summary}</p>}
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 flex-none rounded bg-brand-400" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                  {job.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/10">
      <div className="flex items-start justify-between gap-3">
        <span className="chip !border-brand-500/30 !bg-brand-500/10 !text-brand-700 dark:!text-brand-300">{p.category}</span>
        {p.repo ? (
          <span className="chip">Open source</span>
        ) : (
          <span className="chip gap-1" title="Client or company work; source is private">
            <LockIcon className="h-3 w-3" /> Case study
          </span>
        )}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
      {p.context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.context}</p>}
      <p className="mt-3 text-slate-600 dark:text-slate-300">{p.summary}</p>
      {p.points && (
        <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          {p.points.map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-brand-500" aria-hidden="true">▹</span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {p.stack.map((s) => (
          <li key={s} className="chip">{s}</li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 pt-6">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300">
            <GitHubIcon className="h-4 w-4" /> Source <span className="sr-only">for {p.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}

function Projects() {
  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);
  return (
    <section id="projects" className="section">
      <div className="container-x">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">{content.projectsEyebrow}</p>
            <h2 className="h2">{content.projectsTitle}</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300">{content.projectsNote}</p>
          </div>
        </div>
        <div className="reveal mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c
                  ? 'bg-brand-600 text-white shadow shadow-brand-600/30'
                  : 'border border-slate-200 text-slate-600 hover:border-brand-500 dark:border-white/10 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shown.length} projects
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section bg-slate-50/70 dark:bg-white/[0.015]">
      <div className="container-x">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">Skills</p>
          <h2 className="h2">Tools I work with</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <div key={g.group} className="card reveal p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">{g.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li key={s} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
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
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-10 text-white shadow-2xl sm:p-14">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/80">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{content.contact.title}</h2>
            <p className="mt-4 text-lg text-white/90">{content.contact.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.github} target="_blank" rel="noreferrer" className="btn bg-white text-brand-700 hover:bg-white/90">
                <GitHubIcon className="h-4 w-4" /> github.com/hammadiqbal6
              </a>
              <a href={site.other.url} className="btn border border-white/40 text-white hover:bg-white/10">
                {site.other.label} <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-slate-200/70 py-10 text-sm text-slate-500 dark:border-white/5 dark:text-slate-400">
        <div className="container-x flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {site.name}. Built with React, Vite and Tailwind CSS.</p>
          <p>
            Case studies describe client and company work without private code or client names.
          </p>
        </div>
      </footer>
    </>
  );
}
