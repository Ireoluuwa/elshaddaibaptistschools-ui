import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ToastContainer from "@/components/shared/ToastContainer";
import Providers from "./providers";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elshaddaibaptistschools.com';
const siteDescription =
  'Faith-based school in Ibadan, Nigeria. Nurturing academic excellence, strong character, and Christian values since 1998.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'El-Shaddai Baptist Schools | Ibadan, Nigeria',
    template: '%s | El-Shaddai Baptist Schools',
  },
  description: siteDescription,
  authors: [{ name: 'El-Shaddai Baptist Schools' }],
  creator: 'El-Shaddai Baptist Schools',
  publisher: 'El-Shaddai Baptist Schools',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: siteUrl,
    siteName: 'El-Shaddai Baptist Schools',
    title: 'El-Shaddai Baptist Schools | Ibadan, Nigeria',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El-Shaddai Baptist Schools | Ibadan, Nigeria',
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        poppins.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
