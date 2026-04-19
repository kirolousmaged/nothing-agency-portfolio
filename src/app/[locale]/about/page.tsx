import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].about;
  const isAr = currentLocale === "ar";

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "18vw", opacity: 0.02 }}>
        {isAr ? "عنَّا" : "ABOUT"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "من نحن" : "Who We Are"}</span>
        <h1>{t.h1}</h1>
      </section>

      {/* Vision & Mission */}
      <section style={{ marginBottom: "6rem" }}>
        <span className="section-heading">{isAr ? "الرؤية والرسالة" : "Vision & Mission"}</span>
        <div className="gold-divider" />
        <p className="story-content" style={{ fontSize: isAr ? "1.4rem" : "1.1rem", lineHeight: 1.8 }}>
          {t.mission}
        </p>
      </section>

      {/* Values */}
      <section>
        <span className="section-heading">{t.values.title}</span>
        <div className="gold-divider" />
        <div className="cards-grid">
          {t.values.items.map((value, i) => (
            <div className="card" key={value.title}>
              <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">{isAr ? "أفكار استكشفت" : "Ideas Explored"}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">{isAr ? "أعذار قدمت" : "Excuses Made"}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">{isAr ? "موجه بالعملية" : "Process Driven"}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1</div>
          <div className="stat-label">{isAr ? "مهمة" : "Mission"}</div>
        </div>
      </div>
    </main>
  );
}

