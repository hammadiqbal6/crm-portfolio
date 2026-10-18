import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import content from '../content.js';

export function CommandPalette({ open, onClose, onToggleTheme, dark }) {
  const reduced = useReducedMotion();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const nav = content.nav.map((n) => ({ type: 'nav', label: `Go to ${n.label}`, href: n.href, keywords: n.label }));
    const projects = content.projects.map((p) => ({
      type: 'project',
      label: p.title,
      href: '#projects',
      keywords: `${p.title} ${p.category} ${p.stack.join(' ')}`,
    }));
    const actions = [
      { type: 'action', label: dark ? 'Switch to light theme' : 'Switch to dark theme', action: 'theme', keywords: 'theme dark light' },
      { type: 'action', label: 'Open GitHub profile', href: content.site.github, keywords: 'github' },
    ];
    return [...nav, ...projects, ...actions];
  }, [dark]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items.filter((i) => i.label.toLowerCase().includes(q) || i.keywords.toLowerCase().includes(q)).slice(0, 12);
  }, [items, query]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const run = (item) => {
    if (item.action === 'theme') {
      onToggleTheme();
      onClose();
      return;
    }
    if (item.href?.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[12vh] sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/60" aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-white/10 dark:bg-[#12121a]"
            initial={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -4, scale: reduced ? 1 : 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 dark:border-white/10">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="cmd-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections and case studies…"
                className="w-full bg-transparent py-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                autoComplete="off"
              />
              <kbd className="kbd hidden sm:inline-flex">Esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto p-2" role="listbox">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">No matches</li>}
              {filtered.map((item) => (
                <li key={`${item.type}-${item.label}`}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5"
                    onClick={() => run(item)}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] uppercase text-slate-400">{item.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return [open, setOpen];
}
