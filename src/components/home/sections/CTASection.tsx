'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { translations, type Locale } from '@/data/translations';
import Magnetic from '@/components/common/Magnetic';

interface Props {
  locale: Locale;
  isActive: boolean;
}

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance',   href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Twitter',   href: '#' },
];

const CTASection = forwardRef<HTMLElement, Props>(({ locale, isActive }, ref) => {
  const t = translations[locale].homepage;
  const copyright = translations[locale].common.footer.copyright;
  const contentRef = useRef<HTMLDivElement>(null);
  const bgTextRef  = useRef<HTMLDivElement>(null);
  const hasAnim    = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnim.current) return;
    hasAnim.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Giant background reveal
      tl.from(bgTextRef.current, {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'power4.out',
      }, 0.2);

      const els = contentRef.current?.querySelectorAll('.anim-in');
      if (els?.length) {
        tl.from(els, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
        }, 0.5);
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(5rem, 10vh, 7rem) var(--screen-padding) clamp(3rem, 6vh, 4rem)',
        overflowX: 'hidden',
        overflowY: 'auto',
        backgroundColor: 'var(--color-bg-dark)',
        textAlign: 'center',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Noise */}
      <div className="noise-overlay" />

      {/* Giant Background Text */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(10vw, 15vw, 20vw)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.015)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: 'var(--font-main)',
          zIndex: 1,
        }}
      >
        LET'S CREATE
      </div>

      <div ref={contentRef} style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        
        {/* Tag */}
        <div
          className="anim-in"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.25rem',
            color: 'var(--color-accent)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: '40px', height: '1px', background: 'var(--color-accent)' }} />
          Collaborate
          <span style={{ width: '40px', height: '1px', background: 'var(--color-accent)' }} />
        </div>

        {/* Huge Heading */}
        <h2
          className="anim-in"
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(2rem, min(8vw, 11vh), 8rem)',
            fontWeight: 900,
            color: 'var(--color-text-bright)',
            lineHeight: 0.85,
            letterSpacing: '-0.065em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Do you have<br />
          a <span style={{ color: 'var(--color-accent)' }}>Project</span><br />
          in mind?
        </h2>

        {/* Description */}
        <p
          className="anim-in"
          style={{
            fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
            lineHeight: 1.5,
            color: 'var(--color-text-dim)',
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            fontWeight: 300,
          }}
        >
          {t.h2}
        </p>

        {/* CTAs */}
        <div
          className="anim-in"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
        >
          <Magnetic strength={0.3}>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary-hero hover-target"
              style={{ padding: '1.2rem 4rem', fontSize: '0.8rem' }}
            >
              Get Started →
            </Link>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Link
              href={`mailto:hello@nothingagency.com`}
              className="hover-target"
              style={{
                color: 'white',
                opacity: 0.6,
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity 0.3s',
              }}
            >
              Or drop us an email
            </Link>
          </Magnetic>
        </div>
      </div>

      {/* ─── Bottom-left: social links ─── */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          left: 'var(--screen-padding)',
          display: 'flex',
          gap: '1.75rem',
          zIndex: 10,
        }}
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="hover-target"
            style={{
              color: 'var(--color-text-dim)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* ─── Bottom-right: copyright ─── */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
          right: 'var(--screen-padding)',
          color: 'rgba(255,255,255,0.15)',
          fontSize: '0.58rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          zIndex: 10,
        }}
      >
        {copyright}
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';
export default CTASection;
