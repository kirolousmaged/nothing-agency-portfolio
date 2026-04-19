"use client";

import { useState, use } from "react";
import { translations, Locale } from "@/data/translations";

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const currentLocale = (locale as Locale) || "en";
  const t = translations[currentLocale].contact;
  const isAr = currentLocale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isAr ? "شكراً لك! سنبدأ العملية الإبداعية من أجلك قريباً." : "Thank you! We'll begin the creative process for you shortly.");
  };

  return (
    <main className="page-container">
      {/* Background shadow */}
      <div className="shadow-title" style={{ fontSize: "15vw", opacity: 0.02 }}>
        {isAr ? "اتصال" : "CREATE"}
      </div>

      {/* Hero */}
      <section className="page-hero">
        <span className="section-heading">{isAr ? "دعنا نبدأ" : "Let's Create"}</span>
        <h1>{t.h1}</h1>
        <p className="subtitle">{t.content}</p>
      </section>

      {/* Two Column: Form + Contact */}
      <section className="two-col">
        {/* Form */}
        <div>
          <span className="section-heading">{isAr ? "تفاصيل المشروع" : "Project Details"}</span>
          <div className="gold-divider" />
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t.form.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={isAr ? "الاسم الكامل" : "John Doe"}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">{isAr ? "الشركة / العلامة التجارية" : "Company / Brand"}</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={isAr ? "اسم شركتك" : "Your company name"}
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">{isAr ? "الخدمة المطلوبة" : "Service Needed"}</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">{isAr ? "اختر الخدمة" : "Select a service"}</option>
                <option value="campaigns">{isAr ? "إدارة الحملات الإعلانية" : "Campaign Management"}</option>
                <option value="design">{isAr ? "تصميم الجرافيك والهوية البصرية" : "Graphic Design & Branding"}</option>
                <option value="content">{isAr ? "صناعة وإنتاج المحتوى" : "Content Production & Copywriting"}</option>
                <option value="social">{isAr ? "التسويق عبر السوشيال ميديا" : "Social Media Marketing"}</option>
                <option value="full">{isAr ? "الباقة الإبداعية المتكاملة" : "Full Creative Package"}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">{isAr ? "الميزانية المتوقعة" : "Estimated Budget"}</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">{isAr ? "اختر النطاق" : "Select range"}</option>
                <option value="small">{isAr ? "أقل من 5,000$" : "Under $5,000"}</option>
                <option value="medium">$5,000 - $15,000</option>
                <option value="large">$15,000 - $50,000</option>
                <option value="enterprise">$50,000+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.form.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.form.placeholder}
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn-primary hover-target" style={{ marginTop: "1rem" }}>
              {isAr ? "تحفيز العملية الإبداعية ←" : "Trigger the Creative Process →"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <span className="section-heading">{isAr ? "تواصل معنا" : "Contact Us"}</span>
          <div className="gold-divider" />
          <p style={{ 
            color: "var(--color-text-dim)", 
            lineHeight: 1.8, 
            marginBottom: "3rem",
            fontSize: isAr ? "1.2rem" : "1rem",
          }}>
            {isAr 
              ? "نحن لا نؤمن بالحواجز. تواصل معنا مباشرة، وسنبدأ في رسم بداية قصة نجاحك من الصفر." 
              : "We don't believe in barriers. Get in touch directly and we'll start mapping out the beginning of your success story from zero."}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <div>
              <span style={{ 
                fontSize: "0.7rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.3em", 
                color: "var(--color-accent)",
                display: "block",
                marginBottom: "0.5rem",
              }}>
                Email
              </span>
              <span style={{ color: "var(--color-text-bright)", fontSize: "1.1rem" }}>
                hello@nothingagency.com
              </span>
            </div>

            <div>
              <span style={{ 
                fontSize: "0.7rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.3em", 
                color: "var(--color-accent)",
                display: "block",
                marginBottom: "0.5rem",
              }}>
                {isAr ? "تابعنا" : "Follow Us"}
              </span>
              <div style={{ display: "flex", gap: "2rem" }}>
                <a href="#" className="hover-target" style={{ 
                  color: "var(--color-text-bright)", 
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  Twitter
                </a>
                <a href="#" className="hover-target" style={{ 
                  color: "var(--color-text-bright)", 
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  Behance
                </a>
                <a href="#" className="hover-target" style={{ 
                  color: "var(--color-text-bright)", 
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}>
                  LinkedIn
                </a>
              </div>
            </div>

            <div>
              <span style={{ 
                fontSize: "0.7rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.3em", 
                color: "var(--color-accent)",
                display: "block",
                marginBottom: "0.5rem",
              }}>
                {isAr ? "الموقع" : "Location"}
              </span>
              <span style={{ color: "var(--color-text-bright)", fontSize: "1.1rem" }}>
                {isAr ? "نعمل عالمياً، نبتكر في كل مكان" : "Working Globally, Creating Everywhere"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

