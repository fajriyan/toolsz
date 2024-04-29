export const metadata = {
  title: "Tentang Kami | Toolsz",
  description:
    "Temukan informasi mendalam tentang Toolsz, proyek open source yang bertujuan menyediakan online tools yang ringan dan mudah digunakan.",
  keywords: "toolsz, open source, online tools",
  alternates: {
    canonical: `${process.env.SITE_URL}/tentang-kami`,
  },
};

const LayoutDefault = ({ children }) => {
  return <>{children}</>;
};
export default LayoutDefault;
