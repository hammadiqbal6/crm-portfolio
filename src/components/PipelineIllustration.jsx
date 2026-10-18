import { motion, useReducedMotion } from 'framer-motion';

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

function nodeById(id) {
  return nodes.find((n) => n.id === id);
}

export function PipelineIllustration() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 460 200"
      className="h-full w-full max-h-[220px] text-slate-500 dark:text-slate-400"
      role="img"
      aria-label="Isometric CRM data flow from leads through workflows to external sync"
    >
      <defs>
        <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(var(--brand-500))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="rgb(var(--accent-500))" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {edges.map(([a, b], i) => {
        const A = nodeById(a);
        const B = nodeById(b);
        if (!A || !B) return null;
        const path = `M ${A.x + 36} ${A.y + 8} C ${(A.x + B.x) / 2} ${A.y - 20}, ${(A.x + B.x) / 2} ${B.y + 30}, ${B.x} ${B.y + 8}`;
        return (
          <g key={`${a}-${b}`}>
            <path d={path} fill="none" stroke="url(#pipe-grad)" strokeWidth="2" opacity="0.5" />
            {!reduced && (
              <motion.circle
                r="3"
                fill="rgb(var(--brand-400))"
                filter="url(#glow)"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 2.8 + i * 0.3, repeat: Infinity, ease: 'linear' }}
                style={{ offsetPath: `path('${path}')` }}
              />
            )}
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
          <path
            d="M0 20 L36 8 L72 20 L36 32 Z"
            className={n.accent ? 'fill-brand-500/20 stroke-brand-500' : 'fill-white/80 stroke-slate-300 dark:fill-white/5 dark:stroke-white/20'}
            strokeWidth="1.2"
          />
          <path d="M0 20 L0 44 L36 56 L36 32 Z" className="fill-slate-100 stroke-slate-300 dark:fill-white/[0.03] dark:stroke-white/15" strokeWidth="1" />
          <path d="M36 32 L36 56 L72 44 L72 20 Z" className="fill-slate-50 stroke-slate-300 dark:fill-white/[0.02] dark:stroke-white/10" strokeWidth="1" />
          <text x="36" y="48" textAnchor="middle" className="fill-slate-700 text-[9px] font-medium dark:fill-slate-200">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
