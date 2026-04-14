"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".hover-target")) {
        gsap.to(cursorRef.current, { scale: 1.5, backgroundColor: "white", mixBlendMode: "difference", duration: 0.3 });
      } else if (target.closest(".drag-target")) {
        gsap.to(cursorRef.current, { scale: 2, backgroundColor: "rgba(255,255,255,0.1)", duration: 0.3 });
      } else {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "transparent", mixBlendMode: "normal", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "40px",
        height: "40px",
        border: "1.5px solid #fff",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)"
      }} 
    />
  );
}
