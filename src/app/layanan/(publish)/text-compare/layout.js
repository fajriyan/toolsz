export const metadata = {
  title: "Text Compare | Bandingkan Teks",
  description: "Komparasikan 2 text dengan mudah",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/text-compare`,
  },
  openGraph: {
    title: "Text Compare | Bandingkan Teks",
    description: "Komparasikan 2 text dengan mudah",
    url: `${process.env.SITE_URL}/layanan/text-compare`,
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
