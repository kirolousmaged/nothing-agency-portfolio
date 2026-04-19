import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";

export default async function ManifestoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].manifesto;
  const isAr = currentLocale === "ar";

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "15vw", opacity: 0.02 }}>
        {isAr ? "المنهجية" : "PROCESS"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "خريطة العملية الإبداعية" : "The Creative Process Map"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle" style={{ fontSize: isAr ? "1.4rem" : "1.1rem" }}>{t.intro}</p>
      </section>

      {/* Phases Timeline */}
      <section>
        <div className="phases-timeline">
          {t.phases.map((phase, i) => (
            <div className="phase-item" key={phase.title}>
              <div className="phase-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="phase-content">
                <h3>{phase.title}</h3>
                <p>{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section style={{ 
        marginTop: "4rem", 
        padding: "4rem 0",
        borderTop: "1px solid rgba(240, 179, 28, 0.1)"
      }}>
        <div className="story-content">
          <div className="quote-block" style={{ fontSize: isAr ? "1.6rem" : "1.2rem", fontStyle: isAr ? "normal" : "italic" }}>
            {t.outro}
          </div>
        </div>
      </section>
    </main>
  );
}

