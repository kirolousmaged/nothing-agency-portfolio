"use client";

import { useState, use } from "react";
import { translations, Locale } from "@/data/translations";

export default function FeelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].feel;
  const isAr = currentLocale === "ar";

  const handleSubmit = () => {
    if (currentInput.trim()) {
      setMessages((prev) => [...prev, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "20vw", opacity: 0.02 }}>
        {isAr ? "شعور" : "FEEL"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "مساحة الشعور" : "Nothing Just Feel"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle" style={{ fontSize: isAr ? "1.4rem" : "1.1rem" }}>{t.content}</p>
      </section>

      {/* Interactive Canvas */}
      <section>
        <div className="void-canvas" style={{ minHeight: "60vh", flexDirection: "column", gap: "2rem" }}>
          {/* Floating messages */}
          {messages.map((msg, i) => (
            <div
              key={i}
              className="message-bubble"
              style={{
                top: `${15 + ((i * 73) % 60)}%`,
                left: `${10 + ((i * 47) % 70)}%`,
                animationDelay: `${i * 0.8}s`,
                fontFamily: "inherit"
              }}
            >
              {msg}
            </div>
          ))}

          {/* Input area */}
          <textarea
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isAr ? "اكتب شيئاً في العدم..." : "Write something into the void..."}
            rows={3}
            style={{ zIndex: 1, textAlign: isAr ? "right" : "left", direction: isAr ? "rtl" : "ltr" }}
          />
          
          <button
            onClick={handleSubmit}
            className="btn-outline hover-target"
            style={{ zIndex: 1 }}
          >
            {isAr ? "أطلقه في الفراغ" : "Release into the Void"}
          </button>
        </div>

        <p style={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--color-text-dim)",
          marginTop: "1.5rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}>
          {isAr 
            ? "رسالتك تعيش في هذا المتصفح فقط — ثم تعود إلى العدم." 
            : "Your message lives in this session only — then returns to nothing."}
        </p>
      </section>
    </main>
  );
}

