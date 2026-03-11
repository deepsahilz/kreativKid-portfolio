import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const FILTERS = ["All", "Concept arts", "Logo designs", "UI/UX", "Poster designs"];

const Work = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageCount, setImageCount] = useState(20);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [visible, setVisible] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleLoadMore = () => setImageCount(c => c + 10);

  return (
    <div
      style={{
        background: '#0a0a0a',
        color: '#f0ede8',
        minHeight: '100vh',
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.5,
      }} />

      {/* Accent glow */}
      <div style={{
        position: 'fixed', top: '-20vh', right: '-10vw', width: '60vw', height: '60vw',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(130,90,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 8rem' }}>

        {/* Header */}
        <div style={{
          paddingTop: '7rem',
          paddingBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}>
          {/* Eyebrow */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ display: 'block', width: 32, height: 1, background: 'rgba(240,237,232,0.3)' }} />
            <span style={{
              fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(240,237,232,0.45)', fontWeight: 500,
            }}>Selected Work</span>
            <span style={{ display: 'block', width: 32, height: 1, background: 'rgba(240,237,232,0.3)' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(5rem, 18vw, 17rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            textTransform: 'uppercase',
            textAlign: 'center',
            fontFamily: "'DM Sans', sans-serif",
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            // Split color trick
            background: 'linear-gradient(180deg, #f0ede8 60%, rgba(240,237,232,0.25) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Work</h1>
        </div>

        {/* Filter pills */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '0.5rem', marginBottom: '3.5rem',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s',
        }}>
          {FILTERS.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 999,
                border: `1px solid ${activeFilter === f ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.18)'}`,
                background: activeFilter === f ? 'rgba(240,237,232,0.08)' : 'transparent',
                color: activeFilter === f ? '#f0ede8' : 'rgba(240,237,232,0.45)',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
              }}
            >{f}</button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{
          columns: 4,
          gap: '0.75rem',
        }}>
          {Array.from({ length: imageCount }, (_, i) => {
            const idx = i + 1;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/work/${idx}`)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: 'relative',
                  marginBottom: '0.75rem',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  breakInside: 'avoid',
                  borderRadius: 4,
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${Math.min(i * 0.04, 0.6)}s, transform 0.5s ease ${Math.min(i * 0.04, 0.6)}s`,
                }}
              >
                {/* Image */}
                <img
                  src={`/images/work/img (${idx}).webp`}
                  alt={`Artwork ${idx}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                  }}
                />

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(160deg, rgba(90,50,200,0.55) 0%, rgba(0,0,0,0.3) 100%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1rem',
                }}>
                  <div style={{
                    transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'transform 0.3s ease',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-end', width: '100%',
                  }}>
                    <span style={{
                      fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.75)',
                    }}>View</span>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.9rem', color: 'white',
                    }}>↗</span>
                  </div>
                </div>

                {/* Index badge */}
                <div style={{
                  position: 'absolute', top: '0.6rem', left: '0.6rem',
                  background: 'rgba(10,10,10,0.6)',
                  backdropFilter: 'blur(6px)',
                  borderRadius: 999,
                  padding: '0.18rem 0.55rem',
                  fontSize: '0.6rem',
                  color: 'rgba(240,237,232,0.5)',
                  letterSpacing: '0.1em',
                  fontFamily: 'monospace',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.25s ease',
                }}>
                  {String(idx).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginTop: '4rem',
        }}>
          <button
            onClick={handleLoadMore}
            style={{
              position: 'relative',
              background: 'transparent',
              border: '1px solid rgba(240,237,232,0.25)',
              color: '#f0ede8',
              padding: '0.85rem 2.5rem',
              borderRadius: 999,
              fontSize: '0.78rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'inherit',
              overflow: 'hidden',
              transition: 'border-color 0.25s, color 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(240,237,232,0.7)';
              e.currentTarget.style.background = 'rgba(240,237,232,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(240,237,232,0.25)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Load more artworks
          </button>
        </div>

        {/* Work count */}
        <p style={{
          textAlign: 'center', marginTop: '1.25rem',
          fontSize: '0.7rem', letterSpacing: '0.12em',
          color: 'rgba(240,237,232,0.25)',
          textTransform: 'uppercase',
        }}>
          Showing {imageCount} works
        </p>
      </div>
    </div>
  );
};

export default Work;