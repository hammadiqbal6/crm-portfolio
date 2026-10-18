import { useMemo, useState } from 'react';
import content from '../content.js';
import { LockIcon } from './icons';
import { Reveal } from './Reveal';
import { SpotlightCard } from './SpotlightCard';
import { CaseStudyModal } from './CaseStudyModal';

const { projects } = content;

function bentoClass(index, featured) {
  if (featured) return 'md:col-span-2 md:row-span-2';
  if (index % 7 === 3) return 'md:col-span-2';
  return '';
}

export function BentoProjects() {
  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], []);
  const [cat, setCat] = useState('All');
  const [selected, setSelected] = useState(null);
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);

  const featuredTitles = new Set([
    'EMR ↔ Salesforce sync middleware',
    'SuiteCRM back end for e-commerce',
    'SuiteCRM MCP servers',
  ]);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{content.projectsEyebrow}</p>
          <h2 className="h2">{content.projectsTitle}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{content.projectsNote}</p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 dark:bg-white dark:text-slate-900'
                  : 'border border-slate-200/80 text-slate-600 hover:border-brand-500/40 dark:border-white/10 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <p className="sr-only" aria-live="polite">Showing {shown.length} projects</p>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {shown.map((p, i) => {
            const featured = featuredTitles.has(p.title);
            return (
              <Reveal key={p.title} delay={0.03 * (i % 6)} className={bentoClass(i, featured)}>
                <SpotlightCard
                  as="button"
                  type="button"
                  className={`h-full min-h-[200px] w-full text-left ${featured ? 'p-8' : 'p-6'}`}
                  onClick={() => setSelected(p)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="chip !border-brand-500/25 !bg-brand-500/10 !text-brand-700 dark:!text-brand-300">{p.category}</span>
                    {p.repo ? (
                      <span className="chip">Open source</span>
                    ) : (
                      <span className="chip gap-1">
                        <LockIcon className="h-3 w-3" /> Case study
                      </span>
                    )}
                  </div>
                  <h3 className={`mt-4 font-semibold text-slate-900 dark:text-white ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{p.title}</h3>
                  {p.context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.context}</p>}
                  <p className={`mt-3 text-slate-600 dark:text-slate-400 ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {p.stack.slice(0, featured ? 6 : 4).map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-5 text-sm font-medium text-brand-700 dark:text-brand-300">View details →</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
      <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
