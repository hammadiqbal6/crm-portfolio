import { useReducedMotion } from '../hooks/useReducedMotion';

export function AuroraMesh() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="aurora-mesh absolute -inset-[40%] opacity-70 dark:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-[#09090b]/20 dark:to-[#09090b]" />
      <div className="grid-fade absolute inset-0" />
      {!reduced && <div className="noise-overlay absolute inset-0 opacity-[0.35] dark:opacity-[0.2]" />}
    </div>
  );
}
