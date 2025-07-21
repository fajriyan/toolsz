export const metadata = {
  title: "Konversi Gambar ke Teks (ORC) | Toolsz",
  description: "Konversikan Gambar kalian menjadi teks dengan mudah",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/image-to-text`,
  },
  openGraph: {
    title: "Konversi Gambar ke Teks (ORC) | Toolsz",
    description: "Belajar Grid dengan visual yang mudah dan salin code.",
    url: `${process.env.SITE_URL}/layanan/image-to-text`,
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
