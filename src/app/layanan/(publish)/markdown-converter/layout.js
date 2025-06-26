export const metadata = {
  title: "Markdown to HTML Converter | Toolsz",
  description: " Hasilkan HTML dari Markdown secara langsung",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/markdown-converter`,
  },
  openGraph: {
    title: "Markdown to HTML Converter | Toolsz",
    description: " Hasilkan HTML dari Markdown secara langsung",
    url: `${process.env.SITE_URL}/layanan/markdown-converter`,
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
