export const metadata = {
  title: "Extract Gambar Online Gratis | SEO Tools",
  description:
    "Gunakan alat ekstraktor gambar gratis untuk mengambil dan mengunduh semua gambar dari halaman situs web dengan cepat dan mudah.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/image-extractor`,
  },
  openGraph: {
    title: "Extract Gambar Online Gratis | SEO Tools",
    description:
      "Gunakan alat ekstraktor gambar gratis untuk mengambil dan mengunduh semua gambar dari halaman situs web dengan cepat dan mudah.",
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
