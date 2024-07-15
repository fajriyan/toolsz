export const metadata = {
  title: "Display Info | Toolsz",
  description: "Lihat informasi mengenai ukuran layar anda secara online",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/produk/display`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
