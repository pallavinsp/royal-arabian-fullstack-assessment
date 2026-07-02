import { createClient, type QueryParams } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "x0gfl5n9";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-02";

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });
const builder = imageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) { return builder.image(source).auto("format").fit("max"); }

export async function fetchSanity<T>(query: string, params: QueryParams = {}, revalidate = 3600): Promise<T> {
  return client.fetch<T>(query, params, { next: { revalidate } });
}
