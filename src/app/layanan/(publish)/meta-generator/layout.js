export const metadata = {
  title: "Meta Tag Generator | Toolsz",
  description: "Membantu Anda membuat tag meta dan detail penting tentang halaman web milik anda.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/meta-generator`,
  },
  openGraph: {
    title: "Meta Tag Generator | Toolsz",
    description: "Membantu Anda membuat tag meta dan detail penting tentang halaman web milik anda.",
    url: `${process.env.SITE_URL}/layanan/meta-generator`,
    type: "website",
    images: [
      {
        url: "/_next/image?url=%2Ffavicon.png&w=96&q=75",
        width: 200,
        height: 200,
        alt: "Layanan Toolsz",
      },
    ],
    site_name: "Toolsz",
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
