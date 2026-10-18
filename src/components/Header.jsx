import { useEffect, useState } from 'react';
import content from '../content.js';
import { CommandIcon, MoonIcon, SunIcon } from './icons';
import { MagneticButton } from './MagneticButton';

const { site, nav } = content;

export function Header({ onOpenCommand, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border,box-shadow] duration-300 ${
        scrolled
          ? 'border-b border-slate-200/70 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#09090b]/75'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <a href="#top" className="group flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 font-mono text-xs dark:border-white/10 dark:bg-white/5">
            <span className="absolute inset-0 bg-gradient-to-br from-brand-500/30 to-accent-500/20 opacity-80" aria-hidden="true" />
            <span className="relative">HI</span>
          </span>
          <span className="hidden sm:inline">{site.name}</span>
          <span className="chip hidden md:inline-flex">{site.badge}</span>
        </a>
        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-0.5 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="nav-link">{n.label}</a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={onOpenCommand} className="icon-btn hidden sm:grid" aria-label="Open command palette (Ctrl+K)">
            <CommandIcon className="h-4 w-4" />
            <kbd className="kbd ml-1 hidden lg:inline-flex">⌘K</kbd>
          </button>
          <MagneticButton
            as="button"
            type="button"
            onClick={() => setDark((d) => !d)}
            className="icon-btn theme-toggle"
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span className="theme-toggle-inner">
              {dark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
            </span>
          </MagneticButton>
          <button
            type="button"
            className="icon-btn md:hidden"
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
        <div id="mobile-menu" className="border-t border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#09090b]/95 md:hidden">
          <ul className="container-x flex flex-col py-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-medium text-slate-700 dark:text-slate-200">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => { onOpenCommand(); setOpen(false); }} className="w-full rounded-xl px-3 py-3 text-left font-medium text-slate-700 dark:text-slate-200">
                Command palette
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
