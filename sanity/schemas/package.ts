import { defineArrayMember, defineField, defineType } from "sanity";

export const travelPackage = defineType({
  name: "package", title: "Package", type: "document",
  groups: [{ name: "details", title: "Details", default: true }, { name: "itinerary", title: "Itinerary" }, { name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "details", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "details", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "destination", title: "Destination", type: "reference", group: "details", to: [{ type: "destination" }], validation: (rule) => rule.required() }),
    defineField({ name: "duration", title: "Duration", type: "string", group: "details", validation: (rule) => rule.required() }),
    defineField({ name: "price", title: "Starting price (AED)", type: "number", group: "details", validation: (rule) => rule.required().positive() }),
    defineField({ name: "originalPrice", title: "Original price (AED)", type: "number", group: "details", validation: (rule) => rule.positive() }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "details", validation: (rule) => rule.required().max(320) }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "details", options: { hotspot: true }, validation: (rule) => rule.required(), fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required().warning("Alternative text improves accessibility and SEO") })] }),
    defineField({ name: "included", title: "What's included", type: "array", group: "details", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "itinerary", title: "Day-by-day itinerary", type: "array", group: "itinerary", of: [defineArrayMember({ name: "itineraryDay", title: "Itinerary day", type: "object", fields: [defineField({ name: "day", type: "number", validation: (rule) => rule.required().integer().positive() }), defineField({ name: "title", type: "string", validation: (rule) => rule.required() }), defineField({ name: "description", type: "text", rows: 4, validation: (rule) => rule.required() })], preview: { select: { day: "day", title: "title" }, prepare: ({ day, title }) => ({ title: `Day ${day}: ${title}` }) } })] }),
    defineField({ name: "featured", title: "Featured", type: "boolean", group: "details", initialValue: false }),
    defineField({ name: "seo", title: "Search and social", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Featured first", name: "featuredFirst", by: [{ field: "featured", direction: "desc" }, { field: "name", direction: "asc" }] }],
  preview: { select: { title: "name", destination: "destination.name", duration: "duration", media: "heroImage" }, prepare: ({ title, destination, duration, media }) => ({ title, subtitle: [destination, duration].filter(Boolean).join(" · "), media }) },
});
export default travelPackage;
