import { useRef, useState } from 'react';
import clsx from 'clsx';

export function SpotlightCard({ children, className = '', onClick, as = 'div', ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const Component = as;

  return (
    <Component
      ref={ref}
      onMouseMove={onMove}
      onClick={onClick}
      className={clsx('spotlight-card glass-card group relative overflow-hidden', className)}
      style={{
        '--spot-x': `${pos.x}%`,
        '--spot-y': `${pos.y}%`,
      }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 spotlight-gradient" aria-hidden="true" />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </Component>
  );
}
