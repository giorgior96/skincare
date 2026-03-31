import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Zap, ChevronRight, CheckCircle2, FlaskConical, Stethoscope, Star, ArrowRight } from 'lucide-react';
import heroVideo from './assets/BROS_cream_jar_202603311348.mp4';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function App() {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const EmailForm = ({ id }) => (
    <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <input type="email" id={id} placeholder="La tua email..." className="input-field" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#0b1120', width: '100%', outline: 'none' }} required />
      <button type="submit" className="btn btn-accent" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.1rem' }}>
        AVVISAMI <ArrowRight size={20} style={{ marginLeft: '8px' }}/>
      </button>
    </form>
  );

  return (
    <div ref={containerRef} style={{ position: 'relative', overflowX: 'hidden' }}>
      {/* Due Step Opt-in Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: '#ffffff', padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '1.5rem', width: '90%', maxWidth: '500px', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0b1120', padding: '0.5rem' }}>✕</button>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 900, color: '#0b1120', textTransform: 'uppercase' }}>SEI DENTRO.</h3>
            <p style={{ marginBottom: '2rem', color: '#475569', fontSize: '1.1rem', fontWeight: 500 }}>Lascia la tua email per entrare nella waiting list ufficiale. Sblocchiamo lo sconto e l'accesso prioritario ai primi 500 iscritti.</p>
            <EmailForm id="popup-email" />
            <p style={{ fontSize: '0.85rem', marginTop: '1.5rem', color: '#94a3b8' }}>Nessun trucco, niente spam. Puoi disiscriverti in qualsiasi momento.</p>
          </motion.div>
        </div>
      )}
      {/* Navbar */}
      <nav className="navbar" style={{ position: 'absolute', top: 0, width: '100%', zIndex: 100 }}>
        <div className="container nav-content">
          <div className="logo" style={{ color: '#0b1120', fontSize: '1.8rem' }}>
            BROS<span>.</span>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', border: '2px solid #0b1120', color: '#0b1120', borderRadius: '999px', background: 'transparent' }}>
            Lista d'attesa
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION (Conversion Optimized) */}
      <section className="section hero" style={{ backgroundColor: '#ffffff', color: '#0b1120', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: '7rem', overflow: 'hidden' }}>
        
        {/* Full Bleed Background Video */}
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }} 
        />
        
        {/* Removed Linear Gradient layer to replace it with a focused glass frame */}

        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: '650px', padding: 'clamp(1.5rem, 5vw, 3rem)', background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 'clamp(1rem, 3vw, 2rem)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 40px 80px rgba(0,0,0,0.05)' }}>
            
            <motion.p variants={fadeIn} style={{ color: 'var(--brand-accent)', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'inline-block', background: '#0b1120', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>
              Skincare essenziale per Gen-Z
            </motion.p>
            <motion.h1 variants={fadeIn} className="hero-title" style={{ color: '#0b1120', fontSize: 'clamp(2rem, 10vw, 5.5rem)', textTransform: 'uppercase', lineHeight: 0.9, overflowWrap: 'break-word', wordWrap: 'break-word' }}>
              LA SKINCARE<br/> <span style={{ color: 'transparent', WebkitTextStroke: '2px #0b1120' }}>DA UOMO</span><br/> SENZA GIRI DI PAROLE.
            </motion.h1>
            <motion.p variants={fadeIn} style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#475569', maxWidth: '400px', marginTop: '1.5rem', fontWeight: 500, lineHeight: 1.4 }}>
              Diciamocelo. Non hai voglia di passare 20 minuti davanti allo specchio. BROS è la routine da 2 minuti, progettata per i ragazzi che vogliono pelle pulita e zero sbattimenti.
            </motion.p>

            <motion.div variants={fadeIn} style={{ marginTop: '2rem' }}>
              {/* TWO STEP LEAD GEN */}
              <button onClick={() => setIsModalOpen(true)} className="btn btn-accent" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                SONO INTERESSATO <ArrowRight size={20} style={{ marginLeft: '8px' }}/>
              </button>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#64748b', fontWeight: 600 }}>
                ⚡️ Iscriviti per sbloccare lo sconto (Solo 500 posti)
              </p>
            </motion.div>
            
          </motion.div>
        </div>
      </section>

      {/* 2. IL PROBLEMA (Impact Typography) */}
      <section className="section" style={{ background: '#020617', color: 'white' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} style={{ maxWidth: '900px', margin: '0 auto' }}>
            
            <div className="grid-2" style={{ alignItems: 'flex-start' }}>
              {/* Left text column */}
              <div>
                <motion.h2 variants={fadeIn} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '4rem', lineHeight: 1, fontWeight: 900, textTransform: 'uppercase' }}>
                  SIAMO ONESTI. LE STIAMO PROVANDO TUTTE... <span style={{ color: 'var(--brand-accent)' }}>MALE.</span>
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr)', gap: '3rem' }}>
                  {[
                    { icon: Droplets, title: "IL BAGNOSCHIUMA", desc: "No bro, non va in faccia. Ti nuclearizza la pelle e la fa tirare." },
                    { icon: ShieldCheck, title: "QUELLA RUBATA", desc: "La crema fighissima da donna ti fa sembrare una palla da bowling unta e lucida." },
                    { icon: Zap, title: "TROPPO SBATTI", desc: "I tutorial su TikTok con 10 passaggi sono roba da pazzi. Non abbiamo tempo." }
                  ].map((item, idx) => (
                    <motion.div key={idx} variants={fadeIn} style={{ borderLeft: '4px solid var(--brand-accent)', paddingLeft: '1.5rem' }}>
                      <item.icon size={36} color="var(--brand-accent)" style={{ marginBottom: '1rem' }} />
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 900 }}>{item.title}</h3>
                      <p style={{ fontSize: '1.125rem', color: '#94a3b8' }}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right photo column for target visual ID */}
              <motion.div variants={fadeIn} style={{ position: 'relative' }}>
                <img src="/guy.png" alt="BROS Guy" style={{ width: '100%', height: 'auto', borderRadius: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', objectFit: 'cover' }} />
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. LA SOLUZIONE (Minimalist Cards) */}
      <section className="section" style={{ background: '#ffffff', overflow: 'hidden' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto 6rem auto' }}>
              <motion.h2 variants={fadeIn} style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', color: '#0b1120', textTransform: 'uppercase', lineHeight: 0.9, fontWeight: 900 }}>
                LA SKINCARE DEVE ESSERE INVISIBILE E VELOCE.
              </motion.h2>
            </div>

            <div className="grid-3">
              <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="card" style={{ padding: '3rem 2rem', background: '#f8fafc', border: 'none' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--brand-accent)', opacity: 0.9, position: 'absolute', top: '1rem', right: '2rem' }}>01</h1>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0b1120' }}>IL RESET</h3>
                <p style={{ fontSize: '1.125rem', color: '#475569', fontWeight: 500 }}>Un detergente che spazza via smog e grasso, progettato per pelle giovane. Non secca, ripristina.</p>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/reset.jpeg" alt="Il Reset" style={{ width: '100%', height: 'auto', mixBlendMode: 'multiply', borderRadius: '1rem' }} />
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="card" style={{ padding: '3rem 2rem', background: '#f8fafc', border: 'none' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--brand-accent)', opacity: 0.9, position: 'absolute', top: '1rem', right: '2rem' }}>02</h1>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0b1120' }}>LO SCUDO</h3>
                <p style={{ fontSize: '1.125rem', color: '#475569', fontWeight: 500 }}>Crema idratante che placa i rossori. Formulazione opaca: zero effetto lucido, non unge mai.</p>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/scudo.jpeg" alt="Lo Scudo" style={{ width: '100%', height: 'auto', mixBlendMode: 'multiply', borderRadius: '1rem' }} />
                </div>
              </motion.div>

              <motion.div variants={fadeIn} whileHover={{ y: -10 }} className="card" style={{ padding: '3rem 2rem', background: '#f8fafc', border: 'none' }}>
                <h1 style={{ fontSize: '4rem', color: 'var(--brand-accent)', opacity: 0.9, position: 'absolute', top: '1rem', right: '2rem' }}>03</h1>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#0b1120' }}>L'UPGRADE</h3>
                <p style={{ fontSize: '1.125rem', color: '#475569', fontWeight: 500 }}>Detergente corpo no-bs. Doccia veloce, niente profumi sgravi, niente impurità sulla schiena.</p>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/upgarde.jpeg" alt="L'Upgrade" style={{ width: '100%', height: 'auto', mixBlendMode: 'multiply', borderRadius: '1rem' }} />
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </section>

      {/* 5. EDUCATIONAL / SCIENZA (AUTHORITY) */}
      <section className="section" style={{ background: 'var(--brand-accent)', color: '#0b1120' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid-2">
            <div>
              <motion.h2 variants={fadeIn} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem', lineHeight: 1, textTransform: 'uppercase', fontWeight: 900 }}>
                SEMBRA FACILE, MA DIETRO C'È LA SCIENZA VERA.
              </motion.h2>
              <motion.p variants={fadeIn} style={{ fontSize: '1.5rem', fontWeight: 600, opacity: 0.8, marginBottom: '3rem' }}>
                Formulato in laboratorio. Zero profumi chimici. Dermatologicamente spietato contro i brufoli, ma delicato sulla barriera cutanea.
              </motion.p>
              
              <motion.div variants={fadeIn} style={{ display: 'grid', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: '1.25rem' }}>
                  <Stethoscope size={36} style={{ marginRight: '1rem' }} /> DERMATOLOGI
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: '1.25rem' }}>
                  <FlaskConical size={36} style={{ marginRight: '1rem' }} /> INGREDIENTI CLEAN
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 900, fontSize: '1.25rem' }}>
                  <ShieldCheck size={36} style={{ marginRight: '1rem' }} /> PELLI SENSIBILI
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={fadeIn} style={{ display: 'flex', alignItems: 'center' }}>
               <img src="/ragazzo_bagno.png" alt="Ragazzo che si lava il viso" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '4rem', fontWeight: 900, textTransform: 'uppercase', color: '#0b1120' }}>
            CHI HA GIÀ FATTO I TEST.
          </h2>
             <div className="grid-3">
             {[
               { name: "Marco, 21 anni", img: "/faccia_marco.png", text: "Mai messo una crema in vita mia, mi fa schifo l'effetto bagnato. Questa scompare non appena la metti e mi ha dimezzato l'acne." },
               { name: "Ale, 18 anni", img: "/faccia_ale.png", text: "Ci metto 1 minuto netto e sono a posto. Il detergente fa il suo lavoro, zero tiraggio estremo della pelle. Tanta roba." },
               { name: "Luca, 24 anni", img: "/faccia_luca.png", text: "La mia tipa ha smesso di dire che ho la fronte secca e unta. Questo kit ha salvato la relazione. GG." }
             ].map((r, i) => (
                <div key={i} className="card" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem', color: '#0b1120' }}>
                    {[1,2,3,4,5].map(n => <Star key={n} size={20} fill="currentColor" />)}
                  </div>
                  <p style={{ fontSize: '1.25rem', color: '#0b1120', fontWeight: 600, fontStyle: 'italic', marginBottom: '1.5rem' }}>"{r.text}"</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                    <img src={r.img} alt={r.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', marginRight: '1rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#94a3b8', textTransform: 'uppercase' }}>{r.name}</div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA (LEAD GEN) */}
      <section id="join" className="section cta-section" style={{ background: '#020617' }}>
         <div className="container">
           <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             whileInView={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5 }}
             style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
           >
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.5rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 0.9, fontWeight: 900 }}>
              IL DROP È VICINO.
            </h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '3rem', color: '#94a3b8', fontWeight: 500 }}>
              Non farti trovare impreparato. Iscriviti alla lista d'attesa ufficiale. Al lancio sblocchiamo il prezzo riservato alla early-gang.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-accent" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', whiteSpace: 'nowrap' }}>
                SONO INTERESSATO <ArrowRight size={20} style={{ marginLeft: '8px' }}/>
              </button>
            </div>
            
            <p style={{ fontSize: '0.875rem', marginTop: '2rem', opacity: 0.6, color: 'white' }}>
              Tranquillo. Odiamo lo spam di mail inutili esattamente quanto te.
            </p>
           </motion.div>
         </div>
      </section>

      {/* Footer minimal */}
      <footer style={{ background: '#0f172a', color: '#475569', textAlign: 'center', padding: '3rem 0', fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <p>© 2026 BROS MEN'S CARE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
