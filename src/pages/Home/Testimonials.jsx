import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';
import { TESTIMONIALS } from '../../data';

export default function Testimonials() {
  const [ref, inView] = useInView(0.1);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section style={{ background: 'var(--mahogany)', padding: '5rem 0', overflow: 'hidden' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .8 }}
        style={{ padding: '0 5rem', marginBottom: '3rem' }}
      >
        <div className="label">Client Voices</div>
        <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)' }}>
          Words of <em className="gold italic">Appreciation</em>
        </h2>
      </motion.div>

      {/* TRACK */}
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
          style={{
            display: 'flex', gap: '1.2rem',
            width: 'max-content',
          }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {doubled.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, borderColor: 'var(--border-hover)' }}
              transition={{ duration: .3 }}
              style={{
                background: 'var(--deep)',
                padding: '2rem 2.2rem',
                width: '310px', flexShrink: 0,
                border: '1px solid var(--border)',
                transition: 'border-color .3s',
              }}
            >
              <div style={{ color:'var(--gold)', fontSize:'.78rem', letterSpacing:'.1em', marginBottom:'.9rem' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{
                fontFamily:'var(--font-display)', fontSize:'1rem',
                fontStyle:'italic', color:'var(--cream)', lineHeight:1.7, marginBottom:'1.2rem',
              }}>
                "{t.text}"
              </p>
              <div style={{ fontSize:'.68rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)' }}>
                {t.name}
              </div>
              <div style={{ fontSize:'.62rem', color:'var(--gold)', marginTop:'.2rem' }}>{t.watch} · {t.location}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
