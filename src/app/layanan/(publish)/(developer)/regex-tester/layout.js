export const metadata = {
  title: "Regex Tester | Developer Tools",
  description: "Uji dan Kembangkan Pola Regex Anda dengan Cepat",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/regex-tester`,
  },
  openGraph: {
    title: "Regex Tester | Developer Tools",
    description: "Uji dan Kembangkan Pola Regex Anda dengan Cepat",
    url: `${process.env.SITE_URL}/layanan/regex-tester`,
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
