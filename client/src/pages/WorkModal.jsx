import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const TOTAL = 30;

const WorkModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [beforeExists, setBeforeExists] = useState(true);
  const containerRef = useRef(null);
  const hintTimer = useRef(null);

  const prevId = parseInt(id) > 1 ? parseInt(id) - 1 : null;
  const nextId = parseInt(id) < TOTAL ? parseInt(id) + 1 : null;

  useEffect(() => {
    setVisible(false);
    setSliderPos(50);
    setShowHint(true);
    setBeforeExists(true); // reset, probe via img onError
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [id]);

  const hideHint = () => {
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowHint(false), 1000);
  };

  const updateSlider = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
    hideHint();
  };

  const handleTouchMove = (e) => {
    updateSlider(e.touches[0].clientX);
    hideHint();
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, []);

  return (
    <div className="bg-zinc-950 w-screen h-screen overflow-hidden relative text-zinc-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)' }}
      />

      {/* ── Top bar ── */}
      <div className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>

        {/* Back */}
        <button
          onClick={() => navigate('/work')}
          className="flex items-center gap-2 bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/60 backdrop-blur-md rounded-full px-3 py-2 md:px-4 text-xs uppercase tracking-widest text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M8 2L3 6.5L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Counter */}
        <span className="bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md rounded-full px-3 py-2 md:px-4 text-xs tracking-widest text-zinc-400 font-mono shadow-lg">
          {String(id).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>

        {/* Before / After toggle */}
        <div className="flex gap-1 bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md rounded-full p-1 shadow-lg">
          {['Before', 'After'].map((label, i) => {
            const active = i === 0 ? sliderPos < 10 : sliderPos > 90;
            return (
              <button
                key={label}
                onClick={() => { setSliderPos(i === 0 ? 0 : 100); hideHint(); }}
                className={`px-2.5 py-1.5 md:px-3 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${active ? 'bg-white/15 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Image comparison ── */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={(e) => { updateSlider(e.clientX); hideHint(); }}
        className={`absolute inset-0 flex items-center justify-center select-none ${isDragging ? 'cursor-col-resize' : 'cursor-crosshair'}`}
      >
        {/* After (base layer) */}
        <img
          src={`/images/work/img (${id})b.jpg`}
          alt="After"
          draggable={false}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Before (clipped) — gray fallback if image missing */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {beforeExists ? (
            <img
              src={`/images/work/img (${id}).webp`}
              alt="Before"
              draggable={false}
              onError={() => setBeforeExists(false)}
              className={`w-full h-full object-contain transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
            />
          ) : (
            <div className="w-full h-full bg-zinc-700 flex flex-col items-center justify-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-zinc-500">
                <rect x="3" y="3" width="22" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 20l6-6 4 4 4-5 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="10" r="2" fill="currentColor"/>
              </svg>
              <span className="text-zinc-500 text-xs uppercase tracking-widest">No before image</span>
            </div>
          )}
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/60 pointer-events-none z-10"
          style={{
            left: `${sliderPos}%`,
            transform: 'translateX(-50%)',
            boxShadow: '0 0 12px rgba(255,255,255,0.25)',
          }}
        />

        {/* Drag handle */}
        <div
          className="absolute z-10 pointer-events-none w-11 h-11 rounded-full bg-zinc-900/90 border-2 border-white/70 backdrop-blur-md flex items-center justify-center shadow-2xl"
          style={{ left: `${sliderPos}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {/* Left arrow */}
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M6 1L1 7L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 1L19 7L14 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Floating before/after chips */}
        <div className="absolute inset-0 pointer-events-none z-10 flex items-end pb-20 md:pb-28 px-4 md:px-6 justify-between">
          <span
            className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 md:px-3 text-xs uppercase tracking-widest text-zinc-500 transition-opacity duration-300"
            style={{ opacity: sliderPos > 8 ? 1 : 0 }}
          >Before</span>
          <span
            className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1 md:px-3 text-xs uppercase tracking-widest text-zinc-500 transition-opacity duration-300"
            style={{ opacity: sliderPos < 92 ? 1 : 0 }}
          >After</span>
        </div>

        {/* Drag hint */}
        <div className={`absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs uppercase tracking-widest text-zinc-500 transition-opacity duration-500 whitespace-nowrap ${showHint && visible ? 'opacity-100' : 'opacity-0'}`}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M3 1L1 5L3 9M9 1L11 5L9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Drag to compare
        </div>
      </div>

      {/* ── Prev / Next ── */}
      <div className={`absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-2 transition-all duration-500 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <button
          onClick={() => prevId && navigate(`/work/${prevId}`)}
          disabled={!prevId}
          className={`bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-2 md:px-5 text-xs uppercase tracking-widest transition-all ${prevId ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer' : 'text-zinc-700 cursor-default'}`}
        >
          <span className="hidden sm:inline">← Prev</span>
          <span className="sm:hidden">←</span>
        </button>

        {/* Middle: work grid link on mobile */}
        <button
          onClick={() => navigate('/work')}
          className="sm:hidden bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-2 text-xs uppercase tracking-widest text-zinc-400 cursor-pointer"
        >
          ⊞
        </button>

        <button
          onClick={() => nextId && navigate(`/work/${nextId}`)}
          disabled={!nextId}
          className={`bg-zinc-900/80 border border-zinc-700/60 backdrop-blur-md rounded-full px-4 py-2 md:px-5 text-xs uppercase tracking-widest transition-all ${nextId ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer' : 'text-zinc-700 cursor-default'}`}
        >
          <span className="hidden sm:inline">Next →</span>
          <span className="sm:hidden">→</span>
        </button>
      </div>

    </div>
  );
};

export default WorkModal;