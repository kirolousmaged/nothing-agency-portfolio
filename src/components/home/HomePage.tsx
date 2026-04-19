'use client';

import { useEffect, useLayoutEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import type { MutableRefObject } from 'react';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import PhilosophySection from './sections/PhilosophySection';
import CTASection from './sections/CTASection';
import type { Locale } from '@/data/translations';

const TOTAL = 5;
const PROJECTS_IDX = 2;

interface Props {
  locale: string;
}

export default function HomePage({ locale }: Props) {
  const loc = (locale as Locale) || 'en';
  const [active, setActive] = useState(0);

  const curIdx   = useRef(0);
  const isAnim   = useRef(false);
  const sections = useRef<(HTMLElement | null)[]>(new Array(TOTAL).fill(null));

  // Stable ref callbacks — created once, never recreated on re-renders
  const stableRefs = useRef(
    Array.from({ length: TOTAL }, (_, i) => (el: HTMLElement | null) => {
      sections.current[i] = el;
    })
  );

  // Projects boundary / navigation refs
  const projAtStart = useRef(true);
  const projAtEnd   = useRef(false);
  const projNext: MutableRefObject<(() => void) | null> = useRef(null);
  const projPrev: MutableRefObject<(() => void) | null> = useRef(null);

  // Apply initial GSAP states BEFORE first paint — prevents the overlap flash
  useLayoutEffect(() => {
    sections.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { yPercent: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' });
      } else {
        gsap.set(el, { yPercent: 100, autoAlpha: 0 });
      }
    });
  }, []);

  const goto = useCallback((target: number) => {
    if (isAnim.current) return;
    if (target < 0 || target >= TOTAL) return;
    if (target === curIdx.current) return;

    const fromEl  = sections.current[curIdx.current];
    const toEl    = sections.current[target];
    if (!fromEl || !toEl) return;

    const fromIdx = curIdx.current;
    const dir     = target > fromIdx ? 1 : -1;
    isAnim.current = true;
    curIdx.current = target;
    setActive(target);

    const DUR  = 1.1;
    const EASE = 'power4.inOut';

    // Hero exit: collapse upward into header via clip-path
    if (fromIdx === 0 && dir > 0) {
      gsap.set(toEl, { yPercent: 100, autoAlpha: 1 });
      gsap.timeline({
        onComplete() {
          gsap.set(fromEl, { autoAlpha: 0, clipPath: 'inset(0% 0% 0% 0%)' });
          isAnim.current = false;
        },
      })
        .to(fromEl, { clipPath: 'inset(0% 0% 100% 0%)', duration: DUR, ease: EASE }, 0)
        .to(toEl,   { yPercent: 0, duration: DUR, ease: EASE }, 0);
      return;
    }

    // Hero enter: expand from top downward
    if (target === 0 && dir < 0) {
      gsap.set(toEl, { autoAlpha: 1, clipPath: 'inset(0% 0% 100% 0%)' });
      gsap.timeline({
        onComplete() {
          gsap.set(fromEl, { autoAlpha: 0, yPercent: 0 });
          isAnim.current = false;
        },
      })
        .to(fromEl, { yPercent: 100, duration: DUR, ease: EASE }, 0)
        .to(toEl,   { clipPath: 'inset(0% 0% 0% 0%)', duration: DUR, ease: EASE }, 0);
      return;
    }

    // Default slide transition for all other sections
    gsap.set(toEl, { yPercent: dir * 100, autoAlpha: 1 });
    gsap.timeline({
      onComplete() {
        gsap.set(fromEl, { autoAlpha: 0, yPercent: 0 });
        isAnim.current = false;
      },
    })
      .to(fromEl, { yPercent: -dir * 100, duration: DUR, ease: EASE }, 0)
      .to(toEl,   { yPercent: 0,          duration: DUR, ease: EASE }, 0);
  }, []);

  // Wheel + touch listeners
  useEffect(() => {
    let lastT = 0;
    const GAP = 70;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (isAnim.current) return;
      if (Math.abs(e.deltaY) < 6) return;

      const d = e.deltaY > 0 ? 1 : -1;

      if (curIdx.current === PROJECTS_IDX) {
        if (now - lastT < 750) return;
        lastT = now;
        if (d > 0) {
          if (!projAtEnd.current && projNext.current) projNext.current();
          else goto(curIdx.current + 1);
        } else {
          if (!projAtStart.current && projPrev.current) projPrev.current();
          else goto(curIdx.current - 1);
        }
      } else {
        if (now - lastT < GAP) return;
        lastT = now;
        goto(curIdx.current + d);
      }
    };

    let ty = 0, tx = 0;

    const onTStart = (e: TouchEvent) => {
      ty = e.touches[0].clientY;
      tx = e.touches[0].clientX;
    };

    const onTEnd = (e: TouchEvent) => {
      if (isAnim.current) return;
      const dy = ty - e.changedTouches[0].clientY;
      const dx = tx - e.changedTouches[0].clientX;

      if (curIdx.current === PROJECTS_IDX) {
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 60) {
          goto(curIdx.current + (dy > 0 ? 1 : -1));
        }
      } else if (Math.abs(dy) > 50) {
        goto(curIdx.current + (dy > 0 ? 1 : -1));
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTStart, { passive: true });
    window.addEventListener('touchend', onTEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTStart);
      window.removeEventListener('touchend', onTEnd);
    };
  }, [goto]);

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <HeroSection
        ref={stableRefs.current[0]}
        locale={loc}
        isActive={active === 0}
        onNext={() => goto(1)}
      />
      <ServicesSection
        ref={stableRefs.current[1]}
        locale={loc}
        isActive={active === 1}
      />
      <ProjectsSection
        ref={stableRefs.current[2]}
        locale={loc}
        isActive={active === 2}
        onAtStart={v => { projAtStart.current = v; }}
        onAtEnd={v => { projAtEnd.current = v; }}
        nextRef={projNext}
        prevRef={projPrev}
      />
      <PhilosophySection
        ref={stableRefs.current[3]}
        locale={loc}
        isActive={active === 3}
      />
      <CTASection
        ref={stableRefs.current[4]}
        locale={loc}
        isActive={active === 4}
      />
    </div>
  );
}
