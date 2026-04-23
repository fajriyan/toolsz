export const metadata = {
  title: "Gerbang Logika | Developer Tools",
  description:
    "Pilih gerbang logika, tekan tombol input, dan lihat apakah lampu menyala. Di bawah, kamu juga dapat membaca analogi setiap gerbang.",
  robots:
    "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/gerbang-logika`,
  },
  openGraph: {
    title: "Gerbang Logika | Developer Tools",
    description:
      "Pilih gerbang logika, tekan tombol input, dan lihat apakah lampu menyala. Di bawah, kamu juga dapat membaca analogi setiap gerbang.",
    url: `${process.env.SITE_URL}/layanan/gerbang-logika`,
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
