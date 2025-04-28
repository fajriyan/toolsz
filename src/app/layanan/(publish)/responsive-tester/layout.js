export const metadata = {
  title: "Responsive Tester, Cek Responsive Website | Toolsz",
  description: "Cek Kemampuan Responsive pada Website Kalian dengan Preset yang umum digunakan",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/responsive-tester`,
  },
  openGraph: {
    title: "Responsive Tester, Cek Responsive Website | Toolsz",
    description: "Cek Kemampuan Responsive pada Website Kalian dengan Preset yang umum digunakan",
    url: `${process.env.SITE_URL}/layanan/responsive-tester`,
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
