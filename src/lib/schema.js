// JSON-LD structured data for Lagoon Main Beach.
// Business identity lives here as a single source of truth; pages import the
// builders they need and pass the result to BaseLayout's `schema` prop.

const SITE = 'https://lagoonmainbeach.com';

// NAP - keep identical to the visible site footer/contact page and the Google
// Business Profile. Verify the geo coordinates against the Maps pin before launch.
export const business = {
  name: 'Lagoon Main Beach',
  url: SITE,
  email: 'reception@lagoonmainbeach.com',
  telephone: '+61 7 3666 8609',
  image: `${SITE}/img/hero-pano.jpg`,
  address: {
    streetAddress: '11 Cronin Avenue',
    addressLocality: 'Main Beach',
    addressRegion: 'QLD',
    postalCode: '4217',
    addressCountry: 'AU',
  },
  geo: { latitude: -27.97725, longitude: 153.42655 }, // approximate - confirm exact
  areaServed: ['Main Beach', 'Gold Coast'],
  // sameAs: [] // add Instagram / Facebook / GBP URLs when available
};

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: business.address.streetAddress,
  addressLocality: business.address.addressLocality,
  addressRegion: business.address.addressRegion,
  postalCode: business.address.postalCode,
  addressCountry: business.address.addressCountry,
};

// LocalBusiness (RealEstateAgent subtype) - the letting & management business.
// Rendered site-wide from BaseLayout.
export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE}/#business`,
  name: business.name,
  url: business.url,
  image: business.image,
  email: business.email,
  telephone: business.telephone,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude },
  areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
  knowsAbout: ['Residential letting', 'Property management', 'Long-term apartment rentals'],
};

// WebSite - rendered site-wide from BaseLayout.
export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: business.url,
  name: business.name,
  publisher: { '@id': `${SITE}/#business` },
};

// ApartmentComplex - the building and its residences. Homepage only.
export const apartmentComplex = {
  '@context': 'https://schema.org',
  '@type': 'ApartmentComplex',
  '@id': `${SITE}/#building`,
  name: 'Lagoon Main Beach',
  url: business.url,
  description:
    'Premium long-term apartments for lease at Main Beach, Gold Coast. 1, 2 and 3 bedroom residences with resort-style pool, gym and landscaped grounds.',
  image: business.image,
  telephone: business.telephone,
  address: postalAddress,
  geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude },
  numberOfBedroomsRange: '1-3',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Resort-style pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Gym', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Landscaped grounds', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Secure parking', value: true },
  ],
  managedBy: { '@id': `${SITE}/#business` },
};

// FAQPage - pass an array of { q, a } pairs (from src/lib/faqs.js).
export function faqPage(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

// BreadcrumbList - pass an array of { name, path } from Home down to the page.
export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: new URL(path, SITE).href,
    })),
  };
}
