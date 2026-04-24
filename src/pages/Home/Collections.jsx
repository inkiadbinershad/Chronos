import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';
import { COLLECTIONS } from '../../data';

export default function Collections() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="collections" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .8, ease: [0.25,0.46,0.45,0.94] }}
        style={{ marginBottom: '3rem' }}
      >
        <div className="label">Discover</div>
        <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', marginBottom: '.8rem' }}>
          The <em className="gold italic">Signature</em> Series
        </h2>
        <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.85, maxWidth:'480px' }}>
          Three distinct worlds of horological excellence, each bearing the hallmarks
          of Chronos' uncompromising standards.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: '1.2rem',
      }}>
        {COLLECTIONS.map((col, i) => (
          <CollectionCard key={col.id} col={col} delay={i * .15} />
        ))}
      </div>

      <style>{`
        @media(max-width:900px){
          div[style*='repeat(3,1fr)']{grid-template-columns:1fr!important;}
        }
      `}</style>
    </section>
  );
}

function CollectionCard({ col, delay }) {
  const [ref, inView] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: .75, delay, ease: [0.25,0.46,0.45,0.94] }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
      }}
      whileHover="hover"
    >
      {/* IMAGE */}
      <motion.img
        src={col.img}
        alt={col.name}
        loading="lazy"
        style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.55) saturate(.7)' }}
        variants={{ hover: { scale: 1.06, filter: 'brightness(.42) saturate(.65)' } }}
        transition={{ duration: .7 }}
      />

      {/* OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(12,7,4,.88) 0%, transparent 55%)',
      }} />

      {/* CONTENT */}
      <div style={{ position:'absolute', bottom:'2rem', left:'2rem', right:'2rem' }}>
        <div style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'.5rem' }}>
          {col.label}
        </div>
        <div style={{
          fontFamily:'var(--font-display)', fontSize:'1.85rem',
          fontWeight:400, color:'var(--cream)', lineHeight:1.2, marginBottom:'.8rem',
        }}>
          {col.name}
        </div>
        <p style={{ fontSize:'.78rem', color:'rgba(250,246,239,.6)', lineHeight:1.6, marginBottom:'1rem' }}>
          {col.desc}
        </p>
        <motion.a
          href="#shop"
          variants={{ hover: { opacity: 1, y: 0 } }}
          initial={{ opacity: 0, y: 10 }}
          style={{
            fontSize:'.62rem', letterSpacing:'.25em', textTransform:'uppercase',
            color:'var(--gold)', display:'inline-flex', alignItems:'center', gap:'.5rem',
          }}
        >
          Explore Collection →
        </motion.a>
      </div>

      {/* CORNER ACCENT */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        style={{
          position: 'absolute', top: '1.2rem', right: '1.2rem',
          width: '36px', height: '36px',
          border: '1px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <span style={{ color:'var(--gold)', fontSize:'.8rem' }}>✦</span>
      </motion.div>
    </motion.div>
  );
}
