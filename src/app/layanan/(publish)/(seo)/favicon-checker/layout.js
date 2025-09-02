export const metadata = {
  title: "Favicon & Apple Icon Checker | SEO Tools",
  description: "Cek icon yang digunakan pada halaman website kalian",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/favicon-checker`,
  },
  openGraph: {
    title: "Favicon & Apple Icon Checker | SEO Tools",
    description: "Cek icon yang digunakan pada halaman website kalian",
    url: `${process.env.SITE_URL}/layanan/favicon-checker`,
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
