'use client';

import { forwardRef, useEffect, useRef, useState, type MutableRefObject } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import projects from '@/data/projects.json';
import { type Locale } from '@/data/translations';

interface Props {
  locale: Locale;
  isActive: boolean;
  onAtStart: (v: boolean) => void;
  onAtEnd: (v: boolean) => void;
  nextRef: MutableRefObject<(() => void) | null>;
  prevRef: MutableRefObject<(() => void) | null>;
}

const ProjectsSection = forwardRef<HTMLElement, Props>(
  ({ locale, onAtStart, onAtEnd, nextRef, prevRef }, ref) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Wire up next/prev refs for parent's wheel handler
    useEffect(() => {
      if (!swiper) return;
      nextRef.current = () => swiper.slideNext(650);
      prevRef.current = () => swiper.slidePrev(650);
      onAtStart(swiper.isBeginning);
      onAtEnd(swiper.isEnd);
    }, [swiper, nextRef, prevRef, onAtStart, onAtEnd]);

    const handleChange = (s: SwiperType) => {
      setActiveIdx(s.realIndex);
      onAtStart(s.isBeginning);
      onAtEnd(s.isEnd);
    };

    return (
      <section
        ref={ref}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-dark)',
        }}
      >
        {/* ─── Swiper ─── */}
        <Swiper
          className="projects-swiper"
          onSwiper={setSwiper}
          onSlideChange={handleChange}
          allowTouchMove={true}
          speed={700}
          threshold={10}
          style={{ width: '100%', height: '100%' }}
        >
          {projects.map((project, i) => (
            <SwiperSlide key={project.id} style={{ position: 'relative' }}>
              {/* Background image */}
              <div
                ref={el => { bgRefs.current[i] = el; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'scale(1.06)',
                  transition: 'transform 6s ease',
                }}
              />

              {/* Multi-stop overlay — dark left, fades right */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to right, rgba(5,10,17,0.95) 0%, rgba(5,10,17,0.7) 40%, rgba(5,10,17,0.25) 70%, transparent 100%)',
                }}
              />
              {/* Bottom gradient for legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(5,10,17,0.6) 0%, transparent 40%)',
                }}
              />

              {/* ─── Project info ─── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding:
                    'clamp(6rem, 12vh, 8rem) var(--screen-padding) clamp(4rem, 8vh, 7rem)',
                  zIndex: 10,
                }}
              >
                {/* Category */}
                <span
                  style={{
                    color: 'var(--color-accent)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
                  {project.category}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(2.5rem, 8vw, 8.5rem)',
                    fontWeight: 900,
                    color: '#fff',
                    lineHeight: 0.82,
                    letterSpacing: '-0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    marginLeft: '-0.5vw',
                  }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.15rem)',
                    maxWidth: '420px',
                    marginBottom: '2.5rem',
                    lineHeight: 1.5,
                    fontWeight: 300,
                  }}
                >
                  {project.description}
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <Link
                    href={`/${locale}/project/${project.slug}`}
                    className="hover-target"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: '#fff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(255,255,255,0.3)',
                      paddingBottom: '0.35rem',
                      width: 'fit-content',
                      transition: 'border-color 0.3s, color 0.3s',
                      textDecoration: 'none',
                    }}
                  >
                    View Project →
                  </Link>

                  <Link
                    href={`/${locale}/contact`}
                    className="hover-target"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      color: 'var(--color-accent)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(240,179,28,0.3)',
                      paddingBottom: '0.35rem',
                      width: 'fit-content',
                      transition: 'border-color 0.3s, color 0.3s',
                      textDecoration: 'none',
                    }}
                  >
                    Start a similar project
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* ─── CTA slide ─── */}
          <SwiperSlide style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #050a11 0%, #0b1a28 60%, #0d1f30 100%)',
            }} />
            {/* Subtle gold glow */}
            <div style={{
              position: 'absolute',
              width: '70vw',
              height: '70vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(240,179,28,0.07) 0%, transparent 65%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />
            {/* Large faded ∅ */}
            <div aria-hidden="true" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(30vw, 50vw, 60vw)',
              fontFamily: 'var(--font-main)',
              fontWeight: 900,
              color: 'rgba(240,179,28,0.03)',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              letterSpacing: '-0.08em',
            }}>∅</div>

            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: 'clamp(5rem, 10vh, 7rem) var(--screen-padding)',
              zIndex: 10,
            }}>
              {/* Tag */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                color: 'var(--color-accent)',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
              }}>
                <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
                Our Work
                <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
              </div>

              {/* Heading */}
              <h2 style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(2.5rem, min(7vw, 12vh), 7rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.05em',
                lineHeight: 0.88,
                color: 'var(--color-text-bright)',
                marginBottom: '1.5rem',
              }}>
                See the Full<br />
                <span style={{ color: 'var(--color-accent)' }}>Portfolio</span>
              </h2>

              <p style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                color: 'var(--color-text-dim)',
                maxWidth: '420px',
                marginBottom: '3rem',
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                Every project starts from nothing. Browse all our work and find what's possible.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link
                  href={`/${locale}/projects`}
                  className="btn-primary-hero hover-target"
                  style={{ padding: '0.9rem 2.5rem' }}
                >
                  View All Projects →
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-secondary-hero hover-target"
                  style={{ padding: '0.9rem 2.5rem' }}
                >
                  Let's Talk →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* ─── Label top-left ─── */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(5rem, 10vh, 7.5rem)',
            left: 'var(--screen-padding)',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--color-accent)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          <span style={{ width: '32px', height: '1px', background: 'var(--color-accent)', display: 'inline-block' }} />
          Portfolio
        </div>

        {/* ─── Slide counter top-right — hidden on CTA slide ─── */}
        {activeIdx < projects.length && (
          <div
            style={{
              position: 'absolute',
              top: 'clamp(5rem, 10vh, 7.5rem)',
              right: 'var(--screen-padding)',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem' }}>
              {String(activeIdx + 1).padStart(2, '0')}
            </span>
            <span style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        )}

        {/* ─── Progress dots + hint — hidden on CTA slide ─── */}
        {activeIdx < projects.length && (
          <>
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(2rem, 4vh, 3.5rem)',
                right: 'var(--screen-padding)',
                zIndex: 30,
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'center',
              }}
            >
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiper?.slideTo(i, 650)}
                  className="hover-target"
                  style={{
                    width: i === activeIdx ? '32px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: i === activeIdx ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(2rem, 4vh, 3.5rem)',
                left: 'var(--screen-padding)',
                zIndex: 30,
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.62rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                pointerEvents: 'none',
              }}
            >
              ← Explore Works →
            </div>
          </>
        )}

      </section>
    );
  }
);

ProjectsSection.displayName = 'ProjectsSection';
export default ProjectsSection;
