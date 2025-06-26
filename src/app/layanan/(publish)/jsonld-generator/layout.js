export const metadata = {
  title: " JSON LD Generator | SEO Tools | Toolsz",
  description: "  Membantu membuat JSON LD untuk melengkapi meta Tag Website kalian.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/jsonld-generator`,
  },
  openGraph: {
    title: " JSON LD Generator | SEO Tools | Toolsz",
    description: "  Membantu membuat JSON LD untuk melengkapi meta Tag Website kalian.",
    url: `${process.env.SITE_URL}/layanan/jsonld-generator`,
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
