import type { Metadata } from "next";
import { Fraunces, Work_Sans, Noto_Nastaliq_Urdu, Noto_Sans_Arabic } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
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

const siteUrl = "https://mrs-agro-pesticides.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MRS Agro Chemicals",
    template: "%s | MRS Agro Chemicals",
  },
  description:
    "MRS Agro Chemicals provides premium quality certified Pesticides to farmers across Pakistan.",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
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
      dir="ltr"
      className={`${fraunces.variable} ${workSans.variable} ${nastaliq.variable} ${notoSansArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-brand-cream text-brand-charcoal">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
