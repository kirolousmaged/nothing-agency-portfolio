"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";

function getIsTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
}

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(true);
  const hasMovedRef = useRef(false);

  useEffect(() => {
    setIsTouch(getIsTouchDevice());
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (!cursorRef.current) return;
    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      cursorRef.current.style.opacity = "1";
    }
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out",
    });
  }, []);

  const handleHover = useCallback((e: MouseEvent) => {
    if (!cursorRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest(".hover-target")) {
      gsap.to(cursorRef.current, {
        scale: 1.5,
        backgroundColor: "white",
        mixBlendMode: "difference",
        duration: 0.3,
      });
    } else if (target.closest(".drag-target")) {
      gsap.to(cursorRef.current, {
        scale: 2,
        backgroundColor: "rgba(255,255,255,0.1)",
        duration: 0.3,
      });
    } else {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    }
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [isTouch, moveCursor, handleHover]);

  if (isTouch) return null;

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
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
