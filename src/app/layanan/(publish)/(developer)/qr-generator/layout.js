export const metadata = {
  title: "QR Code Generator | Toolsz",
  description: "Hasilkan Robots.text dengan mudah untuk optimasi SEO",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/qr-generator`,
  },
  openGraph: {
    title: "QR Code Generator | Toolsz",
    description: "Hasilkan QR Code dengan Praktis dan Cepat",
    url: `${process.env.SITE_URL}/layanan/qr-generator`,
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
