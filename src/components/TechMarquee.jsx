import content from '../content.js';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function TechMarquee() {
  const reduced = useReducedMotion();
  const items = content.techMarquee;

  if (reduced) {
    return (
      <section className="border-y border-slate-200/60 bg-slate-50/50 py-6 dark:border-white/[0.06] dark:bg-white/[0.02]" aria-label="Technologies">
        <ul className="container-x flex flex-wrap justify-center gap-2">
          {items.map((name) => (
            <li key={name} className="marquee-pill">{name}</li>
          ))}
        </ul>
      </section>
    );
  }

  const track = [...items, ...items];

  return (
    <section className="border-y border-slate-200/60 bg-slate-50/50 py-6 dark:border-white/[0.06] dark:bg-white/[0.02]" aria-label="Technologies">
      <div className="overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 px-3" aria-hidden="true">
          {track.map((name, i) => (
            <li key={`${name}-${i}`} className="marquee-pill">{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
