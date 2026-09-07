export const metadata = {
  title: "Timestamp Converter Online | Toolsz",
  description:
    "Konversi antara Unix timestamp (epoch) dan tanggal manusia dengan mudah",
  keywords:
    "timestamp converter, epoch converter, unix timestamp, date converter",
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/epoch-converter`,
  },
  openGraph: {
    title: "Timestamp Converter Online | Toolsz",
    description:
      "Konversi antara Unix timestamp (epoch) dan tanggal manusia dengan mudah",
    url: `${process.env.SITE_URL}/layanan/epoch-converter`,
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
