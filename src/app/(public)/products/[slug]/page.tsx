import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductDetailContent from "@/components/ProductDetailContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: `${product.nameEn} | MRS Agro Chemicals`,
    description: product.descriptionEn,
    openGraph: {
      title: `${product.nameEn} | MRS Agro Chemicals`,
      description: product.descriptionEn,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
