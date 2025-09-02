export const metadata = {
  title: "CSS Minify | Toolsz",
  description: "Buat baris kode CSS milik anda menjadi Kecil dan Ringan",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/css-minify`,
  },
  openGraph: {
    title: "CSS Minify | Toolsz",
    description: "Buat baris kode CSS milik anda menjadi Kecil dan Ringan",
    url: `${process.env.SITE_URL}/layanan/css-minify`,
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
