import { defineField, defineType } from "sanity";
export const seo = defineType({ name: "seo", title: "SEO", type: "object", fields: [
  defineField({ name: "title", title: "Title override", type: "string", validation: (rule) => rule.max(60).warning("Aim for 60 characters or fewer") }),
  defineField({ name: "description", type: "text", rows: 3, validation: (rule) => rule.max(160).warning("Aim for 160 characters or fewer") }),
  defineField({ name: "image", title: "Social image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })] }),
  defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
] });
