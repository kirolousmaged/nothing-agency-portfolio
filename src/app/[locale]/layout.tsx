import { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Sans_Arabic, Outfit } from "next/font/google";
import GlobalCursor from "@/components/common/GlobalCursor";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "../globals.css";
import "@/styles/pages.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-arabic",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-outfit",
});

const nexa = localFont({
  src: [
    {
      path: "../../../public/fonts/Nexa-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Nexa-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nexa",
});

export const metadata: Metadata = {
  title: "Nothing Creative Ad Studio",
  description: "An advertising agency that doesn't wait for inspiration — we create it from nothing. Turning the void into marketing campaigns that dominate the market.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <html 
      lang={locale} 
      dir={isAr ? "rtl" : "ltr"} 
      className={`${outfit.variable} ${nexa.variable} ${ibmPlexArabic.variable}`}
      style={{ "--font-altair": "var(--font-outfit)" } as any}
    >
      <body className={`antialiased ${isAr ? "font-ar" : ""}`}>
        <GlobalCursor />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}


