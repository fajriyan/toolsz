export const metadata = {
  title: "Responsive CSS Generator | Developer Tools",
  description:
    "Pilih device & masukkan CSS. Klik Generate untuk membungkus CSS dengan media queries.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/responsive-css-generator`,
  },
  openGraph: {
    title: "Responsive CSS Generator | Developer Tools",
    description:
      "Pilih device & masukkan CSS. Klik Generate untuk membungkus CSS dengan media queries.",
    url: `${process.env.SITE_URL}/layanan/responsive-css-generator`,
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
