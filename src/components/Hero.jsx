import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown, FaDownload } from 'react-icons/fa';

const TYPING_STRINGS = [
  'Java Developer',
  'Full Stack Developer',
  'Web Developer',
  'Photographer',
  'Problem Solver',
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 2000;

const useTypingEffect = (strings) => {
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];

    if (!isDeleting && charIndex <= current.length) {
      if (charIndex === current.length) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, PAUSE_DURATION);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex >= 0) {
      if (charIndex === 0) {
        setIsDeleting(false);
        setStringIndex((i) => (i + 1) % strings.length);
        return;
      }
      const timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, DELETING_SPEED);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, isDeleting, stringIndex, strings]);

  return displayText;
};

/* Stagger container */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* Letter-by-letter stagger for name */
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/Vishnu2428', label: 'GitHub', color: '#6e5494' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vishnu-pragadeeswar-a-989876328/', label: 'LinkedIn', color: '#0077b5' },
  { icon: FaEnvelope, href: 'mailto:vishnupragadeeswar@gmail.com', label: 'Email', color: '#ea4335' },
];

const ORBS = [
  { size: 300, color: 'rgba(var(--accent-purple-rgb), 0.15)', top: '10%', left: '-5%', delay: 0 },
  { size: 200, color: 'rgba(var(--accent-cyan-rgb), 0.12)', top: '60%', right: '-3%', delay: 5 },
  { size: 250, color: 'rgba(var(--accent-blue-rgb), 0.1)', bottom: '5%', left: '30%', delay: 10 },
  { size: 180, color: 'rgba(var(--accent-purple-rgb), 0.12)', top: '30%', right: '10%', delay: 7 },
];

const Hero = () => {
  const typedText = useTypingEffect(TYPING_STRINGS);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nameText = 'Vishnu Pragadeeswar A';

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Floating Orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="floating-orb liquid-orb"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            x: [0, 50, -20, 30, 0],
            y: [0, -30, 50, 20, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.75rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Profile Image with Pulsing Glow Rings */}
        <motion.div variants={itemVariants} style={{ y: imageY, opacity }}>
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'relative', width: '200px', height: '200px' }}
          >
            {/* Outer glow rings */}
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={ring}
                style={{
                  position: 'absolute',
                  inset: `${-12 - ring * 12}px`,
                  borderRadius: '50%',
                  border: `2px solid rgba(var(--accent-purple-rgb),${0.3 - ring * 0.08})`,
                }}
                animate={{
                  scale: [1, 1.05 + ring * 0.03, 1],
                  opacity: [0.4 - ring * 0.1, 0.8 - ring * 0.15, 0.4 - ring * 0.1],
                }}
                transition={{
                  duration: 2 + ring * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: ring * 0.3,
                }}
              />
            ))}

            {/* Spinning gradient border */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '50%',
                background: 'var(--gradient-glow)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                rotate: 360,
              }}
              transition={{
                backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear' },
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Image */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid var(--bg-primary)',
                zIndex: 1,
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Vishnu Pragadeeswar A"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Name - Letter by Letter */}
        <motion.div variants={itemVariants} style={{ y: textY, opacity }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              perspective: '600px',
            }}
          >
            {nameText.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'inline-block',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Typing Effect with Glow */}
        <motion.div
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            minHeight: '2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            y: textY,
          }}
        >
          <span>I&apos;m a&nbsp;</span>
          <span
            className="glow-text"
            style={{
              color: 'var(--accent-purple)',
              fontWeight: 700,
              borderRight: '3px solid var(--accent-purple)',
              paddingRight: '4px',
              animation: 'typing-cursor 0.7s infinite',
            }}
          >
            {typedText}
          </span>
        </motion.div>

        {/* Introduction */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '650px',
            y: textY,
          }}
        >
          Passionate Computer Science Engineering student specializing in Full Stack Development,
          Java Programming, and Modern Web Technologies. Dedicated to building scalable digital
          solutions and creating impactful user experiences through innovative design and technology.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', y: textY }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{
                scale: 1.3,
                y: -5,
                boxShadow: `0 0 25px ${social.color}60`,
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.15, type: 'spring', stiffness: 200 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                textDecoration: 'none',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = social.color;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons with Shimmer */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '0.5rem',
            y: buttonsY,
          }}
        >
          <motion.a
            href="/resume.pdf"
            download
            className="btn-primary"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(var(--accent-purple-rgb),0.5)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '14px',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#fff',
              background: 'var(--gradient-primary)',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <FaDownload /> Download Resume
          </motion.a>

          {['View Projects', 'Contact Me'].map((label, i) => (
            <motion.button
              key={label}
              onClick={() => scrollTo(i === 0 ? 'projects' : 'contact')}
              whileHover={{
                scale: 1.05,
                borderColor: i === 0 ? 'var(--accent-purple)' : 'var(--accent-cyan)',
                boxShadow: `0 0 25px ${i === 0 ? 'rgba(var(--accent-purple-rgb),0.3)' : 'rgba(var(--accent-cyan-rgb),0.3)'}`,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 2rem',
                borderRadius: '14px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {label}
            </motion.button>
          ))}

          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(110,84,148,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '14px',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <FaGithub /> GitHub Profile
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <motion.span
          style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          Scroll Down
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown style={{ color: 'var(--accent-purple)', fontSize: '1.2rem' }} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes typing-cursor {
          0%, 100% { border-color: var(--accent-purple); }
          50% { border-color: transparent; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
