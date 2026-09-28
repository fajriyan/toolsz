export const metadata = {
  title: "Base64 Encoder/Decoder Online | Toolsz",
  description:
    "Encode teks menjadi Base64 atau decode Base64 menjadi teks asli, plus dukungan format URL safe.",
  keywords:
    "base64 encoder, base64 decoder, base64 online, encode decode base64",
  robots: "follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}/layanan/base64-converter`,
  },
  openGraph: {
    title: "Base64 Encoder/Decoder Online | Toolsz",
    description:
      "Encode teks menjadi Base64 atau decode Base64 menjadi teks asli, plus dukungan format URL safe.",
    url: `${process.env.SITE_URL}/layanan/base64-converter`,
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
