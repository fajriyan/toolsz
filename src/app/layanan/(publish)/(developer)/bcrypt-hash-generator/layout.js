export const metadata = {
  title: "Bcrypt Hash Generator | Developer Tools",
  description:
    "Hasilkan hash bcrypt dengan mudah dan verifikasi keasliannya.",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/bcrypt-hash-generator`,
  },
  openGraph: {
    title: "Bcrypt Hash Generator | Developer Tools",
    description: "Hasilkan hash bcrypt dengan mudah dan verifikasi keasliannya.",
    url: `${process.env.SITE_URL}/layanan/bcrypt-hash-generator`,
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
