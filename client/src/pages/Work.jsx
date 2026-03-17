import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiExpandAlt } from "react-icons/bi";

const Work = () => {
  const navigate = useNavigate();
  const [imageCount, setImageCount] = useState(20);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setModalImg(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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

      <div className="relative z-[2] px-3 pb-24 md:px-10 md:pb-32">

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 justify-between pt-28 md:pb-30 pb-12">

          {/* Eyebrow */}
          {/* <div className={`flex items-center gap-3 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="block w-8 h-px bg-[#f0ede8]/30" />
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-[#f0ede8]/45 font-medium">Selected Work</span>
            <span className="block w-8 h-px bg-[#f0ede8]/30" />
          </div> */}

          {/* Title — plain, no gradient */}
          <h1
            className={`text-[clamp(5rem,18vw,17rem)] md:-my-10 font-founders font-bold uppercase  leading-[0.88]  text-[#f0ede8] transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            Work
          </h1>
          <p className='max-w-xl  text-zinc-400'>Everything here was made with intent — from client briefs to late-night personal projects. Photoshop edits, graphic designs, logos, and everything in between."</p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-5 gap-1.5 md:gap-2">
          {Array.from({ length: imageCount }, (_, i) => {
            const idx = i + 1;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => setModalImg(idx)}
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
                    <span className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center text-sm text-white"><BiExpandAlt/></span>
                  </div>
                </div>

                {/* Index badge */}
                {/* <div
                  className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 text-[0.6rem] text-[#f0ede8]/50 font-mono tracking-[0.1em] transition-opacity duration-200"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  {String(idx).padStart(2, '0')}
                </div> */}
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

      {/* Simple Image Modal */}
      {modalImg !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={() => setModalImg(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/images/work/img (${modalImg}).webp`}
              alt={`Artwork ${modalImg}`}
              className="block max-w-full max-h-[90vh] rounded-[4px] object-contain shadow-2xl"
            />
            {/* Close button */}
            <button
              onClick={() => setModalImg(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#f0ede8]/20 flex items-center justify-center text-[#f0ede8]/60 hover:text-[#f0ede8] hover:border-[#f0ede8]/50 transition-all duration-200 text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Work;