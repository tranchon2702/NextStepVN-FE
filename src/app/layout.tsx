import type { Metadata } from "next";
import { Montserrat, Merriweather, Noto_Sans_JP } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import "../styles/header.css";
import "../styles/pages.css";
import "../styles/facility-slider.css";
import "../styles/eco-friendly-unified.css";
import "../styles/eco-friendly-override.css";
import "../styles/eco-friendly-responsive.css";
import "../styles/eco-friendly-important.css";
import "../styles/floating-chat.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ClientScriptProvider from "../components/ClientScriptProvider";
import FloatingChatWidget from "../components/FloatingChatWidget";
import Providers from "./providers";

const montserrat = Montserrat({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-montserrat',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: "Next Step Viet Nam - Kết Nối Kỹ Sư Việt Nam Với Nhật Bản",
  description: "Next Step Viet Nam - Đơn vị hàng đầu trong lĩnh vực phát triển và cung ứng kỹ sư quốc tế, cầu nối nhân lực chất lượng cao giữa Việt Nam và Nhật Bản",
  keywords: "Next Step Viet Nam, tuyển dụng kỹ sư, việc làm Nhật Bản, engineer recruitment, Vietnam engineers",
  authors: [{ name: "Next Step Viet Nam" }],
  icons: {
    icon: '/images/LogoNexxtStepVN.png',
    apple: '/images/LogoNexxtStepVN.png',
    shortcut: '/images/LogoNexxtStepVN.png',
  },
  openGraph: {
    title: "Next Step Viet Nam - Kết Nối Kỹ Sư Việt Nam Với Nhật Bản",
    description: "Đơn vị hàng đầu trong lĩnh vực phát triển và cung ứng kỹ sư quốc tế",
    url: "https://nextstepvn.com",
    siteName: "Next Step Viet Nam",
    images: [
      {
        url: '/images/LogoNexxtStepVN.png',
        width: 1200,
        height: 630,
        alt: 'Next Step Viet Nam Logo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Next Step Viet Nam - Kết Nối Kỹ Sư Việt Nam Với Nhật Bản",
    description: "Đơn vị hàng đầu trong lĩnh vực phát triển và cung ứng kỹ sư quốc tế",
    images: ['/images/LogoNexxtStepVN.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next Step Viet Nam" />
        <meta
          name="keywords"
          content="Next Step Viet Nam, Vietnam, Japan, Engineering Jobs, Recruitment"
        />
        <meta name="author" content="Next Step Viet Nam" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta
          name="google-site-verification"
          content="google-site-verification=google-site-verification"
        />
        <link rel="icon" type="image/png" href="/images/LogoNexxtStepVN.png" />
        <link rel="apple-touch-icon" href="/images/LogoNexxtStepVN.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${montserrat.className} ${montserrat.variable} ${merriweather.variable} ${notoSansJP.variable}`} suppressHydrationWarning>
        <Providers>
        <ClientScriptProvider />
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        <FloatingChatWidget />
        </Providers>
      </body>
    </html>
  );
}
