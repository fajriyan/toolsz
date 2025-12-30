export const metadata = {
  title: "Chmod Calculator | Developer Tools",
  description:
    "Konversi dan hitung permission file Linux dalam format perintah chmod.",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/chmod-calculator`,
  },
  openGraph: {
    title: "Chmod Calculator | Developer Tools",
    description: "Konversi dan hitung permission file Linux dalam format perintah chmod.",
    url: `${process.env.SITE_URL}/layanan/chmod-calculator`,
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
