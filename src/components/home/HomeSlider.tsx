"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import projects from "@/data/projects.json";

// Import Swiper styles
import "swiper/css";

export default function HomeSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progress bar click handler
  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current || !swiperInstance) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const targetSlide = Math.round(percentage * (projects.length - 1));
    swiperInstance.slideToLoop(targetSlide, 800);
  };

  // Vertical swipe → horizontal slide for mobile touch
  useEffect(() => {
    if (!swiperInstance) return;

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      // Only trigger if vertical swipe is dominant and significant
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          swiperInstance.slideNext();
        } else {
          swiperInstance.slidePrev();
        }
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("touchstart", handleTouchStart, { passive: true });
      el.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (el) {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [swiperInstance]);

  const displayIndex = activeIndex + 1;

  return (
    <div ref={containerRef} className="full-screen" style={{ backgroundColor: "var(--color-bg-dark)" }}>
      {/* Background Layers — Crossfade images synced to activeIndex */}
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="absolute-inset"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
            zIndex: 1,
            transform: "scale(1.05)",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute-inset" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
        </div>
      ))}

      {/* Single Swiper — Titles Only */}
      <div
        className="absolute-inset z-20"
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Swiper
          modules={[Mousewheel, Keyboard]}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          mousewheel={{
            sensitivity: 1,
            thresholdDelta: 30,
            forceToAxis: false,
          }}
          keyboard={{ enabled: true }}
          speed={800}
          direction="horizontal"
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={100}
          loop={true}
          allowTouchMove={true}
          touchRatio={0.8}
          resistance={true}
          resistanceRatio={0.65}
          threshold={5}
          className="absolute-inset text-swiper"
          breakpoints={{
            320: { spaceBetween: 30 },
            768: { spaceBetween: 60 },
            1024: { spaceBetween: 100 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide
              key={project.id}
              style={{
                width: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 2rem",
              }}
            >
              {({ isActive }) => (
                <div
                  style={{
                    textAlign: "center",
                    pointerEvents: "auto",
                    transform: isActive ? "scale(1)" : "scale(0.7)",
                    opacity: isActive ? 1 : 0.4,
                    transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
                    willChange: "transform, opacity",
                  }}
                >
                  <Link href={`/project/${project.slug}`} className="hover-target">
                    <div style={{ position: "relative", display: "inline-block" }}>
                      {/* Highlight Block */}
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "15%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "110%",
                            height: "35%",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            zIndex: 0,
                            transition: "all 0.6s ease",
                          }}
                        />
                      )}
                      <h1
                        style={{
                          fontSize: "clamp(2rem, 6vw, 5.5rem)",
                          padding: "0.5rem 1rem",
                          color: "white",
                          whiteSpace: "nowrap",
                          letterSpacing: "-0.02em",
                          position: "relative",
                          zIndex: 1,
                          fontWeight: 900,
                        }}
                      >
                        {project.title}
                      </h1>
                    </div>
                  </Link>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Low Opacity Shadow Title */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translate(-50%, 25%)",
          fontSize: "14vw",
          color: "rgba(255,255,255,0.05)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 5,
          transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
          textTransform: "uppercase",
          fontWeight: 900,
          width: "100%",
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        {projects[activeIndex]?.title}
      </div>

      {/* Side Vertical Branding Text (Left) */}
      <div
        className="branding-side-left"
        style={{
          position: "absolute",
          left: "4rem",
          bottom: "4rem",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          opacity: 0.5,
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }}
      >
        tw fb be gh
      </div>

      {/* Side Vertical Branding Text (Right) */}
      <div
        className="branding-side-right"
        style={{
          position: "absolute",
          right: "4rem",
          bottom: "4rem",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          opacity: 0.5,
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          writingMode: "vertical-rl",
        }}
      >
        NOTHING 2026
      </div>

      {/* Unified Slider HUD */}
      <div
        style={{
          position: "absolute",
          bottom: "4.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Numbers: 01 —— 06 */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "white" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.1em" }}>
            {displayIndex.toString().padStart(2, "0")}
          </span>
          <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: "0.9rem", fontWeight: 700, opacity: 0.4 }}>
            {projects.length.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Progress Bar with Dot */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="hover-target"
          style={{
            position: "relative",
            width: "250px",
            height: "12px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            pointerEvents: "auto",
          }}
        >
          <div style={{ width: "100%", height: "2px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${(activeIndex / (projects.length - 1)) * 100}%`,
              width: "12px",
              height: "12px",
              backgroundColor: "white",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              transition: "left 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              boxShadow: "0 0 15px rgba(255,255,255,0.4)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
