export const metadata = {
  title: "Penghitung Kata Online | Toolsz",
  description:
    "Hitung jumlah kata dan persentasi pengulangan dalam sebuah kalimat",
  keywords: "word counter indonesia, word counter online, word counter",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/word-counter`,
  },
  openGraph: {
    title: "Penghitung Kata Online | Toolsz",
    description: "Hitung jumlah kata dan persentasi pengulangan dalam sebuah kalimat",
    url: `${process.env.SITE_URL}/layanan/word-counter`,
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
