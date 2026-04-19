"use client";

import Link from "next/link";

import { translations, Locale } from "@/data/translations";

interface FooterProps {
  locale: string;
}

const socialLinks = [
  { label: "IG", href: "#", title: "Instagram" },
  { label: "BE", href: "#", title: "Behance" },
  { label: "LI", href: "https://www.linkedin.com/company/nothing-creative-agency/", title: "LinkedIn" },
  { label: "TW", href: "#", title: "Twitter" },
];

export default function Footer({ locale }: FooterProps) {
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].common.footer;

  return (
    <footer 
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        mixBlendMode: "difference"
      }}
    >
      {/* Vertical Socials (Left) */}
      <div 
        style={{ 
          position: "absolute",
          left: "1.5rem",
          top: "12rem", /* Below header */
          bottom: "1.5rem",
          display: "flex", 
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "1.5rem", 
          pointerEvents: "auto",
          alignItems: "center"
        }}
      >
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-target"
            style={{
              fontSize: "9px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "white",
              textDecoration: "none",
              transition: "opacity 0.3s",
              opacity: 0.5,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)"
            }}
          >
            {social.label}
          </Link>
        ))}
      </div>

      {/* Vertical Branding (Right) */}
      <div 
        style={{ 
          position: "absolute",
          right: "1.5rem",
          top: "12rem", /* Below header */
          bottom: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          pointerEvents: "none",
        }}
      >
        <span 
          style={{ 
            fontSize: "9px", 
            fontWeight: 700, 
            textTransform: "uppercase", 
            letterSpacing: "0.2em", 
            color: "white",
            opacity: 0.4,
            pointerEvents: "auto",
            writingMode: "vertical-rl",
            whiteSpace: "nowrap"
          }}
        >
          {t.copyright}
        </span>
      </div>
    </footer>
  );
}

