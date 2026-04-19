'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { translations, type Locale } from '@/data/translations';

interface Props {
  locale: Locale;
  isActive: boolean;
  onNext?: () => void;
}

import Magnetic from '@/components/common/Magnetic';

const HeroSection = forwardRef<HTMLElement, Props>(({ locale, onNext }, ref) => {
  const t = translations[locale].homepage;
  const tagRef    = useRef<HTMLDivElement>(null);
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(tagRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power4.out',
      });

      const words = titleRef.current?.querySelectorAll('.hw');
      if (words?.length) {
        tl.from(words, {
          yPercent: 100,
          rotate: 5,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
        }, '-=0.5');
      }

      tl.from(subRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');

      if (ctaRef.current?.children.length) {
        tl.from([...Array.from(ctaRef.current.children)], {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }, '-=0.6');
      }

      tl.from(scrollRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }, '-=0.4');

      // Subtle parallax on BG text
      gsap.to(bgTextRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: ref as any,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const headlineWords = t.h1.split(' ');

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
        backgroundColor: 'var(--color-bg-dark)',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Animated glow blobs */}
      <div className="hero-glow hero-glow--gold" />
      <div className="hero-glow hero-glow--blue" />
      <div className="noise-overlay" />

      {/* Giant background ∅ */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-5vw',
          top: '30%',
          fontSize: 'clamp(25vw, 35vw, 45vw)',
          fontWeight: 900,
          color: 'rgba(240, 179, 28, 0.025)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          letterSpacing: '-0.1em',
          fontFamily: 'var(--font-main)',
        }}
      >
        ∅
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '100%', marginLeft: '-0.5vw' }}>
        <div
          ref={tagRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: 'clamp(1rem, 2.5vh, 1.5rem)',
            color: 'var(--color-accent)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
          Creative Ad Studio — Est. 2026
        </div>

        <h1
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(2.5rem, min(9vw, 14vh), 8.5rem)',
            fontWeight: 900,
            lineHeight: 0.82,
            letterSpacing: '-0.06em',
            textTransform: 'uppercase',
            color: 'var(--color-text-bright)',
            marginBottom: 'clamp(1rem, 2.5vh, 1.5rem)',
          }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                marginRight: word === 'From' || word === 'Build' ? '0.15em' : '0.2em',
                verticalAlign: 'bottom',
              }}
            >
              <span className="hw" style={{ display: 'inline-block' }}>
                {word === 'Nothing!' ? (
                  <span style={{ color: 'var(--color-accent)' }}>{word}</span>
                ) : word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subRef}
          style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
            lineHeight: 1.5,
            color: 'var(--color-text-dim)',
            maxWidth: '520px',
            marginBottom: 'clamp(1.25rem, 3vh, 2rem)',
            fontWeight: 300,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {t.h2}
        </p>

      </div>

      {/* CTAs — pinned to bottom so they're always visible */}
      <div
        ref={ctaRef}
        style={{
          position: 'absolute',
          bottom: 'clamp(3rem, 7vh, 5rem)',
          left: 'var(--screen-padding)',
          zIndex: 20,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          alignItems: 'center',
        }}
      >
        <Magnetic strength={0.2}>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary-hero hover-target"
            style={{ padding: '0.85rem 2rem' }}
          >
            {t.cta_primary}
          </Link>
        </Magnetic>

        <Magnetic strength={0.15}>
          <button
            onClick={onNext}
            className="btn-secondary-hero hover-target"
            style={{ padding: '0.85rem 2rem' }}
          >
            {t.cta_secondary}
            <span style={{ display: 'inline-block', marginLeft: '0.35rem' }}>→</span>
          </button>
        </Magnetic>
      </div>

      <button
        ref={scrollRef}
        onClick={onNext}
        style={{
          position: 'absolute',
          bottom: 'clamp(3rem, 7vh, 5rem)',
          right: 'var(--screen-padding)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)',
          padding: 0,
          zIndex: 20,
        }}
        className="hover-target"
      >
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>
          Explore
        </span>
        <div style={{ width: '1px', height: '64px', background: 'rgba(240,179,28,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div className="scroll-line-inner" style={{ position: 'absolute', inset: 0, background: 'var(--color-accent)', transformOrigin: 'top' }} />
        </div>
      </button>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
