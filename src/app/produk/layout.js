export const metadata = {
  title: "Produk | Toolsz",
  description:
    "List beberapa produk dari Toolsz seperti : Lorem Ipsum Generator, Word Counter",
  alternates: {
    canonical: `${process.env.SITE_URL}/tentang-kami`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
