"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations, Locale } from "@/data/translations";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].common;

  // Function to switch locale in current path
  const toggleLocale = () => {
    const segments = pathname.split("/");
    segments[1] = currentLocale === "en" ? "ar" : "en";
    return segments.join("/");
  };

  const navItems = [
    { label: t.nav.about, href: `/${currentLocale}/about` },
    { label: t.nav.services, href: `/${currentLocale}/services` },
    { label: t.nav.manifesto, href: `/${currentLocale}/manifesto` },
    { label: t.nav.story, href: `/${currentLocale}/story` },
    { label: t.nav.lab, href: `/${currentLocale}/lab` },
    { label: t.nav.unseen, href: `/${currentLocale}/unseen` },
    { label: t.nav.feel, href: `/${currentLocale}/feel` },
    { label: t.nav.contact, href: `/${currentLocale}/contact` },
  ];

  return (
    <>
      <header 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          padding: "clamp(1.5rem, 4vh, 2.5rem) clamp(1rem, 4vw, 5rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        {/* Brand Logo */}
        <div className="logo-wrap">
          <Link href={`/${currentLocale}`} className="hover-target" style={{ display: "inline-block" }}>
            <img
              src="/images/logo/logo-light.png"
              alt="Nothing Creative Ad Studio"
              style={{ 
                height: "clamp(32px, 5vh, 48px)", 
                width: "auto",
                display: "block",
                filter: "brightness(1.1)"
              }}
            />
          </Link>
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          
          {/* Desktop CTA */}
          <Link
            href={`/${currentLocale}/contact`}
            className="hover-target btn-header-cta"
            style={{
              fontSize: "10px",
              fontWeight: 900,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              border: "1px solid rgba(240,179,28,0.3)",
              padding: "0.8rem 1.6rem",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            {currentLocale === 'ar' ? 'لنتحدث' : "Let's Talk"}
          </Link>

          {/* Language Switcher */}
          <Link 
            href={toggleLocale()}
            className="hover-target"
            style={{
              fontSize: "11px",
              fontWeight: 900,
              color: "white",
              opacity: 0.8,
              textDecoration: "none",
              letterSpacing: "0.12em",
              border: "1px solid rgba(255,255,255,0.15)",
              padding: "5px 10px",
              borderRadius: "2px",
              transition: "all 0.3s"
            }}
          >
            {t.otherLang}
          </Link>

          {/* Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="hover-target"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "7px",
              cursor: "pointer"
            }}
          >
            <span style={{
              height: "2px",
              backgroundColor: "white",
              width: "32px",
              transition: "all 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
              transform: isOpen ? "rotate(45deg) translateY(12px)" : "none"
            }} />
            <span style={{
              height: "2px",
              backgroundColor: "white",
              width: isOpen ? "0" : "26px",
              opacity: isOpen ? 0 : 1,
              transition: "all 0.3s"
            }} />
            <span style={{
              height: "2px",
              backgroundColor: "white",
              width: isOpen ? "32px" : "20px",
              transition: "all 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
              transform: isOpen ? "rotate(-45deg) translateY(-12px)" : "none"
            }} />
          </button>
        </div>
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
          transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1), visibility 0.8s",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          visibility: isOpen ? "visible" : "hidden",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <ul style={{ 
          listStyle: "none", 
          textAlign: "center",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "90vh",
          gap: "1.5vh"
        }}>
          {navItems.map((item, i) => (
            <li key={item.label} style={{ overflow: "hidden" }}>
               <Link 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className="hover-target nav-link"
                style={{
                  display: "block",
                  fontSize: "clamp(2rem, 5vh, 4rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.05em",
                  transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                  transitionDelay: isOpen ? `${i * 40}ms` : "0ms",
                  color: "var(--color-text)",
                  transform: isOpen ? "translateY(0)" : "translateY(100%)",
                  opacity: isOpen ? 1 : 0
                }}
               >
                 {item.label}
               </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

