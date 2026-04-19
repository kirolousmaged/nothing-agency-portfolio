'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { translations, type Locale } from '@/data/translations';
import Magnetic from '@/components/common/Magnetic';

interface Props {
  locale: Locale;
  isActive: boolean;
}

const ServicesSection = forwardRef<HTMLElement, Props>(({ locale, isActive }, ref) => {
  const t = translations[locale].services;
  const [hovered, setHovered] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasAnim = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnim.current) return;
    hasAnim.current = true;

    const ctx = gsap.context(() => {
      const els = contentRef.current?.querySelectorAll('.anim-in');
      if (els?.length) {
        gsap.from(els, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
        });
      }

      const rows = listRef.current?.children;
      if (rows?.length) {
        gsap.from(rows, {
          opacity: 0,
          x: -40,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4,
        });
      }
    });

    return () => ctx.revert();
  }, [isActive]);

  const services = t.items.map((item: any) => ({
    title: item.title,
    desc: item.desc
  }));

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
      <div className="noise-overlay" />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div ref={contentRef}>
          <div
            className="anim-in"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              color: 'var(--color-accent)',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
            {t.h1}
          </div>
          <h2
            className="anim-in"
            style={{
              fontFamily: 'var(--font-main)',
              fontSize: 'clamp(2rem, min(5.5vw, 9vh), 5.5rem)',
              marginBottom: 'clamp(1rem, 3vh, 2.5rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
              color: 'var(--color-text-bright)',
              marginLeft: '-0.3vw',
            }}
          >
            We Build<br />
            <span style={{ color: 'var(--color-accent)' }}>Empires</span><br />
            From Nothing.
          </h2>
        </div>

        <div
          ref={listRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="hover-target"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: 'clamp(0.55rem, 1.5vh, 1.1rem) 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                transition: 'padding 0.4s ease',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-main)',
                  fontSize: '0.7rem',
                  paddingTop: '0.45rem',
                  color: hovered === i ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
                  transition: 'color 0.3s',
                }}
              >
                0{i + 1}
              </span>

              <div style={{ flex: 1, padding: '0 2rem' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(1.2rem, min(3vw, 3.5vh), 2rem)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    color: hovered === i ? 'var(--color-accent)' : 'var(--color-text-bright)',
                    transition: 'color 0.4s, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                    transform: hovered === i ? 'translateX(12px)' : 'none',
                  }}
                >
                  {svc.title}
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-dim)',
                    lineHeight: 1.5,
                    maxWidth: '480px',
                    marginTop: hovered === i ? '0.65rem' : 0,
                    maxHeight: hovered === i ? '100px' : '0',
                    overflow: 'hidden',
                    opacity: hovered === i ? 1 : 0,
                    transition: 'all 0.4s ease',
                    fontWeight: 300,
                  }}
                >
                  {svc.desc}
                </div>
              </div>

              <span
                style={{
                  fontSize: '1.1rem',
                  paddingTop: '0.2rem',
                  color: hovered === i ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
                  transform: hovered === i ? 'translateX(8px)' : 'none',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s',
                }}
              >
                →
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
          <Magnetic strength={0.25}>
            <Link
              href={`/${locale}/services`}
              className="hover-target"
              style={{
                color: 'var(--color-accent)',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                borderBottom: '1px solid rgba(240,179,28,0.4)',
                paddingBottom: '0.35rem',
                transition: 'border-color 0.3s, color 0.3s',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Explore all our services →
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
export default ServicesSection;
