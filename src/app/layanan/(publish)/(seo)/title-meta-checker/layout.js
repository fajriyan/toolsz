export const metadata = {
  title: "Meta Title & Description Checker | SEO Tools",
  description:
    "Cek meta title dan meta description website dengan cepat untuk optimasi SEO dan tampilan hasil pencarian yang lebih baik.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/title-meta-checker`,
  },
  openGraph: {
    title: "Meta Title & Description Checker | SEO Tools",
    description:
      "Cek meta title dan meta description website dengan cepat untuk optimasi SEO dan tampilan hasil pencarian yang lebih baik.",
    url: `${process.env.SITE_URL}/layanan/title-meta-checker`,
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
