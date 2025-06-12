export const metadata = {
  title: "SHA Converter | Toolsz",
  description: " Mendukung Konversi SHA 1, SHA 256, SHA 384, SHA 512",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/sha-converter`,
  },
  openGraph: {
    title: "SHA Converter | Toolsz",
    description: " Mendukung Konversi SHA 1, SHA 256, SHA 384, SHA 512",
    url: `${process.env.SITE_URL}/layanan/sha-converter`,
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
