"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Mousewheel, Parallax, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useEffect } from "react";
import Link from "next/link";
import projects from "@/data/projects.json";

// Import Swiper styles
import "swiper/css";
import "swiper/css/parallax";

export default function HomeSlider() {
  const [bgSwiper, setBgSwiper] = useState<SwiperType | null>(null);
  const [textSwiper, setTextSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current || !textSwiper) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const targetSlide = Math.floor(percentage * projects.length);
    textSwiper.slideToLoop(targetSlide);
  };

  // Vertical swipe to horizontal slide translation for mobile
  useEffect(() => {
    if (!textSwiper) return;

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

      // If vertical swipe is more prominent than horizontal, or if it's a clear vertical swipe
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 40) {
        if (deltaY > 0) {
          textSwiper.slideNext();
        } else {
          textSwiper.slidePrev();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [textSwiper]);

  return (
    <div className="full-screen" style={{ backgroundColor: "var(--color-bg-dark)" }}>
      {/* Background Swiper - Pure Parallax Image Layer */}
      <Swiper
        modules={[Controller, Mousewheel, Parallax, Keyboard]}
        onSwiper={setBgSwiper}
        controller={{ control: textSwiper }}
        mousewheel={{
          sensitivity: 1,
          thresholdDelta: 50,
          forceToFreeMode: false,
        }}
        keyboard={{ enabled: true }}
        parallax={true}
        speed={1000} // Slightly slower for more premium feel
        loop={true}
        allowTouchMove={true}
        className="absolute-inset bg-swiper"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className="full-screen">
            <div 
              className="absolute-inset"
              data-swiper-parallax="30%"
              style={{ 
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scale(1.1)"
              }}
            >
              {/* Dark Overlay with 0.6 opacity (As per user request) */}
              <div className="absolute-inset" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Layer (Centered Carousel of Project Titles) */}
      <div 
        className="absolute-inset z-20" 
        style={{ pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Swiper
          modules={[Controller]}
          onSwiper={setTextSwiper}
          controller={{ control: bgSwiper }}
          onActiveIndexChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
          speed={1000}
          direction="horizontal"
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={180}
          loop={true}
          className="absolute-inset drag-target text-swiper"
          breakpoints={{
            320: { spaceBetween: 60 },
            768: { spaceBetween: 120 },
            1024: { spaceBetween: 180 }
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
                padding: "0 2rem"
              }}
            >
              {({ isActive }) => (
                <div style={{ 
                  textAlign: "center", 
                  pointerEvents: "auto",
                  transform: isActive ? "scale(1)" : "scale(0.7)", // Smaller inactive font
                  opacity: isActive ? 1 : 0.4, // Increased inactive opacity by 20%
                  transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)"
                }}>
                  <Link 
                    href={`/project/${project.slug}`}
                    className="hover-target"
                  >
                    <div style={{ position: "relative", display: "inline-block" }}>
                      {/* Refined Highlight Block */}
                      {isActive && (
                        <div style={{
                          position: "absolute",
                          bottom: "15%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "110%",
                          height: "35%",
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          zIndex: 0,
                          transition: "all 0.6s ease"
                        }} />
                      )}
                      <h1 style={{ 
                        fontSize: "clamp(2rem, 6vw, 5.5rem)",
                        padding: "0.5rem 1rem",
                        color: "white",
                        whiteSpace: "nowrap",
                        letterSpacing: "-0.02em",
                        position: "relative",
                        zIndex: 1,
                        fontWeight: 900
                      }}>
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

      {/* Low Opacity Shadow Title (Absolute Bottom, No Vertical Margin) */}
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
          letterSpacing: "0.02em"
        }}
      >
        {projects[(activeIndex - 1) % projects.length]?.title}
      </div>

      {/* Side Vertical Branding Text (Left) */}
      <div style={{
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
        transform: "rotate(180deg)"
      }}>
        tw fb be gh
      </div>

      {/* Side Vertical Branding Text (Right: NOTHING 2026) */}
      <div style={{
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
        writingMode: "vertical-rl"
      }}>
        NOTHING 2026
      </div>

      {/* Unified Slider HUD (Centered at bottom) */}
      <div style={{ 
        position: "absolute", 
        bottom: "4.5rem", 
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem"
      }}>
        {/* Numbers: 01 —— 06 */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "white" }}>
          <span style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.1em" }}>
            {activeIndex.toString().padStart(2, '0')}
          </span>
          <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: "0.9rem", fontWeight: 700, opacity: 0.4 }}>
            {projects.length.toString().padStart(2, '0')}
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
            pointerEvents: "auto"
          }}
        >
          <div style={{ width: "100%", height: "2px", backgroundColor: "rgba(255,255,255,0.1)" }} />
          <div 
            style={{ 
              position: "absolute",
              top: "50%",
              left: `${((activeIndex - 1) / (projects.length - 1)) * 100}%`,
              width: "12px",
              height: "12px",
              backgroundColor: "white",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              transition: "left 0.8s cubic-bezier(0.25, 1, 0.5, 1)",
              boxShadow: "0 0 15px rgba(255,255,255,0.4)"
            }} 
          />
        </div>
      </div>
    </div>
  );
}
