import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";

export default async function StoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].story;
  const isAr = currentLocale === "ar";

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "20vw", opacity: 0.02 }}>
        {isAr ? "بدايتنا" : "FROM"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "من اللاشيء" : "From Nothing"}</span>
        <h1>{t.h1}</h1>
      </section>

      {/* Story Content */}
      <section className="two-col">
        <div>
          <div className="story-content">
            <div className="quote-block" style={{ fontSize: isAr ? "1.6rem" : "1.2rem", fontStyle: isAr ? "normal" : "italic" }}>
              {isAr 
                ? "«اللاشيء» ليس سوى المساحة البيضاء التي تنتظر أن تملأها بعملية إبداعية سليمة." 
                : '"Nothing" is simply the white space waiting to be filled by a sound creative process.'}
            </div>
            <p style={{ fontSize: isAr ? "1.3rem" : "1.1rem", lineHeight: 1.8 }}>{t.content}</p>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          {/* Visual Element — Abstract brand representation */}
          <div style={{
            width: "100%",
            aspectRatio: "1/1",
            background: "linear-gradient(135deg, var(--color-bg-surface), var(--color-bg-elevated))",
            border: "1px solid rgba(240, 179, 28, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Concentric circles — brand identity */}
            <div style={{
              width: "60%",
              aspectRatio: "1/1",
              border: "2px solid rgba(240, 179, 28, 0.3)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                width: "60%",
                aspectRatio: "1/1",
                border: "2px solid rgba(240, 179, 28, 0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{
                  width: "60%",
                  aspectRatio: "1/1",
                  border: "2px solid rgba(240, 179, 28, 0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <span style={{ 
                    fontSize: "clamp(1rem, 2vw, 1.5rem)", 
                    fontWeight: 900, 
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3em"
                  }}>
                    ∅
                  </span>
                </div>
              </div>
            </div>
            {/* Slash line through circle */}
            <div style={{
              position: "absolute",
              width: "1px",
              height: "70%",
              backgroundColor: "rgba(240, 179, 28, 0.2)",
              transform: "rotate(45deg)",
            }} />
          </div>
          <p style={{
            marginTop: "1.5rem",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "var(--color-text-dim)",
            textAlign: "center",
          }}>
            {isAr ? "العدم الخالق" : "The void that creates"}
          </p>
        </div>
      </section>

      {/* Timeline Milestone */}
      <section style={{ 
        marginTop: "6rem",
        padding: "4rem 0",
        borderTop: "1px solid rgba(240, 179, 28, 0.1)"
      }}>
        <span className="section-heading">{isAr ? "المحطات الرئيسية" : "Milestones"}</span>
        <div className="gold-divider" />
        <div style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              2026
            </div>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-text-dim)" }}>
              {isAr ? "تأسست" : "Founded"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              ∅ → ∞
            </div>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-text-dim)" }}>
              {isAr ? "معادلتنا" : "Our Formula"}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

