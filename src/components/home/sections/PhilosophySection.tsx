'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { translations, type Locale } from '@/data/translations';

interface Props {
  locale: Locale;
  isActive: boolean;
}

import Magnetic from '@/components/common/Magnetic';

const PhilosophySection = forwardRef<HTMLElement, Props>(({ locale, isActive }, ref) => {
  const t = translations[locale];
  const contentRef = useRef<HTMLDivElement>(null);
  const bgTextRef  = useRef<HTMLDivElement>(null);
  const hasAnim    = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnim.current) return;
    hasAnim.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // BG text drifts in
      tl.from(bgTextRef.current, {
        x: '-12vw',
        opacity: 0,
        duration: 2,
        ease: 'expo.out',
      }, 0);

      // Content items
      const els = contentRef.current?.querySelectorAll('.anim-in');
      if (els?.length) {
        tl.from(els, {
          opacity: 0,
          y: 40,
          rotateX: 15,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power4.out',
        }, 0.2);
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  const values = translations[locale].about.values.items;

  return (
    <section
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 'clamp(5rem, 10vh, 7rem) var(--screen-padding) clamp(3rem, 6vh, 4rem)',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'var(--color-bg)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Massive "NOTHING" background text */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="philosophy-bg-text"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(15vw, 20vw, 25vw)',
          opacity: 0.015,
        }}
      >
        NOTHING
      </div>

      {/* Golden glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,179,28,0.06) 0%, transparent 70%)',
          bottom: '-20vw',
          right: '-10vw',
          pointerEvents: 'none',
        }}
      />

      {/* ─── Left: Text content ─── */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '65vw', marginLeft: '-0.3vw' }}>

        {/* Tag */}
        <div
          className="anim-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
            color: 'var(--color-accent)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
          Our Philosophy
        </div>

        {/* H2 */}
        <h2
          className="anim-in"
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(2rem, min(5.5vw, 9vh), 6.5rem)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.06em',
            lineHeight: 0.88,
            color: 'var(--color-text-bright)',
            marginBottom: '1rem',
          }}
        >
          {t.story.h1}
        </h2>

        {/* Body */}
        <p
          className="anim-in"
          style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            lineHeight: 1.6,
            color: 'var(--color-text-dim)',
            marginBottom: '1.5rem',
            maxWidth: '580px',
            fontWeight: 300,
          }}
        >
          {t.story.content}
        </p>

        {/* Values pills */}
        <div
          className="anim-in"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}
        >
          {values.map((v) => (
            <span
              key={v.title}
              style={{
                padding: '0.4rem 1.1rem',
                border: '1px solid rgba(240,179,28,0.25)',
                color: 'var(--color-accent)',
                fontSize: '0.62rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderRadius: '1px',
              }}
            >
              {v.title}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="anim-in" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Magnetic strength={0.2}>
            <Link href={`/${locale}/story`} className="btn-primary-hero hover-target" style={{ padding: '0.9rem 2.5rem' }}>
              Our Story
            </Link>
          </Magnetic>
          <Magnetic strength={0.15}>
            <Link href={`/${locale}/about`} className="btn-secondary-hero hover-target" style={{ padding: '0.9rem 2.5rem' }}>
              About Us
            </Link>
          </Magnetic>
        </div>
      </div>


      {/* ─── Right: Stat column ─── */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(2rem, 5vw, 6rem)',
          top: 'clamp(8rem, 13vh, 10rem)',
          transform: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          zIndex: 10,
          alignItems: 'center',
        }}
      >
        {[
          { sym: '∅', label: 'Start' },
          { sym: '→', label: 'Process' },
          { sym: '∞', label: 'Impact' },
        ].map((s) => (
          <div key={s.sym} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 900,
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              {s.sym}
            </div>
            <div
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-text-dim)',
                marginTop: '0.3rem',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}

        {/* Vertical line connecting symbols */}
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(240,179,28,0.3), transparent)',
            zIndex: -1,
          }}
        />
      </div>

    </section>
  );
});

PhilosophySection.displayName = 'PhilosophySection';
export default PhilosophySection;
