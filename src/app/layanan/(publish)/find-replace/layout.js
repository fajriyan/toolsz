export const metadata = {
  title: " Cari dan Ganti Kata | SEO Tools | Toolsz",
  description: " Cari Kata dan Ganti dengan text / dengan regex",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/find-replace`,
  },
  openGraph: {
    title: " Cari dan Ganti Kata | SEO Tools | Toolsz",
    description: " Cari Kata dan Ganti dengan text / dengan regex",
    url: `${process.env.SITE_URL}/layanan/find-replace`,
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
