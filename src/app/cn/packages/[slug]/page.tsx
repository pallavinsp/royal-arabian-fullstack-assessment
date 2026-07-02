import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { CheckIcon, ClockIcon } from "@/components/icons";
import { Navbar } from "@/components/Navbar";
import { SanityImage } from "@/components/SanityImage";
import { formatPrice, metadataFromSeo } from "@/lib/helpers";
import { packageQuery } from "@/lib/queries";
import { fetchSanity } from "@/lib/sanity";
import type { Package } from "@/types";

export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
async function getPackage(slug: string) { return fetchSanity<Package | null>(packageQuery, { slug, destinationSlug: "cn" }, 3600); }

export async function generateMetadata({ params }: Props): Promise<Metadata> { try { const item = await getPackage(params.slug); return item ? metadataFromSeo(item.seo, `/cn/packages/${item.slug}`) : {}; } catch { return {}; } }

export default async function PackagePage({ params }: Props) {
  const item = await getPackage(params.slug); if (!item) notFound();
  return <><Navbar/><main><section className="relative flex min-h-[600px] items-end overflow-hidden bg-ra-navy pb-20 pt-36 text-white"><SanityImage value={item.heroImage} fill priority sizes="100vw" width={1920} height={1000} className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#071a2c]/95 via-[#071a2c]/45 to-[#071a2c]/35"/><div className="container-ra relative"><Breadcrumb light items={[{label:"Home",href:"/"},{label:item.destination.name,href:"/cn"},{label:item.name}]}/>{item.featured && <p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-ra-gold">Featured journey</p>}<h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">{item.name}</h1><div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-white/75"><span className="flex items-center gap-2"><ClockIcon className="size-5 text-ra-gold"/>{item.duration}</span><span>From <strong className="ml-1 text-xl text-white">{formatPrice(item.price)}</strong></span></div></div></section><section className="section-pad"><div className="container-ra grid gap-14 lg:grid-cols-[1.35fr_.65fr]"><div><p className="eyebrow">Journey overview</p><h2 className="heading mt-4">An unforgettable way to see {item.destination.name}</h2><p className="mt-7 text-lg leading-8 text-slate-600">{item.shortDescription}</p>{item.itinerary?.length > 0 && <div className="mt-16"><h2 className="font-serif text-3xl text-ra-navy">Your itinerary</h2><ol className="mt-7 border-l border-ra-gold/50">{item.itinerary.map(day=><li key={day._key} className="relative pb-9 pl-8 last:pb-0"><span className="absolute -left-3 top-0 grid size-6 place-items-center rounded-full bg-ra-gold text-[10px] font-bold text-ra-navy">{day.day}</span><h3 className="font-serif text-xl text-ra-navy">Day {day.day} · {day.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{day.description}</p></li>)}</ol></div>}</div><aside className="h-fit bg-[#f4f1ea] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-ra-orange">Package includes</p><ul className="mt-6 space-y-4">{item.included?.map(inclusion=><li key={inclusion} className="flex gap-3 text-sm leading-6 text-slate-700"><CheckIcon className="mt-1 size-4 shrink-0 text-ra-orange"/>{inclusion}</li>)}</ul><div className="mt-8 border-t border-slate-300 pt-7"><span className="text-xs uppercase tracking-wider text-slate-500">Starting from</span><p className="mt-1 font-serif text-3xl text-ra-navy">{formatPrice(item.price)}</p><a href="#enquire" className="mt-6 block rounded-full bg-ra-navy px-6 py-3.5 text-center text-sm font-bold text-white transition hover:bg-ra-orange">Enquire now</a></div></aside></div></section><CTA title="Make this journey your own" destination={item.destination.name}/></main><Footer/></>;
}
