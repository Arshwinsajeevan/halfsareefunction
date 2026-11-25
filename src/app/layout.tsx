import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Parisienne,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3D0712",
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://aarna.inviteus.in");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aarna's Half Saree Ceremony | Digital Invitation",
  description:
    "With Love & Blessings — Joyfully invite you to celebrate Aarna's Half Saree Ceremony on Sunday, 6 December 2026 at 7:00 PM onwards at Eventara Convention, Hyderabad.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "InviteUs",
    title: "Aarna's Half Saree Ceremony",
    description:
      "Sunday, 6 December 2026 • 7:00 PM onwards at Eventara Convention, Hyderabad. Tap to open your invitation.",
    images: [
      {
        url: "/og-invite.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Aarna's Half Saree Ceremony — Burgundy Floral Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aarna's Half Saree Ceremony",
    description:
      "Sunday, 6 December 2026 • 7:00 PM onwards at Eventara Convention, Hyderabad.",
    images: ["/og-invite.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${parisienne.variable} ${jakarta.variable}`}
    >
      <body className="bg-[#2B040C] text-[#FCF8F2] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FCF8F2]">
        {children}
      </body>
    </html>
  );
}

