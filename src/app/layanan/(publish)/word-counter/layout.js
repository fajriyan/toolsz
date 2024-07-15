export const metadata = {
  title: "Penghitung Kata Online | Toolsz",
  description:
    "Hitung jumlah kata dan persentasi pengulangan dalam sebuah kalimat",
  keywords: "word counter indonesia, word counter online, word counter",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/produk/word-counter`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
