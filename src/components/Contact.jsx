import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "vishnupragadeeswar@gmail.com",
    href: "mailto:vishnupragadeeswar@gmail.com",
    accent: "#6366f1",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "github.com/Vishnu2428",
    href: "https://github.com/Vishnu2428",
    accent: "#e0e0e0",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/vishnu-pragadeeswar-a-989876328",
    href: "https://www.linkedin.com/in/vishnu-pragadeeswar-a-989876328/",
    accent: "#0a66c2",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "256P, Ammal Lake 2nd Cross Rd, Salem, TN",
    href: "https://www.google.com/maps?q=11.633954687423893,78.15078308109811",
    accent: "var(--accent-pink)",
  },
];

const FloatingInput = ({ label, name, type = "text", value, onChange, textarea = false }) => {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const Tag = textarea ? "textarea" : "input";

  return (
    <div style={styles.inputGroup}>
      <Tag
        name={name}
        type={textarea ? undefined : type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={textarea ? 5 : undefined}
        style={{
          ...styles.input,
          ...(textarea ? styles.textarea : {}),
          borderColor: focused
            ? "rgba(99,102,241,0.5)"
            : "rgba(255,255,255,0.1)",
          boxShadow: focused ? "0 0 20px rgba(99,102,241,0.1)" : "none",
        }}
      />
      <label
        style={{
          ...styles.floatingLabel,
          ...(isActive ? styles.floatingLabelActive : {}),
        }}
      >
        {label}
      </label>
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new URLSearchParams();
    formData.append("Name", form.name);
    formData.append("Email", form.email);
    formData.append("Subject", form.subject);
    formData.append("Message", form.message);

    fetch("https://script.google.com/macros/s/AKfycbzuytVN_ZGw9vhp2kVLZJitqTUq-MRySzLFJ9np2U0DTQkbUbNXuSm5dYlq9gHpz-xG/exec", {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <section id="contact" style={styles.section}>
      <div className="liquid-orb" style={styles.bgOrb1} />
      <div className="liquid-orb" style={styles.bgOrb2} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <h2 style={styles.heading}>
          Get In{" "}
          <span style={styles.headingAccent}>Touch</span>
        </h2>
        <p style={styles.subtitle}>
          Have a project in mind or just want to say hello? I'd love to hear from
          you.
        </p>
      </motion.div>

      <div className="responsive-split stack-normal">
        {/* Left — Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={styles.formCard}
        >
          <FloatingInput
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <FloatingInput
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <FloatingInput
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
          <FloatingInput
            label="Your Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            textarea
          />

          <motion.button
            type="submit"
            style={{ ...styles.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
            whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ display: "flex", alignItems: "center", marginRight: 10 }}
                >
                  <FaSpinner />
                </motion.div>
                Sending...
              </>
            ) : submitStatus === "success" ? (
              <>
                <FaCheckCircle style={{ marginRight: 10, color: "#10B981" }} />
                Sent Successfully!
              </>
            ) : submitStatus === "error" ? (
              <>
                <FaExclamationCircle style={{ marginRight: 10, color: "#EF4444" }} />
                Failed. Try Again.
              </>
            ) : (
              <>
                <FaPaperPlane style={{ marginRight: 10 }} />
                Send Message
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Right — Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={styles.infoColumn}
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -4,
                  borderColor: `${info.accent}40`,
                  boxShadow: `0 12px 40px ${info.accent}15`,
                }}
                style={styles.infoCard}
              >
                <div
                  style={{
                    ...styles.infoIcon,
                    background: `${info.accent}15`,
                    border: `1px solid ${info.accent}30`,
                  }}
                >
                  <Icon style={{ color: info.accent, fontSize: 20 }} />
                </div>
                <div>
                  <p style={styles.infoLabel}>{info.label}</p>
                  {info.href ? (
                    <a href={info.href} target="_blank" rel="noopener noreferrer" style={styles.infoValue}>
                      {info.value}
                    </a>
                  ) : (
                    <p style={styles.infoValueText}>{info.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: "relative",
    padding: "100px 5%",
    overflow: "hidden",
  },
  bgOrb1: {
    position: "absolute",
    top: "10%",
    left: "-8%",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "5%",
    right: "-6%",
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    marginBottom: 60,
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
    maxWidth: 500,
    margin: "0 auto",
    lineHeight: 1.7,
  },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 40,
    maxWidth: 1050,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
    alignItems: "start",
  },
  formCard: {
    background: "var(--glass-bg)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid var(--glass-border)",
    borderRadius: 20,
    padding: "36px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  inputGroup: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "16px 18px 8px",
    borderRadius: 14,
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    color: "var(--text-primary)",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  },
  textarea: {
    resize: "vertical",
    minHeight: 120,
  },
  floatingLabel: {
    position: "absolute",
    left: 18,
    top: 14,
    fontSize: "0.92rem",
    color: "var(--text-muted)",
    pointerEvents: "none",
    transition: "all 0.25s ease",
    transformOrigin: "left",
  },
  floatingLabelActive: {
    top: 4,
    fontSize: "0.7rem",
    color: "var(--accent-purple)",
  },
  submitBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 32px",
    borderRadius: 14,
    border: "none",
    background: "var(--gradient-primary)",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 8px 30px rgba(var(--accent-purple-rgb),0.3)",
    transition: "box-shadow 0.3s ease",
    marginTop: 4,
  },
  infoColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "22px 24px",
    background: "var(--glass-bg)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid var(--glass-border)",
    borderRadius: 16,
    transition: "all 0.3s ease",
    cursor: "default",
  },
  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: "0.78rem",
    color: "var(--text-muted)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    fontWeight: 600,
    textDecoration: "none",
    transition: "color 0.2s ease",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
  infoValueText: {
    fontSize: "0.95rem",
    color: "var(--text-primary)",
    fontWeight: 600,
    margin: 0,
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  },
};

export default Contact;
