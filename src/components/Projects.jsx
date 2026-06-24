import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';

/* ── Keyframes ─────────────────────────────────────────── */
const projStyles = document.createElement('style');
projStyles.textContent = `
  @keyframes projShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes projBorderShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes rippleEffect {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
  }
`;
document.head.appendChild(projStyles);

const projects = [
  {
    title: 'Personal Developer Portfolio',
    image: '/images/profile.png',
    description:
      'A highly interactive, modern web portfolio featuring dramatic 3D animations, animated particle backgrounds, and dynamic glassmorphism design.',
    features: [
      '3D Hover Effects',
      'Particle Backgrounds',
      'Dynamic Theming',
      'Smooth Animations',
    ],
    tech: ['React.js', 'Vite', 'Framer Motion', 'CSS3'],
    github: 'https://github.com/Vishnu2428/portfolio',
    demo: '#',
    accent: 'var(--accent-purple)',
  },
  {
    title: 'Luma Photography',
    image: '/images/photo-nature-1.png',
    description:
      'A professional photography portfolio showcasing stunning visuals and galleries. Features a modern, responsive design for an elegant user experience.',
    features: [
      'Responsive Design',
      'Image Galleries',
      'Modern UI',
      'Optimized Loading',
    ],
    tech: ['React.js', 'CSS3', 'Vite', 'Vercel'],
    github: 'https://github.com/Vishnu2428/luma-photography.git',
    demo: 'https://lumaphotography.vercel.app/',
    accent: 'var(--accent-blue)',
  },
  {
    title: 'Recipe Lens',
    image: '/images/project-recipe-lens.png',
    description:
      'AI-powered food recognition web application that identifies food items from uploaded images and provides detailed information about the detected dishes.',
    features: [
      'Image upload functionality',
      'Food detection system',
      'User-friendly interface',
      'Fast processing',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: '#',
    demo: '#',
    accent: 'var(--accent-purple)',
  },
  {
    title: 'AI Internship Recommendation Engine',
    image: '/images/project-internship.png',
    description:
      'Smart platform that recommends internships based on student skills, interests, academic performance, and career goals using AI-driven matching.',
    features: [
      'AI recommendation engine',
      'Student profile analysis',
      'Internship matching',
      'Dashboard analytics',
    ],
    tech: ['React.js', 'Python', 'Flask', 'MongoDB'],
    github: '#',
    demo: '#',
    accent: 'var(--accent-blue)',
  },
  {
    title: 'IoT Health Monitoring System',
    image: '/images/project-iot.png',
    description:
      'Real-time health monitoring solution using ESP32 and sensors to track heart rate, SpO2, temperature, and ECG data with cloud integration.',
    features: [
      'Real-time monitoring',
      'Cloud dashboard',
      'Emergency alerts',
      'Sensor analytics',
    ],
    tech: ['ESP32', 'Arduino', 'ThingSpeak', 'Blynk'],
    github: '#',
    demo: null,
    accent: 'var(--accent-pink)',
  },
];

const techColors = {
  'React.js': { bg: 'rgba(97,218,251,0.15)', color: '#61dafb', border: 'rgba(97,218,251,0.3)' },
  'Node.js': { bg: 'rgba(104,159,56,0.15)', color: '#8bc34a', border: 'rgba(104,159,56,0.3)' },
  'Express.js': { bg: 'rgba(255,255,255,0.1)', color: '#e0e0e0', border: 'rgba(255,255,255,0.2)' },
  MongoDB: { bg: 'rgba(76,175,80,0.15)', color: '#4caf50', border: 'rgba(76,175,80,0.3)' },
  Python: { bg: 'rgba(255,213,79,0.15)', color: '#ffd54f', border: 'rgba(255,213,79,0.3)' },
  Flask: { bg: 'rgba(255,255,255,0.1)', color: '#e0e0e0', border: 'rgba(255,255,255,0.2)' },
  ESP32: { bg: 'rgba(233,30,99,0.15)', color: '#ec407a', border: 'rgba(233,30,99,0.3)' },
  Arduino: { bg: 'rgba(0,150,136,0.15)', color: '#26a69a', border: 'rgba(0,150,136,0.3)' },
  ThingSpeak: { bg: 'rgba(33,150,243,0.15)', color: '#42a5f5', border: 'rgba(33,150,243,0.3)' },
  Blynk: { bg: 'rgba(126,87,194,0.15)', color: '#b39ddb', border: 'rgba(126,87,194,0.3)' },
  Vite: { bg: 'rgba(100,108,255,0.15)', color: '#646cff', border: 'rgba(100,108,255,0.3)' },
  'Framer Motion': { bg: 'rgba(255,0,136,0.15)', color: '#ff0088', border: 'rgba(255,0,136,0.3)' },
  CSS3: { bg: 'rgba(38,77,228,0.15)', color: '#264de4', border: 'rgba(38,77,228,0.3)' },
  Vercel: { bg: 'rgba(255,255,255,0.15)', color: '#ffffff', border: 'rgba(255,255,255,0.3)' },
};

/* ── Magnetic Button with Ripple ──────────────────────── */
const MagneticButton = ({ children, style, href, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const ripple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)), 600);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        ...style,
        x: springX,
        y: springY,
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.3)',
            animation: 'rippleEffect 0.6s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
    </motion.a>
  );
};

