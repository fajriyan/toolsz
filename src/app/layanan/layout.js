export const metadata = {
  title: "Layanan Tools Online | Toolsz",
  description:
    "List beberapa layanan tools online dari Toolsz seperti Lorem Ipsum Generator, Word Counter",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
