export const schemaTemplates = {
  Article: {
    "@context": "https://schema.org",
    "@type": "NewsArticle", // atau BlogPosting
    url: "",
    headline: "",
    image: [],
    description: "",
    author: {
      "@type": "Person",
      name: "",
      url: "",
    },
    publisher: {
      "@type": "Organization",
      name: "",
      logo: {
        "@type": "ImageObject",
        url: "",
      },
    },
    datePublished: "",
    dateModified: "",
  },

  BreadcrumbList: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "",
        item: "",
      },
    ],
  },

  Event: {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "",
    image: [],
    description: "",
    startDate: "",
    endDate: "",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    performer: {
      "@type": "Person",
      name: "",
    },
    offers: [
      {
        "@type": "Offer",
        name: "",
        priceCurrency: "USD",
        price: "",
        availability: "https://schema.org/InStock",
      },
    ],
  },

  FAQPage: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "",
        acceptedAnswer: {
          "@type": "Answer",
          text: "",
        },
      },
    ],
  },

  HowTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "",
    totalTime: "",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "",
    },
    supply: [],
    tool: [],
    description: "",
    image: [],
    step: [
      {
        "@type": "HowToStep",
        text: "",
        image: "",
        name: "",
        url: "",
      },
    ],
  },

  JobPosting: {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "",
    identifier: "",
    description: "",
    hiringOrganization: {
      "@type": "Organization",
      name: "",
      sameAs: "",
      logo: "",
    },
    industry: "",
    employmentType: "",
    workHours: "",
    datePosted: "",
    validThrough: "",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "",
        addressLocality: "",
        addressRegion: "",
        postalCode: "",
        addressCountry: "",
      },
    },
    jobLocationType: "TELECOMMUTE",
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        minValue: "",
        maxValue: "",
        unitText: "YEAR",
      },
    },
    responsibilities: "",
    skills: "",
    qualifications: "",
    educationRequirements: "",
    experienceRequirements: "",
  },

  LocalBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "",
    image: "",
    "@id": "",
    url: "",
    telephone: "",
    priceRange: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "",
      postalCode: "",
      addressCountry: "",
      addressRegion: "",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "",
      longitude: "",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Monday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    department: [],
    sameAs: [],
  },

  Organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "",
    alternateName: "",
    url: "",
    logo: "",
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "",
        contactType: "customer service",
      },
    ],
  },

  Person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "",
    url: "",
    image: "",
    sameAs: [],
    jobTitle: "",
    worksFor: {
      "@type": "Organization",
      name: "",
    },
  },

  Product: {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "",
    image: [],
    brand: "",
    sku: "",
    description: "",
    offers: {
      "@type": "Offer",
      url: "",
      priceCurrency: "USD",
      price: "",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "",
      reviewCount: "",
      bestRating: "",
      worstRating: "",
    },
    review: [
      {
        "@type": "Review",
        name: "",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "",
        },
        datePublished: "",
        reviewBody: "",
        author: { "@type": "Person", name: "" },
        publisher: { "@type": "Organization", name: "" },
      },
    ],
  },

  Recipe: {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: "",
    keywords: "",
    description: "",
    image: [],
    video: {
      "@type": "VideoObject",
      contentUrl: "",
      embedUrl: "",
    },
    author: "",
    datePublished: "",
    prepTime: "",
    cookTime: "",
    recipeCategory: "",
    recipeCuisine: "",
    recipeYield: "",
    nutrition: {
      "@type": "NutritionInformation",
      servingSize: "",
      calories: "",
      fatContent: "",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "",
      reviewCount: "",
      bestRating: "",
      worstRating: "",
    },
    recipeIngredient: [],
    recipeInstructions: [
      {
        "@type": "HowToStep",
        text: "",
        name: "",
        url: "",
        image: "",
      },
    ],
    review: [
      {
        "@type": "Review",
        name: "",
        reviewRating: { "@type": "Rating", ratingValue: "" },
        datePublished: "",
        reviewBody: "",
        author: { "@type": "Person", name: "" },
        publisher: { "@type": "Organization", name: "" },
      },
    ],
  },

  WebSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "",
    url: "",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
};
