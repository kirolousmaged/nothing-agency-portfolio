import { Metadata } from "next";
import { translations, Locale } from "@/data/translations";
import Link from "next/link";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].services;
  const isAr = currentLocale === "ar";

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "18vw", opacity: 0.02 }}>
        {isAr ? "خدماتنا" : "SERVICES"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "ماذا نفعل" : "What We Do"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle" style={{ fontSize: isAr ? "1.4rem" : "1.1rem" }}>{t.intro}</p>
      </section>

      {/* Services Grid */}
      <section>
        <div className="cards-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          {t.items.map((service, i) => (
            <div className="card" key={service.title} style={{ padding: "3rem 2.5rem" }}>
              <span className="card-number">{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ marginTop: "2rem" }}>{service.title}</h3>
              <div className="gold-divider" style={{ margin: "1.5rem 0" }} />
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        marginTop: "6rem", 
        textAlign: "center",
        padding: "5rem 2rem",
        borderTop: "1px solid rgba(240, 179, 28, 0.1)"
      }}>
        <h2 style={{ 
          fontSize: "clamp(1.5rem, 3vw, 2.5rem)", 
          fontWeight: 900, 
          textTransform: "uppercase",
          color: "var(--color-text-bright)",
          marginBottom: "1.5rem"
        }}>
          {isAr ? "جاهز للبدء من " : "Ready to Start from "}<span style={{ color: "var(--color-accent)" }}>{isAr ? "اللاشيء" : "Nothing"}</span>؟
        </h2>
        <p style={{ 
          color: "var(--color-text-dim)", 
          marginBottom: "3rem",
          maxWidth: "500px",
          margin: "0 auto 3rem auto",
          lineHeight: 1.8
        }}>
          {isAr ? "تبدأ كل حملة عظيمة بمحادثة واحدة." : "Every great campaign begins with a single conversation."}
        </p>
        <Link href={`/${currentLocale}/contact`} className="btn-primary hover-target">
          {isAr ? "ابدأ مشروعك" : "Start Your Project"}
        </Link>
      </section>
    </main>
  );
}

