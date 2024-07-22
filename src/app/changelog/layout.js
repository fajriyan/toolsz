export const metadata = {
  title: "Changelog | Toolsz",
  description: "Dapatkan informasi mengenai update aplikasi toolsz disini",
  robots:"nofollow, noindex, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/changelog`,
  },
  openGraph: {
    title: "Changelog | Toolsz",
    description: "Dapatkan informasi mengenai update aplikasi toolsz disini",
    url: `${process.env.SITE_URL}`,
    type: 'website',
    images: [
      {
        url: '/_next/image?url=%2Ffavicon.png&w=96&q=75',
        width: 200,
        height: 200,
        alt: 'Layanan Toolsz'
      }
    ],
    site_name: "Toolsz"
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
