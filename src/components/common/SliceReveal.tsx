"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface SliceRevealProps {
  src: string;
  alt: string;
  slices?: number;
  direction?: "vertical" | "horizontal";
  delay?: number;
}

export default function SliceReveal({
  src,
  alt,
  slices = 8,
  direction = "vertical",
  delay = 0,
}: SliceRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slicesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize slices as fully covering the image
      gsap.set(slicesRef.current, {
        scaleX: direction === "horizontal" ? 1 : 1,
        scaleY: direction === "horizontal" ? 1 : 1,
        transformOrigin: direction === "horizontal" ? "left" : "top",
      });

      // Animate slices out to reveal the image
      gsap.to(slicesRef.current, {
        scaleY: direction === "vertical" ? 0 : 1,
        scaleX: direction === "horizontal" ? 0 : 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "power4.inOut",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Overlay Slices */}
      <div className={`absolute inset-0 flex ${direction === "horizontal" ? "flex-col" : "flex-row"}`}>
        {Array.from({ length: slices }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) slicesRef.current[i] = el; }}
            className="flex-1 bg-black z-10" // The "slice" that unmasks
          />
        ))}
      </div>
    </div>
  );
}
