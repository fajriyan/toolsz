export const metadata = {
  title: "Robots.txt Generator untuk SEO | Toolsz",
  description: "Hasilkan Robots.text dengan mudah untuk optimasi SEO",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/robots-generator`,
  },
  openGraph: {
    title: "Robots.txt Generator untuk SEO | Toolsz",
    description: "Hasilkan Robots.text dengan mudah untuk optimasi SEO",
    url: `${process.env.SITE_URL}/layanan/robots-generator`,
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
