import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';

const FEATURES = [
  { icon: '✦', title: 'Swiss Certified', desc: 'Every movement certified by the Official Swiss Chronometer Testing Institute.' },
  { icon: '⟡', title: 'Lifetime Warranty', desc: 'Comprehensive warranty coverage with complimentary servicing for life.' },
  { icon: '◈', title: 'Bespoke Service', desc: 'White-glove personalisation and engraving available on all timepieces.' },
  { icon: '⊕', title: 'Secure Delivery', desc: 'Fully insured shipping in hand-crafted presentation boxes worldwide.' },
];

export default function Features() {
  const [ref, inView] = useInView(0.2);

  return (
    <div
      style={{
        background: 'var(--mahogany)',
        padding: '4rem 5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: '2rem',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
      ref={ref}
    >
      {FEATURES.map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: .6, delay: i * .12 }}
          style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}
        >
          <motion.div
            whileHover={{ borderColor: 'var(--gold)', color: 'var(--gold-light)' }}
            style={{
              width: '40px', height: '40px', flexShrink: 0,
              border: '1px solid var(--border-hover)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold)', fontSize: '1rem', transition: 'all .3s',
            }}
          >{f.icon}</motion.div>
          <div>
            <div style={{ fontSize:'.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--cream)', marginBottom:'.3rem' }}>
              {f.title}
            </div>
            <div style={{ fontSize:'.78rem', color:'var(--muted)', lineHeight:1.65 }}>{f.desc}</div>
          </div>
        </motion.div>
      ))}
      <style>{`
        @media(max-width:900px){div[style*='repeat(4,1fr)'][style*='4rem 5rem']{grid-template-columns:1fr 1fr!important;padding:3rem 2rem!important;}}
        @media(max-width:500px){div[style*='repeat(4,1fr)'][style*='4rem 5rem']{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}
