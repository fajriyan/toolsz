export const metadata = {
  title: "Layanan Tools Online | Toolsz",
  description:
    "List beberapa layanan tools online dari Toolsz seperti Lorem Ipsum Generator, Word Counter",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan`,
  },
  openGraph: {
    title: "Layanan Tools Online | Toolsz",
    description: "List beberapa layanan tools online dari Toolsz seperti Lorem Ipsum Generator, Word Counter",
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
