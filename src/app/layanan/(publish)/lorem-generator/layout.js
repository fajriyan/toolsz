export const metadata = {
  title: "Lorem Ipsum Generator | Toolsz",
  description: "Hasilkan Kalimat Lorem Ipsum dengan Praktis dan Efisien",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/lorem-generator`,
  },
  openGraph: {
    title: "Lorem Ipsum Generator | Toolsz",
    description: "Hasilkan Kalimat Lorem Ipsum dengan Praktis dan Efisien",
    url: `${process.env.SITE_URL}/layanan/lorem-generator`,
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
