import type { Metadata } from "next";
import FranchiseContent from "@/components/FranchiseContent";

export const metadata: Metadata = {
  title: "Our Franchise | MRS Agro Chemicals",
  description:
    "Discover MRS Agro Chemicals' authorized franchise shop in Multan. Serving farmers across Punjab with quality Pesticides and expert guidance.",
  openGraph: {
    title: "Our Franchise | MRS Agro Chemicals",
    description:
      "Discover MRS Agro Chemicals' authorized franchise shop in Multan.",
    type: "website",
  },
};

export default function FranchisePage() {
  return <FranchiseContent />;
}
