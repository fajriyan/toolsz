export const metadata = {
  title: "Remove Whitespace | Toolsz",
  description: "Bersihkan Whitespcae pada kalimat, link atau apapun dengan mudah",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/remove-whitespace`,
  },
  openGraph: {
    title: "Remove Whitespace | Toolsz",
    description: "Bersihkan Whitespcae pada kalimat, link atau apapun dengan mudah",
    url: `${process.env.SITE_URL}/layanan/remove-whitespace`,
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
