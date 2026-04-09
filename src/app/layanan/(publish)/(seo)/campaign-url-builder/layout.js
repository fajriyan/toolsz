export const metadata = {
  title: "Campaign URL Builder | SEO Tools",
  description:
    "Buat URL campaign dengan parameter UTM secara cepat dan akurat untuk tracking Google Analytics dan marketing campaign.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/campaign-url-builder`,
  },
  openGraph: {
    title: "Campaign URL Builder | SEO Tools",
    description:
      "Buat URL campaign dengan parameter UTM secara cepat dan akurat untuk tracking Google Analytics dan marketing campaign.",
    url: `${process.env.SITE_URL}/layanan/campaign-url-builder`,
    type: "website",
    images: [
      {
        url: "/_next/image?url=%2Ffavicon.png&w=96&q=75",
        width: 200,
        height: 200,
        alt: "Layanan Toolsz",
      },
    ],
    site_name: "Toolsz",
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
