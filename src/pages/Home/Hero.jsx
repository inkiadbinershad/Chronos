import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: .9, delay, ease: [0.25,0.46,0.45,0.94] },
});

export default function Hero() {
  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: '700px',
      display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      {/* BG */}
      <motion.div
        initial={{ scale: 1.08 }} animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
backgroundImage: `url('data:image/jpeg;base64,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')`,
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          filter: 'brightness(.42) saturate(.75)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(110deg, rgba(12,7,4,.88) 0%, rgba(12,7,4,.4) 55%, transparent 100%)',
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 5rem', maxWidth: '740px', marginTop: '3rem',
      }}>
        <motion.div {...fade(.3)} style={{
          fontSize: '.65rem', letterSpacing: '.42em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '1.8rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <span style={{ display:'block', width:'40px', height:'1px', background:'var(--gold)' }} />
          Est. 1887 · Swiss Craftsmanship · Geneva
        </motion.div>

        <motion.h1 {...fade(.5)} style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--warm-white)', marginBottom: '1.4rem',
        }}>
          Where Time<br />Becomes{' '}
          <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Art</em>
        </motion.h1>

        <motion.p {...fade(.7)} style={{
          fontSize: '.9rem', lineHeight: 1.85,
          color: 'rgba(250,246,239,.62)', maxWidth: '440px', marginBottom: '3rem',
        }}>
          Each Chronos timepiece is a testament to over a century of horological mastery.
          Precision engineered, beautifully refined, eternally yours.
        </motion.p>

        <motion.div {...fade(.9)} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#shop" className="btn-primary">Explore Collection</a>
          <a href="#craftsmanship" className="btn-ghost">Our Heritage</a>
        </motion.div>
      </div>

      {/* SCROLL HINT */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem',
        }}
      >
        <span style={{ fontSize:'.58rem', letterSpacing:'.38em', textTransform:'uppercase', color:'var(--muted)' }}>Scroll</span>
        <motion.div
          animate={{ scaleY: [1, 1.2, 1], opacity: [.4, 1, .4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(var(--gold), transparent)' }}
        />
      </motion.div>

      <style>{`
        @media(max-width:900px){
          section > div[style*='padding']{padding:0 2rem!important;}
        }
      `}</style>
    </section>
  );
}
