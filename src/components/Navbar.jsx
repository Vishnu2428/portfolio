import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'photography', label: 'Photography' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll for glassmorphism enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observers = [];

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const options = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: { opacity: 0, x: -30, scale: 0.95 },
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'blur(10px)',
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(10, 10, 30, 0.85)'
            : 'rgba(255, 255, 255, 0.85)'
          : theme === 'dark'
          ? 'rgba(10, 10, 30, 0.4)'
          : 'rgba(255, 255, 255, 0.4)',
        borderBottom: scrolled
          ? theme === 'dark'
            ? '1px solid rgba(139, 92, 246, 0.15)'
            : '1px solid rgba(139, 92, 246, 0.1)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.12)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo with glow pulse on hover */}
        <motion.button
          onClick={() => scrollToSection('home')}
          whileHover={{
            scale: 1.08,
            textShadow: '0 0 20px rgba(var(--accent-purple-rgb),0.6), 0 0 40px rgba(var(--accent-cyan-rgb),0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.75rem',
            fontWeight: 800,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
            position: 'relative',
          }}
        >
          {/* Glow aura behind logo */}
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '12px',
              background: 'radial-gradient(circle, rgba(var(--accent-purple-rgb),0.2) 0%, transparent 70%)',
              filter: 'blur(8px)',
              pointerEvents: 'none',
            }}
          />
          VP
        </motion.button>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="navbar__desktop-links"
        >
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: activeSection === link.id ? 600 : 400,
                color:
                  activeSection === link.id
                    ? 'var(--accent-purple)'
                    : theme === 'dark'
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(0,0,0,0.6)',
                position: 'relative',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    left: '20%',
                    right: '20%',
                    height: '3px',
                    borderRadius: '2px',
                    background: 'var(--gradient-primary)',
                    boxShadow: '0 0 8px rgba(var(--accent-purple-rgb), 0.4)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme Toggle with 360deg rotation */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{
              scale: 1.12,
              boxShadow:
                theme === 'dark'
                  ? '0 0 20px rgba(251, 191, 36, 0.3)'
                  : '0 0 20px rgba(107, 33, 168, 0.3)',
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'dark' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
              fontSize: '1.15rem',
              transition: 'background 0.3s, border-color 0.3s',
              overflow: 'hidden',
            }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -180, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 180, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'flex' }}
                >
                  <FiSun />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 180, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -180, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ display: 'flex' }}
                >
                  <FiMoon />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              border: '1px solid',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
              fontSize: '1.25rem',
            }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  <FiX />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  <FiMenu />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              background:
                theme === 'dark'
                  ? 'rgba(10, 10, 30, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              borderBottom:
                theme === 'dark'
                  ? '1px solid rgba(139, 92, 246, 0.15)'
                  : '1px solid rgba(139, 92, 246, 0.1)',
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.id}
                variants={mobileItemVariants}
                onClick={() => scrollToSection(link.id)}
                whileTap={{ scale: 0.97 }}
                whileHover={{
                  x: 8,
                  transition: { type: 'spring', stiffness: 400, damping: 20 },
                }}
                style={{
                  background:
                    activeSection === link.id
                      ? theme === 'dark'
                        ? 'rgba(var(--accent-purple-rgb), 0.15)'
                        : 'rgba(var(--accent-purple-rgb), 0.08)'
                      : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: activeSection === link.id ? 600 : 400,
                  color:
                    activeSection === link.id
                      ? 'var(--accent-purple)'
                      : theme === 'dark'
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(0,0,0,0.6)',
                  textAlign: 'left',
                  transition: 'background 0.2s, color 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Active mobile indicator */}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeMobileIndicator"
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '25%',
                      bottom: '25%',
                      width: '3px',
                      borderRadius: '2px',
                      background: 'var(--gradient-primary)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS */}
      <style>{`
        .navbar__desktop-links {
          display: flex !important;
        }
        .navbar__mobile-toggle {
          display: none !important;
        }
        @media (max-width: 768px) {
          .navbar__desktop-links {
            display: none !important;
          }
          .navbar__mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
