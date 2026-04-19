import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";

const behindScenes = {
  en: [
    { id: 1, label: "Brainstorm Session #47" },
    { id: 2, label: "Rejected Concept Sketches" },
    { id: 3, label: "Whiteboard Chaos" },
    { id: 4, label: "Late Night Iterations" },
    { id: 5, label: "Color Study Variations" },
    { id: 6, label: "Typography Exploration" },
    { id: 7, label: "Wireframe Graveyard" },
    { id: 8, label: "The Final Breakthrough" },
    { id: 9, label: "Team Review Wall" },
  ],
  ar: [
    { id: 1, label: "جلسة عصف ذهني رقم 47" },
    { id: 2, label: "مسودات مفاهيم مرفوضة" },
    { id: 3, label: "فوضى السبورة البيضاء" },
    { id: 4, label: "تعديلات منتصف الليل" },
    { id: 5, label: "تعدد تجارب الألوان" },
    { id: 6, label: "استكشاف الخطوط" },
    { id: 7, label: "مقبرة المسودات الأولية" },
    { id: 8, label: "الوصول للفكرة النهائية" },
    { id: 9, label: "حائط مراجعة الفريق" },
  ]
};

export default async function UnseenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].unseen;
  const isAr = currentLocale === "ar";
  const items = behindScenes[currentLocale];

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "18vw", opacity: 0.02 }}>
        {isAr ? "الكواليس" : "UNSEEN"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "ما وراء الكواليس" : "Behind the Scenes"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle" style={{ fontSize: isAr ? "1.4rem" : "1.1rem" }}>{t.content}</p>
      </section>

      {/* Gallery Grid */}
      <section>
        <span className="section-heading">{isAr ? "العملية مكشوفة" : "The Process Unveiled"}</span>
        <div className="gold-divider" />
        <div className="gallery-grid">
          {items.map((item) => (
            <div className="gallery-item" key={item.id}>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 900, 
                  color: "rgba(240, 179, 28, 0.15)",
                  marginBottom: "1rem",
                  lineHeight: 1,
                }}>
                  {String(item.id).padStart(2, "0")}
                </div>
                <span style={{ fontSize: isAr ? "1.1rem" : "0.9rem" }}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Culture Quote */}
      <section style={{ 
        marginTop: "6rem",
        padding: "4rem 0",
        borderTop: "1px solid rgba(240, 179, 28, 0.1)",
      }}>
        <div className="story-content">
          <div className="quote-block" style={{ fontSize: isAr ? "1.6rem" : "1.2rem", fontStyle: isAr ? "normal" : "italic" }}>
            {isAr 
              ? "لأننا نفتخر بالرحلة بقدر فخرنا بالنتيجة." 
              : "Because we are as proud of the journey as we are of the result."}
          </div>
        </div>
      </section>
    </main>
  );
}

