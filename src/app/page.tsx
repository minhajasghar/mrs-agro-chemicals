import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "MRS Agro Chemicals | Premium Quality Seeds in Pakistan",
  description:
    "MRS Agro Chemicals provides premium, high-yield certified seeds for Pakistani farmers. Explore hybrid maize, wheat, cotton, and rice varieties trusted across the country.",
  openGraph: {
    title: "MRS Agro Chemicals | Premium Quality Seeds in Pakistan",
    description:
      "MRS Agro Chemicals provides premium, high-yield certified seeds for Pakistani farmers. Explore hybrid maize, wheat, cotton, and rice varieties trusted across the country.",
    type: "website",
  },
};

export default function Home() {
  return <HomeContent />;
}
