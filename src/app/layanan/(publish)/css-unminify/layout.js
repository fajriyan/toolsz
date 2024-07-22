export const metadata = {
  title: "CSS Unminify | Toolsz",
  description: "Kembalikan Baris kode CSS menjadi Rapi Kembali Seperti Semula",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/css-unminify`,
  },
  openGraph: {
    title: "CSS Unminify | Toolsz",
    description: "Kembalikan Baris kode CSS menjadi Rapi Kembali Seperti Semula",
    url: `${process.env.SITE_URL}/layanan/css-unminify`,
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
