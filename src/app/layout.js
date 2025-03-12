import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Temukan Tools Online (Word Counter, Lorem Generator) | Toolsz",
  description: "Layanan Penyedia Tools Online yang Simple seperti Lorem Generator, Word Counter, PDF Dummy.",
  icons: {
    icon: "/favicon.png",
  },
  keywords: "toolsz, open source, online tools",
  robots:"follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large",
  alternates: {
    canonical: `${process.env.SITE_URL}`,
  },
  openGraph: {
    title: "Temukan Tools Online (Word Counter, Lorem Generator) | Toolsz",
    description: "Layanan Penyedia Tools Online yang Simple seperti Lorem Generator, Word Counter, PDF Dummy.",
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
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Toolsz",
        "location": {
          "@type": "Place",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-6.2088",
            "longitude": "106.8456"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Jakarta",
            "addressRegion": "DKI Jakarta",
            "postalCode": "10110",
            "addressCountry": "ID"
          }
        }
      },
      {
        "@type": ["ProfessionalService", "Organization"],
        "name": "Toolsz",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Jakarta",
          "addressRegion": "DKI Jakarta",
          "postalCode": "10110",
          "addressCountry": "ID"
        },
        "logo": {
          "@type": "ImageObject",
          "url": "https://toolsz.vercel.app/_next/image?url=%2Ffavicon.png&w=96&q=75",
          "width": 200,
          "height": 200
        }
      },
      {
        "@type": "WebSite",
        "name": "Toolsz",
        "url": "https://toolsz.vercel.app/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://toolsz.vercel.app/",
          "query-input": "required name=search_term_string"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://toolsz.vercel.app/_next/image?url=%2Ffavicon.png&w=96&q=75",
          "width": 200,
          "height": 200
        }
      },
      {
        "@type": "WebPage",
        "name": "Toolsz : Layanan Tools Online Simple",
        "datePublished": "2024-07-20T00:00:00+07:00",
        "dateModified": "2024-07-20T00:00:00+07:00",
        "author": {
          "@type": "Person",
          "name": "Fajriyan Nur"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://avatars.githubusercontent.com/u/56616688?v=4",
          "width": 200,
          "height": 200
        }
      },
      {
        "@type": "Article",
        "name": "Toolsz : Layanan Tools Online Simple",
        "datePublished": "2022-08-31T10:02:56+07:00",
        "dateModified": "2024-05-13T13:21:39+07:00",
        "author": {
          "@type": "Person",
          "name": "Fajriyan Nur"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://avatars.githubusercontent.com/u/56616688?v=4",
          "width": 200,
          "height": 200
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
      <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L8KVKEM9NS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-L8KVKEM9NS');
          `}
        </Script>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata.schema) }}
            />
        <meta
          name="google-site-verification"
          content="gT1MhrQYGDjzx4R4YXRq6BXsHvBk7C15mksRwb6wUSo"
          />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
