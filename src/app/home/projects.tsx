"use client";

import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Steel Main Gate",
    location: "Lucknow, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 2,
    title: "Balcony Railing",
    location: "Kanpur, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 3,
    title: "Industrial Shed",
    location: "Noida, UP",
    category: "Industrial",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 4,
    title: "Window Grill",
    location: "Agra, UP",
    category: "Custom Work",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 5,
    title: "Modern Staircase",
    location: "Varanasi, UP",
    category: "Residential",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
  {
    id: 6,
    title: "MS Structure",
    location: "Lucknow, UP",
    category: "Industrial",
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&q=80",
    color: "#FF6B00",
  },
];

const stats = [
  { value: "500+", label: "Projects" },
  { value: "15+", label: "Years" },
  { value: "100%", label: "Quality" },
  { value: "24/7", label: "Support" },
];

const categoryColors: Record<string, string> = {
  Residential: "#FF6B00",
  Industrial: "#FF6B00",
  "Custom Work": "#FF6B00",
};

export default function Project() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, projects.length - 1));
  };

  return (
    <section
      style={{
        background: "#ffffff",
        padding: "60px 0 0 0",
        fontFamily: "'Barlow', 'Oswald', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Oswald:wght@500;600;700&display=swap');

        .proj-card {
          flex: 0 0 260px;
          height: 340px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          scroll-snap-align: center;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }
        .proj-card:active {
          transform: scale(0.97);
        }
        .proj-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }
        .proj-card:hover img {
          transform: scale(1.04);
        }
        .proj-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 30%,
            rgba(0,0,0,0.45) 58%,
            rgba(0,0,0,0.85) 100%
          );
        }
        .proj-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 16px 16px;
        }
        .proj-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          background: #FF6B00;
          color: #fff;
          margin-bottom: 7px;
        }
        .proj-title {
          font-family: 'Oswald', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 4px;
          letter-spacing: 0.3px;
        }
        .proj-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .proj-location {
          font-family: 'Barlow', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          letter-spacing: 0.2px;
        }
        .proj-dot {
          width: 3px;
          height: 3px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
        }
        .proj-status {
          font-size: 11px;
          color: #4ade80;
          font-weight: 500;
          font-family: 'Barlow', sans-serif;
        }

        /* Scroll track */
        .proj-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 8px 20px 16px;
          scrollbar-width: none;
        }
        .proj-track::-webkit-scrollbar { display: none; }

        /* Dots */
        .dot-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 6px;
          padding-bottom: 4px;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e5e7eb;
          transition: background 0.3s, width 0.3s;
        }
        .dot.active {
          background: #FF6B00;
          width: 20px;
          border-radius: 4px;
        }

        /* Stats */
        .stats-strip {
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
          margin-top: 36px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          padding: 24px 10px;
          text-align: center;
          border-right: 1px solid #e5e7eb;
          position: relative;
        }
        .stat-item:last-child { border-right: none; }
        .stat-value {
          font-family: 'Oswald', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #FF6B00;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 500;
        }

        /* Decorative line */
        .accent-line {
          width: 36px;
          height: 3px;
          background: #FF6B00;
          border-radius: 2px;
          margin: 8px 0 14px;
        }
      `}</style>

      {/* Section Header */}
      <div style={{ padding: "0 20px" }}>
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#FF6B00",
            margin: "0 0 6px",
          }}
        >
          Our Projects
        </p>
        <h2
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "30px",
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "0.5px",
          }}
        >
          Recent Fabrication
          <br />
          <span style={{ color: "#FF6B00" }}>Work</span>
        </h2>
        <div className="accent-line" />
        <p
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: "13px",
            color: "#6b7280",
            lineHeight: 1.6,
            margin: 0,
            maxWidth: "300px",
          }}
        >
          Precision-crafted welding and fabrication projects completed for
          homes, shops and industries.
        </p>
      </div>

      {/* Swipe Cards */}
      <div
        className="proj-track"
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ marginTop: "24px" }}
      >
        {projects.map((p, i) => (
          <div className="proj-card" key={p.id}>
            <img src={p.image} alt={p.title} loading="lazy" />
            <div className="proj-overlay" />
            <div className="proj-bottom">
              <span className="proj-badge">{p.category}</span>
              <h3 className="proj-title">{p.title}</h3>
              <div className="proj-meta">
                <span className="proj-location">📍 {p.location}</span>
                <div className="proj-dot" />
                <span className="proj-status">✓ {p.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="dot-row">
        {projects.map((_, i) => (
          <div key={i} className={`dot${activeIdx === i ? " active" : ""}`} />
        ))}
      </div>

      {/* Stats Strip */}
      <div className="stats-strip">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}