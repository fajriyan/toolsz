export const metadata = {
  title: "Easy CDN Importer | Developer Tools | Toolsz",
  description: "Pakai CDN dengan cepat hanya checklist saja",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/easy-cdn`,
  },
  openGraph: {
    title: "Easy CDN Importer | Developer Tools | Toolsz",
    description: "Pakai CDN dengan cepat hanya checklist saja",
    url: `${process.env.SITE_URL}/layanan/easy-cdn`,
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
