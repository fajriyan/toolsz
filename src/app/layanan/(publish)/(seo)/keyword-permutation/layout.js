export const metadata = {
  title: "Keyword Permutation Generator | SEO Tools",
  description:
    "Buat berbagai kombinasi keyword secara instan untuk riset SEO, konten, dan optimasi pencarian.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/keyword-permutation`,
  },
  openGraph: {
    title: "Keyword Permutation Generator | SEO Tools",
    description:
      "Buat berbagai kombinasi keyword secara instan untuk riset SEO, konten, dan optimasi pencarian.",
    url: `${process.env.SITE_URL}/layanan/keyword-permutation`,
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
