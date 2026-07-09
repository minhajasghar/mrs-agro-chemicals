import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const siteUrl = "https://mrs-agro-pesticides.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "about", "products", "franchise", "contact"].map(
    (slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: slug === "" ? 1 : 0.8,
    })
  );

  const productPages = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}
