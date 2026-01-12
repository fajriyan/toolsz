export const metadata = {
  title: "UUID Generator | Developer Tools",
  description:
    "Generate UUID v1 (timestamp-based) dan v4 (random) secara instan dengan opsi jumlah, huruf besar, dan format kurung.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/uuid-generator`,
  },
  openGraph: {
    title: "UUID Generator | Developer Tools",
    description:
      " Generate UUID v1 (timestamp-based) dan v4 (random) secara instan dengan opsi jumlah, huruf besar, dan format kurung.",
    url: `${process.env.SITE_URL}/layanan/uuid-generator`,
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
