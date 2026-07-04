import type { Metadata } from "next";
import FranchiseContent from "@/components/FranchiseContent";

export const metadata: Metadata = {
  title: "Become a Franchise Partner | MRS Agro Chemicals",
  description:
    "Join MRS Agro Chemicals' franchise network. Partner with us to distribute premium quality seeds and serve the agricultural community in your city.",
  openGraph: {
    title: "Become a Franchise Partner | MRS Agro Chemicals",
    description:
      "Join MRS Agro Chemicals' franchise network. Partner with us to distribute premium quality seeds.",
    type: "website",
  },
};

export default function FranchisePage() {
  return <FranchiseContent />;
}
