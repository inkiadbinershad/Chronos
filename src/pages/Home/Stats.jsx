import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';

function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const inc = target / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { label: 'Est. Year', value: 1887, suffix: '' },
  { label: 'Master Craftsmen', value: 240, suffix: '+' },
  { label: 'Satisfied Clients', value: 98000, suffix: '' },
  { label: 'Countries Served', value: 47, suffix: '' },
];

export default function Stats() {
  const [ref, inView] = useInView(0.2);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .8, ease: [0.25,0.46,0.45,0.94] }}
      style={{
        background: 'var(--mahogany)',
        padding: '3.5rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: '2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {STATS.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6, delay: i * .12, ease: [0.25,0.46,0.45,0.94] }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem', fontWeight: 300, color: 'var(--gold)', lineHeight: 1,
          }}>
            <Counter target={s.value} suffix={s.suffix} />
          </div>
          <div style={{
            fontSize: '.65rem', letterSpacing: '.25em',
            textTransform: 'uppercase', color: 'var(--muted)', marginTop: '.5rem',
          }}>{s.label}</div>
        </motion.div>
      ))}
      <style>{`@media(max-width:700px){div[style*='repeat(4']{grid-template-columns:repeat(2,1fr)!important;padding:2.5rem 2rem!important;}}`}</style>
    </motion.div>
  );
}
