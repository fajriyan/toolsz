export const metadata = {
  title: "Image Compressor | Developer Tools",
  description:
    "Kompres gambar langsung di browser tanpa backend tambahan.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/image-compressor`,
  },
  openGraph: {
    title: "Image Compressor | Developer Tools",
    description:
      "Kompres gambar langsung di browser tanpa backend tambahan.",
    url: `${process.env.SITE_URL}/layanan/image-compressor`,
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
