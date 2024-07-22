export const metadata = {
  title: "Tentang Kami | Toolsz",
  description:
    "Temukan informasi mendalam tentang Layanan Toolsz, proyek open source yang bertujuan menyediakan online tools yang ringan dan mudah digunakan.",
  keywords: "toolsz, open source, online tools",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/tentang-kami`,
  },
  openGraph: {
    title: "Tentang Kami | Toolsz",
    description: "Temukan informasi mendalam tentang Layanan Toolsz, proyek open source yang bertujuan menyediakan online tools yang ringan dan mudah digunakan.",
    url: `${process.env.SITE_URL}`,
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
