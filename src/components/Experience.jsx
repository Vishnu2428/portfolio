import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    role: "Full Stack Developer Intern",
    company: "Tech Solutions Pvt Ltd",
    period: "Jan 2024 — Present",
    description:
      "Developed and maintained web applications using React.js and Node.js. Implemented RESTful APIs and database management systems.",
  },
  {
    role: "Web Development Lead",
    company: "College Tech Club",
    period: "Jun 2023 — Dec 2023",
    description:
      "Led a team of 10 developers in building college management system. Organized workshops and coding events.",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "Jan 2023 — May 2023",
    description:
      "Designed and developed responsive websites for local businesses. Implemented modern UI/UX practices.",
  },
];

const Experience = () => {
  return (
    <section id="experience" style={styles.section}>
      <div style={styles.bgOrb} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <h2 style={styles.heading}>
          Work{" "}
          <span style={styles.headingAccent}>Experience</span>
        </h2>
        <p style={styles.subtitle}>
          My professional journey and the milestones that shaped my career in
          software development.
        </p>
      </motion.div>

      <div style={styles.timeline}>
        {/* Central line */}
        <div style={styles.line} />

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                ...styles.timelineItem,
                justifyContent: isLeft ? "flex-end" : "flex-start",
              }}
            >
              {/* Dot on the line */}
              <div style={styles.dot}>
                <div style={styles.dotInner} />
              </div>

              {/* Card */}
              <motion.div
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 60px rgba(99,102,241,0.12)",
                  borderColor: "rgba(99,102,241,0.3)",
                }}
                style={{
                  ...styles.card,
                  marginRight: isLeft ? 48 : 0,
                  marginLeft: isLeft ? 0 : 48,
                }}
              >
                <div style={styles.cardTop}>
                  <div style={styles.iconWrapper}>
                    <FaBriefcase style={styles.briefcaseIcon} />
                  </div>
                  <div>
                    <h3 style={styles.role}>{exp.role}</h3>
                    <p style={styles.company}>{exp.company}</p>
                  </div>
                </div>
                <span style={styles.period}>{exp.period}</span>
                <p style={styles.description}>{exp.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Inject responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          #experience [data-timeline-line] {
            left: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    position: "relative",
    padding: "100px 5%",
    overflow: "hidden",
  },
  bgOrb: {
    position: "absolute",
    top: "15%",
    right: "-8%",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(var(--accent-purple-rgb),0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    marginBottom: 70,
    position: "relative",
    zIndex: 1,
  },
  heading: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    fontWeight: 800,
    color: "var(--text-primary)",
    marginBottom: 16,
    letterSpacing: "-0.02em",
  },
  headingAccent: {
    background: "var(--gradient-primary)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
    color: "var(--text-muted)",
    maxWidth: 550,
    margin: "0 auto",
    lineHeight: 1.7,
  },
  timeline: {
    position: "relative",
    maxWidth: 900,
    margin: "0 auto",
    zIndex: 1,
  },
  line: {
    position: "absolute",
    left: "50%",
    top: 0,
    bottom: 0,
    width: 2,
    background: "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(236,72,153,0.3), transparent)",
    transform: "translateX(-50%)",
  },
  timelineItem: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 50,
    width: "100%",
  },
  dot: {
    position: "absolute",
    left: "50%",
    top: 24,
    transform: "translateX(-50%)",
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "rgba(99,102,241,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    boxShadow: "0 0 12px rgba(99,102,241,0.5)",
  },
  card: {
    width: "calc(50% - 60px)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: "24px 28px",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "rgba(99,102,241,0.12)",
    border: "1px solid rgba(99,102,241,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  briefcaseIcon: {
    color: "var(--accent-purple)",
    fontSize: 18,
  },
  role: {
    fontSize: "1.08rem",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: 2,
  },
  company: {
    fontSize: "0.88rem",
    color: "var(--accent-blue)",
    fontWeight: 600,
  },
  period: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: 20,
    background: "rgba(var(--accent-purple-rgb), 0.1)",
    border: "1px solid rgba(var(--accent-purple-rgb), 0.2)",
    color: "var(--accent-purple)",
    fontSize: "0.78rem",
    fontWeight: 600,
    marginBottom: 14,
  },
  description: {
    fontSize: "0.9rem",
    color: "var(--text-muted)",
    lineHeight: 1.7,
    margin: 0,
  },
};

export default Experience;
