import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

/* ── Inject keyframes ──────────────────────────────────── */
const skillStyles = document.createElement('style');
skillStyles.textContent = `
  @keyframes skillShimmerSweep {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes barShine {
    0% { left: -40%; }
    100% { left: 140%; }
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`;
document.head.appendChild(skillStyles);

const ACCENT_COLORS = [
  { name: 'purple', color: 'var(--accent-purple)', glow: 'rgba(var(--accent-purple-rgb),0.25)' },
  { name: 'blue', color: 'var(--accent-blue)', glow: 'rgba(var(--accent-blue-rgb),0.25)' },
  { name: 'cyan', color: 'var(--accent-cyan)', glow: 'rgba(var(--accent-cyan-rgb),0.25)' },
  { name: 'pink', color: 'var(--accent-pink)', glow: 'rgba(var(--accent-pink-rgb),0.25)' },
  { name: 'green', color: 'var(--accent-green)', glow: 'rgba(var(--accent-green-rgb),0.25)' },
];

const TECHNICAL_SKILLS = [
  { name: 'Git & GitHub', level: 100 },
  { name: 'Java', level: 90 },
  { name: 'Python', level: 88 },
  { name: 'C Program', level: 85 },
  { name: 'MongoDB', level: 83 },
  { name: 'Firebase', level: 81 },
  { name: 'HTML5', level: 80 },
  { name: 'CSS3', level: 75 },
  { name: 'JavaScript', level: 70 },
  { name: 'React.js', level: 65 },
  { name: 'MySQL', level: 55 },
];

const SOFT_SKILLS = [
  { name: 'Communication', level: 90 },
  { name: 'Leadership', level: 85 },
  { name: 'Team Collaboration', level: 92 },
  { name: 'Problem Solving', level: 95 },
  { name: 'Time Management', level: 88 },
  { name: 'Creativity', level: 90 },
];

/* ── Animated Number Counter ───────────────────────────── */
const AnimatedNumber = ({ target, isInView, suffix = '%' }) => {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const duration = 1500;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return `${value}${suffix}`;
};

/* ── 3D Tilt Wrapper ───────────────────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 25 });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -14);
    rotateY.set(((e.clientX - cx) / rect.width) * 14);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return { ref, springX, springY, handleMouseMove, handleMouseLeave };
};

/* ── Circular SVG Meter ────────────────────────────────── */
const CircularMeter = ({ skill, index }) => {
  const viewRef = useRef(null);
  const isInView = useInView(viewRef, { once: true, margin: '-60px' });
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const nextAccent = ACCENT_COLORS[(index + 1) % ACCENT_COLORS.length];
  const [hovered, setHovered] = useState(false);
  const { ref: tiltRef, springX, springY, handleMouseMove, handleMouseLeave } = useTilt();

  const radius = 70;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (skill.level / 100) * circumference;
  const gradientId = `circGrad-${index}`;
  const glowId = `circGlow-${index}`;

  return (
    <motion.div
      ref={(el) => {
        viewRef.current = el;
        tiltRef.current = el;
      }}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        setHovered(true);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        setHovered(false);
      }}
      style={{
        perspective: '800px',
        cursor: 'default',
      }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          background: hovered
            ? `linear-gradient(135deg, ${accent.color}15, ${nextAccent.color}10)`
            : 'var(--glass-bg, rgba(255,255,255,0.05))',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${hovered ? accent.color + '50' : 'var(--glass-border, rgba(255,255,255,0.08))'}`,
          borderRadius: '20px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'background 0.4s ease, border-color 0.3s ease',
          boxShadow: hovered ? `0 8px 40px ${accent.glow}` : 'none',
        }}
      >
        <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent.color} />
              <stop offset="100%" stopColor={nextAccent.color} />
            </linearGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke="var(--glass-border, rgba(255,255,255,0.08))"
            strokeWidth={strokeWidth}
          />

          {/* Glow trail */}
          <motion.circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth + 6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.08 }}
            transform={`rotate(-90 ${radius} ${radius})`}
            opacity={0.15}
            filter={`url(#${glowId})`}
          />

          {/* Main stroke */}
          <motion.circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.08 }}
            transform={`rotate(-90 ${radius} ${radius})`}
          />

          <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              fill: accent.color,
            }}
          >
            <AnimatedNumber target={skill.level} isInView={isInView} />
          </text>
        </svg>

        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-primary, #ffffff)',
            textAlign: 'center',
          }}
        >
          {skill.name}
        </span>

        {/* Tooltip on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={hovered ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            overflow: 'hidden',
            fontSize: '0.75rem',
            color: accent.color,
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ── Horizontal Progress Bar with Shimmer ──────────────── */
const ProgressBar = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const nextAccent = ACCENT_COLORS[(index + 1) % ACCENT_COLORS.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${accent.color}08, ${nextAccent.color}05)`
          : 'var(--glass-bg, rgba(255,255,255,0.05))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? accent.color + '50' : 'var(--glass-border, rgba(255,255,255,0.08))'}`,
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        transition: 'all 0.4s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 8px 40px ${accent.glow}` : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <span
          style={{
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'var(--text-primary, #ffffff)',
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: accent.color,
          }}
        >
          <AnimatedNumber target={skill.level} isInView={isInView} />
        </span>
      </div>

      <div
        style={{
          width: '100%',
          height: '10px',
          borderRadius: '10px',
          background: 'var(--glass-border, rgba(255,255,255,0.08))',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.1 }}
          style={{
            height: '100%',
            borderRadius: '10px',
            background: `linear-gradient(90deg, ${accent.color}, ${nextAccent.color})`,
            boxShadow: `0 0 12px ${accent.color}60`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer shine effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-40%',
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: isInView ? 'barShine 2s ease-in-out infinite 1.5s' : 'none',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ── Main Skills Component ─────────────────────────────── */
const Skills = () => {
  return (
    <section
      id="skills"
      style={{
        padding: '6rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '1rem',
            background:
              'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-cyan) 25%, var(--accent-pink) 50%, var(--accent-purple) 75%, var(--accent-cyan) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'skillShimmerSweep 3s linear infinite',
          }}
        >
          Skills & Expertise
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary, rgba(255,255,255,0.6))',
            fontSize: '1.05rem',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A comprehensive toolkit of technologies and interpersonal abilities that drive results.
        </motion.p>

        {/* Technical Skills */}
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: 'var(--text-primary, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: '24px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: '4px',
              borderRadius: '4px',
              background: 'var(--gradient-primary)',
              display: 'inline-block',
            }}
          />
          Technical Skills
        </motion.h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          {TECHNICAL_SKILLS.map((skill, idx) => (
            <CircularMeter key={skill.name} skill={skill} index={idx} />
          ))}
        </div>

        {/* Soft Skills */}
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            color: 'var(--text-primary, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <motion.span
            initial={{ height: 0 }}
            whileInView={{ height: '24px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: '4px',
              borderRadius: '4px',
              background: 'var(--gradient-accent)',
              display: 'inline-block',
            }}
          />
          Soft Skills
        </motion.h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1rem',
          }}
        >
          {SOFT_SKILLS.map((skill, idx) => (
            <ProgressBar key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
