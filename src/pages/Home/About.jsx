import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';

export default function About() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="craftsmanship" className="section">
      <div
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
      >
        {/* IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .9, ease: [0.25,0.46,0.45,0.94] }}
          style={{ position: 'relative', height: '580px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=85&auto=format&fit=crop"
            alt="Watchmaker at work"
            loading="lazy"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '75%', height: '80%', objectFit: 'cover',
              filter: 'brightness(.8) saturate(.75)',
            }}
          />
          <motion.img
            src="https://images.unsplash.com/photo-1509941943102-10c232535736?w=500&q=85&auto=format&fit=crop"
            alt="Watch movement"
            loading="lazy"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: .9, delay: .25 }}
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: '55%', height: '55%', objectFit: 'cover',
              filter: 'brightness(.7) saturate(.7)',
              border: '3px solid var(--mahogany)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: .6, delay: .4 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              background: 'var(--mahogany)',
              border: '1px solid var(--border-hover)',
              padding: '1.2rem 1.6rem',
              textAlign: 'center', zIndex: 2,
            }}
          >
            <div style={{ fontFamily:'var(--font-display)', fontSize:'3rem', color:'var(--gold)', fontWeight:300, lineHeight:1 }}>137</div>
            <div style={{ fontSize:'.6rem', letterSpacing:'.32em', textTransform:'uppercase', color:'var(--muted)', marginTop:'.3rem' }}>Years of Mastery</div>
          </motion.div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: .9, delay: .15, ease: [0.25,0.46,0.45,0.94] }}
        >
          <div className="label">Our Heritage</div>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', marginBottom: '1.2rem' }}>
            Crafted With<br /><em className="gold italic">Obsession</em>
          </h2>
          <blockquote style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem', fontStyle: 'italic', fontWeight: 300,
            color: 'var(--gold-light)', lineHeight: 1.65,
            borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem',
            margin: '1.8rem 0',
          }}>
            "Time is the most precious currency. We exist to honour it."
            <footer style={{
              fontFamily:'var(--font-body)', fontSize:'.68rem', letterSpacing:'.22em',
              textTransform:'uppercase', color:'var(--muted)', marginTop:'.7rem', fontStyle:'normal',
            }}>
              — Henri Beaumont, Founder
            </footer>
          </blockquote>
          <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.95, marginBottom:'1rem' }}>
            Since 1887, the Chronos atelier in the Vallée de Joux has operated under a singular philosophy:
            that a timepiece must transcend its function. Each watch passes through the hands of no fewer
            than eighteen master craftsmen before it earns the right to bear our signature.
          </p>
          <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.95, marginBottom:'2rem' }}>
            Our movements are assembled under magnification, measured in microns, and tested for no less
            than 500 hours before certification. This is not manufacturing. This is devotion.
          </p>
          <a href="#shop" className="btn-primary">Discover Timepieces</a>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){
          div[style*='1fr 1fr'][style*='6rem']{grid-template-columns:1fr!important;gap:3rem!important;}
          div[style*='height: 580px']{height:320px!important;}
        }
      `}</style>
    </section>
  );
}
