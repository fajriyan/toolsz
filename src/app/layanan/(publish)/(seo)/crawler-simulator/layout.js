export const metadata = {
  title: "Crawler Simulator Online | SEO Tools",
  description: "  Alat sederhana untuk simulasi bot Google Crawling website.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/image-extractor`,
  },
  openGraph: {
    title: "Crawler Simulator Online | SEO Tools",
    description: "  Alat sederhana untuk simulasi bot Google Crawling website.",
    url: `${process.env.SITE_URL}/layanan/image-extractor`,
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
