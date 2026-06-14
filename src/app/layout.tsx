import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vishwakarmawelding.com"),
  title: {
    default: "Shree Vishwakarma Welding Shop | Welding & Fabrication Services in Kushinagar",
    template: "%s | Vishwakarma Welding Shop",
  },
  description:
    "Professional welding, metal fabrication, gate manufacturing, grill installation and custom fabrication services in Kushinagar, Uttar Pradesh.",
  keywords: [
    "welding shop kushinagar",
    "fabrication kushinagar",
    "iron gate manufacturer",
    "steel railing",
    "window grill",
    "metal fabrication UP",
  ],
  authors: [{ name: "Shree Vishwakarma Welding Shop" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vishwakarmawelding.com",
    siteName: "Shree Vishwakarma Welding Shop",
    title: "Shree Vishwakarma Welding Shop | Welding & Fabrication Services in Kushinagar",
    description:
      "Professional welding, metal fabrication, gate manufacturing, grill installation and custom fabrication services in Kushinagar, Uttar Pradesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Vishwakarma Welding Shop",
    description:
      "Professional welding & fabrication services in Kushinagar, UP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}>
        {/* Google Translate — hidden default widget */}
        <div id="google_translate_element" style={{ display: "none" }} />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'en,hi', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
