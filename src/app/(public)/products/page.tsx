import type { Metadata } from "next";
import { products } from "@/lib/products";
import ProductsContent from "@/components/ProductsContent";

export const metadata: Metadata = {
  title: "Our Pesticide Varieties | MRS Agro Chemicals",
  description:
    "Browse MRS Agro Chemicals' range of premium certified Pesticide varieties.",
  openGraph: {
    title: "Our Pesticide Varieties | MRS Agro Chemicals",
    description:
      "Browse MRS Agro Chemicals' range of premium certified Pesticide varieties.",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductsContent products={products} />;
}
