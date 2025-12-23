export const metadata = {
  title: "JSON Formatter Free | Toolsz",
  description: "Beautify, minify, dan kelola JSON dengan cepat dan rapi.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/json-formatter`,
  },
  openGraph: {
    title: "JSON Formatter Free | Toolsz",
    description: "Beautify, minify, dan kelola JSON dengan cepat dan rapi.",
    url: `${process.env.SITE_URL}/layanan/json-formatter`,
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
