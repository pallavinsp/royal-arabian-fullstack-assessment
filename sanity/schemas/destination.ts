import { defineArrayMember, defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination", title: "Destination", type: "document",
  groups: [{ name: "content", title: "Content", default: true }, { name: "seo", title: "SEO" }],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "content", options: { hotspot: true }, validation: (rule) => rule.required(), fields: [defineField({ name: "alt", title: "Alternative text", type: "string", validation: (rule) => rule.required().warning("Alternative text improves accessibility and SEO") })] }),
    defineField({ name: "description", title: "Overview", type: "text", rows: 6, group: "content", validation: (rule) => rule.required() }),
    defineField({ name: "highlights", title: "Highlights", type: "array", group: "content", of: [defineArrayMember({ type: "string" })], validation: (rule) => rule.min(1) }),
    defineField({ name: "goodToKnow", title: "Good to know", type: "array", group: "content", of: [defineArrayMember({ name: "goodToKnowItem", title: "Information", type: "object", fields: [defineField({ name: "title", type: "string", validation: (rule) => rule.required() }), defineField({ name: "content", type: "text", rows: 3, validation: (rule) => rule.required() })], preview: { select: { title: "title", subtitle: "content" } } })] }),
    defineField({ name: "seo", title: "Search and social", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "name", subtitle: "tagline", media: "heroImage" } },
});
export default destination;
