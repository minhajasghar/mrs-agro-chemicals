import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "MRS Agro Chemicals | Premium Quality Pesticides in Pakistan",
  description:
    "MRS Agro Chemicals provides premium, high-yield certified Pesticides for Pakistani farmers.",
  openGraph: {
    title: "MRS Agro Chemicals | Premium Quality Pesticides in Pakistan",
    description:
      "MRS Agro Chemicals provides premium, high-yield certified Pesticides for Pakistani farmers.",
    type: "website",
  },
};

export default function Home() {
  return <HomeContent />;
}
