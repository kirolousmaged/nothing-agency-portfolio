"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mixBlendMode: "difference"
        }}
      >
        {/* Brand Logo */}
        <div className="logo-wrap">
          <Link href="/" className="hover-target logo-text">
            Nothing<span className="logo-dot">.</span>
          </Link>
        </div>

        {/* Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hover-target"
          style={{
            background: "none",
            border: "none",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px"
          }}
        >
          <span style={{
            height: "2px",
            backgroundColor: "white",
            width: "32px",
            transition: "all 0.3s",
            transform: isOpen ? "rotate(45deg) translateY(11px)" : "none"
          }} />
          <span style={{
            height: "2px",
            backgroundColor: "white",
            width: isOpen ? "0" : "24px",
            opacity: isOpen ? 0 : 1,
            transition: "all 0.3s"
          }} />
          <span style={{
            height: "2px",
            backgroundColor: "white",
            width: isOpen ? "32px" : "16px",
            transition: "all 0.3s",
            transform: isOpen ? "rotate(-45deg) translateY(-11px)" : "none"
          }} />
        </button>
      </header>

      {/* Fullscreen Overlay Menu */}
      <nav 
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 900,
          backgroundColor: "var(--color-bg-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.7s",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
          overflowY: "auto",
          padding: "10rem 0"
        }}
      >
        <ul style={{ listStyle: "none", textAlign: "center" }}>
          {["Home", "Works", "Archive", "About", "Contact"].map((item, i) => (
            <li key={item} style={{ overflow: "hidden", margin: "1rem 0" }}>
               <Link 
                href={item === "Home" ? "/" : "#"} 
                onClick={() => setIsOpen(false)}
                className="hover-target"
                style={{
                  display: "block",
                  fontSize: "clamp(1.5rem, 4vw, 3rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.05em",
                  transition: "color 0.3s",
                  transitionDelay: `${i * 50}ms`
                }}
               >
                 {item}
               </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
