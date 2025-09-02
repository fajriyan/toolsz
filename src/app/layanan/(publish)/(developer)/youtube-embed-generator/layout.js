export const metadata = {
  title: " Youtube Embed Generator | Toolsz",
  description: "Sematkan video youtube pada situs dengan pilihan banyak option mudah",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/youtube-embed-generator`,
  },
  openGraph: {
    title: "Youtube Embed Generator | Toolsz",
    description: "Sematkan video youtube pada situs dengan pilihan banyak option mudah",
    url: `${process.env.SITE_URL}/layanan/youtube-embed-generator`,
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
