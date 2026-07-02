import type { Metadata } from "next";
import type { Seo } from "@/types";
import { urlFor } from "./sanity";

export function formatPrice(value: number, currency = "AED") {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function metadataFromSeo(seo: Seo | undefined, path: string): Metadata {
  if (!seo) return {};
  const image = seo.image?.asset ? urlFor(seo.image).width(1200).height(630).url() : undefined;
  return {
    title: seo.title, description: seo.description, alternates: { canonical: path }, robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title: seo.title, description: seo.description, url: path, type: "website", images: image ? [{ url: image, width: 1200, height: 630, alt: seo.image?.alt || seo.title }] : undefined },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: image ? [image] : undefined },
  };
}
