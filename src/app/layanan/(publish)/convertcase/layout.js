export const metadata = {
  title: "Konversi Case | Toolsz",
  description:
    "Konversi kalimat dengan pilihan kepekaan kalimat hanya sekali klik",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/convertcase`,
  },
  openGraph: {
    title: "Konversi Case | Toolsz",
    description: "Konversi kalimat dengan pilihan kepekaan kalimat hanya sekali klik",
    url: `${process.env.SITE_URL}/layanan/convertcase`,
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
