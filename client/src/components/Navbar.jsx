import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom"

const NavEffects = ({ text, target, font, isLogo }) => {
  return (
    <NavLink
      to={target}
      className={`overflow-hidden relative h-6 ${isLogo ? "text-xl" : ""} cursor-pointer hover:text-zinc-500 ${font ? `font-${font}` : ""}`}
    >
      <span className='block uppercase transition-transform duration-300 ease-in-out hover:-translate-y-full'>
        <span className='block'>{text}</span>
        <span className='block absolute left-0 top-full'>{text}</span>
      </span>
    </NavLink>
  )
}

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showMenu]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const prev = lastScrollY.current;

      if (current <= 20) {
        setScrolled(false);
        setHidden(false);
      } else {
        setScrolled(true);
        if (current > prev && current > 400) {
          setHidden(true);
        } else if (current < prev) {
          setHidden(false);
        }
      }

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Desktop / top bar ── */}
      <div className={`fixed top-2 w-full z-50 flex justify-center transition-all duration-500 ease-in-out
  ${hidden ? '-translate-y-16' : 'translate-y-0'}`}>
        <div
          className={`relative transition-all duration-500 ease-in-out px-6 md:px-10 rounded-2xl overflow-hidden
            ${scrolled
              ? 'w-[90%] md:w-[75%] backdrop-blur-md bg-zinc-800/60 border border-zinc-700/40 shadow-lg'
              : 'w-full'
            }`}
        >

          {/* Grain overlay */}
          {scrolled && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '150px 150px',
                opacity: 0.08,
                mixBlendMode: 'overlay',
              }}
            />
          )}
          <div className='relative z-10 flex justify-between items-center py-4 mix-blend-difference text-zinc-100'>
          {/* <div className='flex justify-between items-center py-4 mix-blend-difference text-zinc-100'> */}
            <NavEffects target="/" text="kreativkid" isLogo="true" font="rejouice" />

            <ul className='hidden lg:flex gap-5'>
              <NavEffects target="/" text="home" />
              <NavEffects target="/work" text="Work" />
              <NavEffects target="/about" text="about" />
            </ul>

            <ul className='hidden lg:flex'>
              <NavEffects text="Contact" target="/contact" />
            </ul>

            {/* Hamburger — inside the pill */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='flex lg:hidden flex-col justify-center gap-[5px] w-8 h-8'
              aria-label="Toggle menu"
            >
              <span className={`block w-full h-0.5 origin-center transition-all duration-300 ${showMenu ? 'translate-y-[7px] rotate-45 bg-zinc-100' : 'bg-white'}`} />
              <span className={`block w-full h-0.5 transition-all duration-200 ${showMenu ? 'opacity-0 scale-x-0 bg-zinc-100' : 'bg-white'}`} />
              <span className={`block w-full h-0.5 origin-center transition-all duration-300 ${showMenu ? '-translate-y-[7px] -rotate-45 bg-zinc-100' : 'bg-white'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col lg:hidden transition-all duration-500 ease-in-out
          ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: '#0f0f0f' }}
      >
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,1) 0%, transparent 100%)' }} />

        <div className="flex flex-col justify-between h-full px-6 pt-28 pb-12">
          <nav className="flex flex-col gap-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/work', label: 'Work' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }, i) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center justify-between py-4 border-b border-zinc-800/60 text-zinc-100 hover:text-zinc-400 transition-all duration-200"
                style={{
                  opacity: showMenu ? 1 : 0,
                  transform: showMenu ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s ease ${0.1 + i * 0.07}s, color 0.2s`,
                }}
              >
                <span className="text-3xl font-semibold uppercase tracking-tight">{label}</span>
                <span className="text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-200 text-lg">↗</span>
              </Link>
            ))}
          </nav>

          <div
            className="flex flex-col gap-6"
            style={{
              opacity: showMenu ? 1 : 0,
              transform: showMenu ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.4s ease 0.4s, transform 0.4s ease 0.4s`,
            }}
          >
            <div className="flex flex-col gap-3">
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-600">Socials</span>
              <div className="flex gap-5">
                {['Instagram', 'Behance', 'Upwork'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-sm text-zinc-400 hover:text-zinc-100 uppercase tracking-widest transition-colors duration-200"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar