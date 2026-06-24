import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExpand, FaTimes } from "react-icons/fa";

const categories = ["All", "Nature", "Architecture", "Street", "Portrait"];

const photos = [
  {
    src: "/images/photo-nature-1.png",
    category: "Nature",
    title: "Golden Mountain Sunset",
  },
  {
    src: "/images/photo-nature-2.png",
    category: "Nature",
    title: "Serene Lake Reflection",
  },
  {
    src: "/images/photo-architecture-1.png",
    category: "Architecture",
    title: "Modern Glass Tower",
  },
  {
    src: "/images/photo-street-1.png",
    category: "Street",
    title: "Market Lights",
  },
  {
    src: "/images/photo-portrait-1.png",
    category: "Portrait",
    title: "Golden Hour Portrait",
  },
];

const Photography = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="photography" style={styles.section}>
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={styles.header}
      >
        <h2 style={styles.heading}>
          My{" "}
          <span style={styles.headingAccent}>Photography</span>
        </h2>
        <p style={styles.subtitle}>
          Capturing moments through my lens — a visual journey across landscapes,
          streets, and stories.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.filterRow}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              ...styles.filterBtn,
              ...(activeCategory === cat ? styles.filterBtnActive : {}),
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      {/* Masonry Grid */}
      <motion.div layout style={styles.masonry}>
        <AnimatePresence mode="popLayout">
          {filtered.map((photo) => (
            <motion.div
              key={photo.src}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={styles.photoCard}
              onClick={() => setLightbox(photo)}
            >
              <img src={photo.src} alt={photo.title} style={styles.photoImg} />
              <div style={styles.photoOverlay}>
                <span style={styles.photoTitle}>{photo.title}</span>
                <FaExpand style={styles.expandIcon} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.lightboxOverlay}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                style={styles.lightboxClose}
              >
                <FaTimes />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.title}
                style={styles.lightboxImg}
              />
              <p style={styles.lightboxTitle}>{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    top: "5%",
    right: "-8%",
    width: 450,
    height: 450,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "10%",
    left: "-6%",
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
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
  filterRow: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 48,
    position: "relative",
    zIndex: 1,
  },
  filterBtn: {
    padding: "9px 22px",
    borderRadius: 30,
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    color: "var(--text-secondary)",
    fontSize: "0.88rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    outline: "none",
    fontFamily: "inherit",
  },
  filterBtnActive: {
    background: "var(--gradient-primary)",
    border: "1px solid transparent",
    color: "#ffffff",
    boxShadow: "0 4px 20px rgba(var(--accent-purple-rgb),0.3)",
  },
  masonry: {
    columnCount: 3,
    columnGap: 20,
    maxWidth: 1100,
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  photoCard: {
    position: "relative",
    breakInside: "avoid",
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid var(--glass-border)",
  },
  photoImg: {
    width: "100%",
    display: "block",
    transition: "transform 0.5s ease",
  },
  photoOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 20,
    opacity: 0,
    transition: "opacity 0.35s ease",
  },
  photoTitle: {
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: 0,
  },
  expandIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#ffffff",
    fontSize: 18,
    opacity: 0.8,
  },
  lightboxOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.9)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 20,
  },
  lightboxContent: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lightboxClose: {
    position: "absolute",
    top: -48,
    right: 0,
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 12,
    color: "#ffffff",
    fontSize: 18,
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  lightboxImg: {
    maxWidth: "100%",
    maxHeight: "80vh",
    borderRadius: 16,
    objectFit: "contain",
  },
  lightboxTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "1.1rem",
    fontWeight: 600,
    marginTop: 16,
  },
};

/* Inject hover CSS for photo overlay and masonry responsive */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  #photography .photoCard:hover .photoOverlay,
  [style*="break-inside"]:hover > div:last-child {
    opacity: 1 !important;
  }

  @media (max-width: 768px) {
    #photography [style*="column-count"] {
      column-count: 2 !important;
    }
  }
  @media (max-width: 480px) {
    #photography [style*="column-count"] {
      column-count: 1 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Photography;
