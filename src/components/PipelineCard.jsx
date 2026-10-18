// Static "Pipeline view" illustration, ported from the PR #2 redesign without its animation.
const nodes = [
  { id: 'leads', label: 'Leads', x: 40, y: 120 },
  { id: 'crm', label: 'CRM', x: 160, y: 80, accent: true },
  { id: 'workflow', label: 'Workflows', x: 280, y: 40 },
  { id: 'docs', label: 'Documents', x: 280, y: 140 },
  { id: 'sync', label: 'Sync', x: 400, y: 90 },
];
const edges = [
  ['leads', 'crm'],
  ['crm', 'workflow'],
  ['crm', 'docs'],
  ['workflow', 'sync'],
  ['docs', 'sync'],
];
const byId = (id) => nodes.find((n) => n.id === id);

export function PipelineCard() {
  return (
    <figure className="card p-5">
      <figcaption className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Pipeline view</figcaption>
      <svg viewBox="0 0 480 200" className="mt-3 h-auto w-full" role="img" aria-label="CRM data flow: leads into the CRM, through workflows and documents, out to external sync">
        <defs>
          <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(var(--brand-500))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(var(--accent-500))" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {edges.map(([a, b]) => {
          const A = byId(a);
          const B = byId(b);
          const d = `M ${A.x + 36} ${A.y + 8} C ${(A.x + B.x) / 2} ${A.y - 20}, ${(A.x + B.x) / 2} ${B.y + 30}, ${B.x} ${B.y + 8}`;
          return (
            <g key={`${a}-${b}`}>
              <path d={d} fill="none" stroke="url(#pipe-grad)" strokeWidth="2" />
              <circle cx={B.x} cy={B.y + 8} r="3" fill="rgb(var(--brand-400))" />
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
            <path d="M0 20 L36 8 L72 20 L36 32 Z" className={n.accent ? 'fill-brand-500/20 stroke-brand-500' : 'fill-white/80 stroke-slate-300 dark:fill-white/5 dark:stroke-white/20'} strokeWidth="1.2" />
            <path d="M0 20 L0 44 L36 56 L36 32 Z" className="fill-slate-100 stroke-slate-300 dark:fill-white/[0.03] dark:stroke-white/15" strokeWidth="1" />
            <path d="M36 32 L36 56 L72 44 L72 20 Z" className="fill-slate-50 stroke-slate-300 dark:fill-white/[0.02] dark:stroke-white/10" strokeWidth="1" />
            <text x="36" y="68" textAnchor="middle" className="fill-slate-700 text-[10px] font-medium dark:fill-slate-200">{n.label}</text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
