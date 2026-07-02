const imageProjection = `
{
  asset->{
    _id,
    url,
    metadata{
      lqip,
      dimensions{
        width,
        height,
        aspectRatio
      }
    }
  },
  alt,
  hotspot,
  crop
}
`;

export const destinationPageQuery = `
{
  "destination": *[
    _type == "destination" &&
    slug.current == $slug
  ][0]{
    _id,
    _type,
    name,
    "slug": slug.current,
    tagline,
    heroImage${imageProjection},
    description,
    highlights,
    goodToKnow[]{
      _key,
      title,
      content
    },
    seo
  },

  "packages": *[
    _type == "package" &&
    references(
      *[
        _type == "destination" &&
        slug.current == $slug
      ][0]._id
    )
  ] | order(featured desc, name asc){
    _id,
    _type,
    name,
    "slug": slug.current,
    duration,
    price,
    originalPrice,
    shortDescription,
    heroImage${imageProjection},
    included,
    itinerary[]{
      _key,
      day,
      title,
      description
    },
    featured,
    seo,
    destination->{
      _id,
      name,
      "slug": slug.current
    }
  }
}
`;

export const packageQuery = `
*[
  _type == "package" &&
  slug.current == $slug
][0]{
  _id,
  _type,
  name,
  "slug": slug.current,
  duration,
  price,
  originalPrice,
  shortDescription,
  heroImage${imageProjection},
  included,
  itinerary[]{
    _key,
    day,
    title,
    description
  },
  featured,
  seo,
  destination->{
    _id,
    name,
    "slug": slug.current
  }
}
`;

export const packageSlugsQuery = `
*[
  _type == "package" &&
  defined(slug.current)
]{
  "slug": slug.current
}
`;