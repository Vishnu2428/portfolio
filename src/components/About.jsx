import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGraduationCap, FaLanguage, FaRocket, FaBullseye, FaLightbulb } from 'react-icons/fa';

/* ── Shimmer keyframes ─────────────────────────────────── */
const shimmerStyle = document.createElement('style');
shimmerStyle.textContent = `
  @keyframes shimmerSweep {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes borderGradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes ripplePulse {
    0% { box-shadow: 0 0 0 0 var(--ripple-color); }
    70% { box-shadow: 0 0 0 12px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
`;
document.head.appendChild(shimmerStyle);

const timelineItems = [
  {
    icon: FaRocket,
    title: 'Aspiring Full Stack Developer',
    description:
      'Building expertise across the entire web stack, from pixel-perfect frontends to robust backend architectures.',
    color: 'var(--accent-purple)',
  },
  {
    icon: FaBullseye,
    title: 'Building Scalable Solutions',
    description:
      'Focused on creating efficient, maintainable, and scalable applications that solve real-world problems.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: FaLightbulb,
    title: 'Creating Impact Through Technology',
    description:
      'Leveraging technology to drive innovation, improve user experiences, and make meaningful contributions.',
    color: 'var(--accent-pink)',
  },
];

const languages = ['English', 'Tamil', 'Kannada'];

/* ── 3D Tilt Card ──────────────────────────────────────── */
const TiltCard = ({ children, style, entryDirection = 'bottom', delay = 0, borderColor1, borderColor2 }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const [gradientAngle, setGradientAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    rotateX.set((-mouseY / rect.height) * 12);
    rotateY.set((mouseX / rect.width) * 12);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const directionMap = {
    left: { x: -80, y: 0 },
    right: { x: 80, y: 0 },
    bottom: { x: 0, y: 60 },
    top: { x: 0, y: -60 },
  };

  const initial = { opacity: 0, ...directionMap[entryDirection], scale: 0.95 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        position: 'relative',
        borderRadius: '22px',
        padding: '2px',
        background: `linear-gradient(${gradientAngle}deg, ${borderColor1 || 'var(--accent-purple)'}, ${borderColor2 || 'var(--accent-cyan)'}, ${borderColor1 || 'var(--accent-purple)'})`,
        backgroundSize: '200% 200%',
      }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          ...style,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

/* ── Animated Counter ──────────────────────────────────── */
const AnimatedCounter = ({ target, decimals = 1, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span
      ref={ref}
      style={{
        fontSize: '1.25rem',
        fontWeight: 800,
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count.toFixed(decimals)}
    </span>
  );
};

/* ── Ripple Timeline Dot ───────────────────────────────── */
const TimelineDot = ({ color }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
      style={{
        position: 'absolute',
        left: '-2rem',
        top: '4px',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 12px ${color}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '--ripple-color': `${color}50`,
        animation: isInView ? 'ripplePulse 2s ease-out infinite' : 'none',
      }}
    />
  );
};

/* ── Main About Component ──────────────────────────────── */
const About = () => {
  const cardBaseStyle = {
    background: 'var(--glass-bg, rgba(255,255,255,0.05))',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: '2rem',
    cursor: 'default',
  };

  return (
    <section
      id="about"
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* ── Shimmer Gradient Title ── */}
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '3rem',
            background:
              'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 25%, var(--accent-pink) 50%, var(--accent-purple) 75%, var(--accent-cyan) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmerSweep 3s linear infinite',
          }}
        >
          About Me
        </motion.h2>

        {/* ── Grid Layout ── */}
        <div
          className="responsive-grid"
          style={{
            marginBottom: '3rem',
          }}
        >
          {/* ── Profile Summary Card (from LEFT) ── */}
          <TiltCard
            entryDirection="left"
            delay={0}
            borderColor1="var(--accent-purple)"
            borderColor2="var(--accent-cyan)"
            style={cardBaseStyle}
          >
            <h3
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '1rem',
                color: 'var(--text-primary, #ffffff)',
              }}
            >
              Who I Am
            </h3>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary, rgba(255,255,255,0.65))',
              }}
            >
              I&apos;m a passionate Computer Science Engineering student with a deep love for
              building web applications and solving complex problems. With a strong foundation
              in both frontend and backend technologies, I strive to create seamless digital
              experiences. Beyond coding, I have a keen eye for photography and enjoy
              capturing moments that tell stories. I believe in continuous learning and
              pushing the boundaries of what technology can achieve.
            </p>
          </TiltCard>

          {/* ── Education Card (from RIGHT) ── */}
          <TiltCard
            entryDirection="right"
            delay={0.15}
            borderColor1="var(--accent-cyan)"
            borderColor2="var(--accent-purple)"
            style={cardBaseStyle}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(var(--accent-cyan-rgb),0.2), rgba(var(--accent-purple-rgb),0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  color: 'var(--accent-cyan)',
                }}
              >
                <FaGraduationCap />
              </motion.div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #ffffff)',
                }}
              >
                Education
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-primary, #ffffff)',
                    marginBottom: '0.25rem',
                  }}
                >
                  B.E Computer Science and Engineering
                </p>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary, rgba(255,255,255,0.65))',
                  }}
                >
                  AVS Engineering College
                </p>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15))',
                  alignSelf: 'flex-start',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary, rgba(255,255,255,0.65))',
                  }}
                >
                  CGPA
                </span>
                <AnimatedCounter target={8.0} decimals={1} duration={2000} />
              </div>
            </div>
          </TiltCard>

          {/* ── Languages Card (from BOTTOM) ── */}
          <TiltCard
            entryDirection="bottom"
            delay={0.3}
            borderColor1="var(--accent-pink)"
            borderColor2="var(--accent-purple)"
            style={cardBaseStyle}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(var(--accent-pink-rgb),0.2), rgba(var(--accent-purple-rgb),0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  color: 'var(--accent-pink)',
                }}
              >
                <FaLanguage />
              </motion.div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #ffffff)',
                }}
              >
                Languages
              </h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {languages.map((lang, idx) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                    delay: 0.5 + idx * 0.15,
                  }}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
                  }}
                  style={{
                    padding: '0.55rem 1.25rem',
                    borderRadius: '50px',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    background:
                      'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))',
                    border: '1px solid rgba(139,92,246,0.2)',
                    color: 'var(--text-primary, #ffffff)',
                    cursor: 'default',
                  }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </TiltCard>

          {/* ── Career Objective Timeline (from TOP) ── */}
          <TiltCard
            entryDirection="top"
            delay={0.45}
            borderColor1="var(--accent-green)"
            borderColor2="var(--accent-cyan)"
            style={cardBaseStyle}
          >
            <h3
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                color: 'var(--text-primary, #ffffff)',
              }}
            >
              Career Objective
            </h3>

            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Timeline Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  left: '7px',
                  top: '8px',
                  width: '2px',
                  background:
                    'var(--gradient-glow)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              />

              {timelineItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + 0.2 * idx,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    position: 'relative',
                    marginBottom: idx < timelineItems.length - 1 ? '1.5rem' : 0,
                  }}
                >
                  <TimelineDot color={item.color} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <item.icon
                        style={{
                          color: item.color,
                          fontSize: '1rem',
                          marginTop: '3px',
                          flexShrink: 0,
                        }}
                      />
                    </motion.div>
                    <div>
                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary, #ffffff)',
                          marginBottom: '0.3rem',
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary, rgba(255,255,255,0.6))',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default About;
