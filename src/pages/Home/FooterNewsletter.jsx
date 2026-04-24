import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../components/ui/useInView';
import { useCart } from '../../context/CartContext';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { showToast } = useCart();
  const [ref, inView] = useInView(0.2);

  const submit = () => {
    if (!email || !email.includes('@')) { showToast('Please enter a valid email address'); return; }
    setEmail('');
    showToast('Welcome to the Chronos Private Circle');
  };

  return (
    <section id="contact" style={{ padding: '6rem 5rem', textAlign: 'center' }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: .8 }}
        style={{ maxWidth: '560px', margin: '0 auto' }}
      >
        <div className="label" style={{ justifyContent: 'center' }}>Private Circle</div>
        <h2 className="display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', marginBottom: '1rem' }}>
          Join The <em className="gold italic">Atelier</em>
        </h2>
        <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.85, marginBottom:'2rem' }}>
          Receive first access to new collections, exclusive events, and the art of fine watchmaking.
        </p>
        <div style={{ display:'flex', border:'1px solid var(--border-hover)' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Your email address"
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              padding:'.9rem 1.4rem', color:'var(--cream)',
              fontFamily:'var(--font-body)', fontSize:'.85rem',
            }}
          />
          <motion.button
            whileHover={{ background: 'var(--gold-light)' }}
            whileTap={{ scale: .97 }}
            onClick={submit}
            style={{
              background:'var(--gold)', border:'none', color:'var(--espresso)',
              padding:'.9rem 1.8rem', fontFamily:'var(--font-body)',
              fontSize:'.68rem', letterSpacing:'.22em', textTransform:'uppercase',
              fontWeight:500, whiteSpace:'nowrap',
            }}
          >
            Subscribe
          </motion.button>
        </div>
        <p style={{ fontSize:'.68rem', color:'var(--dim)', marginTop:'.8rem', letterSpacing:'.1em' }}>
          Your privacy is sacred to us. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{
      background: 'var(--espresso)',
      borderTop: '1px solid var(--border)',
      padding: '4rem 5rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '3rem',
        marginBottom: '3rem',
      }}>
        <div>
          <div style={{ fontFamily:'var(--font-title)', fontSize:'1.35rem', letterSpacing:'.38em', color:'var(--gold)', marginBottom:'1rem' }}>
            CHRONOS
          </div>
          <p style={{ color:'var(--muted)', fontSize:'.82rem', lineHeight:1.85, maxWidth:'260px' }}>
            Purveyors of exceptional timepieces since 1887. Crafted in the heart of Switzerland
            for those who understand that true luxury is measured in permanence.
          </p>
        </div>
        {[
          { heading: 'Collections', links: ['Classic Gentleman','Sport Prestige','Ladies Élégance','Limited Editions'] },
          { heading: 'Services', links: ['Watch Servicing','Bespoke Engraving','Authentication','Trade-In Programme'] },
          { heading: 'Atelier', links: ['Our Heritage','Careers','Press','Contact Us'] },
        ].map(col => (
          <div key={col.heading}>
            <div style={{ fontSize:'.62rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'1.2rem' }}>
              {col.heading}
            </div>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'.6rem' }}>
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" style={{ color:'var(--muted)', fontSize:'.82rem', transition:'color .3s' }}
                    onMouseEnter={e=>e.target.style.color='var(--gold)'}
                    onMouseLeave={e=>e.target.style.color='var(--muted)'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ fontSize:'.7rem', color:'var(--muted)', letterSpacing:'.1em' }}>
          © 2024 Chronos Horlogerie SA · All rights reserved · Geneva, Switzerland
        </div>
        <div style={{ display:'flex', gap:'.8rem' }}>
          {['IG','FB','TW','YT'].map(s => (
            <motion.a
              key={s} href="#"
              whileHover={{ borderColor:'var(--gold)', color:'var(--gold)', background:'rgba(201,169,110,.08)' }}
              style={{
                width:'34px', height:'34px',
                border:'1px solid var(--border)',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'var(--muted)', fontSize:'.72rem', transition:'all .3s',
              }}
            >{s}</motion.a>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          footer > div:first-child{grid-template-columns:1fr 1fr!important;}
          footer{padding:3rem 2rem!important;}
        }
        @media(max-width:500px){
          footer > div:first-child{grid-template-columns:1fr!important;}
        }
      `}</style>
    </footer>
  );
}
