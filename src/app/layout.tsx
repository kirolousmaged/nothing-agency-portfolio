import type { Metadata } from "next";
import { Mulish, Roboto } from "next/font/google";
import GlobalCursor from "@/components/common/GlobalCursor";
import Header from "@/components/common/Header";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  variable: "--font-mulish",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Nothing Agency | Creative Portfolio",
  description: "High-fidelity digital experiences and creative solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} ${roboto.variable}`}>
      <body className="antialiased">
        <GlobalCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
