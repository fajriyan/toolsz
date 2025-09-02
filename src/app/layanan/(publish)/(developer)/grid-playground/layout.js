export const metadata = {
  title: "Grid Playground Untuk Developer | Toolsz",
  description: "Belajar Grid dengan visual yang mudah dan salin code.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/grid-playground`,
  },
  openGraph: {
    title: "Grid Playground untuk Developer | Toolsz",
    description: "Belajar Grid dengan visual yang mudah dan salin code.",
    url: `${process.env.SITE_URL}/layanan/grid-playground`,
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
