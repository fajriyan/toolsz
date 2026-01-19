export const metadata = {
  title: "Tint & Shade Generator | Developer Tools",
  description:
    "Generate variasi tint dan shade dari warna dasar secara instan dengan format warna dalam HEX dan TailwindCSS.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/tint-shade-generator`,
  },
  openGraph: {
    title: "Tint & Shade Generator | Developer Tools",
    description:
      "Generate variasi tint dan shade dari warna dasar secara instan dengan format warna dalam HEX dan TailwindCSS.",
    url: `${process.env.SITE_URL}/layanan/tint-shade-generator`,
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