/* ── Project Card ─────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);
  const [gradAngle, setGradAngle] = useState(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  React.useEffect(() => {
    const interval = setInterval(() => setGradAngle((a) => (a + 1) % 360), 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / rect.height) * -8);
    rotateY.set(((e.clientX - cx) / rect.width) * 8);
    setHovered(true);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        borderRadius: '22px',
        padding: '2px',
        background: `linear-gradient(${gradAngle}deg, ${project.accent}, var(--accent-cyan), ${project.accent})`,
        backgroundSize: '200% 200%',
      }}
    >
      <motion.div
        style={{
          rotateX: springRX,
          rotateY: springRY,
          transformStyle: 'preserve-3d',
          background: 'rgba(10,10,20,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        {/* Image container */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            animate={hovered ? { scale: 1.08 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Sweep gradient overlay */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={hovered ? { x: '0%' } : { x: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${project.accent}90, rgba(0,0,0,0.5))`,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: 'linear-gradient(to top, rgba(10,10,20,0.95), transparent)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Card body */}
        <div style={{ padding: '24px 28px 28px' }}>
          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: 10,
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: 18,
            }}
          >
            {project.description}
          </p>

          {/* Features with sequential animation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px 16px',
              marginBottom: 20,
            }}
          >
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2 + 0.4 + i * 0.1,
                  ease: 'easeOut',
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    delay: index * 0.2 + 0.5 + i * 0.12,
                  }}
                >
                  <FaCheck style={{ fontSize: 11, color: project.accent, flexShrink: 0 }} />
                </motion.div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Tech badges with stagger */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
            {project.tech.map((t, i) => {
              const tc = techColors[t] || {
                bg: 'var(--glass-bg)',
                color: 'var(--text-secondary)',
                border: 'var(--glass-border)',
              };
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                    delay: index * 0.2 + 0.6 + i * 0.08,
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    background: tc.bg,
                    color: tc.color,
                    border: `1px solid ${tc.border}`,
                    cursor: 'default',
                  }}
                >
                  {t}
                </motion.span>
              );
            })}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <MagneticButton
              href={project.github}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 20px',
                borderRadius: 12,
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <FaGithub style={{ marginRight: 8, fontSize: 16 }} />
              View Code
            </MagneticButton>
            {project.demo && (
              <MagneticButton
                href={project.demo}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${project.accent}, #a855f7)`,
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <FaExternalLinkAlt style={{ marginRight: 8, fontSize: 14 }} />
                Live Preview
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Main Projects Component ──────────────────────────── */
const Projects = () => {
  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        padding: '100px 5%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-8%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
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
          Featured{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-pink), var(--accent-purple))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'projShimmer 3s linear infinite',
            }}
          >
            Projects
          </span>
        </h2>
        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: 'var(--text-muted)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          A curated selection of projects that showcase my skills and passion for
          building impactful solutions.
        </p>
      </motion.div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 32,
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
