import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';

/* ── Keyframes ─────────────────────────────────────────── */
const certStyles = document.createElement('style');
certStyles.textContent = `
  @keyframes certShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes shineSweep {
    0% { left: -50%; }
    100% { left: 150%; }
  }
  @keyframes certBorderFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
`;
document.head.appendChild(certStyles);

const certifications = [
  {
    title: 'Technology Job Simulation',
    issuer: 'Deloitte (Forage)',
    year: 'Jul 2025',
    accent: 'var(--accent-purple)',
  },
  {
    title: 'Excel Skills Job Simulation',
    issuer: 'JPMorgan Chase & Co. (Forage)',
    year: 'Oct 2024',
    accent: 'var(--accent-blue)',
  },
  {
    title: 'Python Coder',
    issuer: 'Kaggle',
    year: 'Nov 2025',
    accent: 'var(--accent-cyan)',
  },
  {
    title: 'Effective Presentations',
    issuer: 'HP LIFE, HP Foundation',
    year: 'Apr 2026',
    accent: 'var(--accent-green)',
  },
];

/* ── CertCard ─────────────────────────────────────────── */
const CertCard = ({ cert, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);
  const [borderAngle, setBorderAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBorderAngle((a) => (a + 2) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      animate={isInView ? { opacity: 1, rotateY: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={
          hovered
            ? {
                y: -10,
                rotateZ: 1,
                boxShadow: `0 25px 60px ${cert.accent}30, 0 0 40px ${cert.accent}15`,
              }
            : {
                y: 0,
                rotateZ: 0,
                boxShadow: 'none',
              }
        }
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'default',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? cert.accent + '40' : 'rgba(255,255,255,0.08)'}`,
          transition: 'border-color 0.3s ease',
        }}
      >
        {/* Animated gradient top border */}
        <div
          style={{
            height: 3,
            width: '100%',
            background: `linear-gradient(${borderAngle}deg, transparent, ${cert.accent}, transparent)`,
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Shine sweep overlay on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-50%',
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
              transform: 'skewX(-15deg)',
              animation: hovered ? 'shineSweep 0.8s ease-out forwards' : 'none',
            }}
          />
        </div>

        <div
          style={{
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Animated icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={isInView ? { rotate: 360 } : {}}
            transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: `${cert.accent}18`,
              border: `1px solid ${cert.accent}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
              animation: hovered ? 'iconPulse 1s ease-in-out infinite' : 'none',
            }}
          >
            <FaCertificate style={{ color: cert.accent, fontSize: 22 }} />
          </motion.div>

          <h3
            style={{
              fontSize: '1.08rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 14,
              lineHeight: 1.4,
            }}
          >
            {cert.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.span
              whileHover={{ scale: 1.08 }}
              style={{
                padding: '5px 14px',
                borderRadius: 20,
                fontSize: '0.78rem',
                fontWeight: 600,
                background: `${cert.accent}15`,
                color: cert.accent,
                border: `1px solid ${cert.accent}30`,
              }}
            >
              {cert.issuer}
            </motion.span>
            <span
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
              }}
            >
              {cert.year}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main Component ───────────────────────────────────── */
const Certifications = () => {
  return (
    <section id="certifications" style={{ position: 'relative', padding: '100px 5%', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 60, position: 'relative', zIndex: 1 }}
      >
        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: 16,
            letterSpacing: '-0.02em',
          }}
        >
          My{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-pink), var(--accent-purple))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'certShimmer 3s linear infinite',
            }}
          >
            Certifications
          </span>
        </h2>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            maxWidth: 550,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Continuous learning through industry-recognized certifications and courses.
        </p>
      </motion.div>

      <div className="responsive-grid" style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {certifications.map((cert, index) => (
          <CertCard key={index} cert={cert} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Certifications;
