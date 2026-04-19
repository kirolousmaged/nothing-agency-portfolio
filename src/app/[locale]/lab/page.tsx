import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";
import Link from "next/link";

const caseStudies = {
  en: [
    {
      id: "1",
      title: "Zero to Hero",
      category: "E-Commerce Campaign",
      result: "+340% ROI",
      description: "Took a brand-new e-commerce store from zero presence to market leader in 6 months.",
    },
    {
      id: "2",
      title: "The Comeback",
      category: "Brand Revival",
      result: "+180% Engagement",
      description: "Revived a dying brand with a complete identity overhaul and targeted social strategy.",
    },
    {
      id: "3",
      title: "Silent Launch",
      category: "Product Launch",
      result: "10K Pre-orders",
      description: "Built anticipation from nothing — no leaks, no teasers — then launched to overwhelming demand.",
    },
    {
      id: "4",
      title: "The Underdog",
      category: "Market Entry",
      result: "25% Market Share",
      description: "Entered a saturated market dominated by major players and carved out a significant share.",
    },
  ],
  ar: [
    {
      id: "1",
      title: "من الصفر إلى القمة",
      category: "حملة تجارة إلكترونية",
      result: "+340% ROI",
      description: "حولنا متجراً إلكترونياً جديداً من عدم الوجود إلى رائد في السوق خلال 6 أشهر.",
    },
    {
      id: "2",
      title: "العودة القوية",
      category: "إحياء علامة تجارية",
      result: "+180% تفاعل",
      description: "أحيينا علامة تجارية متعثرة عبر تغيير شامل للهوية واستراتيجية تواصل مستهدفة.",
    },
    {
      id: "3",
      title: "الإطلاق الصامت",
      category: "إطلاق منتج",
      result: "10K طلب مسبق",
      description: "بنينا ترقباً من اللاشيء — بدون تسريبات أو تلميحات — ثم أطلقنا المنتج لنجاح باهر.",
    },
    {
      id: "4",
      title: "المنافس الشرس",
      category: "دخول السوق",
      result: "25% حصة سوقية",
      description: "دخلنا سوقاً مشبعاً تسيطر عليه شركات كبرى واستطعنا اقتطاع حصة سوقية كبيرة.",
    },
  ]
};

export default async function LabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].lab;
  const isAr = currentLocale === "ar";
  const studies = caseStudies[currentLocale];

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "18vw", opacity: 0.02 }}>
        {isAr ? "المختبر" : "LAB"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "مختبر اللاشيء" : "Nothing Lab"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle" style={{ fontSize: isAr ? "1.4rem" : "1.1rem" }}>{t.content}</p>
      </section>

      {/* Case Studies Grid */}
      <section>
        <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {studies.map((study) => (
            <div className="card hover-target" key={study.id} style={{ padding: "3rem 2.5rem" }}>
              <span className="card-number">{study.id.padStart(2, "0")}</span>
              
              <span style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "var(--color-accent)",
                marginBottom: "1rem",
                display: "block",
              }}>
                {study.category}
              </span>
              
              <h3 style={{ fontSize: isAr ? "1.8rem" : "1.5rem" }}>{study.title}</h3>
              
              <div style={{
                fontSize: "2rem",
                fontWeight: 900,
                color: "var(--color-accent)",
                margin: "1.5rem 0",
                lineHeight: 1, 
              }}>
                {study.result}
              </div>
              
              <p>{study.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ 
        marginTop: "6rem",
        textAlign: "center",
        padding: "5rem 0",
        borderTop: "1px solid rgba(240, 179, 28, 0.1)",
      }}>
        <p style={{ 
          fontSize: "clamp(1.2rem, 2vw, 1.6rem)", 
          fontWeight: 300,
          color: "var(--color-text-dim)",
          marginBottom: "2rem",
          maxWidth: "500px",
          margin: "0 auto 2rem auto",
        }}>
          {isAr ? "هل أنت مستعد لتكون قصة نجاحنا التالية؟" : "Ready to become our next success story?"}
        </p>
        <Link href={`/${currentLocale}/contact`} className="btn-primary hover-target">
          {isAr ? "ابدأ مشروعك" : "Start Your Project"}
        </Link>
      </section>
    </main>
  );
}

