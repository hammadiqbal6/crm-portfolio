import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import content from '../content.js';
import { Reveal } from './Reveal';

const steps = [
  { id: 'emr', label: 'EMR', sub: 'Clinical records' },
  { id: 'mw', label: 'Middleware', sub: 'Laravel · REST' },
  { id: 'sf', label: 'Salesforce', sub: 'CRM cloud' },
  { id: 'sugar', label: 'SugarCRM', sub: 'Core platform' },
  { id: 'docusign', label: 'DocuSign', sub: 'E-signature' },
  { id: 'sharepoint', label: 'SharePoint', sub: 'Documents' },
];

export function ArchitectureDiagram() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % 4), 3200);
    return () => clearInterval(t);
  }, [reduced]);

  const { architecture } = content;

  return (
    <section className="section border-t border-slate-200/60 dark:border-white/[0.06]" aria-labelledby="architecture-title">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{architecture.eyebrow}</p>
          <h2 id="architecture-title" className="h2">{architecture.title}</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{architecture.caption}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-accent-500/10" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div className="space-y-3">
                {[
                  { title: 'Healthcare sync', desc: 'EMR ↔ middleware ↔ Salesforce with scheduled jobs on IIS.', index: 0 },
                  { title: 'Document hub', desc: 'SugarCRM dashlets linked to SharePoint libraries and search.', index: 1 },
                  { title: 'Contract lifecycle', desc: 'SugarCRM stages drive DocuSign envelopes and field locks.', index: 2 },
                  { title: 'Portal & mobile', desc: 'SuiteCRM APIs feed Next.js and React Native clients.', index: 3 },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setActive(item.index)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active === item.index
                        ? 'border-brand-500/40 bg-brand-500/10 shadow-sm'
                        : 'border-transparent hover:border-slate-200 hover:bg-slate-50/80 dark:hover:border-white/10 dark:hover:bg-white/[0.03]'
                    }`}
                  >
                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>

              <div className="relative min-h-[240px] rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/10 dark:bg-black/30">
                <svg viewBox="0 0 520 220" className="h-full w-full" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient id="flow" x1="0" x2="1">
                      <stop offset="0%" stopColor="rgb(var(--brand-500))" />
                      <stop offset="100%" stopColor="rgb(var(--accent-500))" />
                    </linearGradient>
                  </defs>
                  {active === 0 && (
                    <>
                      <Node x={40} y={90} label={steps[0].label} sub={steps[0].sub} />
                      <Node x={200} y={90} label={steps[1].label} sub={steps[1].sub} highlight />
                      <Node x={380} y={90} label={steps[2].label} sub={steps[2].sub} />
                      <FlowLine x1={120} x2={180} y={90} animate={!reduced} />
                      <FlowLine x1={300} x2={360} y={90} animate={!reduced} delay={0.4} />
                    </>
                  )}
                  {active === 1 && (
                    <>
                      <Node x={80} y={90} label={steps[3].label} sub={steps[3].sub} highlight />
                      <Node x={320} y={90} label={steps[5].label} sub={steps[5].sub} />
                      <FlowLine x1={160} x2={300} y={90} animate={!reduced} />
                    </>
                  )}
                  {active === 2 && (
                    <>
                      <Node x={120} y={90} label={steps[3].label} sub={steps[3].sub} highlight />
                      <Node x={340} y={90} label={steps[4].label} sub={steps[4].sub} />
                      <FlowLine x1={200} x2={320} y={90} animate={!reduced} />
                    </>
                  )}
                  {active === 3 && (
                    <>
                      <Node x={60} y={90} label="SuiteCRM" sub="API v4.1 / v8" highlight />
                      <Node x={240} y={50} label="Portal" sub="Next.js" />
                      <Node x={240} y={130} label="Mobile" sub="React Native" />
                      <Node x={400} y={90} label="Stripe" sub="Payments" />
                      <FlowLine x1={140} x2={220} y={70} animate={!reduced} />
                      <FlowLine x1={140} x2={220} y={110} animate={!reduced} delay={0.3} />
                      <FlowLine x1={300} x2={360} y={90} animate={!reduced} delay={0.5} />
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Node({ x, y, label, sub, highlight }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x="0"
        y="0"
        width="100"
        height="52"
        rx="10"
        className={highlight ? 'fill-brand-500/15 stroke-brand-500' : 'fill-white stroke-slate-300 dark:fill-white/5 dark:stroke-white/20'}
        strokeWidth="1.2"
      />
      <text x="50" y="22" textAnchor="middle" className="fill-slate-800 text-[11px] font-semibold dark:fill-white">
        {label}
      </text>
      <text x="50" y="38" textAnchor="middle" className="fill-slate-500 text-[9px] dark:fill-slate-400">
        {sub}
      </text>
    </g>
  );
}

function FlowLine({ x1, x2, y, animate, delay = 0 }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="url(#flow)" strokeWidth="2" opacity="0.35" />
      {animate && (
        <motion.circle
          r="4"
          fill="rgb(var(--brand-400))"
          initial={{ cx: x1, cy: y }}
          animate={{ cx: [x1, x2], cy: y }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay }}
        />
      )}
    </g>
  );
}
