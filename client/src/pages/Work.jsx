import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const FILTERS = ["All", "Concept arts", "Logo designs", "UI/UX", "Poster designs"];

const Work = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [imageCount, setImageCount] = useState(20);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-[#f0ede8] min-h-screen relative overflow-hidden" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent glow */}
      <div
        className="fixed -top-[20vh] -right-[10vw] w-[60vw] h-[60vw] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(130,90,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-[2] px-3 pb-24 md:px-10 md:pb-32">

        {/* Header */}
        <div className="flex flex-col items-center gap-6 pt-28 pb-8">

          {/* Eyebrow */}
          <div className={`flex items-center gap-3 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="block w-8 h-px bg-[#f0ede8]/30" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#f0ede8]/45 font-medium">Selected Work</span>
            <span className="block w-8 h-px bg-[#f0ede8]/30" />
          </div>

          {/* Title */}
          <h1
            className={`text-[clamp(5rem,18vw,17rem)] font-bold uppercase text-center leading-[0.88] tracking-[-0.03em] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{
              background: 'linear-gradient(180deg, #f0ede8 60%, rgba(240,237,232,0.2) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Work
          </h1>
        </div>

        {/* Filter pills */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {FILTERS.map((f, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[0.75rem] uppercase tracking-[0.08em] cursor-pointer transition-all duration-200 border
                ${activeFilter === f
                  ? 'border-[#f0ede8]/80 bg-[#f0ede8]/8 text-[#f0ede8]'
                  : 'border-[#f0ede8]/18 bg-transparent text-[#f0ede8]/45 hover:text-[#f0ede8]/70 hover:border-[#f0ede8]/35'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-6 gap-1.5 md:gap-2">
          {Array.from({ length: imageCount }, (_, i) => {
            const idx = i + 1;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/work/${idx}`)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative mb-1.5 md:mb-3 overflow-hidden rounded-[3px] cursor-pointer break-inside-avoid"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${Math.min(i * 0.04, 0.6)}s, transform 0.5s ease ${Math.min(i * 0.04, 0.6)}s`,
                }}
              >
                {/* Image */}
                <img
                  src={`/images/work/img (${idx}).webp`}
                  alt={`Artwork ${idx}`}
                  className="block w-full h-auto object-cover"
                  style={{
                    transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                  }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-end p-3 md:p-4"
                  style={{
                    background: 'linear-gradient(160deg, rgba(90,50,200,0.55) 0%, rgba(0,0,0,0.3) 100%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div
                    className="flex justify-between items-end w-full"
                    style={{
                      transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <span className="text-[0.65rem] tracking-[0.12em] uppercase text-white/75">View</span>
                    <span className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center text-sm text-white">↗</span>
                  </div>
                </div>

                {/* Index badge */}
                <div
                  className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 text-[0.6rem] text-[#f0ede8]/50 font-mono tracking-[0.1em] transition-opacity duration-200"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  {String(idx).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load more */}
        <div className="flex flex-col items-center gap-4 mt-16">
          <button
            onClick={() => setImageCount(c => c + 10)}
            className="border border-[#f0ede8]/25 hover:border-[#f0ede8]/60 hover:bg-[#f0ede8]/5 text-[#f0ede8] rounded-full px-10 py-3 text-[0.78rem] uppercase tracking-[0.15em] cursor-pointer transition-all duration-200"
          >
            Load more artworks
          </button>
          <span className="text-[0.7rem] tracking-[0.12em] uppercase text-[#f0ede8]/25">
            Showing {imageCount} works
          </span>
        </div>

      </div>
    </div>
  );
};

export default Work;