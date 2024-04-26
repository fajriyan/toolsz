import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beranda | Toolsz",
  description: "Web Tools online gratis, lorem generator, word counter, dll",
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: `${process.env.SITE_URL}`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <meta
        name="google-site-verification"
        content="gT1MhrQYGDjzx4R4YXRq6BXsHvBk7C15mksRwb6wUSo"
      />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
