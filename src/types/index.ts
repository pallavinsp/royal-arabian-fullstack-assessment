export interface SanityImage {
  asset: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number; aspectRatio: number } } };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Seo { title: string; description: string; image?: SanityImage; noIndex: boolean }
export interface GoodToKnow { _key: string; title: string; content: string }
export interface Itinerary { _key: string; day: number; title: string; description: string }

export interface Destination {
  _id: string; _type: "destination"; name: string; slug: string; tagline: string;
  heroImage: SanityImage; description: string; highlights: string[]; goodToKnow: GoodToKnow[]; seo: Seo;
}

export interface Package {
  _id: string; _type: "package"; name: string; slug: string; duration: string; price: number;
  originalPrice?: number; shortDescription: string; heroImage: SanityImage; included: string[];
  itinerary: Itinerary[]; featured: boolean; destination: { _id: string; name: string; slug: string }; seo: Seo;
}

export interface DestinationPageData { destination: Destination; packages: Package[] }
