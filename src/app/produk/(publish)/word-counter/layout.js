export const metadata = {
  title: "Word Counter | Toolsz",
  description:
    "Hitung jumlah kata dan persentasi pengulangan dalam sebuah kalimat",
  alternates: {
    canonical: `${process.env.SITE_URL}/produk/word-counter`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
