export const metadata = {
  title: "Download File Dummy | Toolsz",
  description: "Unduh file dummy seperti PDF, DOC, dll dengan mudah",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/dummy-file`,
  },
  openGraph: {
    title: "Download File Dummy | Toolsz",
    description: "Unduh file dummy seperti PDF, DOC, dll dengan mudah",
    url: `${process.env.SITE_URL}/layanan/dummy-file`,
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
