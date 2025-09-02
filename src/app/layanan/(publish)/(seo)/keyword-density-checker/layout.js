export const metadata = {
  title: "Keyword Density Checker | SEO Tools",
  description: "Cek keyword dencity pada konten kamu dengan mudah dan cepat.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/keyword-density-checker`,
  },
  openGraph: {
    title: "Keyword Density Checker | SEO Tools",
    description: "Cek keyword dencity pada konten kamu dengan mudah dan cepat.",
    url: `${process.env.SITE_URL}/layanan/keyword-density-checker`,
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
