import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTA } from "@/components/CTA";
import { DestinationOverview } from "@/components/DestinationOverview";
import { Footer } from "@/components/Footer";
import { GoodToKnow } from "@/components/GoodToKnow";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Navbar } from "@/components/Navbar";
import { PackageGrid } from "@/components/PackageGrid";
import { metadataFromSeo } from "@/lib/helpers";
import { destinationPageQuery } from "@/lib/queries";
import { fetchSanity } from "@/lib/sanity";
import type { DestinationPageData } from "@/types";

export const dynamic = "force-dynamic";
async function getPage() { return fetchSanity<DestinationPageData>(destinationPageQuery, { slug: "cn" }, 3600); }

export async function generateMetadata(): Promise<Metadata> {
  try { const data = await getPage(); return metadataFromSeo(data.destination?.seo, "/cn"); }
  catch { return { title: "China Travel & Tour Packages | Royal Arabian", description: "Discover private and curated China journeys with Royal Arabian." }; }
}

export default async function ChinaPage() {
  const data = await getPage();
  if (!data?.destination) notFound();
  const { destination, packages } = data;
  return <><Navbar/><main><Hero destination={destination}/><DestinationOverview destination={destination}/><Highlights items={destination.highlights}/><PackageGrid packages={packages || []}/><GoodToKnow items={destination.goodToKnow}/><CTA destination={destination.name}/></main><Footer/></>;
}
