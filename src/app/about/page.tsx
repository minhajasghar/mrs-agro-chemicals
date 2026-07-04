import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | MRS Agro Chemicals",
  description:
    "Learn about MRS Agro Chemicals' mission to deliver quality seeds, our agricultural expertise, and our commitment to supporting Pakistani farmers with disease-resistant, high-yield crop varieties.",
  openGraph: {
    title: "About Us | MRS Agro Chemicals",
    description:
      "Learn about MRS Agro Chemicals' mission to deliver quality seeds, our agricultural expertise, and our commitment to supporting Pakistani farmers.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
