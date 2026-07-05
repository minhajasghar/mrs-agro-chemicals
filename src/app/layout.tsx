import type { Metadata } from "next";
import { Fraunces, Work_Sans, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import HtmlWrapper from "@/components/HtmlWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

// Update this to the real production domain once finalized
const siteUrl = "https://mrs-agro-seeds.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MRS Agro Chemicals",
    template: "%s | MRS Agro Chemicals",
  },
  description:
    "MRS Agro Chemicals provides premium quality certified seeds to farmers across Pakistan. Explore our range of hybrid maize, wheat, cotton, and rice varieties.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    siteName: "MRS Agro Chemicals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${nastaliq.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <LanguageProvider>
          <HtmlWrapper>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </HtmlWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
