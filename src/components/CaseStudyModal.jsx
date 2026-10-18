import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GitHubIcon, LockIcon } from './icons';

function problemFromProject(p) {
  if (p.context) return `${p.context}. ${p.summary}`;
  return p.summary;
}

function solutionFromProject(p) {
  if (p.points?.length) return p.points;
  return [p.summary];
}

export function CaseStudyModal({ project, onClose }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          role="presentation"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/70" aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative m-0 w-full max-w-2xl max-h-[min(90vh,720px)] overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-0 shadow-2xl dark:border-white/10 dark:bg-[#111118]"
            initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.98 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            aria-labelledby="case-study-title"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-6 py-4 backdrop-blur dark:border-white/10 dark:bg-[#111118]/90">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600 dark:text-brand-400">{project.category}</p>
                <h2 id="case-study-title" className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                aria-label="Close case study"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="space-y-8 px-6 py-6">
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Problem</h3>
                <p className="mt-2 text-slate-700 dark:text-slate-300">{problemFromProject(project)}</p>
              </section>
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Solution</h3>
                <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
                  {solutionFromProject(project).map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1 w-3 flex-none rounded bg-brand-500" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Stack</h3>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.stack.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </section>
              <div className="flex flex-wrap gap-3 border-t border-slate-200/80 pt-6 dark:border-white/10">
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noreferrer" className="btn-primary">
                    <GitHubIcon className="h-4 w-4" /> View source
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <LockIcon className="h-4 w-4" /> Client work — source is private
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
