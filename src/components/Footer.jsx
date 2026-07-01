import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: FaGithub, href: "https://github.com/Vishnu2428", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/vishnu-pragadeeswar-a-989876328/", label: "LinkedIn" },
  { icon: FaEnvelope, href: "mailto:vishnupragadeeswar@gmail.com", label: "Email" },
];

const Footer = () => {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={styles.footer}>
      {/* Gradient separator */}
      <div style={styles.separator} />

      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={styles.content}
      >
        {/* Branding */}
        <div style={styles.brandColumn}>
          <h3 style={styles.brandName}>
            Vishnu Pragadeeswar A
          </h3>
          <p style={styles.tagline}>
            Building the future, one line of code at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.linksColumn}>
          <h4 style={styles.columnTitle}>Quick Links</h4>
          <nav style={styles.linksList}>
            {quickLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                style={styles.linkItem}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Socials */}
        <div style={styles.socialColumn}>
          <h4 style={styles.columnTitle}>Connect</h4>
          <div style={styles.socialRow}>
            {socials.map((social, i) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={styles.socialBtn}
                  whileHover={{
                    scale: 1.15,
                    borderColor: "rgba(99,102,241,0.5)",
                    background: "rgba(99,102,241,0.15)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon style={{ fontSize: 18 }} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © 2026 Vishnu Pragadeeswar A. All rights reserved. Crafted with{" "}
          <FaHeart style={styles.heartIcon} /> 
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center !important;
          }
          .footer-content > div {
            align-items: center !important;
          }
          .footer-content nav {
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
};

const styles = {
  footer: {
    position: "relative",
    paddingTop: 0,
  },
  separator: {
    height: 2,
    background: "linear-gradient(90deg, transparent, var(--accent-purple), var(--accent-blue), var(--accent-pink), transparent)",
    opacity: 0.4,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr",
    gap: 40,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 5% 40px",
  },
  brandColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  brandName: {
    fontSize: "1.4rem",
    fontWeight: 800,
    background: "var(--gradient-primary)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "-0.02em",
  },
  tagline: {
    fontSize: "0.92rem",
    color: "var(--text-muted)",
    lineHeight: 1.6,
    maxWidth: 300,
  },
  linksColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  columnTitle: {
    fontSize: "0.88rem",
    fontWeight: 700,
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 4,
  },
  linksList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  linkItem: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: 500,
    transition: "color 0.2s ease",
    cursor: "pointer",
  },
  socialColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  socialRow: {
    display: "flex",
    gap: 12,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  bottomBar: {
    borderTop: "1px solid var(--glass-border)",
    padding: "20px 5%",
    textAlign: "center",
  },
  copyright: {
    fontSize: "0.82rem",
    color: "var(--text-muted)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    flexWrap: "wrap",
  },
  heartIcon: {
    color: "var(--accent-pink)",
    fontSize: 12,
    margin: "0 2px",
  },
};

export default Footer;
