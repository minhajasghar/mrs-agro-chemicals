import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us | MRS Agro Chemicals",
  description:
    "Learn about MRS Agro Chemicals' mission to deliver quality Pesticides, our agricultural expertise, and our commitment to supporting Pakistani farmers.",
  openGraph: {
    title: "About Us | MRS Agro Chemicals",
    description:
      "Learn about MRS Agro Chemicals' mission to deliver quality Pesticides.",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
