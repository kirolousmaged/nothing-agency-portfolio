import { notFoundPage } from "@/data/pages-content";
import Link from "next/link";
import { translations, Locale } from "@/data/translations";

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].notfound;
  const isAr = currentLocale === "ar";

  return (
    <main className="page-container" style={{ textAlign: "center", paddingTop: "20rem" }}>
      <div className="shadow-title" style={{ fontSize: "25vw", opacity: 0.05 }}>
        404
      </div>
      
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>{t.h1}</h1>
      <p style={{ 
        maxWidth: "600px", 
        margin: "0 auto 4rem auto", 
        opacity: 0.6, 
        fontSize: "1.2rem",
        lineHeight: 1.6 
      }}>
        {t.content}
      </p>
      
      <Link href={`/${currentLocale}`} className="btn-primary hover-target">
        {t.cta}
      </Link>
    </main>
  );
}
