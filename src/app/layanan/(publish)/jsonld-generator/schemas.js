export const schemaTemplates = {
  Person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "",
    url: "",
    sameAs: [],
    description: "",
  },
  Organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "",
    url: "",
    logo: "",
  },
  WebSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "",
    url: "",
    potentialAction: {
      "@type": "SearchAction",
      target: "",
      "query-input": "required name=search_term_string",
    },
  },
  Article: {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "",
    description: "",
    author: {
      "@type": "Person",
      name: "",
    },
    datePublished: "",
  },
  Product: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "",
    image: [],
    description: "",
    sku: "",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "",
      availability: "https://schema.org/InStock",
    },
  },
};
