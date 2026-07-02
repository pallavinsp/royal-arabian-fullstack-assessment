import Image from "next/image";
import type { SanityImage as ImageValue } from "@/types";
import { urlFor } from "@/lib/sanity";

interface Props { value: ImageValue; alt?: string; fill?: boolean; width?: number; height?: number; sizes?: string; priority?: boolean; className?: string }
export function SanityImage({ value, alt, fill, width = 900, height = 600, sizes, priority, className }: Props) {
  if (!value?.asset) return null;
  const src = urlFor(value).width(width).height(height).fit("crop").url();
  return <Image src={src} alt={alt || value.alt || ""} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height} sizes={sizes} priority={priority} className={className} placeholder={value.asset.metadata?.lqip ? "blur" : "empty"} blurDataURL={value.asset.metadata?.lqip} />;
}
