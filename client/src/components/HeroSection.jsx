import React, { useRef, useEffect, useCallback } from 'react'
import { gsap } from "gsap"

const HeroSection = () => {
  const containerRef = useRef(null);
  const spawnIndexRef = useRef(0);
  const activeCountRef = useRef(0);
  const schedulerRef = useRef(null);
  const usedRecentlyRef = useRef([]);

  const MAX_ACTIVE = 6;
  const SIZES = [130, 175, 155, 160, 145, 150];
  const RECENT_MEMORY = 8;

  const images = Array.from({ length: 27 }, (_, i) => `/images/artworks2/img${i + 1}.webp`);

  const ZONES = [
    { xMin: 0.05, xMax: 0.35, yMin: 0.08, yMax: 0.55 },
    { xMin: 0.65, xMax: 0.95, yMin: 0.08, yMax: 0.55 },
    { xMin: 0.20, xMax: 0.50, yMin: 0.12, yMax: 0.60 },
    { xMin: 0.50, xMax: 0.80, yMin: 0.12, yMax: 0.60 },
    { xMin: 0.10, xMax: 0.45, yMin: 0.30, yMax: 0.65 },
    { xMin: 0.55, xMax: 0.90, yMin: 0.30, yMax: 0.65 },
    { xMin: 0.30, xMax: 0.70, yMin: 0.08, yMax: 0.35 },
  ];

  const SPAWN_MIN = 380;
  const SPAWN_JITTER = 320;
  const INITIAL_BURST = 3;

  const TILT_RANGE = 18;
  const DRIFT_X_RANGE = 30;
  const DRIFT_Y_MIN = 20;
  const DRIFT_Y_EXTRA = 30;

  const ENTER_SCALE = 0.72;
  const ENTER_DURATION = 0.75;

  const HOLD_MIN = 1.4;
  const HOLD_JITTER = 0.8;

  const EXIT_DURATION = 0.9;
  const EXIT_SCALE = 0.88;

  const getRandomImage = useCallback(() => {
    const used = usedRecentlyRef.current;
    const available = images.filter(img => !used.includes(img));
    const pool = available.length > 0 ? available : images;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    usedRecentlyRef.current.push(pick);
    if (usedRecentlyRef.current.length > RECENT_MEMORY) usedRecentlyRef.current.shift();
    return pick;
  }, [images]);

  const spawnImage = useCallback(() => {
    if (!containerRef.current) return;
    if (activeCountRef.current >= MAX_ACTIVE) return;
    activeCountRef.current++;

    const W = containerRef.current.offsetWidth;
    const H = containerRef.current.offsetHeight;

    const zoneIndex = spawnIndexRef.current % ZONES.length;
    spawnIndexRef.current++;
    const zone = ZONES[zoneIndex];

    const x = W * (zone.xMin + Math.random() * (zone.xMax - zone.xMin));
    const y = H * (zone.yMin + Math.random() * (zone.yMax - zone.yMin));

    const size = SIZES[Math.floor(Math.random() * SIZES.length)];
    const tilt = (Math.random() - 0.5) * TILT_RANGE;
    const driftX = (Math.random() - 0.5) * DRIFT_X_RANGE;
    const driftY = -(DRIFT_Y_MIN + Math.random() * DRIFT_Y_EXTRA);

    const wrap = document.createElement('div');
    wrap.style.cssText = [
      'position:absolute',
      `width:${size}px`,
      `height:${size * 1.28}px`,
      `left:${x}px`,
      `top:${y}px`,
      'transform:translate(-50%,-50%)',
      'overflow:hidden',
      'border-radius:4px',
      'will-change:transform,opacity',
    ].join(';');

    const img = document.createElement('img');
    img.src = getRandomImage();
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:4px;';
    img.onerror = () => {};

    wrap.appendChild(img);
    containerRef.current.appendChild(wrap);

    gsap.set(wrap, {
      autoAlpha: 0,
      scale: ENTER_SCALE,
      rotate: tilt - 6,
      x: 0,
      y: 12,
    });

    gsap.timeline({
      onComplete: () => {
        wrap.remove();
        activeCountRef.current--;
      }
    })
      .to(wrap, {
        duration: ENTER_DURATION,
        autoAlpha: 1,
        scale: 1,
        rotate: tilt,
        y: 0,
        ease: 'expo.out',
      })
      .to(wrap, {
        duration: HOLD_MIN + Math.random() * HOLD_JITTER,
        x: driftX * 0.5,
        y: driftY * 0.4,
        rotate: tilt + (Math.random() - 0.5) * 4,
        ease: 'sine.inOut',
      })
      .to(wrap, {
        duration: EXIT_DURATION,
        autoAlpha: 0,
        scale: EXIT_SCALE,
        x: driftX,
        y: driftY,
        rotate: tilt + (Math.random() - 0.5) * 8,
        ease: 'expo.inOut',
      });
  }, [getRandomImage]);

  const scheduleNext = useCallback(() => {
    const delay = SPAWN_MIN + Math.random() * SPAWN_JITTER;
    schedulerRef.current = setTimeout(() => {
      spawnImage();
      scheduleNext();
    }, delay);
  }, [spawnImage]);

  useEffect(() => {
    for (let i = 0; i < INITIAL_BURST; i++) spawnImage();

    const kickoff = setTimeout(scheduleNext, 200);

    return () => {
      clearTimeout(kickoff);
      clearTimeout(schedulerRef.current);
    };
  }, [spawnImage, scheduleNext]);

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

      {/* Image trail container */}
      <div
        ref={containerRef}
        className="image-trail absolute top-0 left-0 w-full h-full"
      />

      {/* Bottom text bar */}
      <div className='absolute z-20 pointer-events-none bottom-8 left-6 right-6 md:left-10 md:right-10'>

        <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-end'>
          
          <h1 className='font-founders text-[22vw] md:text-[11rem] leading-none -my-3'>
            KREATIVKID*
          </h1>

          <p className='text-zinc-300 max-w-[320px] md:max-w-none text-sm md:text-base'>
            I design things that solve problems,<br/>
            build brands, help people,<br/>
            and leave something worth sharing.
          </p>

          <div className='hidden md:flex flex-col items-end gap-5'>
            <div className='text-white items-center bg-black border p-2 rounded-xl px-4 flex gap-2 text-sm tracking-widest'>
              <span>ART</span>
              <span className='mb-0.5'>&bull;</span>
              <span>GRAPHIC DESIGN</span>
              <span className='mb-0.5'>&bull;</span>
              <span>UI-UX</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default HeroSection;