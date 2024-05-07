export const metadata = {
  title: "Sandbox | Toolsz",
  description:
    "Halaman sandbox toolsz sebagai halaman uji coba fitur baru sebelum dilakukan release",
  alternates: {
    canonical: `${process.env.SITE_URL}/sandbox`,
  },
};

const LayoutSandbox = ({ children }) => {
  return children;
};
export default LayoutSandbox;
