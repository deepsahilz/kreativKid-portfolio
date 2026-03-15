import React, { useRef, useEffect, useCallback } from 'react'
import { gsap } from "gsap"

const HeroSection = () => {
  const containerRef = useRef(null);
  const idleAnimRef = useRef(null);
  const mouseIdleTimer = useRef(null);
  const idlePositionRef = useRef({ t: 0 });
  const lastSpawnTime = useRef(0);
  const lastMousePos = useRef(null);

  const isTouchDevice = () =>
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const createImg = useCallback((x, y) => {
    if (!containerRef.current) return;

    const img = document.createElement("img");
    const collection = Array.from({ length: 27 }, (_, i) => `/images/artworks/img (${i + 1}).webp`);
    const randomIndex = Math.floor(Math.random() * collection.length);
    img.src = collection[randomIndex];
    img.className = "pointer-events-none absolute";
    img.style.width = window.innerWidth < 768 ? '45vw' : '280px';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = 'translate(-50%, -50%)';
    containerRef.current.appendChild(img);

    gsap.set(img, { autoAlpha: 1, yPercent: 100, rotate: 0 });

    gsap.timeline()
      .to(img, { duration: 1.5, yPercent: 0, rotate: 10, ease: "expo.out" })
      .to(img, {
        duration: 1,
        autoAlpha: 0,
        rotate: 0,
        yPercent: 100,
        ease: 'expo.inOut',
        onComplete: () => img.remove(),
      });
  }, []);

  const clearIdleImages = useCallback(() => {
    if (!containerRef.current) return;
    const imgs = containerRef.current.querySelectorAll('img');
    imgs.forEach(img => {
      gsap.killTweensOf(img);
      gsap.to(img, { duration: 0.3, autoAlpha: 0, onComplete: () => img.remove() });
    });
  }, []);

  const stopIdleTrail = useCallback(() => {
    if (idleAnimRef.current) {
      cancelAnimationFrame(idleAnimRef.current);
      idleAnimRef.current = null;
    }
  }, []);

  const startIdleTrail = useCallback(() => {
    if (idleAnimRef.current) return;
    if (!containerRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;

    const centerX = isMobile ? vw * 0.5 : vw / 2.8;
    const centerY = isMobile ? vh * 0.35 : vh / 5;
    const amplitude = isMobile ? vw * 0.15 : vw * 0.20;

    idlePositionRef.current.t = 0;
    let lastSpawn = 0;
    const spawnInterval = isMobile ? 900 : 720;

    const tick = (timestamp) => {
      if (!idleAnimRef.current) return;

      idlePositionRef.current.t += 0.014;
      const t = idlePositionRef.current.t;

      const x = centerX + Math.sin(t) * amplitude;
      const y = centerY + Math.sin(t * 0.4) * (vh * 0.08);

      if (timestamp - lastSpawn > spawnInterval) {
        createImg(x, y);
        lastSpawn = timestamp;
      }

      idleAnimRef.current = requestAnimationFrame(tick);
    };

    idleAnimRef.current = requestAnimationFrame(tick);
  }, [createImg]);

  const createTrail = useCallback((e) => {
    if (isTouchDevice()) return;

    // Stop idle trail and clear its images the moment mouse moves
    if (idleAnimRef.current) {
      stopIdleTrail();
      clearIdleImages();
    }

    const now = performance.now();
    const curr = { x: e.clientX, y: e.clientY };
    const prev = lastMousePos.current;

    if (prev) {
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // spawn one image every ~120px of travel
      const step = 120;

      if (dist > step) {
        const steps = Math.floor(dist / step);
        for (let i = 1; i <= steps; i++) {
          const t = i / (steps + 1);
          const ix = prev.x + dx * t;
          const iy = prev.y + dy * t;
          // small stagger so they don't all pile up at once
          setTimeout(() => createImg(ix, iy), i * 30);
        }
      }
    }

    // always spawn at current cursor position if throttle allows
    if (now - lastSpawnTime.current > 300) {
      lastSpawnTime.current = now;
      createImg(curr.x, curr.y);
    }

    lastMousePos.current = curr;

    clearTimeout(mouseIdleTimer.current);
    mouseIdleTimer.current = setTimeout(() => {
      startIdleTrail();
    }, 3000);
  }, [createImg, stopIdleTrail, startIdleTrail, clearIdleImages]);

  useEffect(() => {
    startIdleTrail();
    return () => {
      stopIdleTrail();
      clearTimeout(mouseIdleTimer.current);
    };
  }, [startIdleTrail, stopIdleTrail]);

  return (
    <div className='relative w-full overflow-hidden bg-zinc-950 h-[100svh] font-nb text-white px-6 md:px-10'>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Grain texture */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-[0.04]" style={{ mixBlendMode: 'overlay' }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>

      {/* Image trail container — mouse on desktop, automated on mobile */}
      <div
        ref={containerRef}
        className="image-trail absolute top-0 left-0 w-full h-full"
        onMouseMove={!isTouchDevice() ? createTrail : undefined}
      />

      {/* Bottom text bar */}
      <div className='absolute flex justify-between items-end z-20 pointer-events-none bottom-7 left-6 md:left-10 md:right-10 right-6'>
        <h1 className='font-founders md:text-[12rem] text-[23vw] leading-none'>KREATIVKID*</h1>
        <div className='text-white items-center hidden md:flex gap-2 text-sm tracking-widest'>
          <span>ART</span>
          <span className='mb-0.5'>&bull;</span>
          <span>DESIGN</span>
          <span className='mb-0.5'>&bull;</span>
          <span>UI UX</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;