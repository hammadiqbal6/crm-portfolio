import { motion, useReducedMotion } from 'framer-motion';

export function KineticHeading({ as = 'h1', className = '', children, delay = 0 }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.h1;
  const text = typeof children === 'string' ? children : null;

  if (!text || reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const words = text.split(/(\s+)/);

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) =>
        word.trim() === '' ? (
          word
        ) : (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ),
      )}
    </Tag>
  );
}
